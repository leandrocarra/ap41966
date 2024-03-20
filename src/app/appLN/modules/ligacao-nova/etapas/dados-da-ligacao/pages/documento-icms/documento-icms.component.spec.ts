import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { BoxAnexo } from '../../../../../../core/models/documentos/box-anexo/box-anexo';
import { AttachedFileModule } from '../../../../../../shared/components/attached-file/attached-file.module';
import { BoxFileModule } from '../../../../../../shared/components/box-file/box-file.module';
import { DocumentoIcmsComponent } from './documento-icms.component';

const DOC_INVALIDO = false;
const DOC_VALIDADO = true;

describe(DocumentoIcmsComponent.name, () => {
  let component: DocumentoIcmsComponent;
  let fixture: ComponentFixture<DocumentoIcmsComponent>;
  let router: Router;
  let location: Location;

  //Mocks
  let responseConsultarCliente = {
    "codUsuario": 157164,
    "codTipoUsuario": 1,
    "codImobiliaria": 0,
    "nome": "Teste CNPJ",
    "documento": "15502723000166",
    "telefone": "",
    "celular": "00000000000",
    "email": "teste@teste.com",
    "senha": "76424F59ED76389C291A418DFFF670EA",
    "recebeEmail": false,
    "recebeSMS": false,
    "data": "2021-03-02T11:51:00.593",
    "ativo": true,
    "dataAtualizacao": "2021-03-19T00:00:00",
    "blacklist": false,
    "isRepositorio": false,
    "dataRepositorio": "0001-01-01T00:00:00",
    "dataNascimento": "0001-01-01T00:00:00",
    "tipoEnvio": 0
  }

  let responseUserCNPJ = require('src/app/appLN/shared/mock/responses/response-session-user-cnpj.json');

  let documentoCadespAnexado: Anexo = new Anexo(".jpeg", "Doc Oficial", 337652, "/9j/4AAQSkZJRgABAQEAkACQAAD");

  let retornoOCR = require('src/app/appLN/shared/mock/responses/response-ocr-cadesp.json');
  let BoxCADESP: BoxAnexo = new BoxAnexo('CADESP', true, 'Cadesp');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentoIcmsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        AttachedFileModule,
        BoxFileModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
      .compileComponents();

    fixture = TestBed.createComponent(DocumentoIcmsComponent);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${DocumentoIcmsComponent.prototype.onResize.name}
  deve ser chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${DocumentoIcmsComponent.prototype.recebeAnexos.name}
  deve chamar ocr quando não houver anexos`, () => {
    fixture.detectChanges();
    let docSpy = spyOn(component, 'chamaOCR');
    component.recebeAnexos(documentoCadespAnexado, BoxCADESP);
    expect(docSpy).toHaveBeenCalled();
  });

  it(`#${DocumentoIcmsComponent.prototype.anexarArquivo.name}
  deve anexar o arquivo passado por parametro quando chamado`, () => {
    fixture.detectChanges();
    component.anexarArquivo(documentoCadespAnexado, DOC_VALIDADO);
    expect(component.anexoCadesp.length).toBe(1);
  });

  it(`#${DocumentoIcmsComponent.prototype.anexarArquivo.name}
  deve chamar #alertAnexarSemValidar, setar valor false em setCadespValidado e anexar documento quando anexado com documento invalidado`, () => {
    fixture.detectChanges();
    let alertSpy = spyOn(component['_alert'], 'alertAnexarSemValidar');
    component.anexarArquivo(documentoCadespAnexado, DOC_INVALIDO);
    expect(alertSpy).toHaveBeenCalled();
    expect(component.anexoCadesp.length).toBe(1);
  });

  it(`#${DocumentoIcmsComponent.prototype.remove.name}
  deve retirar anexo do arquivo quando chamado com index`, () => {
    fixture.detectChanges();
    component.anexarArquivo(documentoCadespAnexado, DOC_VALIDADO);
    expect(component.anexoCadesp.length).toBe(1);
    component.remove(0);
    expect(component.anexoCadesp.length).toBe(0);
  });

  it(`#${DocumentoIcmsComponent.prototype.chamaOCR.name}
  deve chamar #${DocumentoIcmsComponent.prototype.anexarArquivo.name} quando data for false e a quantidade de tentativas for maior que 3`, (done) => {
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(false));
    let anexarArquivoSpy = spyOn(component, 'anexarArquivo');
    fixture.detectChanges();
    component['_documentosService'].documentos['rural'].anexos[component.CADESP.docName].tentativas = 4;
    component.chamaOCR(documentoCadespAnexado, BoxCADESP);
    setTimeout(() => {
      expect(anexarArquivoSpy).toHaveBeenCalledWith(documentoCadespAnexado, DOC_INVALIDO);
      done();
    });
  });

  it(`#${DocumentoIcmsComponent.prototype.chamaOCR.name}
  deve chamar #alertDocumentosInvalidos quando data for false`, (done) => {
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(false));
    let anexarArquivoSpy = spyOn(component['_documentosService'], 'alertDocumentosInvalidos');
    fixture.detectChanges();
    component.chamaOCR(documentoCadespAnexado, BoxCADESP);
    setTimeout(() => {
      expect(anexarArquivoSpy).toHaveBeenCalledWith(component.mobile, 'rural', BoxCADESP.docName, documentoCadespAnexado, false);
      done();
    });
  });

  it(`#${DocumentoIcmsComponent.prototype.chamaOCR.name}
  deve chamar #${DocumentoIcmsComponent.prototype.validarCadesp.name} quando validado`, fakeAsync(() => {
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(retornoOCR.VALIDO));
    let validarCadespSpy = spyOn(component, 'validarCadesp');
    fixture.detectChanges();
    component.chamaOCR(documentoCadespAnexado, BoxCADESP);
    tick();
    expect(validarCadespSpy).toHaveBeenCalledOnceWith(retornoOCR.VALIDO, documentoCadespAnexado, BoxCADESP);
  }));

  it(`#${DocumentoIcmsComponent.prototype.validarCadesp.name}
  deve anexar arquivo quando chamado com documento válido`, fakeAsync(() => {
    component['_userService'].sessionUser = responseConsultarCliente;
    fixture.detectChanges();
    let anexarArquivoSpy = spyOn(component, 'anexarArquivo');
    component.validarCadesp(retornoOCR.VALIDO, documentoCadespAnexado, BoxCADESP);
    tick();
    expect(anexarArquivoSpy).toHaveBeenCalledOnceWith(documentoCadespAnexado, DOC_VALIDADO);
  }));

  it(`#${DocumentoIcmsComponent.prototype.validarCadesp.name}
  deve chamar #${DocumentoIcmsComponent.prototype.alertCadespInvalido.name} quando anexar documento inválido`, (done) => {
    component['_userService'].sessionUser = responseConsultarCliente;
    fixture.detectChanges();
    let alertCadespInvalidoSpy = spyOn(component, 'alertCadespInvalido');
    component.validarCadesp(retornoOCR.INVALIDO, documentoCadespAnexado, BoxCADESP);
    setTimeout(() => {
      expect(alertCadespInvalidoSpy).toHaveBeenCalled();
      done();
    });
  });

  it(`#${DocumentoIcmsComponent.prototype.validarCadesp.name}
  deve chamar #${DocumentoIcmsComponent.prototype.alertCadespInvalido.name} quando anexar documento inválido`, (done) => {
    component['_userService'].sessionUser = responseUserCNPJ;
    fixture.detectChanges();
    let alertCadespInvalidoSpy = spyOn(component, 'alertCadespInvalido');
    component.validarCadesp(retornoOCR.VALIDO, documentoCadespAnexado, BoxCADESP);
    setTimeout(() => {
      expect(alertCadespInvalidoSpy).toHaveBeenCalled();
      done();
    });
  });


  it(`#${DocumentoIcmsComponent.prototype.alertCadespInvalido.name}
  deve chamar #${DocumentoIcmsComponent.prototype.validarCadesp.name}
  quando cadesp estiver ativo`, () => {
    fixture.detectChanges();
    let alertDocumentosInvalidosSpy = spyOn(component['_documentosService'], 'alertDocumentosInvalidos');
    component.alertCadespInvalido(documentoCadespAnexado, true, BoxCADESP);

    expect(alertDocumentosInvalidosSpy).toHaveBeenCalledOnceWith(component.mobile, 'rural', BoxCADESP.docName, documentoCadespAnexado, false);
  });



  it(`#${DocumentoIcmsComponent.prototype.alertCadespInvalido.name}
  deve chamar #alertAttemptCadespInativoDocument
  quando cadesp estiver false`, () => {
    fixture.detectChanges();
    let alertAttemptCadespInativoDocumentSpy = spyOn(component['_alert'], 'alertAttemptCadespInativoDocument');

    component.alertCadespInvalido(documentoCadespAnexado, false, BoxCADESP);

    expect(alertAttemptCadespInativoDocumentSpy).toHaveBeenCalled();
  });




  it(`#${DocumentoIcmsComponent.prototype.alertCadespInvalido.name}
  deve chamar #alertAttemptCadespInativoDocument
  quando cadesp estiver false`, () => {
    fixture.detectChanges();
    let alertAttemptCadespInativoDocumentSpy = spyOn(component, 'anexarArquivo');
    component['_documentosService'].documentos['rural'].anexos[component.CADESP.docName].tentativas = 4;
    component.alertCadespInvalido(documentoCadespAnexado, false, BoxCADESP);

    expect(alertAttemptCadespInativoDocumentSpy).toHaveBeenCalled();
  });

  it(`#${DocumentoIcmsComponent.prototype.continuar.name}
  deve redirecionar a opcao-tarifaria quando chamado`, () => {
    fixture.detectChanges();
    let spy = spyOn(router, 'navigate');
    component.continuar();
    expect(spy).toHaveBeenCalledOnceWith(["ligacao-nova", "dados-da-ligacao", "opcao-tarifaria"]);
  });


  it(`#${DocumentoIcmsComponent.prototype.voltar.name}
  deve voltar pagina location quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });


});

