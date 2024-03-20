import { Imovel } from "./imovel";
import { ListaImoveis } from "./lista-imoveis";

describe(ListaImoveis.name, () => {
    it('should create an instance', () => {
        expect(new ListaImoveis()).toBeTruthy();
    });

    it('should create an instance', () => {
        expect(new ListaImoveis([new Imovel()])).toBeTruthy();
    });
});