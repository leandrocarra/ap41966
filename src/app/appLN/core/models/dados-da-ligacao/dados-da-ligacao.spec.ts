import { Anexo } from '../anexo/anexo';
import { DadosDaLigacao, DimensionamentoDeRede, Equipamento, QuestionarioRural } from './dados-da-ligacao';

describe(DadosDaLigacao.name, () => {

  let comboUm = require('../../../shared/mock/preenchimentos/calculadora-combo-residencial.json');

  let equipamentoMockado: Array<Equipamento> = require('../../../shared/mock/preenchimentos/calculadora-potencia-ar-condicionado.json');

  it('should create an instance', () => {
    expect(new DadosDaLigacao()).toBeTruthy();
  });


  it(`DadosDaLigacao deve incializar com valores preenchidos`, () => {
    let dimensionamentoDeRede = new DimensionamentoDeRede('SIM', 'SIM', 'SIM');
    let dados = new DadosDaLigacao();
    dados.salaComercial = true;
    dados.dimensionamentoDeRede = new DimensionamentoDeRede('SIM', 'SIM', 'SIM');
    dados.art = [new Anexo('', '', 0, '')];
    dados.combo = comboUm;
    dados.categoria = "BIFÁSICA";
    dados.distanciaPoste = "sim";
    dados.questionarioRural = new QuestionarioRural();
    dados.desejaIsencaoICMS = true;

    expect(new DadosDaLigacao(dados)).toBeTruthy();
  });

  it(`DadosDaLigacao deve incializar com valores preenchidos e o dimensionamentoDaRede null`, () => {
    expect(new DadosDaLigacao(null)).toBeTruthy();
  });


  it(`Deve criar model de Equipamento quando chamado`, () => {
    expect(new Equipamento(
      equipamentoMockado[0].key,
      equipamentoMockado[0].value,
      equipamentoMockado[0].codigoSubTipoAparelho,
      equipamentoMockado[0].codigoTipoAparelho,
      equipamentoMockado[0].descricaoSubTipoAparelho,
    )).toBeTruthy();
  })
});
