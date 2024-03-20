import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DadosDoTitularComponent } from './dados-do-titular.component';


describe(DadosDoTitularComponent.name, () => {
  let component: DadosDoTitularComponent;
  let fixture: ComponentFixture<DadosDoTitularComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DadosDoTitularComponent],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DadosDoTitularComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${DadosDoTitularComponent.prototype.formTitularValidado.name}
  deve validar campos CPF e retornar valor`, () => {
    component['_userService'].tipoDocumento = 'CPF';
    fixture.detectChanges();
    component.formTitularValidado(true);
    expect(component.validaCamposCPF).toBeTrue();
  });

  it(`#${DadosDoTitularComponent.prototype.formCNPJValidado.name}
  deve validar campos CNPJ e retornar valor`, () => {
    component['_userService'].tipoDocumento = 'CNPJ';
    fixture.detectChanges();
    component.formCNPJValidado(true);
    expect(component.validaCamposCNPJ).toBeTrue();
  });

  it(`#${DadosDoTitularComponent.prototype.isDisabled.name}
  deve retornar falso quando validaCamposCPF e validaCamposCNPJ for verdadeiro`, () => {
    fixture.detectChanges();
    component.isCPF = false;
    component.formTitularValidado(true);
    component.formCNPJValidado(true);
    expect(component.isDisabled()).toBeFalse();

  })

  it(`#${DadosDoTitularComponent.prototype.voltar.name}
  deve voltar a página quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`#${DadosDoTitularComponent.prototype.continuar.name}
  deve redirecionar para dados-da-ligacao quando chamado`, () => {
    fixture.detectChanges();
    let navigateSpy = spyOn(router, "navigate");
    component.continuar();
    expect(navigateSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao"]);
  });
});
