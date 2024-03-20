import { Aviso, DataCerta } from "./data-certa";

describe('DataCerta-models', () => {
    it(`#${Aviso.name} deve criar nova instância quando chamado.`, () => {
        expect(new Aviso()).toBeTruthy();
    });
});