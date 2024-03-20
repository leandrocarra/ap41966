import { LegendaComposicaoFatura } from './legenda-composicao-fatura';
import { DescricaoLegendasComposicaoFatura, LegendasGrafico } from './legendas-grafico';

describe(LegendaComposicaoFatura.name, () => {
  it('should create an instance', () => {
    expect(new LegendaComposicaoFatura(
      "1",
      LegendasGrafico.perdas.toLowerCase(),
      DescricaoLegendasComposicaoFatura.perdas
    )).toBeTruthy();
  });
});
