import { AbstractControl } from '@angular/forms';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';

export function multiplosEmailsValidator(form: AbstractControl) {
    let todosCoincidem: boolean = false;
    if (environment.regiao === Regiao.SE && form.get('email')?.value.includes(';')) {
        const listaDeEmailsUm = form.get('email')?.value.split(';').map((email: string) => email.trim());
        const listaDeEmailsDois = form.get('confirmarEmail')?.value.split(';').map((email: string) => email.trim());
        todosCoincidem = listaDeEmailsUm.every((email: string) => {
            const emailCoincide: Array<boolean> = [];
            listaDeEmailsDois.forEach((confirmarEmail: string) => {
                emailCoincide.push(email === confirmarEmail);
            });
            return emailCoincide.includes(true);
        });
    } else {
        const emailUm = form.get('email')?.value.trim() ?? '';
        const emailDois = form.get('confirmarEmail')?.value.trim() ?? '';
        todosCoincidem = (emailUm === emailDois);
    }
    if (todosCoincidem) {
        return null;
    } else {
        form.get('confirmarEmail')?.setErrors({ emailsDiferentes: true });
        return { emailsDiferentes: true };
    }
}

export function emailsValidosValidator(form: AbstractControl) {
    let todosValidos: boolean = false;
    let formatoEmail: RegExp = new RegExp(/^([a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
    if (environment.regiao === Regiao.SE && form.get('email')?.value.includes(';')) {
        const listaDeEmails = form.get('email')?.value.split(';').map((email: string) => email.trim());
        todosValidos = listaDeEmails.every((email: string) => {
            return formatoEmail.test(email);
        });
    } else {
        const emailUm = form.get('email')?.value.trim() ?? '';
        todosValidos = formatoEmail.test(emailUm);
    }
    if (todosValidos) {
        return null;
    } else {
        form.get('email')?.setErrors({ emailsInvalidos: true });
        return { emailsInvalidos: true };
    }
}
