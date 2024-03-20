import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasCadastro } from 'app/core/models/cadastro/cadastro';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { MatErrorMensagens } from 'app/core/services/error/error.service';
import { UserService } from 'app/core/services/user/user.service';
import { aplicarMascaraCelular, aplicarMascaraTelefone } from 'app/core/services/utils/neo-utils.service';

@Component({
  selector: 'app-dados-pessoa-juridica-representante-contato',
  templateUrl: './dados-pessoa-juridica-representante-contato.component.html',
  styleUrls: ['./dados-pessoa-juridica-representante-contato.component.scss']
})
export class DadosPessoaJuridicaRepresentanteContatoComponent {
    formRepresentante: FormGroup;
    matErrorData: string;
    matErrorTelefone: string;
    matErrorCelular: string;
    matErrorObrigatorio: string;
    grupoDoUsuario: string;
    maskTelefone: string;
    maskCelular: string;

    constructor(
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _user: UserService,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _cadastroService: CadastroService
        ) {
        this.formRepresentante = this.criarFormulario();
        this.matErrorData = MatErrorMensagens.DataNascimentoInvalida;
        this.matErrorTelefone = MatErrorMensagens.Telefone;
        this.matErrorCelular = MatErrorMensagens.Celular;
        this.grupoDoUsuario = this._user.group;
        this.matErrorObrigatorio = MatErrorMensagens.CampoObrigatorio;
        this.maskTelefone = aplicarMascaraTelefone();
        this.maskCelular = aplicarMascaraCelular();
    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group(
            {
                nome: [
                    this._cadastroService.fluxoCadastro.clienteJ.solicitante.nome,
                    [
                        Validators.required,
                    ]
                ],
                sobrenome: [
                    this._cadastroService.fluxoCadastro.clienteJ.solicitante.sobrenome,
                    [
                        Validators.required
                    ]
                ],
                nomeSocial: [
                    this._cadastroService.fluxoCadastro.clienteJ.solicitante.nomeSocial,
                    [
                        Validators.required
                    ]
                ],
                celular: [
                    this._cadastroService.fluxoCadastro.clienteJ.solicitante.celular,
                    [
                        Validators.required,
                        Validators.minLength(9)
                    ]
                ],
                telefone: [
                    this._cadastroService.fluxoCadastro.clienteJ.solicitante.telefone,
                    [
                        Validators.minLength(8)
                    ]
                ],
            }
        );
    }

    voltar(): void {
		this._location.back();
	}

    continuar(): void {
        if (this.formRepresentante.valid) {
            this.passarDadosParaOService();
            this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.dadosPessoaJuridicaRepresentanteEmail]);
        } else {
            this._alert.alertError("Preencha todos os campos corretamente.");
        }
    }

    passarDadosParaOService(): void {
        Object.assign(this._cadastroService.fluxoCadastro.clienteJ.solicitante, this.formRepresentante.value);
        this._cadastroService.fluxoCadastro.clienteJ.telefone = this.formRepresentante.controls['telefone'].value;
        this._cadastroService.fluxoCadastro.clienteJ.celular = this.formRepresentante.controls['celular'].value;
    }
}
