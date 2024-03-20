import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import {
    DadosDeEndereco,
    EntregaDaFatura,
    OpcoesDeFaturaImpressa,
    ParLabelData
} from 'app/core/models/entrega-de-fatura/entrega-da-fatura';
import { SubRotasFaturaImpressa } from 'app/core/models/entrega-de-fatura/sub-rotas-falta-de-energia';
import {EnumTitulosPadroes} from 'app/core/models/exibir-aviso/exibir-aviso';
import { EnumTipificacaoEnderecoAlternativo } from 'app/core/models/fatura-impressa/fatura-impressa';
import {
    CancelaEntregaAlternativaDTORequest,
    Endereco,
    EntregaAlternativaDTORequest,
    EntregaAlternativaSudesteDTORequest,
    HeaderMetodo,
    HeaderMetodoCancela,
} from 'app/core/models/fatura-impressa/request/fatura-impressa-dto';
import { LocalResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { FaturaImpressaService } from 'app/core/services/fatura-impressa/fatura-impressa.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { SolicitacaoEnviadaService } from 'app/core/services/solicitacao-enviada/solicitacao-enviada.service';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize, ESTADOS_BRASILEIROS } from 'app/core/services/utils/neo-utils.service';
import { SolicitacaoContent, SolicitacaoEnviada } from 'app/shared/models/solicitacao-enviada/solicitacao-enviada';
import { ExibirAvisoService } from 'app/shared/pages/exibir-aviso/exibir-aviso.service';
import { finalize, take } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-confirmar-dados',
    templateUrl: './confirmar-dados.component.html',
    styleUrls: ['./confirmar-dados.component.scss'],
})
export class ConfirmarDadosComponent {
    grupoDoUsuario: string;
    mobile: boolean;
    fluxoDiferenteUC: boolean;
    confirmacaoForm: FormGroup;
    dados: Array<ParLabelData>;
    textoTermoAceite: string;
    userUC: string = "";
    userEndereco: string;

    constructor(
        private _user: UserService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _location: Location,
        private _faturaImpressaService: FaturaImpressaService,
        private _solicitacaoEnviadaService: SolicitacaoEnviadaService,
        private _userServiceService: UserService,
        private _loading: LoadingService,
        private _exibirAvisoService: ExibirAvisoService,
        private _selecaoImoveisService: SelecaoImovelService
    ) {
        this.grupoDoUsuario = this._user.group;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.fluxoDiferenteUC = this._faturaImpressaService.entregaDaFatura.fluxo !== OpcoesDeFaturaImpressa.UnidadeConsumidora;
        this.confirmacaoForm = this.criaFormulario();
        this.textoTermoAceite = this.montaTextoTermoAceite();
        this.userUC = this._faturaImpressaService.entregaDaFatura.contaContrato ?? null;
        this.dados = [];
        this.userEndereco = '';
        this.verificarContaContrato();
    }

    verificarContaContrato(): void {
        const fluxo = this._faturaImpressaService.entregaDaFatura.fluxo;

        if ( fluxo == OpcoesDeFaturaImpressa.UnidadeConsumidora ) {
            //igual pra NE e SE
            this.iniciarFluxoDescadastro();
        } else {
            this.iniciarFluxoCadastro();
        }
    }


    iniciarFluxoDescadastro(): void {
        this.userUC = this._selecaoImoveisService.getUCSelecionada!.uc;
        this.userEndereco = this._selecaoImoveisService.getEnderecoCompleto;
        const endereco = this.tranferirDadosEndereco(
            this._selecaoImoveisService.getUCSelecionada!.local
        );

        this.dados = this.montaLayout(endereco);
    }

    tranferirDadosEndereco(local: LocalResponseDTO): DadosDeEndereco {
        let dados : DadosDeEndereco = new DadosDeEndereco();
        dados.cep = local.cep;
        dados.cidade = local.municipio;
        dados.estado = local.uf;
        dados.logradouro = local.endereco;
        dados.numero = local.numero as string;
        dados.bairro = local.bairro;

        return dados;
    }


    iniciarFluxoCadastro(): void {
        this._loading.start();
        this._faturaImpressaService.entregaDaFaturaSubject.pipe(take(1)).subscribe(
            (entregaFatura) => {
                try {
                    if (environment.regiao === Regiao.NE) {
                        this.userUC = entregaFatura.contaContrato;
                    }
                    this.userEndereco = `${entregaFatura.dadosEndereco.logradouro}, ${entregaFatura.dadosEndereco.bairro}, ${entregaFatura.dadosEndereco.cidade}, ${entregaFatura.dadosEndereco.estado}, ${entregaFatura.dadosEndereco.cep}`;
                    this.dados = this.montaLayout(entregaFatura.dadosEndereco);
                    this._faturaImpressaService.entregaDaFatura.dadosEndereco = entregaFatura.dadosEndereco;
                } catch (erro) {
                    this._loading.stop();
                    this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado });
                } finally {
                    this._loading.stop();
                }
            }
        );
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    criaFormulario(): FormGroup {
        return this._formBuilder.group({
            aceitarTermo: [
                false,
                this.fluxoDiferenteUC ? [Validators.requiredTrue] : [],
            ],
        });
    }

    montaLayout(endereco: DadosDeEndereco): Array<ParLabelData> {
        let valorARetornar: Array<ParLabelData> = [];
        valorARetornar.push(new ParLabelData('CEP', endereco.cep));

        if (
            this._faturaImpressaService.entregaDaFatura.fluxo ===
            OpcoesDeFaturaImpressa.CaixaPostal
        ) {
            valorARetornar.push(
                new ParLabelData('CAIXA POSTAL', endereco.caixaPostal)
            );
            valorARetornar.push(new ParLabelData('CIDADE', endereco.cidade));
            valorARetornar.push(new ParLabelData('ESTADO', endereco.estado));
        } else {
            valorARetornar.push(
                new ParLabelData('LOGRADOURO', endereco.logradouro)
            );
            valorARetornar.push(new ParLabelData('NÚMERO', endereco.numero));
            valorARetornar.push(
                new ParLabelData(
                    'COMPLEMENTO',
                    endereco.complemento === '' ? '-' : endereco.complemento
                )
            );
            valorARetornar.push(new ParLabelData('BAIRRO', endereco.bairro));
            valorARetornar.push(new ParLabelData('CIDADE', endereco.cidade));
            valorARetornar.push(new ParLabelData('ESTADO', endereco.estado));

            if (
                this._faturaImpressaService.entregaDaFatura.contaContrato !== ''
            ) {
                const REMOVER_COMPLEMENTO = 4;
                valorARetornar.splice(REMOVER_COMPLEMENTO, 1);
                valorARetornar.pop();
            }
        }

        if (
            this._faturaImpressaService.entregaDaFatura.fluxo !==
            OpcoesDeFaturaImpressa.UnidadeConsumidora
        ) {
            valorARetornar.push(
                new ParLabelData(
                    'TAXA',
                    `R$ ${this._faturaImpressaService.entregaDaFatura.taxa
                        .toLocaleString()
                        .replace('.', ',')}`
                )
            );
        }

        return valorARetornar;
    }

    montaTextoTermoAceite(): string {
            const taxa = this._faturaImpressaService.entregaDaFatura.taxa
                .toLocaleString()
                .replace('.', ',');
            return `Declaro que li e estou ciente que após a alteração do endereço de entrega da fatura, será cobrada uma taxa de R$ ${taxa} por fatura enviada.`;
    }

    voltar(): void {
        this._location.back();
    }

    concluir(): void {
        const fluxo = this._faturaImpressaService.entregaDaFatura.fluxo;

        if ( fluxo == OpcoesDeFaturaImpressa.UnidadeConsumidora ) {
                //Realizar descadastro
                this.descadastrarEnderecoAlternativo();
            } else {
                //Cadastrar em outra unidade consumidora
                if (environment.regiao === Regiao.NE){
                    this.cadastrarEnderecoAlternativo();
                }
                else{
                    this.cadastrarEnderecoAlternativoSudeste();
                }
            }
    }
    cadastrarEnderecoAlternativoSudeste() {
        const entregaDTO = new EntregaAlternativaSudesteDTORequest();
        entregaDTO.vlrTaxaPostg = 'S';
        entregaDTO.codigo = this._selecaoImoveisService.getInformacoesUCSelecionada.codigo;
        const headerMetodo = new HeaderMetodo();
        headerMetodo.canalSolicitante = environment.canal;
        headerMetodo.documentoSolicitante = this._userServiceService.dadosUser.documento;
        headerMetodo.protocolo = this._userServiceService.getProtocolo.protocoloSalesforceStr;
        headerMetodo.protocoloSonda = this._userServiceService.getProtocolo.protocoloLegadoStr;
        headerMetodo.tipificacao = EnumTipificacaoEnderecoAlternativo.CadastroEntregaAlternativa;
        headerMetodo.usuario = environment.USUARIO_UE;
        entregaDTO.headerMetodo = headerMetodo;
        const endereco = new Endereco();
        endereco.bairro =  this._faturaImpressaService.entregaDaFatura.dadosEndereco.bairro;
        endereco.caixaPostal =  this._faturaImpressaService.entregaDaFatura.dadosEndereco.caixaPostal;
        endereco.cep =  this._faturaImpressaService.entregaDaFatura.dadosEndereco.cep;
        endereco.codigoPais =  "BRA";
        endereco.codigoUF =  this._faturaImpressaService.entregaDaFatura.dadosEndereco.estado;
        endereco.complemento =  this._faturaImpressaService.entregaDaFatura.dadosEndereco.complemento;
        endereco.logradouro =  this._faturaImpressaService.entregaDaFatura.dadosEndereco.logradouro;
        endereco.municipio =  this._faturaImpressaService.entregaDaFatura.dadosEndereco.cidade;
        endereco.nomePais =  "Brasil";
        endereco.numero =  this._faturaImpressaService.entregaDaFatura.dadosEndereco.numero;
        endereco.uf =  this.converterEstado();
        entregaDTO.endEntregaAlternativa = endereco;
        this._loading.start();
        this._faturaImpressaService
            .cadastrarEntregaAlternativa(entregaDTO)
            .pipe(take(1),
            finalize(()=> this.limparServicos()))
            .subscribe({
                next: () => {
                    console.log('sucesso');
                    this.preencheSolicitacaoEnviada();
                    this._loading.stop();
                },
                error: (httpErrorResponse: HttpErrorResponse) => {
                    const titulo = httpErrorResponse.error?.retorno?.mensagem || EnumTitulosPadroes.Inesperado;
                    this.redirecionarParaTelaAviso({ titulo: titulo });
                },
            });
    }

    converterEstado(): string {
        for (let estado of ESTADOS_BRASILEIROS){
            if (estado.sigla === this._faturaImpressaService.entregaDaFatura.dadosEndereco.estado){
                return estado.nomeExtenso;
            }
        }
        return "SÃO PAULO";
    }


    cadastrarEnderecoAlternativo(): void {
        const entregaDTO = new EntregaAlternativaDTORequest();
        entregaDTO.termoaceite = 'X';
        entregaDTO.contaContratoLocalEntrega = this._faturaImpressaService.entregaDaFatura.contaContrato ?? this._selecaoImoveisService.getInformacoesUCSelecionada.codigo;
        entregaDTO.vlrTaxaPostg = 'S';
        entregaDTO.codigo = this._selecaoImoveisService.getInformacoesUCSelecionada.codigo;
        const headerMetodo = new HeaderMetodo();
        headerMetodo.canalSolicitante = environment.canal;
        headerMetodo.protocolo = this._userServiceService.getProtocolo.protocoloSalesforceStr;
        headerMetodo.protocoloSonda = this._userServiceService.getProtocolo.protocoloLegadoStr;
        headerMetodo.documentoSolicitante = this._userServiceService.dadosUser.documento;
        headerMetodo.tipificacao = EnumTipificacaoEnderecoAlternativo.CadastroEntregaAlternativa;
        headerMetodo.usuario = environment.USUARIO_UE;
        entregaDTO.headerMetodo = headerMetodo;
        this._loading.start();
        this._faturaImpressaService
            .cadastrarEntregaAlternativa(entregaDTO)
            .pipe(take(1))
            // finalize(()=> this.limparServicos()))
            .subscribe({
                next: () => {
                    this.preencheSolicitacaoEnviada();
                    this._loading.stop();
                },
                error: (httpErrorResponse: HttpErrorResponse) => {
                    const titulo = httpErrorResponse.error?.retorno?.mensagem || EnumTitulosPadroes.Inesperado;
                    this.redirecionarParaTelaAviso({ titulo: titulo });
                },
            });
    }

    redirecionarParaTelaAviso(queryParams: Object): void {
        this._loading.stop();
        this._router.navigate([PathCompleto.aviso],
            { queryParams:  queryParams  })
    }


    descadastrarEnderecoAlternativo(): void {
        const descadastroEntregaDTO = new CancelaEntregaAlternativaDTORequest();
        descadastroEntregaDTO.codigo = this._selecaoImoveisService.getInformacoesUCSelecionada.codigo;
        const headerMetodoCancela = new HeaderMetodoCancela();
        headerMetodoCancela.canalSolicitante = environment.canal;
        headerMetodoCancela.documentoSolicitante = this._userServiceService.dadosUser.documento;
        headerMetodoCancela.protocolo = this._userServiceService.getProtocolo.protocoloSalesforceStr;
        if (environment.regiao === Regiao.SE){
            headerMetodoCancela.protocoloSonda = this._userServiceService.getProtocolo.protocoloLegadoStr;
        }
        headerMetodoCancela.tipificacao = EnumTipificacaoEnderecoAlternativo.CancelamentoEntregaAlternativa;
        headerMetodoCancela.usuario = environment.USUARIO_UE;
        descadastroEntregaDTO.headerMetodo = headerMetodoCancela;
        this._loading.start();

        this._faturaImpressaService
            .descadastrarEntregaAlternativa(descadastroEntregaDTO)
            .pipe(take(1),
            finalize(()=> this.limparServicos()))
            .subscribe({
                next: (): void => {
                    this._loading.stop();
                    this.preencheSolicitacaoEnviada();
                },
                error: (httpErrorResponse: HttpErrorResponse): void => {
                    const titulo = httpErrorResponse.error?.retorno?.mensagem || EnumTitulosPadroes.Inesperado;
                    this.redirecionarParaTelaAviso({ titulo: titulo });
                },
            });
    }

    preencheSolicitacaoEnviada(): void {
        let solicitacaoEnviada: SolicitacaoEnviada = new SolicitacaoEnviada();
        solicitacaoEnviada.protocolo = this._userServiceService.getProtocolo.protocoloLegadoStr;
        solicitacaoEnviada.titulo = this._selecaoImoveisService.getInformacoesUCSelecionada.caracteristicas.espelho?.toUpperCase().includes('X') ?
            'Aguarde, sua próxima fatura deverá vir entregue \n na opção desejada após finalizado o período de leitura!' : 'Sua solicitação foi enviada com sucesso!';
        solicitacaoEnviada.uc = this._faturaImpressaService.entregaDaFatura.contaContrato;
        this.dados.forEach((element) => {
            solicitacaoEnviada.infos.push(
                new SolicitacaoContent(element.label, element.data)
            );
        });
        solicitacaoEnviada.alerta = false;
        this._solicitacaoEnviadaService.setSolicitacaoEnviada = solicitacaoEnviada;
        this._router.navigate([
            PathCompleto.faturaImpressa,
            SubRotasFaturaImpressa.SolicitacaoEnviada,
        ]);

    }

    limparServicos() {
        this._faturaImpressaService.entregaDaFatura = new EntregaDaFatura();
        this._solicitacaoEnviadaService.setSolicitacaoEnviada = new SolicitacaoEnviada();
    }
}
