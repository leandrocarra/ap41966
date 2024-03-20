import { HistoricoDeConsumoService } from '../../../../core/services/historico-de-consumo/historico-de-consumo.service';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/core/services/user/user.service';
import { formatarMoeda, MONTHS } from 'app/core/services/utils/utils.service';
import { Chart, ChartData, ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-historico-consumo-chart',
  templateUrl: './historico-consumo-chart.component.html',
  styleUrls: ['./historico-consumo-chart.component.scss']
})
export class HistoricoConsumoChartComponent {}
//   @ViewChildren(MatSelect) matSelectList!: QueryList<MatSelect>;

//   closeMenu() {
//     this.matSelectList.forEach(element => {
//       element.close();
//     })
//   }

//   @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
//     this.closeMenu();
//   }

//   @ViewChild("barChart") private barChart!: ElementRef;
//   @ViewChild("legend") private legend": ElementRef;

//   consumos: any;
//   PERIODO = 14;
//   avgRounded: number = 0;
//   grandesClientes!: boolean;

//   dataValor: any;
//   dataConsumo: any;

//   // Criação do gráfico de barras
//   bars!: Chart;
//   chartData: ChartData;
//   chartOptions!: ChartOptions;
//   consumoChartDataSet: ChartDataset = {
//     data: [],
//     backgroundColor: "rgba(164, 186, 8, 1)",
//     borderColor: "rgba(164, 186, 8, 1)",
//     hoverBackgroundColor: "#007F33",
//     hoverBorderColor: "#007F33",
//     borderWidth: 1,
//     type: "bar",
//     barThickness: 20,
//   };

//   // Criação do gráfico de linhas (Média da Fatura)
//   mediaChartDataSet: ChartDataset = {
//     label: "Média da fatura",
//     borderColor: "rgba(221, 60, 39, 1)",
//     type: "line",
//     borderDash: [5, 10],
//     borderWidth: 2,
//     pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.5, 0],
//     pointHoverRadius: 1.5,
//     pointBorderWidth: 3,
//     pointHitRadius: 0,
//     pointHoverBorderWidth: 0,
//     backgroundColor: "rgba(0, 0, 0, 0)",
//   };

//   isMoeda = false;
//   dataTeste = [
//     {
//       dataLeitura: "2021-05-28T00:00:00",
//       consumoKw: "0",
//       valorFatura: 0,
//     },
//     {
//       dataLeitura: "2021-04-28T00:00:00",
//       consumoKw: "232",
//       valorFatura: 234.6,
//     },
//     {
//       dataLeitura: "2021-03-28T00:00:00",
//       consumoKw: "212",
//       valorFatura: 215.2,
//     },
//     {
//       dataLeitura: "2021-02-28T00:00:00",
//       consumoKw: "243",
//       valorFatura: 232.7,
//     },
//     {
//       dataLeitura: "2021-01-28T00:00:00",
//       consumoKw: "220",
//       valorFatura: 230,
//     },
//     {
//       dataLeitura: "2020-12-28T00:00:00",
//       consumoKw: "212",
//       valorFatura: 223.1,
//     },
//     {
//       dataLeitura: "2020-11-28T00:00:00",
//       consumoKw: "287",
//       valorFatura: 291.9,
//     },
//     {
//       dataLeitura: "2020-10-28T00:00:00",
//       consumoKw: "215",
//       valorFatura: 215.3,
//     },
//     {
//       dataLeitura: "2020-09-28T00:00:00",
//       consumoKw: "263",
//       valorFatura: 251.5,
//     },
//     {
//       dataLeitura: "2020-08-28T00:00:00",
//       consumoKw: "211",
//       valorFatura: 208.1,
//     },
//     {
//       dataLeitura: "2020-07-28T00:00:00",
//       consumoKw: "223",
//       valorFatura: 243.8,
//     },
//     {
//       dataLeitura: "2020-06-28T00:00:00",
//       consumoKw: "233",
//       valorFatura: 211.3,
//     },
//     {
//       dataLeitura: "2020-05-28T00:00:00",
//       consumoKw: "229",
//       valorFatura: 176.5,
//     },
//     {
//       dataLeitura: "2020-04-28T00:00:00",
//       consumoKw: "212",
//       valorFatura: 187.2,
//     },
//     {
//       dataLeitura: "2020-03-28T00:00:00",
//       consumoKw: "226",
//       valorFatura: 209.2,
//     },
//     {
//       dataLeitura: "2020-02-28T00:00:00",
//       consumoKw: "229",
//       valorFatura: 176.5,
//     },
//     {
//       dataLeitura: "2020-01-28T00:00:00",
//       consumoKw: "212",
//       valorFatura: 187.2,
//     },
//     {
//       dataLeitura: "2019-12-28T00:00:00",
//       consumoKw: "226",
//       valorFatura: 209.2,
//     },
//     {
//       dataLeitura: "2019-11-28T00:00:00",
//       consumoKw: "212",
//       valorFatura: 187.2,
//     },
//     {
//       dataLeitura: "2019-10-28T00:00:00",
//       consumoKw: "208",
//       valorFatura: 206.7,
//     },
//   ];



//   /* data2021, data2020 e data2019
//     data2021 = [
//       {
//         dataLeitura: "2021-05-28T00:00:00",
//         consumoKw: "0",
//         valorFatura: 0,
//       },
//       {
//         dataLeitura: "2021-04-28T00:00:00",
//         consumoKw: "232",
//         valorFatura: 234.6,
//       },
//       {
//         dataLeitura: "2021-03-28T00:00:00",
//         consumoKw: "212",
//         valorFatura: 215.2,
//       },
//       {
//         dataLeitura: "2021-02-28T00:00:00",
//         consumoKw: "243",
//         valorFatura: 232.7,
//       },
//       {
//         dataLeitura: "2021-01-28T00:00:00",
//         consumoKw: "265",
//         valorFatura: 254.8,
//       },
//     ];

//     data2020 = [
//       {
//         dataLeitura: "2021-02-28T00:00:00",
//         consumoKw: "0",
//         valorFatura: 0,
//       },
//       {
//         dataLeitura: "2021-01-28T00:00:00",
//         consumoKw: "215",
//         valorFatura: 228.1,
//       },
//       {
//         dataLeitura: "2020-12-28T00:00:00",
//         consumoKw: "212",
//         valorFatura: 223.1,
//       },
//       {
//         dataLeitura: "2020-11-28T00:00:00",
//         consumoKw: "287",
//         valorFatura: 291.9,
//       },
//       {
//         dataLeitura: "2020-10-28T00:00:00",
//         consumoKw: "215",
//         valorFatura: 215.3,
//       },
//       {
//         dataLeitura: "2020-09-28T00:00:00",
//         consumoKw: "263",
//         valorFatura: 251.5,
//       },
//       {
//         dataLeitura: "2020-08-28T00:00:00",
//         consumoKw: "211",
//         valorFatura: 208.1,
//       },
//       {
//         dataLeitura: "2020-07-28T00:00:00",
//         consumoKw: "223",
//         valorFatura: 243.8,
//       },
//       {
//         dataLeitura: "2020-06-28T00:00:00",
//         consumoKw: "233",
//         valorFatura: 211.3,
//       },
//       {
//         dataLeitura: "2020-05-28T00:00:00",
//         consumoKw: "229",
//         valorFatura: 176.5,
//       },
//       {
//         dataLeitura: "2020-04-28T00:00:00",
//         consumoKw: "212",
//         valorFatura: 187.2,
//       },
//       {
//         dataLeitura: "2020-03-28T00:00:00",
//         consumoKw: "226",
//         valorFatura: 209.2,
//       },
//       {
//         dataLeitura: "2020-02-28T00:00:00",
//         consumoKw: "229",
//         valorFatura: 176.5,
//       },
//       {
//         dataLeitura: "2020-01-28T00:00:00",
//         consumoKw: "212",
//         valorFatura: 187.2,
//       },
//     ];

//     data2019 = [
//       {
//         dataLeitura: "2020-02-28T00:00:00",
//         consumoKw: "0",
//         valorFatura: 0,
//       },
//       {
//         dataLeitura: "2020-01-28T00:00:00",
//         consumoKw: "221",
//         valorFatura: 218.2,
//       },
//       {
//         dataLeitura: "2019-12-28T00:00:00",
//         consumoKw: "232",
//         valorFatura: 234.6,
//       },
//       {
//         dataLeitura: "2019-11-28T00:00:00",
//         consumoKw: "212",
//         valorFatura: 215.2,
//       },
//       {
//         dataLeitura: "2019-10-28T00:00:00",
//         consumoKw: "243",
//         valorFatura: 232.7,
//       },
//       {
//         dataLeitura: "2019-09-28T00:00:00",
//         consumoKw: "265",
//         valorFatura: 254.8,
//       },
//       {
//         dataLeitura: "2019-08-28T00:00:00",
//         consumoKw: "232",
//         valorFatura: 234.6,
//       },
//       {
//         dataLeitura: "2019-07-28T00:00:00",
//         consumoKw: "212",
//         valorFatura: 215.2,
//       },
//       {
//         dataLeitura: "2019-06-28T00:00:00",
//         consumoKw: "243",
//         valorFatura: 232.7,
//       },
//       {
//         dataLeitura: "2019-05-28T00:00:00",
//         consumoKw: "265",
//         valorFatura: 254.8,
//       },
//       {
//         dataLeitura: "2019-04-28T00:00:00",
//         consumoKw: "232",
//         valorFatura: 234.6,
//       },
//       {
//         dataLeitura: "2019-03-28T00:00:00",
//         consumoKw: "212",
//         valorFatura: 215.2,
//       },
//       {
//         dataLeitura: "2019-02-28T00:00:00",
//         consumoKw: "243",
//         valorFatura: 232.7,
//       },
//       {
//         dataLeitura: "2019-01-28T00:00:00",
//         consumoKw: "212",
//         valorFatura: 215.2,
//       },
//     ];
//   */

//   constructor(
//     public user: UserService,
//     private router: Router,
//     private cdr: ChangeDetectorRef,
//     private activatedRoute: ActivatedRoute,
//     public historicoConsumoService: HistoricoConsumoService
//   ) {

//     this.chartData = {
//       labels: [],
//       datasets: [],
//     };
//   }
//   ngOnInit() {
//     this.consumos = this.historicoConsumoService.dataHistorico;
//   }

//   ngOnDestroy(): void { }

//   ngAfterViewInit(): void {
//     const mesesRotulos = this.getMonthsLabels(this.consumos);
//     this.chartData.labels = mesesRotulos;
//     this.initChart();
//   }


//   initChart() {
//     this.chartData.datasets = this.fillDataChart();
//     const max = this.getMaxDataSet();
//     this.settingsOptions(max);
//     this.createBarChart();
//   }

//   onToggle() {
//     this.chartData.datasets = this.fillDataChart(this.isMoeda);
//     this.bars.destroy();
//     const max = this.getMaxDataSet();
//     this.settingsOptions(max);
//     this.createBarChart();
//   }

//   fillDataChart(order = false) {
//     const datasets: ChartDataset[] = [];
//     const chatData = this.ordenarHistorico(this.consumos);
//     const data = this.fillDataChartSet(chatData, order);
//     this.consumoChartDataSet.data = data;

//     //Início Preenchendo gráfico média
//     const filtered = data.filter((item) => item !== 0);
//     const sum = filtered.reduce((a, b) => a + b, 0);
//     const avg = sum / filtered.length || 0;
//     this.avgRounded = Math.round(avg);

//     this.mediaChartDataSet.data = [
//       this.avgRounded,
//       this.avgRounded,
//       this.avgRounded,
//       this.avgRounded,
//       this.avgRounded,
//       this.avgRounded,
//       this.avgRounded,
//       this.avgRounded,
//       this.avgRounded,
//       this.avgRounded,
//       this.avgRounded,
//       this.avgRounded,
//       this.avgRounded,
//       null,
//     ];


//     datasets.push(this.mediaChartDataSet);
//     datasets.push(this.consumoChartDataSet);


//     if (this.isMoeda) {
//       this.consumoChartDataSet.label = "Valor em real";
//     } else {
//       this.consumoChartDataSet.label = 'Consumo';
//     }
//     return datasets;
//   }



//   /*
//     Tratativas do gráfico
//   */

//   fillDataChartSet(chartSet: ChartTO[], order = false): number[] {
//     let data: any[] = [];
//     if (chartSet.length >= this.PERIODO) {
//       chartSet = chartSet.slice(0, this.PERIODO);
//       data = chartSet
//         .map(({ valorFatura, consumoKw }) => {
//           return order ? parseInt(valorFatura.toString()) : consumoKw;
//         })
//         .reverse();

//       order = false;

//       this.dataConsumo = chartSet
//       .map(({ valorFatura, consumoKw }) => {
//         return order ? parseInt(valorFatura.toString()) : consumoKw;
//       })
//       .reverse();

//       order = true;
//       this.dataValor = chartSet
//         .map(({ valorFatura, consumoKw }) => {
//           return order ? parseInt(valorFatura.toString()) : consumoKw;
//         })
//         .reverse();
//     } else {
//       data = this.chartSetForYear(chartSet, order);
//     }
//     return data;
//   }


//   chartSetForYear(chartSet: ChartTO[], order: boolean) {
//     const primeiroHistoricoAno = this.getYearChart(chartSet);
//     const dataFirstChartSet = chartSet.filter(
//       (historico) => historico.dataLeitura.getFullYear() == primeiroHistoricoAno
//     );
//     const dataLastChartSet = chartSet.filter(
//       (historico) => historico.dataLeitura.getFullYear() != primeiroHistoricoAno
//     );
//     if (dataLastChartSet.length && dataFirstChartSet.length) {
//       const firstData = Array<number>(this.PERIODO).fill(0);
//       const lastData = Array<number>(this.PERIODO).fill(0);
//       dataFirstChartSet.forEach(({ dataLeitura, valorFatura, consumoKw }) => {
//         const value = order ? valorFatura : consumoKw;
//         firstData[dataLeitura.getUTCMonth()] = value;
//       });
//       dataLastChartSet.forEach(({ dataLeitura, valorFatura, consumoKw }) => {
//         const value = order ? valorFatura : consumoKw;
//         lastData[dataLeitura.getUTCMonth()] = value;
//       });
//       const value = order ? "valorFatura" : "consumoKw";
//       const first = this.getSliceChart(dataFirstChartSet, firstData, value);
//       const total = [...lastData, ...first];
//       const data = total.slice(
//         Math.abs(this.PERIODO - total.length),
//         total.length
//       );
//       return data;
//     } else {
//       const twelveData = Array<number>(this.PERIODO).fill(0);
//       chartSet.forEach(({ dataLeitura, valorFatura, consumoKw }) => {
//         const value = order ? valorFatura : consumoKw;
//         twelveData[dataLeitura.getUTCMonth()] = value;
//       });
//       return twelveData;
//     }
//   }



//   getSliceChart(chart: ChartTO[], data: number[], filter: string) {
//     const firstItem = chart[0][filter];
//     const lastItem = chart[chart.length - 1][filter];
//     const indexEnd = data.indexOf(firstItem);
//     const part = data.slice(0, indexEnd + 1);
//     return part;
//   }


//   getMaxDataSet() {
//     const values = [this.consumoChartDataSet.data]
//       .join()
//       .split(",")
//       .map((x) => +x);
//     const max = Math.max(...values);
//     return max;
//   }

//   getMonthsLabels(historico: any) {
//     const datas = this.ordenarHistorico(historico).map(
//       (data) => data.dataLeitura
//     );
//     let meses: Array<Date>;
//     if (datas.length >= this.PERIODO) {
//       meses = datas.slice(0, this.PERIODO);
//     } else {
//       const primeiraData = datas[0];
//       meses = this.toCompleteLabelsWithYear(primeiraData, this.PERIODO);
//     }
//     const labels = this.renameLabel(meses);
//     return labels;
//   }

//   toCompleteLabelsWithYear(
//     firstDate: Date,
//     qtdForCompleted: number
//   ): Array<Date> {
//     const generateDate = Array(qtdForCompleted).fill(firstDate);
//     const newDates = generateDate.map((data, index) => {
//       return new Date(
//         data.getUTCFullYear(),
//         data.getUTCMonth() - index,
//         data.getUTCDate()
//       );
//     });
//     return newDates;
//   }

//   getYearChart(data: ChartTO[]): number | string {
//     const primeiroConsumo = data && data[0];
//     const primeiroDadoAno = primeiroConsumo.dataLeitura.getFullYear();
//     return primeiroDadoAno;
//   }

//   renameLabel(datas: Array<Date>) {
//     const labelFirst = datas[0].getUTCFullYear();
//     const labelYearFirst = datas
//       .filter((date) => date.getUTCFullYear() == labelFirst)
//       .reverse();
//     const labelYearLast = datas
//       .filter((date) => date.getUTCFullYear() != labelFirst)
//       .reverse();
//     const labelYearFirtsText = labelYearFirst.map((date, index) => {
//       const text = this.dateToTextMonthYear(date, index);
//       return text;
//     });
//     if (labelYearLast.length) {
//       const labelYearLastText = labelYearLast.map((date, index) => {
//         const text = this.dateToTextMonthYear(date, index);
//         return text;
//       });
//       return [...labelYearLastText, ...labelYearFirtsText];
//     }
//     return labelYearFirtsText;
//   }

//   dateToTextMonthYear(date: Date, index: number): string | string[] {
//     const month = MONTHS[date.getUTCMonth()];
//     const year = date.getUTCFullYear().toString();
//     if (month == "Mai" && year == "2021") {
//       return ``;
//     }
//     const text = [`${month}​`, `${year}​`];
//     return text;
//   }

//   ordenarHistorico(historicoPorData: any): ChartTO[] {
//     const consumos: ChartTO[] = historicoPorData
//       .map((consumoData) => {
//         const data: ChartTO = {
//           dataLeitura: new Date(consumoData.dataLeitura),
//           consumoKw: parseInt(consumoData.consumoKw),
//           valorFatura: consumoData?.valorFatura,
//         };
//         return data;
//       })
//       .sort((a, b) => {
//         if (a.dataLeitura.getTime() > b.dataLeitura.getTime()) {
//           return -1;
//         } else if (a.dataLeitura.getTime() < b.dataLeitura.getTime()) {
//           return 1;
//         }
//         return 0;
//       });
//     return consumos;
//   }

//   settingsOptions(max: number) {
//     const that = this;
//     this.chartOptions = {
//       responsive: true,
//       maintainAspectRatio: false,
//       legend: {
//         display: false,
//       },
//       legendCallback: (chart) => {
//         const text = [];
//         for (let i = 0; i < chart.data.datasets.length; i++) {
//           text.push(
//             '<div style="display: grid; grid-template-columns: auto 1fr; grid-column-gap: .25rem; align-items: center; margin-left: 1rem"><span id="legend-' +
//             i +
//             '-item" style="border-radius:9999px; width:0.5rem; height:0.5rem; background-color:' +
//             chart.data.datasets[i].borderColor +
//             '"></span>'
//           );
//           if (chart.data.datasets[i]) {
//             text.push(chart.data.datasets[i].label);
//           }
//           text.push("</div>");
//         }
//         return text.join("");
//       },
//       hover: {
//         animationDuration: 0,
//       },
//       animation: {
//         animateScale: true,
//         animateRotate: true,
//         duration: 0,
//         onComplete: function () {
//           var ctx = this.chart.ctx;
//           ctx.font = Chart.helpers.fontString(
//             11,
//             "normal",
//             Chart.defaults.global.defaultFontFamily
//           );
//           ctx.textAlign = "center";
//           ctx.textBaseline = "bottom";
//           var model =
//             this.data.datasets[0]._meta[
//               Object.keys(this.data.datasets[0]._meta)[0]
//             ].data[this.data.datasets[0].data.length - 2]._model,
//             scale_max =
//               this.data.datasets[0]._meta[
//                 Object.keys(this.data.datasets[0]._meta)[0]
//               ].data[this.data.datasets[0].data.length - 2]._yScale.maxHeight;

//           ctx.fillStyle = "rgba(221, 60, 39, 1)";
//           var y_pos = model.y - 5;
//           if ((scale_max - model.y) / scale_max >= 0.93) {
//             y_pos = model.y + 20;
//           }

//           if (that.isMoeda) {
//             ctx.fillText(
//               "R$ " +
//               this.data.datasets[0].data[
//               this.data.datasets[0].data.length - 2
//               ],
//               model.x - 5,
//               y_pos - 5
//             );
//           } else {
//             ctx.fillText(
//               this.data.datasets[0].data[
//               this.data.datasets[0].data.length - 2
//               ] + " kWh",
//               model.x,
//               y_pos - 5
//             );
//           }
//         },
//       },
//       scales: {
//         xAxes: [
//           {
//             ticks: {
//               fontFamily:
//                 "'IberPangea Text','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
//               fontColor: "#707070",
//               fontSize: 12,
//             },
//             stacked: true,
//             gridLines: {
//               display: false,
//             },
//             offset: true,
//           },
//         ],
//         yAxes: [
//           {
//             beforeFit: function (scale) {
//               const round = max;
//               scale.max = round * 1.125;
//             },
//             stacked: true,
//             ticks: {
//               beginAtZero: true,
//               fontFamily:
//                 "'IberPangea Text','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
//               fontColor: "#707070",
//               fontSize: 12,
//             },
//           },
//         ],
//       },
//       tooltips: {
//         callbacks: {
//           title: () => {

//             return ``;
//           },
//           label: (item) => {
// 						const label = this.dataConsumo[item.index]
//             return `Consumo: ${label} kWh`;
//           },
//           afterLabel: (item) => {
//             const labelConta = this.dataValor[item.index]
//             return `Valor da conta: R$ ${labelConta}`;
//           }
//         },
//         backgroundColor: "#FFF",
//         titleFontColor: "#333",
//         titleFontSize: 14,
//         titleAlign: "left",
//         titleFontFamily:
//           "'IberPangea Text','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
//         titleFontStyle: "bold",
//         bodyFontColor: "#898989",
//         bodyFontSize: 12,
//         bodyAlign: "left",
//         bodyFontFamily:
//           "'IberPangea Text','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
//         bodyFontStyle: "normal",
//         borderColor: "rgba(221, 221, 221, 1)",
//         borderWidth: 0.5,
//         displayColors: false,
//         titleSpacing: 7,
//         bodySpacing: 7,
//         // titleMarginBottom: that.isMoeda ? -2 : 10,
//         position: "average",
//         // @ts-ignore
//         // xAlign: "left",
//         // yAlign: "center",
//         xPadding: 11,
//         yPadding: 11,
//         caretPadding: 13,
//         custom: (tooltip) => {
//           /*if(tooltip.x > 100){​
//              // @ts-ignore
//             tooltip.xAlign = "right"
//           }​ else {​
//             // @ts-ignore
//             tooltip.xAlign = "left"
//           }​*/
//           // if (this.isMoeda) {
//           //   tooltip.y = 158;
//           // } else {
//           //   tooltip.y = 120;
//           // }
//         },
//       },
//     };
//   }

//   createBarChart() {
//     this.bars = new Chart(this.barChart.nativeElement, {
//       data: this.chartData,
//       options: this.chartOptions,
//     });
//     this.legend.nativeElement.innerHTML = this.bars.generateLegend();
//   }

//   // retornaValores(tooltipItem, data): any[] {
//   //   let arrayContaConsumo = []
//   //   console.log(tooltipItem)
//   //   console.log(data);

//   //   this.consumos.filter(value => {
//   //     if(this.isMoeda) {
//   //       if(value. == tooltipItem.value)

//   //     }
//   //   })

//   //   return arrayContaConsumo;
//   // }
// }
// type ChartTO = {
//   consumoKw: number;
//   dataLeitura: Date;
//   valorFatura: number;
// };
