import { FormGroup } from "@angular/forms";

export function emailsIguaisValidators(formGroup: FormGroup) {
    const email = formGroup.get('email')?.value ?? '';
    const confirmarEmail = formGroup.get('confirmarEmail')?.value ?? '';

    if (email.trim() + confirmarEmail.trim()) {
        return email !== confirmarEmail ? null : { emailDiferente: true };
    } else {
        return null;
    }
}