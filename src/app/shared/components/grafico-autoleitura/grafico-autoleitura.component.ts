import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { EnumLeiturasNaMedia } from 'app/core/models/autoleitura/autoleitura';
import { LeituraAutoleituraDTOResponse } from 'app/core/models/autoleitura/response/autoleitura-dto';
import { AutoleituraService } from 'app/core/services/autoleitura/autoleitura.service';
import { Meses } from 'app/core/services/utils/neo-utils.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-grafico-autoleitura',
    templateUrl: './grafico-autoleitura.component.html',
    styleUrls: ['./grafico-autoleitura.component.scss']
})
export class GraficoAutoleituraComponent {
    @ViewChild("chartAutoleitura") private chartAutoleitura!: ElementRef;
    chart!: Chart;
    @Input() consumos: Array<LeituraAutoleituraDTOResponse>;
    @Input() diferenciarUltimaBarra: boolean;
    @Input() statusMedia: string;

    coresVerdes: Array<string>;
    coresVermelhas: Array<string>;
    coresAzuis: Array<string>;
    TotalMeses = 13;
    mesesVazios: number;
    consumosTemporario: Array<LeituraAutoleituraDTOResponse>
    constructor(
        private _autoleituraService: AutoleituraService
    ) {
        this.coresVerdes = ["#007F33", "#00A443", "#5BD38C"];
        this.coresVermelhas = ["#700700", "#A30B00", "#D60E00"];
        this.coresAzuis = ["#007ACB", "#0DA9FF", "#6BDAFF"];
        this.diferenciarUltimaBarra = false;
        this.statusMedia = EnumLeiturasNaMedia.NaMedia;
        this.mesesVazios = 0;
        this.consumos = []
        this.consumosTemporario = [];
    }

    ngAfterViewInit(): void {
        this.consumosTemporario = JSON.parse(JSON.stringify(this.consumos)) as typeof this.consumos; // realiza cópia profunda do this.consumosTemporario
        this.completarConsumos();
        this.criarGrafico();
    }

    // Completa a lista de consumos de acordo com o numero total de meses
    completarConsumos(): void {
        if (this.getMesesLeituras().length === this.TotalMeses) {
            this.consumosTemporario.splice(0, 1);
        } else if (this.getMesesLeituras().length > this.TotalMeses) {
            let diferencaMeses = this.getMesesLeituras().length - this.TotalMeses;
            this.consumosTemporario.splice(0, diferencaMeses)
        } else {
            this.preencherMesesVazios();
        }
    }

   //Preenche os meses vazios, e faz o tratamento das lacunas entre os meses de leitura.
    preencherMesesVazios(): void {
        let mesAtual, mesAnterior, diferencaMeses;

        this.getMesesLeituras().forEach((element, index) => {
            mesAtual = this.pegarNumeroDoMes(element);
            if (index > 0) {
                mesAnterior = this.pegarNumeroDoMes(this.getMesesLeituras()[index - 1]);
                diferencaMeses = Math.abs(mesAtual - mesAnterior);
                if ((diferencaMeses) > 1) {
                    let leituraTemporaria = this.consumosTemporario[index];
                    this.consumosTemporario.pop();
                    this.getMesesLeituras().pop();
                    this.setarMesesVazios(mesAnterior, diferencaMeses);
                    this.consumosTemporario.push(leituraTemporaria);
                    this.getMesesLeituras().push(element);
                }
            } else {
                mesAnterior = mesAtual;
            }
        });
        if(this.consumosTemporario.length < this.TotalMeses){
            let diferencaAtualizadaDosMeses = Math.abs(this.TotalMeses - this.consumosTemporario.length);
            this.setarMesesVazios(mesAtual ?? 0, diferencaAtualizadaDosMeses);
        }
    }

    setarMesesVazios(mesAnterior: number, diferencaMeses: number): void {
        let data = new Date()
        let i = 0;
        while (i < (diferencaMeses-1)) {
            let dataUltimaLeitura = new Date(data.setMonth(mesAnterior+1));
            this.consumosTemporario.push(new LeituraAutoleituraDTOResponse(
                1,
                dataUltimaLeitura.toISOString(),
                '2022-11-17T00:00:00',
                0,
                '',
                '',
                0,
                0,
                0,
                '',
                '',
                '',
                ''
            ));
            i++;
            mesAnterior++
        }
    }

     // Retorna meses de leitura da lista de consumosTemporario.
    getMesesLeituras(): Array<string> {
        let meses: Array<string> = [];
        this.consumosTemporario.forEach((element: LeituraAutoleituraDTOResponse) => {
            let data = new Date(element.dataUltimaLeitura)
            meses.push(data.toLocaleString('default', { month: 'short' }));
        });
        return [... new Set(meses)];
    }

    // Pegar o numero correspondente ao mes em formato string
    pegarNumeroDoMes(mesString: string): number {
        let meses = Object.values(Meses);
        console.log(meses.findIndex((mes) => `${mes.toString().toLowerCase().substring(0, 3)}.` === mesString.toLowerCase()))
        return meses.findIndex((mes) => `${mes.toString().toLowerCase().substring(0, 3)}.` === mesString.toLowerCase());
    }


    criarGrafico(): void {
        this.chart = new Chart(this.chartAutoleitura.nativeElement, {
            type: "bar",
            data: {
                labels: [... new Set(this.getMesesLeituras())],
                datasets: this.getDatasets()
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    datalabels: {
                        display: false,
                    },
                }
            }
        });
    }

    getDatasets(): any {
        let ultimoConsumo: LeituraAutoleituraDTOResponse;
        let data: Array<any> = [];
        let registradores: Array<string> = this.consumosTemporario.map((valorLeitura: LeituraAutoleituraDTOResponse) => this._autoleituraService.definirRegistrador(valorLeitura.codTipoEspEqp));

        registradores = [... new Set(registradores)];
        registradores.forEach((registrador, indexRegistradores) => {
            let barras: Array<any> = [];
            this.consumosTemporario.forEach((element: LeituraAutoleituraDTOResponse) => {
                if (this._autoleituraService.definirRegistrador(element.codTipoEspEqp) === registrador) {
                    barras.push(element.ultimoConsumo);
                    if (element === this.consumosTemporario[this.consumosTemporario.length - 1]) {
                        ultimoConsumo = element;
                    }
                }
            });

            data.push(
                {
                    label: registrador,
                    data: barras,
                    backgroundColor: barras.map((_item: any, index: number) => {
                        if (index === barras.length - 1 && this.diferenciarUltimaBarra) {
                            return this.statusMedia !== EnumLeiturasNaMedia.NaMedia ? this.coresAzuis[indexRegistradores] : this.coresVermelhas[indexRegistradores];
                        } else {
                            return this.coresVerdes[indexRegistradores];
                        }
                    }),
                    hoverBackgroundColor: barras.map((_item, index) => {
                        if (index === barras.length - 1 && this.diferenciarUltimaBarra) {
                            return this.statusMedia !== EnumLeiturasNaMedia.NaMedia ? this.coresAzuis[indexRegistradores] : this.coresVermelhas[indexRegistradores];
                        } else {
                            return this.coresVerdes[indexRegistradores];
                        }

                    }),
                }
            );

            this._autoleituraService.autoleitura.ultimosConsumos.push({
                key: registrador,
                value: ultimoConsumo
            });

        });
        return data;
    }
}
