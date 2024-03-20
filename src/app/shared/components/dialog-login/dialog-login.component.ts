import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { PathCompleto } from 'app/core/enums/servicos';
import { UsuarioAtivoDTORequest } from 'app/core/models/cadastro/request/cadastro-dto';
import { UsuarioAtivoDTOResponse } from 'app/core/models/cadastro/responses/cadastro-dto';
import { LoginResponseDTO } from 'app/core/models/LoginDTO/loginResponseDTO.model';
import { SubRotasMultiloginAcesso, TipoAcesso } from 'app/core/models/multilogin/multilogin-acesso';
import { ObterServicosDTORequest } from 'app/core/models/multilogin/request/multilogin-dto';
import { TokenPixDTORequest } from 'app/core/models/pix/request/pix-dto';
import { SubRotasRecuperarSenha } from 'app/core/models/RecuperarSenhaDTO/recuperarSenha';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { HeaderService } from 'app/core/services/header/header.service';
import { LgpdService } from 'app/core/services/lgpd/lgpd.service';
import { LoginService } from 'app/core/services/login/login.service';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';
import { PixService } from 'app/core/services/pix/pix.service';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';
import { DocumentoValidator } from 'app/shared/Validators/validar-documento.validator';
import { MatStepper } from "@angular/material/stepper";
import { BandeiraTarifariaService } from 'app/core/services/bandeira-tarifaria/bandeira-tarifaria.service';

@Component({
    selector: 'app-dialog-login',
    templateUrl: './dialog-login.component.html',
    styleUrls: ['./dialog-login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogLoginComponent {
    @ViewChild(MatStepper) stepper!: MatStepper;
    formLogin: FormGroup;
    mostrarSenha: boolean;
    userIdMask: string;
    linkDePrivacidade: string;
    usuarioAtivoRequestDTO: UsuarioAtivoDTORequest;
    usuarioAtivoResponseDTO: UsuarioAtivoDTOResponse;
    msgAvisoDocumento: string;

    opcoes = [
        { value: TipoAcesso.acessoComum, icon: 'person', text: 'Acesso Comum' },
        { value: TipoAcesso.imobiliaria, icon: 'store', text: 'Imobiliária' },
        { value: TipoAcesso.credenciado, icon: 'portrait', text: 'Credenciado' }
    ]

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public alert: CustomSweetAlertService,
        public dialogRef: MatDialogRef<DialogLoginComponent>,
        private _loadingService: LoadingService,
        private _loginService: LoginService,
        private _router: Router,
        private _formBilder: FormBuilder,
        private _tokenService: TokenService,
        private _alertService: CustomSweetAlertService,
        private _userService: UserService,
        private _lgpdService: LgpdService,
        private _pixService: PixService,
        private _cadastroService: CadastroService,
        private _multiloginAcessoService: MultiloginAcessoService,
        private _headerService: HeaderService,
        private _bandeiraTarifariaService: BandeiraTarifariaService
    ) {
        this.formLogin = this.createForm();
        this.mostrarSenha = true;
        this.userIdMask = '000.000.000-009';
        this.linkDePrivacidade = this._lgpdService.getLinkLGPD('PRIVACIDADE');
        this.usuarioAtivoRequestDTO = new UsuarioAtivoDTORequest();
        this.usuarioAtivoResponseDTO = new UsuarioAtivoDTOResponse();
        this.msgAvisoDocumento = '';
        this.verificarErro();
    }
    createForm(): FormGroup {
        return this._formBilder.group({
            userId: [
                "",
                [
                    Validators.required,
                    Validators.minLength(8),
                    DocumentoValidator.validar
                ]
            ],
            password: [
                "",
                [
                    Validators.required,
                    Validators.minLength(3)
                ]
            ],
            tipoUsuario: [
                "",
                [Validators.required]
            ]
        });
    }

    verificarErro(): void {
        if (this.formLogin.value.userId.length === 0) {
            this.msgAvisoDocumento = "CPF/CNPJ deve ser preenchido"
        }else{
            this.msgAvisoDocumento = "CPF/CNPJ Inválido! Por favor, verifique e tente novamente";
        }
    }

    enviarDadosParaLogin(): void {
        if (this.formLogin.valid) {
            this.consultarUsuarioAtivo();
        } else {
            this._alertService.alertErroRequisicao('Campos obrigatórios não preenchidos. Por favor, tente novamente.');
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    applyMaskCpfCnpj(): void {
        this.userIdMask = this.formLogin.value.userId.length > 11 ? "00.000.000/0000-00" : "000.000.000-009";
    }

    solicitarTokenPix(): void {
        this._pixService.obterTokenJWKS().subscribe({
            next: (data) => {
                this._pixService.setTokenJWKS = data;
                this.logarPix();
            },
        });
    }

    logarPix(): void {
        this._pixService.tokenPix(new TokenPixDTORequest()).subscribe({
            next: (data) => {
                this._pixService.setTokenPIX = data;
            },
        });
    }

    login(): void {
        this._loadingService.start();
        let user = this.formLogin.value;
        user.userId = user.userId.trim();
        user.password = user.password.trim();
        this._loginService.login(user.userId, user.password).subscribe({
            next: (data: LoginResponseDTO) => {
                if (this.usuarioAtivoResponseDTO.ativo) {
                    this.logarUsuario(data, user);
                    this._bandeiraTarifariaService.obterBandeiraTarifaria();
                }
                else {
                    this.exibirAlertDePerfilInativo();
                }
                this._loadingService.stop();
            },
            error: (erro) => {
                this._loadingService.stop();
                this.tratarErro(erro);
            },
            complete: () => {
                this._loadingService.stop();
            }
        });
    }

    consultarUsuarioAtivo(): void {
        this.preencherUsuarioAtivoRequestDTO().then(() => {
            if (this.usuarioAtivoRequestDTO.recaptcha) {
                this._cadastroService.consultarUsuarioAtivo(this.usuarioAtivoRequestDTO).subscribe({
                    next: (responseDTO) => {
                        this.usuarioAtivoResponseDTO = responseDTO;
                        this._loadingService.stop();
                        this.login();
                    },
                    error: () => {
                        this._loadingService.stop();
                        this.tratarErro({ error: { error: 'invalid_request' } });
                    }
                });
            }
        }).catch(() => {
            this._loadingService.stop();
        });
    }

    preencherUsuarioAtivoRequestDTO(): Promise<void> {
        this._loadingService.start();
        return this._cadastroService.obterRecaptcha().then((token) => {
            this.usuarioAtivoRequestDTO.distribuidora = environment.name;
            this.usuarioAtivoRequestDTO.regiao = environment.regiao;
            this.usuarioAtivoRequestDTO.userName = environment.name + '/' + this.formLogin.value.userId.trim();
            this.usuarioAtivoRequestDTO.recaptcha = token;
        }).catch(() => {
            this._loadingService.stop();
        });
    }


    logarUsuario(data: LoginResponseDTO, user: { userId: string, password: string }) {
        this._loginService.usuarioAutenticado = true;
        this._tokenService.token = data;
        this._userService.group = user.userId.length > 11 ? "A" : "B"; //test para acessar o grupo A
        this.solicitarTokenPix();
        this.close();
        if (this.formLogin.value.tipoUsuario === TipoAcesso.acessoComum) {
            this.setarDados(true);
            this._router.navigate([PathCompleto.multiloginAcesso, SubRotasMultiloginAcesso.SelecaoDePerfil]);
        } else {
            this.validarDados();
        }

    }

    validarDados(): void {
        let request = new ObterServicosDTORequest(
           `${environment.name}/${this.formLogin.value.userId}`,
            this.formLogin.value.tipoUsuario
        );

        this._multiloginAcessoService.getObterServicos(request).then(() => {
            this.setarDados(false);
            this._loadingService.stop();
            this._router.navigate([PathCompleto.compartilharAcesso]);
        }).catch((error) => {
            this._loadingService.stop();
            if (error.error.retorno.mensagem === 'Não foi encontrado usuário cadastrado') {
                this._alertService.alertErroRequisicao('Perfil selecionado sem cadastro!');
            } else {
                this.tratarErro(error);
            }

        })
    }

    setarDados(permitirAlterarPerfil: boolean = true): void {
        this._multiloginAcessoService.multiloginAcesso.tipoPerfil = this.formLogin.value.tipoUsuario;
        this._multiloginAcessoService.setMultiloginAcesso = this._multiloginAcessoService.multiloginAcesso;
        this._headerService.definirEstiloDoHeader(this.formLogin.value.tipoUsuario);
        this._multiloginAcessoService.podeAlterarPerfilDeAcesso.next(permitirAlterarPerfil);
    }

    tratarErro(erro: any) {
        switch (erro.error.error) {
            case "invalid_grant":
                return this._alertService.alertErroRequisicao('CPF/CNPJ ou senha não conferem! Por favor, tente novamente!');

            case "server_error":
                return this._alertService.alertErroRequisicao('Perfil selecionado, CPF/CNPJ ou senha não conferem! Por favor, tente novamente!');

            case "invalid_request":
                return this._alertService.alertErroRequisicao('CPF ou CNPJ não encontrado na nossa base de dados! Por favor, verifique e tente novamente.');

            default:
                return this._alertService.alertErroRequisicao(`Serviço indisponível no momento. Por favor, tente mais tarde. ${erro.error.error_description}`);
        }
    }

    exibirAlertDePerfilInativo(): void {
        this.close();
        this.alert.alertUsuarioComPerfilInativo().then((result) => {
            if (result.value) {
                this._router.navigate([PathCompleto.cadastro]);
            }
        });
    }

    recuperarSenha(): void {
        this._router.navigate([PathCompleto.recuperarSenha, SubRotasRecuperarSenha.identificacao]);
        this.close();
    }

    selecionarPerfil(opcao: string): void {
        this.formLogin.patchValue({
            tipoUsuario: opcao
        });
        this.stepper.next();
    }

    voltarSelecaoDeTipoDeAcesso(): void {
        this.stepper.previous();
    }
}
