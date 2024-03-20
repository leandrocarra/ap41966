
import { Retorno } from './retorno';

describe(Retorno.name, () => {
  it(`Deve instanciar ${Retorno.name} quando chamado com número e mensagem `, () => {
    let valorEsperado = new Retorno(74, "OK");
    expect(new Retorno(74, "OK")).toEqual(valorEsperado);
  });
});