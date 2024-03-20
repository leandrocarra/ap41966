import { Component, EventEmitter, HostListener, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FaturaDigitalService } from "app/core/services/fatura-digital/fatura-digital.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { emailsValidosValidator, multiplosEmailsValidator } from "app/shared/Validators/validar-multiplos-emails";

@Component({
    selector: 'app-dados-email',
    templateUrl: './dados-email.component.html',
    styleUrls: ['./dados-email.component.scss']
})
export class DadosEmailComponent {
    mobile: boolean;
    emailIgualAoCadastrado: boolean;
    formEmail: FormGroup;
    email: AbstractControl;
    confirmarEmail: AbstractControl;
    @Output() emailDigitado = new EventEmitter();
    constructor(
        private _formBuilder: FormBuilder,
        private _faturaDigitalService: FaturaDigitalService
        ) {
        this.formEmail = this.criarFormulario();
        this.email = this.formEmail.get('email')!;
        this.confirmarEmail = this.formEmail.get('confirmarEmail')!;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.emailIgualAoCadastrado = false;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group(
            {
                email: [
                    this._faturaDigitalService.fluxoFaturaDigital.emailAlternativo,
                    [Validators.required, Validators.maxLength(50)]
                ],
                confirmarEmail: [
                    this._faturaDigitalService.fluxoFaturaDigital.emailAlternativo,
                    [Validators.required, Validators.maxLength(50)]
                ]
            },
            {
                validators: [multiplosEmailsValidator, emailsValidosValidator],
            }
        );
    }

    changeInputEmail(): void {
        if (
            this.formEmail.valid &&
            this.verificarEmailDiferenteDoCadastrado()
        ) {
            this.emailDigitado.emit(this.formEmail.value.email);
        } else {
            this.emailDigitado.emit(null);
        }
    }

    verificarEmailDiferenteDoCadastrado(): boolean {
        const email = this.formEmail.controls['email'].value;
        const emailCadastradoNaFatura = this._faturaDigitalService.fluxoFaturaDigital.emailFatura;
        const possuiFaturaDigital = this._faturaDigitalService.verificarSePossuiFaturaDigital();
        if (
            email !== '' &&
            possuiFaturaDigital === true &&
            email.trim() === emailCadastradoNaFatura &&
            this.formEmail.controls['email'].status === 'VALID' &&
            this.formEmail.controls['confirmarEmail'].status === 'VALID'
        ) {
            this.emailIgualAoCadastrado = true;
            return false;
        } else {
            this.emailIgualAoCadastrado = false;
            return true;
        }
    }
}
