import { Location } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { configureMenuByWindowSize, NeoUtilsService } from "../../../../../../core/services/utils/neo-utils.service";


@Component({
    selector: 'neo-documentos-aceitos',
    templateUrl: './documentos-aceitos.component.html',
    styleUrls: ['./documentos-aceitos.component.scss']
})

export class DocumentosAceitosComponent {

    documentoPosse: any;
    mobile: boolean;


    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }


    constructor(
        private _utilsService: NeoUtilsService,
        private _location: Location,
    ) {
        this.documentoPosse = this._utilsService.DOCUMENTOS_POSSE;
        this.mobile = configureMenuByWindowSize(window.screen.width);
    }

    voltar() {
        this._location.back();
    }
}
