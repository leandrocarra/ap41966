import { Retorno } from "app/shared/models/retorno/retorno";
import { AlterarDataCertaDTOResponse, DataCertaDiasDTOResponse, 
  DataCertaDTOResponse, DataCertaValidaDTOResponse, RetornoDataCertaDias, RetornoDataCertaValida, } from "./data-certa-dto";


describe('DataCerta', () => {

  it(`#${DataCertaDTOResponse.name} deve criar nova instância quando chamado.`, () => {
    expect(new DataCertaDTOResponse()).toBeTruthy();
  });

  });


  describe('DataCertaDias', () => {

  it(`#${DataCertaDiasDTOResponse.name} deve criar nova instância quando chamado.`, () => {
    expect(new DataCertaDiasDTOResponse()).toBeTruthy();
  });

  it(`#${RetornoDataCertaDias.name} deve criar nova instância quando chamado.`, () => {
    expect(new RetornoDataCertaDias("", "", "")).toBeTruthy();
  });
});

  // data-certa-valida
  describe('DataCertaValida', () => {
  it(`#${DataCertaValidaDTOResponse.name} deve criar nova instância quando chamado.`, () => {
    expect(new DataCertaValidaDTOResponse()).toBeTruthy();
  });

  it(`#${RetornoDataCertaValida.name} deve criar nova instância quando chamado.`, () => {
    expect(new RetornoDataCertaValida()).toBeTruthy();
  });
 
});


