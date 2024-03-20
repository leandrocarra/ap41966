import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'neo-equipamentos-adicionados',
	templateUrl: './equipamentos-adicionados.component.html',
	styleUrls: ['./equipamentos-adicionados.component.scss']
})
export class EquipamentosAdicionadosComponent {
	@Input() equipamento: any;
	@Input() index: number;
	@Input() mobile: boolean;
	@Output() selecionarEquipamento = new EventEmitter;
	@Output() excluir = new EventEmitter;
	@Output() salvarAlteracao = new EventEmitter;
	editar: boolean;

	constructor() {
		this.editar = false;
        this.index = 0;
        this.mobile = false;
	}

	atualizar(equipamento: any) {
		this.salvarAlteracao.emit(equipamento);
	}

	cancelar() {
		this.editar = false;
	}
}
