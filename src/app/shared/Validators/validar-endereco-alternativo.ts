import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function validarUC(error: ValidationErrors): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } => {
		let ucsInvalidas = [
			"000000000000",
			"111111111111",
			"222222222222",
			"333333333333",
			"444444444444",
			"555555555555",
			"666666666666",
			"777777777777",
			"888888888888",
			"999999999999"
		];
		if (!control.value || ucsInvalidas.includes(control.value)) {
			return error;
		}
		return [];
	};
}

//Valida se a UC é formada apenas por zeros
export const ucSomenteDeZeros = (element: AbstractControl) => {
	const valorAtual = Number(element.value);

	if(!valorAtual) {
		return { ucSomenteDeZeros: true }
	}
	
	return null;
}