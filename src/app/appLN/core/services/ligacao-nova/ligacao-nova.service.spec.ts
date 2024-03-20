import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestScheduler } from 'rxjs/testing';
import { environmentLN } from '../../../../../environments/environmentsLN/environment';
import { Anexo } from '../../models/anexo/anexo';
import { DadosDaLigacao } from '../../models/dados-da-ligacao/dados-da-ligacao';
import { Imovel } from '../../models/dados-do-imovel/imovel';
import { DadosPagamento } from '../../models/dados-pagamento/dados-pagamento';
import { DadosTitularTarifaSocial } from '../../models/dados-tarifa-social/dados-tarifa-social';
import { DadosTitular } from '../../models/dados-titular/dados-titular';
import { DadosDocumentos } from '../../models/documentos/dados-documentos';
import { EscolhaPerfil, SubPerfilRural } from '../../models/escolha-perfil/escolha-perfil';
import { DocumentosService } from '../documentos/documentos.service';
import { LigacaoNovaService } from './ligacao-nova.service';


describe(LigacaoNovaService.name, () => {
  let service: LigacaoNovaService;
  let documentosService: jasmine.SpyObj<DocumentosService>;

  let dadosDocumentosMockado = require('src/app/appLN/shared/mock/preenchimentos/dados-documentos.json')
  let perfilMockado = require('src/app/appLN/shared/mock/preenchimentos/selecao-perfil.json');
  let subPerfilMockado = require('src/app/appLN/shared/mock/preenchimentos/selecao-subperfil.json');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LigacaoNovaService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    documentosService = TestBed.inject(DocumentosService) as jasmine.SpyObj<DocumentosService>;

    service = TestBed.inject(LigacaoNovaService);
  });

  it(`Deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
    expect(service).toBeTruthy();
  });

  // set setDadosDaLigacao
  it(`#${LigacaoNovaService.prototype.setDadosDaLigacao} deve setar .dadosDaLigacao. em _dadosDaLigacaoService, quando chamado`, () => {
    let dadosDaLigacao = new DadosDaLigacao();
    service.setDadosDaLigacao = dadosDaLigacao;
    expect(service['_dadosDaLigacaoService'].dadosDaLigacao).toEqual(dadosDaLigacao);
  });

  // set setDadosDocumentos
  it(`#${LigacaoNovaService.prototype.setDadosDocumentos} deve setar .documentos em _documentosService, quando chamado`, () => {
    let dadosDocumentos = new DadosDocumentos();
    service.setDadosDocumentos = dadosDocumentos;
    expect(service['_documentosService'].documentos).toEqual(dadosDocumentos);
  });

  //set setFormatoDadosTitular
  it(`#${LigacaoNovaService.prototype.setFormatoDadosTitular} deve setar .dadosTitular em _documentosService, quando chamado`, () => {
    let dadosTitular = new DadosTitular(false);
    service.setFormatoDadosTitular = false;
    expect(service['_documentosService'].dadosTitular).toEqual(dadosTitular);
  });

  // get getDadosDocumentos
  it(`#${LigacaoNovaService.prototype.getDadosDocumentos} deve retornar .documentos de _documentosService, quando chamado`, () => {
    let dadosDocumentos = new DadosDocumentos();
    service.setDadosDocumentos = dadosDocumentos;
    expect(service.getDadosDocumentos).toEqual(dadosDocumentos);
  });

  // set imovelEscolhido
  it(`#${LigacaoNovaService.prototype.imovelEscolhido} deve setar _imovel, quando chamado`, () => {
    let imovel = new Imovel();
    service.imovelEscolhido = imovel;
    expect(service['_imovel']).toEqual(imovel);
  });

  // get imovelEscolhido
  it(`#${LigacaoNovaService.prototype.imovelEscolhido} deve retornar _imovel, quando chamado`, () => {
    let imovel = new Imovel();
    service.imovelEscolhido = imovel;
    expect(service['_imovel']).toEqual(imovel);
  });

  // set setPerfilEscolhido
  it(`#${LigacaoNovaService.prototype.setPerfilEscolhido} deve setar _escolhaPerfil, quando chamado`, () => {
    let perfilEscolhido = new EscolhaPerfil();
    service.setPerfilEscolhido = perfilEscolhido;
    expect(service['_escolhaPerfil']).toEqual(perfilEscolhido);
  });

  // get getPerfilEscolhido
  it(`#${LigacaoNovaService.prototype.getPerfilEscolhido} deve retornar _escolhaPerfil, quando chamado`, () => {
    let escolhaPerfil = new EscolhaPerfil();
    service.setPerfilEscolhido = escolhaPerfil;
    expect(service['_escolhaPerfil']).toEqual(escolhaPerfil);
  });

  // set setSubPerfilEscolhido
  it(`#${LigacaoNovaService.prototype.setSubPerfilEscolhido} deve setar .subPerfil em _escolhaPerfil, quando chamado`, () => {
    service.setPerfilEscolhido = perfilMockado['RESIDENCIAL'];
    let subPerfilEscolhido = new SubPerfilRural();
    service.setSubPerfilEscolhido = subPerfilEscolhido;
    expect(service['_escolhaPerfil'].subPerfil).toEqual(subPerfilEscolhido);
  });

  // get getSubPerfilEscolhido
  it(`#${LigacaoNovaService.prototype.getSubPerfilEscolhido} deve retornar .subPerfil de _escolhaPerfil, quando chamado`, () => {
    service.setPerfilEscolhido = perfilMockado['RESIDENCIAL'];
    let subPerfilRural = new SubPerfilRural();
    service.setSubPerfilEscolhido = subPerfilRural;
    expect(service['_escolhaPerfil'].subPerfil).toEqual(subPerfilRural);
  });

  // get getDadosDoBeneficiario
  it(`#${LigacaoNovaService.prototype.getDadosDoBeneficiario} deve retornar _dadosBeneficiario, quando chamado`, () => {
    let dadosTitularTarifaSocial = new DadosTitularTarifaSocial();
    service['_dadosBeneficiario'] = dadosTitularTarifaSocial;
    expect(service['_dadosBeneficiario']).toEqual(dadosTitularTarifaSocial);
  });

  // get dadosDePagamento
  it(`#${LigacaoNovaService.prototype.dadosDePagamento} deve retornar .dadosPagamento de _dadosPagamentoService, quando chamado`, () => {
    let dadosPagamento = new DadosPagamento();
    service['_dadosPagamentoService'].dadosPagamento = dadosPagamento;
    expect(service['_dadosPagamentoService'].dadosPagamento).toEqual(dadosPagamento);
  });

  // FIXME: Aprender o que realmente está acontecendo aqui. A dúvida reside no fato de o 'expectedMarble' estar "vazio".
  // idAcompanhamentoJornada
  it(`#${LigacaoNovaService.prototype.idAcompanhamentoJornada.name} deve retornar um observável via método GET em _http`, () => {
    let documento = 'mockDocumento';
    let resultadoEsperado = environmentLN.apiUrl + '/v2/cre/' + encodeURIComponent(documento) + '/jornada-ligacao-nova';
    let scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    scheduler.run(({expectObservable}) => {
      const expectedMarble = '()';
      const expectedResult = resultadoEsperado;
      expectObservable(service.idAcompanhamentoJornada(documento)).toBe(expectedMarble, expectedResult);
    });
  });

  // FIXME: Aprender o que realmente está acontecendo aqui. A dúvida reside no fato de o 'expectedMarble' estar "vazio".
  // etapaJornada
  it(`#${LigacaoNovaService.prototype.etapaJornada.name} deve retornar um observável via método POST em _http`, () => {
    let idAtendimento = 'mockId';
    let etapa = 'mockEtapa';
    let resultadoEsperado = environmentLN.apiUrl + '/v2/cre/' + encodeURIComponent(idAtendimento) + '/' + encodeURIComponent(etapa) + '/jornada-ligacao-nova';
    let scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    scheduler.run(({expectObservable}) => {
      const expectedMarble = '()';
      const expectedResult = resultadoEsperado;
      expectObservable(service.etapaJornada(idAtendimento, etapa)).toBe(expectedMarble, expectedResult);
    });
  });

  // checkCamera
  it(`#${LigacaoNovaService.prototype.checkCamera.name} deve ......, quando chamado`, () => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(null);
    service.checkCamera().then((result) => {
      expect(result).toBeNull();
    });
  });

  // stopStreamedVideo
  it(`#${LigacaoNovaService.prototype.stopStreamedVideo.name} deve ..., quando chamado`, () => {
    expect(service.stopStreamedVideo()).toHaveBeenCalled();
  });

  // enviarAnexos
  it(`#${LigacaoNovaService.prototype.enviarAnexos.name} deve ..., quando chamado`, () => {
    let fileMock = new Anexo('.pdf', 'mockName', 10, 'mockData');
    let osMock = 'osMock';
    let protocoloMock = 'protocoloMock';
    let numberoDocMock = 123;
    expect(service.enviarAnexos(fileMock, osMock, protocoloMock, numberoDocMock)).toHaveBeenCalled();
  });

  // formatDate

  // sendUE

  // sendBackOffice

  // formatarEntregaAlternativa

  // dataCerta

  // verificaPerfil

  // verificarDadosTarifaSocial

  // observacoesGerais

  // criarListaAnexosGeral

  // criarListaAnexosPerfil
});
