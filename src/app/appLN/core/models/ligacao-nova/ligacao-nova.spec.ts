import { EntregaAlternativa, LigacaoNova } from './ligacao-nova';

describe('LigacaoNova', () => {
  it('should create an instance', () => {
    expect(new LigacaoNova()).toBeTruthy();
  });
});


describe(EntregaAlternativa.name, () => {
  it(`Deve instanciar entrega alternativa sem valor`, () => {
    expect(new EntregaAlternativa()).toBeTruthy();
  });

  it(`Deve instanciar entrega alternativa com valor`, () => {
    let entregaAlternativaMockado: EntregaAlternativa = new EntregaAlternativa(
      '135000000',
      'DO TREVO SP 127 E 310',
      'aaaa',
      'JD BOM SUCESSO',
      'RIO CLARO',
      'SP',
      '1234',
      '1212'
    )
    expect(new EntregaAlternativa(
      entregaAlternativaMockado.cep,
      entregaAlternativaMockado.endereco,
      entregaAlternativaMockado.complemento,
      entregaAlternativaMockado.bairro,
      entregaAlternativaMockado.cidade,
      entregaAlternativaMockado.estado,
      entregaAlternativaMockado.numero,
      entregaAlternativaMockado.caixaPostal
    )).toBeTruthy();
  });
});
