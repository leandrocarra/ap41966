import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { Canal } from 'app/core/models/canais/enums/canais';
import { UserUcsResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto';
import { of } from 'rxjs';
import { TokenService } from '../token/token.service';
import { SelecaoImovelService } from './selecao-de-imovel.service';

describe(SelecaoImovelService.name, () => {
  let service: SelecaoImovelService;
  let httpTestingController: HttpTestingController
  let minhaContaMock = require('../../../shared/mock/responses/minha-conta.json');
  let ucsImoveisMockado = require('../../../shared/mock/responses/response-api-imoveis.json');
  let ucDetalhesMockado = require('../../../shared/mock/responses/response-api-detalhes-uc.json');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SelecaoImovelService,
        TokenService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(SelecaoImovelService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  it(`Deve criar instância de ${SelecaoImovelService.name} quando chamado`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${SelecaoImovelService.prototype.updateUcSelecionada.name}
  deve atualizar qual UC foi selecionada quando chamado`, () => {
    let ucSelecionadaSpy = spyOn(service['stageUcSelecionada'], 'next');
    service.updateUcSelecionada(null);
    expect(ucSelecionadaSpy).toHaveBeenCalledOnceWith(null);
  });

  it(`#${SelecaoImovelService.prototype.consultarImoveis.name}
  deve retornar o endpoint contendo informações do usuário quando o canal for AGE`, fakeAsync(() => {
    environment.regiao = Regiao.SE;
    environment.canal = Canal.AGE;
    let documento = '1233';
    let usuarioUe = 'TESTE0001';
    service['_user'].USUARIO_UE = usuarioUe;
    let urlEsperada = `${environment.endpoints.selecaoImovel}clientes/${documento}/ucs?canalSolicitante=${environment.canal}&usuario=${usuarioUe}`;

    service.consultarImoveis(documento).subscribe({
        next: value => {
            expect(value).toEqual(minhaContaMock['19935193861']);
        },
        error: fail
    });

    const requisicao = httpTestingController.expectOne(urlEsperada);
    expect(requisicao.request.method).toEqual('GET');
    requisicao.flush(minhaContaMock['19935193861']);
  }));

  it(`#${SelecaoImovelService.prototype.consultarImoveis.name}
  deve retornar o endpoint contendo informações do usuário quando o canal não for AGE e não houver parâmetro de pesquisa`, fakeAsync(() => {
    environment.regiao = Regiao.NE;
    environment.canal = Canal.AGP;
    let documento = '1233';
    let usuarioUe = 'UCSCOMM';
    let protocolo = '123';
    service['_user'].USUARIO_UE = usuarioUe;
    let urlEsperada = `${environment.endpoints.selecaoImovel}clientes/${documento}/ucs?canalSolicitante=${environment.canal}&usuario=${usuarioUe}&protocolo=${protocolo}`;

    service.consultarImoveis(documento).subscribe({
        next: value => {
            expect(value).toEqual(minhaContaMock['19935193861']);
        },
        error: fail
    });

    const requisicao = httpTestingController.expectOne(urlEsperada);
    expect(requisicao.request.method).toEqual('GET');
    requisicao.flush(minhaContaMock['19935193861']);
  }));

  it(`#${SelecaoImovelService.prototype.consultarImoveis.name}
  deve retornar o endpoint contendo informações do usuário quando o canal não for AGE e houver parâmetro de pesquisa`, fakeAsync(() => {
    environment.regiao = Regiao.NE;
    environment.canal = Canal.AGP;
    let documento = '1233';
    let usuarioUe = 'UCSCOMM';
    let protocolo = '123';
    let pesquisa = '000022044010';
    service['_user'].USUARIO_UE = usuarioUe;
    let urlEsperada = `${environment.endpoints.selecaoImovel}clientes/${documento}/ucs?canalSolicitante=${environment.canal}&usuario=${usuarioUe}&protocolo=${protocolo}&codigo=${pesquisa}`;

    service.consultarImoveis(documento, pesquisa).subscribe({
        next: value => {
            expect(value).toEqual(minhaContaMock['19935193861']);
        },
        error: fail
    });

    const requisicao = httpTestingController.expectOne(urlEsperada);
    expect(requisicao.request.method).toEqual('GET');
    requisicao.flush(minhaContaMock['19935193861']);
  }));

  it(`#${SelecaoImovelService.prototype.receberInformacoesUCSelecionada.name}
  deve retornar o endpoint contendo informações da UC selecionada quando o canal for AGE`, fakeAsync(() => {
    environment.regiao = Regiao.SE;
    environment.canal = Canal.AGE;
    let usuarioUe = 'TESTE0001';
    let codigo: string = '000000469084';
    let opcaoSSOS: string = 'N';
    let protocolo = '123';
    service['_user'].USUARIO_UE = usuarioUe;
    let urlEsperada: string = `${environment.endpoints.selecaoImovel}ucs/${codigo}?&opcaoSSOS=${opcaoSSOS}&usuario=${usuarioUe}&canalSolicitante=${environment.canal}&protocoloSonda=${protocolo}`;

    service.receberInformacoesUCSelecionada(codigo).subscribe({
        next: value => {
            expect(value).toEqual(ucsImoveisMockado['ATUAL'].ucs[0]);
        },
        error: fail
    });

    const requisicao = httpTestingController.expectOne(urlEsperada);
    expect(requisicao.request.method).toEqual('GET');
    requisicao.flush(ucsImoveisMockado['ATUAL'].ucs[0]);
  }));

  it(`#${SelecaoImovelService.prototype.receberInformacoesUCSelecionada.name}
  deve retornar o endpoint contendo informações da UC selecionada quando o canal não for AGE`, fakeAsync(() => {
    environment.regiao = Regiao.NE;
    environment.canal = Canal.AGP;
    let codigo: string = '000000469084';
    let usuarioUe = 'UCSCOMM';
    let protocolo = '123';
    service['_user'].USUARIO_UE = usuarioUe;
    let urlEsperada: string = `${environment.endpoints.selecaoImovel}ucs/${codigo}?canalSolicitante=${environment.canal}&usuario=${usuarioUe}&protocolo=${protocolo}`;

    service.receberInformacoesUCSelecionada(codigo).subscribe({
        next: value => {
            expect(value).toEqual(ucsImoveisMockado['ATUAL'].ucs[0]);
        },
        error: fail
    });

    const requisicao = httpTestingController.expectOne(urlEsperada);
    expect(requisicao.request.method).toEqual('GET');
    requisicao.flush(ucsImoveisMockado['ATUAL'].ucs[0]);
  }));

  it(`#${SelecaoImovelService.prototype.getMeusImoveis.name}
  deve retornar os dados da session storage, quando nela houver dados e sua última atualização tiver ocorrido em menos de 5 minutos`, fakeAsync (() => {
    service.setMeusImoveis = ucsImoveisMockado['ATUAL'];
    service.getMeusImoveis().then((valor) => {
      expect(valor).toEqual(ucsImoveisMockado['ATUAL']);
    });
  }));

  it(`#${SelecaoImovelService.prototype.getMeusImoveis.name}
  deve retornar objeto contendo array com até 50 ucs quando, no fluxo NE, não houver dados na session storage ou sua última atualização tiver ocorrido há mais de 5 minutos`, fakeAsync (() => {
    environment.regiao = Regiao.NE;
    service.storage.ultimaAtualizacaoUcs = new Date(2000, 10, 6);
    service.getMeusImoveis().then((valor) => {
      expect(valor.ucs.length).toBeLessThanOrEqual(50);
    });

    //TODO: CONFERIR TESTE APÓS INTEGRAÇÃO
  }));

  it(`#${SelecaoImovelService.prototype.getMeusImoveis.name}
  deve retornar objeto contendo array com uma ou mais ucs quando, no fluxo SE, não houver dados na session storage ou sua última atualização tiver ocorrido há mais de 5 minutos`, fakeAsync (() => {
    environment.canal = Canal.AGE;
    environment.regiao = Regiao.SE;
    service['_user'].dadosUser.documento = '1233';
    service['_user'].USUARIO_UE = 'TESTE0001';
    service.storage.ultimaAtualizacaoUcs = new Date(2000, 10, 6);
    spyOn(service, 'consultarImoveis').and.returnValue(of(ucsImoveisMockado['ATUAL']));
    service.getMeusImoveis().then((valor) => {
      expect(valor.ucs.length).toBeGreaterThan(0);
      httpTestingController.verify({ ignoreCancelled: true });
    });
  }));

  it(`#getUCSelecionada deve retornar a UC selecionada quandohouver dados de UC na session storage`, () => {
    service.setUCSelecionada = ucsImoveisMockado['ATUAL'].ucs[0];
    expect(service.getUCSelecionada).toEqual(ucsImoveisMockado['ATUAL'].ucs[0]);
  });

  it(`#getUCSelecionada deve retornar 'null' quando não houver dados de UC selecionada na session storage`, () => {
    service.storage.ucSelecionada = '';
    expect(service.getUCSelecionada).toBeNull();
  });
  
  it(`#${SelecaoImovelService.prototype.temInformacoesUCSelecionada.name}
  deve retornar objeto contendo informações da UC quando houver dados na session storage e sua última atualização tiver ocorrido há menos de 5 minutos`, fakeAsync (() => {
    service.storage.informacoesUCSelecionada = JSON.stringify(ucDetalhesMockado['MOCK']);
    service.storage.ultimaAtualizacaoUcs = new Date();
    service.temInformacoesUCSelecionada('').then((valor) => {
      expect(valor).toBeDefined();
    });
  }));

  it(`#${SelecaoImovelService.prototype.temInformacoesUCSelecionada.name}
  deve retornar objeto contendo informações da UC quando não houver dados na session storage ou sua última atualização tiver ocorrido há mais de 5 minutos`, fakeAsync (() => {
    service.storage.ultimaAtualizacaoUcs = new Date(2000, 10, 6);
    spyOn(service, 'receberInformacoesUCSelecionada').and.returnValue(of(ucDetalhesMockado['MOCK']));
    service.temInformacoesUCSelecionada('').then((valor) => {
      expect(valor).toEqual(ucDetalhesMockado['MOCK']);
    });
  }));

  //TODO: implementar aqui o teste de error para o 'temInformacoesUCSelecionada'.

  it(`#getGrupoDoUsuario deve retornar o grupo do usuário definido pelo #setGrupoDoUsuario quando chamado`, () => {
    service.setGrupoDoUsuario = 'B';
    expect(service.getGrupoDoUsuario).toEqual('B');
  });

  it(`#getEnderecoCompleto deve retornar o endereço da UC quando chamado`,() => {
    service.setUCSelecionada = ucsImoveisMockado['ATUAL'].ucs[0];
    let expectedResult = `${ucsImoveisMockado['ATUAL'].ucs[0].local.endereco}, ${ucsImoveisMockado['ATUAL'].ucs[0].local.bairro}, ${ucsImoveisMockado['ATUAL'].ucs[0].local.municipio}, ${ucsImoveisMockado['ATUAL'].ucs[0].local.uf}, ${ucsImoveisMockado['ATUAL'].ucs[0].local.cep}`;
    expect(service.getEnderecoCompleto).toEqual(expectedResult);
  });

  it(`#getEnderecoCompleto deve retornar um endereço vazio quando não houver UC selecionada`,() => {
    service.setUCSelecionada = null;
    let expectedResult = 'undefined, undefined, undefined, undefined, undefined';
    expect(service.getEnderecoCompleto).toEqual(expectedResult);
  });

  it(`#${SelecaoImovelService.prototype.clearStorage.name}
  deve limpar localStorage e sessionStorage quando chamado`, () => {
    let localStorageSpy = spyOn(localStorage, 'clear');
    let sessionStorageSpy = spyOn(sessionStorage, 'clear');
    service.clearStorage();
    expect(localStorageSpy).toHaveBeenCalled();
    expect(sessionStorageSpy).toHaveBeenCalled();
  });

  it(`#${SelecaoImovelService.prototype.requisitarPesquisaNaBaseDeDados.name}
  deve retornar um array com uma única UC quando chamado`, fakeAsync (() => {
    let expectedResult = new UserUcsResponseDTO(
      [
        {
          'bOptante': false,
          'grupoTensao': 'B',
          'isGrupo': false,
          'uc': '999999999999',
          'status': 'LIGADA',
          'local': {
            'endereco': 'RUA TESTE DE BUSCA DA UC',
            'bairro': 'BAIRRO TESTE',
            'municipio': 'MUNICIPIO TESTE',
            'cep': '99999-999',
            'uf': 'TS'
          },
          'ucColetiva': '', 
          'indCCColetiva': '',
          'contrato': '',
          'dtInicio': '',
          'dtFim': '',
          'instalacao': '',
          'nomeCliente': '',
          'nomeGrupo': '',
          'contaColetivaPrincipal': false
        }
      ]
    );
    spyOn(service, 'consultarImoveis').and.returnValue(of(expectedResult));
    service.requisitarPesquisaNaBaseDeDados('').then((valor) => {
      expect(valor).toEqual(expectedResult);
    });
  }));

  // it(`#${SelecaoImovelService.prototype.requisitarPesquisaNaBaseDeDados.name}
  // deve retornar um array vazio quando chamado e #${SelecaoImovelService.prototype.consultarImoveis.name} retornar erro`, fakeAsync (() => {
  //   spyOn(service, 'consultarImoveis').and.throwError('Erro Mock para TU');
  //   service.requisitarPesquisaNaBaseDeDados('').then((valor) => {
  //     expect(valor).toEqual({ 'ucs': [] });
  //   });
  // }));
});