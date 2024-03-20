import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { CorLegendaGrafico, LegendasGrafico } from 'app/core/models/entenda-sua-conta/grafico/legendas-grafico';
import { EntendaSuaContaDTOResponse } from 'app/core/models/entenda-sua-conta/response/entenda-sua-conta-dto';
import { Valor } from 'app/core/models/pix/request/pix-dto';
import { EntendaSuaContaService } from 'app/core/services/entenda-sua-conta/entenda-sua-conta.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';
import { registerables  } from "chart.js";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LegendaComposicaoFaturaComponent } from '../legenda-composicao-fatura/legenda-composicao-fatura.component';

@Component({
    selector: 'app-chart-entenda-sua-conta',
    templateUrl: './chart-entenda-sua-conta.component.html',
    styleUrls: ['./chart-entenda-sua-conta.component.scss']
})
export class ChartEntendaSuaContaComponent {

    @ViewChild("barChart") private barChart!: ElementRef;
    @ViewChild(LegendaComposicaoFaturaComponent,)
    legendaChart!: LegendaComposicaoFaturaComponent;

    // Layout Variables
    mobile: boolean;
    descricaoGrafico!: string;
    tituloGrafico!: string;
    interacaoGrafico: string;
    // End Layout Variables

    bars!: Chart | any;
    isMoeda: boolean;
    valorPequeno: number = 4;
    interacaoTooltip: boolean = false;
    dataChartEntendaSuaConta: any;
    dataPorcentagem: Array<string>;
    dadosEntendaContaDTO: EntendaSuaContaDTOResponse

    dataValor: Array<string>
    dadosValoresEmReais: EntendaSuaContaDTOResponse

    constructor(
        private _entendaSuaContaService: EntendaSuaContaService
    ) {
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.isMoeda = false;
        this.interacaoGrafico = (this.mobile) ? "Toque na legenda" : "Clique no gráfico";
        Chart.register(ChartDataLabels, ...registerables);

        this.dadosEntendaContaDTO = this._entendaSuaContaService.getDadosEntendaSuaConta;
        this.dadosValoresEmReais = this._entendaSuaContaService.getDadosEntendaSuaConta

        this.dataPorcentagem = [
            (environment.regiao === Regiao.NE) ? this.dadosEntendaContaDTO.perdas : this.converterValor(this.dadosEntendaContaDTO.perdas),
            (environment.regiao === Regiao.NE) ? this.dadosEntendaContaDTO.energia : this.converterValor(this.dadosEntendaContaDTO.energia),
            (environment.regiao === Regiao.NE) ? this.dadosEntendaContaDTO.tributos : this.converterValor(this.dadosEntendaContaDTO.tributos),
            (environment.regiao === Regiao.NE) ? this.dadosEntendaContaDTO.encargos : this.converterValor(this.dadosEntendaContaDTO.encargos),
            (environment.regiao === Regiao.NE) ? this.dadosEntendaContaDTO.transmissao : this.converterValor(this.dadosEntendaContaDTO.transmissao),
            (environment.regiao === Regiao.NE) ? this.dadosEntendaContaDTO.outros : this.converterValor(this.dadosEntendaContaDTO.outros),
            (environment.regiao === Regiao.NE) ? this.dadosEntendaContaDTO.distribuicao : this.converterValor(this.dadosEntendaContaDTO.distribuicao)
        ];

        this.dataValor = [
            (environment.regiao === Regiao.NE) ? this.dadosValoresEmReais.perdasReais : this.converterValor(this.dadosValoresEmReais.perdasReais),
            (environment.regiao === Regiao.NE) ? this.dadosValoresEmReais.energiaReais : this.converterValor(this.dadosValoresEmReais.energiaReais),
            (environment.regiao === Regiao.NE) ? this.dadosValoresEmReais.tributosReais : this.converterValor(this.dadosValoresEmReais.tributosReais),
            (environment.regiao === Regiao.NE) ? this.dadosValoresEmReais.encargosReais : this.converterValor(this.dadosValoresEmReais.encargosReais),
            (environment.regiao === Regiao.NE) ? this.dadosValoresEmReais.transmissaoReais : this.converterValor(this.dadosValoresEmReais.transmissaoReais),
            (environment.regiao === Regiao.NE) ? this.dadosValoresEmReais.outrosReais : this.converterValor(this.dadosValoresEmReais.outrosReais),
            (environment.regiao === Regiao.NE) ? this.dadosValoresEmReais.distribuicaoReais : this.converterValor(this.dadosValoresEmReais.distribuicaoReais)
        ];
        this.dataChartEntendaSuaConta = this.dataPorcentagem;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
        this.interacaoGrafico = (this.mobile) ? "Toque na legenda" : "Clique no gráfico";
    }

    ngAfterViewInit(): void {
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.interacaoGrafico = (this.mobile) ? "Toque na legenda" : "Clique no gráfico";
        this.criarGrafico();
    }

    onToggle(): void {
        this.bars.destroy();
        if (this.isMoeda) {
            this.dataChartEntendaSuaConta = this.dataValor;
        } else {
            this.dataChartEntendaSuaConta = this.dataPorcentagem;
        }
        this.criarGrafico();
    }

    //Padrão america deixar apenas . para separar centavos
    converterValor(valor: string): string {
        return valor.replace(".", "").replace(",", ".");
    }

    criarGrafico(): void {
        const that = this;
        this.bars = new Chart(this.barChart.nativeElement, {
            type: 'doughnut',
            data: {
                labels: [
                    LegendasGrafico.perdas,
                    LegendasGrafico.geracaoDeEnergia,
                    LegendasGrafico.tributos,
                    LegendasGrafico.encargos,
                    LegendasGrafico.transmissao,
                    LegendasGrafico.demaisItens,
                    LegendasGrafico.servicoDeDistribuicao
                ],
                datasets: [{
                    label: 'Composicao fatura',
                    data: this.dataChartEntendaSuaConta,
                    backgroundColor: [
                        CorLegendaGrafico.perdas,
                        CorLegendaGrafico.geracaoDeEnergia,
                        CorLegendaGrafico.tributos,
                        CorLegendaGrafico.encargos,
                        CorLegendaGrafico.transmissao,
                        CorLegendaGrafico.demaisItens,
                        CorLegendaGrafico.servicoDeDistribuicao
                    ],
                    hoverBackgroundColor: [
                        CorLegendaGrafico.perdas,
                        CorLegendaGrafico.geracaoDeEnergia,
                        CorLegendaGrafico.tributos,
                        CorLegendaGrafico.encargos,
                        CorLegendaGrafico.transmissao,
                        CorLegendaGrafico.demaisItens,
                        CorLegendaGrafico.servicoDeDistribuicao
                    ],
                    hoverBorderColor: [
                        CorLegendaGrafico.perdas,
                        CorLegendaGrafico.geracaoDeEnergia,
                        CorLegendaGrafico.tributos,
                        CorLegendaGrafico.encargos,
                        CorLegendaGrafico.transmissao,
                        CorLegendaGrafico.demaisItens,
                        CorLegendaGrafico.servicoDeDistribuicao
                    ]
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 700,
                },

                events: ["click", "animationiteration"],
                onClick: function (event, activtElements) {
                    let activeSector = activtElements[0]["index"];
                    that.tituloGrafico = that.legendaChart.descricoes[activeSector].title;
                    that.descricaoGrafico = that.legendaChart.descricoes[activeSector].description;
                },

                plugins: {
                    datalabels: {
                        formatter: (value) => {
                            if (that.isMoeda) {
                                return `R$ ${value}`
                            } else {
                                return `${value}%`
                            }
                        },
                        color: '#ffffff',
                        anchor: 'center',
                        align: 'center',
                        offset: 5
                    },

                    legend: {
                        display: false
                    },
                    tooltip: {
                        titleAlign: "left",
                        position: "average",
                        callbacks: {
                            label: (tooltipItem) => {
                                return that.isMoeda ? ` R$ ${that.dataChartEntendaSuaConta[tooltipItem.dataIndex]}` : ` ${that.dataChartEntendaSuaConta[tooltipItem.dataIndex]}%`
                            }
                        }
                    }
                }
            }
        });
    }
}
