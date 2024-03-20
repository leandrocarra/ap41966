import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalculadoraUtilsService } from '../../../../../../core/services/calculadora/calculadora-utils.service';
import { DadosDaLigacaoService } from '../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { CustomSweetAlertService } from "../../../../../../core/services/sweet-alert/custom-sweet-alert.service";

@Component({
	selector: 'neo-combo',
	templateUrl: './combo.component.html',
	styleUrls: ['./combo.component.scss']
})
export class ComboComponent {
	public combo: any;
	public possui220: boolean;

	constructor(
		private _router: Router,
		private _location: Location,
		private _calculadoraUtils: CalculadoraUtilsService,
		private _etapaService: DadosDaLigacaoService,
		private _alert: CustomSweetAlertService
	) {
		this.combo = '';
		this.possui220 = this._etapaService.dadosDaLigacao.dimensionamentoDeRede.possui220 === 'SIM' ? true : false;
		this.combo = this._etapaService.dadosDaLigacao.combo === '' ? '' : this._etapaService.dadosDaLigacao.combo;
	}

	setCombo(index: number): void {
		if (this.combo === '') {
			this.combo = this._calculadoraUtils.getCombo(index);
		} else {
			if (this.combo.combo === index.toString()) {
				this.combo = '';
			} else {
				this.combo = this._calculadoraUtils.getCombo(index);
			}
		}
	}

	voltar(): void {
		this._location.back();
	}

	calculadora(): void {
		this._router.navigate(["ligacao-nova", "dados-da-ligacao", "calculadora"]);
	}

	disable(): boolean {
		return this.combo === '' ? true : false;
	}

	continuar(): void {

		this._alert.alertCombo().then(() => {
			this._etapaService.setCombo = this.combo;
			this._etapaService.definirDimensionamentoDeRede(
				"COMBO",
				this.combo.categoria,
				this.combo.equipamentos,
				this.combo.potencia
			);
			this._etapaService.dadosDaLigacao.categoria = this.combo.categoria;
			this._etapaService.tipoDimensionamento = "COMBO";
			this._router.navigate(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);
		});
	}
}
