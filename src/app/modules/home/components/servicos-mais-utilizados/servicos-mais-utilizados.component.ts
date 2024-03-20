import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GrupoTensao } from "../../../../core/models/selecao-de-imoveis/selecao-de-imoveis";
import { Router } from "@angular/router";
import { CarouselItem } from "../../../../core/models/home/home";
import { PathCompleto } from "../../../../core/enums/servicos";
import { distinctUntilChanged, map, startWith } from "rxjs/operators";
import { fromEvent, Observable } from "rxjs";

@Component({
    selector: 'app-servicos-mais-utilizados',
    templateUrl: './servicos-mais-utilizados.component.html',
    styleUrls: ['./servicos-mais-utilizados.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ServicosMaisUtilizadosComponent implements OnInit {
    @Input() grupoTensao: GrupoTensao;
    carouselItens: CarouselItem[];
    cellsToShow: Observable<number>;
    storage:Storage = sessionStorage;
    constructor(
        private _router: Router
    ) {
        this.grupoTensao = this.storage?.userGroup ?? 'B';
        this.carouselItens = [];
        this.cellsToShow = fromEvent(window,'resize').pipe(
            startWith(null),
            map(_=>{
                if ((window.screen.width > 768) && (window.screen.width < 910) || (window.screen.width < 395))
                    return 2;

                return 3;
            }),
            distinctUntilChanged()
        )
    }

    ngOnInit(): void {
        this.carouselItens = [
            new CarouselItem(
                this.grupoTensao === "A" ? "deb-auto.svg" : "deb-auto_light.svg",
                "Débito automático",
                // ["servicos", "debito-automatico"],
                [PathCompleto.debitoAutomatico.toString()]

            ),
            new CarouselItem(
                this.grupoTensao === "A" ? "email.svg" : "email_light.svg",
                "Fatura digital",
                [PathCompleto.faturaDigital.toString()]
            ),
            new CarouselItem(
                this.grupoTensao === "A" ? "hist-consumo.svg" : "hist-consumo_light.svg",
                "Histórico de consumo",
                [PathCompleto.historicoDeconsumo.toString()]
            ),
            new CarouselItem(
                this.grupoTensao === "A" ? "religa.svg" : "religa_light.svg",
                "Solicitar religação",
                [PathCompleto.religacao.toString()]
            ),
            new CarouselItem(
                this.grupoTensao === "A" ? "autoleitura_green.svg" : "autoleitura_light.svg",
                "Autoleitura",
                [PathCompleto.autoleitura.toString()]
            )
        ];
    }

	navigateTo(routeNavigate: Array<string>): void {
		this._router.navigate(routeNavigate);
	}
}
