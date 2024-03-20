import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { environmentLN } from '@environments/environmentsLN/environment';
import { LoginComponent } from '../login/login.component';
import { ValidarSenhasComponent } from '../shared/components/validar-senhas/validar-senhas.component';
import { ValidarSenhasModule } from '../shared/components/validar-senhas/validar-senhas.module';
import { RecuperarSenhaComponent } from './recuperar-senha.component';


describe(RecuperarSenhaComponent.name, () => {
  let component: RecuperarSenhaComponent;
  let fixture: ComponentFixture<RecuperarSenhaComponent>;
  let location: Location;
  let router: Router;
  let validarSenhasComponent: ValidarSenhasComponent;
  let fixtureValidarSenhasComponent: ComponentFixture<ValidarSenhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarSenhaComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
        ReactiveFormsModule,
        HttpClientTestingModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        ValidarSenhasModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
      .compileComponents();
    fixture = TestBed.createComponent(RecuperarSenhaComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixtureValidarSenhasComponent = TestBed.createComponent(ValidarSenhasComponent);
    validarSenhasComponent = fixtureValidarSenhasComponent.componentInstance;
  });

  it(`Deve instanciar o componente ${RecuperarSenhaComponent.name} quando chamado`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`Deve setar isHomologacao como false quando environment.production for true`, () => {
    fixture.detectChanges();
    environmentLN.production = true;
    component.ngOnInit();
    expect(component.isHomologacao).toBeFalse();
  });


  it(`Deve setar isHomologacao como true quando environment.production for false`, () => {
    fixture.detectChanges();
    environmentLN.production = false;
    component.ngOnInit();
    expect(component.isHomologacao).toBeTrue();
  });

  it(`#${RecuperarSenhaComponent.prototype.enviarLinkSenha.name}
  deve chamar o serviço que envia o link para troca de senha com dados inválidos`, fakeAsync(() => {
    fixture.detectChanges();
    component.formRecuperarSenha.patchValue({
      documento: "00000000000",
      email: "teste@teste.com",
      tipoEnvio: "1"
    })
    let alertSpy = spyOn(component['_alert'], 'alertInfo');
    component.enviarLinkSenha();
    tick();
    expect(alertSpy).toHaveBeenCalledWith("CPF ou e-mail inválidos.");
  }));

  it(`#${RecuperarSenhaComponent.prototype.enviarLinkSenha.name}
  deve chamar o serviço que envia o link para troca de senha com dados válidos`, fakeAsync(() => {
    fixture.detectChanges();
    component.formRecuperarSenha.patchValue({
      documento: "33991294000110",
      email: "teste@teste.com",
      tipoEnvio: "1"
    })
    let alertSpy = spyOn(component['_alert'], 'alertSuccess');
    spyOn(component['_recuperarSenhaService'], 'resgatarSenha').and.returnValue(of('OK'));
    component.enviarLinkSenha();
    tick();
    expect(alertSpy).toHaveBeenCalledWith("Foi enviado o token para cadastrar a nova senha.");
  }));

  it(`#${RecuperarSenhaComponent.prototype.enviarLinkSenha.name}
  deve chamar alertaError quando #restagarSenha retornar dado diferente de 'OK'`, fakeAsync(() => {
    fixture.detectChanges();
    component.formRecuperarSenha.patchValue({
      documento: "33991294000110",
      email: "teste@teste.com",
      tipoEnvio: "1"
    })
    let alertSpy = spyOn(component['_alert'], 'alertError');
    spyOn(component['_recuperarSenhaService'], 'resgatarSenha').and.returnValue(of('Erro'));
    component.enviarLinkSenha();
    tick();
    expect(alertSpy).toHaveBeenCalledWith("Erro");
  }));


  it(`#${RecuperarSenhaComponent.prototype.validaToken.name}
  deve chamar o serviço que envia o link para troca de senha com dados inválidos`, fakeAsync(() => {
    fixture.detectChanges();
    component.senha = "testeLN1";
    let alertSpy = spyOn(component['_alert'], 'alertSuccess');
    spyOn(component['_recuperarSenhaService'], 'validarNovaSenha').and.returnValue(of('OK'));
    component.validaToken();
    tick();
    expect(alertSpy).toHaveBeenCalledWith("Senha cadastrada com sucesso.");
  }));

  it(`#${RecuperarSenhaComponent.prototype.validaToken.name}
  deve chamar #alertError quando valor retornado do #validarNovaSenha for
  diferente de 'OK'`, fakeAsync(() => {
    fixture.detectChanges();
    component.senha = "testeLN1";
    let alertSpy = spyOn(component['_alert'], 'alertError');
    spyOn(component['_recuperarSenhaService'], 'validarNovaSenha').and.returnValue(of('Erro'));
    component.validaToken();
    tick();
    expect(alertSpy).toHaveBeenCalledWith("Erro");
  }));

  it(`#${RecuperarSenhaComponent.prototype.validaToken.name}
  deve chamar #alertInfo quando senha for inválida`, () => {
    fixture.detectChanges();
    let alertInfoSpy = spyOn(component['_alert'], 'alertInfo');
    component.senha = null;
    component.validaToken();
    expect(alertInfoSpy).toHaveBeenCalledWith('Senha incompatível.');

  });

  it(`#${RecuperarSenhaComponent.prototype.getPassword.name}
  deve chamar o método que salva a senha válida informada pelo usuário`, () => {
    fixture.detectChanges();
    fixtureValidarSenhasComponent.detectChanges();
    validarSenhasComponent.formSenha.patchValue({
      senha: "testeLN1",
      confirmarSenha: "testeLN1",
    })
    spyOn(validarSenhasComponent.output, 'emit');
    validarSenhasComponent.checkAll();
    component.getPassword("testeLN1");
    expect(validarSenhasComponent.output.emit).toHaveBeenCalledWith(component.senha);
  });

  it(`#${RecuperarSenhaComponent.prototype.voltar.name}
  deve voltar pagina quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

});
