import { FormatCpfCnpjPipe } from './format-cpf-cnpj.pipe';

describe('FormatCpfCnpjPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatCpfCnpjPipe();
    expect(pipe).toBeTruthy();
  });

  it('should valid the method transform with null like param', () => {
    const pipe = new FormatCpfCnpjPipe();
    expect(pipe.transform(null)).toBe(null);
  });

  it('should valid the method transform for CPF', () => {
    const pipe = new FormatCpfCnpjPipe();
    expect(pipe.transform("44444444444")).toBe("444.444.444-44");
  });

  it('should valid the method transform for CNPJ', () => {
    const pipe = new FormatCpfCnpjPipe();
    expect(pipe.transform("44444444444444")).toBe("44.444.444/4444-44");
  });

  it('should valid the method transform for invalid number', () => {
    const pipe = new FormatCpfCnpjPipe();
    expect(pipe.transform("4")).toBe("4");
  });

});
