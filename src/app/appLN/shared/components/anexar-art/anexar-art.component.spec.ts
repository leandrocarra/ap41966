import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AnexarArtComponent } from './anexar-art.component';
import { AnexarArtModule } from './anexar-art.module';

describe(AnexarArtComponent.name, () => {
  let component: AnexarArtComponent;
  let fixture: ComponentFixture<AnexarArtComponent>;

  let arquivo = { fileData: 'JVBERi0xLjMNCiXi48', fileExtension: '.pdf', fileName: 'DOCUMENTO DE RESPONSABILIDADE TÉCNICA', fileSize: 322408 }

  let data = {
    "result": [
      {
        "tables": [],
        "fields": [
          {
            "name": "num_registro",
            "value": "5069071925 SP",
            "score": 1
          },
          {
            "name": "lougradouro_obra",
            "value": "RUA OTTO FREDERICO BURGER",
            "score": 1
          },
          {
            "name": "num_lougradouro",
            "value": "381",
            "score": 1
          },
          {
            "name": "complemento_obra",
            "value": "",
            "score": 0.22
          },
          {
            "name": "bairro_obra",
            "value": "JARDIM ALVORADA",
            "score": 1
          },
          {
            "name": "cidade_obra",
            "value": "Limeira",
            "score": 0.98
          },
          {
            "name": "uf_obra",
            "value": "SP",
            "score": 1
          },
          {
            "name": "cep_obra",
            "value": "13500000",
            "score": 1
          },
          {
            "name": "atividade_tecnica",
            "value": "Projeto Entrada de Energia Elétrica",
            "score": 0.99
          },
          {
            "name": "observacao",
            "value": "Essa ART refere-se a ligação do padrão de entrada de energia elétrica junto à Elektro. O padrão a ser instalado será o padrão T2, 127/220V.-",
            "score": 0.85
          }
        ],
        "deskewImage": null,
        "docQuality": null,
        "docQualityScore": 0.95,
        "docType": "formulario",
        "pageIndex": 1,
        "tags": [
          "formulario",
          "br-contrato-art-1"
        ]
      }
    ],
    "queryId": "SkVebcNsZUOXxApKkjAGu",
    "elapsedMilliseconds": 7206,
    "status": {
      "code": 200,
      "message": "Ok"
    }
  }

  let dataNoTag = {
    "result": [
      {
        "tables": [],
        "fields": [
          {
            "name": "num_registro",
            "value": "5069071925 SP",
            "score": 1
          },
          {
            "name": "lougradouro_obra",
            "value": "RUA OTTO FREDERICO BURGER",
            "score": 1
          },
          {
            "name": "num_lougradouro",
            "value": "381",
            "score": 1
          },
          {
            "name": "complemento_obra",
            "value": "",
            "score": 0.22
          },
          {
            "name": "bairro_obra",
            "value": "JARDIM ALVORADA",
            "score": 1
          },
          {
            "name": "cidade_obra",
            "value": "Limeira",
            "score": 0.98
          },
          {
            "name": "uf_obra",
            "value": "SP",
            "score": 1
          },
          {
            "name": "cep_obra",
            "value": "13500000",
            "score": 1
          },
          {
            "name": "atividade_tecnica",
            "value": "teste",
            "score": 0.99
          },
          {
            "name": "observacao",
            "value": "Essa ART refere-se a ligação do padrão de entrada de energia elétrica junto à Elektro. O padrão a ser instalado será o padrão T2, 127/220V.-",
            "score": 0.85
          }
        ],
        "deskewImage": null,
        "docQuality": null,
        "docQualityScore": 0.95,
        "docType": "formulario",
        "pageIndex": 1,
        "tags": [
          "formulario",
          "br-contrato-art-1"
        ]
      }
    ],
    "queryId": "SkVebcNsZUOXxApKkjAGu",
    "elapsedMilliseconds": 7206,
    "status": {
      "code": 200,
      "message": "Ok"
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnexarArtComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        AnexarArtModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AnexarArtComponent);
    component = fixture.componentInstance;
  });

  it(`Deve criar o componente`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${AnexarArtComponent.prototype.anexar.name}
  deve anexar arquivo quando chamado pela 3a vez`, () => {
    component['_etapaService'].tentativasArt = 3;
    fixture.detectChanges();
    expect(component.anexar(arquivo)).toBe();
  });

  it(`#${AnexarArtComponent.prototype.anexar.name}
  deve chamar função #${AnexarArtComponent.prototype.artInvalido.name}
  quando ocr retornar falso na promise`, fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(false));
    let artInvalidoSpy = spyOn(component, 'artInvalido');
    component.anexar(arquivo);
    fixture.detectChanges();
    tick();
    expect(artInvalidoSpy).toHaveBeenCalled();
  }));

  it(`#${AnexarArtComponent.prototype.anexar.name}
  deve chamar #${AnexarArtComponent.prototype.validarDocOcr.name}
  quando ocr retornar true na promise`, fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(data));
    let validarDocOCRSpy = spyOn(component, 'validarDocOcr');
    component.anexar(arquivo);
    fixture.detectChanges();
    tick();
    expect(validarDocOCRSpy).toHaveBeenCalledOnceWith(data.result[0], arquivo);
  }));

  it(`#${AnexarArtComponent.prototype.artInvalido.name}
  deve chamar alerta CEP quando tentativas forem menor que 3 e passado parâmetro CEP
  `, () => {
    fixture.detectChanges();
    let spy = spyOn(component['_alert'], 'alertWarningWithText');
    component['_etapaService'].tentativasArt = 0;
    component.artInvalido('CEP', arquivo);
    expect(spy).toHaveBeenCalled();
  });

  it(`#${AnexarArtComponent.prototype.artInvalido.name}
  deve chamar alertWarning ART inválido quando tentativas forem menor que 3
  `, () => {
    fixture.detectChanges();
    let spy = spyOn(component['_alert'], 'alertWarning');
    component['_etapaService'].tentativasArt = 1;
    component.artInvalido('', arquivo);
    expect(spy).toHaveBeenCalled();
  });

  it(`#${AnexarArtComponent.prototype.artInvalido.name}
  deve anexar arquivo e setar variável como true na 4a tentativa quando chamado
  `, () => {
    fixture.detectChanges();
    let spy = spyOn(component['_alert'], 'alertInfoWithText');
    component['_etapaService'].tentativasArt = 4;
    component.artInvalido('', arquivo);
    expect(spy).toHaveBeenCalled();
  });

  it(`#${AnexarArtComponent.prototype.validarDocOcr.name}
  deve anexar ART`, () => {
    fixture.detectChanges();
    let spy = spyOn(component, 'pushAnexo');
    component['_imovelService'].getDadosDoImovel.endereco.ruaSemCep = true;
    component['_imovelService'].getDadosDoImovel.endereco.cep = '13500000';
    component.validarDocOcr(data.result[0], arquivo)
    expect(spy).toHaveBeenCalledOnceWith(arquivo);
  });

  it(`#${AnexarArtComponent.prototype.validarDocOcr.name}
  deve chamar o alerta cep inválido`, () => {
    fixture.detectChanges();
    let spy = spyOn(component, 'artInvalido');
    component['_imovelService'].getDadosDoImovel.endereco.ruaSemCep = false;
    component['_imovelService'].getDadosDoImovel.endereco.cep = '13500003';
    component.validarDocOcr(data.result[0], arquivo)
    expect(spy).toHaveBeenCalledOnceWith('CEP', arquivo);
  });

  it(`#${AnexarArtComponent.prototype.validarDocOcr.name}
  deve chamar o alerta documento inválido`, () => {
    fixture.detectChanges();
    let spy = spyOn(component, 'artInvalido');
    component['_imovelService'].getDadosDoImovel.endereco.ruaSemCep = true;
    component['_imovelService'].getDadosDoImovel.endereco.cep = '13500000';
    component.validarDocOcr(dataNoTag.result[0], arquivo)
    expect(spy).toHaveBeenCalledOnceWith('', arquivo);
  });

  it(`#${AnexarArtComponent.prototype.validarDocOcr.name}
  deve remover ART quando chamado`, () => {
    spyOn(component['_etapaService'], 'checkArt').and.returnValue(true);
    fixture.detectChanges();
    component['_documentosService'].anexos.art = [arquivo];
    fixture.detectChanges();
    component.remove(0);
    expect(component['_documentosService'].anexos.art).toEqual([]);
  });
});
