import { MatVerticalStepperScrollerDirective } from "./stepper-scroll-directive";

describe(MatVerticalStepperScrollerDirective.name, () => {

    it(`#${MatVerticalStepperScrollerDirective.name} deve validar se a diretiva foi criada`, () => {
        const directive = new MatVerticalStepperScrollerDirective(null);
        expect(directive).toBeTruthy();
    });

});