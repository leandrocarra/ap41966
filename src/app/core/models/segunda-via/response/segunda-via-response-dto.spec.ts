import { DadosPagamentoDTOResponse, EntregaFaturasDTO, FaturaAbertaDTO, FaturaDTO, FaturaSimplificadaDTOResponse, FaturasDTOResponse, ListaMotivoDTOResponse, MotivoDTO, PdfDTOResponse } from "./segunda-via-response-dto";


describe('SegundaViaResponseDTO', () => {
   
    it(`#${FaturaDTO.name} deve criar nova instância quando chamado.`, () => {
        expect(new FaturaDTO()).toBeTruthy();
    });

    it(`#${FaturaSimplificadaDTOResponse.name} deve criar nova instância quando chamado.`, () => {
        expect(new FaturaSimplificadaDTOResponse()).toBeTruthy();
    });

    it(`#${ MotivoDTO.name} deve criar nova instância quando chamado.`, () => {
        expect(new  MotivoDTO()).toBeTruthy();
    });

    it(`#${ListaMotivoDTOResponse.name} deve criar nova instância quando chamado.`, () => {
        expect(new ListaMotivoDTOResponse()).toBeTruthy();
    });

    it(`#${FaturaAbertaDTO.name} deve criar nova instância quando chamado.`, () => {
        expect(new FaturaAbertaDTO()).toBeTruthy();
    });

    it(`#${PdfDTOResponse.name} deve criar nova instância quando chamado.`, () => {
        expect(new PdfDTOResponse()).toBeTruthy();
    });

    it(`#${EntregaFaturasDTO.name} deve criar nova instância quando chamado.`, () => {
        expect(new EntregaFaturasDTO()).toBeTruthy();
    });

    it(`#${DadosPagamentoDTOResponse.name} deve criar nova instância quando chamado.`, () => {
        expect(new DadosPagamentoDTOResponse('','')).toBeTruthy();
    });
   


});
