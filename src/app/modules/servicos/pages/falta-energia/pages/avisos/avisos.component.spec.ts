import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumOscilacaoOpcoes } from 'app/core/models/falta-de-energia/falta-de-energia';
import { SubRotasFaltaDeEnergia } from 'app/core/models/falta-de-energia/sub-rotas-falta-de-energia';
import { FaltaDeEnergiaService } from 'app/core/services/falta-de-energia/falta-de-energia.service';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';

import { AvisosComponent } from './avisos.component';

describe(AvisosComponent.name, () => {
  let component: AvisosComponent;
  let fixture: ComponentFixture<AvisosComponent>;
  let router: Router;

  let faltaDeEnergiaService: jasmine.SpyObj<FaltaDeEnergiaService>;

  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvisosComponent],
      providers: [
        UserService,
        TokenService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents();

      router = TestBed.inject(Router);
      faltaDeEnergiaService = TestBed.inject(FaltaDeEnergiaService) as jasmine.SpyObj<FaltaDeEnergiaService>;
  });

  it(`Deve instanciar ${AvisosComponent.name}, quando chamado`, () => {
    
    faltaDeEnergiaService.fluxoFaltaDeEnergia.aviso = EnumOscilacaoOpcoes.ParteDaMinhaUC;
    fixture = TestBed.createComponent(AvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${AvisosComponent.prototype.onResize.name}
  deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture = TestBed.createComponent(AvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${AvisosComponent.prototype.voltar.name}
  deve navegar de volta para a página anterior.`, () => {
    fixture = TestBed.createComponent(AvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let locationSpy = spyOn(component['_location'], 'back');
    component.voltar();
    expect(locationSpy).toHaveBeenCalled();
  });

    it(`#${AvisosComponent.prototype.continuar.name}
  Deve ser direcionado para a rota ConfirmarDados, quando acionado`, () => {
    fixture = TestBed.createComponent(AvisosComponent);
    component = fixture.componentInstance;
    let routerSpy = spyOn(router, 'navigate')
    fixture.detectChanges();
    component.continuar();
    let rota = null
    fixture.detectChanges();
     expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.DadosContato]);
   })

});

