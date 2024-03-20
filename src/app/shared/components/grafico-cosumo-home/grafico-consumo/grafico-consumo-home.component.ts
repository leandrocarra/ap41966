import { Component, ElementRef, HostListener, LOCALE_ID, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { TipoVisualizacao } from "app/core/models/hitorico-de-consumo/historico-de-consumo";
import { ConsumosDTOResponse, EspecificacaoConsumoDTO, LeituraDeConsumoDTO } from "app/core/models/hitorico-de-consumo/response/historico-de-consumo-dto";
import { HistoricoDeConsumoService } from "app/core/services/historico-de-consumo/historico-de-consumo.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { registerables  } from "chart.js";
import Chart from 'chart.js/auto';
import ChartDataLabels from "chartjs-plugin-datalabels";


@Component({
	selector: "app-grafico-consumo-home",
	templateUrl: "./grafico-consumo-home.component.html",
	styleUrls: ["./grafico-consumo-home.component.scss"],
	providers: [
		{ provide: LOCALE_ID, useValue: "pt-BR" }
	],
	encapsulation: ViewEncapsulation.None
})
export class GraficoConsumoHomeComponent {

	@ViewChild("barChart") private barChart!: ElementRef;
	consumos: ConsumosDTOResponse;
	chart!: Chart;
	mobile: boolean;
	anoSelecionado: string;
	interacaoGrafico: string;
	tipoGrafico: TipoVisualizacao;
	anosPossiveis: string[];
	arrayLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    rota: string
    regiao: string

	constructor(
		private _historicoDeConsumo: HistoricoDeConsumoService,
        private router: Router
	) {
        this.anoSelecionado = this._historicoDeConsumo.getDataChart();
        this.consumos = this._historicoDeConsumo.getHistoricoConsumo;
		this.anosPossiveis = this.preencherAnosPossiveis();
		this.tipoGrafico = "kWh";
		this.mobile = configureMenuByWindowSize(window.screen.width);
		this.interacaoGrafico = (this.mobile) ? "Toque na legenda" : "Toque nas barras";
		Chart.register(ChartDataLabels, ...registerables);

        this.rota = this.router.url;
        this.regiao = environment.regiao
	}

    cleanDate(date:any):Date {
        let clear = date.split('/');
        const dateString = `${clear[2]}-${clear[1]}-${clear[0]}`;
        const newDate = new Date(dateString);
        return newDate;
    }
	preencherAnosPossiveis(): Array<string> {
		const anoAtual = new Date().getFullYear();
		let anosPossiveis: Array<string> = [];
		for (let index = anoAtual; index > (anoAtual - 5); index--) {
			anosPossiveis.push(index.toString());
		}
		return anosPossiveis;
	}

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
		this.interacaoGrafico = (this.mobile) ? "Toque na legenda" : "Toque nas barras";
	}

	ngAfterViewInit(): void {
        this.criarGrafico();
	}

    dataHistorico() {
        const data = this.atualizarDados();
        let kWh:Array<number> = [];
        let price:Array<number> = [];
        let media:Array<number> = [];
        let soma:number = 0;
        for (let index = 0; index < data.length; index++) {
            kWh.push(data[index].kWh);
            price.push(data[index].price);
            soma += data[index].price;
        };
        for (let index = 0; index < data.length; index++) {
            media.push(soma / 12);
        };
        let index = [];
        for (let i = 0; i < kWh.length; i++) {
            if (kWh[i] != 0) {
                index.push(kWh[i]);
            }
        };
        const info = {
            kWh,
            price,
            index,
            media
        };
        return info;
    }

	criarGrafico() {
		let data = this.dataHistorico();
		this.chart = new Chart(this.barChart.nativeElement, {
			type: "bar",
			data: {
				labels: this.arrayLabels,
				datasets: [
                    {
						label: "Média de valor da fatura",
						type: "line",
						data: data.media,
						borderColor: "rgba(221, 60, 39, 1)",
						borderDash: [5, 10],
						borderWidth: 2,
						pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.5, 0],
						pointHoverRadius: 1.5,
						pointBorderWidth: 3,
						pointHitRadius: 0,
						pointHoverBorderWidth: 0,
						backgroundColor: "rgba(0, 0, 0, 0)",
					},
					{
						label: "Consumo",
						data: data.kWh,
						backgroundColor: data.index.map((_item, index) => {
							if (index === data.index.length - 1) return "#14A7FF";
							else return "#00A443";
						}),
						hoverBackgroundColor: data.index.map((_item, index) => {
							if (index === data.index.length - 1) return "#0063be";
							else return "#007F33";
						}),
						barThickness: this.mobile ? 'flex' : 26,
					},
				]
			},

			//opções
			options: {
				layout: {
					padding: 20
				},
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false,
						position: 'bottom'
					},
					datalabels: {
						display: false,
					},
					tooltip: {
						enabled: false,
						position: 'nearest',
						external: this.externalTooltipHandler
					}
				}
			}
		})
	}

	mudarVisualizacao() {
		let data = this.dataHistorico();
        this.chart.data.datasets[0].label = this.tipoGrafico === 'kWh' ? "Consumo" : "Valor da Conta: R$";
        this.chart.data.datasets[1].data = this.chart.data.datasets[0].label === "Consumo" ? data.kWh : data.price;
        this.chart.data.datasets[0].data = data.media;
        this.chart.data.datasets[1].backgroundColor = data.index.map((_item, index) => {
            if (index === data.index.length - 1) return "#14A7FF";
            else return "#00A443";
        });
		this.chart.update();
	}

	atualizarDados() {

        const dadoFiltradoPorAno = this.consumos.historicoConsumo.slice(0, 13);

        let objMonth:Array<string> = [];
        dadoFiltradoPorAno.map((element) => {
            const data = element.mesReferencia.toString();
            const split = data.split("/") as any;
            const date = new Date(split[1], split[0] - 1);
            const month = this.arrayLabels[date.getMonth()]
            objMonth.push(month);
        });
        this.arrayLabels = objMonth.reverse();

        let objArray:Array<{ data: number; kWh: string; price: string; }> = [];
        dadoFiltradoPorAno.map((element) => {
            const data = element.mesReferencia.toString();
            const split = data.split("/") as any;
            const mes = parseInt(split[0], 10);
            const obj = {
                    data: mes,
                    kWh: element.consumoKw,
                    price: element.valorFatura,
                };
            objArray.push(obj);
        });

        let arrayObj: Array<{kWh:number, price: number}> = [];

        for (let index = 0; index < objArray.length; index++) {
            const strkWh = objArray[index].kWh.split(',')
            const numberkWh = strkWh[0].split('.')
            const newkWh = numberkWh[1] === undefined ? `${numberkWh[0]}` : `${numberkWh[0]}${numberkWh[1]}`
            const kWh = Number(newkWh);
            const priceData = objArray[index].price.split(',');
            const firstPrice = priceData[0].split('.');
            const priceNumber = Number(firstPrice[1] === undefined ? `${firstPrice[0]}.${priceData[1]}` : `${firstPrice[0]}${firstPrice[1]}.${priceData[1]}`);
            let dados = {
                kWh: kWh,
                price: priceNumber
            };
            arrayObj.push(dados);
        }
		return arrayObj.reverse();
	}

	getOrCreateTooltip = (chart: any) => {
		let tooltipEl = chart.canvas.parentNode.querySelector('div');

		if (!tooltipEl) {
			tooltipEl = document.createElement('div');
			tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
			tooltipEl.style.borderRadius = '3px';
			tooltipEl.style.color = 'white';
			tooltipEl.style.width = '170px';
			tooltipEl.style.width = 'fit-content !important';
			tooltipEl.style.opacity = 1;
			tooltipEl.style.pointerEvents = 'none';
			tooltipEl.style.position = 'absolute';
			tooltipEl.style.transform = 'translate(-50%, 0)';
			tooltipEl.style.transition = 'all .1s ease';

			const table = document.createElement('table');
			table.style.margin = '0px';

			tooltipEl.appendChild(table);
			chart.canvas.parentNode.appendChild(tooltipEl);
		}

		return tooltipEl;
	};

	externalTooltipHandler = (context: any) => {
		// Tooltip Element
		const { chart, tooltip } = context;
		const tooltipEl = this.getOrCreateTooltip(chart);

		// Hide if no tooltip
		if (tooltip.opacity === 0) {
			tooltipEl.style.opacity = 0;
			return;
		}

		// Set Text
		if (tooltip.body) {
			const titleLines = tooltip.title || [];
			const bodyLines = tooltip.body.map((b: any) => b.lines);
			const tableHead = document.createElement('thead');

			titleLines.forEach((title: any) => {
				const tr = document.createElement('tr');
				tr.style.borderWidth = "0";

				const th = document.createElement('th');
				th.style.borderWidth = "0";
				tr.appendChild(th);
				tableHead.appendChild(tr);
			});

			const tableBody = document.createElement('tbody');
			bodyLines.forEach((body: any, i: any) => {
				const colors = tooltip.labelColors[i];

				const span = document.createElement('span');
				span.style.background = colors.backgroundColor;
				span.style.borderColor = colors.borderColor;
				span.style.borderWidth = '2px';
				span.style.marginRight = '10px';
				span.style.height = '10px';
				span.style.width = '30px';
				span.style.display = 'inline-block';

				const tr = document.createElement('tr');
				tr.style.backgroundColor = 'inherit';
				tr.style.borderWidth = "0";

				const td = document.createElement('td');
				td.style.borderWidth = "0";

				const text = document.createTextNode(body);

				td.appendChild(span);
				td.appendChild(text);
				tr.appendChild(td);
				tableBody.appendChild(tr);

			});

			const tableRoot = tooltipEl.querySelector('table');

			// Remove old children
			while (tableRoot.firstChild) {
				tableRoot.firstChild.remove();
			}

			// Add new children
			tableRoot.appendChild(tableHead);
			tableRoot.appendChild(tableBody);
		}

		const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

		// Display, position, and set styles for font
		tooltipEl.style.opacity = 1;
		tooltipEl.style.left = positionX + tooltip.caretX + 'px';
		tooltipEl.style.top = positionY + tooltip.caretY + 'px';
		tooltipEl.style.font = tooltip.options.bodyFont.string;
		tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
	};
}
