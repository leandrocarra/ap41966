import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Anexo } from '../../models/anexo/anexo';
import { Propriedade, ProxPropriedade } from '../../models/dados-da-ligacao/dados-da-ligacao';
import { DadosDaLigacaoService } from './dados-da-ligacao.service';


describe(DadosDaLigacaoService.name, () => {
  let service: DadosDaLigacaoService;

  let arquivoART: Anexo = new Anexo(".png", "Doc Oficial", 170392, "/9j/4AAQSkZJRgA");
  let combozeroMockado = require('src/app/appLN/shared/mock/preenchimentos/calculadora-combo-residencial.json');


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DadosDaLigacaoService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(DadosDaLigacaoService);
  });

  it(`Deve instanciar ${DadosDaLigacaoService.name} quando chamado`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${DadosDaLigacaoService.prototype.checkArt.name}
  deve retonar verdadeiro quando tiver anexo de art`, () => {
    expect(service.checkArt()).toBeFalse();
    service.anexos.art.push(arquivoART);
    expect(service.checkArt()).toBeTrue();
  });

  it(`Deve setar valor em #desmembrado e retornar
  valor em #getDesmembrado quando chamado`, () => {
    let valorEsperado: string = 'naoSei';
    service.setDesmembrado = valorEsperado;
    expect(service.getDesmembrado);
  });


  it(`Deve setar combo em #combo e chamar #${DadosDaLigacaoService.prototype.deParaDadosCalculadora.name}
  quando setar valor`, (done) => {
    let spy = spyOn(service, 'deParaDadosCalculadora');
    service.setCombo = combozeroMockado;
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it(`Deve setar propriedade.nenhum como verdadeiro e retornar valor em #getItensPropriedade`, fakeAsync(() => {
    let propriedadeMock = new Propriedade();
    propriedadeMock.nenhum = true
    service.dadosDaLigacao.questionarioRural.propriedade = propriedadeMock;
    let valorExpect = service.getItensPropriedade;
    expect(valorExpect).toEqual('Nenhum Desses ');
  }));

  it(`Deve setar propriedade.casa como verdadeiro e retornar valor em #getItensPropriedade`, fakeAsync(() => {
    let propriedadeMock = new Propriedade();
    propriedadeMock.casa = true
    service.dadosDaLigacao.questionarioRural.propriedade = propriedadeMock;
    let valorExpect = service.getItensPropriedade;
    expect(valorExpect).toEqual('Casa ');
  }));


  it(`Deve setar propriedade.cerca como verdadeiro e retornar valor em #getItensPropriedade`, fakeAsync(() => {
    let propriedadeMock = new Propriedade();
    propriedadeMock.cerca = true
    service.dadosDaLigacao.questionarioRural.propriedade = propriedadeMock;
    let valorExpect = service.getItensPropriedade;
    expect(valorExpect).toEqual('Cerca ');
  }));


  it(`Deve setar propriedade.muro como verdadeiro e retornar valor em #getItensPropriedade`, fakeAsync(() => {
    let propriedadeMock = new Propriedade();
    propriedadeMock.muro = true
    service.dadosDaLigacao.questionarioRural.propriedade = propriedadeMock;
    let valorExpect = service.getItensPropriedade;
    expect(valorExpect).toEqual('Muro ');
  }));


  it(`Deve setar propriedade.barracao como verdadeiro e retornar valor em #getItensPropriedade`, fakeAsync(() => {
    let propriedadeMock = new Propriedade();
    propriedadeMock.barracao = true
    service.dadosDaLigacao.questionarioRural.propriedade = propriedadeMock;
    let valorExpect = service.getItensPropriedade;
    expect(valorExpect).toEqual('Barracao ');
  }));

  it(`Deve setar propriedade.poco como verdadeiro e retornar valor em #getItensPropriedade`, fakeAsync(() => {
    let propriedadeMock = new Propriedade();
    propriedadeMock.poco = true
    service.dadosDaLigacao.questionarioRural.propriedade = propriedadeMock;
    let valorExpect = service.getItensPropriedade;
    expect(valorExpect).toEqual('Poco ');
  }));



  it(`Deve setar proxPropriedade.nenhum como verdadeiro e retornar valor em #getItensProxPropriedade`, fakeAsync(() => {
    let proxPropriedadeMock = new ProxPropriedade();
    proxPropriedadeMock.nenhum = true
    service.dadosDaLigacao.questionarioRural.proxPropriedade = proxPropriedadeMock;
    let valorExpect = service.getItensProxPropriedade;
    expect(valorExpect).toEqual('Nenhum Desses Próximo ');
  }));

  it(`Deve setar proxPropriedade.corrego como verdadeiro e retornar valor em #getItensProxPropriedade`, fakeAsync(() => {
    let proxPropriedadeMock = new ProxPropriedade();
    proxPropriedadeMock.corrego = true
    service.dadosDaLigacao.questionarioRural.proxPropriedade = proxPropriedadeMock;
    let valorExpect = service.getItensProxPropriedade;
    expect(valorExpect).toEqual('Corrego ');
  }));

  it(`Deve setar proxPropriedade.acude como verdadeiro e retornar valor em #getItensProxPropriedade`, fakeAsync(() => {
    let proxPropriedadeMock = new ProxPropriedade();
    proxPropriedadeMock.acude = true
    service.dadosDaLigacao.questionarioRural.proxPropriedade = proxPropriedadeMock;
    let valorExpect = service.getItensProxPropriedade;
    expect(valorExpect).toEqual('Acude ');
  }));

  it(`Deve setar proxPropriedade.rodovia como verdadeiro e retornar valor em #getItensProxPropriedade`, fakeAsync(() => {
    let proxPropriedadeMock = new ProxPropriedade();
    proxPropriedadeMock.rodovia = true
    service.dadosDaLigacao.questionarioRural.proxPropriedade = proxPropriedadeMock;
    let valorExpect = service.getItensProxPropriedade;
    expect(valorExpect).toEqual('Rodovia ');
  }));

  it(`Deve setar proxPropriedade.ferrovia como verdadeiro e retornar valor em #getItensProxPropriedade`, fakeAsync(() => {
    let proxPropriedadeMock = new ProxPropriedade();
    proxPropriedadeMock.ferrovia = true
    service.dadosDaLigacao.questionarioRural.proxPropriedade = proxPropriedadeMock;
    let valorExpect = service.getItensProxPropriedade;
    expect(valorExpect).toEqual('Ferrovia ');
  }));

  it(`Deve setar valor em #setDocumentoComFotoTarifaSocialValidado e
  retonar valor em #getDocumentoComFotoTarifaSocialValidado quando chamado`, () => {
    service.setDocumentoComFotoTarifaSocialValidado = true;
    expect(service.getDocumentoComFotoTarifaSocialValidado).toBeTrue();
  });


  it(`#${DadosDaLigacaoService.prototype.deParaDadosCalculadora.name}
  deve setar '220' em tensaoFornecimentoMaxima quando categoria for 'MONOFÁSICA'`, (done) => {
    service.dadosDaLigacao.categoria = 'BIFÁSICA';
    service.deParaDadosCalculadora();

    setTimeout(() => {
      expect(service.tensaoFornecimentoMaxima).toEqual('220');
      done();
    });

  });


  it(`#${DadosDaLigacaoService.prototype.getTipoDisjuntor.name}
  Deve setar potencia e retornar tipoDisjuntor com valor '100'`, () => {
    expect(service.getTipoDisjuntor(26000)).toEqual('100');
  });

  it(`#${DadosDaLigacaoService.prototype.getTipoDisjuntor.name}
  Deve setar potencia e retornar tipoDisjuntor com valor '150'`, () => {
    expect(service.getTipoDisjuntor(38200)).toEqual('150');
  });

  it(`#${DadosDaLigacaoService.prototype.getTipoDisjuntor.name}
  Deve setar potencia e retornar tipoDisjuntor com valor '200'`, () => {
    expect(service.getTipoDisjuntor(55200)).toEqual('200');
  });

});
