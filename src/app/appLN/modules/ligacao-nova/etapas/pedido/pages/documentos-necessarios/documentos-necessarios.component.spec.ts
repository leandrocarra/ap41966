import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { DocumentosNecessariosComponent } from './documentos-necessarios.component';


describe(DocumentosNecessariosComponent.name, () => {
  let component: DocumentosNecessariosComponent;
  let fixture: ComponentFixture<DocumentosNecessariosComponent>;
  let location: Location;
  let router: Router;

  let dadosDoImovelService: jasmine.SpyObj<DadosDoImovelService>;
  let ligacaoNovaService: jasmine.SpyObj<LigacaoNovaService>;

  let perfilMockado = require('src/app/appLN/shared/mock/preenchimentos/selecao-perfil.json');
  let subPerfilMockado = require('src/app/appLN/shared/mock/preenchimentos/selecao-subperfil.json');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentosNecessariosComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    dadosDoImovelService = TestBed.inject(DadosDoImovelService) as jasmine.SpyObj<DadosDoImovelService>;
    ligacaoNovaService = TestBed.inject(LigacaoNovaService) as jasmine.SpyObj<LigacaoNovaService>;

    fixture = TestBed.createComponent(DocumentosNecessariosComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('Deve criar o componente quando iniciado o ciclo de vida do Angular', () => {;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('Deve definir o perfil escolhido quando iniciado o ciclo de vida do componente.', () => {
    ligacaoNovaService.setPerfilEscolhido = perfilMockado['RESIDENCIAL'];
    fixture = TestBed.createComponent(DocumentosNecessariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.perfil).toEqual(perfilMockado['RESIDENCIAL'].perfil);
  });

  it('Deve seguir com a execução da função quando houver falha na definição do perfil escolhido.', () => {
    ligacaoNovaService.setPerfilEscolhido = null;
    fixture = TestBed.createComponent(DocumentosNecessariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.perfil).toBeUndefined();
  });

  it(`O #${DocumentosNecessariosComponent.prototype.recebeValoresDoService.name} deve receber valor do #${DocumentosNecessariosComponent.prototype.documentosNecessariosResidencial.name} quando for perfil RESIDENCIAL`, () => {
    component.perfil = "RESIDENCIAL"
    fixture.detectChanges();
    component.recebeValoresDoService();
    expect(component.documentosNecessarios).toEqual(component.documentosNecessariosResidencial());
  });

  it(`O #${DocumentosNecessariosComponent.prototype.recebeValoresDoService.name} deve receber #${DocumentosNecessariosComponent.prototype.documentosNecessariosComercialIndustrial.name} quando o perfil for COMERCIAL ou INDUSTRIAL`, () => {
    component.perfil = "COMERCIAL"
    fixture.detectChanges();
    component.recebeValoresDoService();
    expect(component.documentosNecessarios).toEqual(component.documentosNecessariosComercialIndustrial())
  });

  it(`O #${DocumentosNecessariosComponent.prototype.recebeValoresDoService.name} deve chamar #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCPF.name} quando tipoDocumento for CPF e perfil RURAL`, fakeAsync(() => {
    fixture.detectChanges();
    component.perfil = "BENEFÍCIO RURAL";
    component.tipoDocumento = "CPF"
    let subPerfil = subPerfilMockado['AGROPECUARIA_RURAL'];
    spyOnProperty(component['_ligacaoNovaService'], 'getSubPerfilEscolhido', 'get').and.returnValue(subPerfil);
    let docsNecessariosSpy = spyOn(component, 'documentosNecessariosRuralCPF');

    component.recebeValoresDoService();
    expect(docsNecessariosSpy).toHaveBeenCalled();

  }));

  it(`O #${DocumentosNecessariosComponent.prototype.recebeValoresDoService.name} deve chamar o #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCNPJ.name} quando tipoDocumento for CNPJ e perfil RURAL`, () => {
    fixture.detectChanges();
    component.perfil = "BENEFÍCIO RURAL";
    component.tipoDocumento = "CNPJ"
    let subPerfil = {
      label: 'AGROPECUÁRIA RURAL',
      route: 'agropecuaria-rural',
      textoTooltip: 'Localizada na área rural, onde seja desenvolvida atividade relativa à agropecuária.',
      disabled: false
    };
    spyOnProperty(component['_ligacaoNovaService'], 'getSubPerfilEscolhido', 'get').and.returnValue(subPerfil);
    let docsNecessariosSpy = spyOn(component, 'documentosNecessariosRuralCNPJ');
    component.recebeValoresDoService();
    expect(docsNecessariosSpy).toHaveBeenCalled();
  });

  it(`O #${DocumentosNecessariosComponent.prototype.continuar.name}
  tipoDocumento deve ser CNPJ e chamar #logout quando não for representante`, (done) => {
    fixture.detectChanges();
    component.tipoDocumento = 'CNPJ';
    let logoutSpy = spyOn(component['_loginService'], 'logout');
    spyOn(component['_dialogRepresentanteLegalService'], 'termoRepresentante').and.returnValue(of(false));
    component.continuar();

    setTimeout(() => {
      expect(logoutSpy).toHaveBeenCalled();
      done();
    });
  });

  it(`O #${DocumentosNecessariosComponent.prototype.continuar.name} deve redirecionar para residencial quando for chamado com perfil RESIDENCIAL`, fakeAsync(() => {
    component.perfil = "RESIDENCIAL";
    fixture.detectChanges();
    component['_userService'].tipoDocumento = "CPF";
    let routerSpy = spyOn(router, 'navigate');
    component.continuar();
    tick();
    expect(routerSpy).toHaveBeenCalledWith(['ligacao-nova', 'documentos', 'residencial']);
  }));

  it(`O #${DocumentosNecessariosComponent.prototype.continuar.name} deve redirecionar para comercial quando for chamado com perfil COMERCIAL`, fakeAsync(() => {
    fixture.detectChanges();
    component['_userService'].tipoDocumento = "CPF";
    component.perfil = "COMERCIAL";
    let routerSpy = spyOn(router, 'navigate');
    component.continuar();
    tick();
    expect(routerSpy).toHaveBeenCalledWith(['ligacao-nova', 'documentos', 'comercial']);
  }));

  it(`O #${DocumentosNecessariosComponent.prototype.continuar.name} deve redirecionar quando for chamado o perfil INDUSTRIAL`, fakeAsync(() => {
    fixture.detectChanges();
    component['_userService'].tipoDocumento = "CPF";
    component.perfil = "INDUSTRIAL";
    let routerSpy = spyOn(router, 'navigate');
    component.continuar();
    tick();
    expect(routerSpy).toHaveBeenCalledWith(['ligacao-nova', 'documentos', 'industrial']);
  }));

  it(`O #${DocumentosNecessariosComponent.prototype.continuar.name} deve ser redirecionado para o subtipo escolhido quando for chamado o BENEFÍCIO RURAL`, fakeAsync(() => {
    fixture.detectChanges();
    let subPerfil =
    {
      label: 'AGROPECUÁRIA RURAL',
      route: 'agropecuaria-rural',
      textoTooltip: 'Localizada na área rural, onde seja desenvolvida atividade relativa à agropecuária.',
      disabled: false
    };
    component['_userService'].tipoDocumento = "CPF";
    component.perfil = "BENEFÍCIO RURAL";
    let routerSpy = spyOn(router, 'navigate');
    spyOnProperty(component['_ligacaoNovaService'], 'getSubPerfilEscolhido', 'get').and.returnValue(subPerfil);
    component.continuar();
    tick();
    expect(routerSpy).toHaveBeenCalledWith(['ligacao-nova', 'documentos', 'rural', 'agropecuaria-rural']);
  }));

  it(`O #${DocumentosNecessariosComponent.prototype.voltar.name} deve voltar location quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`O #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCPF.name} deve retornar array contendo 'COMPROVANTE DE ATIVIDADE RURAL' quando for chamado o subPerfil 'RESIDENCIAL RURAL'`, () => {
    fixture.detectChanges();
    component.subPerfil = subPerfilMockado['AGROPECUARIA_RURAL'];
    component.DOCUMENTOS_NECESSARIOS_RURAL = component.montaDocumentosNecessariosRural();
    dadosDoImovelService['_dadosDoImovel'].endereco.anexos['Licença Ambiental'] = [];
    expect(component.documentosNecessariosRuralCPF()).toContain(component.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCPF.name} deve retornar array contendo 'COMPROVANTE DE ATIVIDADE RURAL' quando for chamado o subPerfil 'AQUICULTOR'`, () => {
    fixture.detectChanges();
    component.subPerfil = subPerfilMockado['AQUICULTOR'];
    component.DOCUMENTOS_NECESSARIOS_RURAL = component.montaDocumentosNecessariosRural();
    dadosDoImovelService['_dadosDoImovel'].endereco.anexos['Licença Ambiental'] = [];
    expect(component.documentosNecessariosRuralCPF()).toContain(component.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCPF.name} deve retornar array contendo 'CADESP' quando for chamado qualquer subPerfil que não seja 'RESIDENCIAL_RURAL', 'AQUICULTOR' ou 'IRRIGANTE'`, () => {
    fixture.detectChanges();
    component.subPerfil = subPerfilMockado['AGROPECUARIA_RURAL'];
    component.DOCUMENTOS_NECESSARIOS_RURAL = component.montaDocumentosNecessariosRural();
    dadosDoImovelService['_dadosDoImovel'].endereco.anexos['Licença Ambiental'] = ['teste'];
    expect(component.documentosNecessariosRuralCPF()).toContain(component.DOCUMENTOS_NECESSARIOS_RURAL['CADESP'][0]);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCPF.name} deve retornar array contendo 'COMPROVANTE DE ATIVIDADE RURAL' quando for chamado qualquer subPerfil que não seja 'RESIDENCIAL_RURAL', 'AQUICULTOR' ou 'IRRIGANTE'`, () => {
    fixture.detectChanges();
    component.subPerfil = subPerfilMockado['AGROPECUARIA_RURAL'];
    component.DOCUMENTOS_NECESSARIOS_RURAL = component.montaDocumentosNecessariosRural();
    dadosDoImovelService['_dadosDoImovel'].endereco.anexos['Licença Ambiental'] = ['teste'];
    expect(component.documentosNecessariosRuralCPF()).toContain(component.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCPF.name} deve retornar array contendo 'COMPROVANTE DE ATIVIDADE RURAL' quando for chamado o subPerfil 'RESIDENCIAL_RURAL'`, () => {
    fixture.detectChanges();
    component.subPerfil = subPerfilMockado['RESIDENCIAL_RURAL'];
    component.DOCUMENTOS_NECESSARIOS_RURAL = component.montaDocumentosNecessariosRural();
    dadosDoImovelService['_dadosDoImovel'].endereco.anexos['Licença Ambiental'] = [];
    expect(component.documentosNecessariosRuralCPF()).toContain(component.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCNPJ.name} deve retornar array contendo 'COMPROVANTE DE ATIVIDADE RURAL' quando for chamado o subPerfil 'AGROPECUARIA_RURAL'`, () => {
    fixture.detectChanges();
    component.subPerfil = subPerfilMockado['AGROPECUARIA_RURAL'];
    component.DOCUMENTOS_NECESSARIOS_RURAL = component.montaDocumentosNecessariosRural();
    dadosDoImovelService['_dadosDoImovel'].endereco.anexos['Licença Ambiental'] = [];
    expect(component.documentosNecessariosRuralCNPJ()).toContain(component.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCNPJ.name} deve retornar array contendo 'COMPROVANTE DE ATIVIDADE RURAL' quando for chamado o subPerfil 'AGROPECUARIA_URBANA'`, () => {
    fixture.detectChanges();
    component.subPerfil = subPerfilMockado['AGROPECUARIA_URBANA'];
    component.DOCUMENTOS_NECESSARIOS_RURAL = component.montaDocumentosNecessariosRural();
    dadosDoImovelService['_dadosDoImovel'].endereco.anexos['Licença Ambiental'] = [];
    expect(component.documentosNecessariosRuralCNPJ()).toContain(component.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCNPJ.name} deve retornar array contendo 'COMPROVANTE DE ATIVIDADE RURAL' quando for chamado o subPerfil 'AQUICULTOR' e licencaAmbiental for 'true'.`, () => {
    fixture.detectChanges();
    component.subPerfil = subPerfilMockado['AQUICULTOR'];
    component.DOCUMENTOS_NECESSARIOS_RURAL = component.montaDocumentosNecessariosRural();
    dadosDoImovelService['_dadosDoImovel'].endereco.anexos['Licença Ambiental'] = [];
    expect(component.documentosNecessariosRuralCNPJ()).toContain(component.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCNPJ.name} deve retornar array contendo 'COMPROVANTE DE ATIVIDADE RURAL' quando for chamado o subPerfil 'IRRIGANTE' e licencaAmbiental for 'true'.`, () => {
    fixture.detectChanges();
    component.subPerfil = subPerfilMockado['IRRIGANTE'];
    component.DOCUMENTOS_NECESSARIOS_RURAL = component.montaDocumentosNecessariosRural();
    dadosDoImovelService['_dadosDoImovel'].endereco.anexos['Licença Ambiental'] = [];
    expect(component.documentosNecessariosRuralCNPJ()).toContain(component.DOCUMENTOS_NECESSARIOS_RURAL['COMPROVANTE DE ATIVIDADE RURAL'][0]);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCNPJ.name} deve retornar array contendo 'OUTORGA DE ÁGUA' quando for chamado o subPerfil 'SERVICO_PUBLICO_IRRIGACAO' e licencaAmbiental for 'true'.`, () => {
    fixture.detectChanges();
    component.subPerfil = subPerfilMockado['SERVICO_PUBLICO_IRRIGACAO'];
    component.DOCUMENTOS_NECESSARIOS_RURAL = component.montaDocumentosNecessariosRural();
    dadosDoImovelService['_dadosDoImovel'].endereco.anexos['Licença Ambiental'] = [];
    expect(component.documentosNecessariosRuralCNPJ()).toContain(component.DOCUMENTOS_NECESSARIOS_RURAL['OUTORGA DE ÁGUA'][0]);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCNPJ.name} deve retornar array contendo 'LICENÇA AMBIENTAL' quando for chamado o subPerfil 'SERVICO_PUBLICO_IRRIGACAO' e licencaAmbiental for 'true'.`, () => {
    fixture.detectChanges();
    component.subPerfil = subPerfilMockado['SERVICO_PUBLICO_IRRIGACAO'];
    component.DOCUMENTOS_NECESSARIOS_RURAL = component.montaDocumentosNecessariosRural();
    dadosDoImovelService['_dadosDoImovel'].endereco.anexos['Licença Ambiental'] = [];
    expect(component.documentosNecessariosRuralCNPJ()).toContain(component.DOCUMENTOS_NECESSARIOS_RURAL['LICENÇA AMBIENTAL'][0]);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.documentosNecessariosRuralCNPJ.name} deve retornar array não vazio quando o licencaAmbiental for 'false'.`, () => {
    fixture.detectChanges();
    component.subPerfil = subPerfilMockado['SERVICO_PUBLICO_IRRIGACAO'];
    component.DOCUMENTOS_NECESSARIOS_RURAL = component.montaDocumentosNecessariosRural();
    dadosDoImovelService['_dadosDoImovel'].endereco.anexos['Licença Ambiental'] = ['teste'];
    expect(component.documentosNecessariosRuralCNPJ()).not.toHaveSize(0);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.montaTooltipAtividadeRural.name} deve montar tooltip quando tipoRuralTooltipAtividadeRural for "AQUICULTOR".`, () => {
    fixture.detectChanges();
    let tooltip = 'Como comprovante de atividade rural será aceito um dos documentos abaixo:\nLicença Ambiental - emitido pelo Ibama ou órgãos Estaduais\nOutorga de Água - emitido pelo ANA ou órgãos Estaduais';
    component.subPerfil = subPerfilMockado['AQUICULTOR'];
    expect(component.montaTooltipAtividadeRural()).toEqual(tooltip);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.montaTooltipAtividadeRural.name} deve montar tooltip quando tipoRuralTooltipAtividadeRural for "IRRIGANTE".`, () => {
    fixture.detectChanges();
    let tooltip = 'Como comprovante de atividade rural será aceito um dos documentos abaixo:\nLicença Ambiental - emitido pelo Ibama ou órgãos Estaduais\nOutorga de Água - emitido pelo ANA ou órgãos Estaduais';
    component.subPerfil = subPerfilMockado['IRRIGANTE'];
    expect(component.montaTooltipAtividadeRural()).toEqual(tooltip);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.montaTooltipAtividadeRural.name} deve montar tooltip quando subPerfil.label for "RESIDENCIAL RURAL".`, () => {
    fixture.detectChanges();
    let tooltip = 'Como comprovante de trabalhador rural será aceito um dos documentos abaixo:\nCarteira de Trabalhador Rural - emitido pelo Ministério do Trabalho\nCarteira de Sindicato Rural - emitido pelo Sindicado Rural\nAposentadoria Rural - emitido pelo INSS';
    component.subPerfil = subPerfilMockado['RESIDENCIAL_RURAL'];
    expect(component.montaTooltipAtividadeRural()).toEqual(tooltip);
  });

  it(`O #${DocumentosNecessariosComponent.prototype.montaTooltipAtividadeRural.name} deve montar tooltip quando subPerfil.label for qualquer outro que não seja "AQUICULTOR", "IRRIGANTE" ou "RESIDENCIAL RURAL".`, () => {
    fixture.detectChanges();
    let tooltip = 'Como comprovante de atividade rural será aceito um dos documentos abaixo:\nInscrição Estadual com atividade de Produtor Rural - emitido pelo SEFAZ\nEstadual Registro no INCRA - emitido pelo INCRA\nCODEVASF  Companhia de Desenvolvimento do Vale do São Francisco - emitido pelo CODEVASF\nPRONAF  Programa Nacional de Fortalecimento da Agricultura Familiar - emitido pelo Ministério da Agricultura\nCCIR(CAFIR)  Cadastro Nacional de Imóvel Rural - emitido pela Receita Federal\nIRT  Imposto Territorial Rural  emitido pela Receita Federal\nMAPA  Ministério da Agricultura e Pecuária - emitido pelo Ministério da Agricultura\nNIRF  Comprovante de Inscrição do imóvel Receita Federal do Brasil - emitido pela Receita Federal\nRegistro EMBRAPA  Empresa Brasileira de Pesquisa Agropecuária - emitido pela Embrapa\nRegistro em Secretarias ou Órgãos Municipais Vinculados a Agropecuária - emitido pelas Secretarias ou Órgãos Municipais\nRegistro em Secretarias ou Órgãos Estaduais Vinculados a Agropecuária - emitido pelas Secretarias ou Órgãos Estaduais';
    component.subPerfil = subPerfilMockado['ESCOLA_AGROTECNICA'];
    expect(component.montaTooltipAtividadeRural()).toEqual(tooltip);
  });
});
