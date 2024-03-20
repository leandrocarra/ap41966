import { DebitoJustificativa } from "./debito-justificativa";


describe(DebitoJustificativa.name, () => {
    it ('should create an instance', () => {
        expect(new DebitoJustificativa()).toBeTruthy();
    });

    it ('should create an instance with values', () => {
        expect(new DebitoJustificativa('justificativa', 'documentoComprovante')).toBeTruthy();
    });
});