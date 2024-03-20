import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { configureMenuByWindowSize } from 'app/appLN/core/services/utils/neo-utils.service';
import { UserService } from 'app/core/services/user/user.service';
import { MONTHS } from 'app/core/services/utils/utils.service';
import { Chart, ChartData, ChartDataset, ChartOptions, Tooltip } from 'chart.js';

@Component({
  selector: 'app-montante-ponta',
  templateUrl: './montante-ponta.component.html',
  styleUrls: ['./montante-ponta.component.scss']
})
export class MontantePontaComponent implements OnInit {
  @ViewChild("barChart") private barChart!: ElementRef;
  @ViewChild("legend") private legend!: ElementRef;

  mobile: boolean;

  @Input() data!: any;

  // Variables Chart
  states: string[] = ["Últimos 13 meses", "2021", "2020", "2019"];
  PERIODO = 14;
  contratadoForaPonta: any;
  usoForaPonta: any;
  contratadoPonta: any;
  montante: any;
  bars!: Chart;
  chartData: ChartData;
  chartOptions!: ChartOptions;
  // End Variables Chart

  // DataSets
  contratadoForaPontaChartDataSet: ChartDataset = {
    label: "Montante de uso contratado fora da ponta (kW)",
    data: [],
    backgroundColor: "rgba(92, 136, 26, 1)",
    borderColor: "rgba(92, 136, 26, 0.8)",
    hoverBackgroundColor: "rgba(57,84,16,1)",
    hoverBorderColor: "rgba(57,84,16,1)",
    borderWidth: 1,
    type: "bar",
    stack: "Stack 0",
  };
  usoForaPontaChartDataSet: ChartDataset = {
    label: "Montante de uso fora da ponta (kW)",
    data: [],
    backgroundColor: "rgba(124, 170, 218, 1)",
    borderColor: "rgba(124, 170, 218, 1)",
    hoverBackgroundColor: "rgba(94,129,166,1)",
    hoverBorderColor: "rgba(94,129,166,1)",
    borderWidth: 1,
    type: "bar",
    stack: "Stack 1",
  };
  contratadoPontaChartDataSet: ChartDataset = {
    label: "Montante de uso contratado na ponta (kW)",
    data: [],
    backgroundColor: "rgba(145, 146, 143, 1)",
    borderColor: "rgba(145, 146, 143, 1)",
    hoverBackgroundColor: "rgba(94,94,92,1)",
    hoverBorderColor: "rgba(94,94,92,1)",
    borderWidth: 1,
    type: "bar",
    stack: "Stack 2",

  };
  montanteChartDataSet: ChartDataset = {
    label: "Montante na ponta (kW)",
    data: [],
    backgroundColor: "rgba(255, 159, 0, 1)",
    borderColor: "rgba(255, 159, 0, 1)",
    hoverBackgroundColor: "rgba(204,126,0,1)",
    hoverBorderColor: "rgba(204,126,0,1)",
    borderWidth: 1,
    type: "bar",
    stack: "Stack 3",
  };
  // End DataSets

  // Datas
  dataContratadoForaPonta = [
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
  dataUsoForaPonta = [
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
  dataContratadoPonta = [
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
  dataMontante = [
    {
      dataLeitura: "2021-05-28T00:00:00",
      consumoKw: "0",
      valorFatura: 0,
    },
    {
      dataLeitura: "2021-04-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2021-03-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2021-02-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2021-01-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2020-12-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2020-11-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2020-10-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2020-09-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2020-08-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2020-07-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2020-06-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2020-05-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2020-04-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2020-03-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2020-02-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2020-01-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2019-12-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2019-11-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
    },
    {
      dataLeitura: "2019-10-28T00:00:00",
      consumoKw: "4200",
      valorFatura: 4200,
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
    this.contratadoForaPonta = this.dataContratadoForaPonta;
    this.usoForaPonta = this.dataUsoForaPonta;
    this.contratadoPonta = this.dataContratadoForaPonta;
    this.montante = this.dataMontante;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  ngOnDestroy(): void { }

  ngAfterViewInit(): void {
    // utilizar apenas um data para definir os meses
    const mesesRotulos = this.getMonthsLabels(this.contratadoForaPonta);
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
    let chatData = this.ordenarHistorico(this.contratadoForaPonta);
    let data = this.fillDataChartSet(chatData, order);

    this.contratadoForaPontaChartDataSet.data = data;
    datasets.push(this.contratadoForaPontaChartDataSet);

    chatData = this.ordenarHistorico(this.usoForaPonta);
    data = this.fillDataChartSet(chatData, order);
    this.usoForaPontaChartDataSet.data = data;
    datasets.push(this.usoForaPontaChartDataSet);

    chatData = this.ordenarHistorico(this.contratadoPonta);
    data = this.fillDataChartSet(chatData, order);
    this.contratadoPontaChartDataSet.data = data;
    datasets.push(this.contratadoPontaChartDataSet);

    chatData = this.ordenarHistorico(this.montante);
    data = this.fillDataChartSet(chatData, order);
    this.montanteChartDataSet.data = data;
    datasets.push(this.montanteChartDataSet);

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
    const values = [this.contratadoForaPontaChartDataSet.data]
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
      responsive: true,
      maintainAspectRatio: false,
      // legend: {
      //   display: false,
      // },
      // legendCallback: (chart: any) => {
      //   const text = [];
      //   for (let i = 0; i < chart.data.datasets.length; i++) {
      //     text.push(
      //       '<div style="display: grid; grid-template-columns: auto 1fr; grid-column-gap: .25rem; align-items: center; margin-left: 1rem"><span id="legend-' +
      //       i +
      //       '-item" style="border-radius:9999px; width:0.5rem; height:0.5rem; background-color:' +
      //       chart.data.datasets[i].borderColor +
      //       '"></span>'
      //     );

      //     if (chart.data.datasets[i]) {
      //       text.push(chart.data.datasets[i].label);
      //     }

      //     text.push("</div>");
      //   }
      //   return text.join("");
      // },
      // tooltips: {
      //   enabled: true,
      //   mode: "point",
      //   //position: "nearest",
      //   //custom: customTooltips,
      //   // filter: function (tooltipItem) {
      //   //   return tooltipItem.datasetIndex === 1;
      //   // },
      //   callbacks: {
      //     title: (item: any, data: any) => {
      //       if (item.length > 0) {
      //         // const label = item[0].value ?? "0";
      //         // if (this.isMoeda) {
      //         //   const value = +item[0].value;
      //         //   const label = formatarMoeda(value);
      //         //   return `Valor da conta: ${label}​`;
      //         // }
      //         return `${item[0].xLabel[0]} ${item[0].xLabel[1]}​`;
      //       }
      //     },
      //     label: (tooltipItem: any, data: any) => {
      //       if (tooltipItem != null) {
      //         return this.mobile ? `${tooltipItem.value} (kW)​` : `${data.datasets[tooltipItem.datasetIndex].label} ${tooltipItem.value}​`;
      //       }
      //     },
      //   },
      //   backgroundColor: "#FFF",
      //   titleFontColor: "#333",
      //   titleFontSize: 14,
      //   titleAlign: "left",
      //   titleFontFamily:
      //     "'IberPangea Text','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      //   titleFontStyle: "bold",
      //   bodyFontColor: "#898989",
      //   bodyFontSize: 14,
      //   bodyAlign: "left",
      //   bodyFontFamily:
      //     "'IberPangea Text','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      //   bodyFontStyle: "normal",
      //   borderColor: "rgba(221, 221, 221, 1)",
      //   borderWidth: 0.5,
      //   displayColors: false,
      //   titleSpacing: 7,
      //   bodySpacing: 7,
      //   titleMarginBottom: 10,
      //   position: "average",
      //   // @ts-ignore
      //   // xAlign: "left",
      //   // yAlign: "center",
      //   xPadding: 11,
      //   yPadding: 11,
      //   caretPadding: 13,
      //   custom: (tooltip: any) => {
      //     /*if(tooltip.x > 100){​
      //        // @ts-ignore
      //       tooltip.xAlign = "right"
      //     }​ else {​
      //       // @ts-ignore
      //       tooltip.xAlign = "left"
      //     }​*/
      //     // if (this.isMoeda) {
      //     //   tooltip.y = 158;
      //     // } else {
      //     //   tooltip.y = 120;
      //     // }
      //   },
      //   intersect: true,
      // },
      onClick: function (event, element) {

      },
      onHover: function (event, element) {

      },
      events: ["click"],
      // hover: {
      //   animationDuration: 0,
      // },
      // scales: {
      //   : [
      //     {
      //       ticks: {
      //         fontFamily:
      //           "'IberPangea Text','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      //         fontColor: "#707070",
      //         fontSize: 14,
      //       },
      //       stacked: true,
      //       gridLines: {
      //         display: false,
      //       },
      //       offset: true,
      //     },

      //   ],
      //   yAxes: [
      //     {
      //       beforeFit: function (scale) {
      //         const round = max;
      //         scale.max = round * 1.125;
      //       },
      //       stacked: true,
      //       ticks: {
      //         beginAtZero: true,
      //         fontFamily:
      //           "'IberPangea Text','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      //         fontColor: "#707070",
      //         fontSize: 14,
      //       },
      //     },
      //   ],
      // },
    };
  }

  createBarChart() {
    // this.bars = new Chart(this.barChart.nativeElement, {
    //   data: this.chartData,
    //   options: this.chartOptions,
    // });
    // this.legend.nativeElement.innerHTML = this.bars.generateLegend();
  }

}
type ChartTO = {
  consumoKw: number;
  dataLeitura: Date;
  valorFatura: number;


}

