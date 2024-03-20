import { FocusDirective } from "./focus-directive";

describe(FocusDirective.name, () => {

    it(`#${FocusDirective.name} deve validar se a diretiva foi criada`, () => {
        const directive = new FocusDirective();
        expect(directive).toBeTruthy();
    });

});