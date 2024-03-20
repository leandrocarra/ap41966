import { HeaderMetodo } from "../../entenda-sua-conta/DTO/requests/entenda-conta-qualidade-dto";
import { DadosPagamentoDTORequest, FaturaSimplificadaDTORequest, FaturasDTORequest, ListaMotivoDTORequest, PdfDTORequest } from "./segunda-via-request-dto";

describe('SegundaViaRequestDTO', () => {
it(`#${ListaMotivoDTORequest.name} deve criar nova instância quando chamado.`, () => {
    expect(new ListaMotivoDTORequest()).toBeTruthy();
});

it(`#${FaturasDTORequest.name} deve criar nova instância quando chamado.`, () => {
    expect(new FaturasDTORequest('','','','','','')).toBeTruthy();
});

it(`#${FaturaSimplificadaDTORequest.name} deve criar nova instância quando chamado.`, () => {
    expect(new FaturaSimplificadaDTORequest(new HeaderMetodo('',''), '')).toBeTruthy();
});

it(`#${DadosPagamentoDTORequest.name} deve criar nova instância quando chamado.`, () => {
    expect(new DadosPagamentoDTORequest()).toBeTruthy();
});

it(`#${PdfDTORequest.name} deve criar nova instância quando chamado.`, () => {
    expect(new PdfDTORequest('','','',1,'','','')).toBeTruthy();
});


});