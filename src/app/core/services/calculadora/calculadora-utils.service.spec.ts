import { TestBed } from '@angular/core/testing';

import { CalculadoraUtilsService } from './calculadora-utils.service';

describe('CalculadoraUtilsService', () => {
  let service: CalculadoraUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculadoraUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar o combo residencial', () => {
    let respostaEsperada = {
      combo: "0",
      nome: 'RESIDENCIAL I',
      categoria: 'MONOFÁSICA',
      potencia: 10000,
      equipamentos: [
        {
          "codigoAparelho": "1",
          "codigoSubTipoAparelho": "39",
          "codigoTipoAparelho": "1",
          "descricaoSubTipoAparelho": "CARGA PADRÃO MONOFÁSICA",
          "quantidadeAparelho": "1"
        }
      ]
    }

    expect(service.getcombo(0)).toEqual(respostaEsperada)
  });


  it('deve enviar potencia 25000kwh e retornar tipoDisjuntor 63', () => {
    expect(service.getTipoDisjuntor(25000)).toEqual('63');
  });

  it('deve enviar potencia maior 25000kwh e menor que 38100 e retornar tipoDisjuntor 100', () => {
    expect(service.getTipoDisjuntor(30000)).toEqual('100');
  });

  it('deve enviar potencia maior 38100kwh e menor que 54100 e retornar tipoDisjuntor 150', () => {
    expect(service.getTipoDisjuntor(50000)).toEqual('150');
  });

  it('deve enviar potencia maior 54100 e retornar tipoDisjuntor 200', () => {
    expect(service.getTipoDisjuntor(55000)).toEqual('200');
  });

  it('deve calcular a potencia com 1 equipamento', () => {
    let equipamento = {
      "class": "ar-condicionado",
      "nome": "",
      "equipamento": "AR-CONDICIONADO",
      "potencia": 900,
      "quantidade": 1,
      "potenciaReal": "7500BTU",
      "objeto": {
        "codigoAparelho": "1",
        "codigoSubTipoAparelho": "25",
        "codigoTipoAparelho": "1",
        "descricaoSubTipoAparelho": "AR CONDICIONADO 7.500 BTU",
        "quantidadeAparelho": 1
      }
    }

    service.calcular(equipamento).then((resolve) => {
      expect(resolve).toEqual(2160);
    });

  });

  it('deve calcular a potencia com 2 equipamentos', () => {
    let ar_condicionado = {
      "class": "ar-condicionado",
      "nome": "",
      "equipamento": "AR-CONDICIONADO",
      "potencia": 900,
      "quantidade": 1,
      "potenciaReal": "7500BTU",
      "objeto": {
        "codigoAparelho": "1",
        "codigoSubTipoAparelho": "25",
        "codigoTipoAparelho": "1",
        "descricaoSubTipoAparelho": "AR CONDICIONADO 7.500 BTU",
        "quantidadeAparelho": 1
      }
    }

    let aquecedor = {
      "class": "aquecedor",
      "nome": "",
      "equipamento": "AQUECEDOR CENTRAL",
      "potencia": 3000,
      "quantidade": 1,
      "potenciaReal": "3000W",
      "objeto": {
        "codigoAparelho": "1",
        "codigoSubTipoAparelho": "20",
        "codigoTipoAparelho": "1",
        "descricaoSubTipoAparelho": "AQUECEDOR CENTRAL 3000 W (BOILER)",
        "quantidadeAparelho": 1
      }
    }

    let equipamentos = [ar_condicionado, aquecedor]

    service.calcular(equipamentos).then((resolve) => {
      expect(resolve).toEqual(6060);
    });
  });


  it('deve retornar categoria monofásia', () => {
    service.getCategoria(8000).then((result) => {
      expect(result).toEqual('MONOFÁSICA');
    });
  });

  it('deve retornar categoria bifásica', () => {
    service.getCategoria(16000).then((result) => {
      expect(result).toEqual('BIFÁSICA');
    });
  });

  it('deve retornar categoria trifásica', () => {
    service.getCategoria(22000).then((result) => {
      expect(result).toEqual('TRIFÁSICA');
    });
  });

});
