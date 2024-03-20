import { Banco, DadosPagamento } from './dados-pagamento';

describe(DadosPagamento.name, () => {
  it('should create an instance', () => {
    expect(new DadosPagamento()).toBeTruthy();
  });
});

describe(Banco.name, () => {

  let listarBancosMockado = require('../../../shared/mock/responses/response-api-listar-bancos.json');

  it('should create an instance, quando escolhido Banco', () => {
    expect(new Banco()).toBeTruthy();
  });

  it(`Deve instanciar Banco com valores quando chamado`, () => {
    let bancoMockado: Banco = listarBancosMockado[0];
    bancoMockado.mascara = '00000000-0';

    expect(new Banco(
      bancoMockado.dicaContaBancaria,
      bancoMockado.nomeAbreviadoBanco,
      bancoMockado.nomeCompletoBanco,
      bancoMockado.numeroBanco,
      bancoMockado.numeroCaracteresContaBancaria,
      bancoMockado.numeroCaracteresDigitoContaBancaria,
      bancoMockado.mascara
    )).toBeTruthy();
  });
});
