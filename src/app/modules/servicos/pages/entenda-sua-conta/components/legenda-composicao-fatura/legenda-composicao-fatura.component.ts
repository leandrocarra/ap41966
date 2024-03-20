import { Component } from '@angular/core';
import { LegendaComposicaoFatura } from 'app/core/models/entenda-sua-conta/grafico/legenda-composicao-fatura';
import { DescricaoLegendasComposicaoFatura, LegendasGrafico } from 'app/core/models/entenda-sua-conta/grafico/legendas-grafico';

@Component({
	selector: 'app-legenda-composicao-fatura',
	templateUrl: './legenda-composicao-fatura.component.html',
	styleUrls: ['./legenda-composicao-fatura.component.scss']
})
export class LegendaComposicaoFaturaComponent {
	descricoes: Array<LegendaComposicaoFatura>;

	constructor() {
		this.descricoes = [
			new LegendaComposicaoFatura(
				"1",
				LegendasGrafico.perdas.toLowerCase(),
				DescricaoLegendasComposicaoFatura.perdas
			),
			new LegendaComposicaoFatura(
				"2",
				LegendasGrafico.geracaoDeEnergia.toLowerCase(),
				DescricaoLegendasComposicaoFatura.geracaoDeEnergia
			),
			new LegendaComposicaoFatura(
				"3",
				LegendasGrafico.tributos.toLowerCase(),
				DescricaoLegendasComposicaoFatura.tributos
			),
			new LegendaComposicaoFatura(
				"4",
				LegendasGrafico.encargos.toLowerCase(),
				DescricaoLegendasComposicaoFatura.encargos
			),
			new LegendaComposicaoFatura(
				"5",
				LegendasGrafico.transmissao.toLowerCase(),
				DescricaoLegendasComposicaoFatura.transmissao
			),
			new LegendaComposicaoFatura(
				"6",
				LegendasGrafico.demaisItens.toLowerCase(),
				DescricaoLegendasComposicaoFatura.demaisItens
			),
			new LegendaComposicaoFatura(
				"7",
				LegendasGrafico.servicoDeDistribuicao.toLowerCase(),
				DescricaoLegendasComposicaoFatura.servicoDeDistribuicao
			),
		];
	}

	showDescription(item: any) {
		if (window.screen.width <= 576) {
			document.getElementById(item.id)!.style.width = document.getElementById(item.id)!.style.width !== '100%' ? '100%' : '47%';
			document.getElementById(item.title)!.style.display = document.getElementById(item.title)!.style.display !== 'block' ? 'block' : 'none';
		}
	}

}
