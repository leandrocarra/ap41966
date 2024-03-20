import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { BoxAnexo } from '../../../../../../core/models/documentos/box-anexo/box-anexo';
import { AttachedFileModule } from '../../../../../../shared/components/attached-file/attached-file.module';
import { BoxFileModule } from '../../../../../../shared/components/box-file/box-file.module';
import { DocumentosComercialComponent } from './documentos-comercial.component';

describe(DocumentosComercialComponent.name, () => {
  let component: DocumentosComercialComponent;
  let fixture: ComponentFixture<DocumentosComercialComponent>;
  let location: Location;
  let router: Router;

  /**
   * Mocks
   */
  let sessionUserCNPJMockado = require('src/app/appLN/shared/mock/responses/response-session-user-cnpj.json');

  let selecaoPerfilMockado = require('src/app/appLN/shared/mock/preenchimentos/selecao-perfil.json');

  let dataOcrCNPJMockado = require('src/app/appLN/shared/mock/responses/response-ocr-cnpj.json');

  let dataOcrRGMockado = require('src/app/appLN/shared/mock/responses/response-ocr-rg-completo.json');

  let arquivo = new Anexo('.pdf', 'DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)', 322408, 'JVBERi0xLjMNCiXi48');

  let boxMockado = new BoxAnexo("DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)", true, "Doc Oficial");

  let boxCNPJMockado = new BoxAnexo('CADASTRO NACIONAL DA PESSOA JURÍDICA (CNPJ)', true, 'CNPJ');

  let boxCCTMockado = new BoxAnexo('CONTRATO SOCIAL OU ESTATUTO SOCIAL OU CCMEI', false, 'CTT Social ou CCMEI');

  let dataOcrCNH = require('src/app/appLN/shared/mock/responses/response-ocr-cnh.json');



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentosComercialComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        AttachedFileModule,
        BoxFileModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DocumentosComercialComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    spyOnProperty(component['_ligacaoNovaService'], 'getPerfilEscolhido', 'get').and.returnValue(selecaoPerfilMockado.COMERCIAL);
  });


  it(`Deve criar o ${DocumentosComercialComponent.name} quando chamado`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });



  it(`#${DocumentosComercialComponent.prototype.onResize.name}
  deve ser chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });



  it(`#${DocumentosComercialComponent.prototype.recebeAnexos.name}
  deve receber documento e chamar #validarDocOficial quando ocr retornar diferente de falso `, (done) => {
    fixture.detectChanges();
    let validarDocOficialSpy = spyOn(component['_etapaService'], 'validarDocOficial')
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(dataOcrRGMockado.COMPLETO));

    component.recebeAnexos(arquivo, boxMockado);

    setTimeout(() => {
      expect(validarDocOficialSpy).toHaveBeenCalled();
      done();
    });
  });

  it(`#${DocumentosComercialComponent.prototype.recebeAnexos.name}
  deve receber documento e chamar #alertDocOficialInvalido quando ocr retornar falso `, (done) => {
    fixture.detectChanges();
    let alertDocOficialInvalidoSpy = spyOn(component['_etapaService'], 'alertDocOficialInvalido');
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(false));

    component.recebeAnexos(arquivo, boxMockado);

    setTimeout(() => {
      expect(alertDocOficialInvalidoSpy).toHaveBeenCalled();
      done();
    });
  });

  it(`#${DocumentosComercialComponent.prototype.recebeAnexos.name}
  deve conter Doc Oficial já anexado e emitir #alertSuccess quando chamado`, (done) => {
    fixture.detectChanges();

    //Anexando documento para realizar teste
    component['_etapaService'].uploadDoc(component.perfil, arquivo, boxMockado.docName);
    component['_etapaService'].uploadDoc(component.perfil, arquivo, boxMockado.docName);


    let alertSpy = spyOn(component['_alert'], 'alertSuccess');

    component.recebeAnexos(arquivo, boxMockado);

    setTimeout(() => {
      expect(alertSpy).toHaveBeenCalledWith("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo");
      done();
    });

  });

  it(`#${DocumentosComercialComponent.prototype.recebeAnexos.name}
  deve chamar ${DocumentosComercialComponent.prototype.chamarOcr.name}
  quando anexado no cnpj`, (done) => {
    fixture.detectChanges();
    let chamarOcrSpy = spyOn(component, 'chamarOcr');
    component.recebeAnexos(arquivo, boxCNPJMockado);

    setTimeout(() => {
      expect(chamarOcrSpy).toHaveBeenCalled();
      done();
    })
  });

  it(`#${DocumentosComercialComponent.prototype.recebeAnexos.name}
  deve chamar #verificarAnexacaoComum quando anexado no sem ocr o BoxAnexo`, (done) => {
    fixture.detectChanges();
    let verificarAnexacaoComumSpy = spyOn(component['_etapaService'], 'verificarAnexacaoComum');
    component.recebeAnexos(arquivo, boxCCTMockado);

    setTimeout(() => {
      expect(verificarAnexacaoComumSpy).toHaveBeenCalled();
      done();
    })
  });



  it(`${DocumentosComercialComponent.prototype.chamarOcr.name}
  deve retornar false em data quando o arquivo não passar no OCR`, (done) => {
    fixture.detectChanges();

    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(false));

    let alertDocumentosInvalidosSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');

    component.chamarOcr(arquivo, boxMockado);

    setTimeout(() => {
      expect(alertDocumentosInvalidosSpy).toHaveBeenCalled();
      done();
    });

  });

  it(`${DocumentosComercialComponent.prototype.chamarOcr.name}
  deve chamar #${DocumentosComercialComponent.prototype.lerOcr.name}
  quando chamado`, (done) => {
    fixture.detectChanges();

    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(dataOcrCNH.COMPLETO));

    let lerOcrSpy = spyOn(component, 'lerOcr');

    component.chamarOcr(arquivo, boxMockado);

    setTimeout(() => {
      expect(lerOcrSpy).toHaveBeenCalled();
      done();
    });

  });


  it(`${DocumentosComercialComponent.prototype.lerOcr.name}
  deve chamar #${DocumentosComercialComponent.prototype.validarCNPJ.name} quando for CNPJ`, (done) => {
    fixture.detectChanges();

    let validarCNPJSpy = spyOn(component, 'validarCNPJ');

    component.lerOcr(dataOcrCNPJMockado.VALIDO, arquivo, boxCNPJMockado);

    setTimeout(() => {
      expect(validarCNPJSpy).toHaveBeenCalledWith(dataOcrCNPJMockado.VALIDO, arquivo, boxCNPJMockado);
      done();
    });

  });

  it(`${DocumentosComercialComponent.prototype.lerOcr.name}
  deve chamar #${DocumentosComercialComponent.prototype.validarCNPJ.name} quando for Doc Oficial`, (done) => {
    fixture.detectChanges();

    let alertDocumentosInvalidosSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');

    component.lerOcr(dataOcrRGMockado.COMPLETO, arquivo, boxMockado);

    setTimeout(() => {
      expect(alertDocumentosInvalidosSpy).toHaveBeenCalled()
      done();
    });

  });

  // it(`#${DocumentosComercialComponent.prototype.validarCNPJ.name}
  // deve chanar #uploadDoc quando cnpj for válido`, (done) => {
  //   fixture.detectChanges();
  //   component['_userService'].sessionUser = sessionUserCNPJMockado;
  //   let uploadSpy = spyOn(component['_etapaService'], 'uploadDoc');
  //   fixture.detectChanges();
  //   component.validarCNPJ(dataOcrCNPJMockado.VALIDO, arquivo, boxCNPJMockado);
  //   setTimeout(() => {
  //     expect(uploadSpy).toHaveBeenCalled();
  //     done();
  //   });
  // });

  it(`#${DocumentosComercialComponent.prototype.validarCNPJ.name}
  deve chamar alerta de documentos e realizar o upload do documento`, (done) => {
    fixture.detectChanges();
    component['_userService'].sessionUser = sessionUserCNPJMockado;
    let alertSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos').and.returnValue(true);
    let uploadSpy = spyOn(component['_etapaService'], 'uploadDoc');
    component.validarCNPJ(dataOcrCNPJMockado.INVALIDO, arquivo, boxCNPJMockado);

    expect(alertSpy).toHaveBeenCalled();
    expect(uploadSpy).toHaveBeenCalled();
    done();
  });










  it(`#${DocumentosComercialComponent.prototype.remove.name}
  deve chamar #removeDocOficial quando for documento oficial`, (done) => {
    fixture.detectChanges();
    component['_etapaService'].uploadDoc(component.perfil, arquivo, boxMockado.docName);
    let removeDocOficialSpy = spyOn(component['_etapaService'], 'removeDocOficial');
    component.remove(0, boxMockado.docName)

    setTimeout(() => {
      expect(removeDocOficialSpy).toHaveBeenCalledWith(component.perfil, 0, boxMockado.docName, false);
      done();
    })

  });

  it(`#${DocumentosComercialComponent.prototype.remove.name}
  deve remover arquivo do array pelo index quando chamado`, () => {
    fixture.detectChanges();
    component.dados[component.perfil].anexos[boxCNPJMockado.docName].arquivos.push(arquivo);

    component.remove(0, boxCNPJMockado.docName);

    expect(component.dados[component.perfil].anexos[boxCNPJMockado.docName].arquivos.length).toBe(0);
  });

  it(`#${DocumentosComercialComponent.prototype.voltar.name}
  deve voltar página quando chamado `, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`#${DocumentosComercialComponent.prototype.continuar.name}
  deve redirecionar para prepare-se-para-selfie quando todos documento estiverem anexados`, (done) => {
    fixture.detectChanges();

    component['_userService'].sessionUser = sessionUserCNPJMockado;
    //Anexando Doc. Oficial
    component['_etapaService'].uploadDoc(component.perfil, arquivo, boxMockado.docName);
    component['_etapaService'].uploadDoc(component.perfil, arquivo, boxMockado.docName);
    //Anexando cnpj
    component.dados[component.perfil].anexos[boxCNPJMockado.docName].arquivos.push(arquivo);
    //Anexando CCT Social ou CCMEI
    component.dados[component.perfil].anexos[boxCCTMockado.docName].arquivos.push(arquivo);


    let routerSpy = spyOn(router, 'navigate');


    component.continuar();

    setTimeout(() => {
      expect(routerSpy).toHaveBeenCalledWith(['/ligacao-nova/documentos/prepare-se-para-selfie']);
      done();
    });
  });




  it(`#${DocumentosComercialComponent.prototype.continuar.name}
  deve chamar #alertWarning quando não estiver anexado CNPJ`, (done) => {
    fixture.detectChanges();
    //Mockando sessionUser
    component['_userService'].sessionUser = sessionUserCNPJMockado;
    //Anexando Doc. Oficial
    component['_etapaService'].uploadDoc(component.perfil, arquivo, boxMockado.docName);
    component['_etapaService'].uploadDoc(component.perfil, arquivo, boxMockado.docName);
    //Anexando CCT Social ou CCMEI
    component.dados[component.perfil].anexos[boxCCTMockado.docName].arquivos.push(arquivo);


    let alertSpy = spyOn(component['_alert'], 'alertWarning');


    component.continuar();

    setTimeout(() => {
      expect(alertSpy).toHaveBeenCalledWith("POR FAVOR, ENVIE TODOS OS DOCUMENTOS");
      done();
    });
  });


  it(`#${DocumentosComercialComponent.prototype.continuar.name}
  deve chamar #alertNecessarioDocOficial quando não for anexado Doc. Oficial`, (done) => {
    fixture.detectChanges();
    //Mockando sessionUser
    component['_userService'].sessionUser = sessionUserCNPJMockado;

    //Anexando CCT Social ou CCMEI
    component.dados[component.perfil].anexos[boxCCTMockado.docName].arquivos.push(arquivo);


    let alertSpy = spyOn(component['_etapaService'], 'alertNecessarioDocOficial');


    component.continuar();

    setTimeout(() => {
      expect(alertSpy).toHaveBeenCalledWith(component.perfil, false);
      done();
    });
  });



});
