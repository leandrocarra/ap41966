import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumFaltaEnergiaOpcoes } from 'app/core/models/falta-de-energia/falta-de-energia';
import { SubRotasFaltaDeEnergia } from 'app/core/models/falta-de-energia/sub-rotas-falta-de-energia';
import { ServicoInfosResponseDTO, UcInfosResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/uc-infos-response-dto';
import { FaltaDeEnergiaService } from 'app/core/services/falta-de-energia/falta-de-energia.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';
import { FaltaEnergiaComponent } from './falta-energia.component';

describe(FaltaEnergiaComponent.name, () => {
  let component: FaltaEnergiaComponent;
  let fixture: ComponentFixture<FaltaEnergiaComponent>;
  let router: Router;
  let location: Location;

  let responseFaltaEnergia = require("../../../../../../shared/mock/responses/responses-api-falta-energia.json");
  let responseFaltaEnergiaOcorrencia = require("../../../../../../shared/mock/responses/responses-api-falta-energia-ocorrencia.json");
  //let responseUcDetalhada = require("../../../../../../shared/mock/responses/response-api-ucs.json");
  let responseUcDetalhada = require("../../../../../../shared/mock/responses/response-api-ucs.json");
  let responseListaUCs = require("../../../../../../shared/mock/responses/response-api-imoveis.json")

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FaltaEnergiaComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MatRadioModule,
      ],
      providers: [
        FaltaDeEnergiaService,
        UserService,
        TokenService,
        {
          provide:SelecaoImovelService,
          useValue: {
            getConfig: () => ({
              getInformacoesUCSelecionada: responseUcDetalhada.SE,
              getUCSelecionada: responseListaUCs.ATUAL.ucs[0],

              setInformacoesUCSelecionada: responseUcDetalhada.SE,
            })
          }
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaltaEnergiaComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it(`#${FaltaEnergiaComponent.name} 
  deve criar o componente quando iniciado o ciclo de vida do Angular TEST`, () => {
    component['_user'].group = 'B';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${FaltaEnergiaComponent.prototype.cancelar.name}
  deve cancelar a solicitação e navegar de volta para a página anterior`, () => {
    fixture.detectChanges();
    let locationSpy = spyOn(component['_location'], 'back');
    component.cancelar();
    expect(locationSpy).toHaveBeenCalled();
  });

  it(`#${FaltaEnergiaComponent.prototype.atualizaDados.name}
  deve setar informações isFluxo, ondeFaltaEnergia e se é iluminação pública`, () => {
    component.fluxoFaltaDeEnergia.ondeFaltaEnergia = EnumFaltaEnergiaOpcoes.UnidadeConsumidora;
    fixture.detectChanges();
    component.atualizaDados();
    expect(component['_faltaDeEnergiaService'].fluxoFaltaDeEnergia.isIluminacao).toBeFalse();
  });

  //TODO: Refatorar com dados válidos quando o webservice for finalizado
  // it(`#${FaltaEnergiaComponent.prototype.consultaFaltaEnergia.name}
  // deve retornar a consulta de ocorrência em aberto`, () => {
  //   spyOn(component['_faltaDeEnergiaService'], "consultarFaltaEnergia").and.returnValue(of(responseFaltaEnergia));
  //   component['_faltaDeEnergiaService'].uc = "1234";
  //   fixture.detectChanges();
  //   component.consultaFaltaEnergia();
  //   expect(component.consultaEnergiaDTO).toEqual(responseFaltaEnergia)
  // });

  // it(`#${FaltaEnergiaComponent.prototype.consultaFaltaEnergia.name}
  // deve retornar a consulta de ocorrência`, () => {
  //   component['_faltaDeEnergiaService'].uc = "1234";
  //   spyOn(component['_faltaDeEnergiaService'], "consultarOcorrencia").and.returnValue(of(responseFaltaEnergiaOcorrencia));
  //   fixture.detectChanges();
  //   component.consultaOcorrencia();
  //   expect(component.consultaOcorrenciaDTO).toEqual(responseFaltaEnergiaOcorrencia)
  // });


  it(`#${FaltaEnergiaComponent.prototype.continuar}
  deve direcionar tela de iluminação pública`, () => {
    component.fluxoFaltaDeEnergia.ondeFaltaEnergia = EnumFaltaEnergiaOpcoes.IluminacaoPublica;
    let routerSpy = spyOn(router, 'navigate');
    component.continuar();
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.IluminacaoPublica]);
  });

  it(`#${FaltaEnergiaComponent.prototype.continuar}
  deve direcionar tela passos`, () => {
    component.fluxoFaltaDeEnergia.ondeFaltaEnergia = EnumFaltaEnergiaOpcoes.UnidadeConsumidora;
    let routerSpy = spyOn(router, 'navigate');
    component.continuar();
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.Passos]);
  });

  it(`#${FaltaEnergiaComponent.prototype.continuar}
  deve direcionar tela problema quando o usuário informar que a falta de energia é no imóvel e na vizinhança`, () => {
    component.fluxoFaltaDeEnergia.ondeFaltaEnergia = EnumFaltaEnergiaOpcoes.UnidadeConsumidoraEVizinhanca;;
    let routerSpy = spyOn(router, 'navigate');
    component.continuar();
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.Problema]);
  });


  // it(`#${FaltaEnergiaComponent.prototype.continuar.name}
  // teste continuar`, () => {
  //   component.atualizaDados()
  //   component['_selecaoImovelService'].setInformacoesUCSelecionada = responseUcDetalhada;
  //   fixture.detectChanges();
  //   let routerSpy = spyOn(router, 'navigate')
  //   component.continuar();
  //   expect(routerSpy).toHaveBeenCalled();
  // });

  it(`#${FaltaEnergiaComponent.prototype.ucCortada.name}
  deve retornar false, quando acionado.`, () => {
    
    component['_selecaoImovelService'].setInformacoesUCSelecionada = responseUcDetalhada.SE;
    component.ucCortada();
    
        fixture.detectChanges();
    expect(component.ucCortada).toBeTruthy();
  }); 




});
