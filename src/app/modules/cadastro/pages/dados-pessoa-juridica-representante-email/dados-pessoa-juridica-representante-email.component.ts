import { Location } from '@angular/common';
import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasCadastro } from 'app/core/models/cadastro/cadastro';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { MatErrorMensagens } from 'app/core/services/error/error.service';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';

@Component({
    selector: 'app-dados-pessoa-juridica-representante-email',
    templateUrl: './dados-pessoa-juridica-representante-email.component.html',
    styleUrls: ['./dados-pessoa-juridica-representante-email.component.scss']
})
export class DadosPessoaJuridicaRepresentanteEmailComponent {
	formRepresentante: FormGroup;
    grupoDoUsuario: string;
    mobile: boolean;
    matErrorEmail: string;
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
        this.matErrorEmail =  MatErrorMensagens.EmailIncorreto;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

	criarFormulario(): FormGroup {
        return this._formBuilder.group(
            {
                email: [
                    this._cadastroService.fluxoCadastro.clienteJ.solicitante.email,
                    [
                        Validators.required
                    ]
                ]
            }
        );
    }

	voltar(): void {
		this._location.back();
	}

    continuar(): void {
        if (this.formRepresentante.valid) {
            this.passarDadosParaOService();
            this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.senha]);
        } else {
            this._alert.alertError("Preencha todos os campos corretamente.");
        }
    }

    passarDadosParaOService(): void {
        Object.assign(this._cadastroService.fluxoCadastro.clienteJ.solicitante, this.formRepresentante.value);
        this._cadastroService.fluxoCadastro.clienteJ.email = this.formRepresentante.controls['email'].value;
    }
}
