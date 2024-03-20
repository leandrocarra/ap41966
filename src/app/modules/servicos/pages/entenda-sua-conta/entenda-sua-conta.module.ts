import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DadosConsumoModule } from 'app/shared/components/cards/dados-consumo/dados-consumo.module';
import { CardDicasDeConsumoModule } from 'app/shared/components/cards/dicas-de-consumo/dicas-de-cosumo.module';
import { HistoricoConsumoChartModule } from 'app/shared/components/charts/historico-consumo-chart/historico-consumo-chart.module';
import { ChartEntendaSuaContaModule } from './components/chart-entenda-sua-conta/chat-entenda-sua-conta.module';
import { DescricaoContaModule } from './components/descricao-conta/descricao-conta.module';
import { IndicadoresContinuidadeModule } from './components/indicadores-continuidade/indicadores-continuidade.module';
import { LegendaComposicaoFaturaModule } from './components/legenda-composicao-fatura/legenda-composicao-fatura.module';
import { EntendaSuaContaRoutingModule } from './entenda-sua-conta-routing.module';
import { SuaContaComponent } from './pages/sua-conta/sua-conta.component';

@NgModule({
  declarations: [SuaContaComponent],
  imports: [
    CommonModule,
    EntendaSuaContaRoutingModule,
    LegendaComposicaoFaturaModule,
    DescricaoContaModule,
    IndicadoresContinuidadeModule,
    CardDicasDeConsumoModule,
    ChartEntendaSuaContaModule,
    MatCardModule,
    DadosConsumoModule,
    HistoricoConsumoChartModule,
  ]
})
export class EntendaSuaContaModule { }
