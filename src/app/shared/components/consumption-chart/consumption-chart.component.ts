import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, LOCALE_ID, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { MatSelect } from "@angular/material/select";
import { ActivatedRoute, Router } from "@angular/router";
import { HistoricoDeConsumoService } from 'app/core/services/historico-de-consumo/historico-de-consumo.service';
import { UserService } from "app/core/services/user/user.service";
import { convertDates, formatarMoeda, MONTHS, PATHS } from "app/core/services/utils/utils.service";
import { Chart, ChartData, ChartDataset, ChartOptions } from "chart.js";

registerLocaleData('pt-BR');

@Component({
	selector: "app-consumption-chart",
	templateUrl: "./consumption-chart.component.html",
	styleUrls: ["./consumption-chart.component.scss"],

	providers: [
		{ provide: LOCALE_ID, useValue: 'pt-BR' }
	]
})
export class ConsumptionChartComponent implements OnInit, AfterViewInit {
	dataTeste = [
		{
			dataLeitura: "2021-05-28T00:00:00",
			consumoKw: "0",
			valorFatura: 0,
		},
		{
			dataLeitura: "2021-04-28T00:00:00",
			consumoKw: "232",
			valorFatura: 234.6,
		},
		{
			dataLeitura: "2021-03-28T00:00:00",
			consumoKw: "212",
			valorFatura: 215.2,
		},
		{
			dataLeitura: "2021-02-28T00:00:00",
			consumoKw: "243",
			valorFatura: 232.7,
		},
		{
			dataLeitura: "2021-01-28T00:00:00",
			consumoKw: "220",
			valorFatura: 230,
		},
		{
			dataLeitura: "2020-12-28T00:00:00",
			consumoKw: "212",
			valorFatura: 223.1,
		},
		{
			dataLeitura: "2020-11-28T00:00:00",
			consumoKw: "287",
			valorFatura: 291.9,
		},
		{
			dataLeitura: "2020-10-28T00:00:00",
			consumoKw: "215",
			valorFatura: 215.3,
		},
		{
			dataLeitura: "2020-09-28T00:00:00",
			consumoKw: "263",
			valorFatura: 251.5,
		},
		{
			dataLeitura: "2020-08-28T00:00:00",
			consumoKw: "211",
			valorFatura: 208.1,
		},
		{
			dataLeitura: "2020-07-28T00:00:00",
			consumoKw: "223",
			valorFatura: 243.8,
		},
		{
			dataLeitura: "2020-06-28T00:00:00",
			consumoKw: "233",
			valorFatura: 211.3,
		},
		{
			dataLeitura: "2020-05-28T00:00:00",
			consumoKw: "229",
			valorFatura: 176.5,
		},
		{
			dataLeitura: "2020-04-28T00:00:00",
			consumoKw: "212",
			valorFatura: 187.2,
		},
		{
			dataLeitura: "2020-03-28T00:00:00",
			consumoKw: "226",
			valorFatura: 209.2,
		},
		{
			dataLeitura: "2020-02-28T00:00:00",
			consumoKw: "229",
			valorFatura: 176.5,
		},
		{
			dataLeitura: "2020-01-28T00:00:00",
			consumoKw: "212",
			valorFatura: 187.2,
		},
		{
			dataLeitura: "2019-12-28T00:00:00",
			consumoKw: "226",
			valorFatura: 209.2,
		},
		{
			dataLeitura: "2019-11-28T00:00:00",
			consumoKw: "212",
			valorFatura: 187.2,
		},
		{
			dataLeitura: "2019-10-28T00:00:00",
			consumoKw: "208",
			valorFatura: 206.7,
		},
	];
	@ViewChildren(MatSelect) matSelectList!: QueryList<MatSelect>;

	closeMenu() {
		this.matSelectList.forEach(element => {
			element.close();
		})
	}

	@HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
		this.closeMenu();
	}

	@ViewChild("barChart") private barChart!: ElementRef;
	@ViewChild("legend") private legend!: ElementRef;
	@Input() isTela!: string;
	@Input() indexPageAutoleitura!: number;
	@Input() valorAutoleitura!: number;
	@Input() checkMedia!: boolean;
	@Input() hasComparacao!: boolean;

	@Input() data!: any;
	@Input() dataAutoleitura: any;

	dataConsumo: any;
	dataValor: any;
	dataImposto: any;
	dataConsumoLastYear: any[] = [];
	dataValorLastYear: any[] = [];

	states: string[] = ["2021", "2020", "2019"];
	consumos: any;
	PERIODO = 13;
	isMoeda = false;
	telaAtual!: string;
	avgRounded: number = 0;
	grandesClientes: boolean;
	hoverColorGrupoA = "#E3850D";
	barColorGrupoA = "#00A443";
	bars!: Chart;
	chartData: ChartData;
	chartOptions!: ChartOptions;

	anoAtual: any = (new Date().getFullYear());
	anos: any = [];
	anoSelecionado: any = (new Date().getFullYear());

	consumosAux: any = [];

	consumoChartDataSet: ChartDataset = {
		data: [],
		backgroundColor: "#00A443",
		borderColor: "#00A443",
		hoverBackgroundColor: "#007F33",
		hoverBorderColor: "#007F33",
		borderWidth: 1,
		type: "bar",
		barThickness: 18,

		// borderCapStyle: 'rounded',
		// borderJoinStyle: "round",
		// radius: 100,
	};
	ultimoValorChartDataSet: ChartDataset = {
		label: "Leitura atual",
		data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		backgroundColor: "#0063BE",
		borderColor: "#0063BE",
		borderWidth: 1,
		type: "bar",
		barThickness: 18,
		borderRadius: 5,
		//@ts-ignore
		borderSkipped: false
	};
	ultimoValorSemCompChartDataSet: ChartDataset = {
		label: "Leitura atual",
		data: [300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		backgroundColor: "#0063BE",
		borderColor: "#0063BE",
		borderWidth: 1,
		type: "bar",
		barThickness: 18,
	};

	mediaChartDataSet: ChartDataset = {
		label: "Média da fatura",
		borderColor: "rgba(221, 60, 39, 1)",
		type: "line",
		borderDash: [5, 10],
		borderWidth: 2,
		data: [],
		pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.5, 0],
		pointHoverRadius: 1.5,
		pointBorderWidth: 3,
		pointHitRadius: 0,
		pointHoverBorderWidth: 0,
		backgroundColor: "rgba(0, 0, 0, 0)",
	};

	lastYearChartDataSet: ChartDataset = {
		label: "Consumo ano anterior",
		borderColor: "rgba(112, 112, 112, 1)",
		type: "line",
		borderWidth: 1.5,
		data: [],
		pointRadius: 2,
		pointBorderWidth: 3,
		pointHoverRadius: 2,
		pointHoverBorderWidth: 3,
		backgroundColor: "rgba(0, 0, 0, 0)"
	};

	constructor(
		public user: UserService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public historicoConsumoService: HistoricoDeConsumoService
	) {
		this.grandesClientes = user.group == "A";
		this.chartData = {
			labels: [],
			datasets: [],
		};
	}

	ngOnInit(): void {
		this.consumos = this.dataTeste;
		this.getDateFiveYears();
	}

	ngAfterViewInit(): void {
		const mesesRotulos = this.getMonthsLabels(this.consumos);
		this.chartData.labels = mesesRotulos;
		this.initChart();
	}

	getConsumosLastYear(consumos: any): void {
		this.dataConsumoLastYear = [];
		this.dataValorLastYear = [];
		this.consumos = this.dataTeste;
		let cons = this.ordenarHistorico(this.consumos);
		cons.forEach(element => {
			if (convertDates(element.dataLeitura).includes((this.anoSelecionado - 1).toString())) {
				this.dataConsumoLastYear.push((element.consumoKw));
				this.dataValorLastYear.push((element.valorFatura));
			}
		});

		this.dataConsumoLastYear = this.dataConsumoLastYear.reverse();
		this.dataValorLastYear = this.dataValorLastYear.reverse();
		console.log('this.dataConsumoLastYear' + this.dataConsumoLastYear);

	}

	initChart() {
		this.chartData.datasets = this.fillDataChart();
		const max = this.getMaxDataSet();
		this.settingsOptions(max);
		this.createBarChart();
	}

	onToggle() {
		this.chartData.datasets = this.fillDataChart(this.isMoeda);
		this.bars.destroy();
		const max = this.getMaxDataSet();
		this.settingsOptions(max);
		this.createBarChart();
	}

	fillDataChart(order = false) {
		const datasets: ChartDataset[] = [];
		const chatData = this.ordenarHistorico(this.consumos);
		const data = this.fillDataChartSet(chatData, order);
		this.consumoChartDataSet.data = data;

		const filtered = data.filter((item) => item !== 0);
		const sum = filtered.reduce((a, b) => a + b, 0);
		const avg = sum / filtered.length || 0;
		this.avgRounded = Math.round(avg);

		this.mediaChartDataSet.data = [
			this.avgRounded,
			this.avgRounded,
			this.avgRounded,
			this.avgRounded,
			this.avgRounded,
			this.avgRounded,
			this.avgRounded,
			this.avgRounded,
			this.avgRounded,
			this.avgRounded,
			this.avgRounded,
			this.avgRounded,
			this.avgRounded,
			null
		];
		this.getConsumosLastYear(chatData);

		if (this.isMoeda) {
			this.lastYearChartDataSet.data = this.dataValorLastYear;
		} else {
			this.lastYearChartDataSet.data = this.dataConsumoLastYear;
		}

		if (!this.router.url.includes('/servicos/autoleitura')) {
			datasets.push(this.mediaChartDataSet);
			datasets.push(this.lastYearChartDataSet);
			datasets.push(this.consumoChartDataSet);
		} else {
			this.mediaChartDataSet.data = [];
			this.consumoChartDataSet.data[12] = 0;
			this.consumoChartDataSet.hoverBackgroundColor = "#00A443";
			this.consumoChartDataSet.hoverBorderColor = "#00A443";
			this.ultimoValorChartDataSet.data[12] = (this.indexPageAutoleitura === 2) ? parseInt(this.valorAutoleitura.toString()) : 0;


			if (this.indexPageAutoleitura === 0) { // Tela inicial autoleitura
				datasets.push(this.consumoChartDataSet);
			} else {
				if (this.indexPageAutoleitura === 2) { // Tela confirmacao autoleituras
					if (!this.hasComparacao) { // Gráfico sem comparacao
						this.ultimoValorSemCompChartDataSet.hoverBackgroundColor = "#0063BE";
						this.ultimoValorSemCompChartDataSet.hoverBorderColor = "#0063BE";
						datasets.push(this.ultimoValorSemCompChartDataSet);

					} else { // Gráfico com comparaçao
						datasets.push(this.consumoChartDataSet);

						if (!this.checkMedia) {  //Gráfico fora da Média
							this.ultimoValorChartDataSet.backgroundColor = "#BE0013";
							this.ultimoValorChartDataSet.borderColor = "#BE0013";
							this.ultimoValorChartDataSet.hoverBackgroundColor = "#BE0013";
							this.ultimoValorChartDataSet.hoverBorderColor = "#BE0013";

						} else { //Gráfico na da Média
							this.ultimoValorChartDataSet.hoverBackgroundColor = "#0063BE";
							this.ultimoValorChartDataSet.hoverBorderColor = "#0063BE";
						}

						datasets.push(this.ultimoValorChartDataSet);
					}
				}
			}
		}

		if (this.grandesClientes) {
			this.consumoChartDataSet.backgroundColor = this.barColorGrupoA;
			this.consumoChartDataSet.borderColor = this.barColorGrupoA;
			this.consumoChartDataSet.hoverBackgroundColor = this.hoverColorGrupoA;
			this.consumoChartDataSet.hoverBorderColor = this.hoverColorGrupoA;
			// this.consumoChartDataSet. = 18;
		}
		if (this.isMoeda) {
			this.consumoChartDataSet.label = "Valor em real";
		} else {
			this.consumoChartDataSet.label = (this.router.url.includes('/servicos/autoleitura')) ? 'Meses anteriores' : 'Consumo';
		}
		return datasets;
	}

	fillDataChartSet(chartSet: ChartTO[], order = false): number[] {
		let data: any[] = [];

		if (chartSet.length >= this.PERIODO) {
			chartSet = chartSet.slice(0, this.PERIODO);
			data = chartSet
				.map(({ valorFatura, consumoKw }) => {
					return order ? parseInt(valorFatura.toString()) : consumoKw;
				})
				.reverse();

			order = false;
			this.dataConsumo = chartSet
				.map(({ valorFatura, consumoKw }) => {
					return order ? parseInt(valorFatura.toString()) : consumoKw;
				})
				.reverse();

			order = true;
			this.dataValor = chartSet
				.map(({ valorFatura, consumoKw }) => {
					return order ? parseInt(valorFatura.toString()) : consumoKw;
				})
				.reverse();

			this.dataImposto = chartSet
				.map(({ valorImposto }) => {
					return valorImposto;
				})
				.reverse();

		} else {
			data = this.chartSetForYear(chartSet, order);
		}

		return data;
	}

	chartSetForYear(chartSet: ChartTO[], order: boolean) {
		const primeiroHistoricoAno = this.getYearChart(chartSet);
		const dataFirstChartSet = chartSet.filter(
			(historico) => historico.dataLeitura.getFullYear() == primeiroHistoricoAno
		);
		const dataLastChartSet = chartSet.filter(
			(historico) => historico.dataLeitura.getFullYear() != primeiroHistoricoAno
		);
		if (dataLastChartSet.length && dataFirstChartSet.length) {
			const firstData = Array<number>(this.PERIODO).fill(0);
			const lastData = Array<number>(this.PERIODO).fill(0);
			dataFirstChartSet.forEach(({ dataLeitura, valorFatura, consumoKw }) => {
				const value = order ? valorFatura : consumoKw;
				firstData[dataLeitura.getUTCMonth()] = value;
			});
			dataLastChartSet.forEach(({ dataLeitura, valorFatura, consumoKw }) => {
				const value = order ? valorFatura : consumoKw;
				lastData[dataLeitura.getUTCMonth()] = value;
			});
			const value = order ? "valorFatura" : "consumoKw";
			const first = this.getSliceChart(dataFirstChartSet, firstData, value);
			const total = [...lastData, ...first];
			const data = total.slice(
				Math.abs(this.PERIODO - total.length),
				total.length
			);
			return data;
		} else {
			const twelveData = Array<number>(this.PERIODO).fill(0);
			chartSet.forEach(({ dataLeitura, valorFatura, consumoKw }) => {
				const value = order ? valorFatura : consumoKw;
				twelveData[dataLeitura.getUTCMonth()] = value;
			});
			return twelveData;
		}
	}

	getSliceChart(chart: any, data: any, filter: string) {
		const firstItem: any = chart[0][filter];
		const lastItem: any = chart[chart.length - 1][filter];
		const indexEnd = data.indexOf(firstItem);
		const part = data.slice(0, indexEnd + 1);
		return part;
	}

	getMaxDataSet() {
		const values = [this.consumoChartDataSet.data, this.lastYearChartDataSet.data]
			.join()
			.split(",")
			.map((x) => +x);
		const max = Math.max(...values);
		return max;
	}

	getMonthsLabels(historico: any) {
		const datas = this.ordenarHistorico(historico).map(
			(data) => data.dataLeitura
		);
		let meses: Array<Date>;
		if (datas.length >= this.PERIODO) {
			meses = datas.slice(0, this.PERIODO);
		} else {
			const primeiraData = datas[0];
			meses = this.toCompleteLabelsWithYear(primeiraData, this.PERIODO);
		}
		const labels = this.renameLabel(meses);
		return labels;
	}

	toCompleteLabelsWithYear(
		firstDate: Date,
		qtdForCompleted: number
	): Array<Date> {
		const generateDate = Array(qtdForCompleted).fill(firstDate);
		const newDates = generateDate.map((data, index) => {
			return new Date(
				data.getUTCFullYear(),
				data.getUTCMonth() - index,
				data.getUTCDate()
			);
		});
		return newDates;
	}

	getYearChart(data: ChartTO[]): number | string {
		const primeiroConsumo = data && data[0];
		const primeiroDadoAno = primeiroConsumo.dataLeitura.getFullYear();
		return primeiroDadoAno;
	}

	renameLabel(datas: Array<Date>) {
		const labelFirst = datas[0].getUTCFullYear();
		const labelYearFirst = datas
			.filter((date) => date.getUTCFullYear() == labelFirst)
			.reverse();
		const labelYearLast = datas
			.filter((date) => date.getUTCFullYear() != labelFirst)
			.reverse();
		const labelYearFirtsText = labelYearFirst.map((date, index) => {
			const text = this.dateToTextMonthYear(date, index);
			return text;
		});
		if (labelYearLast.length) {
			const labelYearLastText = labelYearLast.map((date, index) => {
				const text = this.dateToTextMonthYear(date, index);
				return text;
			});
			return [...labelYearLastText, ...labelYearFirtsText];
		}
		return labelYearFirtsText;
	}

	dateToTextMonthYear(date: Date, index: number): string | string[] {
		const month = MONTHS[date.getUTCMonth()];
		const year = date.getUTCFullYear().toString();
		if (month == "Mai" && year == "2021") {
			return ``;
		}
		const text = [`${month}​`, `${year}​`];
		return text;
	}

	ordenarHistorico(historicoPorData: any): ChartTO[] {
		const consumos: ChartTO[] = historicoPorData
			.map((consumoData: any) => {
				const data: ChartTO = {
					dataLeitura: new Date(consumoData.dataLeitura),
					consumoKw: parseInt(consumoData.consumoKw),
					valorFatura: parseInt(consumoData?.valorFatura),
					valorImposto: parseInt(consumoData?.valorImposto)
				};
				return data;
			})
			.sort((a: any, b: any) => {
				if (a.dataLeitura.getTime() > b.dataLeitura.getTime()) {
					return -1;
				} else if (a.dataLeitura.getTime() < b.dataLeitura.getTime()) {
					return 1;
				}
				return 0;
			});
		return consumos;
	}

	settingsOptions(max: number) {
		this.chartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				xAxis: {
					ticks: {
						font: {
							family: "'IberPangea Text','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
							size: 12,
						}
					},
					stacked: true,
					offset: true,
				},
				yAxis: {
					beginAtZero: true,
					beforeFit: function (scale: any) {
						const round = max;
						scale.max = round * 1.125;
					},
					stacked: true,
					ticks: {
						font: {
							family: "'IberPangea Text','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
							size: 12
						}
					},
				},
			},
			plugins: {
				tooltip: {
					filter: function (tooltipItem: any) {
						return tooltipItem.datasetIndex === 2;
					},
					callbacks: {
						// title: (item: any, data: any): => {
						// 	if (item.length > 0) {
						// 		const label = item[0].value ?? "0";
						// 		if (this.isMoeda) {
						// 			const value = +item[0].value;
						// 			const label = formatarMoeda(value);
						// 			return `Valor da conta: ${label}​` as string;
						// 		}
						// 		const labelConta = this.dataValor[item[0].index]
						// 		return `Consumo: ${label}​ kWh\r\nValor da conta: R$ ${labelConta}` as string;
						// 	}
						// },
						// label: function(item: any) {
						// 	if (!this.isMoeda) {
						// 		const labelImposto = this.dataImposto[item.index];
						// 		return `      Valor do imposto (ICMS+PIS+CONFINS): R$ ${labelImposto}` as string;
						// 	}
						// }
						label: function (context) {
							let label = context.dataset.label || '';

							if (label) {
								label += ': ';
							}
							if (context.parsed.y !== null) {
								label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
							}
							return label;
						}
					}
				}
			}
		};
	}

	createBarChart() {
		this.bars = new Chart(this.barChart.nativeElement, {
			type: 'line',
			data: this.chartData,
			options: this.chartOptions,
		});
	}

	goToHistorico() {
		this.router.navigate([PATHS.servicos, PATHS.historicoConsumo]);
	}

	getDateFiveYears() {
		this.anos.push('Últimos 13 meses');
		this.anos.push(this.anoAtual);
		this.anos.push(this.anoAtual - 1);
		this.anos.push(this.anoAtual - 2);
		this.anos.push(this.anoAtual - 3);
	}

	filterYear(ano: any) {
		this.consumos = this.historicoConsumoService.getDataHistorico;
		let cons = this.ordenarHistorico(this.consumos);
		this.consumosAux = [];

		cons.forEach(element => {
			if (convertDates(element.dataLeitura).includes(ano.toString())) {
				this.consumosAux.push(element);
			}
		});
		this.consumos = this.consumosAux;
	}

	onChangeCombobox(event: any) {
		if (event.value.length > 4) {
			const mesesRotulos = this.getMonthsLabels(this.consumos);
			this.chartData.labels = mesesRotulos;
			this.consumos = this.historicoConsumoService.getDataHistorico;
		} else {
			if (event.value) {
				this.filterYear(event.value);
				this.anoSelecionado = event.value;
			}

			this.chartData.labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez", "Jan", " ",
			];
		}
		this.chartData.datasets = this.fillDataChart(this.isMoeda);
		this.bars.destroy();
		const max = this.getMaxDataSet();
		this.settingsOptions(max);
		this.createBarChart();
	}
}


type ChartTO = {
	consumoKw: number;
	dataLeitura: Date;
	valorFatura: number;
	valorImposto: number;
};
