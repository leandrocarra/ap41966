import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { IsencaoIcmsComponent } from './isencao-icms.component';

describe('IsencaoIcmsComponent', () => {
  let component: IsencaoIcmsComponent;
  let fixture: ComponentFixture<IsencaoIcmsComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsencaoIcmsComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],


    })
      .compileComponents();
    fixture = TestBed.createComponent(IsencaoIcmsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${IsencaoIcmsComponent.prototype.onResize.name}
  deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${IsencaoIcmsComponent.prototype.voltar.name}
  deve voltar página quando chamado `, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`#${IsencaoIcmsComponent.prototype.continuar.name}
   deve contianuar documento-icms quando chamado`, () => {
    component.isencaoForm.controls.desejaIsencaoICMS.setValue(true);
    let spy = spyOn(router, 'navigate');
    component.continuar();
    expect(spy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "documento-icms"]);
  });

  it(`#${IsencaoIcmsComponent.prototype.continuar.name}
  deve contianuar documento-icms quando chamado`, () => {
   component.isencaoForm.controls.desejaIsencaoICMS.setValue(false);
   let spy = spyOn(router, 'navigate');
   component.continuar();
   expect(spy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "opcao-tarifaria"]);
 });


 
 
});
