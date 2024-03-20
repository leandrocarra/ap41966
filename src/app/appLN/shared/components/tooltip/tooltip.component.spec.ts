import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipComponent } from './tooltip.component';


describe(TooltipComponent.name, () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooltipComponent],
      imports: [MatTooltipModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;

  });


  it('Deve criar o componente quando iniciado o ciclo de vida do Angular', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${TooltipComponent.prototype.showMessage.name}
  deve exibir o alert, quando acionado`, () => {
    fixture.detectChanges();
    component.explicacao = "alert";
    let alertaSpy = spyOn(component['_alert'], 'alertInfoHtml');
    component.showMessage();
    expect(alertaSpy).toHaveBeenCalledWith(component.explicacao.replace(/\n/g, '<br/>'));
  });

  it(`#${TooltipComponent.prototype.ngOnInit.name}
  Deve exibir o valor, quando acionado`, () => {
    fixture.detectChanges();
    component.positionValue = 'below';
    component.ngOnInit();
    expect(component.positionValue).toEqual('below');
  });




});


