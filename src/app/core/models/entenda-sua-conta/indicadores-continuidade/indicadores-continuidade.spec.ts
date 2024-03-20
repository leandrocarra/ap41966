import { IndicadoresContinuidade } from './indicadores-continuidade';

describe(IndicadoresContinuidade.name, () => {
  it(`Deve instanciar ${IndicadoresContinuidade.name} para 'Limite  DICRI' quando chamado`, () => {
    expect(new IndicadoresContinuidade(
      'LIMITE DICRI',
      'Duração de Interrupção Individual Dia Crítico (Horas).',
      '',
      '-',
      '-',
      '-',
      '-',
      '-'
    )).toBeTruthy();
  });
});
