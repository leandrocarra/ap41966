import { FormatBytesPipe } from './format-bytes.pipe';

describe(FormatBytesPipe.name, () => {

  it(`#${FormatBytesPipe.name} deve ser criado pipe quando chamado`, () => {
    const pipe = new FormatBytesPipe();
    expect(pipe).toBeTruthy();
  });

  it(`#${FormatBytesPipe.prototype.transform.name} deve retonar '1.00KB' o metodo quando chamado`, () => {
    const pipe = new FormatBytesPipe();
    expect(pipe.transform(1024)).toBe("1.00KB");
  });

  it(`#${FormatBytesPipe.prototype.transform.name} deve retornar '0.00Bytes' quando chamado`, () => {
    const pipe = new FormatBytesPipe();
    expect(pipe.transform()).toBe("0.00Bytes");
  });

  it(`#${FormatBytesPipe.prototype.transform.name} deve retonar '?' quando receber NaN no parametro`, () => {
    const pipe = new FormatBytesPipe();
    expect(pipe.transform(NaN)).toBe("?");
  });

});
