import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'neo-item-calculadora',
    templateUrl: './item-calculadora.component.html',
    styleUrls: ['./item-calculadora.component.scss']
})
export class ItemCalculadoraComponent {
    @Input() equipamento: any;
    @Input() mobile: boolean;
    @Output() add = new EventEmitter();
    @Output() selecionarEquipamento = new EventEmitter();
    constructor() {
        this.mobile = false;
    }

    adicionar(equipamento: any) {
        this.add.emit(equipamento);
        this.selecionarEquipamento.emit();
    }
}
