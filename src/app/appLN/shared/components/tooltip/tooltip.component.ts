import { Component, Input } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { CustomSweetAlertService } from '../../../core/services/sweet-alert/custom-sweet-alert.service';

@Component({
  selector: 'neo-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})

/*Componente de tooltip do sistema.*/
export class TooltipComponent {
    @Input() explicacao: string;
    @Input() positionValue: TooltipPosition | undefined;
    constructor(
        private _alert: CustomSweetAlertService,
    ) {
        this.explicacao = '';
        this.positionValue = !this.positionValue ? "below" : this.positionValue;
    }

    showMessage() {
        this._alert.alertInfoHtml(this.explicacao.replace(/\n/g, '<br/>'));
    }
}
