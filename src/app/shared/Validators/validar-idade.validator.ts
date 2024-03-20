import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { formatarDataParaString } from "app/core/models/segunda-via/segunda-via.model";

export function validarDataDeNascimento(error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const dataString: string = formatarDataParaString(control.value, false);
        const dataDate: Date = new Date(dataString);
        return (verificarDataValida(dataString) && idadeMinima(dataDate, 18) && idadeMaxima(dataDate, 130)) ? [] : error;
    }
}

function idadeMinima(data: Date, intervalo: number): boolean {
    let idadeMinima = new Date(data.getFullYear() + intervalo, data.getMonth(), data.getDate());
    return (new Date() > idadeMinima) ? true : false;
}

function idadeMaxima(data: Date, intervalo: number): boolean {
    let idadeMaxima = new Date(data.getFullYear() + intervalo, data.getMonth(), data.getDate());
    return (new Date() <= idadeMaxima) ? true : false;
}

function verificarDataValida(input: string): boolean {
    if (input.length < 10) {
        return false;
    }
    const dia: number = parseInt(input.split('/')[1]);
    const mes: number = parseInt(input.split('/')[0]);
    const ano: number = parseInt(input.split('/')[2]);
    switch (mes) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return (dia <= 31);
        case 4:
        case 6:
        case 9:
        case 11:
            return (dia <= 30);
        case 2:
            return (dia <= 28 + anoBissexto(ano));
        default:
            return false;
    }
}

function anoBissexto(ano: number): number {
    return (
        (ano % 400 === 0) ||
        (ano % 4 === 0 && ano % 100 != 0)
    ) ? 1 : 0;
}