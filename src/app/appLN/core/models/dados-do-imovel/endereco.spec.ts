import { Endereco } from "./endereco";

describe(Endereco.name, () => {
    it ('should create an instance', () => {
        expect(new Endereco()).toBeTruthy();
    });
});