import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validarUC(error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let ucsInvalidas = [
            "00000000",
        ];
        if (!control.value || ucsInvalidas.includes(control.value)) {
            return error
        }
        return []
    }
}