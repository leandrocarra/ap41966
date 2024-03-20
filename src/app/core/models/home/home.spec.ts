import { Alerta, CarouselItem } from './home';

describe('CarouselItem', () => {
  it('criar uma instância do model CarouselItem', () => {
    expect(new CarouselItem("", "Débito automático", [])).toBeTruthy();
  });
});

describe('Alerta', () => {
    it('criar uma instância do card de Alerta', () => {
      expect(new Alerta("",false, "","", "", "", "text-light-blue")).toBeTruthy();
    });
  });
