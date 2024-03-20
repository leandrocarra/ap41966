import { Location } from "@angular/common";
import { Component, HostListener, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";

import { PathCompleto } from "app/core/enums/servicos";
import { EsqueciSenhaValidaDTORequest } from "app/core/models/cadastro/request/cadastro-dto";
import { EsqueciSenhaValidaDTOResponse } from "app/core/models/cadastro/responses/cadastro-dto";
import { CadastroService } from "app/core/services/cadastro/cadastro.service";
import { CustomSweetAlertService } from "app/core/services/customsweetalert/custom-sweet-alert.service";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { UserService } from "app/core/services/user/user.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { ValidarSenhasComponent } from "app/shared/components/validar-senhas/validar-senhas.component";
import { ExibirAvisoService } from "app/shared/pages/exibir-aviso/exibir-aviso.service";
import { EnumAvisosPadroes } from "../../../../core/models/exibir-aviso/exibir-aviso";

@Component({
    selector: 'app-nova-senha',
    templateUrl: './nova-senha.component.html',
    styleUrls: ['./nova-senha.component.scss']
})
export class NovaSenhaComponent {
    @ViewChild(ValidarSenhasComponent) validarSenhasForm!: ValidarSenhasComponent;
    senhasFormGroup: FormGroup;
    grupoDoUsuario: string;
    mobile: boolean;
    btnContinuar: boolean;
    documento: string;
    esqueciSenhaValidaRequestDTO: EsqueciSenhaValidaDTORequest;
    esqueciSenhaValidaResponseDTO: EsqueciSenhaValidaDTOResponse;

    constructor(
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _user: UserService,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _cadastroService: CadastroService,
        private _loadingService: LoadingService,
        private _exibirAvisoService: ExibirAvisoService
    ) {
        this.grupoDoUsuario = this._user.group;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.btnContinuar = true;
        this.documento = this._cadastroService.fluxoRecuperarSenha.documento;
        this.senhasFormGroup = this.criarFormulario();
        this.esqueciSenhaValidaRequestDTO = new EsqueciSenhaValidaDTORequest();
        this.esqueciSenhaValidaResponseDTO = new EsqueciSenhaValidaDTOResponse();
    }

    @HostListener("window:resize", ["$event"])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group({
            password: [
                "",
                [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(50)
                ]
            ],
            confirmPassword: [
                "",
                [
                Validators.required,
                Validators.maxLength(50)
                ]
            ]
        });
    }

    continuar(): void {
        if (this.senhasFormGroup.valid) {
            this.validacaoNovaSenha();
        } else {
            this._alert.alertError("Preencha todos os campos corretamente.");
        }
    }

    voltar(): void {
        this._location.back();
    }

    setPassword(password: string): void {
        this.senhasFormGroup.controls.password.setValue(password);
        this.senhasFormGroup.controls.confirmPassword.setValue(password);
    }

    validaBotaoContinuar(): void {
        this.btnContinuar = this.senhasFormGroup.invalid;
    }

    validacaoNovaSenha(): void {
        this.preencherRequestNovaSenha().then((request) => {
            this._cadastroService.validarNovaSenha(request).subscribe({
                next: (responseDTO: EsqueciSenhaValidaDTOResponse) => {
                    this.esqueciSenhaValidaResponseDTO = responseDTO;
                    this._loadingService.stop();
                    this.conclusaoNovaSenha();
                },
                error: () => {
                    this._loadingService.stop();
                }
            });
        })
    }

    preencherRequestNovaSenha(): Promise<EsqueciSenhaValidaDTORequest> {
        return new Promise((resolve) => {
            this._loadingService.start();
            const documento = this._cadastroService.fluxoRecuperarSenha.documento;
            this.esqueciSenhaValidaRequestDTO.codigoValidado = this._cadastroService.fluxoRecuperarSenha.codigoValidado;
            this.esqueciSenhaValidaRequestDTO.distribuidora = environment.name;
            this.esqueciSenhaValidaRequestDTO.novaSenha = this.senhasFormGroup.value.password;
            this.esqueciSenhaValidaRequestDTO.regiao = environment.regiao;
            this.esqueciSenhaValidaRequestDTO.userName = `${environment.name}/${documento}`;
            this.esqueciSenhaValidaRequestDTO.canalSolicitante = environment.canal;
            this.esqueciSenhaValidaRequestDTO.usuario = environment.USUARIO_UE;
            this._loadingService.stop();
            resolve(this.esqueciSenhaValidaRequestDTO);
        })
    }

    conclusaoNovaSenha(): void {
        this._router.navigate(
            [PathCompleto.aviso],
            { queryParams: { codigoAviso: EnumAvisosPadroes.SenhaAlterada} }
        );
    }
}
