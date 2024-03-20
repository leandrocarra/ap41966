import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { PathCompleto } from 'app/core/enums/servicos';
import { AtualizarSenhaDTORequest } from 'app/core/models/minha-conta/request/minha-conta-dto';
import { MinhaContaService } from 'app/core/services/minha-conta/minha-conta.service';
import { UserService } from 'app/core/services/user/user.service';
import { ValidarSenhasComponent } from 'app/shared/components/validar-senhas/validar-senhas.component';
import { EditarDadosComponent } from '../editar-dados/editar-dados.component';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent {
  senhasFormGroup: FormGroup;

  documento: string;

  btnContinuar: boolean;
  esconderSenha: boolean;

  senhaAntiga: string;

  @ViewChild(ValidarSenhasComponent) validarSenhasForm!: ValidarSenhasComponent;
  @ViewChild(EditarDadosComponent, { static: false })
  editarDados!: EditarDadosComponent;

  constructor(
    private _user: UserService,
    private _router: Router,
    private _location: Location,
    private _minhaContaService: MinhaContaService,
    private _formBuilder: FormBuilder
  ) {
    this._user.isFluxo = true;
    this.btnContinuar = true;
    this.esconderSenha = true;
    this.documento = this._user.dadosUser.documento;
    this.senhaAntiga = '';

    this.senhasFormGroup = this._formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ]
      ],
      senhaAntiga: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
        ]
      ]
    });

  }


  voltar(): void {
    this._location.back();
  }

  continuar(): void {
    let atualizarContaRequest = new AtualizarSenhaDTORequest(
      environment.canal,
      this._user.dadosUser.sub,
      this._user.dadosUser.documento,
      this.senhasFormGroup.value.password,
      this.senhasFormGroup.value.senhaAntiga
    );


    this._minhaContaService.getAtualizarSenha(atualizarContaRequest).then(() => {
      this._router.navigate([PathCompleto.minhaConta]);
    }).catch(() => {
      this.senhasFormGroup.reset();
      this.validarSenhasForm.passwordFormGroup.reset();
    });

  }

  setPassword(password: string): void {
    this.senhasFormGroup.controls.password.setValue(password);
  }

  validaBotaoContinuar() {
    this.senhaAntiga = this.senhasFormGroup.value.senhaAntiga;
    this.btnContinuar = this.senhasFormGroup.invalid;
  }
}
