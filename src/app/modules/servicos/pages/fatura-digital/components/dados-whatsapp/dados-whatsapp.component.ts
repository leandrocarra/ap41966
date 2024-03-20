import { Component, EventEmitter, HostListener, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { FaturaDigitalService } from "app/core/services/fatura-digital/fatura-digital.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { celularesIguaisValidators } from "app/shared/Validators/confirmar-celular-iguais.validator";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): any {
        if (form?.control.controls.email) {
            if (form.control.controls.email.value && control?.value !== form.control.controls.email.value) {
                return true;
            }
        }

        if (form?.control.controls.tel) {
            if (form.control.controls.tel.value && control?.value !== form?.control.controls.tel.value) {
                return true;
            }
        }
    }
}
@Component({
    selector: 'app-dados-whatsapp',
    templateUrl: './dados-whatsapp.component.html',
    styleUrls: ['./dados-whatsapp.component.scss']
})
export class DadosWhatsappComponent {
    mobile: boolean;
    whatsappIgualAoCadastrado: boolean;
    novoWhastappFormGroup: FormGroup;
    matcher = new MyErrorStateMatcher();
    @Output() whatsappDigitado = new EventEmitter();
    constructor(
        private _formBuilder: FormBuilder,
        private _faturaDigitalService: FaturaDigitalService
    ) {
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.whatsappIgualAoCadastrado = false;
        this.novoWhastappFormGroup = this.criarFormulario();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    criarFormulario(): FormGroup {
        return this._formBuilder.group(
            {
                tel: [this._faturaDigitalService.fluxoFaturaDigital.whatsappAlternativo, Validators.required],
                confirmarTel: [this._faturaDigitalService.fluxoFaturaDigital.whatsappAlternativo, Validators.required]
            },
            {
                validators: [celularesIguaisValidators],
            });
    }

    changeInputWhatsapp() {
        if (
            this.novoWhastappFormGroup.errors?.celularesDiferentes &&
            this.novoWhastappFormGroup.controls['tel'].status === 'VALID' &&
            this.novoWhastappFormGroup.controls['confirmarTel'].status === 'VALID' &&
            this.verificarWhatsappDiferenteDoCadastrado()
        ) {
            this.whatsappDigitado.emit(this.novoWhastappFormGroup.value.tel);
        } else {
            this.whatsappDigitado.emit(null);
        }
    }

    verificarWhatsappDiferenteDoCadastrado(): boolean {
        const numero = this.novoWhastappFormGroup.controls['tel'].value;
        const numeroCadastradoNaFatura = this._faturaDigitalService.formatarNumeroDeTelefoneDaResponse(this._faturaDigitalService.fluxoFaturaDigital.emailFatura);
        if (
            numero !== '' &&
            numero.trim() === numeroCadastradoNaFatura &&
            this.novoWhastappFormGroup.controls['email'].status === 'VALID' &&
            this.novoWhastappFormGroup.controls['confirmarEmail'].status === 'VALID'
        ) {
            this.whatsappIgualAoCadastrado = true;
            return false;
        } else {
            this.whatsappIgualAoCadastrado = false;
            return true;
        }
    }
}


