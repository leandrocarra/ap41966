import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PathCompleto, Servicos } from 'app/core/enums/servicos';
import { SubRotasFaturaImpressa } from 'app/core/models/entrega-de-fatura/sub-rotas-falta-de-energia';
import { TokenService } from 'app/core/services/token/token.service';

import { CaixaPostalComponent } from './caixa-postal.component';

describe('CaixaPostalComponent', () => {
  let component: CaixaPostalComponent;
  let fixture: ComponentFixture<CaixaPostalComponent>;
  let router : Router 

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CaixaPostalComponent ],

      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],

      providers:[
        TokenService,
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CaixaPostalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Deve se iniciar o ciclo de vida do angular`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${CaixaPostalComponent.prototype.voltar.name}
  deve navegar de volta para a página anterior.`, () => {
    fixture.detectChanges();
    let locationSpy = spyOn(component['_location'], 'back');
    component.voltar();
    expect(locationSpy).toHaveBeenCalled();
  });

  it(`#${CaixaPostalComponent.prototype.continuar.name}
    Deve ser direcionado para a rota ConfirmarDados, quando acionado`, () => {
   let routerSpy = spyOn(router, 'navigate')
      fixture.detectChanges();
      component.continuar();
       expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faturaImpressa, SubRotasFaturaImpressa.ConfirmarDados]);
       fixture.detectChanges();
     })





});
