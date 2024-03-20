import { FaltaEnergiaDTORequest, FaltaEnergiaOcorrenciaDTORequest, POSTFaltaEnergiaDTORequest} from './falta-de-energia-dto';

describe('FaltaDeEnergiaDTORequest', () => {
  it(`#${FaltaEnergiaDTORequest.name} deve criar nova instância quando chamado.`, () => {
    expect(new FaltaEnergiaDTORequest('','',2,'','')).toBeTruthy();
  });

  it(`#${FaltaEnergiaDTORequest.name} deve criar nova instância ,quando nao houver valor atribuido.`, () => {
    expect(new FaltaEnergiaDTORequest('','',2,'','','','','')).toBeTruthy();
  });

});


describe('FaltaEnergiaOcorrenciaDTORequest', () => {
    it(`#${FaltaEnergiaOcorrenciaDTORequest.name} deve criar nova instância quando chamado.`, () => {
      expect(new FaltaEnergiaOcorrenciaDTORequest('','','',2)).toBeTruthy();
    });

    it(`#${FaltaEnergiaOcorrenciaDTORequest.name} deve criar nova instância, quando nao houver valor atribuido.`, () => {
      expect(new FaltaEnergiaOcorrenciaDTORequest('','','',2, '','','','')).toBeTruthy();
    });

  });


  describe('POSTFaltaEnergiaDTORequest', () => {
    it(`#${POSTFaltaEnergiaDTORequest.name} deve criar nova instância quando chamado.`, () => {
      expect(new POSTFaltaEnergiaDTORequest('','','','','',0,'','')).toBeTruthy();
    });

    it(`#${POSTFaltaEnergiaDTORequest.name} deve criar nova instância, quando nao houver valor atribuido.`, () => {
      expect(new POSTFaltaEnergiaDTORequest('','','','','',0,'','','','','','',true,'',1,'','',true,'','','','','','','','','','','')).toBeTruthy();
    });

    
  });





  


