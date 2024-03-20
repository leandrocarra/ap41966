import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UCCondensada } from 'app/core/models/segunda-via-pagamento/segunda-via-pagamento';

@Component({
  selector: 'app-unidade-consumidora',
  templateUrl: './unidade-consumidora.component.html',
  styleUrls: ['./unidade-consumidora.component.scss']
})
export class UnidadeConsumidoraComponent {
    @Input() listaDeImoveis: Array<UCCondensada>;
    @Output() ucSegundaViaLogin: EventEmitter<UCCondensada> = new EventEmitter<UCCondensada>();
    constructor() {
        this.listaDeImoveis = [];
    }

    redirecionar(imovel: UCCondensada): void {
        this.ucSegundaViaLogin.emit(imovel);
    }
}

