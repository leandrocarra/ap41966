import { Location } from "@angular/common";
import { Component, HostListener, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { PathCompleto } from "app/core/enums/servicos";
import { SubRotasCadastro } from "app/core/models/cadastro/cadastro";
import { GerarCodigoValidoDTORequest } from "app/core/models/cadastro/request/cadastro-dto";
import { GerarCodigoValidoDTOResponse } from "app/core/models/cadastro/responses/cadastro-dto";
import { CadastroService } from "app/core/services/cadastro/cadastro.service";
import { CustomSweetAlertService } from "app/core/services/customsweetalert/custom-sweet-alert.service";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { UserService } from "app/core/services/user/user.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { ValidarSenhasComponent } from "app/shared/components/validar-senhas/validar-senhas.component";

@Component({
  selector: "app-senha-cadastro",
  templateUrl: "./senha-cadastro.component.html",
  styleUrls: ["./senha-cadastro.component.scss"],
})
export class SenhaCadastroComponent {
    @ViewChild(ValidarSenhasComponent) validarSenhasForm!: ValidarSenhasComponent;
    senhasFormGroup: FormGroup;
    grupoDoUsuario: string;
    mobile: boolean;
    btnContinuar: boolean;
    documento: string;
    gerarCodigoValidoRequestDTO: GerarCodigoValidoDTORequest;
    gerarCodigoValidoResponseDTO: GerarCodigoValidoDTOResponse;
    constructor(
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _user: UserService,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _cadastroService: CadastroService,
        private _loadingService: LoadingService
    ) {
        this.grupoDoUsuario = this._user.group;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.btnContinuar = true;
        this.documento = this._cadastroService.fluxoCadastro.documento;
        this.senhasFormGroup = this._formBuilder.group({
            password: [
                "",
                [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(50),
                ],
            ],
            confirmPassword: [
                "",
                [
                Validators.required,
                Validators.maxLength(50)
                ],
            ],
        });
        this.gerarCodigoValidoRequestDTO = new GerarCodigoValidoDTORequest();
        this.gerarCodigoValidoResponseDTO = new GerarCodigoValidoDTOResponse();
    }

    @HostListener("window:resize", ["$event"])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    continuar(): void {
        if (this.senhasFormGroup.valid) {
            this.gerarCodigoValido();
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

    validaBotaoContinuar() {
        this.btnContinuar = this.senhasFormGroup.invalid;
    }

    gerarCodigoValido(): void {
        this.preencherGerarCodigoValidoRequestDTO().then(()=>{
            this._cadastroService.gerarCodigoValido(this.gerarCodigoValidoRequestDTO).subscribe({
                next: (responseDTO) => {
                    this.gerarCodigoValidoResponseDTO = responseDTO;
                    this.passarDadosParaOService();
                    this.avancarParaPreenchimentoDeCodigo();
                    this._loadingService.stop();
                },
                error: (error) => {
                    // FIXME: Mensagem de erro quando não é possível enviar o email..?
                    this._loadingService.stop();
                }
            });
        })
    }

    preencherGerarCodigoValidoRequestDTO(): Promise<void> {
        this._loadingService.start();
        return this._cadastroService.obterRecaptcha().then((token)=>{
            this.gerarCodigoValidoRequestDTO.userName = `${environment.name}/${this._cadastroService.fluxoCadastro.documento}`;
            this.gerarCodigoValidoRequestDTO.distribuidora = environment.name;
            this.gerarCodigoValidoRequestDTO.regiao = environment.regiao;
            this.gerarCodigoValidoRequestDTO.emailAcesso = this._cadastroService.definirEmailParaRequest();
            this.gerarCodigoValidoRequestDTO.recaptcha = token;
        })
    }

    passarDadosParaOService(): void {
        this._cadastroService.fluxoCadastro.senha = this.senhasFormGroup.controls.password.value;
    }

    avancarParaPreenchimentoDeCodigo(): void {
        this._router.navigate([PathCompleto.cadastro, SubRotasCadastro.validarCodigoDeAtivacao]);
    }
}
