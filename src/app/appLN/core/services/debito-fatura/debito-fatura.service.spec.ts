import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebitoFaturaService } from './debito-fatura.service';


describe(DebitoFaturaService.name, () => {
  let service: DebitoFaturaService;
  let responseListaFatura = require('src/app/appLN/shared/mock/responses/response-api-faturas-a-pagar.json');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebitoFaturaService],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(DebitoFaturaService);
  });

  it(`Deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
    expect(service).toBeTruthy();
  });



  it(`#${DebitoFaturaService.prototype.getListaFaturasImovel}
Deve setar valor em #getListaFaturaImovel, quando chamado`, () => {
    service.listaFaturasImovel = responseListaFatura;
    expect(service.getListaFaturasImovel).toEqual(responseListaFatura);
  });


  it(`#${DebitoFaturaService.prototype.setListaFaturasImovel}
Deve setar valor em #setListaFaturaImovel, quando chamado`, () => {
  let valorMockado = "listaFaturaMock"
  service.setListaFaturasImovel= valorMockado;
  expect(service.getListaFaturasImovel).toEqual(valorMockado);
});

it(`#${DebitoFaturaService.prototype.getListaFaturasCPF}
Deve retornar #faturasCPF, quando for acionado`, () => {
    service.listaFaturasCPF = true;
    expect(service.listaFaturasCPF).toBeTrue();
});

it(`#${DebitoFaturaService.prototype.setListaFaturasCPF}
Deve setar valor em #listaFaturaCpf, quando acionado`,()=>{
  let cpfMockado = '12345678900'
  service.setListaFaturasCPF = cpfMockado
  expect(service.listaFaturasCPF).toEqual(cpfMockado)
})


it(`#${DebitoFaturaService.prototype.setCodigoCliente}
Deve setar valor em #codigoCliente, quando chamado`, ()=>{
  let codMockado = '123456';
  service.setCodigoCliente = codMockado
  expect(service.codigoCliente).toEqual(codMockado)
})


  it(`#${DebitoFaturaService.prototype.getListaFaturasImovel}
  deve retornar #faturasImovel, quando for acionado`, () => {
    service.listaFaturasImovel = true;
    expect(service.listaFaturasImovel).toBeTrue();
  });

  // it(`#${DebitoFaturaService.prototype.getComprovanteDebitoValidado}
  // deve retornar #comprovanteDebitoValidado, quando for acionado`, () => {
  //   service.setComprovanteDebitoValidado = true;
  //   expect(service.listaFaturasImovel).toBeTrue();
  // });


it(`#${DebitoFaturaService.prototype.getComprovanteDebitoValidado}
Deve setar valor em #listaFaturaCpf, quando acionado`,()=>{
  let debito = true
  service.setComprovanteDebitoValidado = debito
  expect(service.getComprovanteDebitoValidado).toBeTrue()
})


});
