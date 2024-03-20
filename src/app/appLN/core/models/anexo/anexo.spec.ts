import { Anexo, Anexos } from './anexo';

describe(Anexo.name, () => {
  it('should create an instance', () => {
    expect(new Anexo('', '', 0, '')).toBeTruthy();
  });


  it(`Deve crair instancia com anexos`, () => {

    expect(new Anexos(
      [new Anexo('.jpg', '', 0, ''),],
      [new Anexo('.jpg', '', 0, ''),],
      [new Anexo('.jpg', '', 0, ''),],
      [new Anexo('.jpg', '', 0, ''),],
      [new Anexo('.jpg', '', 0, ''),],
      [new Anexo('.jpg', '', 0, ''),],
    )).toBeTruthy();
  })

});
