import { FormatCelularPipe } from './format-celular.pipe';

describe('FormatCelularPipe', () => {
  
  it('create an instance', () => {
    const pipe = new FormatCelularPipe();
    expect(pipe).toBeTruthy();
  });

  it('should valid the method transform with 11 digits', () => {
    const pipe = new FormatCelularPipe();
    expect(pipe.transform("11999999999")).toBe("(11) 99999-9999");
  });

  it('should valid the method transform with 10 digits', () => {
    const pipe = new FormatCelularPipe();
    expect(pipe.transform("9999999999")).toBe("(99) 9999-9999");
  });

  it('should valid the method transform with 9 digits', () => {
    const pipe = new FormatCelularPipe();
    expect(pipe.transform("999999999")).toBe("(99) 9999-999");
  });

  it('should valid the method transform with 2 digits', () => {
    const pipe = new FormatCelularPipe();
    expect(pipe.transform("99")).toBe("(99) ");
  });

  it('should valid the method transform with 1 digits', () => {
    const pipe = new FormatCelularPipe();
    expect(pipe.transform("9")).toBe("(9");
  });

  it('should valid the method transform with 0 digits', () => {
    const pipe = new FormatCelularPipe();
    expect(pipe.transform("")).toBe("");
  });

  it('should valid the method transform with null like param', () => {
    const pipe = new FormatCelularPipe();
    expect(pipe.transform(null)).toBe(null);
  });
});
