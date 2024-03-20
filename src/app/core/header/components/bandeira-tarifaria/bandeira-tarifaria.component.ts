import { Component, OnDestroy, OnInit } from '@angular/core';
import { BandeiraTarifariaService } from 'app/core/services/bandeira-tarifaria/bandeira-tarifaria.service';
import { DadosBandeiraTarifaria } from 'app/core/models/bandeira-tarifaria/bandeira-tarifaria';

@Component({
  selector: 'app-bandeira-tarifaria',
  templateUrl: './bandeira-tarifaria.component.html',
  styleUrls: ['./bandeira-tarifaria.component.scss']
})
export class BandeiraTarifariaComponent implements OnInit, OnDestroy {
    public dadosBandeira: DadosBandeiraTarifaria;
    constructor(
        private _bandeiraTarifariaService: BandeiraTarifariaService
    ) {
        this.dadosBandeira = new DadosBandeiraTarifaria();
    }

    ngOnInit(): void {
        this._bandeiraTarifariaService.dadosBandeiraTarifaria.subscribe((dados) => {
            this.dadosBandeira = dados;
        });
    }

    ngOnDestroy(): void {
        this._bandeiraTarifariaService.dadosBandeiraTarifaria.unsubscribe();
    }
}
