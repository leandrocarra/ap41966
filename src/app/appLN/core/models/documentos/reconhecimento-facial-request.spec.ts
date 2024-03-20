import { ReconhecimentoFacialRequest } from "./reconhecimento-facial-request";

describe(ReconhecimentoFacialRequest.name, () => {
    it ('should create an instance', () => {
        expect(new ReconhecimentoFacialRequest()).toBeTruthy();
    });
});