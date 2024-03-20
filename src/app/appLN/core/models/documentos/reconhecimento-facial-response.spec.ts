import { Img, ImgStats, ReconhecimentoFacialResponse, Result, Status } from "./reconhecimento-facial-response";

describe(ReconhecimentoFacialResponse.name, () => {
    it ('should create an instance', () => {
        expect(new ReconhecimentoFacialResponse()).toBeTruthy();
    });
});

describe(Result.name, () => {
    it ('should create an instance, quando escolhido Result', () => {
        expect(new Result()).toBeTruthy();
    });
});

describe(ImgStats.name, () => {
    it ('should create an instance, quando escolhido ImgStats', () => {
        expect(new ImgStats()).toBeTruthy();
    });
});

describe(Img.name, () => {
    it ('should create an instance, quando escolhido Img', () => {
        expect(new Img()).toBeTruthy();
    });
});

describe(Status.name, () => {
    it ('should create an instance, quando escolhido Status', () => {
        expect(new Status()).toBeTruthy();
    });
});
