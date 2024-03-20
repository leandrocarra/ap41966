import { Component } from "@angular/core";
import { DebitoAutomaticoService } from 'app/core/services/debito-automatico/debito-automatico.service';

@Component({
    selector: 'app-debito-automatico',
    templateUrl: './debito-automatico.component.html',
    styleUrls: ['./debito-automatico.component.scss']
})
export class DebitoAutomaticoComponent {
    constructor(
        private _debitoAutomaticoService: DebitoAutomaticoService
    ) {
    }
}
