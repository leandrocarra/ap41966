import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasCadastro } from 'app/core/models/cadastro/cadastro';
import { UsuarioAtivoDTORequest } from 'app/core/models/cadastro/request/cadastro-dto';
import { UsuarioAtivoDTOResponse } from 'app/core/models/cadastro/responses/cadastro-dto';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { DialogLoginService } from 'app/core/services/dialog-login/dialog-login.service';
import { MatErrorMensagens } from 'app/core/services/error/error.service';
import { LgpdService } from 'app/core/services/lgpd/lgpd.service';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';
import { ExibirAvisoService } from 'app/shared/pages/exibir-aviso/exibir-aviso.service';
import { DocumentoValidator } from 'app/shared/Validators/validar-documento.validator';
import { EnumAvisosPadroes } from "../../../../core/models/exibir-aviso/exibir-aviso";

@Component({
    selector: 'app-identificacao-cadastro',
    templateUrl: './identificacao-cadastro.component.html',
    styleUrls: ['./identificacao-cadastro.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IdentificacaoCadastroComponent {
    formIdentificacao: FormGroup;
    grupoDoUsuario: string;
    userIdMask: string;
    mobile: boolean;
    matErrorDocumento: string;
    linkDePrivacidade: string;
    ativoRequestDTO: UsuarioAtivoDTORequest;
    ativoResponseDTO: UsuarioAtivoDTOResponse;

    constructor(
        private _formBuilder: FormBuilder,
        private _user: UserService,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _cadastroService: CadastroService,
        private _loadingService: LoadingService,
        private _exibirAvisoService: ExibirAvisoService,
        private _dialogLoginService: DialogLoginService,
        private _lgpdService: LgpdService
    ) {
        this.formIdentificacao = this.criarFormulario();
        this.grupoDoUsuario = this._user.group;
        this.userIdMask = '000.000.000-009';
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.matErrorDocumento = MatErrorMensagens.DocumentoInvalido;
        this.linkDePrivacidade = this._lgpdService.getLinkLGPD('PRIVACIDADE');
        this.ativoRequestDTO = new UsuarioAtivoDTORequest();
        this.ativoResponseDTO = new UsuarioAtivoDTOResponse();
        this._cadastroService.fluxoCadastro.fluxoIniciado = true;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group(
            {
                documento: [
                    this._cadastroService.fluxoCadastro.documento,
                    [
                        Validators.required,
                        DocumentoValidator.validar,
                        Validators.minLength(11),
                        Validators.maxLength(14)
                    ]
                ]
            }
        );
    }

    voltar(): void {
        this._router.navigate(['/login']);
    }

    continuar(): void {
        if (this.formIdentificacao.valid) {
            this.consultarUsuarioAtivo();
        } else {
            this._alert.alertError("Preencha todos os campos corretamente.");
        }
    }

    aplicarMaskCpfCnpj(): void {
        this.userIdMask = this.formIdentificacao.value.documento.length > 11 ? "00.000.000/0000-00" : "000.000.000-009";
    }

    consultarUsuarioAtivo(): void {
        this.preencherAtivoRequestDTO().then(() => {
            if (this.ativoRequestDTO.recaptcha) {
                this._cadastroService.consultarUsuarioAtivo(this.ativoRequestDTO).subscribe({
                    next: (responseDTO) => {
                        this.ativoResponseDTO = responseDTO;
                        this.exibirTelaDeAviso();
                        this._loadingService.stop();
                    },
                    error: () => {
                        this.passarDadosParaOService();
                        this.decidirRotaPeloDocumento();
                        this._loadingService.stop();
                    }
                });
            }
        });
    }

    preencherAtivoRequestDTO(): Promise<void> {
        this._loadingService.start();
        return this._cadastroService.obterRecaptcha().then((token) => {
            this.ativoRequestDTO.distribuidora = environment.name;
            this.ativoRequestDTO.regiao = environment.regiao;
            this.ativoRequestDTO.userName = environment.name + '/' + this.formIdentificacao.controls['documento'].value.trim();
            this.ativoRequestDTO.recaptcha = token;
        }).catch(() => {
            this._loadingService.stop();
        });
    }

    exibirTelaDeAviso(): void {
        if (this.ativoResponseDTO.ativo) {
            this.exibirTelaDeCadastroExistente();
        } else {
            this.exibirTelaDeCadastroPendente();
        }
    }

    exibirTelaDeCadastroExistente(): void {
        this._router.navigate(
            [PathCompleto.aviso],
            { queryParams: { codigoAviso: EnumAvisosPadroes.CadastroExistente } }
        );
    }

    exibirTelaDeCadastroPendente(): void {
        const mensagem: string = `Ative seu cadastro através do link enviado para\n<strong>${'teste@email.com.br'}</strong>\n\nSe deseja reenviar o e-mail, clique em "Enviar".`;
        this._router.navigate(
            [PathCompleto.aviso],
            { queryParams: { codigoAviso: EnumAvisosPadroes.CadastroPendente, mensagem: mensagem } }
        );
    }

    exibirDialogDeLogin(): void {
        this._dialogLoginService.exibirDialogLogin();
    }

    passarDadosParaOService(): void {
        this._cadastroService.fluxoCadastro.documento = this.formIdentificacao.controls['documento'].value;
    }

    decidirRotaPeloDocumento(): void {
        if (this.formIdentificacao.controls['documento'].value.length > 11) {
            this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.dadosPessoaJuridicaUC]);
        } else {
            this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.identificacaoDadosCadastro]);
        }
    }

    getLinkTermosDeUso(): string {
        return this._lgpdService.getLinkLGPD('PRIVACIDADE');
    }
}
