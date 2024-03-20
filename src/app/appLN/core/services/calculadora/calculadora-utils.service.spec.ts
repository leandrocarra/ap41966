import { TestBed } from '@angular/core/testing';
import { CalculadoraUtilsService } from './calculadora-utils.service';


describe(CalculadoraUtilsService.name, () => {
  let service: CalculadoraUtilsService;

  let equipamentoArCondicionadoMockado = require('../../../shared/mock/preenchimentos/calculadora-equipamento-ar-condicionado.json');
  let potenciasArCondicionadoMockado = require('../../../shared/mock/preenchimentos/calculadora-potencia-ar-condicionado.json');

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculadoraUtilsService);
  });

  it(`${CalculadoraUtilsService.name} deve ser criado quando chamado`, () => {
    expect(service).toBeTruthy();
  });


  it(`#${CalculadoraUtilsService.prototype.getPotencias.name}
  deve retornar potencias do ar condicionado quando equipamento selecionado`, () => {
    expect(service.getPotencias('AR-CONDICIONADO')).toEqual(potenciasArCondicionadoMockado);
  });

  it(`#${CalculadoraUtilsService.prototype.calcular.name}
  deve calcular retornar 2160Kwh quando adicionar ar-condicionado`, () => {
    service.calcular(equipamentoArCondicionadoMockado).then((resolve) => {
      expect(resolve).toEqual(2160);
    });
  });


  it(`#${CalculadoraUtilsService.prototype.getCategoria.name}
  deve retornar categoria monofásica quando passado 8000Kwh`, () => {
    service.getCategoria(8000).then((result) => {
      expect(result).toEqual('MONOFÁSICA');
    });
  });

  it(`#${CalculadoraUtilsService.prototype.getCategoria.name}
  deve retornar categoria bifásica quando passado 16000Kwh`, () => {
    service.getCategoria(16000).then((result) => {
      expect(result).toEqual('BIFÁSICA');
    });
  });

  it(`#${CalculadoraUtilsService.prototype.getCategoria.name}
  deve retornar categoria trifásica quando passado 2000Kwh`, () => {
    service.getCategoria(22000).then((result) => {
      expect(result).toEqual('TRIFÁSICA');
    });
  });


  it(`#${CalculadoraUtilsService.prototype.getDadosApt.name}
  deve retornar objeto monofásica quando passar 'MONOFÁSICA' por parâmetro`, () => {
    let aptoMonofasico = {
      categoria: 'MONOFÁSICA',
      equipamentos: {
        "codigoAparelho": "1",
        "codigoSubTipoAparelho": "39",
        "codigoTipoAparelho": "1",
        "descricaoSubTipoAparelho": "CARGA PADRÃO MONOFÁSICA",
        "quantidadeAparelho": "1"
      },
      potencia: '10000'
    }

    expect(service.getDadosApt('MONOFÁSICA')).toEqual(aptoMonofasico);
  })

});
