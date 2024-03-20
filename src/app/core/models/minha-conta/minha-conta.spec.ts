import { MinhaConta } from './minha-conta';

describe(MinhaConta.name, () => {
  it(`Deve instanciar ${MinhaConta.name} quando chamado`, () => {
    expect(new MinhaConta()).toBeTruthy();
  });
});
