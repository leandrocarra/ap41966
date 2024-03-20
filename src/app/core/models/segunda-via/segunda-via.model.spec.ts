import { Banco } from './segunda-via.model';

describe('SegundaVia', () => {

  it(`#${Banco.name} deve criar nova instância quando chamado.`, () => {
    expect(new Banco('', '', '')).toBeTruthy();
});

});
