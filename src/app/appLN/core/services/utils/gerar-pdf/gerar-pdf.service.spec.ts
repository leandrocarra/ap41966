import { HttpClientModule } from '@angular/common/http';
import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Anexo } from '../../../models/anexo/anexo';
import { Propriedade, ProxPropriedade } from '../../../models/dados-da-ligacao/dados-da-ligacao';
import { GerarPdfService } from './gerar-pdf.service';


describe(GerarPdfService.name, () => {
  let service: GerarPdfService;
  let enderecoMockado = require('src/app/appLN/shared/mock/responses/response-dados-do-imovel.json');
  let sessionUserCPFMockado = require('src/app/appLN/shared/mock/responses/response-session-user-cpf.json');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GerarPdfService],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(GerarPdfService);
  });

  it(`#${GerarPdfService.name}
  deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${GerarPdfService.prototype.criaAnexoContrato.name}
  deve criar o pdf do contrato`, async function () {
    // const data = await fetch('assets/assetsLN/docs/Contrato.pdf');
    service['_documentosService'].dadosTitular.nome = 'Homer Simpson';
    service['_documentosService'].dadosTitular.rg = '111111111';
    service['_documentosService'].dadosTitular.cpf = '11111111111';
    service['_dadosDoImovelService'].setEndereco = enderecoMockado;
    let componentSpy = spyOn(service['_downloadUtilService'], 'download');
    await service.criaAnexoContrato(); //add await para teste de método que possui async antes da sua declaração
    // tick();
    expect(componentSpy).toHaveBeenCalled();
  });

  it(`#${GerarPdfService.prototype.criaAnexoChecklist.name}
  deve criar o pdf que contém as informações do checklist rural`, async function () {
    let propriedadeMock = new Propriedade();
    service['_dadosDaLigacaoService'].dadosDaLigacao.questionarioRural.propriedade = propriedadeMock;
    let proxPropriedadeMock = new ProxPropriedade();
    service['_dadosDaLigacaoService'].dadosDaLigacao.questionarioRural.proxPropriedade = proxPropriedadeMock;
    service['_dadosDaLigacaoService'].setDesmembrado = 'sim';
    // tick();
    // expect(service.criaAnexoChecklist()).toEqual(new Anexo('.pdf', 'checklistrural', 0, '64'));
    expect(await service.criaAnexoChecklist()).not.toBeNull(); //add await para teste de método que possui async antes da sua declaração
  });

  it(`#${GerarPdfService.prototype.criaAnexoTarifa.name}
  deve crirar o pdf que contém as informações da tarifa social que o solicitante não é o titular do benefício`, async function () {

    //set dados benefício
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.beneficio = 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA';
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.titular = false;

    //set dados titular benefício
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.nomeCompleto = 'Homer Simpson';
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.dadosBeneficio.nb = '1234';
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.dadosBeneficio.codigoFamiliar = '';
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.dtNascimento = '01/01/2020';
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.cpf = '1111111111';
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.rg = '1111111111';
    service['_dadosDoImovelService'].setEndereco = enderecoMockado;
    service['_tarifaSocialService'].setTarifaSocialValidada = false;
    expect(await service.criaAnexoTarifa()).not.toBeNull(); //add await para teste de método que possui async antes da sua declaração
  });

  it(`#${GerarPdfService.prototype.criaAnexoTarifa.name}
  deve crirar o pdf que contém as informações da tarifa social que o solicitante é o titular do benefício`, async function () {

    //set dados benefício
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.beneficio = 'ASSISTÊNCIA MÉDICA DOMICILIAR';
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.titular = true;

    //set dados titular benefício
    service['_userService'].sessionUser = sessionUserCPFMockado;
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.dadosBeneficio.nb = '1234';
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.dadosBeneficio.codigoFamiliar = '56789';
    service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.dadosBeneficio.nis = '1234';
    service['_documentosService'].dadosTitular.dataNascimento = '01/01/2020';
    service['_documentosService'].dadosTitular.cpf = '1111111111';
    service['_documentosService'].dadosTitular.rg = '1111111111';
    service['_dadosDoImovelService'].setEndereco = enderecoMockado;
    service['_tarifaSocialService'].setTarifaSocialValidada = true;
    expect(await service.criaAnexoTarifa()).not.toBeNull(); //add await para teste de método que possui async antes da sua declaração
  });

});
