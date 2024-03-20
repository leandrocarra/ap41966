import { FormatTelefonePipe } from './format-telefone.pipe';

describe('FormatTelefonePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatTelefonePipe();
    expect(pipe).toBeTruthy();
  });

  it('should valid the method transform with null like param', () => {
    const pipe = new FormatTelefonePipe();
    expect(pipe.transform(null)).toBe(null);
  });

  it('should valid the method transform for number >=7 e <=10', () => {
    const pipe = new FormatTelefonePipe();
    expect(pipe.transform("44444444")).toBe("(44) 4444-44");
  });

  it('should valid the method transform for number >1 e <=6', () => {
    const pipe = new FormatTelefonePipe();
    expect(pipe.transform("44444")).toBe("(44) 444");
  });

  it('should valid the method transform for 1 number', () => {
    const pipe = new FormatTelefonePipe();
    expect(pipe.transform("4")).toBe("4");
  });

});
