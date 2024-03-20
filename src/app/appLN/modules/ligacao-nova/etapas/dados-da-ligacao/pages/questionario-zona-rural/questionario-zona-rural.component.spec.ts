import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionarioZonaRuralComponent } from './questionario-zona-rural.component';


describe(QuestionarioZonaRuralComponent.name, () => {
  let component: QuestionarioZonaRuralComponent;
  let fixture: ComponentFixture<QuestionarioZonaRuralComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionarioZonaRuralComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        MatCheckboxModule,
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(QuestionarioZonaRuralComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it(`Deve instanciar o componente ${QuestionarioZonaRuralComponent.name} quando chamado`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${QuestionarioZonaRuralComponent.prototype.voltar.name}
    deve voltar pagina quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`UrlImagePoste deve receber poste 30m quando categoria for 'BIFÁSICA'`, () => {
    fixture.detectChanges();
    component.categoria = 'BIFÁSICA';
    component.ngOnInit();
    expect(component.urlImgPoste).toEqual('assets/assetsLN/images/30m.svg');
  });


  it(`#${QuestionarioZonaRuralComponent.prototype.onResize.name}
    deve ser chamado quando emitir resize da tela
    for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${QuestionarioZonaRuralComponent.prototype.continuar.name}
    deve redirecionar para isencao-icms quando for CNPJ`, () => {
    fixture.detectChanges();
    component['_userService'].tipoDocumento = "CNPJ";
    const routerSpy = spyOn(router, 'navigate');
    component.continuar();
    expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "isencao-icms"]);

  })

  it(`#${QuestionarioZonaRuralComponent.prototype.continuar.name}
    deve redirecionar para opcao tarifaria quando for CPF`, () => {
    fixture.detectChanges();
    component['_userService'].tipoDocumento = "CPF";
    const routerSpy = spyOn(router, 'navigate');
    component.continuar();
    expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "opcao-tarifaria"]);

  })

  it(`#${QuestionarioZonaRuralComponent.prototype.continuar.name}
    deve redirecionar para opcao tarifaria quando for CPF`, () => {
    fixture.detectChanges();
    component['_userService'].tipoDocumento = "CPF";
    const routerSpy = spyOn(router, 'navigate');
    component.continuar();
    expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "opcao-tarifaria"]);
  });

  it(`#${QuestionarioZonaRuralComponent.prototype.onResize.name}
  deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${QuestionarioZonaRuralComponent.prototype.controlNaPropriedade.name}
  deve atualizar formPropriedade para valores false quando tiver field for verdadeiro e 'nenhum' for falso`, () => {
    fixture.detectChanges();
    component.formPropriedade.controls['nenhum'].setValue(false);
    component.controlPropriedade(true);
    expect(component.formPropriedade.controls['casa'].value)
      .withContext('Variável casa')
      .toBeFalse();
  });

  it(`#${QuestionarioZonaRuralComponent.prototype.controlPropriedade.name}
  deve setar 'formPropriedade.nenhum' para falso quando for undefined o parâmetro da função chamada`, () => {
    fixture.detectChanges();
    component.controlPropriedade();
    expect(component.formPropriedade.controls['nenhum'].value).toBeFalse();
  });


  it(`#${QuestionarioZonaRuralComponent.prototype.controlNaPropriedade.name}
  deve setar variaveis 'formNaPropriedade' para falso quando 'formNaPropriedade.nenhum' for falso e field true`, () => {
    fixture.detectChanges();
    component.formNaPropriedade.controls['nenhum'].setValue(false);
    component.controlNaPropriedade(true);

    expect(component.formNaPropriedade.controls['corrego'].value)
      .withContext('Variável corrego')
      .toBeFalse();
  });


  it(`#${QuestionarioZonaRuralComponent.prototype.controlNaPropriedade.name}
  deve setar 'formNaPropriedade.nenhum' para false quando field for undefined`, () => {
    fixture.detectChanges();
    component.controlNaPropriedade();
    expect(component.formNaPropriedade.controls['nenhum'].value).toBeFalse();
  });

  it(`#${QuestionarioZonaRuralComponent.prototype.disable.name}
  deve setar false quando propriedade e proximo forem false `, () => {
    fixture.detectChanges();
    component.formNaPropriedade.controls['nenhum'].setValue(true);
    component.formPropriedade.controls['nenhum'].setValue(true);
    expect(component.disable()).toBeFalse();
  });

});
