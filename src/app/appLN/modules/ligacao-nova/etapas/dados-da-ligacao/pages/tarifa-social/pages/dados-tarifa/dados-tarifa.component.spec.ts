import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMaskModule } from 'ngx-mask';
import { CustomSweetAlertService } from '../../../../../../../../core/services/sweet-alert/custom-sweet-alert.service';
import { AttachedFileModule } from '../../../../../../../../shared/components/attached-file/attached-file.module';
import { BoxFileModule } from '../../../../../../../../shared/components/box-file/box-file.module';
import { NeoSharedModule } from '../../../../../../../../shared/shared.module';
import { SweetAlertResult } from 'sweetalert2';
import { DadosTarifaComponent } from './dados-tarifa.component';

describe(DadosTarifaComponent.name, () => {
  let component: DadosTarifaComponent;
  let fixture: ComponentFixture<DadosTarifaComponent>;
  let router: Router;
  let location: Location;

  //Mocks
  let arquivo = { fileData: 'JVBERi0xLjMNCiXi48', fileExtension: '.pdf', fileName: 'DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)', fileSize: 322408 }

  let boxDocOficial = { label: 'JVBERi0xLjMNCiXi48', ocr: true, docName: 'Doc Oficial' }

  let boxDocV7 = { label: 'JVBERi0xLjMNCiXi48', ocr: true, docName: 'Folha V7' }



  let boxDocCartaInss = { label: 'JVBERi0xLjMNCiXi48', ocr: true, docName: 'Carta INSS' }

  let boxInvalid = { label: 'JVBERi0xLjMNCiXi48', ocr: true, docName: 'Invalid' }

  let dataOcrRG = require('src/app/appLN/shared/mock/responses/response-ocr-rg-completo.json');

  let dataOcrFolhaV7 = require('src/app/appLN/shared/mock/responses/response-ocr-folha-v7.json');

  let dataOcrCartaInss = require('src/app/appLN/shared/mock/responses/response-ocr-carta-inss.json')

  let sessionUserMockado = require('src/app/appLN/shared/mock/responses/response-session-user-cpf.json');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DadosTarifaComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatOptionModule,
        AttachedFileModule,
        BoxFileModule,
        MatCheckboxModule,
        NeoSharedModule,
        NgxMaskModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosTarifaComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });


  it(`Deve instanciar ${DadosTarifaComponent.name} quando iniciado fluxo de vida do angular`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it(`#${DadosTarifaComponent.prototype.onResize.name}
  deve setar variável mobile como verdadeiro quando o resize da
  tela for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });


  it(`#${DadosTarifaComponent.prototype.redirecionamento.name}
  deve ser chamado quando redirecionar o doc`, () => {
    fixture.detectChanges();
    let docTest = 'doc test'
    component.redirecionamento(docTest);
    expect(docTest).toEqual('doc test');
  });


  it(`#${DadosTarifaComponent.prototype.formTitularTarifaSocialValidado.name}
  deve ser chamado quando for verificar se o formulario ta valido`, () => {
    fixture.detectChanges();
    component.formTitularTarifaSocialValidado(true);
    expect(component.validarFormTitular).toBe(true);
  });



  // it(`#${DadosTarifaComponent.prototype.setForm.name}
  // deve setar disabledForm como true quando não for titular e necessario validar
  // formulários `, () => {
  //   fixture.detectChanges();
  //   component.titular = false;
  //   component.validarFormTitular = true;
  //   component.validarFormDadosBeneficio = true;
  //   component.setForm();
  //   expect(component.disabledForm).toBeTrue();
  // });

  // it(`#${DadosTarifaComponent.prototype.setForm.name}
  // deve setar disabledForm como false quando não for titular e não for necessario validar
  // formulários `, () => {
  //   fixture.detectChanges();
  //   component.titular = false;
  //   component.validarFormTitular = false;
  //   component.validarFormDadosBeneficio = false;
  //   component.setForm();
  //   expect(component.disabledForm).toBeFalse();
  // });



  it(`#${DadosTarifaComponent.prototype.alterarTitular.name}
  deve ser chamado quando alterar o titular sem arquivo anexado`, fakeAsync(() => {
    fixture.detectChanges();
    component.titular = true;
    component['_tarifaSocialService']['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.beneficio = 'PROGRAMA SOCIAL DO GOVERNO';
    component.alterarTitular();
    tick();
    expect(component.alterarTitular).toBeDefined();
  }));

  it(`#${DadosTarifaComponent.prototype.alterarTitular.name}
  deve ser chamado quando alterar o titular com arquivo anexado`, fakeAsync(() => {
    fixture.detectChanges();
    component.titular = true;
    component['_tarifaSocialService']['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.beneficio = 'PROGRAMA SOCIAL DO GOVERNO';
    component.anexos['Folha V7'].arquivos.push(arquivo);
    component.alterarTitular();
    tick();
    expect(component.alterarTitular).toBeDefined();
  }));



  it(`#${DadosTarifaComponent.prototype.editarDados.name}
  deve chamar alerta e chamar #${DadosTarifaComponent.prototype.editarDados.name} quando chamado a função`, (done) => {

    let resetFormSpy = spyOn(component, 'resetForm');
    spyOn(component['_alert'], 'alertEditarDadosTarifaSocial').and.returnValue(Promise.resolve<any>({
      "dismiss": "cancel"
    }))
    fixture.detectChanges();
    component.editarDados();
    setTimeout(() => {
      expect(resetFormSpy).toHaveBeenCalled();
      done();
    });
  });

  it(`#${DadosTarifaComponent.prototype.resetForm.name}
  deve setar os arrays para vazio`, fakeAsync(() => {
    fixture.detectChanges();
    component.titular = false;
    component['_tarifaSocialService']['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.beneficio = 'PROGRAMA SOCIAL DO GOVERNO';
    component.docsNecessarios = component['_tarifaSocialService'].getDocumentosNecessiaros(component.titular);
    component.anexos['Doc Oficial'].arquivos.push(arquivo);
    component.resetForm();
    tick();
    expect(component.anexos['Doc Oficial'].arquivos.length).toBe(0);
  }));



  it(`#${DadosTarifaComponent.prototype.valorEscolhidoKit.name}
  deve ser chamado quando solicitar kit`, () => {
    fixture.detectChanges();
    component.solicitarKit = true;
    component['_tarifaSocialService'].setSolicitarKit = component.solicitarKit;
    component.valorEscolhidoKit();
    expect(component.solicitarKit).toEqual(true);
  });



  it(`#${DadosTarifaComponent.prototype.anexarDocumento.name}
  deve ser chamado quando anexa o documento`, () => {
    fixture.detectChanges();
    component.anexarDocumento(arquivo, boxDocOficial);
    expect(component.anexarDocumento(arquivo, boxDocOficial)).toBe();
  });



  it(`#${DadosTarifaComponent.prototype.anexar.name}
  deve ser chamado quando verifica o documento anexado doc oficial`, () => {
    fixture.detectChanges();
    component.anexar(arquivo, boxDocOficial);
    expect(component.anexar(arquivo, boxDocOficial)).toBe();
  });

  it(`#${DadosTarifaComponent.prototype.anexar.name}
  deve ser chamado quando verifica o documento anexado doc oficial`, () => {
    fixture.detectChanges();
    component.formDadosBeneficioValidado(true);
    component.anexos['Folha V7'].arquivos.push(dataOcrFolhaV7);
    component.anexar(arquivo, boxDocV7);
    expect(component.anexar(arquivo, boxDocV7)).toBe();
  });

  it(`#${DadosTarifaComponent.prototype.anexar.name}
  deve ser chamado quando verifica o documento anexado v7`, () => {
    fixture.detectChanges();
    component.titular = false;
    component.anexar(arquivo, boxDocV7);
    expect(component.anexar(arquivo, boxDocV7)).toBe();
  });

  it(`#${DadosTarifaComponent.prototype.anexar.name}
  deve ser chamado quando verifica o documento anexado Doc Oficial com titular`, () => {
    fixture.detectChanges();
    component.titular = true;
    component.validarFormTitular = true;
    component.validarFormDadosBeneficio = true;
    component.anexos['Doc Oficial'].arquivos.push(arquivo);
    component.anexar(arquivo, boxDocOficial);
    expect(component.anexar(arquivo, boxDocOficial)).toBe();
  });

  it(`#${DadosTarifaComponent.prototype.anexar.name}
  deve ser chamado quando verifica o documento anexado Doc Oficial com titular
  com quantidade máxima de docs atingida`, () => {
    fixture.detectChanges();
    component.titular = true;
    component.validarFormTitular = true;
    component.validarFormDadosBeneficio = true;
    component.anexos['Doc Oficial'].arquivos.push(arquivo);
    component.anexos['Doc Oficial'].arquivos.push(arquivo);
    component.anexar(arquivo, boxDocOficial);
    expect(component.anexar(arquivo, boxDocOficial)).toBe();
  });

  it(`#${DadosTarifaComponent.prototype.anexar.name}
  deve chamar #verificarAnexacaoComum`, (done) => {
    let boxDocCartaInssSemOCR = { label: 'JVBERi0xLjMNCiXi48', ocr: false, docName: 'Carta INSS' }

    spyOn(component, 'verificarAnexo').and.returnValue(true);
    spyOn(component, 'verificarDocComFoto').and.returnValue(true);

    let anexoSpy = spyOn(component['_documentosService'], 'verificarAnexacaoComum');
    fixture.detectChanges();
    component.anexos['Carta INSS'].arquivos.push(dataOcrFolhaV7);
    component.anexos['Carta INSS'].arquivos.push(dataOcrFolhaV7);

    component.anexar(dataOcrFolhaV7, boxDocCartaInssSemOCR);


    setTimeout(() => {
      expect(anexoSpy).toHaveBeenCalled();
      done();
    });

  });



  it(`#${DadosTarifaComponent.prototype.remove.name}
  deve chamar #alertaDeleteArquivo e remover Doc. Oficial
  quando resetDados for falso`, (done) => {
    fixture.detectChanges();
    //Mockando valor retornado alerta
    spyOn(component['_alert'], 'alertDeleteArquivo').and.returnValue(Promise.resolve<SweetAlertResult>({
      "value": true
    }));

    let removeDocOficialSpy = spyOn(component['_documentosService'], 'removeDocOficial');

    component.anexos['Doc Oficial'].arquivos.push(arquivo);
    component.resetDados = false;
    component.remove(0, boxDocOficial);

    setTimeout(() => {
      expect(removeDocOficialSpy).toHaveBeenCalled();
      done();
    });
  });

  it(`#${DadosTarifaComponent.prototype.remove.name}
  deve chamar #alertaDeleteArquivo e remover folha v7
  quando resetDados for falso`, (done) => {
    fixture.detectChanges();
    //Mockando valor retornado alerta
    spyOn(component['_alert'], 'alertDeleteArquivo').and.returnValue(Promise.resolve<SweetAlertResult>({
      "value": true
    }));

    component.anexos['Folha V7'].arquivos.push(arquivo);
    component.resetDados = false;
    component.remove(0, boxDocV7);

    setTimeout(() => {
      expect(component.anexos['Folha V7'].arquivos.length).toBe(0);
      done();
    });
  });

  it(`#${DadosTarifaComponent.prototype.remove.name}
  deve remover doc oficial quando chamado e resetDados for verdadeiro`, (done) => {
    fixture.detectChanges();
    spyOn(component['_alert'], 'alertDeleteArquivo').and.returnValue(Promise.resolve<any>({
      "dismiss": "cancel"
    }));
    let docsSpy = spyOn(component['_documentosService'], 'removeDocOficial');
    component.resetDados = true;
    component.anexos['Doc Oficial'].arquivos.push(arquivo);
    component.remove(0, boxDocOficial);

    setTimeout(() => {
      expect(docsSpy).toHaveBeenCalled();
      done();
    })
  });

  it(`#${DadosTarifaComponent.prototype.remove.name}
  deve remover doc oficial quando chamado e resetDados for verdadeiro`, (done) => {
    fixture.detectChanges();
    component.resetDados = true;
    component.anexos['Folha V7'].arquivos.push(arquivo);
    component.remove(0, boxDocV7);

    setTimeout(() => {
      expect(component.anexos['Folha V7'].arquivos.length).toBe(0);
      done();
    })
  });



  it(`#${DadosTarifaComponent.prototype.verificarAnexo.name}
  deve ser chamado quando for verificar o anexo sendo titular
  e sem validação do formulário de beneficio`, (done) => {
    component.titular = true;
    component.validarFormDadosBeneficio = false;
    fixture.detectChanges();
    let alertSpy = spyOn(component['_alert'], 'alertInfo');
    component.verificarAnexo();


    setTimeout(() => {
      expect(alertSpy).toHaveBeenCalledWith("Antes de carregar o documento, preencha todos os campos acima.");
      done();
    });

  });

  it(`#${DadosTarifaComponent.prototype.verificarAnexo.name}
  deve chamar alerta quando titular for falso`, (done) => {
    component.titular = false;
    component.validarFormDadosBeneficio = true;
    fixture.detectChanges();
    let alertSpy = spyOn(component['_alert'], 'alertInfo');
    component.verificarAnexo();


    setTimeout(() => {
      expect(alertSpy).toHaveBeenCalledWith("Antes de carregar o documento, preencha todos os campos acima.");
      done();
    });

  });



  it(`#${DadosTarifaComponent.prototype.verificarDocComFoto.name}
  deve ser chamado quando for verificar doc com foto sem folha v7`, () => {
    fixture.detectChanges();
    component.anexos['Doc Oficial'].docsSuficientes = false;
    spyOn(component['_alert'], 'alertEnviarDocOficial').and.returnValue(Promise.resolve<SweetAlertResult>({
      "value": true
    }));
    component.titular = false;
    fixture.detectChanges()
    expect(component.verificarDocComFoto('Folha V7')).toBeFalse();
  });

  // it(`#${DadosTarifaComponent.prototype.verificarDocComFoto.name}
  // deve ser chamado quando for verificar o documento do tipo Folha V7 e
  // Carta INSS`, fakeAsync(() => {
  //   fixture.detectChanges();
  //   component.titular = false;
  //   component.anexos['Doc Oficial'] = [];
  //   component.verificarDocComFoto('Folha V7');
  //   tick();
  //   expect(component.verificarDocComFoto).toBeDefined();
  // }));



  // it(`#${DadosTarifaComponent.prototype.chamarOCR.name}
  // deve ser chamado quando recebe o arquivo e valida ocr
  // resultando em validação falsa`, fakeAsync(() => {
  //   fixture.detectChanges();
  //   spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(false));
  //   let anexarDocumentoSpy = spyOn(component, 'anexarDocumento');
  //   component.chamarOCR(arquivo, boxDocOficial);
  //   tick();
  //   expect(anexarDocumentoSpy).toHaveBeenCalled();
  // }));


  it(`#${DadosTarifaComponent.prototype.chamarOCR.name}
  deve ser chamado quando recebe o arquivo e valida ocr
  resultando em validação verdadeira para Doc Oficial`, fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(dataOcrRG.COMPLETO));
    component.chamarOCR(arquivo, boxDocOficial);
    tick();
    expect(component.chamarOCR).toBeDefined();
  }));

  it(`#${DadosTarifaComponent.prototype.chamarOCR.name}
  deve ser chamado quando recebe o arquivo e valida ocr
  resultando em validação verdadeira para Folha V7`, fakeAsync(() => {
    fixture.detectChanges();
    component['_tarifaSocialService']['_userService'].sessionUser = sessionUserMockado;
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(dataOcrFolhaV7));
    component.chamarOCR(arquivo, boxDocV7);
    tick();
    expect(component.chamarOCR).toBeDefined();
  }));

  it(`#${DadosTarifaComponent.prototype.chamarOCR.name}
  deve ser chamado quando recebe o arquivo e valida ocr
  resultando em validação verdadeira para Carta Inss`, fakeAsync(() => {
    fixture.detectChanges();
    component['_tarifaSocialService']['_userService'].sessionUser = sessionUserMockado;
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(dataOcrCartaInss));
    component.chamarOCR(arquivo, boxDocCartaInss);
    tick();
    expect(component.chamarOCR).toBeDefined();
  }));

  // it(`#${DadosTarifaComponent.prototype.chamarOCR.name}
  // deve ser chamado quando recebe o arquivo e valida ocr
  // resultando em validação verdadeira nome invalido`, fakeAsync(() => {
  //   fixture.detectChanges();
  //   spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(true));
  //   let anexarDocumentoSpy = spyOn(component, 'anexarDocumento');
  //   component.chamarOCR(arquivo, boxInvalid);
  //   tick();
  //   expect(component.chamarOCR).toBeDefined();
  // }));



  it(`#${DadosTarifaComponent.prototype.isDisabled.name}
  deve chamar #${DadosTarifaComponent.prototype.validarBotaoTitular.name}
  fixture.detectChanges();
  quando não tiver kit e for titular`, fakeAsync(() => {
    component.zonaRural = true;
    component.titular = true;
    component.solicitarKit = false;
    let validarBotaoTitularSpy = spyOn(component, 'validarBotaoTitular');
    component.isDisabled();
    tick();
    expect(validarBotaoTitularSpy).toHaveBeenCalled();
  }));

  it(`#${DadosTarifaComponent.prototype.isDisabled.name}
  deve chamar #${DadosTarifaComponent.prototype.validarBotaoNaoTitular.name}
  quando não tiver kit e não for titular`, fakeAsync(() => {
    fixture.detectChanges();
    component.zonaRural = true;
    component.titular = false;
    component.solicitarKit = false;
    let validarBotaoNaoTitularSpy = spyOn(component, 'validarBotaoNaoTitular');
    component.isDisabled();
    tick();
    expect(validarBotaoNaoTitularSpy).toHaveBeenCalled();
  }));

  it(`#${DadosTarifaComponent.prototype.isDisabled.name}
  deve retornar true quando não verificar kit`, fakeAsync(() => {
    fixture.detectChanges();
    component.zonaRural = true;
    component.solicitarKit = null;
    component.isDisabled();
    tick();
    expect(component.isDisabled).toBeDefined();
  }));



  it(`#${DadosTarifaComponent.prototype.validarBotaoTitular.name}
  deve ser chamado quando for verificar o tipo de programa PROGRAMA SOCIAL DO GOVERNO`, () => {
    component.beneficio = 'PROGRAMA SOCIAL DO GOVERNO';
    fixture.detectChanges();
    component.validarBotaoTitular();
    expect(component.beneficio).toEqual('PROGRAMA SOCIAL DO GOVERNO');
  });

  it(`#${DadosTarifaComponent.prototype.validarBotaoTitular.name}
  deve ser chamado quando for verificar o tipo de programa ASSISTÊNCIA MÉDICA DOMICILIAR`, () => {
    component.beneficio = 'ASSISTÊNCIA MÉDICA DOMICILIAR';
    fixture.detectChanges();
    component.validarBotaoTitular();
    expect(component.beneficio).toEqual('ASSISTÊNCIA MÉDICA DOMICILIAR');
  });

  it(`#${DadosTarifaComponent.prototype.validarBotaoTitular.name}
  deve retornar false  quando for verificar o tipo de programa ASSISTÊNCIA MÉDICA DOMICILIAR`, () => {
    component.beneficio = 'ASSISTÊNCIA MÉDICA DOMICILIAR';
    fixture.detectChanges();
    component.anexos['Folha V7'].arquivos.push(dataOcrFolhaV7);
    component.anexos['Ass Medica'].arquivos.push(boxDocCartaInss);
    component.validarBotaoTitular();
    expect(component.beneficio).toEqual('ASSISTÊNCIA MÉDICA DOMICILIAR');
  });

  it(`#${DadosTarifaComponent.prototype.validarBotaoTitular.name}
  deve ser chamado quando for verificar o tipo de programa BENEFÍCIO DE PRESTAÇÃO CONTINUADA`, () => {
    component.beneficio = 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA';
    fixture.detectChanges();
    component.validarBotaoTitular();
    expect(component.beneficio).toEqual('BENEFÍCIO DE PRESTAÇÃO CONTINUADA');
  });

  it(`#${DadosTarifaComponent.prototype.validarBotaoTitular.name}
  deve retornar falso quando for verificar o tipo de programa BENEFÍCIO DE PRESTAÇÃO CONTINUADA`, () => {
    component.beneficio = 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA';
    fixture.detectChanges();
    component.anexos['Carta INSS'].arquivos.push(boxDocCartaInss);
    component.validarBotaoTitular();
    expect(component.beneficio).toEqual('BENEFÍCIO DE PRESTAÇÃO CONTINUADA');
  });



  it(`#${DadosTarifaComponent.prototype.continuar.name}
  deve validar o botão continuar`, () => {
    fixture.detectChanges();
    component.anexos['Doc Oficial'].arquivos.push(dataOcrRG.COMPLETO);
    component.anexos['Folha V7'].arquivos.push(dataOcrFolhaV7);
    component.beneficio = 'PROGRAMA SOCIAL DO GOVERNO';
    component.validarBotaoNaoTitular();
    expect(component.validarBotaoNaoTitular).toBeDefined();
  });

  it(`#${DadosTarifaComponent.prototype.continuar.name}
  deve validar o botão continuar`, () => {
    fixture.detectChanges();
    component.beneficio = 'PROGRAMA SOCIAL DO GOVERNO';
    component.validarBotaoNaoTitular();
    expect(component.validarBotaoNaoTitular).toBeDefined();
  });

  it(`#${DadosTarifaComponent.prototype.continuar.name}
  deve chamar ${CustomSweetAlertService.prototype.confirmacaoTarifaSocial.name} e redirecionar para definir-data quando alert for aceito`, (done) => {
    fixture.detectChanges();
    spyOn(component['_alert'], 'confirmacaoTarifaSocial').and.returnValue(Promise.resolve<SweetAlertResult>({
      "value": true
    }));

    let routerSpy = spyOn(router, 'navigate');
    component.continuar();
    setTimeout(() => {
      expect(routerSpy).toHaveBeenCalledOnceWith(["ligacao-nova", "pagamento", "definir-data"]);
      done();
    });
  });



  it(`#${DadosTarifaComponent.prototype.voltar.name}
  deve voltar a página quando chamado`, fakeAsync(() => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  }));


});
