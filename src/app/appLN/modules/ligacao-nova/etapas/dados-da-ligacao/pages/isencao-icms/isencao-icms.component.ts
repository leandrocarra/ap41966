import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadosDaLigacaoService } from '../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { configureMenuByWindowSize } from '../../../../../../core/services/utils/neo-utils.service';

@Component({
	selector: 'neo-isencao-icms',
	templateUrl: './isencao-icms.component.html',
	styleUrls: ['./isencao-icms.component.scss']
})
export class IsencaoIcmsComponent implements OnInit {
	mobile: boolean;
	isencaoForm: FormGroup

	constructor(
		private _location: Location,
		private _formBuilder: FormBuilder,
		private _etapaService: DadosDaLigacaoService,
		private _router: Router
	) {
		this.mobile = configureMenuByWindowSize(window.screen.width);
		this.isencaoForm = this.createForm();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
	}

	ngOnInit(): void {
	}

	createForm(): FormGroup {
		return this._formBuilder.group({
			desejaIsencaoICMS: [
				this._etapaService.dadosDaLigacao.desejaIsencaoICMS,
				[
					Validators.required
				]
			]
		});
	}

	voltar(): void {
		this._etapaService.isencaoICMS = this.isencaoForm.value.desejaIsencaoICMS;
		this._location.back();
	}

	continuar(): void {
		this._etapaService.isencaoICMS = this.isencaoForm.value.desejaIsencaoICMS;
		if (this.isencaoForm.value.desejaIsencaoICMS) {
			this._router.navigate(["ligacao-nova", "dados-da-ligacao", "documento-icms"]);
		} else {
			this._router.navigate(["ligacao-nova", "dados-da-ligacao", "opcao-tarifaria"]);
		}
	}
}
