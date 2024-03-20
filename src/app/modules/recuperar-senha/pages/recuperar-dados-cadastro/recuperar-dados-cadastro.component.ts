import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

import { take } from 'rxjs';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasRecuperarSenha } from 'app/core/models/RecuperarSenhaDTO/recuperarSenha';
import { DadosTrocaSenhaDTORequest, UsuarioAtivoDTORequest } from 'app/core/models/cadastro/request/cadastro-dto';
import { DadosTrocaSenhaDTOResponse } from 'app/core/models/cadastro/responses/cadastro-dto';
import { EnumAvisosPadroes, EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { MatErrorMensagens } from 'app/core/services/error/error.service';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';
import { DocumentoValidator } from 'app/shared/Validators/validar-documento.validator';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-recuperar-dados-cadastro',
    templateUrl: './recuperar-dados-cadastro.component.html',
    styleUrls: ['./recuperar-dados-cadastro.component.scss']
})
export class RecuperarDadosCadastroComponent {
    formRecuperarIdentificacao: FormGroup;
    grupoDoUsuario: string;
    userIdMask: string;
    mobile: boolean;
    matErrorDocumento: string;
    ativoRequestDTO: UsuarioAtivoDTORequest;
    dadosTrocaSenhaRequestDTO: DadosTrocaSenhaDTORequest;
    dadosTrocaSenhaResponseDTO: DadosTrocaSenhaDTOResponse;

    constructor(
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _user: UserService,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _cadastroService: CadastroService,
        private _loadingService: LoadingService
    ) {
        this.formRecuperarIdentificacao = this.criarFormulario();
        this.grupoDoUsuario = this._user.group;
        this.userIdMask = '000.000.000-009';
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.matErrorDocumento = MatErrorMensagens.DocumentoInvalido;
        this.ativoRequestDTO = new UsuarioAtivoDTORequest();
        this.dadosTrocaSenhaRequestDTO = new DadosTrocaSenhaDTORequest();
        this.dadosTrocaSenhaResponseDTO = new DadosTrocaSenhaDTOResponse();
        this._cadastroService.fluxoRecuperarSenha.fluxoIniciado = true;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group({
            documento: [
                this._cadastroService.fluxoCadastro.documento,
                [
                    Validators.required,
                    DocumentoValidator.validar,
                    Validators.minLength(11),
                    Validators.maxLength(14)
                ]
            ]
        });
    }

    voltar(): void {
        this._location.back();
    }

    continuar(): void {
        if (this.formRecuperarIdentificacao.valid) {
            this.consultarUsuarioAtivo();
        } else {
            this._alert.alertError('Preencha todos os campos corretamente.');
        }
    }

    aplicarMaskCpfCnpj(): void {
        this.userIdMask =
            this.formRecuperarIdentificacao.value.documento.length > 11
                ? '00.000.000/0000-00'
                : '000.000.000-009';
    }

    consultarUsuarioAtivo(): void {
        this.preencherAtivoRequestDTO().then((recaptcha) => {
            if (recaptcha) {
                this._cadastroService.consultarUsuarioAtivo(this.ativoRequestDTO).pipe(take(1)).subscribe({
                    next: () => {
                        this.trocarSenha();
                    },
                    error: (error: HttpErrorResponse) => {
                        if(error.status === 404){
                            this.exibirTelaUsuarioNaoExiste();
                        } else {
                            this.servicoIndisponivel();
                        }
                    }
                });
            }
        });
    }

    trocarSenha(): void {
        this.dadosTrocaSenhaDTORequest().then((recaptcha) => {
            if (recaptcha) {
                this._cadastroService.dadosTrocarSenha(this.dadosTrocaSenhaRequestDTO).pipe(take(1)).subscribe({
                    next: (responseDTO: DadosTrocaSenhaDTOResponse) => {
                        this._cadastroService.fluxoRecuperarSenha.documento = this.formRecuperarIdentificacao.controls.documento.value;
                        this.dadosTrocaSenhaResponseDTO = responseDTO;
                        this._cadastroService.fluxoRecuperarSenha.email = this.dadosTrocaSenhaResponseDTO.email;
                        this._cadastroService.fluxoRecuperarSenha.emailCadastro = this.dadosTrocaSenhaResponseDTO.emailCadastro;
                        this._cadastroService.fluxoRecuperarSenha.numero = this.dadosTrocaSenhaResponseDTO.numero;
                        this._cadastroService.fluxoRecuperarSenha.telefoneContato = this.dadosTrocaSenhaResponseDTO.telefoneContato;
                        this._router.navigate([PathCompleto.recuperarSenha, SubRotasRecuperarSenha.linkConfirmacao]);
                    },
                    error: () => {
                        this._loadingService.stop();
                        this.servicoIndisponivel();
                    }
                });
            }
        });
    }

    servicoIndisponivel(): void {
        this._router.navigate(
            [SubRotasRecuperarSenha.pathAviso, SubRotasRecuperarSenha.aviso],
            {queryParams: {titulo: EnumTitulosPadroes.Indisponivel}}
        );
    }

    exibirTelaUsuarioNaoExiste(): void {
        this._router.navigate(
            [SubRotasRecuperarSenha.pathAviso, SubRotasRecuperarSenha.aviso],
            {queryParams: {codigoAviso: EnumAvisosPadroes.CadastroInexistente}}
        );
    }

    preencherAtivoRequestDTO(): Promise<string> {
        return new Promise((resolve) => {
            this._loadingService.start();
            return this._cadastroService.obterRecaptcha().then((token) => {
                const documento = this.formRecuperarIdentificacao.controls['documento'].value.trim();
                this.ativoRequestDTO.distribuidora = environment.name;
                this.ativoRequestDTO.regiao = environment.regiao;
                this.ativoRequestDTO.userName = `${environment.name}/${documento}`
                this.ativoRequestDTO.recaptcha = token;
                this._loadingService.stop();
                resolve(token);
            })
                .catch(() => {
                    this._loadingService.stop();
                    this.servicoIndisponivel();
                });
        })
    }

    dadosTrocaSenhaDTORequest(): Promise<string> {
        return new Promise((resolve) => {
            this._loadingService.start();
            this._cadastroService.obterRecaptcha().then((token) => {
                const documento = this.formRecuperarIdentificacao.controls['documento'].value.trim();
                this.dadosTrocaSenhaRequestDTO.distribuidora = environment.name;
                this.dadosTrocaSenhaRequestDTO.regiao = environment.regiao;
                this.dadosTrocaSenhaRequestDTO.userName = `${environment.name}/${documento}`;
                this.dadosTrocaSenhaRequestDTO.recaptcha = token;
                this.dadosTrocaSenhaRequestDTO.canalSolicitante = environment.canal;
                this.dadosTrocaSenhaRequestDTO.usuario = environment.USUARIO_UE;
                this._loadingService.stop();
                resolve(token);
            })
                .catch(() => {
                    this._loadingService.stop();
                    this.servicoIndisponivel();
                });
        })
    }
}
