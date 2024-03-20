import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadosDaLigacaoService } from '../../../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';

@Component({
	selector: 'neo-opcao-tarifa-social',
	templateUrl: './opcao-tarifa-social.component.html',
	styleUrls: ['./opcao-tarifa-social.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OpcaoTarifaSocialComponent implements OnInit {

	public formBeneficio!: FormGroup;

	constructor(
		private _router: Router,
		private _etapaService: DadosDaLigacaoService,
		private _location: Location,
		private _formBuilder: FormBuilder
	) {
		this.formBeneficio = this.createForm();
	}

	ngOnInit(): void {
	}

	createForm(): FormGroup {
		return this._formBuilder.group({
			beneficio: [
				this._etapaService.dadosDaLigacao.tarifaSocial.beneficio,
				[
					Validators.required
				]
			]
		});
	}

	atualizarDados(): void {
		this._etapaService.dadosDaLigacao.tarifaSocial.beneficio = this.formBeneficio.value.beneficio;
	}

	voltar(): void {
		this.atualizarDados();
		this._location.back();
	}

	continuar(): void {
		this.atualizarDados();
		this._router.navigate(["ligacao-nova", "dados-da-ligacao", "tarifa-social", "dados-tarifa"]);
		// if (this.formBeneficio.value.beneficio === 'PROGRAMA SOCIAL DO GOVERNO') {
		// 	this._router.navigate(["ligacao-nova", "dados-da-ligacao", "tarifa-social", "programa-social"]);
		// } else {
		// 	this._router.navigate(["ligacao-nova", "dados-da-ligacao", "tarifa-social", "dados-tarifa"]);
		// 	this._router.navigate(["ligacao-nova", "dados-da-ligacao", "tarifa-social", "dados-do-beneficio"]);
		// 	this._router.navigate(["ligacao-nova", "dados-da-ligacao", "documentos-tarifa-social"])
		// }
		// this._router.navigate(["ligacao-nova", "dados-da-ligacao", "tarifa-social", "bpc"])
		// this._router.navigate(["ligacao-nova", "dados-da-ligacao", "tarifa-social", "assistencia-medica"])
	}

}
