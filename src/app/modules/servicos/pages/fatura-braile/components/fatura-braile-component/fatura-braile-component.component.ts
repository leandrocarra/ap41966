import { Component, OnDestroy, OnInit, Input } from "@angular/core";

@Component({
    selector: 'app-fatura-braile-component',
    templateUrl: './fatura-braile-component.component.html',
    styleUrls: ['./fatura-braile-component.component.scss']
})

export class FaturaBraileComponentComponent implements OnInit, OnDestroy {

    @Input() tipoServicoBraile!: any;
    
    constructor() {

    }

    ngOnInit() {

    }

    ngOnDestroy() {}
}