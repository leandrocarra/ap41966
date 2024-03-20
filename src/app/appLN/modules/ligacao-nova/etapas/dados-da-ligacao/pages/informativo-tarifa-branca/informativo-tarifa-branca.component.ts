import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'neo-informativo-tarifa-branca',
    templateUrl: './informativo-tarifa-branca.component.html',
    styleUrls: ['./informativo-tarifa-branca.component.scss']
})
export class InformativoTarifaBrancaComponent {
    constructor(
        private _location: Location,
    ) { }

    voltar(): void {
        this._location.back();
    }
}
