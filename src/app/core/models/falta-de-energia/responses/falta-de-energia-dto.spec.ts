import { FaltaEnergiaDTOResponse } from 'app/core/models/falta-de-energia/responses/falta-de-energia-dto';

describe('FaltaDeEnergiaDto', () => {
  it('should create an instance', () => {
    expect(new FaltaEnergiaDTOResponse('','','','')).toBeTruthy();
  });
});
