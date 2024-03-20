import { Location } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Anexo } from "../../../../../../core/models/anexo/anexo";
import { Banco, DadosPagamento } from "../../../../../../core/models/dados-pagamento/dados-pagamento";
import { DadosDaLigacaoService } from "../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service";
import { DadosDoImovelService } from "../../../../../../core/services/dados-do-imovel/dados-do-imovel.service";
import { DadosPagamentoService } from "../../../../../../core/services/dados-pagamento/dados-pagamento.service";
import { DebitoFaturaService } from '../../../../../../core/services/debito-fatura/debito-fatura.service';
import { DocumentosService } from "../../../../../../core/services/documentos/documentos.service";
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { CustomSweetAlertService } from "../../../../../../core/services/sweet-alert/custom-sweet-alert.service";
import { UserServiceLN } from "../../../../../../core/services/user/user.service";
import { GerarPdfService } from "../../../../../../core/services/utils/gerar-pdf/gerar-pdf.service";
import { configureMenuByWindowSize } from "../../../../../../core/services/utils/neo-utils.service";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";


@Component({
    selector: 'neo-debito-automatico',
    templateUrl: './debito-automatico.component.html',
    styleUrls: ['./debito-automatico.component.scss']
})
export class DebitoAutomaticoComponent {

    dadosPagamento: DadosPagamento;
    formDebitoAutomatico!: FormGroup;
    mobile: boolean = false;
    habilitarFinalizar: boolean;
    bancos: Array<Banco>;
    bancoSelected: Banco;
    tarifaAdicional: any;
    problemaAoFinalizarPedido: boolean = false;
    placeholderConta: string;
    lengthConta: number;
    maskConta: string;

    constructor(
        private _router: Router,
        private _userServiceLN: UserServiceLN,
        private _formBuilder: FormBuilder,
        private _alert: CustomSweetAlertService,
        private _documentosService: DocumentosService,
        private _debitoFaturaService: DebitoFaturaService,
        private _dadosImovelService: DadosDoImovelService,
        private _dadosLigacaoService: DadosDaLigacaoService,
        private _dadosPagamentoService: DadosPagamentoService,
        private _location: Location,
        private _ligacaoNovaService: LigacaoNovaService,
        private _gerarPDFService: GerarPdfService,
        private _loadingService: LoadingService
    ) {
        this.dadosPagamento = this._dadosPagamentoService.dadosPagamento;
        this.controleFormulario();
        this.mobile = configureMenuByWindowSize(window.screen.width, 998);
        this.listarBancos();
        this.habilitarFinalizar = false;
        this.bancos = [];
        this.bancoSelected = new Banco();
        this.placeholderConta = '';
        this.lengthConta = 0;
        this.maskConta = '';
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    controleFormulario(): any {
        this.formDebitoAutomatico = this._formBuilder.group({
            debitoAutomatico: [this._dadosPagamentoService.debitoAutomatico.debitoAutomatico,
            [
                Validators.required,
            ]
            ],
            banco: [this._dadosPagamentoService.debitoAutomatico.banco,
            ],
            agencia: [this._dadosPagamentoService.debitoAutomatico.agencia,
            ],
            conta: [this._dadosPagamentoService.debitoAutomatico.conta,
            ]
        });
    }

    controlFormRequired(required: boolean): void {
        if (required) {
            this.formDebitoAutomatico.controls['banco'].setValidators([Validators.required]);
            this.formDebitoAutomatico.controls['conta'].setValidators([Validators.required, Validators.minLength(this.lengthConta)]);
            this.formDebitoAutomatico.controls['agencia'].setValidators([Validators.required, Validators.required, Validators.minLength(4)]);
            this.formDebitoAutomatico.controls['conta'].updateValueAndValidity();
            this.formDebitoAutomatico.controls['agencia'].updateValueAndValidity();

        } else {
            this.formDebitoAutomatico.patchValue({
                banco: "",
                agencia: "",
                conta: ""
            });
            this.formDebitoAutomatico.controls['banco'].clearValidators();
            this.formDebitoAutomatico.controls['banco'].updateValueAndValidity();
            this.formDebitoAutomatico.controls['agencia'].clearValidators();
            this.formDebitoAutomatico.controls['agencia'].updateValueAndValidity();
            this.formDebitoAutomatico.controls['conta'].clearValidators();
            this.formDebitoAutomatico.controls['conta'].updateValueAndValidity();
        }
    }

    listarBancos(): void {
        this.habilitarFinalizar = false;
        this._userServiceLN.gerarListaBancos().subscribe(listaBancos => {
            this.bancos = listaBancos;
            this.alterarMascaraContaBancaria(this.bancos);
            if (this.dadosPagamento.dadosBancarios !== null) {
                this.bancoSelected = this.bancos.find(b => b.nomeCompletoBanco === this.dadosPagamento.dadosBancarios.banco) ?? new Banco();
            }
        });
    }

    alterarMascaraContaBancaria(bancos: Array<Banco>): void {
        if (bancos) {
            for (let banco of bancos) {
                let numeroCaracteresContaBancaria = "00000000000".substring(0, parseInt(banco.numeroCaracteresContaBancaria));
                let numeroCaracteresDigitoContaBancaria = "00000".substring(0, parseInt(banco.numeroCaracteresDigitoContaBancaria));
                banco.mascara = numeroCaracteresContaBancaria + numeroCaracteresDigitoContaBancaria;
            }
        }
    }

    setBanco(): void {
        this.bancoSelected = this.bancos.find(elem => elem.nomeCompletoBanco === this.formDebitoAutomatico.value.banco.nomeCompletoBanco) ?? new Banco();
        let caracteresConta = this.bancoSelected.numeroCaracteresContaBancaria;
        let caracteresDigito = this.bancoSelected.numeroCaracteresDigitoContaBancaria;
        this.lengthConta = parseInt(caracteresConta) + parseInt(caracteresDigito);
        this.maskConta = this.gerarMaskConta(caracteresConta, caracteresDigito);
        this.placeholderConta = this.maskConta;
        this.formDebitoAutomatico.controls['agencia'].setValidators([Validators.required, Validators.minLength(4)]);
        this.formDebitoAutomatico.controls['conta'].setValidators([Validators.required, Validators.minLength(this.lengthConta)])
        this.formDebitoAutomatico.patchValue({
            agencia: "",
            conta: ""
        });
        this.formDebitoAutomatico.controls['agencia'].updateValueAndValidity();
        this.formDebitoAutomatico.controls['conta'].updateValueAndValidity();
    }

    gerarMaskConta(conta: string, digito: string): string {
        conta = '0'.repeat(parseInt(conta));
        digito = '0'.repeat(parseInt(digito));
        return (digito ? `${conta} - ${digito}` : `${conta}`);
    }

    deParaDadosBancarios(): void {
        this.dadosPagamento.dadosBancarios.debitoAutomatico = this.formDebitoAutomatico.value.debitoAutomatico;
        this.dadosPagamento.dadosBancarios.banco = this.formDebitoAutomatico.value.banco;
        this.dadosPagamento.dadosBancarios.agencia = this.formDebitoAutomatico.value.agencia;
        this.dadosPagamento.dadosBancarios.conta = this.formDebitoAutomatico.value.conta;
    }

    voltar(): void {
        this._location.back();
    }

    finalizar(): void {
        if (this.problemaAoFinalizarPedido) {
            this._alert.alertWarning("Ocorreu um erro ao realizar o pedido.");
        } else {
            this._dadosPagamentoService.debitoAutomatico = this.formDebitoAutomatico.value;
            this.finalizarPedido();
        }
    }



    finalizarPedido(): void {
        this._ligacaoNovaService.criarListaAnexosPerfil().then((listaAnexos: Array<Anexo>) => {
            this.sendPedido(listaAnexos);
        });
    }

    sendPedido(listAnexos: any[]): void {
        let motivoRecusa: string = "";

        if (!this._dadosImovelService.getCepEncontrado ||
            this._dadosImovelService.getRuaSemCep ||
            this._debitoFaturaService.getJustificativa !== "" ||
            this._dadosLigacaoService.getTarifa === 'SOCIAL' ||
            this._documentosService.documentos.selfieError ||
            this._userServiceLN.tipoDocumento === 'CNPJ' ||
            this._dadosImovelService.PREFEITURAS_COM_AUTORIZACAO.includes(this._dadosImovelService.getEndereco?.cidade) ||
            this._dadosImovelService.possivelDebito === true
            ) {

            this._loadingService.start();
            motivoRecusa = this._userServiceLN.tipoDocumento === 'CNPJ' ? "Usuário cadastrado com CNPJ" : "";
            motivoRecusa = this._documentosService.documentos.selfieError === true ? motivoRecusa + ` / Selfie Inválida, score: ${this._documentosService.documentos.selfieScore}` : motivoRecusa;
            motivoRecusa = !this._dadosImovelService.getCepEncontrado ? motivoRecusa + " / Cep não encontrado" : motivoRecusa;
            motivoRecusa = this._dadosImovelService.getRuaSemCep === true ? motivoRecusa + " / Rua sem cep cadastrado" : motivoRecusa;
            motivoRecusa = this._debitoFaturaService.getJustificativa !== "" ? motivoRecusa + " / Usuário ou imóvel com débitos" : motivoRecusa;
            motivoRecusa = this._dadosImovelService.PREFEITURAS_COM_AUTORIZACAO.includes(this._dadosImovelService.getEndereco?.cidade) ? motivoRecusa + " / Cidade que necessita autorizacao" : motivoRecusa;
            motivoRecusa = this._dadosLigacaoService.getTarifa === 'SOCIAL' ? motivoRecusa + ' / Tarifa Social' : motivoRecusa;
            motivoRecusa = this._dadosImovelService.possivelDebito === true  ? motivoRecusa + ' / Possivel debito em aberto' : motivoRecusa;
            this.sendBackOffice(listAnexos, motivoRecusa);

        } else {
            this._loadingService.start();
            this.sendUE(listAnexos);
        }
    }

    sendBackOffice(listAnexos: any, motivoRecusa: string): void {
        this._ligacaoNovaService.sendBackOffice(motivoRecusa).then(r => {
            r.subscribe((numeroOS: any) => {
                this._userServiceLN.numeroOS = numeroOS;
                this._userServiceLN.getProtocolo().then((protocolo) => {
                    this._userServiceLN.protocoloFinal = protocolo;
                });
                if (this._ligacaoNovaService.getPerfilEscolhido.perfil === 'RESIDENCIAL' && this._dadosLigacaoService.getTarifa === 'SOCIAL') {
                    this.sendAnexoTarifa(listAnexos);
                } else {
                    this.sendAnexos(listAnexos);
                }
            }, (error: any) => {
                this._loadingService.stop();
                this.problemaAoFinalizarPedido = true;
                this._alert.alertWarning("Ocorreu um erro ao realizar o pedido.");
            });
        });
    }

    sendUE(listAnexos: any) {
        this._ligacaoNovaService.sendUE().then(r => {
            r.subscribe((a: any) => {
                if (a.mensagem === 'OK') {
                    this._userServiceLN.uc = a.uc;
                    this._userServiceLN.numeroOS = a.numeroOS;
                    this._userServiceLN.numeroCliente = a.codigoCliente;
                    this._userServiceLN.protocoloFinal = a.protocolo;

                    if (this._dadosImovelService.getEndereco.zonaRural) {
                        this.sendCheckList(listAnexos);
                    } else {
                        if (this._ligacaoNovaService.getPerfilEscolhido.perfil === 'RESIDENCIAL' && this._dadosLigacaoService.getTarifa === 'SOCIAL') {
                            this.sendAnexoTarifa(listAnexos);
                        } else {
                            this.sendAnexos(listAnexos);
                        }
                    }

                    this.sendDadosEntregaAlternativa();
                    if (this._dadosPagamentoService.debitoAutomatico) {
                        this._dadosPagamentoService.enviarDadosFatura().subscribe(x => { });
                    }
                } else {
                    this._loadingService.stop();
                    this._alert.alertWarning("Ocorreu um erro ao realizar o pedido.");
                }
            },
            () => {
                    this._loadingService.stop();
                    this.problemaAoFinalizarPedido = true;
                    this._alert.alertWarning("Ocorreu um erro ao realizar o pedido.");
                });
        });
    }

    async sendAnexoTarifa(listAnexos: Array<any>): Promise<void> {
        this._gerarPDFService.criaAnexoTarifa().then((anexo: Anexo) => {
            listAnexos.push(anexo);
            this.sendAnexos(listAnexos);
        })
    }

    async sendCheckList(listAnexos: Array<any>): Promise<void> {
        let tarifa;
        const pdf = await this._gerarPDFService.criaAnexoChecklist();
        listAnexos.push(pdf);
        if (tarifa === 'social') {
            this.sendAnexoTarifa(listAnexos);
        } else {
            this.sendAnexos(listAnexos);
        }
    }

    enviaAnexo(anexoSucesso: boolean, qtdRequest: number, index: number, file: any, numeroDoc: number) {
        this._ligacaoNovaService.enviarAnexos(file, this._userServiceLN.numeroOS, this._userServiceLN.protocolo, numeroDoc).subscribe((x) => {
            if (!x) {
                anexoSucesso = false;
            }

            if ((qtdRequest - 1) == index) {
                if (anexoSucesso) {
                    this._router.navigate(["ligacao-nova", "confirmacao"]);
                } else {
                    this._loadingService.stop();
                    this._alert.alertWarningWithText("SISTEMA INDISPONÍVEL", "Nosso sistema está temporariamente indisponível e não foi possível transmitir a solicitação.<br/>Favor tentar novamente mais tarde.");
                }
            }
        }, (e) => {
            if ((qtdRequest - 1) == index) {
                this._loadingService.stop();
                this._alert.alertWarningWithText("SISTEMA INDISPONÍVEL", "Nosso sistema está temporariamente indisponível e não foi possível transmitir a solicitação.<br/>Favor tentar novamente mais tarde.");
            }
        });
    }

    private sendAnexos(listAnexos: any) {
        var qtdRequest = listAnexos.length;
        var anexoSucesso = true;
        var numeroDoc = 0;

        listAnexos.forEach((file: any, index: number) => {
            numeroDoc++;
            if (anexoSucesso) {
                this.enviaAnexo(anexoSucesso, qtdRequest, index, file, numeroDoc);
            } else {
                this._loadingService.stop();
                this._alert.alertWarningWithText("SISTEMA INDISPONÍVEL", "Nosso sistema está temporariamente indisponível e não foi possível transmitir a solicitação.<br/>Favor tentar novamente mais tarde.");
            }
        });
    }

    private sendDadosEntregaAlternativa() {
        let dadosAlternativos;

        if (this._dadosPagamentoService.dadosPagamento.ondeReceber === 'CAIXA POSTAL') {
            dadosAlternativos = this._dadosPagamentoService.dadosPagamento.receberCaixaPostal;
            this._dadosPagamentoService.entregaAlternativa(dadosAlternativos, 'CAIXA POSTAL');
        } else if (this._dadosPagamentoService.dadosPagamento.ondeReceber === 'NO IMÓVEL') {
            dadosAlternativos = this._dadosPagamentoService.dadosPagamento.receberNoImovel;
            this._dadosPagamentoService.entregaAlternativa(dadosAlternativos, 'NO IMÓVEL');
        } else if (this._dadosPagamentoService.dadosPagamento.ondeReceber === 'EM UM IMÓVEL ALTERNATIVO') {
            dadosAlternativos = this._dadosPagamentoService.dadosPagamento.receberEnderecoAlternativo;
            this._dadosPagamentoService.entregaAlternativa(dadosAlternativos, 'EM UM IMÓVEL ALTERNATIVO');
        }
    }

    getTarifaAlternativa(): void {
        this._dadosPagamentoService.taxaEntregaAlternativa().subscribe(r => {
            this.tarifaAdicional = r.toString();
            if (this.tarifaAdicional.length == 3) {
                this.tarifaAdicional = [this.tarifaAdicional.slice(0, 1), ',', this.tarifaAdicional.slice(1)].join('');
            }
            else if (this.tarifaAdicional.length == 4) {
                this.tarifaAdicional = [this.tarifaAdicional.slice(0, 2), ',', this.tarifaAdicional.slice(2)].join('');
            }
        });
    }
}
