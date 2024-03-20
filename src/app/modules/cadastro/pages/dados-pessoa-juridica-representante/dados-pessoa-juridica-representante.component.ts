import { Location } from '@angular/common';
import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { converterStringParaDate, SubRotasCadastro } from 'app/core/models/cadastro/cadastro';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { MatErrorMensagens } from 'app/core/services/error/error.service';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize, ESTADOS_BRASILEIROS, ORGAOS_EMISSORES } from 'app/core/services/utils/neo-utils.service';
import { Estado, OrgaoEmissor } from 'app/shared/models/utils/agencia-virtual-utils';
import { DocumentoValidator } from 'app/shared/Validators/validar-documento.validator';
import { validarDataDeNascimento } from 'app/shared/Validators/validar-idade.validator';

@Component({
    selector: 'app-dados-pessoa-juridica-representante',
    templateUrl: './dados-pessoa-juridica-representante.component.html',
    styleUrls: ['./dados-pessoa-juridica-representante.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class DadosPessoaJuridicaRepresentanteComponent {
	formRepresentante: FormGroup;
    grupoDoUsuario: string;
    mobile: boolean;
    cpfMask: string;
    matErrorCPF: string;
    matErrorData: string;
    matErrorSelecaoDocumentoSecundario: string;
    matErrorDocumentoSecundario: string;
    maskInputDocumento: string;
    estados: Array<Estado>;
    orgaosEmissores: Array<OrgaoEmissor>;
    tipoDeDocumentoSelecionado: Array<string>;
	constructor(
		private _formBuilder: FormBuilder,
		private _location: Location,
        private _user: UserService,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _cadastroService: CadastroService
	) {
		this.formRepresentante = this.criarFormulario();
        this.grupoDoUsuario = this._user.group;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.cpfMask = '000.000.000-00';
        this.matErrorCPF = MatErrorMensagens.CPFInvalido;
        this.matErrorData = MatErrorMensagens.DataNascimentoInvalida;
        this.matErrorSelecaoDocumentoSecundario = MatErrorMensagens.SelecaoDocumentoSecundario;
        this.matErrorDocumentoSecundario = MatErrorMensagens.DocumentoSecundario;
        this.maskInputDocumento = '';
        this.estados = ESTADOS_BRASILEIROS;
        this.orgaosEmissores = ORGAOS_EMISSORES;
        this.tipoDeDocumentoSelecionado = this._cadastroService.definirDocumentosPorRegiao();
        this.definirValidadores('Nenhum');
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group(
            {
                documento: [
                    this._cadastroService.fluxoCadastro.clienteJ.solicitante.documento,
                    [
                        Validators.required,
                        DocumentoValidator.validar,
                        Validators.minLength(11),
                        Validators.maxLength(11)
                    ]
                ],
                dataNascimento: [
                    this._cadastroService.fluxoCadastro.clienteJ.solicitante.dataNascimento,
                    [
                        Validators.required,
                        validarDataDeNascimento({ idade: true })
                    ]
                ],
                tipoDocSecundario: [
                    this._cadastroService.fluxoCadastro.clienteJ.solicitante.tipoDocSecundario,
                ],
                docSecundario: [
                    this._cadastroService.fluxoCadastro.clienteJ.solicitante.docSecundario,
                    [
                        Validators.minLength(2),
                        Validators.maxLength(15)
                    ]
                ],
                orgao: [
                    this._cadastroService.fluxoCadastro.clienteJ.solicitante.orgao,
                    [
                        Validators.minLength(2)
                    ]
                ],
                estado: [
                    this._cadastroService.fluxoCadastro.clienteJ.solicitante.estado,
                    [
                        Validators.minLength(2)
                    ]
                ]
            }
        );
    }

    aoAlterarSelecao(opcao: any): void {
        this.limparCasoNenhum(opcao.value);
        this.definirMaskDocumento(opcao.value);
        this.definirValidadores(opcao.value);
    }

    limparCasoNenhum(tipoDeDocumento: string): void {
        if (tipoDeDocumento === 'Nenhum') {
            this.formRepresentante.patchValue({
                tipoDocSecundario: '',
                nrDocumento: '',
                orgao: '',
                estado: ''
            });
        }
    }

    definirMaskDocumento(tipoDeDocumento: string): void {
        switch (tipoDeDocumento) {
            case 'Passaporte':
                this.maskInputDocumento = 'SS000000';
                break;
            case 'Carteira de Trabalho':
                this.maskInputDocumento = '0000000 000-0';
                break;
            default:
                this.maskInputDocumento = '';
        }
	}

    definirValidadores(tipoDeDocumento: string): void {
        if (tipoDeDocumento !== 'Nenhum') {
            this.formRepresentante.controls['tipoDocSecundario'].addValidators([Validators.required]);
            this.formRepresentante.controls['docSecundario'].addValidators([Validators.required]);
            this.formRepresentante.controls['orgao'].addValidators([Validators.required]);
            this.formRepresentante.controls['estado'].addValidators([Validators.required]);
        } else {
            this.formRepresentante.controls['tipoDocSecundario'].removeValidators([Validators.required]);
            this.formRepresentante.controls['docSecundario'].removeValidators([Validators.required]);
            this.formRepresentante.controls['orgao'].removeValidators([Validators.required]);
            this.formRepresentante.controls['estado'].removeValidators([Validators.required]);
        }
        this.formRepresentante.controls['tipoDocSecundario'].updateValueAndValidity();
        this.formRepresentante.controls['docSecundario'].updateValueAndValidity();
        this.formRepresentante.controls['orgao'].updateValueAndValidity();
        this.formRepresentante.controls['estado'].updateValueAndValidity();
    }

	voltar(): void {
		this._location.back();
	}

    continuar(): void {
        if (this.formRepresentante.valid) {
            this.passarDadosParaOService();
            this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.dadosPessoaJuridicaRepresentanteContato]);
        } else {
            this._alert.alertError("Preencha todos os campos corretamente.");
        }
    }

    passarDadosParaOService(): void {
        Object.assign(this._cadastroService.fluxoCadastro.clienteJ.solicitante, this.formRepresentante.value);
        this._cadastroService.fluxoCadastro.clienteJ.solicitante.dataNascimento = converterStringParaDate(this.formRepresentante.controls['dataNascimento'].value);
    }
}
