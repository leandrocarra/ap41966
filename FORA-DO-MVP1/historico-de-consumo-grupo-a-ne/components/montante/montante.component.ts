import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { configureMenuByWindowSize } from 'app/appLN/core/services/utils/neo-utils.service';
import { UserService } from 'app/core/services/user/user.service';
import { MONTHS } from 'app/core/services/utils/utils.service';
import { Chart, ChartData, ChartDataset, ChartOptions } from 'chart.js';

@Component({
	selector: 'app-montante',
	templateUrl: './montante.component.html',
	styleUrls: ['./montante.component.scss']
})
export class MontanteComponent implements OnInit {
	@ViewChild("barChart") private barChart!: ElementRef;
	@ViewChild("legend") private legend!: ElementRef;

	mobile: boolean;

	@Input() data: any;

	// Variables Chart
	PERIODO = 14;

	montanteContratado: any;
	montanteUso: any;

	bars!: Chart;
	chartData: ChartData;
	chartOptions!: ChartOptions;
	// End Variables Chart

	// DataSets
	montanteContratadoChartDataSet: ChartDataset = {
		label: "Montante de uso contratado (kW)",
		data: [],
		backgroundColor: "rgba(92, 136, 26, 1)",
		borderColor: "rgba(92, 136, 26, 1)",
		hoverBackgroundColor: "rgba(57,84,16,1)",
		hoverBorderColor: "rgba(57,84,16,1)",
		borderWidth: 1,
		type: "bar",
		stack: "Stack 0",
	};
	montanteUsoChartDataSet: ChartDataset = {
		label: "Montante de uso (kW)",
		data: [],
		backgroundColor: "rgba(124, 170, 218, 1)",
		borderColor: "rgba(124, 170, 218, 1)",
		hoverBackgroundColor: "rgba(94,129,166,1)",
		hoverBorderColor: "rgba(94,129,166,1)",
		borderWidth: 1,
		type: "bar",
		stack: "Stack 1",
	};
	// End DataSets

	// Datas
	dataMontanteContratado = [
		{
			dataLeitura: "2021-05-28T00:00:00",
			consumoKw: "0",
			valorFatura: 0,
		},
		{
			dataLeitura: "2021-04-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2021-03-28T00:00:00",
			consumoKw: "5000",
		},
		{
			dataLeitura: "2021-02-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2021-01-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2020-12-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2020-11-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2020-10-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2020-09-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2020-08-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2020-07-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2020-06-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2020-05-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2020-04-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2020-03-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2020-02-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2020-01-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2019-12-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2019-11-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
		{
			dataLeitura: "2019-10-28T00:00:00",
			consumoKw: "5000",
			valorFatura: 5000,
		},
	];
	dataMontanteUso = [
		{
			dataLeitura: "2021-05-28T00:00:00",
			consumoKw: "0",
			valorFatura: 0,
		},
		{
			dataLeitura: "2021-04-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2021-03-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2021-02-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2021-01-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2020-12-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2020-11-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2020-10-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2020-09-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2020-08-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2020-07-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2020-06-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2020-05-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2020-04-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2020-03-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2020-02-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2020-01-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2019-12-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2019-11-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
		{
			dataLeitura: "2019-10-28T00:00:00",
			consumoKw: "4700",
			valorFatura: 4700,
		},
	];
	// End Datas

	constructor(public user: UserService) {
        this.mobile = configureMenuByWindowSize(window.screen.width);
		this.chartData = {
			labels: [],
			datasets: [],
		};
	}

	ngOnInit() {
		this.montanteContratado = this.dataMontanteContratado;
		this.montanteUso = this.dataMontanteUso;
	}

    @HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
	}

	ngOnDestroy(): void { }

	ngAfterViewInit(): void {
		// utilizar apenas um data para definir os meses
		const mesesRotulos = this.getMonthsLabels(this.montanteContratado);
		this.chartData.labels = mesesRotulos;
		this.initChart();
	}

	initChart() {
		this.chartData.datasets = this.fillDataChart();
		const max = this.getMaxDataSet();
		this.settingsOptions(max);
		this.createBarChart();
	}

	fillDataChart(order = false) {
		let datasets: ChartDataset[] = [];
		let chatData = this.ordenarHistorico(this.montanteContratado);
		let data = this.fillDataChartSet(chatData, order);

		this.montanteContratadoChartDataSet.data = data;
		datasets.push(this.montanteContratadoChartDataSet);

		chatData = this.ordenarHistorico(this.montanteUso);
		data = this.fillDataChartSet(chatData, order);
		this.montanteUsoChartDataSet.data = data;
		datasets.push(this.montanteUsoChartDataSet);

		return datasets;
	}

	fillDataChartSet(chartSet: ChartTO[], order = false): number[] {
		let data: number[] = [];
		if (chartSet.length >= this.PERIODO) {
			chartSet = chartSet.slice(0, this.PERIODO);
			data = chartSet
				.map(({ valorFatura, consumoKw }) => {
					return order ? valorFatura : consumoKw;
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

	getSliceChart(chart: any, data: number[], filter: string) {
		const firstItem = chart[0][filter];
		const lastItem = chart[chart.length - 1][filter];
		const indexEnd = data.indexOf(firstItem);
		const part = data.slice(0, indexEnd + 1);
		return part;
	}

	getMaxDataSet() {
		// usar o dataSet que possui o maior valor numérico
		const values = [this.montanteContratadoChartDataSet.data]
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
					valorFatura: consumoData?.valorFatura,
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
			events: ["click"],
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					enabled: true,
					mode: "point",
					position: "nearest"
				},

			},
			scales: {
				xAxis:
				{
					ticks: {
						font: {
							family: "'IberPangea Text','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
							size: 14,
						}

					},
					stacked: true,
					offset: true,
				},
				yAxis: {
					beforeFit: function (scale) {
						const round = max;
						scale.max = round * 1.125;
					},
					stacked: true,
					ticks: {
						font: {
							family: "'IberPangea Text','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
							size: 14,
						}
					},
				},
			},
		};
	}

	createBarChart() {
		this.bars = new Chart(this.barChart.nativeElement, {
			type: 'bar',
			data: this.chartData,
			options: this.chartOptions,
		});
	}

}
type ChartTO = {
	consumoKw: number;
	dataLeitura: Date;
	valorFatura: number;


}
