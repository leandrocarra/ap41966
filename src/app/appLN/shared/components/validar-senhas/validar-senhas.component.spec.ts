import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidarSenhasComponent } from './validar-senhas.component';


describe(ValidarSenhasComponent.name, () => {

  let component: ValidarSenhasComponent;
  let fixture: ComponentFixture<ValidarSenhasComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidarSenhasComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ValidarSenhasComponent);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  
  it('should method validarSenha', () => {
    fixture.detectChanges();
    expect(component.formSenha.invalid).toBeTruthy();
  });
  
  it('should method checkAll', () => {
    fixture.detectChanges();
    spyOn(component.output, 'emit');
    component.checkAll();
    expect(component.output.emit).toHaveBeenCalled();
  });
  
  it(`#${ValidarSenhasComponent.prototype.checkAll.name}
  deve emitir valor de senha quando valido`, () => {
    fixture.detectChanges();
    component.formSenha.controls['senha'].setValue('Desenvolvimento10');
    component.formSenha.controls['confirmarSenha'].setValue('Desenvolvimento10');
    spyOn(component.output, 'emit');
    component.checkAll();
    expect(component.output.emit).toHaveBeenCalled();
  });
  
  it(`#${ValidarSenhasComponent.prototype.onResize.name}
  deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });
});