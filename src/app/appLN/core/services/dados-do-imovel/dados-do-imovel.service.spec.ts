import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environmentLN } from '../../../../../environments/environmentsLN/environment';
import { DadosDoImovelService } from './dados-do-imovel.service';


describe(DadosDoImovelService.name, () => {

  let service: DadosDoImovelService;
  let enderecoMockado = require('src/app/appLN/shared/mock/responses/response-dados-do-imovel.json');
  let responseIPTUMockado = require('src/app/appLN/shared/mock/responses/response-ocr-iptu.json');
  let responseINCRAMockado = require('src/app/appLN/shared/mock/responses/response-ocr-incra.json');
  let sessionUserCPFMockado = require('src/app/appLN/shared/mock/responses/response-session-user-cpf.json');
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [DadosDoImovelService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(DadosDoImovelService);
  });

  it(`Deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${DadosDoImovelService.prototype.setPadraoPronto}
   Deve setar padraoPronto em dados do imóvel quando atribuido true`, () => {
    {
      service.setPadraoPronto = true
      expect(service.getPadraoPronto).toBeTrue();
    }
  });

  it(`#${DadosDoImovelService.prototype.setRuaSemCep}
   Deve setar ruaSemCep em dados do imóvel quando atribuido booleano`, () => {
    {
      service.setRuaSemCep = true
      expect(service.getRuaSemCep).toBeTrue();
    }
  });

  it(`#${DadosDoImovelService.prototype.setCepEncontrado}
  deve setar cepEncontrado quando passado false como parâmetro`, () => {
    service.setCepEncontrado = false
    expect(service.getCepEncontrado).toBeFalse();
  });

  it(`#${DadosDoImovelService.prototype.validarEnderecoIPTU.name}
  deve validar o endereço com o doc IPTU com os dados invalidos`, () => {
    service['_userService'].sessionUser = sessionUserCPFMockado;
    service.setEndereco = enderecoMockado['URBANO'];
    expect(service.validarEnderecoIPTU(responseIPTUMockado['INVALIDO'].result[0])).toBeFalse();
  });

  it(`#${DadosDoImovelService.prototype.validarEnderecoIPTU.name}
  deve validar o endereço com o doc IPTU com os dados válidos`, () => {
    service['_userService'].sessionUser = sessionUserCPFMockado;
    service.setEndereco = enderecoMockado['URBANO'];
    expect(service.validarEnderecoIPTU(responseIPTUMockado['VALIDO'].result[0])).toBeTrue();
  });

  it(`#${DadosDoImovelService.prototype.validacaoINCRA.name}
  deve validar o endereço com o doc INCRA com os dados invalidados`, () => {
    service['_userService'].sessionUser = sessionUserCPFMockado;
    service.setEndereco = enderecoMockado['URBANO'];
    expect(service.validacaoINCRA(responseINCRAMockado['INVALIDO'].result[0])).toBeFalse();
  });

  it(`#${DadosDoImovelService.prototype.validacaoINCRA.name}
  deve validar o endereço com o doc INCRA com os dados válidos`, () => {
    service['_userService'].sessionUser = sessionUserCPFMockado;
    service.setEndereco = enderecoMockado['URBANO'];
    expect(service.validacaoINCRA(responseINCRAMockado['VALIDO'].result[0])).toBeTrue();
  });


  // it(`#${DadosDoImovelService.prototype.cepAberto.name}deve validar....quando acionado`, () => {
  //   let expectUrl = `${environment.apiUrl}/v2/apoio/$pedidos?protocolo=${service.cepAberto}&usuarioUE=${service.USUARIO_UE}`;
  //   if (!environment.production) {
  //     service.cepAberto('cep').subscribe({
  //       next: value => {
  //         expect(value.length).toEqual(10)
  //       }
  //     });
  //     const request = httpMock.expectOne(expectUrl);
  //     expect(request.request.method).toBe('GET');
  //   }
  // });





  // it(`deve setar Endereco no #${DadosDoImovelService.prototype.setEndereco} e
  //  retornar valor pelo #${DadosDoImovelService.prototype.getCepEncontrado} quando chamado`, () => {
  //   service.setEndereco = enderecoMockado.URBANO;
  //   expect(service.getCepEncontrado).toBeTrue();
  // })

  // it(`deve setar Endereco no #setDebitos e
  //  retornar valor pelo #getDebitos quando chamado`, () => {
  //   service.setDebitos = true;
  //   expect(service.getDebitos).toBeTrue();
  // })

  // it(`#${DadosDoImovelService.prototype.getCepEncontrado}
  // deve retornar cepEncontrado true quando passado true como
  // parâmetro para setCepEncontrado`, () => {
  //   service.setCepEncontrado = true;
  //   expect(service.getCepEncontrado).toBeTrue();
  // });

  // it(`#${DadosDoImovelService.prototype.setDebitos}
  // deve setar cepEncontrado quando passado false como parâmetro`, () => {
  //   service.setCepEncontrado = false
  //   expect(service['_debitos']).toBeFalse();
  // });
  // it(`#${DadosDoImovelService.prototype.setDadosDoImovel}
  // deve setar dadosDoImovel, quando acionado`, () => {
  //   service.setDadosDoImovel = null
  //   expect(service['_debitos']).toBeFalse();
  // });

  it(`#${DadosDoImovelService.prototype.getDebitos}
  deve retornar debitos, quando for true`, () => {
    service.setDebitos = true;
    expect(service.getDebitos).toBeTrue();
  });


  // it(`#${DadosDoImovelService.prototype.getEnderecoAnexos}
  // deve retornar #faturasImovel, quando for acionado`, () => {
  //   let enderecoMockado = true
  //   service.setEnderecoAnexos = enderecoMockado;
  //   expect(service.getEnderecoAnexos).toEqual(enderecoMockado);
  // });


  // it(`#${DadosDoImovelService.prototype.getEnderecoAnexos.name}
  //   deve retornar protocolo quando acionado`, () => {
  //       service.getEnderecoAnexos().then(valor => {
  //       expect(valor).toBe(service.getEnderecoAnexos);
  //       })
  //   });


  // it(`#${DadosDoImovelService.prototype.getDebitosAnexos}`, ()=>{
  //   service.setDebitosAnexos = enderecoMockado.DEBITO;
  //   expect(service.getDebitosAnexos).toBe(enderecoMockado.DEBITO);
  // })

  it(`#${DadosDoImovelService.prototype.setMultipleUESelection}
  deve setar MultipleUESelection, quando acionado`, () => {
    service.setMultipleUESelection = false
    expect(service.getMultipleUESelection).toBeFalse();
  });

  // it(`#${DadosDoImovelService.prototype.setDebitos}
  // deve setar debitos, quando acionado`, () => {
  //   service.setDebitos = false
  //   expect(service['_debitos']).toBeFalse();
  // });
});
