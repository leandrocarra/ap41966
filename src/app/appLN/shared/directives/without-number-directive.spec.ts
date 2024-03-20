import { WithoutNumberDirective } from "./without-number-directive";

describe(WithoutNumberDirective.name, () => {

    it(`#${WithoutNumberDirective.name} deve validar se a diretiva foi criada`, () => {
        const directive = new WithoutNumberDirective(null);
        expect(directive).toBeTruthy();
    });

});