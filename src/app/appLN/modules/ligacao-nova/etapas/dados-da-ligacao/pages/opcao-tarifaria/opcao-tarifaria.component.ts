import { Location } from '@angular/common';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { DadosDaLigacaoService } from '../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { configureMenuByWindowSize } from '../../../../../../core/services/utils/neo-utils.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';

@Component({
	selector: 'neo-opcao-tarifaria',
	templateUrl: './opcao-tarifaria.component.html',
	styleUrls: ['./opcao-tarifaria.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OpcaoTarifariaComponent implements OnInit {
	public perfil: string;
	public formTarifa: FormGroup;
	public mobile: boolean;
	public navExtraInfoTarifa: NavigationExtras;

	constructor(
		private _router: Router,
		private _alert: CustomSweetAlertService,
		private _location: Location,
		private _etapaService: DadosDaLigacaoService,
		private _formBuilder: FormBuilder,
		private _ligacaoNovaService: LigacaoNovaService
	) {
        this.perfil = '';
		this.mobile = configureMenuByWindowSize(window.screen.width);
		this.formTarifa = this.createForm();
		this.navExtraInfoTarifa = {
			queryParams: {},
			state: {
				tarifa: null,
			},
		};
	}

	ngOnInit(): void {
		this.perfil = this._ligacaoNovaService.getPerfilEscolhido.perfil;
		this.formTarifa.patchValue({
			tarifa: this._etapaService.getTarifa
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
	}

	createForm(): FormGroup {
		return this._formBuilder.group({
			tarifa: [
				this._etapaService.dadosDaLigacao.tarifaSocial.beneficio,
				[
					Validators.required
				]
			]
		});
	}

	infoTarifa(tarifa: string): void {
		if (tarifa === "branca") {
            this._router.navigate(["ligacao-nova", "dados-da-ligacao", "informativo-tarifa-branca"]);
        } else {
            this._router.navigate(["ligacao-nova", "dados-da-ligacao", "informativo-tarifa-social"]);
        }
	}

	atualizarDados(): void {
		this._etapaService.setTarifa = this.formTarifa.value.tarifa;
	}

	voltar(): void {
		this.atualizarDados();
		this._location.back();
	}

	continuar(): void {
		this.atualizarDados();

		switch (this.formTarifa.value.tarifa) {
			case 'SOCIAL':
				this._router.navigate(["ligacao-nova", "dados-da-ligacao", "tarifa-social"]);
				break;

			case 'BRANCA':
				this._alert.alertTarifaBranca().then(r => {
					if (r.dismiss) {
						this._router.navigate(["ligacao-nova", "pagamento", "definir-data"]);
					}
				});
				break;

			case 'CONVENCIONAL':
				this._router.navigate(["ligacao-nova", "pagamento", "definir-data"]);
				break;

			default:
				this._location.back()
				break
		}
	}

}
