import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DadosDaLigacaoService } from '../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { DadosDaLigacaoModule } from '../../dados-da-ligacao.module';
import { DimensionamentoDeRedeComponent } from './dimensionamento-de-rede.component';

describe(DimensionamentoDeRedeComponent.name, () => {
  let component: DimensionamentoDeRedeComponent;
  let fixture: ComponentFixture<DimensionamentoDeRedeComponent>;

  let ligacaoNovaSerive: jasmine.SpyObj<LigacaoNovaService>;
  let dadosImovelService: jasmine.SpyObj<DadosDoImovelService>;
  let dadosDaLigacaoService: jasmine.SpyObj<DadosDaLigacaoService>;


  let router: Router;
  let location: Location;

  let perfisMockados = require('src/app/appLN/shared/mock/preenchimentos/selecao-perfil.json');

  let subPerfisMockados = require('src/app/appLN/shared/mock/preenchimentos/selecao-subperfil.json');


  let enderecoMockado = require('src/app/appLN/shared/mock/responses/response-dados-do-imovel.json');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DimensionamentoDeRedeComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        DadosDaLigacaoModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    ligacaoNovaSerive = TestBed.inject(LigacaoNovaService) as jasmine.SpyObj<LigacaoNovaService>;

    dadosDaLigacaoService = TestBed.inject(DadosDaLigacaoService) as jasmine.SpyObj<DadosDaLigacaoService>;

    dadosImovelService = TestBed.inject(DadosDoImovelService) as jasmine.SpyObj<DadosDoImovelService>;
    dadosImovelService.setEndereco = enderecoMockado.URBANO_APT;


    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });



  it(`Deve criar o ${DimensionamentoDeRedeComponent.name} quando chamado`, fakeAsync(() => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.RESIDENCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it(`deve setar fluxoResidencial para true quando for beneficio rural e getSubPerfilEscolhido`, () => {

    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.RURAL;
    ligacaoNovaSerive.setSubPerfilEscolhido = subPerfisMockados.RESIDENCIAL_RURAL;

    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });


  it(`#${DimensionamentoDeRedeComponent.prototype.preparaPerguntasART.name}
  deve ajustar tituloPerguntaART quando for perfil industrial e apartamento`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.RESIDENCIAL;

    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;

    dadosImovelService.setEndereco = enderecoMockado.URBANO_APT;
    component.perfil = "INDUSTRIAL";
    fixture.detectChanges();

    component.preparaPerguntasART();
    expect(component.tituloPerguntaART).toBe('Qual é o tipo de ligação do seu prédio ou condomínio?');
  })


  it(`#${DimensionamentoDeRedeComponent.prototype.deveDesabilitarBotao.name}
  deve chamar #${DimensionamentoDeRedeComponent.prototype.validarFluxoNaoResidencial.name} quando for fluxo residencial`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.RESIDENCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.fluxoResidencial = true;
    let fluxoResidencialSpy = spyOn(component, 'validarFluxoRedisencial');
    component.deveDesabilitarBotao();
    expect(fluxoResidencialSpy).toHaveBeenCalled();
  });


  it(`#${DimensionamentoDeRedeComponent.prototype.validarFluxoRedisencial.name}
  deve chamar #${DimensionamentoDeRedeComponent.prototype.validarPossuiArt.name} quando possuir ART`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.RESIDENCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.possuiART = "SIM";
    let spy = spyOn(component, 'validarPossuiArt');
    component.validarFluxoRedisencial();
    expect(spy).toHaveBeenCalled();
  });

  it(`#${DimensionamentoDeRedeComponent.prototype.validarFluxoRedisencial.name}
  deve chamar #${DimensionamentoDeRedeComponent.prototype.validarNaoPossuiArt.name} quando possuir ART`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.RESIDENCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    component.possuiART = "NÃO";
    component.possuiCargasEspeciais = "NÃO";
    fixture.detectChanges();
    let spy = spyOn(component, 'validarNaoPossuiArt');
    component.validarFluxoRedisencial();
    expect(spy).toHaveBeenCalled();
  });


  it(`#${DimensionamentoDeRedeComponent.prototype.validarFluxoRedisencial.name}
  deve chamar #${DimensionamentoDeRedeComponent.prototype.validarNaoPossuiArt.name} quando possuir ART`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.RESIDENCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    component.possuiART = "NÃO";
    component.possuiCargasEspeciais = "SIM";
    fixture.detectChanges();
    component.validarFluxoRedisencial();
    expect(component.possui220).toEqual('');
  });


  it(`#${DimensionamentoDeRedeComponent.prototype.validarFluxoNaoResidencial.name}
  deve retornar false quando possuir ART`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.RESIDENCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    component.possuiART = "NÃO";
    component.possuiCargasEspeciais = "NÃO";
    fixture.detectChanges();


    expect(component.validarFluxoNaoResidencial()).toBeFalse();
  });


  it(`#${DimensionamentoDeRedeComponent.prototype.validarPossuiArt.name}
  deve retornar falso quando tiver categoria e checar art`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.COMERCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.categoria = "BIFÁSICA";
    spyOn(component['_dadosDaLigacaoService'], 'checkArt').and.returnValue(true);
    expect(component.validarPossuiArt()).toBeFalse();
  });


  it(`#${DimensionamentoDeRedeComponent.prototype.validarNaoPossuiArt.name}
  deve retornar true quando não possuir art`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.COMERCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.possuiART = '';
    expect(component.validarNaoPossuiArt()).toBeTrue();
  });

  it(`#${DimensionamentoDeRedeComponent.prototype.validarNaoPossuiArt.name}
  deve retornar true quando possuir art e não ser 220`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.COMERCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.possuiART = 'SIM';
    component.possui220 = '';
    expect(component.validarNaoPossuiArt()).toBeTrue();
  });

  it(`#${DimensionamentoDeRedeComponent.prototype.validarNaoPossuiArt.name}
  deve retornar true quando possuir art e não ser 220`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.COMERCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.possuiART = 'SIM';
    component.possui220 = 'SIM';
    expect(component.validarNaoPossuiArt()).toBeFalse();
  });


  it(`#${DimensionamentoDeRedeComponent.prototype.redirect.name}
  deve redirecionar para distancia-imovel e chamar #alertConfirmacaoDeCategoria quando pertencer ao  perfilFluxoNaoResidencial`, fakeAsync(() => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.COMERCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    //Mockando dados
    component.perfil = "INDUSTRIAL";
    dadosDaLigacaoService.dadosDaLigacao.dimensionamentoDeRede.possuiART = "SIM";
    let routerSpy = spyOn(router, 'navigate');
    spyOn(component['_alert'], 'alertConfirmacaoDeCategoria').and.returnValue(Promise.resolve<any>({
      'dismiss': 'cancel'
    }));


    fixture.detectChanges();
    component.redirect();
    tick();
    expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);


    component.perfil = "RESIDENCIAL";
    fixture.detectChanges();
    component.redirect();
    tick();
    expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);
  }));



  it(`#${DimensionamentoDeRedeComponent.prototype.redirect.name}
  deve chamar #${DimensionamentoDeRedeComponent.prototype.redirectCalculadoraCombo.name}quando não possuir ART`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.COMERCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    dadosDaLigacaoService.dadosDaLigacao.dimensionamentoDeRede.possuiART = "NÃO";

    fixture.detectChanges();
    let redirectSpy = spyOn(component, 'redirectCalculadoraCombo');
    component.redirect();

    expect(redirectSpy).toHaveBeenCalled();
  });


  it(`#${DimensionamentoDeRedeComponent.prototype.redirectCalculadoraCombo.name}
  deve  redirecionar para calculadora`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.RESIDENCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    let spy = spyOn(router, 'navigate');
    component.redirectCalculadoraCombo();
    expect(spy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "combos"]);
  });


  it(`#${DimensionamentoDeRedeComponent.prototype.redirectCalculadoraCombo.name} deve redirecionar para calculadora
  quando não for fluxoResidencial `, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.INDUSTRIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;

    let routerSpy = spyOn(router, 'navigate');

    fixture.detectChanges();
    component.redirectCalculadoraCombo();
    expect(routerSpy).toHaveBeenCalledOnceWith(["ligacao-nova", "dados-da-ligacao", "calculadora"]);

  });


  it(`#${DimensionamentoDeRedeComponent.prototype.redirectCalculadoraCombo.name} deve redirecionar para dados-da-ligacao
  quando possuir cargas especiais `, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.RESIDENCIAL;
    dadosDaLigacaoService.dadosDaLigacao.dimensionamentoDeRede.possuiCargasEspeciais = "SIM";
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    let routerSpy = spyOn(router, 'navigate');

    fixture.detectChanges();
    component.redirectCalculadoraCombo();
    expect(routerSpy).toHaveBeenCalledOnceWith(["ligacao-nova", "dados-da-ligacao", "calculadora"]);

  });


  it(`#${DimensionamentoDeRedeComponent.prototype.voltar.name}
deve voltar, quando chamado`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.COMERCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`#${DimensionamentoDeRedeComponent.prototype.continuar.name} deve chamar função #${DimensionamentoDeRedeComponent.prototype.redirect.name} quando chamado`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.COMERCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let spy = spyOn(component, 'redirect');
    component.continuar();
    expect(spy).toHaveBeenCalled();
  });


  it(`#${DimensionamentoDeRedeComponent.prototype.prepararDimensionamentoIndustrial.name}
    deve verificar se possui ART, quando chamado`, () => {
    ligacaoNovaSerive.setPerfilEscolhido = perfisMockados.COMERCIAL;
    fixture = TestBed.createComponent(DimensionamentoDeRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.prepararDimensionamentoIndustrial();
    expect(component.possuiART).toEqual('SIM')
  });

});
