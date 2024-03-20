import { Estado } from './agencia-virtual-utils';

describe('AgenciaVirtualUtils', () => {
  it(`Deve instanciar  ${Estado.name} com valores de SP quando chamado`, () => {
    expect(new Estado("SP", "São Paulo")).toBeTruthy();
  });
});
