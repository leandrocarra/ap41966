import { Retorno } from 'app/shared/models/retorno/retorno';
import { AtualizarMinhaContaDTOResponse, AtualizarSenhaDTOResponse, MinhaContaDTOResponse } from './minha-conta-dto';

describe(MinhaContaDTOResponse.name, () => {
  it(`Deve instanciar ${MinhaContaDTOResponse.name} quando chamado`, () => {
    expect(new MinhaContaDTOResponse("19935193861", "teste@mock.com", new Retorno(202, "sucesso"))).toBeTruthy();
  });
});


describe(AtualizarMinhaContaDTOResponse.name, () => {
  it(`Deve instanciar ${AtualizarMinhaContaDTOResponse.name} quando chamado`, () => {
    expect(new AtualizarMinhaContaDTOResponse(new Retorno(202, "sucesso"))).toBeTruthy();
  });
});

describe(AtualizarSenhaDTOResponse.name, () => {
  it(`Deve instanciar ${AtualizarSenhaDTOResponse.name} quando chamado`, () => {
    expect(new AtualizarSenhaDTOResponse(new Retorno(202, "sucesso"))).toBeTruthy();
  });
});
