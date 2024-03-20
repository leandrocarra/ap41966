import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitularTarifaSocialComponent } from './titular-tarifa-social.component';


describe('TitularTarifaSocialComponent', () => {
  let component: TitularTarifaSocialComponent;
  let fixture: ComponentFixture<TitularTarifaSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitularTarifaSocialComponent],
      imports: [
        ReactiveFormsModule,
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitularTarifaSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create instance', () => {
    expect(component).toBeTruthy();
  });

  it(`#${TitularTarifaSocialComponent.prototype.validarForms.name}
  deve emitir dados de acordo com o status do formulário válido`, () => {
    fixture.detectChanges();
    component.formTitularTarifaSocial.patchValue({
      nome:"maria",
      dataNascimento:"08/08/2000",
      cpf:"96700905044",
      rg:"1234567891"
    });
    let deParaDadosTitularTarifaSocialSpy = spyOn(component,'deParaDadosTitularTarifaSocial');
    let emitValidaForms = spyOn(component.formTitularTarifaSocialValidado, 'emit');
    component.validarForms();
    expect(deParaDadosTitularTarifaSocialSpy).toHaveBeenCalled();    
    expect(emitValidaForms).toHaveBeenCalled();    
  });

  it(`#${TitularTarifaSocialComponent.prototype.deParaDadosTitularTarifaSocial.name}
  deve atualizar dados quando solicitado`, () => {
    fixture.detectChanges();
    component.formTitularTarifaSocial.patchValue({
      nome:"maria",
      dataNascimento:"08/08/2000",
      cpf:"12345678912",
      rg:"1234567891"
    })
    component.deParaDadosTitularTarifaSocial();
    expect(component['_etapaService'].dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.rg).toEqual(component.formTitularTarifaSocial.value.rg);
  });

});
