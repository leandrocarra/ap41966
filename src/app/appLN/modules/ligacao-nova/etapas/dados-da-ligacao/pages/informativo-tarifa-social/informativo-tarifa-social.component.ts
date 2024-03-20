import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'neo-informativo-tarifa-social',
    templateUrl: './informativo-tarifa-social.component.html',
    styleUrls: ['./informativo-tarifa-social.component.scss']
})
export class InformativoTarifaSocialComponent {
    constructor(
        private _location: Location,
    ) { }

    voltar(): void {
        this._location.back();
    }
}
