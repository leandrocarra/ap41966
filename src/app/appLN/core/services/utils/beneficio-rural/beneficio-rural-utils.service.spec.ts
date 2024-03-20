import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BeneficioRuralUtilsService } from './beneficio-rural-utils.service';


describe(BeneficioRuralUtilsService.name, () => {
  let service: BeneficioRuralUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeneficioRuralUtilsService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(BeneficioRuralUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${BeneficioRuralUtilsService.prototype.getBoxsRural.name}
  deve retornar valor do array CPF rural quando perfil for CPF`, () => {
    let valorEsperado = service.CPF_RURAL['residencial-rural'];
    expect(service.getBoxsRural('residencial-rural', false)).toBe(valorEsperado);
  });

  it(`#${BeneficioRuralUtilsService.prototype.getBoxsRural.name}
  deve retornar valor do array CNPJ rural, quando o perfil for CNPJ`, () => {
    let valores = service.CNPJ_RURAL['agroindustrial'];
    expect(service.getBoxsRural('agroindustrial', true)).toBe(valores);
  });



});
