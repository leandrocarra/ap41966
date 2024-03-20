import { Location } from '@angular/common';
import { Component, HostListener, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { take } from 'rxjs';
import { CodigoValidaDTORequest, EsqueciSenhaDTORequest } from 'app/core/models/cadastro/request/cadastro-dto';
import { CodigoValidaDTOResponse, EsqueciSenhaDTOResponse } from 'app/core/models/cadastro/responses/cadastro-dto';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { MatErrorMensagens } from 'app/core/services/error/error.service';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';
import { SubRotasRecuperarSenha } from 'app/core/models/RecuperarSenhaDTO/recuperarSenha';
import { EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { PathCompleto } from 'app/core/enums/servicos';

const RESET_TIMEOUT: number = 59; // Segundos para poder enviar novamente o código.
@Component({
    selector: 'app-informar-codigo-enviado',
    templateUrl: './informar-codigo-enviado.component.html',
    styleUrls: ['./informar-codigo-enviado.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class InformarCodigoEnviadoComponent implements OnInit {
	formPreencherCodigo: FormGroup;
    matErrorCodigo: string;
    grupoDoUsuario: string;
    mobile: boolean;
    codigoValido: boolean;
    podeReenviarCodigo: boolean;
    contador: number;
    codigoValidaRequestDTO: CodigoValidaDTORequest;
    codigoValidaResponseDTO: CodigoValidaDTOResponse;
    opcaoEnvio: string;
    esqueciSenhaRequestDTO: EsqueciSenhaDTORequest;
    esqueciSenhaResponseDTO: EsqueciSenhaDTOResponse;

	constructor(
		private _formBuilder: FormBuilder,
        private _user: UserService,
        private _router: Router,
        private _location: Location,
        private _alert: CustomSweetAlertService,
        private _cadastroService: CadastroService,
        private _loadingService: LoadingService
	) {
		this.formPreencherCodigo = this.criarFormulario();
        this.grupoDoUsuario = this._user.group;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.codigoValido = true;
        this.podeReenviarCodigo = false;
        this.matErrorCodigo = MatErrorMensagens.CodigoIncorreto;
        this.codigoValidaRequestDTO = new CodigoValidaDTORequest();
        this.codigoValidaResponseDTO = new CodigoValidaDTOResponse();
        this.contador = 0;
        this.iniciarTemporizadorParaReenvio(RESET_TIMEOUT);
        this.opcaoEnvio = this._cadastroService.fluxoRecuperarSenha.opcaoEnvio;
        this.esqueciSenhaRequestDTO = new EsqueciSenhaDTORequest();
        this.esqueciSenhaResponseDTO = new EsqueciSenhaDTOResponse();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    ngOnInit(): void {
		const inputElements = [...document.querySelectorAll('input.digito') as unknown as any[]];

        inputElements.forEach(( el, index ) => {
            el.addEventListener('keydown',(e: { key: string, target: HTMLInputElement }) => {
                if ( e.key === 'Backspace' && e.target.value === '' ) inputElements[Math.max(0,index-1)].focus();
            })
            el.addEventListener('input', (e: { target: HTMLInputElement }) => {
                if (/[^a-zA-Z0-9 ]/.test(e.target.value)) {
                    e.target.value = '';
                } else {
                    const [first, ...rest] = e.target.value.replace(/\s+/g, '');
                    e.target.value = first ?? '';
                    const lastInputBox = index === inputElements.length - 1
                    const didInsertContent = first!==undefined;
                    if( didInsertContent && !lastInputBox ) {
                        inputElements[index+1].focus();
                        inputElements[index+1].value = rest.join('');
                        inputElements[index+1].dispatchEvent(new Event('input'));
                    }
                }
            })
        })
	}

	criarFormulario(): FormGroup {
        return this._formBuilder.group(
            {
                digitoUm: ['', Validators.required],
                digitoDois: ['', Validators.required],
                digitoTres: ['', Validators.required],
                digitoQuatro: ['', Validators.required],
                digitoCinco: ['', Validators.required],
                digitoSeis: ['', Validators.required]
            }
        );
    }

    continuar(): void {
        if (this.formPreencherCodigo.valid) {
            this.validarCodigo();
        } else {
            this._alert.alertError("Preencha todos os campos corretamente.");
        }
    }

    voltar(): void {
		this._location.back();
	}

    validarCodigo(): void {
        this.preencherRequestValidaCodigo().then((request) => {
            this._cadastroService.validarCodigo(request).pipe(take(1)).subscribe({
                next: (responseDTO: CodigoValidaDTOResponse) => {
                    this.codigoValido = true;
                    this.codigoValidaResponseDTO = responseDTO;
                    this._cadastroService.fluxoRecuperarSenha.codigoValidado = request.codigoValidator;
                    this._loadingService.stop();
                    this._router.navigate([PathCompleto.recuperarSenha, SubRotasRecuperarSenha.novaSenha]);
                },
                error: () => {
                    this.codigoValido = false;
                    this._loadingService.stop();
                }
            });
        });
    }

    preencherRequestValidaCodigo(): Promise<CodigoValidaDTORequest> {
        return new Promise((resolve) => {
            this._loadingService.start();
            const codigo = this.formPreencherCodigo.value;
            const documento = this._cadastroService.fluxoRecuperarSenha.documento;
            this.codigoValidaRequestDTO.userName = `${environment.name}/${documento}`;
            this.codigoValidaRequestDTO.distribuidora = environment.name;
            this.codigoValidaRequestDTO.regiao = environment.regiao;
            this.codigoValidaRequestDTO.codigoValidator = `${codigo.digitoUm}${codigo.digitoDois}${codigo.digitoTres}${codigo.digitoQuatro}${codigo.digitoCinco}${codigo.digitoSeis}`;
            this._loadingService.stop();
            resolve(this.codigoValidaRequestDTO);
        });
    }

    alterarBotaoDeReenvio(): void {
        this.podeReenviarCodigo = false;
        this.iniciarTemporizadorParaReenvio(RESET_TIMEOUT);
    }

    iniciarTemporizadorParaReenvio(segundos: number): void {
        this.contador = segundos;
        const temporizador = setInterval(
            () => {
                this.contador--;
                if (this.contador < 0) {
                    this.podeReenviarCodigo = true;
                    clearInterval(temporizador);
                }
            },
            1000
        );
    }

    limparDados(): void {
        this.formPreencherCodigo.reset();
    }

    reenviarCodigoValido(): void {
        this.preencherRequestCodigoValido().then(() => {
            this._cadastroService.enviarCodigoVerificacao(this.esqueciSenhaRequestDTO).pipe(take(1)).subscribe({
                next: (responseDTO: EsqueciSenhaDTOResponse) => {
                    this.esqueciSenhaResponseDTO = responseDTO;
                    this.alterarBotaoDeReenvio();
                    this._loadingService.stop();
                },
                error: () => {
                    this._loadingService.stop();
                    this.servicoIndisponivel();
                }
            });
        });
    }

    preencherRequestCodigoValido(): Promise<void> {
        this._loadingService.start();
        return this._cadastroService.obterRecaptcha().then((token) => {
            const documento = this._cadastroService.fluxoRecuperarSenha.documento;
            this.esqueciSenhaRequestDTO.distribuidora = environment.name;
            this.esqueciSenhaRequestDTO.regiao = environment.regiao;
            this.esqueciSenhaRequestDTO.tipoEnvio = "1";
            this.esqueciSenhaRequestDTO.userName =`${environment.name}/${documento}`;
            this.esqueciSenhaRequestDTO.canalSolicitante = environment.canal;
            this.esqueciSenhaRequestDTO.usuario = environment.USUARIO_UE;
            this.esqueciSenhaRequestDTO.recaptcha = token;
        });
    }

    servicoIndisponivel(): void {
        this._router.navigate(
            [SubRotasRecuperarSenha.pathAviso, SubRotasRecuperarSenha.aviso],
            { queryParams: { titulo: EnumTitulosPadroes.ServicoIndisponivel}}
        );
    }
}
