import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { LoginComponent } from '../../../../../../login/login.component';
import { AttachedFileModule } from '../../../../../../shared/components/attached-file/attached-file.module';
import { BoxFileModule } from '../../../../../../shared/components/box-file/box-file.module';
import Swal from 'sweetalert2';
import { DocumentoPosseComponent } from './documento-posse.component';

describe(DocumentoPosseComponent.name, () => {
  let component: DocumentoPosseComponent;
  let fixture: ComponentFixture<DocumentoPosseComponent>;
  let location: Location;
  let router: Router;

  let dadosDoImovelMockado = require("src/app/appLN/shared/mock/responses/response-dados-do-imovel.json");
  let responseITR = require("src/app/appLN/shared/mock/responses/response-ocr-itr.json");
  let responseCCIR = require("src/app/appLN/shared/mock/responses/response-ocr-ccir.json");
  let sessionUserCPF = require('src/app/appLN/shared/mock/responses/response-session-user-cpf.json');
  let docTeste = {
    "result": [
      {
        "docType": "teste",
      }
    ]
  };

  let documentoPosseImovel: Anexo = new Anexo(".jpeg", "Doc Posse", 337652, "/9j/4AAQSkZJRgABAQEAkACQAAD");

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentoPosseComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{ path: 'login', component: LoginComponent }]
        ),
        MatRadioModule,
        AttachedFileModule,
        BoxFileModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DocumentoPosseComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${DocumentoPosseComponent.prototype.voltar.name}
  deve voltar pagina location quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`#${DocumentoPosseComponent.prototype.avancar.name}
  deve redirecionar para selecao-perfil quando chamado`, () => {
    fixture.detectChanges();
    let spy = spyOn(router, 'navigate');
    component['_etapaService'].getDocPosse.posseImovel = 'tenhoDocumento';
    component['_etapaService'].getDocPosse.documentoPosseImovel['Doc Posse'].arquivos = [];
    component.avancar();
    expect(spy).toHaveBeenCalledWith(["ligacao-nova", "pedido", "selecao-perfil"]);
  });

  it(`#${DocumentoPosseComponent.prototype.avancar.name}
  Deve ser redirecionado para a tela de anexar-autorizacao-da-prefeitura,
  quando PREFEITURAS_COM_AUTORIZACAO for validado.`, ()=>{
    fixture.detectChanges();
    let spy = spyOn(router, 'navigate');
    component['_etapaService'].getDadosDoImovel.endereco.cidade= 'ILHABELA';
    component.avancar();
    expect(spy).toHaveBeenCalledWith(["ligacao-nova", "pedido", "anexar-autorizacao-da-prefeitura"])

  });

  it(`#${DocumentoPosseComponent.prototype.docPosse.name}
  deve redirecionar para selecao-perfil quresponseITR['VALIDO']ando o usuario aceitar o orçamento da rede`, (done) => {
    fixture.detectChanges();
    let spy = spyOn(router, 'navigate');
    component.docPosse('naoTenhoDocumento');
    Swal.clickConfirm();
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(['/ligacao-nova/pedido/selecao-perfil']);
      done();
    });
  });

  it(`#${DocumentoPosseComponent.prototype.infoDocumentosPosseImovel.name}
  deve redirecionar para documentos-aceitos de posse de imóvel`, () => {
    fixture.detectChanges();
    let spy = spyOn(router, 'navigate');
    component.infoDocumentosPosseImovel();
    expect(spy).toHaveBeenCalledWith(['/ligacao-nova/pedido/documentos-aceitos']);
  });

  it(`#${DocumentoPosseComponent.prototype.anexar.name}
  deve chamar #${DocumentoPosseComponent.prototype.leituraOCR.name} quando documento não é vazio`, fakeAsync(() => {
    fixture.detectChanges();
    let anexarSpy = spyOn(component, 'leituraOCR');
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(responseITR.VALIDO));
    component.anexar(documentoPosseImovel);
    tick();
    expect(anexarSpy).toHaveBeenCalledWith(responseITR.VALIDO, documentoPosseImovel);
  }));

  it(`#${DocumentoPosseComponent.prototype.anexar.name}
  deve chamar #${DocumentoPosseComponent.prototype.ocrInvalida.name} quando documento é vazio`, fakeAsync(() => {
    fixture.detectChanges();
    let anexarSpy = spyOn(component, 'ocrInvalida');
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(false));
    component.anexar(documentoPosseImovel);
    tick();
    expect(anexarSpy).toHaveBeenCalledWith(documentoPosseImovel);
  }));

  it(`#${DocumentoPosseComponent.prototype.anexar.name}
  deve chamar o alert que informa que o documento já foi enviado`, () => {
    fixture.detectChanges();
    let alertSpy = spyOn(component['_alert'], 'alertSuccess');
    component.anexo['Doc Posse'].arquivos.push(documentoPosseImovel);
    component.anexar(documentoPosseImovel);
    expect(alertSpy).toHaveBeenCalledWith("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo");
  });

  it(`#${DocumentoPosseComponent.prototype.leituraOCR.name}
  deve chamar #${DocumentoPosseComponent.prototype.validacaoItr.name} para o documento de itr`, () => {
    fixture.detectChanges();
    let lerDeclaracaoSpy = spyOn(component, 'validacaoItr');
    component.leituraOCR(responseITR.VALIDO, documentoPosseImovel);
    expect(lerDeclaracaoSpy).toHaveBeenCalledWith(responseITR.VALIDO.result[0], documentoPosseImovel);
  });

  it(`#${DocumentoPosseComponent.prototype.leituraOCR.name}
  deve chamar #${DocumentoPosseComponent.prototype.validacaoCcir.name} para o documento de ccir`, () => {
    fixture.detectChanges();
    let lerDeclaracaoSpy = spyOn(component, 'validacaoCcir');
    component.leituraOCR(responseCCIR.VALIDO, documentoPosseImovel);
    expect(lerDeclaracaoSpy).toHaveBeenCalledWith(responseCCIR.VALIDO.result[0], documentoPosseImovel);
  });

  it(`#${DocumentoPosseComponent.prototype.leituraOCR.name}
  deve chamar #${DocumentoPosseComponent.prototype.ocrInvalida.name} para o documento inválido`, () => {
    fixture.detectChanges();
    let ocrInvalidaSpy = spyOn(component, 'ocrInvalida');
    component.leituraOCR(docTeste, documentoPosseImovel);
    expect(ocrInvalidaSpy).toHaveBeenCalledWith(documentoPosseImovel);
  });

  it(`#${DocumentoPosseComponent.prototype.validacaoItr.name}
  deve chamar o método #${DocumentoPosseComponent.prototype.uploadDoc.name} para o arquivo ITR com dados válidos`, () => {
    fixture.detectChanges();
    let uploadDocSpy = spyOn(component, 'uploadDoc');
    component['_userService'].sessionUser = sessionUserCPF;
    component['_etapaService'].setEndereco = dadosDoImovelMockado.URBANO;
    component.validacaoItr(responseITR.VALIDO.result[0], documentoPosseImovel);

    expect(uploadDocSpy).toHaveBeenCalledWith(documentoPosseImovel, false);
  });



// it(`#${DocumentoPosseComponent.prototype.validacaoItr.name}

// Deve chamar o método #${DocumentoPosseComponent.prototype.uploadDoc.name} para o arquivo ITR com nome válido`, ()=> {
// fixture.detectChanges();
// let spy = spyOn(component,'uploadDoc');
// component['_userService'].sessionUser.nome = 'Maria Flavia';

// expect(spy).toHaveBeenCalledWith(sessionUserCPF, true)

// })




  it(`#${DocumentoPosseComponent.prototype.validacaoItr.name}
  deve chamar o método #${DocumentoPosseComponent.prototype.ocrInvalida.name} para o arquivo ITR com dados inválidos`, () => {
    fixture.detectChanges();
    let uploadDocSpy = spyOn(component, 'ocrInvalida');
    component['_userService'].sessionUser = sessionUserCPF;
    component['_etapaService'].setEndereco = dadosDoImovelMockado.URBANO;
    component.validacaoItr(responseITR.INVALIDO.result[0], documentoPosseImovel);
    expect(uploadDocSpy).toHaveBeenCalledWith(documentoPosseImovel);
  });



  it(`#${DocumentoPosseComponent.prototype.validacaoCcir.name}
    deve chamar o método #${DocumentoPosseComponent.prototype.uploadDoc.name} para o arquivo CCIR com dados válidos`, () => {
    fixture.detectChanges();
    let uploadDocSpy = spyOn(component, 'uploadDoc');
    let documentSpy = spyOn(document.getElementById('initPedido'), 'focus');
    let mockElemnt = document.createElement('button');
    document.getElementById = jasmine.createSpy('initPedido').and.returnValue(mockElemnt);

    component['_userService'].sessionUser = sessionUserCPF;
    component['_etapaService'].setEndereco = dadosDoImovelMockado.URBANO;
    component.validacaoCcir(responseCCIR.VALIDO.result[0], documentoPosseImovel);

    expect(uploadDocSpy).toHaveBeenCalledWith(documentoPosseImovel, false);
    expect(documentSpy).toBeDefined();
  });

  it(`#${DocumentoPosseComponent.prototype.validacaoCcir.name}
  deve chamar o método #${DocumentoPosseComponent.prototype.uploadDoc.name} para o arquivo CCIR com dados inválidos`, () => {
    fixture.detectChanges();
    let validarCcirSpy = spyOn(component, 'validacaoCcir');
    component['_userService'].sessionUser = sessionUserCPF;
    component['_etapaService'].setEndereco = dadosDoImovelMockado.URBANO;

    component.validacaoCcir(responseCCIR.INVALIDO.result[0], documentoPosseImovel);

    expect(validarCcirSpy).toHaveBeenCalled();

  });

  it(`#${DocumentoPosseComponent.prototype.validacaoCcir.name}
deve chamar o método #${DocumentoPosseComponent.prototype.ocrInvalida.name} para o arquivo CCIR com os parágrafos vazios`, () => {
    fixture.detectChanges();
    let ocrInvalidaSpy = spyOn(component, 'ocrInvalida');
    component['_userService'].sessionUser = sessionUserCPF;
    component['_etapaService'].setEndereco = dadosDoImovelMockado.URBANO;
    component.validacaoCcir(responseCCIR.INVALIDO.result[0], documentoPosseImovel);

    expect(ocrInvalidaSpy).toHaveBeenCalledWith(documentoPosseImovel);
  });

  it(`#${DocumentoPosseComponent.prototype.remove.name}
  deve remover o documento de posse`, () => {
    let mockBoxAnexo = {
      label: "Doc Posse",
      ocr: true,
      docName: "Doc Posse",
    }
    component.remove(0, mockBoxAnexo);
    expect(component.anexo[mockBoxAnexo.docName].arquivos.length).toEqual(0);
  });

  it(`#${DocumentoPosseComponent.prototype.uploadDoc.name}
  deve anexar o documento posse de posse e checarDoc como false`, () => {
    component.uploadDoc(documentoPosseImovel, false);
    expect(component.anexo['Doc Posse'].arquivos.length).toEqual(1);
    expect(component['_etapaService'].getDocPosse.checarDocumentoPosse).toBeFalse;
  });

  it(`#${DocumentoPosseComponent.prototype.ocrInvalida.name}
  deve chamar o método #${DocumentoPosseComponent.prototype.uploadDoc.name}`, () => {
    let uploadDocSpy = spyOn(component, 'uploadDoc');

    let documentSpy = spyOn(document.getElementById('initPedido'), 'focus');
    let mockElemnt = document.createElement('button');
    document.getElementById = jasmine.createSpy('initPedido').and.returnValue(mockElemnt);

    component.ocrInvalida(documentoPosseImovel);
    expect(uploadDocSpy).toHaveBeenCalledWith(documentoPosseImovel, true);
    expect(documentSpy).toBeDefined();
  });

  it(`#${DocumentoPosseComponent.prototype.isDisabled.name}
  deve retornar false quando o usuário informar que possui o documento e anexar o arquivo`, () => {
    component['_etapaService'].getDocPosse.posseImovel = 'tenhoDocumento';
    component['_etapaService'].getDocPosse.documentoPosseImovel['Doc Posse'].arquivos.push(documentoPosseImovel);
    expect(component.isDisabled()).toBeFalse;
  });

  it(`#${DocumentoPosseComponent.prototype.isDisabled.name}
  deve retornar true quando o usuário informar que possui o documento e o arquivo não é anexado`, () => {
    component['_etapaService'].getDocPosse.posseImovel = 'tenhoDocumento';
    component['_etapaService'].getDocPosse.documentoPosseImovel['Doc Posse'].arquivos = [];
    expect(component.isDisabled()).toBeTrue;
  });

  it(`#${DocumentoPosseComponent.prototype.isDisabled.name}
  deve retornar true quando o usário informar que não possui o documento`, () => {
    component['_etapaService'].getDocPosse.posseImovel = 'naoTenhoDocumento';
    expect(component.isDisabled()).toBeTrue;
  });

  it(`#${DocumentoPosseComponent.prototype.isDisabled.name}
  deve retornar true enquanto o usuáro não responde se possui o documento de posse`, () => {
    component['_etapaService'].getDocPosse.posseImovel = '';
    expect(component.isDisabled()).toBeTrue;
  });


});
