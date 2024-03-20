import { AbstractControl, ValidationErrors } from "@angular/forms";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { BancoCadastradoDTO } from "app/core/models/debito-automatico/response/debito-automatico-dto";
export class CustomValidator {

	static validarBancoSE(control: AbstractControl) {
		if (control.get('banco')!.value.nomeCompletoBanco === "CAIXA ECONOMICA FEDERAL" && environment.regiao === Regiao.SE) {
			control.get('banco')?.setErrors({ caixaEconomicaNE: true });
		} else {
			return null;
		}
	}

	static validarPoupancaCaixaEconomicaNE(control: AbstractControl) {
        if (control) {
            let banco: BancoCadastradoDTO = control.get('banco')!.value;
            let conta: string = control.get('conta')!.value;
            conta = conta.replace(/0*/, ""); //remover os '0' 
            if (banco.nomeCompletoBanco === "CAIXA ECONOMICA FEDERAL" && environment.regiao === Regiao.NE) {
                if (conta.startsWith("13")) {
                    control.get('conta')?.setErrors({ zeroTreze: true });
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
	}

	static validarAgencia(control: AbstractControl, agenciaValida: boolean) {
		if (agenciaValida) {
			control.get('agencia')?.setErrors({ agenciaValida: true })
		} else {
			return null;
		}
	}

    static validarConta(control: AbstractControl): ValidationErrors | null | undefined {
		let conta = control.get('conta')?.value ?? "";
        if (parseInt(conta) <= 0) {
            control.get('conta')?.setErrors({ contaInvalida: true })
        } else {
            return null;
        }
    }

    static validarAgenciaZerada(control: AbstractControl): ValidationErrors | null | undefined {
        let agencia = control.get('agencia')?.value ?? "";
        if (parseInt(agencia) <= 9) {
            control.get('agencia')?.setErrors({ agenciaZerada: true })
        } else {
            return null;
        }
    }
}
