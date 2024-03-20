import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PathCompleto, Servicos } from 'app/core/enums/servicos';
import { SubRotasFaltaDeEnergia } from 'app/core/models/falta-de-energia/sub-rotas-falta-de-energia';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';
import { SharedModule } from 'app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { ConfiraSeusDadosComponent } from './confira-seus-dados.component';
import { FaltaDeEnergiaService } from 'app/core/services/falta-de-energia/falta-de-energia.service'
import { EnumDisjuntorFuncionandoOpcoes } from 'app/core/models/falta-de-energia/falta-de-energia';

// describe(FaltaDeEnergiaService.name, () => {
//   let service: FaltaDeEnergiaService;

//   // it(``, () => {
//   //   service = new FaltaDeEnergiaService();
//   // });
// });


describe(ConfiraSeusDadosComponent.name, () => {
  let component: ConfiraSeusDadosComponent;
  let fixture: ComponentFixture<ConfiraSeusDadosComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiraSeusDadosComponent],
      providers: [
        UserService,
        TokenService
      ],
      imports: [
        HttpClientTestingModule,
        NgxMaskModule,
        NgxMaskModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        SharedModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ConfiraSeusDadosComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
});

it(`#${ConfiraSeusDadosComponent.name}
deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
});

it(`#${ConfiraSeusDadosComponent.prototype.voltar.name} deve navegar de volta para a página anterior quando chamado.`, () => {
  fixture.detectChanges();
  let locationSpy = spyOn(component['_location'], 'back');
  component.voltar();
  expect(locationSpy).toHaveBeenCalled();
});

it(`#${ConfiraSeusDadosComponent.prototype.alterarOnde.name}
deve direcionar para a tela falta de energia, quando for alterado`, () => {
   let routerSpy = spyOn(router, 'navigate');
   fixture.detectChanges();
   component.alterarOnde();
   expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia])
});

it(`#${ConfiraSeusDadosComponent.prototype.alterarReferenciaCelular.name}
deve direcionar para os dados de contatos, quando o #alterarReferenciaCelular for acionado`, () => {
   let routerSpy = spyOn(router, 'navigate');
   fixture.detectChanges();
   component.alterarReferenciaCelular();
   expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia , SubRotasFaltaDeEnergia.DadosContato])
});


it(`#${ConfiraSeusDadosComponent.prototype.alterarDescricao.name}
deve direcionar para os dados de contatos, quando o #alterarReferenciaCelular for acionado`, () => {
   let routerSpy = spyOn(router, 'navigate');
   component.fluxoFaltaDeEnergia.isIluminacao = true
   fixture.detectChanges();
   component.alterarDescricao();
   expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia , SubRotasFaltaDeEnergia.IluminacaoPublica])
});

it(`#${ConfiraSeusDadosComponent.prototype.alterarDescricao.name}
deve direcionar para DisjuntorFuncionando, quando o isIluminacao for false`, () => {
   let routerSpy = spyOn(router, 'navigate');
   component.fluxoFaltaDeEnergia.problemaEscolhido = EnumDisjuntorFuncionandoOpcoes.FioPartido
   fixture.detectChanges();
   component.alterarDescricao();
   expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia,
    SubRotasFaltaDeEnergia.DisjuntorFuncionando])
});

it(`#${ConfiraSeusDadosComponent.prototype.alterarDescricao.name}
deve direcionar para Problemas, quando disjuntos não estiver funcionando`, () => {
   let routerSpy = spyOn(router, 'navigate');
   fixture.detectChanges();
   component.alterarDescricao();
   expect(routerSpy).toHaveBeenCalledOnceWith([ PathCompleto.faltaDeEnergia,
    SubRotasFaltaDeEnergia.Problema])
});


it(`#${ConfiraSeusDadosComponent.prototype.continuar.name}
Deve continuar, quando definirDadosSolicitacao for acionado`, () => {
   let routerSpy = spyOn(router, 'navigate');
   fixture.detectChanges();
   component.continuar();
   expect(routerSpy).toBeTruthy()
});

});
