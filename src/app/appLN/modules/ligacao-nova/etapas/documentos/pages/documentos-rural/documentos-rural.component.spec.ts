import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { BoxAnexo } from '../../../../../../core/models/documentos/box-anexo/box-anexo';
import { AttachedFileModule } from '../../../../../../shared/components/attached-file/attached-file.module';
import { BoxFileModule } from '../../../../../../shared/components/box-file/box-file.module';
import { DocumentosRuralComponent } from './documentos-rural.component';

describe(DocumentosRuralComponent.name, () => {
  let component: DocumentosRuralComponent;
  let fixture: ComponentFixture<DocumentosRuralComponent>;
  let location: Location;
  let router: Router;

  let sessionUserCPF = require('src/app/appLN/shared/mock/responses/response-session-user-cpf.json');
  let sessionUserCNPJ = require('src/app/appLN/shared/mock/responses/response-session-user-cnpj.json');
  let dadosDoImovelMockado = require("src/app/appLN/shared/mock/responses/response-dados-do-imovel.json");

  let responseRG = require('src/app/appLN/shared/mock/responses/response-ocr-rg-completo.json');
  let responseCNPJ = require('src/app/appLN/shared/mock/responses/response-ocr-cnpj.json');
  let responseCCIR = require('src/app/appLN/shared/mock/responses/response-ocr-ccir.json');
  let responsePRONAF = require('src/app/appLN/shared/mock/responses/response-ocr-pronaf.json');
  let responseITR = require('src/app/appLN/shared/mock/responses/response-ocr-itr.json');
  let responseNIRF = require('src/app/appLN/shared/mock/responses/response-ocr-nirf.json');
  let responseINCRA = require('src/app/appLN/shared/mock/responses/response-ocr-incra.json')
  let responseCarteiraDeTrabalhadorRural = require('src/app/appLN/shared/mock/responses/response-ocr-carteira-de-trabalhador-rural.json');

  let subperfilMockado = require('src/app/appLN/shared/mock/preenchimentos/selecao-subperfil.json');

  let arquivo: Anexo = new Anexo('.pdf', 'DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)', 322408, 'JVBERi0xLjMNCiXi48');
  let boxDocOficial = new BoxAnexo("DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)", true, "Doc Oficial");
  let boxCNPJ = new BoxAnexo("CADASTRO NACIONAL DA PESSOA JURÍDICA (CNPJ)", true, "CNPJ");
  let boxDocRural = new BoxAnexo("COMPROVANTE DE ATIVIDADE RURAL", true, "Comp Atividade Rural");
  let boxDocRuralSemOCR = new BoxAnexo("COMPROVANTE DE ATIVIDADE RURAL", false, "Comp Atividade Rural");
  let boxDocRuralResidencialRural = new BoxAnexo("COMPROVANTE DE TRABALHADOR RURAL", true, "Comp Trabalhador Rural");


  let sessionUserCPFInvalido = {
    "codUsuario": 157164,
    "codTipoUsuario": 1,
    "codImobiliaria": 0,
    "nome": "Maria Flavia",
    "documento": "11111111111",
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentosRuralComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        AttachedFileModule,
        BoxFileModule
      ]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosRuralComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('Deve criar o componente quando iniciado o ciclo de vida do Angular', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${DocumentosRuralComponent.prototype.voltar.name}
  deve voltar pagina location quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`#${DocumentosRuralComponent.prototype.onResize.name}
  deve ser atribuir verdadeiro para variável mobile quando resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });


  it(`#${DocumentosRuralComponent.prototype.recebeAnexos.name} deve
  chamar #alertDocOficialInvalido quando retornar false do #ocr`, (done) => {
    component['_userService'].sessionUser = sessionUserCPF;
    let alertSpy = spyOn(component['_etapaService'], 'alertDocOficialInvalido');
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(false));
    fixture.detectChanges();
    component.recebeAnexos(arquivo, boxDocOficial);

    setTimeout(() => {
      expect(alertSpy).toHaveBeenCalled();
      done();
    });
  });

  it(`#${DocumentosRuralComponent.prototype.recebeAnexos.name} deve
  chamar #alertDocOficialInvalido quando retornar resultado da extração do ocr pelo #ocr`, (done) => {
    component['_userService'].sessionUser = sessionUserCPF;
    let validarDocOficialSpy = spyOn(component['_etapaService'], 'validarDocOficial');
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(responseRG.COMPLETO));
    fixture.detectChanges();
    component.recebeAnexos(arquivo, boxDocOficial);
    setTimeout(() => {
      expect(validarDocOficialSpy).toHaveBeenCalled();
      done();
    });
  });

  it(`#${DocumentosRuralComponent.prototype.recebeAnexos.name} deve
  chamar #alertSuccess quando houver documento já anexado`, (done) => {
    component['_userService'].sessionUser = sessionUserCPF;
    let alertSuccessSpy = spyOn(component['_alert'], 'alertSuccess');
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(responseRG.FRENTE));
    fixture.detectChanges();
    component.dados['rural'].anexos['Doc Oficial'].docsSuficientes = true;
    component.recebeAnexos(arquivo, boxDocOficial);

    setTimeout(() => {
      expect(alertSuccessSpy).toHaveBeenCalled();
      done();
    });
  });


  it(`#${DocumentosRuralComponent.prototype.recebeAnexos.name} deve chamar
   #verificarAnexacaoComum quando documento anexado não for doc oficial e o box não tiver OCR`, () => {
    component['_userService'].sessionUser = sessionUserCPF;
    let chamarOcrSpy = spyOn(component['_etapaService'], 'verificarAnexacaoComum');
    fixture.detectChanges();
    component.recebeAnexos(arquivo, boxDocRuralSemOCR);
    expect(chamarOcrSpy).toHaveBeenCalledWith('rural', arquivo, boxDocRuralSemOCR);
  });

  it(`#${DocumentosRuralComponent.prototype.recebeAnexos.name} deve chamar
   #${DocumentosRuralComponent.prototype.chamarOcr.name} quando documento anexado não for doc oficial e o box tiver OCR`, () => {
    component['_userService'].sessionUser = sessionUserCPF;
    let chamarOcrSpy = spyOn(component, 'chamarOcr');
    fixture.detectChanges();
    component.recebeAnexos(arquivo, boxDocRural);
    expect(chamarOcrSpy).toHaveBeenCalledWith(arquivo, boxDocRural);
  });


  it(`#${DocumentosRuralComponent.prototype.alertEnviarDocs.name}
  deve enviar um alert quando for enviar os documentos`, () => {
    fixture.detectChanges();
    let spy = spyOn(component['_alert'], 'alertWarning');
    component.alertEnviarDocs();
    expect(spy).toHaveBeenCalledOnceWith("POR FAVOR, ENVIE TODOS OS DOCUMENTOS");
  });



  it(`#${DocumentosRuralComponent.prototype.validarDocsCPF.name}
  deve retornar false quando for subperfil residencial-rural e não tiver documentos anexados`, () => {
    component.subperfil = 'residencial-rural';
    component.dados['rural'].anexos['Doc Oficial'].docsSuficientes = false;
    component.dados['rural'].anexos['Comp Trabalhador Rural'].arquivos = [];
    fixture.detectChanges();
    expect(component.validarDocsCPF()).toBeFalse();
  });

  it(`#${DocumentosRuralComponent.prototype.validarDocsCPF.name}
  deve retornar true quando for subperfil residencial-rural e tiver documentos anexados`, () => {
    component.subperfil = 'residencial-rural';
    component.dados['rural'].anexos['Doc Oficial'].docsSuficientes = true;
    component.dados['rural'].anexos['Comp Trabalhador Rural'].arquivos.push(arquivo);
    fixture.detectChanges();
    expect(component.validarDocsCPF()).toBeTrue();
  });

  it(`#${DocumentosRuralComponent.prototype.validarDocsCPF.name}
  deve retornar false quando for subperfil diferent de residencial-rural e não tiver documentos anexados`, () => {
    component.subperfil = 'agropecuaria-urbana';
    component.dados['rural'].anexos['Doc Oficial'].docsSuficientes = false;
    component.dados['rural'].anexos['Comp Atividade Rural'].arquivos = [];
    fixture.detectChanges();
    expect(component.validarDocsCPF()).toBeFalse();
  });

  it(`#${DocumentosRuralComponent.prototype.validarDocsCPF.name}
  deve retornar true quando for subperfil diferent de residencial-rural e tiver documentos anexados`, () => {
    component.subperfil = 'agropecuaria-urbana';
    component.dados['rural'].anexos['Doc Oficial'].docsSuficientes = true;
    component.dados['rural'].anexos['Comp Atividade Rural'].arquivos.push(arquivo);
    fixture.detectChanges();
    expect(component.validarDocsCPF()).toBeTrue();
  });



  it(`#${DocumentosRuralComponent.prototype.verificaComprovanteAtividadeRural.name}
  deve setar a variável de validação do doc de comprovante/atividade rural`, () => {
    fixture.detectChanges();
    component.verificaComprovanteAtividadeRural('Comp Atividade Rural', false);
    expect(component['_etapaService'].getCompAtividadeRuralValidado).toBeFalse();
  });



  it(`#${DocumentosRuralComponent.prototype.chamarOcr.name}
  deve chamar #alertDocumentosInvalidos quando ocr retornar false`, fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(false));
    let alertSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');
    component.chamarOcr(arquivo, boxDocOficial);
    tick();
    expect(alertSpy).toHaveBeenCalledWith(component.mobile, 'rural', boxDocOficial.docName, arquivo, false)
  }));

  it(`#${DocumentosRuralComponent.prototype.chamarOcr.name}
  deve chamar #lerOcr quando ocr retornar false`, fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(arquivo));
    let alertSpy = spyOn(component, 'lerOcr');
    component.chamarOcr(arquivo, boxDocOficial);
    tick();
    expect(alertSpy).toHaveBeenCalledWith(arquivo, arquivo, boxDocOficial);
  }));



  it(`#${DocumentosRuralComponent.prototype.lerOcr.name}
  deve anexar o documento quando o número do CNPJ for igual do documento e do usuário e chamar #uploadDoc`, () => {
    let spy = spyOn(component['_etapaService'], 'uploadDoc');
    component.dados['rural'].anexos[boxCNPJ.docName].tentativas = 0;
    component['_userService'].sessionUser = sessionUserCNPJ;
    fixture.detectChanges();
    component.lerOcr(responseCNPJ.VALIDO, arquivo, boxCNPJ);
    expect(spy).toHaveBeenCalledWith('rural', arquivo, boxCNPJ.docName);

  });

  it(`Deve anexar CNPJ inválido, setar cnpj como inválido e anexar documento quando #${DocumentosRuralComponent.prototype.lerOcr.name} for chamado`, (done) => {
    let uploadSpy = spyOn(component['_etapaService'], 'uploadDoc');
    spyOn(component['_etapaService'], 'alertDocumentosInvalidos').and.returnValue(true);
    component['_userService'].sessionUser = sessionUserCNPJ;

    fixture.detectChanges();
    component.lerOcr(responseCNPJ.INVALIDO, arquivo, boxCNPJ);

    setTimeout(() => {
      expect(uploadSpy)
        .withContext('uploadSpy chamado')
        .toHaveBeenCalledWith('rural', arquivo, boxCNPJ.docName);

      expect(component['_etapaService'].getCNPJValidado)
        .withContext('getCNPJValidado')
        .toBeFalse();

      done();
    });
  });

  it(`#${DocumentosRuralComponent.prototype.lerOcr.name} Deve chamar #${DocumentosRuralComponent.prototype.lerComprovanteAtividadeRural.name}
  quando cnpj for anexado em caixas de uploads diferentes de cnpj`, () => {
    let comprovanteSpy = spyOn(component, 'lerComprovanteAtividadeRural');
    fixture.detectChanges();
    component.lerOcr(responseCNPJ.INVALIDO, arquivo, boxDocOficial);
    expect(comprovanteSpy).toHaveBeenCalledOnceWith(responseCNPJ.INVALIDO, arquivo, boxDocOficial);
  });



  it(`#${DocumentosRuralComponent.prototype.lerComprovanteAtividadeRural.name}
  deve chamar o método #alertDocumentosInvalidos ao anexar um doc não reconhecido`, () => {
    let alertDocumentosInvalidosSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');
    component.mobile = false;
    fixture.detectChanges();
    component.subperfil = 'agropecuaria-rural';
    component.lerComprovanteAtividadeRural(responseCNPJ['VALIDO'], arquivo, boxDocRural);
    expect(alertDocumentosInvalidosSpy).toHaveBeenCalledWith(component.mobile, 'rural', boxDocRural.docName, arquivo, false);
  });

  it(`#${DocumentosRuralComponent.prototype.lerComprovanteAtividadeRural.name}
  deve chamar o método #${DocumentosRuralComponent.prototype.validacaoPronaf.name}`, () => {
    let validacaoPronafSpy = spyOn(component, 'validacaoPronaf');
    fixture.detectChanges();
    component.subperfil = 'agropecuaria-rural';
    component.lerComprovanteAtividadeRural(responsePRONAF['VALIDO'], arquivo, boxDocRural);
    expect(validacaoPronafSpy).toHaveBeenCalledWith(responsePRONAF['VALIDO'].result[0], arquivo, boxDocRural);
  });

  it(`#${DocumentosRuralComponent.prototype.lerComprovanteAtividadeRural.name}
  deve chamar o método #${DocumentosRuralComponent.prototype.validacaoItr.name}`, () => {
    let validacaoItrSpy = spyOn(component, 'validacaoItr');
    fixture.detectChanges();
    component.subperfil = 'agropecuaria-rural';
    component.lerComprovanteAtividadeRural(responseITR.VALIDO, arquivo, boxDocRural);
    expect(validacaoItrSpy).toHaveBeenCalledWith(responseITR['VALIDO'].result[0], arquivo, boxDocRural);
  });

  it(`#${DocumentosRuralComponent.prototype.lerComprovanteAtividadeRural.name}
  deve chamar o método #${DocumentosRuralComponent.prototype.validacaoNirf.name}`, () => {
    let validacaoNirfSpy = spyOn(component, 'validacaoNirf');
    fixture.detectChanges();
    component.subperfil = 'agropecuaria-rural';
    component.lerComprovanteAtividadeRural(responseNIRF.VALIDO, arquivo, boxDocRural);
    expect(validacaoNirfSpy).toHaveBeenCalledWith(responseNIRF.VALIDO.result[0], arquivo, boxDocRural);
  });

  it(`#${DocumentosRuralComponent.prototype.lerComprovanteAtividadeRural.name}
  deve chamar o método #${DocumentosRuralComponent.prototype.validacaoINCRA.name} quando tag for 'br-incra-1'`, () => {
    let validaoCcirSpy = spyOn(component, 'validacaoINCRA');
    fixture.detectChanges();
    component.subperfil = 'agropecuaria-rural';
    component.lerComprovanteAtividadeRural(responseINCRA.VALIDO, arquivo, boxDocRural);

    expect(validaoCcirSpy).toHaveBeenCalled();
  });

  it(`#${DocumentosRuralComponent.prototype.lerComprovanteAtividadeRural.name}
  deve chamar o método #${DocumentosRuralComponent.prototype.validacaoCcir.name}`, () => {
    let validaoCcirSpy = spyOn(component, 'validacaoCcir');
    fixture.detectChanges();
    component.subperfil = 'agropecuaria-rural';
    component.lerComprovanteAtividadeRural(responseCCIR.VALIDO, arquivo, boxDocRural);

    expect(validaoCcirSpy).toHaveBeenCalled();
  });

  it(`#${DocumentosRuralComponent.prototype.lerComprovanteAtividadeRural.name}
  deve chamar #${DocumentosRuralComponent.prototype.validacaoCarteiraRural.name} quando perfil
  for 'residencial-rural'`, () => {
    let validacaoSpy = spyOn(component, 'validacaoCarteiraRural');
    fixture.detectChanges();
    component.subperfil = 'residencial-rural';
    component.lerComprovanteAtividadeRural(responseCarteiraDeTrabalhadorRural.VALIDO, arquivo, boxDocRuralResidencialRural);

    expect(validacaoSpy).toHaveBeenCalled();

  });

  it(`#${DocumentosRuralComponent.prototype.lerComprovanteAtividadeRural.name}
  deve chamar #alertDocumentosInvalidos quando subperfil for residencial-rural e nao for 'br-cartrural-1'`, () => {
    let alertDocumentosInvalidosSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');

    fixture.detectChanges();
    component.subperfil = 'residencial-rural';
    component.lerComprovanteAtividadeRural(responseCarteiraDeTrabalhadorRural.INVALIDO, arquivo, boxDocRuralResidencialRural);

    expect(alertDocumentosInvalidosSpy).toHaveBeenCalled();
  });

  it(`#${DocumentosRuralComponent.prototype.lerComprovanteAtividadeRural.name}
  deve chamar #alertDocumentosInvalidos quando subperfil não for `, () => {
    let alertDocumentosInvalidosSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');
    fixture.detectChanges();
    component.subperfil = subperfilMockado.ESCOLA_AGROTECNICA.route;

    component.lerComprovanteAtividadeRural(responseCarteiraDeTrabalhadorRural.VALIDO, arquivo, boxDocRuralResidencialRural);

    expect(alertDocumentosInvalidosSpy).toHaveBeenCalled();
  });



  it(`#${DocumentosRuralComponent.prototype.validacaoPronaf.name}
  deve validar o documento do titular do pronaf com os dados válidos do sessionUser`, (done) => {
    component['_userService'].sessionUser = sessionUserCPF;
    let verificaComprovanteAtividadeRuralSpy = spyOn(component, 'verificaComprovanteAtividadeRural');
    fixture.detectChanges();
    component.validacaoPronaf(responsePRONAF['VALIDO'].result[0], arquivo, boxDocRural);
    setTimeout(() => {
      expect(verificaComprovanteAtividadeRuralSpy).toHaveBeenCalledWith(boxDocRural.docName, true);
      done();
    });
  });

  it(`#${DocumentosRuralComponent.prototype.validacaoPronaf.name}
  deve validar o documento pronaf com os dados diferentes do sessionUser`, () => {
    component['_userService'].sessionUser = sessionUserCPF;
    let alertDocumentosInvalidosSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');
    component.mobile = false
    fixture.detectChanges();
    component.validacaoPronaf(responsePRONAF['INVALIDO'].result[0], arquivo, boxDocRural);
    expect(alertDocumentosInvalidosSpy).toHaveBeenCalledWith(component.mobile, 'rural', boxDocRural.docName, arquivo, false);
  });



  it(`#${DocumentosRuralComponent.prototype.validacaoItr.name}
  deve validar o documento itr com os dados válidos do sessionUser`, () => {
    component['_userService'].sessionUser = sessionUserCPF;
    component['_dadosImovelService'].setEndereco = dadosDoImovelMockado.URBANO;
    let verificaComprovanteAtividadeRuralSpy = spyOn(component, 'verificaComprovanteAtividadeRural');
    fixture.detectChanges();
    component.validacaoItr(responseITR['VALIDO'].result[0], arquivo, boxDocRural);
    expect(verificaComprovanteAtividadeRuralSpy).toHaveBeenCalledWith(boxDocRural.docName, true);
  });

  it(`#${DocumentosRuralComponent.prototype.validacaoItr.name}
  deve validar o documento itr com os dados inválidos do sessionUser com cpf diferente`, () => {
    component['_userService'].sessionUser = sessionUserCPFInvalido;
    component['_dadosImovelService'].setEndereco = dadosDoImovelMockado.URBANO;
    let alertDocumentosInvalidoslSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');
    component.mobile = false;
    fixture.detectChanges();
    component.validacaoItr(responseITR['INVALIDO'].result[0], arquivo, boxDocRural);
    expect(alertDocumentosInvalidoslSpy).toHaveBeenCalledWith(component.mobile, 'rural', boxDocRural.docName, arquivo, false);
  });

  it(`#${DocumentosRuralComponent.prototype.validacaoItr.name}
  deve validar o documento itr com os dados inválidos do sessionUser`, () => {
    component['_userService'].sessionUser = sessionUserCPF;
    component['_dadosImovelService'].setEndereco = dadosDoImovelMockado.URBANO;
    let alertDocumentosInvalidoslSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');
    component.mobile = false;
    fixture.detectChanges();
    component.validacaoItr(responseITR['INVALIDO'].result[0], arquivo, boxDocRural);
    expect(alertDocumentosInvalidoslSpy).toHaveBeenCalledWith(component.mobile, 'rural', boxDocRural.docName, arquivo, false);
  });




  it(`#${DocumentosRuralComponent.prototype.validacaoNirf.name}
  deve validar o documento nirf com os dados válidos do sessionUser`, (done) => {
    component['_userService'].sessionUser = sessionUserCPF;
    component['_dadosImovelService'].setEndereco = dadosDoImovelMockado.URBANO;
    let uploadDocSpy = spyOn(component['_etapaService'], 'uploadDoc');
    fixture.detectChanges();
    component.validacaoNirf(responseNIRF.VALIDO.result[0], arquivo, boxDocRural);
    setTimeout(() => {
      expect(uploadDocSpy).toHaveBeenCalled();
      done();
    });
  });

  it(`#${DocumentosRuralComponent.prototype.validacaoNirf.name}
  deve chamar #alertDocumentosInvalidosSpy quando validar o documento nirf com os dados válidos do sessionUser com cpf diferente`, () => {
    component['_userService'].sessionUser = sessionUserCPFInvalido;
    component['_dadosImovelService'].setEndereco = dadosDoImovelMockado.URBANO;
    let alertDocumentosInvalidosSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');
    component.mobile = false;
    fixture.detectChanges();
    component.validacaoNirf(responseNIRF.INVALIDO.result[0], arquivo, boxDocRural);
    expect(alertDocumentosInvalidosSpy).toHaveBeenCalledWith(component.mobile, 'rural', boxDocRural.docName, arquivo, false);
  });

  it(`#${DocumentosRuralComponent.prototype.validacaoNirf.name}
  deve chamar #alertDocumentosInvalidosSpy quando validar o documento nirf com os dados válidos do sessionUser`, () => {
    component['_userService'].sessionUser = sessionUserCPF;
    component['_dadosImovelService'].setEndereco = dadosDoImovelMockado.URBANO;
    let alertDocumentosInvalidosSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');
    component.mobile = false;
    fixture.detectChanges();
    component.validacaoNirf(responseNIRF.INVALIDO.result[0], arquivo, boxDocRural);
    expect(alertDocumentosInvalidosSpy).toHaveBeenCalledWith(component.mobile, 'rural', boxDocRural.docName, arquivo, false);
  });

  it(`#${DocumentosRuralComponent.prototype.validacaoNirf.name}
  deve chamar #alertDocumentosInvalidos quando validar o documento retornar com data null`, () => {
    component['_userService'].sessionUser = sessionUserCPF;
    component['_dadosImovelService'].setEndereco = dadosDoImovelMockado.URBANO;
    let alertDocumentosInvalidosSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');
    component.mobile = false;
    fixture.detectChanges();
    component.validacaoNirf(responseNIRF.DATA_NULL.result[0], arquivo, boxDocRural);
    expect(alertDocumentosInvalidosSpy).toHaveBeenCalledWith(component.mobile, 'rural', boxDocRural.docName, arquivo, false);
  });



  it(`#${DocumentosRuralComponent.prototype.validacaoCcir.name}
  deve validar o documento ccir com os dados válidos do sessionUser`, (done) => {
    component['_userService'].sessionUser = sessionUserCPF;
    component['_dadosImovelService'].setEndereco = dadosDoImovelMockado.URBANO;
    let uploadDocSpy = spyOn(component['_etapaService'], 'uploadDoc');
    fixture.detectChanges();
    component.validacaoCcir(responseCCIR['VALIDO'].result[0], arquivo, boxDocRural);
    setTimeout(() => {
      expect(uploadDocSpy).toHaveBeenCalledWith('rural', arquivo, boxDocRural.docName);
      done();
    });
  });

  it(`#${DocumentosRuralComponent.prototype.validacaoCcir.name}
  deve validar o documento ccir com os dados inválidos do sessionUser`, () => {
    component['_userService'].sessionUser = sessionUserCPF;
    component['_dadosImovelService'].setEndereco = dadosDoImovelMockado.URBANO;
    let alertDocumentosInvalidosSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');
    component.mobile = false;
    fixture.detectChanges();
    component.validacaoCcir(responseCCIR['INVALIDO'].result[0], arquivo, boxDocRural);
    expect(alertDocumentosInvalidosSpy).toHaveBeenCalledWith(component.mobile, 'rural', boxDocRural.docName, arquivo, false);
  });



  it(`#${DocumentosRuralComponent.prototype.remove.name}
  deve remover o Doc Oficial`, () => {
    component.dados['rural'].anexos['Doc Oficial'].arquivos.push(arquivo);
    fixture.detectChanges();
    component.remove(0, 'Doc Oficial');
    expect(component.dados['rural'].anexos['Doc Oficial'].arquivos.length).toBe(0);
  });

  it(`#${DocumentosRuralComponent.prototype.remove.name}
  deve remover doc de Comp Atividade Rural`, () => {
    component.dados['rural'].anexos['Comp Atividade Rural'].arquivos.push(arquivo);
    fixture.detectChanges();
    component.remove(0, 'Comp Atividade Rural');
    expect(component.dados['rural'].anexos['Comp Atividade Rural'].arquivos.length).toBe(0);
  });



  it(`#${DocumentosRuralComponent.prototype.validacaoINCRA.name} deve anexar o documento
  quando #validacaoINCRA retornar verdadeiro`, () => {
    spyOn(component['_dadosImovelService'], 'validacaoINCRA').and.returnValue(true);
    let uploadDocSpy = spyOn(component['_etapaService'], 'uploadDoc');
    fixture.detectChanges();
    component.validacaoINCRA(responseINCRA.VALIDO.result[0], arquivo, boxDocRuralResidencialRural);
    expect(uploadDocSpy).toHaveBeenCalledWith('rural', arquivo, boxDocRuralResidencialRural.docName);

  });

  // it(`#${DocumentosRuralComponent.prototype.validacaoINCRA.name} deve anexar o documento
  // quando #validacaoINCRA retornar falso`, () => {
  //   spyOn(component['_dadosImovelService'], 'validacaoINCRA').and.returnValue(false);
  //   let uploadDocSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');
  //   fixture.detectChanges();

  //   component.validacaoINCRA(responseINCRA.INVALIDO.result[0], arquivo, boxDocRuralResidencialRural);
  //   expect(uploadDocSpy).toHaveBeenCalledWith(component.mobile, 'rural', boxDocRuralResidencialRural.docName, arquivo);

  // });



  it(`#${DocumentosRuralComponent.prototype.validacaoCarteiraRural.name}
  deve chamar #uploadDoc quando documento for válido`, () => {
    component['_userService'].sessionUser = sessionUserCPF;
    component['_dadosImovelService'].setEndereco = dadosDoImovelMockado.URBANO;

    let uploadDocSpy = spyOn(component['_etapaService'], 'uploadDoc');
    fixture.detectChanges();

    component.validacaoCarteiraRural(responseCarteiraDeTrabalhadorRural.VALIDO.result[0], arquivo, boxDocRuralResidencialRural);

    expect(uploadDocSpy).toHaveBeenCalledWith('rural', arquivo, boxDocRuralResidencialRural.docName);
  });

  // it(`#${DocumentosRuralComponent.prototype.validacaoCarteiraRural.name}
  // deve chamar #alertDocumentosInvalidos quando documento for inválido`, () => {
  //   component['_userService'].sessionUser = sessionUserCPF;
  //   component['_dadosImovelService'].setEndereco = dadosDoImovelMockado.URBANO;

  //   let alertDocumentosInvalidosSpy = spyOn(component['_etapaService'], 'alertDocumentosInvalidos');
  //   fixture.detectChanges();

  //   component.validacaoCarteiraRural(responseCarteiraDeTrabalhadorRural.INVALIDO.result[0], arquivo, boxDocRuralResidencialRural);

  //   expect(alertDocumentosInvalidosSpy).toHaveBeenCalledWith(component.mobile, 'rural', boxDocRuralResidencialRural.docName, arquivo);
  // });



  it(`#${DocumentosRuralComponent.prototype.validarDocsCNPJ.name}
  deve retornar true quando for subperfil agropecuaria-rural`, () => {
    fixture.detectChanges();
    component.subperfil = 'agropecuaria-rural';
    fixture.detectChanges();
    component.dados['rural'].anexos['CNPJ'].arquivos.push(arquivo);
    component.dados['rural'].anexos['CTT Social ou CCMEI'].arquivos.push(arquivo);
    component.dados['rural'].anexos['Comp Atividade Rural'].arquivos.push(arquivo);
    expect(component.validarDocsCNPJ()).toBeTrue();
  });

  it(`#${DocumentosRuralComponent.prototype.validarDocsCNPJ.name}
  deve retornar true quando for subperfil escola-agrotecnica`, () => {
    fixture.detectChanges();
    component.subperfil = 'escola-agrotecnica';
    fixture.detectChanges();
    component.dados['rural'].anexos['CNPJ'].arquivos.push(arquivo);
    component.dados['rural'].anexos['CTT Social ou CCMEI'].arquivos.push(arquivo);
    expect(component.validarDocsCNPJ()).toBeTrue();
  });

  it(`#${DocumentosRuralComponent.prototype.validarDocsCNPJ.name}
  deve retornar true quando for subperfil aquicultor`, () => {
    fixture.detectChanges();
    component.subperfil = 'aquicultor';
    fixture.detectChanges();
    component.dados['rural'].anexos['CNPJ'].arquivos.push(arquivo);
    component.dados['rural'].anexos['CTT Social ou CCMEI'].arquivos.push(arquivo);
    component.dados['rural'].anexos['Comp Atividade Rural'].arquivos.push(arquivo);
    expect(component.validarDocsCNPJ()).toBeTrue();
  });

  it(`#${DocumentosRuralComponent.prototype.validarDocsCNPJ.name}
  deve retornar true quando for subperfil agroindustrial`, () => {
    fixture.detectChanges();
    component.subperfil = 'agroindustrial';
    fixture.detectChanges();
    component.dados['rural'].anexos['CNPJ'].arquivos.push(arquivo);
    component.dados['rural'].anexos['CTT Social ou CCMEI'].arquivos.push(arquivo);
    expect(component.validarDocsCNPJ()).toBeTrue();
  });

  it(`#${DocumentosRuralComponent.prototype.validarDocsCNPJ.name}
  deve retornar true quando for subperfil agropecuaria-urbana`, () => {
    fixture.detectChanges();
    component.subperfil = 'agropecuaria-urbana';
    fixture.detectChanges();
    component.dados['rural'].anexos['CNPJ'].arquivos.push(arquivo);
    component.dados['rural'].anexos['CTT Social ou CCMEI'].arquivos.push(arquivo);
    component.dados['rural'].anexos['Comp Atividade Rural'].arquivos.push(arquivo);
    expect(component.validarDocsCNPJ()).toBeTrue();
  });

  it(`#${DocumentosRuralComponent.prototype.validarDocsCNPJ.name}
  deve retornar true quando for subperfil servico-publico-de-irrigacao`, () => {
    fixture.detectChanges();
    component.subperfil = 'servico-publico-de-irrigacao';
    fixture.detectChanges();
    component.dados['rural'].anexos['CNPJ'].arquivos.push(arquivo);
    component.dados['rural'].anexos['CTT Social ou CCMEI'].arquivos.push(arquivo);
    component.dados['rural'].anexos['Outorga'].arquivos.push(arquivo);
    component.dados['rural'].anexos['Lic Ambiental'].arquivos.push(arquivo);
    expect(component.validarDocsCNPJ()).toBeTrue();
  });

  it(`#${DocumentosRuralComponent.prototype.validarDocsCNPJ.name}
  deve retornar true quando for subperfil irrigante`, () => {
    fixture.detectChanges();
    component.subperfil = 'irrigante';
    fixture.detectChanges();
    component.dados['rural'].anexos['CNPJ'].arquivos.push(arquivo);
    component.dados['rural'].anexos['CTT Social ou CCMEI'].arquivos.push(arquivo);
    component.dados['rural'].anexos['Lic Ambiental'].arquivos.push(arquivo);
    expect(component.validarDocsCNPJ()).toBeTrue();
  });

  it(`#${DocumentosRuralComponent.prototype.validarDocsCNPJ.name}
  deve retornar false quando não tiver subperfil`, () => {
    fixture.detectChanges();
    component.subperfil = '';
    fixture.detectChanges();
    expect(component.validarDocsCNPJ()).toBeFalse();
  });



  it(`#${DocumentosRuralComponent.prototype.continuar.name}
  deve direcionar para tela de preparação da selfie quando usuário for CNPJ`, () => {
    component['_userService'].tipoDocumento = 'CNPJ';
    component.dados['rural'].anexos['Doc Oficial'].docsSuficientes = false;
    component.dados['rural'].anexos['Doc Oficial'].maxAnexos = 1;
    component.dados['rural'].anexos['Doc Oficial'].arquivos.push(arquivo);
    component.subperfil = 'agroindustrial';
    component.dados['rural'].anexos['CNPJ'].arquivos.push(arquivo);
    component.dados['rural'].anexos['CTT Social ou CCMEI'].arquivos.push(arquivo);
    let routerSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    component.continuar();
    expect(routerSpy).toHaveBeenCalledWith(['/ligacao-nova/documentos/prepare-se-para-selfie']);
  });

  it(`#${DocumentosRuralComponent.prototype.continuar.name}
  deve chamar o alert de envio de documentos quando usuário for CNPJ`, () => {
    component['_userService'].tipoDocumento = 'CNPJ';
    component.dados['rural'].anexos['Doc Oficial'].docsSuficientes = true;
    component.subperfil = 'agroindustrial';
    component.dados['rural'].anexos['CNPJ'].arquivos = [];
    let alertEnviarDocsSpy = spyOn(component, 'alertEnviarDocs');
    fixture.detectChanges();
    component.continuar();
    expect(alertEnviarDocsSpy).toHaveBeenCalled();
  });

  it(`#${DocumentosRuralComponent.prototype.continuar.name}
  deve direcionar para tela de preparação da selfie quando usuário for CPF`, () => {
    component['_userService'].tipoDocumento = 'CPF';
    component.subperfil = 'agropecuaria-urbana';
    component.dados['rural'].anexos['Doc Oficial'].docsSuficientes = true;
    component.dados['rural'].anexos['Comp Atividade Rural'].arquivos.push(arquivo);
    let routerSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    component.continuar();
    expect(routerSpy).toHaveBeenCalledWith(['/ligacao-nova/documentos/prepare-se-para-selfie']);
  });

  it(`#${DocumentosRuralComponent.prototype.continuar.name} deve chamar
  #${DocumentosRuralComponent.prototype.alertEnviarDocs.name} quando `, () => {
    let alertSpy = spyOn(component, 'alertEnviarDocs');
    spyOn(component, 'validarDocsCPF').and.returnValue(false);
    fixture.detectChanges();
    component['_userService'].tipoDocumento = 'CPF';
    component.subperfil = 'agropecuaria-urbana';
    component.dados['rural'].anexos['Doc Oficial'].docsSuficientes = true;

    component.continuar();
    expect(alertSpy).toHaveBeenCalled();
  });

  it(`#${DocumentosRuralComponent.prototype.continuar.name} deve chamar
  #alertNecessarioDocOficial quando não for anexado documento oficial`, () => {
    let alertNecessarioDocOficialSpy = spyOn(component['_etapaService'], 'alertNecessarioDocOficial');

    fixture.detectChanges();
    component.continuar();

    expect(alertNecessarioDocOficialSpy).toHaveBeenCalledWith('rural', false);

  })

});
