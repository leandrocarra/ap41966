import { Component, Input, OnInit } from '@angular/core';
import { GrupoTensao } from "../../../../core/models/selecao-de-imoveis/selecao-de-imoveis";

@Component({
    selector: 'app-home-banner',
    templateUrl: './home-banner.component.html',
    styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {
    @Input() grupoTensao: GrupoTensao;
    constructor() {
        this.grupoTensao = 'B';
    }

    ngOnInit(): void {
    }

}
