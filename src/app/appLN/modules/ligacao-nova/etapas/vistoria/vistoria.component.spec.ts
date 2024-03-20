import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { VistoriaComponent } from './vistoria.component';


describe(VistoriaComponent.name, () => {
  let component: VistoriaComponent;
  let fixture: ComponentFixture<VistoriaComponent>;
  let router: Router;

  let sessionUserCNPJMockado = require('../../../../shared/mock/responses/response-session-user-cnpj.json');
  let enderecoMockado = require('../../../../shared/mock/responses/response-api-endereco-residencial.json');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistoriaComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(VistoriaComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it(`Deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${VistoriaComponent.prototype.onResize.name}
  deve ser chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${VistoriaComponent.prototype.encerrar.name}
  deve redicerionar para conclusao quando chamado`, () => {
    fixture.detectChanges();
    let routeSpy = spyOn(router, 'navigate');
    component.encerrar();
    expect(routeSpy).toHaveBeenCalledOnceWith(["ligacao-nova", "conclusao"]);
  });

  it(`#${VistoriaComponent.prototype.linkVistoria.name}
  Deve abrir link vistoria quando servico de vistoriaPadrao retornar valor`, fakeAsync(() => {
    component['_userService'].sessionUser = sessionUserCNPJMockado;
    component['_dadosDoimovelService'].setEndereco = enderecoMockado;
    fixture.detectChanges();
    spyOn(component['_userService'], 'vistoriaPadrao').and.returnValue(of(true));
    let spyWin = spyOn(window, 'open');
    component.linkVistoria();
    tick();
    expect(spyWin).toHaveBeenCalled();
  }));

});
