import { Conteudo, InformacaoConta } from './informacao-conta';

describe(InformacaoConta.name, () => {
  it('should create an instance', () => {
    expect(new InformacaoConta(
      'Consumo',
      [
        new Conteudo(
          '350 Kwh',
          'query_builder',
          'Consumo',
          'Percebemos que o valor da sua conta diminuiu 43% em relação ao mês anterior.'
        )
      ]
    )).toBeTruthy();
  });
});
