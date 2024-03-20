import { Location } from "@angular/common";
import { Component, HostListener, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { PathCompleto } from "app/core/enums/servicos";
import {
    COD_BANCOS,
    EnumFluxoDebitoAutomatico,
    TitulosCorrespondentes
} from "app/core/models/debito-automatico/debito-automatico";
import {
    AgenciaBancosDTORequest,
    BancosCadastradosDTORequest
} from "app/core/models/debito-automatico/request/debito-automatico-dto";
import {
    AgenciaBancosDTOResponse,
    BancoCadastradoDTO,
    BancosCadastradosDTOResponse
} from "app/core/models/debito-automatico/response/debito-automatico-dto";
import { SubRotasDebitoAutomatico } from "app/core/models/debito-automatico/sub-rota-debito-automatico";
import { EnumTitulosPadroes } from "app/core/models/exibir-aviso/exibir-aviso";
import { CustomSweetAlertService } from "app/core/services/customsweetalert/custom-sweet-alert.service";
import { DebitoAutomaticoService } from "app/core/services/debito-automatico/debito-automatico.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { CustomValidator } from "app/shared/Validators/dados-bancarios.validator";

@Component({
    selector: 'app-debito-automatico-cadastrar',
    templateUrl: './debito-automatico-cadastrar.component.html',
    styleUrls: ['./debito-automatico-cadastrar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DebitoAutomaticoCadastrarComponent {
    grupoDoUsuario: string;
    bancos: Array<any> = [];
    formDebitoAutomatico: FormGroup;
    bancoSelected!: BancoCadastradoDTO;
    tooltipBanco: string;
    tooltipAgencia: string;
    avisoContaPoupancaCefSE: string;
    avisoContaPoupancaCefNE: string;
    caixaEconomicaFederal: boolean;
    digitosContaPoupancaCef: boolean;
    regiao: string;
    fluxo: string;
    contadorValidarAgencia: number;
    aguardarRequisicao: boolean = false;
    contaMinLength: number = 0
    contaMaxLength: number = 10;
    mobile: boolean;
    titulo: string;
    codBanco = COD_BANCOS;
    constructor(
        private _user: UserService,
        private _router: Router,
        private _domSanitizer: DomSanitizer,
        private _matIconRegistry: MatIconRegistry,
        private _debitoAutomaticoService: DebitoAutomaticoService,
        private _location: Location,
        private _formBuilder: FormBuilder,
        private _selecaoImovelService: SelecaoImovelService,
        private _alert: CustomSweetAlertService
    ) {
        this.contadorValidarAgencia = 0;
        this.aguardarRequisicao = false;
        this.contaMinLength = 0
        this.contaMaxLength = 10;
        this.grupoDoUsuario = this._user.group;
        this.formDebitoAutomatico = this.createForm();
        this.tooltipBanco = 'Se seu banco não está aparecendo na lista ao lado, infelizmente ele ainda não é um dos nossos parceiros. Para realizar o cadastro/alteração procure a agência bancária mais próxima.';
        this.tooltipAgencia = 'Caso o número da sua agência bancária possua letras, preencher a esquerda com o "0" até atingir o número de caracteres equivalente Ex: Caso a agência tenha 3 dígitos e um "X" (295-X), inserir o "0" antes dos dígitos, ou seja, "0295".';
        this.avisoContaPoupancaCefSE = 'Desculpe! No momento, não estão sendo realizados cadastros/alterações do débito automático para este banco. Orientamos buscar sua agência bancária.';
        this.avisoContaPoupancaCefNE = 'Desculpe! No momento, não estão sendo realizados cadastros/alterações do débito automático para conta poupança deste banco. Orientamos buscar sua agência bancária.';
        this.caixaEconomicaFederal = false;
        this.digitosContaPoupancaCef = false;
        this.regiao = environment.regiao;
        this.fluxo = this._debitoAutomaticoService.getDebitoAutomatico.fluxoDebito;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.listarBancos();
        this.adicionarSvgs();
        this.titulo = this.definirTitulo();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    adicionarSvgs(): void {
        let assetsPath: string = "assets/images/icons/";
        let icones: Array<string> = [
            'warning-outline'
        ];

        icones.forEach(icon => {
            this._matIconRegistry.addSvgIcon(
                icon,
                this._domSanitizer.bypassSecurityTrustResourceUrl(
                    `${assetsPath}${icon}.svg`
                )
            );
        });
    }

    createForm(): FormGroup {
        return this._formBuilder.group({
            banco: ['', [Validators.required]],
            agencia: ['', [Validators.required]],
            conta: ['', [Validators.required]]
        },
        {
            validators: [
                CustomValidator.validarPoupancaCaixaEconomicaNE,
                CustomValidator.validarBancoSE,
                CustomValidator.validarConta,
                CustomValidator.validarAgenciaZerada
            ],
        });
    }

    voltar(): void {
        this._location.back()
    }

    alterarMascaraContaBancaria(bancos: Array<BancoCadastradoDTO>): void {
        for (let item of bancos) {
            item.numeroCaracteresContaBancariaMinimo = "00000000000".substring(0, Number(item.numeroCaracteresContaBancariaMaximo));
            item.numeroCaracteresDigitoConta = "00000".substring(0, Number(item.numeroCaracteresDigitoConta));
        }
    }

    aoSelecionarBanco(): void {
        this.bancos.forEach((elem: any) => {
            elem = (this.regiao === Regiao.NE) ? elem : elem.banco
            if (elem.nomeCompletoBanco === this.formDebitoAutomatico.value.banco.nomeCompletoBanco) {
                this.bancoSelected = elem;
            }
        });
        this.redefinirCamposAgenciaEConta();
    }

    redefinirCamposAgenciaEConta(): void {
        this.contaMinLength = this.definirContaMinLength();
        this.contaMaxLength = (this.regiao === Regiao.SE) ? parseInt(this.bancoSelected.numeroCaracteresContaBancariaMaximo + this.bancoSelected.numeroCaracteresDigitoConta) : this.definirContaMaxLenghtNE();
        this.formDebitoAutomatico.controls['agencia'].patchValue('');
        this.formDebitoAutomatico.controls['agencia'].setValidators([
            Validators.required,
            Validators.minLength(4)
        ]);
        this.formDebitoAutomatico.controls['agencia'].updateValueAndValidity();
        this.formDebitoAutomatico.controls['conta'].patchValue('');
        this.formDebitoAutomatico.controls['conta'].setValidators([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(this.contaMaxLength)
        ]);
        this.formDebitoAutomatico.controls['conta'].updateValueAndValidity();
    }

    definirContaMinLength(): number {
        if (environment.regiao === Regiao.SE) {
            return (this.bancoSelected?.numeroCaracteresContaBancariaMaximo !== undefined && this.bancoSelected?.numeroCaracteresContaBancariaMaximo !== '00') ? parseInt(this.bancoSelected?.numeroCaracteresContaBancariaMaximo) : 8;
        } else {
            return (this.bancoSelected?.numeroCaracteresContaBancariaMinimo !== undefined && this.bancoSelected?.numeroCaracteresContaBancariaMinimo !== '00') ? parseInt(this.bancoSelected.numeroCaracteresContaBancariaMinimo) : 8;
        }
    }

    definirContaMaxLenghtNE(): number {
        return (this.bancoSelected?.numeroCaracteresContaBancariaMinimo !== undefined && this.bancoSelected?.numeroCaracteresContaBancariaMinimo !== '00') ? parseInt(this.bancoSelected?.numeroCaracteresContaBancariaMaximo) : 10;
    }

    continuar(): void {
        this.consultarAgencia();
    }

    listarBancos(): void {
        let bancosCadastrados = new BancosCadastradosDTORequest(
            environment.canal,
            environment.USUARIO_UE,
            this._selecaoImovelService.getUCSelecionada?.uc
        )
        this._alert.showLoading();
        this._debitoAutomaticoService.obterBancos(bancosCadastrados).subscribe({
            next: (listarBancos: BancosCadastradosDTOResponse) => {
                this._alert.closeLoading();
                this.bancos = listarBancos.bancos;
                if (environment.regiao === Regiao.SE) {
                    this.alterarMascaraContaBancaria(this.bancos);
                }
            },
            error: () => {
                this._alert.closeLoading();
                this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado });
            }
        });
    }

    consultarAgencia(): void {
        this.aguardarRequisicao = true;
        let agenciaBancos = new AgenciaBancosDTORequest(
            this.formDebitoAutomatico.value.banco.numeroBanco,
            environment.canal,
            environment.USUARIO_UE,
            this.formDebitoAutomatico.value.agencia
        )

        this._debitoAutomaticoService.obterAgencia(agenciaBancos).subscribe({
            next: (agenciaValida: AgenciaBancosDTOResponse) => {
                this.aguardarRequisicao = false;
                if (agenciaValida.agencia.codAgencia == this.formDebitoAutomatico.value.agencia &&
                    agenciaValida.agencia.codBanco == this.formDebitoAutomatico.value.banco.numeroBanco) {
                    this._debitoAutomaticoService.debitoAutomatico.dadosBancarios.banco = `${this.bancoSelected.numeroBanco} - ${this.bancoSelected.nomeCompletoBanco}`;
                    this._debitoAutomaticoService.debitoAutomatico.dadosBancarios.agencia = agenciaValida.agencia.codAgencia;
                    this._debitoAutomaticoService.debitoAutomatico.dadosBancarios.conta = this.formDebitoAutomatico.value.conta.padStart(this.contaMinLength, '0');
                    this._debitoAutomaticoService.setDebitoAutomatico = this._debitoAutomaticoService.debitoAutomatico;
                    this._router.navigate([PathCompleto.debitoAutomatico, SubRotasDebitoAutomatico.ConfirmarDebitoAutomatico]);
                }
            },
            error: (error) => {
                this.aguardarRequisicao = false;
                if (error.error.retorno.mensagem === 'Agência não cadastrada') {
                    this.contadorValidarAgencia++;
                    if (this.contadorValidarAgencia >= 3) {
                        this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.AgenciaNaoCadastrada });
                    } else {
                        CustomValidator.validarAgencia(this.formDebitoAutomatico, true);
                    }
                } else {
                    this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado });
                }
            },
        });
    }

    redirecionarParaTelaAviso(queryParams: Object): void {
        this._router.navigate([PathCompleto.aviso],
            { queryParams: queryParams });
    }

    placeHolderConta(): string {
        let retornoConta = Array(parseInt(this.bancoSelected.numeroCaracteresContaBancariaMaximo ?? "8")).join('0') + "0";
        if (parseInt(this.bancoSelected.numeroCaracteresDigitoConta) > 0) {
            return `${retornoConta} - 0`
        } else {
            return `${retornoConta}`
        }
    }

    calcularMaxLength(): number {
        return this.regiao === Regiao.SE ?
        parseInt(this.bancoSelected?.numeroCaracteresContaBancariaMaximo ?? 8) + parseInt(this.bancoSelected?.numeroCaracteresDigitoConta ?? "0") + 1 :
        parseInt(this.bancoSelected?.numeroCaracteresContaBancariaMaximo ?? 8)
    }

    definirTitulo(): string {
        if (this._debitoAutomaticoService.debitoAutomatico.fluxoDebito === EnumFluxoDebitoAutomatico.Cadastrar) {
            return TitulosCorrespondentes.cadastrarDebitoAutomatico;
        } else {
            return TitulosCorrespondentes.alterarDebitoAutomatico;
        }
    }
}

