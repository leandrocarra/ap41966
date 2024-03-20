import { DadosTitular } from './dados-titular';

describe(DadosTitular.name, () => {
  it('should create an instance with false as parameters', () => {
    expect(new DadosTitular(false)).toBeTruthy();
  });

  it('should create an instance with true as parameters', () => {
    expect(new DadosTitular(true)).toBeTruthy();
  });
});
