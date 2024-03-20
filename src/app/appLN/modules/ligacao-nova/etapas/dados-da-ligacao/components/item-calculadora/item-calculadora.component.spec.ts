import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCalculadoraComponent } from './item-calculadora.component';


describe(ItemCalculadoraComponent.name, () => {
  let component: ItemCalculadoraComponent;
  let fixture: ComponentFixture<ItemCalculadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemCalculadoraComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ItemCalculadoraComponent);
    component = fixture.componentInstance;
  });


  it(`Deve criar o componente ${ItemCalculadoraComponent.name} quando chamado`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it(`#${ItemCalculadoraComponent.prototype.adicionar.name}
  deve adicionar objeto ar-condicionado quando chamado e emitir o selecionarEquipamento`, () => {
    fixture.detectChanges();
    spyOn(component.add, 'emit');
    let selecionarEquipamentoSpy = spyOn(component.selecionarEquipamento, 'emit');
    component.adicionar('AR-CONDICIONADO');
    
    expect(selecionarEquipamentoSpy).toHaveBeenCalled();
  });


});
