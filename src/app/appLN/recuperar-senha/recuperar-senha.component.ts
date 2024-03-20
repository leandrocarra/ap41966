import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environmentLN } from '@environments/environmentsLN/environment';
import { LoginService } from '../core/services/login/login.service';
import { RecuperarSenhaService } from '../core/services/recuperar-senha/recuperar-senha.service';
import { CustomSweetAlertService } from '../core/services/sweet-alert/custom-sweet-alert.service';
import { validarCpfOuCnpjControl } from '../core/services/utils/neo-utils.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';

@Component({
  selector: 'neo-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent {
  formRecuperarSenha: FormGroup;
  enviaToken = false;
  token: string;
  senha: string;
  confirmaSenha: string;
  isHomologacao: boolean;
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _alert: CustomSweetAlertService,
    private _loginService: LoginService,
    private _recuperarSenhaService: RecuperarSenhaService,
    private _loadingService: LoadingService
  ) {
    this.token = '';
    this.senha = '';
    this.confirmaSenha = '';
    this.isHomologacao = (environmentLN.production === false) ? true : false;
    this.formRecuperarSenha = this.criarFormRecuperarSenha();
  }

  criarFormRecuperarSenha(): FormGroup {
    return this._formBuilder.group({
      documento: ['',
        [
          Validators.compose([Validators.required, validarCpfOuCnpjControl])
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email,
        ]
      ],
      tipoEnvioToken: ['1',
        [
          Validators.required,
        ]
      ]
    });
  }

  enviarLinkSenha() {
    if (this.formRecuperarSenha.valid) {
        this._loadingService.start();
      this._recuperarSenhaService.resgatarSenha(this.formRecuperarSenha).subscribe(data => {
        if (data == 'OK') {
          this._alert.alertSuccess('Foi enviado o token para cadastrar a nova senha.');
          this.enviaToken = true;
        } else {
          this._alert.alertError(data);
        }
      })
    } else {
      this._alert.alertInfo('CPF ou e-mail inválidos.');
    }
  }

  validaToken() {
    if (this.senha) {
      let valToken = {
        "codigo": this.token,
        "senha": this.senha
      };
      this._recuperarSenhaService.validarNovaSenha(valToken).subscribe(data => {
        if (data == 'OK') {
          this._alert.alertSuccess('Senha cadastrada com sucesso.');
          this._router.navigate(['/login']);
        } else {
          this._alert.alertError(data);
        }
      });
    } else {
      this._alert.alertInfo('Senha incompatível.');
    }
  }

  voltar() {
    this._loginService.redirectToLogin();
  }

  getPassword(password: string) {
    this.senha = password;
  }
}
