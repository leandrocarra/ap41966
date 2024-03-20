import { HeaderMetodo } from "app/shared/models/header-metodo/header-metodo";
import { Retorno } from "app/shared/models/retorno/retorno";
import { AlterarDataCertaDTOResponse } from "../response/data-certa-dto";
import { AlterarDataCertaDTORequest, DataCertaDiasDTORequest, DataCertaDTORequest, DataCertaValidaDTORequest, DescadastraDataCertaDTOResquest } from "./data-certa-dto";

describe('DataCerta', () => {
    it(`#${DataCertaDTORequest.name} deve criar nova instância quando chamado.`, () => {
        expect(new DataCertaDTORequest("", "", "", "")).toBeTruthy();
    });
});




describe('AlterarDataCerta', () => {
    it(`#${AlterarDataCertaDTOResponse.name} deve criar nova instância quando chamado.`, () => {
        expect(new AlterarDataCertaDTORequest(new HeaderMetodo("",""), "", "", "")).toBeTruthy();
  });

});



describe('DataCertaDescadastra', () => {
    it(`#${DescadastraDataCertaDTOResquest.name} deve criar nova instância quando chamado.`, () => {
        expect(new DescadastraDataCertaDTOResquest(new HeaderMetodo("", ""), "", "", "")).toBeTruthy();
    });


    it(`#${DataCertaDTORequest.name} deve criar nova instância quando chamado.`, () => {
        expect(new DataCertaDTORequest("", "", "", "")).toBeTruthy();
    });

});




describe('DataCertaDias', () => {
    it(`#${DataCertaDiasDTORequest.name} deve criar nova instância quando chamado.`, () => {
        expect(new DataCertaDiasDTORequest("", "", "", "")).toBeTruthy();
  });
  });


  describe('DataCertaValida', () => {
    it(`#${DataCertaValidaDTORequest.name} deve criar nova instância quando chamado.`, () => {
        expect(new DataCertaValidaDTORequest("", "", "", "")).toBeTruthy();
  });


});
