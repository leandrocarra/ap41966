import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasCadastro } from 'app/core/models/cadastro/cadastro';
import { CadastroUsuarioDTORequest, CodigoValidaDTORequest, DadosDeCadastroDTO, GerarCodigoValidoDTORequest } from 'app/core/models/cadastro/request/cadastro-dto';
import { CadastroUsuarioDTOResponse, CodigoValidaDTOResponse } from 'app/core/models/cadastro/responses/cadastro-dto';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { MatErrorMensagens } from 'app/core/services/error/error.service';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';
import { ExibirAvisoService } from 'app/shared/pages/exibir-aviso/exibir-aviso.service';
import { EnumAvisosPadroes } from "../../../../core/models/exibir-aviso/exibir-aviso";

const RESET_TIMEOUT: number = 59; // Segundos para poder enviar novamente o código.

@Component({
  selector: 'app-validar-codigo-de-ativacao',
  templateUrl: './validar-codigo-de-ativacao.component.html',
  styleUrls: ['./validar-codigo-de-ativacao.component.scss']
})
export class ValidarCodigoDeAtivacaoComponent {
	formValidarCadastro: FormGroup;
    matErrorCodigo: string;
    grupoDoUsuario: string;
    mobile: boolean;
    codigoValido: boolean;
    podeReenviarCodigo: boolean;
    contador: number;
    emailDoCodigo: string;
    cadastroUsuarioRequestDTO: CadastroUsuarioDTORequest;
    cadastroUsuarioResponseDTO: CadastroUsuarioDTOResponse;
    codigoValidaRequestDTO: CodigoValidaDTORequest;
    codigoValidaResponseDTO: CodigoValidaDTOResponse;
    dadosDeCadastroRequestDTO: DadosDeCadastroDTO;
    gerarCodigoValidoRequestDTO: GerarCodigoValidoDTORequest;
    TEMPORARIO: any;
	constructor(
		private _formBuilder: FormBuilder,
        private _user: UserService,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _cadastroService: CadastroService,
        private _loadingService: LoadingService,
        private _exibirAvisoService: ExibirAvisoService
	) {
		this.formValidarCadastro = this.criarFormulario();
        this.grupoDoUsuario = this._user.group;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.codigoValido = true;
        this.podeReenviarCodigo = false;
        this.matErrorCodigo = MatErrorMensagens.CodigoDeAtivacao;
        this.emailDoCodigo = this._cadastroService.definirEmailParaRequest();
        this.cadastroUsuarioRequestDTO = new CadastroUsuarioDTORequest();
        this.cadastroUsuarioResponseDTO = new CadastroUsuarioDTOResponse();
        this.codigoValidaRequestDTO = new CodigoValidaDTORequest();
        this.codigoValidaResponseDTO = new CodigoValidaDTOResponse();
        this.dadosDeCadastroRequestDTO = new DadosDeCadastroDTO();
        this.gerarCodigoValidoRequestDTO = new GerarCodigoValidoDTORequest();
        this.contador = 0;
        this.iniciarTemporizadorParaReenvio(RESET_TIMEOUT);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

	criarFormulario(): FormGroup {
        return this._formBuilder.group(
            { codigoValidator: [
                '',
                [
                    Validators.required
                ]
            ] }
        );
    }

    continuar(): void {
        if (this.formValidarCadastro.valid) {
            this.validarCodigo();
        } else {
            this._alert.alertError("Preencha todos os campos corretamente.")
        }
    }

    validarCodigo(): void {
        this.preencherValidaCodigoRequestDTO();
        this._loadingService.start();
        this._cadastroService.validarCodigo(this.codigoValidaRequestDTO).subscribe({
            next: (responseDTO) => {
                this.codigoValido = true;
                this.codigoValidaResponseDTO = responseDTO;
                this.cadastrarUsuario();
                this._loadingService.stop();
            },
            error: (error) => {
                this.codigoValido = false;
                this.formValidarCadastro.controls['codigoValidator'].setValue('');
                this.formValidarCadastro.controls['codigoValidator'].markAsDirty();
                this._loadingService.stop();
            }
        });
    }

    preencherValidaCodigoRequestDTO(): void {
        this.codigoValidaRequestDTO.userName = environment.name + '/' + this._cadastroService.fluxoCadastro.documento;
        this.codigoValidaRequestDTO.distribuidora = environment.name;
        this.codigoValidaRequestDTO.regiao = environment.regiao;
        this.codigoValidaRequestDTO.codigoValidator = this.formValidarCadastro.controls['codigoValidator'].value;
    }

    cadastrarUsuario(): void {
        this.preencherDadosParaRequest().then(() => {
            if (this.cadastroUsuarioRequestDTO.recaptcha) {
                this._cadastroService.cadastrarUsuario(this.cadastroUsuarioRequestDTO).subscribe({
                    next: (responseDTO) => {
                        this.cadastroUsuarioResponseDTO = responseDTO;
                        this.exibirTelaDeCadastroConcluido();
                        this._loadingService.stop();
                    },
                    error: (error) => {
                        this._loadingService.stop();
                    }
                });
            }
        });
    }

    preencherDadosParaRequest(): Promise<void> {
        this._loadingService.start();
		return this._cadastroService.obterRecaptcha().then((token) => {
            const documento: string = this._cadastroService.fluxoCadastro.documento;
            this.dadosDeCadastroRequestDTO.userName = environment.name + '/' + documento;
            this.dadosDeCadastroRequestDTO.distribuidora = environment.name;
            this.dadosDeCadastroRequestDTO.regiao = environment.regiao;
            this.dadosDeCadastroRequestDTO.canalSolicitante = environment.canal;
            this.dadosDeCadastroRequestDTO.recaptcha = token;
            this.dadosDeCadastroRequestDTO.tipoEnvio = '1'; // FIXME: Quando houver meios de distinguir, separar: 1 = Envio da confirmação por e-mail. 2 = SMS.
            this.dadosDeCadastroRequestDTO.codigoValidator = this.formValidarCadastro.controls['codigoValidator'].value;
            this.puxarDadosDoService();
        }).catch((error) => {
            this._loadingService.stop();
        });
	}

    puxarDadosDoService(): void {
        Object.assign(this.cadastroUsuarioRequestDTO, this._cadastroService.fluxoCadastro);
        Object.assign(this.cadastroUsuarioRequestDTO, this.dadosDeCadastroRequestDTO);
    }

    exibirTelaDeCadastroConcluido(): void {
        this._router.navigate(
            [PathCompleto.cadastro, SubRotasCadastro.avisoComStepper],
            { queryParams: { codigoAviso: EnumAvisosPadroes.CadastroConcluido } }
        );
    }

    gerarCodigoValido(): void {
        this.preencherGerarCodigoValidoDTO().then(()=>{
            this._cadastroService.gerarCodigoValido(this.gerarCodigoValidoRequestDTO).subscribe({
                next: (responseDTO) => {
                    this.alterarBotaoDeReenvio();
                    this._loadingService.stop();
                },
                error: (error) => {
                    // FIXME: Mensagem de erro quando não é possível enviar o email..?
                    this._loadingService.stop();
                }
            });
        })
    }

    preencherGerarCodigoValidoDTO():Promise<void>{
        this._loadingService.start();
        return this._cadastroService.obterRecaptcha().then((token)=>{
            this.gerarCodigoValidoRequestDTO.userName = environment.name + '/' + this._cadastroService.fluxoCadastro.documento;
            this.gerarCodigoValidoRequestDTO.distribuidora = environment.name;
            this.gerarCodigoValidoRequestDTO.regiao = environment.regiao;
            this.gerarCodigoValidoRequestDTO.emailAcesso = this._cadastroService.definirEmailParaRequest();
            this.gerarCodigoValidoRequestDTO.recaptcha = token;
        })
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
        )
    }
}
