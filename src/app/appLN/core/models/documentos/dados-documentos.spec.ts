import { DadosDocumentos } from "./dados-documentos";


describe(DadosDocumentos.name, () => {
    it ('should create an instance', () => {
        expect(new DadosDocumentos()).toBeTruthy();
    });
});