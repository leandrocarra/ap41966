import { OcrResponse } from './ocr-response';

describe(OcrResponse.name, () => {
  it(`Deve instanciar ${OcrResponse.name} quando chamado`, () => {
    expect(new OcrResponse()).toBeTruthy();
  });
});
