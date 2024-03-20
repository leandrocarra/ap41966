import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DadosBeneficioComponent } from './dados-beneficio.component';


describe(DadosBeneficioComponent.name, () => {
  let component: DadosBeneficioComponent;
  let fixture: ComponentFixture<DadosBeneficioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DadosBeneficioComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DadosBeneficioComponent);
    component = fixture.componentInstance;
  });

  it(`O componente deve ser criado quando disparado o detectChanfes()`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it( `O #${DadosBeneficioComponent.prototype.ngOnChanges.name} deve atualizar o formsDadosBeneficiosBPC quando o beneficio for BPC`, () => {
    fixture.detectChanges();
    component.beneficio = 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA';
    component.ngOnInit();
    component.ngOnChanges();
    expect(component.formDadosBeneficioBPC.controls.nb.value).toEqual('');
  });

  it(`O #${DadosBeneficioComponent.prototype.ngOnChanges.name} deve atualizar o formDadosBeneficio quando o beneficio não for BPC`, () => {
    fixture.detectChanges();
    component.ngOnInit();
    component.ngOnChanges();
    expect(component.formDadosBeneficio.controls.nis.value).toEqual('');
    expect(component.formDadosBeneficio.controls.codigoFamiliar.value).toEqual('');
  });

  it(`#${DadosBeneficioComponent.prototype.validarForms.name}
  deve emitir true quando formulario bpc for valido`, () =>{
    fixture.detectChanges();
    component.beneficio = 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA';
    component.ngOnInit();
    component.ngOnChanges();
    component.formDadosBeneficioBPC.patchValue({
      nb: "1234"
    });
    spyOn(component.formDadosBeneficioValidado, 'emit');
    component.validarForms();
    expect(component.formDadosBeneficioValidado.emit).toHaveBeenCalledWith(true);
  });

  it(`#${DadosBeneficioComponent.prototype.validarForms.name}
  deve emitir true quando formDadosBeneficio for valido`, () =>{
    fixture.detectChanges();
    component.ngOnInit();
    component.ngOnChanges();
    component.formDadosBeneficio.patchValue({
      nis: "1234",
      codigoFamiliar: "1234"
    });
    spyOn(component.formDadosBeneficioValidado, 'emit');
    component.validarForms();
    expect(component.formDadosBeneficioValidado.emit).toHaveBeenCalledWith(true);
  });
});
