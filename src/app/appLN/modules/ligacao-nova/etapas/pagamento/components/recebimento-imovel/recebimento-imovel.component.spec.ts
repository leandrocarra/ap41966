import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RecebimentoImovelComponent } from './recebimento-imovel.component';

describe(RecebimentoImovelComponent.name, () => {
  let component: RecebimentoImovelComponent;
  let fixture: ComponentFixture<RecebimentoImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecebimentoImovelComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(RecebimentoImovelComponent);
    component = fixture.componentInstance;
  });



  it('should create instance', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // it('deve chamar o onResize', () => {
  //   let spyResize = spyOn(component, 'configureMenuByWindowSize');
  //   window.dispatchEvent(new Event('resize'));
  //   expect(spyResize).toHaveBeenCalled();
  // });

  // it('deve retornar tela para virar mobile', () => {
  // 	component.configureMenuByWindowSize('700');
  // 	expect(component.mobile).toBeTrue();
  // });

  // it('deve retornar tela para virar desktop', () => {
  // 	component.configureMenuByWindowSize('770');
  // 	expect(component.mobile).toBeFalse();
  // });

  it(`#${RecebimentoImovelComponent.prototype.onResize.name}
  deve ser atribuir verdadeiro para variável mobile quando resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

});
