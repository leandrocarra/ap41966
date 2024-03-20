import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

        return (invalidCtrl || invalidParent);
    }
}

@Component({
    selector: 'app-validar-senhas',
    templateUrl: './validar-senhas.component.html',
    styleUrls: ['./validar-senhas.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ValidarSenhasComponent {

    @Input() senhaAntiga: string = '';
    @Input() compararComSenhaAntiga: boolean = false;
    @Input() documento: any;
    @Output() senhaValidada = new EventEmitter();

    passwordFormGroup: FormGroup;

    password!: string;
    confirmPassword!: string;

    hide = true;
    hideConfirmPassword = true;

    validPassword: boolean = true;

    tamanhoPattern = 8;
    sequenceRxp = /^01|12|23|34|45|56|67|78|89|98|87|76|65|54|43|32|21|10$/;
    repeatPartsRxp = /([0-9]+)\1{2,}/;
    sequenceRepeat: any;
    cpfCnpjPart: any;
    repeatParts: any;
    equalOldPass: any;

    matcher = new MyErrorStateMatcher();

    senhasNaoConferem: string = 'Senhas não conferem! Por favor, tente novamente.';

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.passwordFormGroup = this._formBuilder.group({
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50)
                ]
            ],
            confirmPassword: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50)
                ]
            ]
        }, { validator: this.checkPasswords });
    }

    checkPasswords(group: FormGroup): null | { notSame: true } {
        let pass = group.controls.password.value;
        let confirmPass = group.controls.confirmPassword.value;
        return pass === confirmPass ? null : { notSame: true }
    }

    hasSequenceRepeat(): boolean | undefined {
        let sequenceRepeat;
        if (this.password && this.password !== '') {
            sequenceRepeat = this.sequenceRxp.test(this.password) ? true : false;
            this.sequenceRepeat = sequenceRepeat;

        }
        return sequenceRepeat;
    }

    minCaracteres(): boolean | undefined {
        let checkCaracteres;
        if (this.password && this.password !== '') {
            checkCaracteres = this.password.length <= 8 ? true : false;
        } return checkCaracteres;
    }

    hasCpfCnpjPart(): boolean | undefined {
        if (this.password && this.password !== '') {
            let doc = this.documento.replace(/\D+/g, ''); // remove do cpf/cnpj quaisquer caracteres que não sejam números
            let pwd = this.password.split(/\D+/g); // cria array com partes da senha passada que contém números
            let pwdHasDocParts;

            pwd.forEach(p => {
                if (p !== '' && p.length > 1 && doc.indexOf(p) !== -1) pwdHasDocParts = true;
            });

            if (pwdHasDocParts) {
                this.cpfCnpjPart = true;
                return true;
            } else {
                this.cpfCnpjPart = false;
                return false;
            }
        }
    }

    hasRepeatParts(): boolean | undefined {
        let repeatParts;
        if (this.password && this.password !== '') {
            repeatParts = this.repeatPartsRxp.test(this.password) ? true : false;
            this.repeatParts = repeatParts;
        } else {
            this.repeatParts = false;
        }
        return repeatParts;
    }

    allowedSpecialCharacters(): boolean | undefined {
        if (this.password) {
            const allowedCharacters = /^[\d\w!#@~^]+$/;
            return allowedCharacters.test(this.password);
        }
    }

    equalsOldPassword(): boolean {
        let equalPass: boolean = false;
        if (this.compararComSenhaAntiga) {
            equalPass = (this.password && this.password !== ''
                && this.senhaAntiga === this.password) ? true : false;
        }
        this.equalOldPass = equalPass;
        this.checkAll();
        return equalPass;
    }

    checkAll(): void {
        if (this.password && this.confirmPassword) {
            if (!this.equalOldPass && !this.sequenceRepeat && !this.cpfCnpjPart && !this.repeatParts && this.allowedSpecialCharacters() && this.passwordFormGroup.status == 'VALID' && this.password.length >= this.tamanhoPattern) {
                this.senhaValidada.emit(this.password);
                this.validPassword = true;
            } else {
                this.validPassword = false;
                this.senhaValidada.emit(null);
            }
        } else {
            this.senhaValidada.emit(null);
        }
    }
}
