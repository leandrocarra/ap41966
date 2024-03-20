import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculadoraUtilsService } from '../../../../../../core/services/calculadora/calculadora-utils.service';

@Component({
	selector: 'neo-edit-calculadora',
	templateUrl: './edit-calculadora.component.html',
	styleUrls: ['./edit-calculadora.component.scss']
})
export class EditCalculadoraComponent {
	@Input() equipamento: any;
	@Input() mode: 'EDIT' | 'ADD' | '';
	@Output() add = new EventEmitter();
	@Output() selecionarEquipamento = new EventEmitter;
	@Output() cancelar = new EventEmitter;
	equipamentoForm: FormGroup;
	quantidadeCount: number;
	potencias: any;
	constructor(
		private formBuilder: FormBuilder,
		private calculadoraService: CalculadoraUtilsService
	) {
        this.mode = '';
		this.equipamentoForm = this.createForm();
        this.quantidadeCount = 0;
	}

	ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
		if (changes['equipamento'] && changes['equipamento'] != undefined) {
			this.quantidadeCount = 1;
			this.potencias = this.calculadoraService.getPotencias(changes['equipamento'].currentValue.equipamento);
		}
	}

	createForm(): FormGroup {
		return this.formBuilder.group({
			nome: [
				""
			],
			potencia: [
				"",
				[
					Validators.required
				]
			],
			quantidade: [
				1,
				[
					Validators.required
				]
			],
		});
	}

	diminuirQuantidade() {
		this.quantidadeCount -= 1;
		this.equipamentoForm.patchValue({
			quantidade: this.quantidadeCount
		});
	}

	aumentarQuantidade() {
		this.quantidadeCount += 1;
		this.equipamentoForm.patchValue({
			quantidade: this.quantidadeCount
		});
	}

	adicionar(): void {
		this.add.emit(this.formatarEquipamento(this.equipamentoForm.value));
		this.selecionarEquipamento.emit();
	}

	formatarEquipamento(equipamento: any) {
		return {
			'class': this.equipamento.class,
			'nome': equipamento.nome,
			'equipamento': this.equipamento?.equipamento,
			'potencia': equipamento.potencia.value,
			'quantidade': equipamento.quantidade,
			'potenciaReal': equipamento.potencia.key,
			'objeto': {
				'codigoAparelho': equipamento.potencia.codigoAparelho,
				'codigoSubTipoAparelho': equipamento.potencia.codigoSubTipoAparelho,
				'codigoTipoAparelho': equipamento.potencia.codigoTipoAparelho,
				'descricaoSubTipoAparelho': equipamento.potencia.descricaoSubTipoAparelho,
				'quantidadeAparelho': equipamento.quantidade
			}
		}
	}
}
