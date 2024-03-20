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
    selector: 'app-dados-pessoais-pessoa-fisica.component',
    templateUrl: './dados-pessoais-pessoa-fisica.component.html',
    styleUrls: ['./dados-pessoais-pessoa-fisica.component.scss']
})
export class DadosPessoaisPessoaFisicaComponent {
    formDadosPessoaisPessoaFisica: FormGroup;
    matErrorData: string;
    matErrorTelefone: string;
    matErrorCelular: string;
    matErrorObrigatorio: string;
    grupoDoUsuario: string;
    mascaraTelefone: string = '';
    mascaraCelular: string = '';

    constructor(
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _user: UserService,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _cadastroService: CadastroService
        ) {
        this.formDadosPessoaisPessoaFisica = this.criarFormulario();
        this.matErrorData = MatErrorMensagens.DataNascimentoInvalida;
        this.matErrorTelefone = MatErrorMensagens.Telefone;
        this.matErrorCelular = MatErrorMensagens.Celular;
        this.grupoDoUsuario = this._user.group;
        this.matErrorObrigatorio = MatErrorMensagens.CampoObrigatorio;
    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group(
            {
                nome: [this._cadastroService.fluxoCadastro.clienteF.nome,
                    [
                        Validators.required,
                    ]
                ],
                sobrenome: [this._cadastroService.fluxoCadastro.clienteF.sobrenome,
                    [
                        Validators.required
                    ]
                ],
                usuarioAcesso: [this._cadastroService.fluxoCadastro.clienteF.usuarioAcesso,
                    [
                        Validators.required
                    ]
                ],
                celular: [this._cadastroService.fluxoCadastro.clienteF.celular,
                    [
                        Validators.required,
                        Validators.minLength(9)
                    ]
                ],
                telefone: [this._cadastroService.fluxoCadastro.clienteF.telefone,
                    [
                        Validators.minLength(8)
                    ]
                ],


            }
        );
    }

    getTelMask(): void {
        this.mascaraTelefone = aplicarMascaraTelefone();
      }

      getCelMask(): void {
        this.mascaraCelular = aplicarMascaraCelular();
      }

    voltar(): void {
		this._location.back();
	}

    continuar(): void {
        //TODO: Integração com recaptcha. -> Validar
        if (this.formDadosPessoaisPessoaFisica.valid) {
            this.passarDadosParaOService();
            this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.dadosPessoaisPessoaFisicaEmail]);
        } else {
            this._alert.alertError("Preencha todos os campos corretamente.");
        }
    }

    passarDadosParaOService(): void {
        Object.assign(this._cadastroService.fluxoCadastro.clienteF, this.formDadosPessoaisPessoaFisica.value);
    }
}
