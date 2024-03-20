import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceLN } from '../../../../core/services/user/user.service';

@Component({
	selector: 'neo-dados-do-titular',
	templateUrl: './dados-do-titular.component.html',
	styleUrls: ['./dados-do-titular.component.scss']
})
export class DadosDoTitularComponent {
	dadosTitular: any;
	isCPF: boolean;
	cnae: string;

	//Validators
	validaCamposCPF: boolean;
	validaCamposCNPJ: boolean;

	constructor(
		private _userServiceLN: UserServiceLN,
		private _router: Router,
		private _location: Location
	) {
        this.isCPF = this._userServiceLN.tipoDocumento === 'CPF' ? true : false;
        this.cnae = '';
        this.validaCamposCPF = false;
        this.validaCamposCNPJ = false;
    }

	formTitularValidado(event: any) {
		this.validaCamposCPF = event;
		this.isDisabled();
	}

	formCNPJValidado(event: any) {
		this.validaCamposCNPJ = event;
		this.isDisabled();
	}

	isDisabled(): boolean {
		if (this.isCPF) {
			return !this.validaCamposCPF;
		} else {
			return (this.validaCamposCPF && this.validaCamposCNPJ) ? false : true;
		}
	}

	voltar():void {
		this._location.back();
	}

	continuar():void {
		this._router.navigate(["ligacao-nova", "dados-da-ligacao"]);
	}

}
