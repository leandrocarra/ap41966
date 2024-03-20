import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validarFormatoTelefone(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const formato: RegExp = /^(?!([0-9])\1+$)\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;
        return formato.test(control.value) ? null : { telefoneInvalido: true };
    };
}
