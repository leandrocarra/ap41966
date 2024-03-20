import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
	selector: 'app-opcao-tarifaria',
	templateUrl: './opcao-tarifaria.component.html',
	styleUrls: ['./opcao-tarifaria.component.scss']
})
export class OpcaoTarifariaComponent implements OnInit {

	formTarifa: FormGroup;
	mobile = false;
	perfil: string;
	isDisabled!: boolean;
	

  constructor(
	private _router: Router,
	private _location: Location,
    private formBuilder: FormBuilder,
	public user:UserService,
	private _alert: CustomSweetAlertService,
  ) {

    this.formTarifa = this.createForm();
    this.perfil="RESIDENCIAL"
   }


	createForm(): FormGroup {
		return this.formBuilder.group({
			tarifa: [
				'',
				[
					Validators.required
				]
			]
		})
	}

	ngOnInit(): void {

		if (window.screen.width <= 768) {
			this.mobile = true;
		}
	}

	configureMenuByWindowSize(width: any) {
		this.mobile = width <= 768 ? true : false;
	}

	infoTarifa(tarifa: string): void {
		// let urlTarifa = (tarifa === "branca") ? "branca" : "social";
		// this._router.navigate(["ligacao-nova","dados-da-ligacao", urlTarifa]);
	}

	atualizarDados(): void {
		// this.etapaService.dadosDaLigacao.tarifa = this.formTarifa.value.tarifa;
	}

	voltar(): void {
		this.atualizarDados();
		this._location.back();
	}

	continuar(): void {
		switch (this.formTarifa.value.tarifa) {

			case 'SOCIAL':
				// this._router.navigate(["......". "........", "........"]);
				break;
			case 'BRANCA':

				this._alert.alertTarifaBranca().then(r => {
					if (r.dismiss) {
						this._router.navigate(["", ""]);
					}
				})
				break;

			case 'CONVENCIONAL':
				this._router.navigate(["......", "......"]);
				break;

			default:
				this._location.back()
				break
		}
	}
}
