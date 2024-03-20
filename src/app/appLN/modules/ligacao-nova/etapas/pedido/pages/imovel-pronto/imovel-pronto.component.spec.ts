import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatRadioModule } from '@angular/material/radio';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { SweetAlertResult } from 'sweetalert2';
import { ImovelProntoComponent } from './imovel-pronto.component';


describe(ImovelProntoComponent.name, () => {
  let component: ImovelProntoComponent;
  let fixture: ComponentFixture<ImovelProntoComponent>;

  //Mocks
  let userService: jasmine.SpyObj<UserServiceLN>;
  let sessionUserMockado = require('src/app/appLN/shared/mock/responses/response-session-user-cpf.json');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImovelProntoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatRadioModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {

    userService = TestBed.inject(UserServiceLN) as jasmine.SpyObj<UserServiceLN>;
    userService.sessionUser = sessionUserMockado;

    fixture = TestBed.createComponent(ImovelProntoComponent);
    component = fixture.componentInstance;

  });

  it(`Deve criar ${ImovelProntoComponent.name} quando chamado`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it(`#${ImovelProntoComponent.prototype.onResize.name}
  deve ser atribuir verdadeiro para variável mobile quando resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });


  it(`#${ImovelProntoComponent.prototype.solicitarLigacao.name}
  deve chamar #checkPendencias quando chamado`, () => {
    fixture.detectChanges();
    let checkPendenciasSpy = spyOn<any>(component, 'checkPendencias');
    component.solicitarLigacao();
    expect(checkPendenciasSpy).toHaveBeenCalled();
  });


  it(`#${ImovelProntoComponent.prototype.termoLocal.name}
  deve chamar alerta quando  chamado`, fakeAsync(() => {
    let Spy = spyOn(component['_alert'], 'alertAreaPreparada').and.returnValue(
      Promise.resolve<SweetAlertResult>({
        "value": true
      })
    );

    fixture.detectChanges();
    component.termoLocal();
    tick();
    expect(Spy).toHaveBeenCalledWith();
  }));


  it(`#checkPendencias deve chamar #erroCameraIndisponivel
  quando chamado com documentos`, fakeAsync(() => {
    fixture.detectChanges();
    //Mockando dados
    component.imovelPreparado = true;
    spyOn(component['_ligacaoNovaService'], 'idAcompanhamentoJornada').and.returnValue(of("01E6EB4EDC3D4C318F477C19C3E48C3D"));

    spyOn(component['_ligacaoNovaService'], 'checkCamera').and.returnValue(Promise.resolve(null));

    let erroCameraIndisponivelSpy = spyOn<any>(component, 'erroCameraIndisponivel');

    //Chamando função do tipo private para executar
    component['checkPendencias']();

    tick();
    expect(erroCameraIndisponivelSpy).toHaveBeenCalledWith(null);

  }));

  it(`#erroCameraIndisponivel deve chamar #${ImovelProntoComponent.prototype.continuar.name} quando erro for null`, (done) => {
    fixture.detectChanges();
    let continuarSpy = spyOn(component, 'continuar');
    component['erroCameraIndisponivel'](null);
    setTimeout(() => {
      expect(continuarSpy).toHaveBeenCalled();
      done();
    });
  });

  it(`#erroCameraIndisponivel deve chamar #alertCameraBloqueada quando erro for null e mensagem 'Permission Denied'`, fakeAsync(() => {
    fixture.detectChanges();
    let erroMockado = {
      code: 0,
      message: "Permission denied",
      name: "NotAllowedError"
    }
    let alertCameraBloqueadaSpy = spyOn(component['_alert'], 'alertCameraBloqueada');

    spyOn(component['_alert'], 'alertCamera').and.returnValue(Promise.resolve<any>({
      "value": true
    }));

    component['erroCameraIndisponivel'](erroMockado);
    tick();
    expect(alertCameraBloqueadaSpy).toHaveBeenCalled();
  }));

  it(`#erroCameraIndisponivel deve chamar #alertCameraBloqueada quando erro for null e mensagem for 'Could not start video source'`, fakeAsync(() => {
    fixture.detectChanges();
    let erroMockado = {
      code: 0,
      message: "Could not start video source",
      name: "NotAllowedError"
    }
    let alertCameraBloqueadaSpy = spyOn(component['_alert'], 'alertCameraBloqueada');

    spyOn(component['_alert'], 'alertCamera').and.returnValue(Promise.resolve<SweetAlertResult>({
      "value": true
    }));

    component['erroCameraIndisponivel'](erroMockado);
    tick();
    expect(alertCameraBloqueadaSpy).toHaveBeenCalled();
  }));


  it(`#erroCameraIndisponivel deve chamar #logout quando erro for null e não aceitar alerta`, fakeAsync(() => {
    fixture.detectChanges();
    let erroMockado = {
      code: 0,
      message: "DOMException",
      name: "NotAllowedError"
    }
    let logoutSpy = spyOn(component['_loginService'], 'logout');

    spyOn(component['_alert'], 'alertCamera').and.returnValue(Promise.resolve<any>({
      "dismiss": "cancel"
    }));

    component['erroCameraIndisponivel'](erroMockado);
    tick();
    expect(logoutSpy).toHaveBeenCalled();
  }));


  it(`#${ImovelProntoComponent.prototype.continuar.name}
  deve redirecionar a dados-do-imovel quando chamado `, () => {
    fixture.detectChanges();
    let alertSpy = spyOn(component['_ligacaoNovaService'], 'stopStreamedVideo');
    component.continuar();
    expect(alertSpy).toHaveBeenCalledWith();
  });

});


