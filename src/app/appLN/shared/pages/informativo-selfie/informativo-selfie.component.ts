import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { configureMenuByWindowSize } from '../../../core/services/utils/neo-utils.service';

@Component({
	selector: 'app-informativo-selfie',
	templateUrl: './informativo-selfie.component.html',
	styleUrls: ['./informativo-selfie.component.scss']
})
export class InformativoSelfieComponent {

	mobile: boolean = false;

	constructor(
		private _router: Router,
		private _location: Location
	) {
		this.mobile = configureMenuByWindowSize(window.screen.width);
	}

	@HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

	voltar(): void {
		this._location.back();
	}

	tirarSelfie() {
		this._router.navigate(['/ligacao-nova/documentos/tirar-selfie']);
	}
}
