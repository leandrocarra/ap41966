import { Location } from '@angular/common';
import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasCadastro } from 'app/core/models/cadastro/cadastro';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';

@Component({
    selector: 'app-dados-pessoa-juridica-empresa',
    templateUrl: './dados-pessoa-juridica-empresa.component.html',
    styleUrls: ['./dados-pessoa-juridica-empresa.component.scss']
  })
  export class DadosPessoaJuridicaEmpresaComponent {
	formEmpresa: FormGroup;
    matErrorRazaoSocial: string;
    matErrorNomeFantasia: string;
    matErrorAtividadeFiscal: string;
    matErrorNumeroDaInscricao: string;
    grupoDoUsuario: string;
    mobile: boolean;
    tipoDeInscricao: Array<string>;
	constructor(
		private _formBuilder: FormBuilder,
		private _location: Location,
        private _user: UserService,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _cadastroService: CadastroService
	) {
		this.formEmpresa = this.criarFormulario();
        this.grupoDoUsuario = this._user.group;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.matErrorRazaoSocial = 'Campo obrigatório.';
        this.matErrorNomeFantasia = 'Campo obrigatório.';
        this.matErrorAtividadeFiscal = 'Campo obrigatório.';
        this.matErrorNumeroDaInscricao = 'Campo obrigatório.';
        this.tipoDeInscricao = [
            'Inscrição Estadual',
            'Inscrição Municipal'
        ];
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

	criarFormulario(): FormGroup {
        return this._formBuilder.group(
            {
                razaoSocial: [
                    this._cadastroService.fluxoCadastro.clienteJ.razaoSocial,
                    [
                        Validators.required,
                    ]
                ],
                nomeFantasia: [
                    this._cadastroService.fluxoCadastro.clienteJ.nomeFantasia,
                    [
                        Validators.required,
                    ]
                ],
                atividadeFiscal: [
                    this._cadastroService.fluxoCadastro.clienteJ.atividadeFiscal,
                    [
                        Validators.required,
                    ]
                ],
                inscricao: [
                    this._cadastroService.tipoDeInscricao,
                ],
                numeroDaInscricao: [
                    this.preencherNumeroDaInscricao(),
                ]
            }
        );
    }

    preencherNumeroDaInscricao(): string {
        return this._cadastroService.fluxoCadastro.clienteJ.inscricaoEstadual ?? this._cadastroService.fluxoCadastro.clienteJ.inscricaoMunicipal;
    }

	voltar(): void {
		this._location.back();
	}

    continuar(): void {
        if (this.formEmpresa.valid) {
            this.passarDadosParaOService();
            this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.dadosPessoaJuridicaRepresentante]);
        } else {
            this._alert.alertError("Preencha todos os campos corretamente.");
        }
    }

    passarDadosParaOService(): void {
        this._cadastroService.tipoDeInscricao = this.formEmpresa.controls['inscricao'].value;
        if (this._cadastroService.tipoDeInscricao === 'Inscrição Estadual') {
            this._cadastroService.fluxoCadastro.clienteJ.inscricaoEstadual = this.formEmpresa.controls['numeroDaInscricao'].value;
        } else {
            this._cadastroService.fluxoCadastro.clienteJ.inscricaoMunicipal = this.formEmpresa.controls['numeroDaInscricao'].value;
        }
        Object.assign(this._cadastroService.fluxoCadastro.clienteJ, this.formEmpresa.value);
    }
}
