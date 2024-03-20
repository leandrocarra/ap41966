import { TestBed } from '@angular/core/testing';
import { DataCertaService } from './data-certa.service';
import { FluxoDoClienteDataCerta } from 'app/core/models/data-certa/data-certa';
import { environment } from '@environments/environment';
import { Distribuidora } from 'app/core/enums/distribuidoras';

describe('DataCertaService', () => {
  let service: DataCertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCertaService);
  });

  it(/*`#${DataCertaService.prototype.setFluxoDoClienteDataCerta}*/ `DataCertaService.setFluxoDataCerta deve settar a propriedade '_fluxoDoCliente' quando chamado e `+ /*#${DataCertaService.prototype.getFluxoDoClienteDataCerta}*/ `DataCertaService.getFluxoDoClienteDataCerta deve retorná-la.`, () => {
    let fluxoDoCliente: FluxoDoClienteDataCerta = '';
    service.setFluxoDoClienteDataCerta = fluxoDoCliente;
    expect(service.getFluxoDoClienteDataCerta).toBe(fluxoDoCliente);
  });

  it(/*`#${DataCertaService.prototype.setUltimaDataAlteracaoDataCerta}*/`DataCertaService.setUltimaDataAlteracaoDataCerta deve settar a propriedade '_ultimaAlteracaoDataCerta' quando chamado e ` + /*#${DataCertaService.prototype.getUltimaDataAlteracaoDataCerta}*/ `DataCertaService.getUltimaDataAlteracaoDataCerta deve retorná-la.`, () => {
    let ultimaData = new Date();
    service.setUltimaDataAlteracaoDataCerta = ultimaData;
    expect(service.getUltimaDataAlteracaoDataCerta).toBe(ultimaData);
  });
  
  it(/*`#${DataCertaService.prototype.setDataDeVencimento}*/ `DataCertaService.setDataDeVencimento deve settar a propriedade '_dataDeVencimento' quando chamado e ` + /*#${DataCertaService.prototype.getDataDeVencimento}*/ `DataCertaServicegetDataDeVencimento deve retorná-la.`, () => {
    let dataDeVencimento = new Date().toString();
    service.setDataDeVencimento = dataDeVencimento;
    expect(service.getDataDeVencimento).toBe(dataDeVencimento);
  });

  it(/*`#${DataCertaService.prototype.getPossiveisDatasAlteracao}*/ `DataCertaService.getPossiveisDatasAlteracao deve retornar uma lista de possíveis dias do mês quando a distribuidora for Elektro.`, () => {
    environment.title = Distribuidora.ELEKTRO;
    expect(environment.title).toBe(Distribuidora.ELEKTRO);
    expect(service.getPossiveisDatasAlteracao).toContain('28');
  });

  it(/*`#${DataCertaService.prototype.getPossiveisDatasAlteracao}*/ `DataCertaService.getPossiveisDatasAlteracao deve retornar uma lista de possíveis dias do mês quando a distribuidora não for Elektro.`, () => {
    environment.title = Distribuidora.COELBA;
    expect(environment.title).not.toBe(Distribuidora.ELEKTRO);
    expect(service.getPossiveisDatasAlteracao).toContain('26');
  });

  it(`#${DataCertaService.prototype.checarAlteracaoDataCerta.name} deve retornar 'true' se o período de carência de 12 meses tiver vencido.`, () => {
    let anoPassado: string = (new Date().getFullYear() - 1).toString();
    let primeiroDeJaneiro: string = '-01-01';
    let dataMockada: Date = new Date(anoPassado + primeiroDeJaneiro)
    expect(service.checarAlteracaoDataCerta(dataMockada)).toBeTrue();
  });

  // FIXME: Sujeito a falha se o dia em que o teste for realizado for primeiro de janeiro de qualquer ano! Colocar um if ternário.
  it(`#${DataCertaService.prototype.checarAlteracaoDataCerta.name} deve retornar 'false' se o período de carência de 12 meses não tiver vencido.`, () => {
    let anoAtual: string = (new Date().getFullYear()).toString();
    let primeiroDeJaneiro: string = '-01-01';
    let dataMockada: Date = new Date(anoAtual + primeiroDeJaneiro)
    expect(service.checarAlteracaoDataCerta(dataMockada)).toBeFalse();
  });

  it(`#${DataCertaService.prototype.checarAlteracaoDataCerta.name} deve retornar 'false' se o período de carência de 12 meses não tiver vencido. Caso particular: neste teste, é alcançada a branch para caso 'months' seja menor do que 0.`, () => {
    let anoAtual: string = (new Date().getFullYear()).toString();
    let primeiroDeDezembro: string = '-12-01';
    let dataMockada: Date = new Date(anoAtual + primeiroDeDezembro)
    expect(service.checarAlteracaoDataCerta(dataMockada)).toBeFalse();
  });
});
