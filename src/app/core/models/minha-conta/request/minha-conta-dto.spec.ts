import { Canal } from '../../canais/enums/canais';
import { AtualizarMinhaContaDTORequest, AtualizarSenhaDTORequest, MinhaContaDTORequest } from './minha-conta-dto';

describe(MinhaContaDTORequest.name, () => {
  it(`Deve instanciar ${MinhaContaDTORequest.name} quando chamado`, () => {
    expect(new MinhaContaDTORequest(Canal.AGE, '1234', '19935195863', '123')).toBeTruthy();
  });
});


describe(AtualizarMinhaContaDTORequest.name, () => {
  it(`Deve instanciar ${AtualizarMinhaContaDTORequest.name} quando chamado`, () => {
    expect(new AtualizarSenhaDTORequest(Canal.AGC, '12342', '123412', '123password')).toBeTruthy();
  });
});


describe(AtualizarSenhaDTORequest.name, () => {

  it(`Deve instanciar ${AtualizarSenhaDTORequest.name} quando chamado com valores`, () => {
    expect(new AtualizarMinhaContaDTORequest(Canal.AGE, 'ELEKTRO/19935193861', '19935193861', false, 'anateste@neoenergia.com.br', '1934665667', '199968811220', 'ELEKTRO', 'teste@teste.com')).toBeTruthy();
  });

  it(`Deve instanciar ${AtualizarSenhaDTORequest.name} quando chamado`, () => {
    expect(new AtualizarMinhaContaDTORequest(Canal.AGE, 'ELEKTRO/19935193861', '19935193861', false)).toBeTruthy();
  });

});
