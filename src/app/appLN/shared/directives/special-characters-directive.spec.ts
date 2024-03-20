import { SpecialCharactersDirective } from "./special-characters-directive";

describe(SpecialCharactersDirective.name, () => {

    it(`#${SpecialCharactersDirective.name} deve validar se a diretiva foi criada`, () => {
        const directive = new SpecialCharactersDirective(null);
        expect(directive).toBeTruthy();
    });

});