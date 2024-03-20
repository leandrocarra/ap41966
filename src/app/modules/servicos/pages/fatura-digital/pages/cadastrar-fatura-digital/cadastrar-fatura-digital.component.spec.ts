import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasFaltaDeEnergia } from 'app/core/models/falta-de-energia/sub-rotas-falta-de-energia';
import { SubRotasFaturaDigital } from 'app/core/models/fatura-digital/sub-rotas-fatura-digital';
import { UcInfosResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/uc-infos-response-dto';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { TokenService } from 'app/core/services/token/token.service';
import { CadastrarFaturaDigitalComponent } from './cadastrar-fatura-digital.component';

describe(CadastrarFaturaDigitalComponent.name, () => {
  let component: CadastrarFaturaDigitalComponent;
  let fixture: ComponentFixture<CadastrarFaturaDigitalComponent>;
  
  let location: Location;
  let router: Router;

  let responseUcDetalhada: UcInfosResponseDTO = require("../../../../../../shared/mock/responses/response-api-ucs.json");


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarFaturaDigitalComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
      ],
      providers:[
        TokenService,
        {
          provide: SelecaoImovelService,
          useValue: {
            getConfig: () => ({
              getInformacoesUCSelecionada: responseUcDetalhada,
            })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(CadastrarFaturaDigitalComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it(`#${CadastrarFaturaDigitalComponent.name} Deve se iniciar o ciclo de vida do angular`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${CadastrarFaturaDigitalComponent.prototype.onResize.name}
  deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
  
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  // it(`#${CadastrarFaturaDigitalComponent.prototype.alterarNomeBtn.name}
  // Deve direcionar para a tela de descadastrar, quando fatura digital for false`, () => {
  //    let routerSpy = spyOn(router, 'navigate');
  //    fixture.detectChanges();
  //    component.possuiFaturaDigital = true
  //    component.mobile = true
  //    component.alterarNomeBtn();
  //    expect(routerSpy).toBe("DESCADASTRAR")
  // });

  it(`#${CadastrarFaturaDigitalComponent.prototype.voltar.name}
  deve navegar de volta para a página anterior.`, () => {
    fixture.detectChanges();
    let locationSpy = spyOn(component['_location'], 'back');
    component.voltar();
    expect(locationSpy).toHaveBeenCalled();
  });

  it(`#${CadastrarFaturaDigitalComponent.prototype.alterar.name}
  deve alterar para opcoesFaturaDigital, quando acionado `, () => {
     let routerSpy = spyOn(router, 'navigate');
     fixture.detectChanges();
     component.alterar();
     expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faturaDigital, SubRotasFaturaDigital.opcoesFaturaDigital])
 });

 it(`#${CadastrarFaturaDigitalComponent.prototype.continuar.name}
 Deve direcionar para opcoesFaturaDigita, quando fatura digital for true`, () => {
    let routerSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    component.continuar();
    expect(routerSpy).toHaveBeenCalledOnceWith(([PathCompleto.faturaDigital, SubRotasFaturaDigital.opcoesFaturaDigital]))
});

it(`#${CadastrarFaturaDigitalComponent.prototype.continuar.name}
Deve direcionar para a tela de descadastrar, quando fatura digital for false`, () => {
   let routerSpy = spyOn(router, 'navigate');
   fixture.detectChanges();
   component.possuiFaturaDigital = true
   fixture.detectChanges();
   component.continuar();
   expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faturaDigital, SubRotasFaturaDigital.descadastrarFaturaDigital])
});



});
