import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { configureMenuByWindowSize } from '../../../../../../core/services/utils/neo-utils.service';

@Component({
	selector: 'neo-informativo-inicial',
	templateUrl: './informativo-inicial.component.html',
	styleUrls: ['./informativo-inicial.component.scss']
})
export class InformativoInicialComponent {

	mobile: boolean;

	constructor(
		private _router: Router,
		private _location: Location,
	) {
        this.mobile = configureMenuByWindowSize(window.screen.width);
    }

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
	}


	continuar(): void {
		this._router.navigate(["ligacao-nova", "dados-da-ligacao", "informativo-ligacao"]);
	}

	voltar(): void {
		this._location.back();
	}

}
