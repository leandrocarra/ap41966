import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { convertParaData } from "../utils/neo-utils.service";

export class ValidatorsClass {

    static customRegex(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return error;
            }
            let valid = regex.test(control.value);
            return valid ? [] : error;
        };
    }

    static senhasIguais(control: AbstractControl): ValidationErrors | null | undefined {
        let senha: string = control.get('senha')?.value;
        let confirmarSenha: string = control.get('confirmarSenha')?.value;
        if (senha != confirmarSenha) {
            control.get('confirmarSenha')?.setErrors({ senhasDiferentes: true });
        } else {
            return null;
        }
    }

    static compararDataAtual(error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return error;
            }
            let dataAtual = new Date();
            let dataComparacao = convertParaData(control.value);
            return (dataComparacao < dataAtual) ? [] : error;
        }
    }

    static idadeMinima(error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return error;
            }
            let dataNascimento = convertParaData(control.value);
            let diferença = Math.abs(Date.now() - dataNascimento.getTime());
            let idade = Math.floor((diferença / (1000 * 3600 * 24)) / 365);
            return (idade > 18) ? [] : error;
        }
    }

    static idadeMaxima(error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return error;
            }
            let dataNascimento = convertParaData(control.value);
            let dataAtual = new Date();
            let anoMaximo = dataAtual.getFullYear() - 130;
            return (dataNascimento.getFullYear() >= anoMaximo) ? [] : error;
        }
    }

    static verificarDataEmissao(control: AbstractControl): ValidationErrors | null | undefined {
        if (!control.get('dataNascimento')?.value || !control.get('dataEmissao')?.value) {
            control.get('dataEmissao')?.setErrors({ dataEmissaoMenor: true })
        } else {
            let dataNascimento = convertParaData(control.get('dataNascimento')?.value);
            let dataEmissao = convertParaData(control.get('dataEmissao')?.value);
            if (dataEmissao < dataNascimento) {
                control.get('dataEmissao')?.setErrors({ dataEmissaoMenor: true })
            } else {
                return null;
            }
        }
    }

    static validarCelular(error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return error;
            }
            var dddsInvalidos = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "20", "30", "40", "50", "60", "70", "80", "90"];
            return dddsInvalidos.includes(control.value.substring(0, 2)) ? error : [];
        }
    }

    static validarDataCorreta(error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return error;
            }
            let validarData = control.value.replaceAll('/', ''); //Remover barra quando a leitura é realizada pelo OCR
            var dia = (validarData.substring(0, 2));
            var mes = (validarData.substring(2, 4));
            var ano = (validarData.substring(4, 8));
            var novaData = (mes + '/' + dia + '/' + ano); //Formato Americano
            var verificarData: any = (new Date(novaData));
            return ((verificarData.toString() === 'Invalid Date') || ano === '0000') ? error : [];
        }
    }

}
