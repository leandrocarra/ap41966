import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioDAO } from '../core/models/user/usuarioDAO';
import { CadastroService } from '../core/services/cadastro/cadastro.service';
import { LoginService } from '../core/services/login/login.service';
import { validarCpfOuCnpjControl } from '../core/services/utils/neo-utils.service';
import { ValidatorsClass } from '../core/services/validators/validators';
import { CustomSweetAlertService } from '../core/services/sweet-alert/custom-sweet-alert.service';
import { environmentLN } from '@environments/environmentsLN/environment';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';


@Component({
  selector: 'neo-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public usuarioDAO = new UsuarioDAO();
  public formCadastroDados!: FormGroup;
  public checkPessoa: boolean = false;
  public checkNome: boolean = false;
  public checkForm: boolean = false;
  public isDisabled: boolean;
  public tipoPessoa: any;
  public celMask: any;
  public isHomologacao: boolean = false;


  constructor(
    private _router: Router,
    private _loadingService: LoadingService,
    private _alert: CustomSweetAlertService,
    private _cadastroService: CadastroService,
    private _loginService: LoginService,
    private _formBuilder: FormBuilder,
  ) {
    this.isDisabled = true;
  }

  ngOnInit() {
    this.isHomologacao = (environmentLN.production === false) ? true : false;

    this.formDados();
    this.usuarioDAO.receberInfos = false;
    this.usuarioDAO.tipoEnviado = '1';
  }

  formDados(): void {
    this.formCadastroDados = this._formBuilder.group({
      username: ['',
        Validators.compose([
          Validators.required, Validators.maxLength(256)
        ])
      ],
      documento: ['',
        Validators.compose([
          Validators.required, validarCpfOuCnpjControl
        ])
      ],
      email: ['',
        Validators.compose([
          Validators.required, Validators.email,
        ])
      ],
      celular: ['',
        Validators.compose([
          Validators.required, ValidatorsClass.validarCelular({ celular: true })
        ])
      ]
    })
  }

  validarFormPessoa(): void {
    this.validarNome(this.formCadastroDados.controls.username.value);
    if (this.formCadastroDados.controls.documento.invalid) {
      if (this.tipoPessoa === "pessoaFisica") {
        this._alert.alertError("CPF inválida");
      } else {
        this._alert.alertError("CNPJ inválida");
      }
      this.checkPessoa = true;
    }
  }

  validarForms(): boolean {
    this.validarFormPessoa();
    if (this.validarSenha()) {
      this._alert.alertError("Senha inválida");
      this.checkForm = true;
    } else {
      this.checkForm = false;
    }
    return (!this.checkForm && !this.checkNome && !this.checkPessoa) ? true : false;
  }

  validarNome(name: any) {
    let firstName = name.split(" ", 1)[0];
    let middleName = name.split(" ", 2)[1];
    let lastName = name.split(" ", 3)[2];
    this.checkNome = ((firstName && firstName.length >= 2) && ((middleName && middleName.length >= 2) || (lastName && lastName.length >= 2))) ? false : true;
  }

  validarSenha(): boolean {
    return (!this.usuarioDAO.password) ? true : false;
  }

  deParaUsuarioDao(): void {
    this.usuarioDAO.username = this.formCadastroDados.value.username;
    this.usuarioDAO.cpf = this.formCadastroDados.value.documento;
    this.usuarioDAO.celular = this.formCadastroDados.value.celular;
    this.usuarioDAO.email = this.formCadastroDados.value.email;
  }

  cadastrar(): void {
    if (this.validarForms()) {
      this._loadingService.start();
      this.deParaUsuarioDao();
      this._cadastroService.criarUsuario(this.usuarioDAO).subscribe({
        next: (data) => {
          if (data === 'Registro existente') {
            this._alert.alertInfo('CPF informado já possui cadastro.');
          } else if (data === "OK") {
            this._alert.alertSuccess(`Cadastro realizado com sucesso! <br/>Enviamos um link para confirmação do cadastro por
            ${this.usuarioDAO.tipoEnviado == '1' ? 'e-mail' : 'SMS'}.`);
          } else {
            this._alert.alertInfo('Ocorreu um erro ao cadastrar');
          }
          this._cadastroService.clearSession();
          this._router.navigate(['/login']);
          this.usuarioDAO.password = null;
        },
        error: (httpResponse) => {
          if (httpResponse) {
            this._alert.alertInfo('Ocorreu um erro ao cadastrar');
          }
        }
      })
    }
  }

  cancelar(): void {
    this._loginService.redirectToLogin();
  }

  getPassword(password: string): void {
    this.usuarioDAO.password = password;
  }

}
