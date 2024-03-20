import { DocumentoPosse } from "./documento-posse";

describe(DocumentoPosse.name, () => {
    it ('Deve criar o componente quando iniciado o ciclo de vida do Angular com construtor vazio', () => {
        expect(new DocumentoPosse()).toBeTruthy();
    });

    it ('Deve criar o componente quando iniciado o ciclo de vida do Angular com construtor não vazio', () => {
        let dados = {
            posseImovel: "naoTenhoDocumento",
            documentoPosseImovel: [],
            termoAceitoDocPosse: "AceitoOrçamentoRede(RR)",
            checarDocumentoPosse: true,
        }
        expect(new DocumentoPosse(dados)).toBeTruthy();
    });
});

