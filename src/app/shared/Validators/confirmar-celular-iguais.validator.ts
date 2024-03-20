import { FormGroup } from '@angular/forms';

export function celularesIguaisValidators(formGroup: FormGroup) {
    const celular = formGroup.get('celular')?.value ?? '';
    const confirmarCelular = formGroup.get('confirmarCelular')?.value ?? '';

    if (celular.trim() + confirmarCelular.trim()) {
        return celular !== confirmarCelular ? null : { celularesDiferentes: true };
    } else {
        return null;
    }
}