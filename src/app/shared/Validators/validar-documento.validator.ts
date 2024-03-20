import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';
const CPF_LENGTH = 11;
const CNPJ_LENGTH = 14;

export class DocumentoValidator implements Validator {

	validate(input: AbstractControl): ValidationErrors | null {
		return DocumentoValidator.validar(input);
	}

	static validar(input: AbstractControl): ValidationErrors | null {
		const documento = input.value.replace(/\D/g, '');
		const arrayDocumento: number[] = documento.split('').reverse().slice(2);

		if ([CPF_LENGTH, CNPJ_LENGTH].indexOf(documento.length) < 0) {
			return { length: true };
		}

		if (/^([0-9])\1*$/.test(documento)) { // Testar se os dígitos são iguais
			return { digitosIguais: true };
		}

		arrayDocumento.unshift(DocumentoValidator.checarDigitoVerificador(arrayDocumento));
		arrayDocumento.unshift(DocumentoValidator.checarDigitoVerificador(arrayDocumento));
		arrayDocumento.toString()

		if (documento !== arrayDocumento.reverse().join('').toString()) { // Dígito verificador não é válido, resultando em falha.
			return { digitoInvalido: true };
		}

		return null;
	}

	/**
	* Calcula o dígito verificador do CPF ou CNPJ.
	*/
	static checarDigitoVerificador(arr: number[]): number {
		const isCpf = arr.length < CPF_LENGTH;
		const digit = arr
			.map((valor, index) => valor * ((!isCpf ? index % 8 : index) + 2))
			.reduce((total, restante) => total + restante) % CPF_LENGTH;
		return digit < 2 ? 0 : CPF_LENGTH - digit;
	}
}
