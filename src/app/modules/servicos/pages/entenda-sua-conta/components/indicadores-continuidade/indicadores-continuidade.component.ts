import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { PathCompleto } from "app/core/enums/servicos";
import { IndicadoresContinuidade } from "app/core/models/entenda-sua-conta/indicadores-continuidade/indicadores-continuidade";
import { EntendaSuaContaService } from "app/core/services/entenda-sua-conta/entenda-sua-conta.service";
import { SegundaViaService } from "app/core/services/segunda-via/segunda-via.service";
import { configureMenuByWindowSize, converterParaReais } from "app/core/services/utils/neo-utils.service";

@Component({
    selector: 'app-indicadores-continuidade-component',
    templateUrl: './indicadores-continuidade.component.html',
    styleUrls: ['./indicadores-continuidade.component.scss']
})

export class IndicadoresContinuidadeComponent {
    mobile: boolean;
    mensagemBotaoHistoricoCompleto: string;
    indicadores: Array<IndicadoresContinuidade>;
    mesSelecionado: string;

    constructor(
        private _entendaSuaContaService: EntendaSuaContaService,
        private _router: Router
    ) {
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.mesSelecionado = this.definirMesSelecionado();
        this.mensagemBotaoHistoricoCompleto = 'VER HISTÓRICO COMPLETO';

        this.indicadores = [
            new IndicadoresContinuidade(
                'DIC',
                'Duração de Interrupção Individual.',
                'É o número de horas sem energia.',
                converterParaReais(this._entendaSuaContaService.getDIC.limiteMensal),
                converterParaReais(this._entendaSuaContaService.getDIC.valorApurado  ?? '-'),
                converterParaReais(this._entendaSuaContaService.getDIC.creditoApurado ?? '-'),
                converterParaReais(this._entendaSuaContaService.getDIC.compensado  ?? '-'),
                converterParaReais(this._entendaSuaContaService.getDIC.creditoRestante ?? '-') 
            ),
            new IndicadoresContinuidade(
                'FIC',
                'Frequência de interrupção Individual.',
                'É o número de vezes sem energia',
                converterParaReais(this._entendaSuaContaService.getFIC.limiteMensal),
                converterParaReais(this._entendaSuaContaService.getFIC.valorApurado  ?? '-'),
                converterParaReais(this._entendaSuaContaService.getFIC.creditoApurado  ?? '-'),
                converterParaReais(this._entendaSuaContaService.getFIC.compensado  ?? '-'),
                converterParaReais(this._entendaSuaContaService.getFIC.creditoRestante  ?? '-') 
            ),
            new IndicadoresContinuidade(
                'DMIC',
                'Duração máxima de interrupção contínua.',
                '',
                converterParaReais(this._entendaSuaContaService.getDMIC.limiteMensal),
                converterParaReais(this._entendaSuaContaService.getDMIC.valorApurado  ?? '-'),
                converterParaReais(this._entendaSuaContaService.getDMIC.creditoApurado  ?? '-'),
                converterParaReais(this._entendaSuaContaService.getDMIC.compensado  ?? '-'),
                converterParaReais(this._entendaSuaContaService.getDMIC.creditoRestante  ?? '-')
            ),
            new IndicadoresContinuidade(
                'LIMITE DICRI',
                'Duração de Interrupção Individual Dia Crítico (Horas).',
                '',
                converterParaReais(this._entendaSuaContaService.getDICRI.limiteMensal ?? '-'),
                converterParaReais(this._entendaSuaContaService.getDICRI.valorApurado ?? '-'),
                converterParaReais(this._entendaSuaContaService.getDICRI.creditoApurado ?? '-'),
                converterParaReais(this._entendaSuaContaService.getDICRI.compensado ?? '-'),
                converterParaReais(this._entendaSuaContaService.getDICRI.creditoRestante ?? '-'),
            ),
        ];
    }

    @HostListener("window:resize", ["$event"])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    redirecionarPagina() {
        this._router.navigate([PathCompleto.historicoDeconsumo]);
    }

    definirMesSelecionado(): string {
        const dataVencimento = new Date(this._entendaSuaContaService.getFatura.dataVencimento);
        const mes = dataVencimento.toLocaleString('pt-br', { month: 'long' });
        const ano = dataVencimento.toLocaleString('pt-br', { year: 'numeric' });
        return `${this.ajustarPrimeiraMaiuscula(mes)} ${ano}`;
    }

    ajustarPrimeiraMaiuscula(entrada: string): string {
        return (entrada.charAt(0).toUpperCase() + entrada.slice(1));
    }
}