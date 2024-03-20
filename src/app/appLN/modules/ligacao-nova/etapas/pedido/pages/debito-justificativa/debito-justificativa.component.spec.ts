import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { AttachedFileModule } from '../../../../../../shared/components/attached-file/attached-file.module';
import { BoxFileModule } from '../../../../../../shared/components/box-file/box-file.module';
import { DebitoJustificativaComponent } from './debito-justificativa.component';


describe(DebitoJustificativaComponent.name, () => {
  let component: DebitoJustificativaComponent;
  let fixture: ComponentFixture<DebitoJustificativaComponent>;
  let location: Location;
  let router: Router;

  let comprovanteEnderecoMockado = new Anexo(".jpeg", "Comprovante de Endereço", 337652, "/9j/4AAQSkZJRgABAQEAkACQAAD");
  let comprovantePagamentoMockado = new Anexo(".jpeg", "Comprovante de Pagamento", 337652, "/9j/4AAQSkZJRgABAQEAkACQAAD");
  let enderecoMockado = require('src/app/appLN/shared/mock/responses/response-dados-do-imovel.json');
  let responseComprovanteEnderecoMockado = require('src/app/appLN/shared/mock/responses/response-ocr-comprovante-endereco.json');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebitoJustificativaComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        AttachedFileModule,
        BoxFileModule,
        HttpClientTestingModule
      ]

    })
      .compileComponents();
    fixture = TestBed.createComponent(DebitoJustificativaComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it(`#${DebitoJustificativaComponent.prototype.onResize.name}
  deve ser atribuir verdadeiro para variável mobile quando resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${DebitoJustificativaComponent.prototype.recebeAnexos.name}
  deve chamar #${DebitoJustificativaComponent.prototype.chamaOCR.name} quando for Comprovante de Endereço`, () => {
    fixture.detectChanges();
    let chamaOCRSpy = spyOn(component, 'chamaOCR');

    component.recebeAnexos(comprovanteEnderecoMockado);
    expect(chamaOCRSpy).toHaveBeenCalledWith(comprovanteEnderecoMockado);
  });

  it(`#${DebitoJustificativaComponent.prototype.recebeAnexos.name}
  deve chamar #${DebitoJustificativaComponent.prototype.anexarDocumentoInvalido.name} quando for Comprovante de Pagamento`, () => {
    component['_etapaService'].setJustificativa = "debitoPago";
    fixture.detectChanges();
    let anexarDocumentoInvalidoSpy = spyOn(component, 'anexarDocumentoInvalido');
    component.recebeAnexos(comprovantePagamentoMockado);
    expect(anexarDocumentoInvalidoSpy).toHaveBeenCalledWith(comprovantePagamentoMockado);
  });


  it(`#${DebitoJustificativaComponent.prototype.remove.name}
  deve excluir arquivos anexados quando chamado`, () => {
    fixture.detectChanges();
    component.anexarArquivo(comprovanteEnderecoMockado);
    component.remove(0);
    expect(component.anexos['Comprovante de Endereço'].length).toEqual(0);
  });


  it(`#${DebitoJustificativaComponent.prototype.chamaOCR.name}
  deve chamar #${DebitoJustificativaComponent.prototype.anexarDocumentoInvalido.name} quando data for false`, fakeAsync(() => {
    fixture.detectChanges();
    let anexarDocumentoInvalidoSpy = spyOn(component, 'anexarDocumentoInvalido');
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(false));

    component.chamaOCR(comprovanteEnderecoMockado);
    tick();
    expect(anexarDocumentoInvalidoSpy).toHaveBeenCalledWith(comprovanteEnderecoMockado);
  }));

  it(`#${DebitoJustificativaComponent.prototype.chamaOCR.name}
  deve chamar #${DebitoJustificativaComponent.prototype.anexarDocumentoInvalido.name} quando data for retornado`, fakeAsync(() => {
    fixture.detectChanges();
    let validarComprovanteEnderecoSpy = spyOn(component, 'validarComprovanteEndereco');
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(responseComprovanteEnderecoMockado));

    component.chamaOCR(comprovanteEnderecoMockado);
    tick();
    expect(validarComprovanteEnderecoSpy).toHaveBeenCalledWith(responseComprovanteEnderecoMockado, comprovanteEnderecoMockado);
  }));

  // it(`#${DebitoJustificativaComponent.prototype.anexarDocumentoInvalido.name}
  // deve arquivo e setar comprovanteDebitoValidao para falso quando chamado`, fakeAsync(() => {
  //   fixture.detectChanges();
  //   let anexarSpy = spyOn(component, 'anexarArquivo');
  //   component.anexarDocumentoInvalido(comprovantePagamentoMockado);
  //   tick();
  //   expect(component['_etapaService'].getComprovanteDebitoValidado).toBeFalse();
  //   expect(anexarSpy).toHaveBeenCalledWith(comprovantePagamentoMockado);
  // }));



  it(`#${DebitoJustificativaComponent.prototype.validarComprovanteEndereco.name}
  deve chamar #${DebitoJustificativaComponent.prototype.validarComprovanteEndereco.name}
  quando comprovante de residencia for validado`, () => {
    component['_dadosDoImovelService'].setEndereco = enderecoMockado.URBANO;
    fixture.detectChanges();
    let anexarArquivoSpy = spyOn(component, 'anexarArquivo');
    component.validarComprovanteEndereco(responseComprovanteEnderecoMockado.CORRETO, comprovanteEnderecoMockado);
    expect(anexarArquivoSpy).toHaveBeenCalledWith(comprovanteEnderecoMockado);
  });

  it(`#${DebitoJustificativaComponent.prototype.validarComprovanteEndereco.name}
  deve chamar #${DebitoJustificativaComponent.prototype.anexarDocumentoInvalido.name} quando comprovante de residencia for validado`, () => {
    component['_dadosDoImovelService'].setEndereco = enderecoMockado.DEBITO;
    fixture.detectChanges();
    let anexarDocumentoInvalidoSpy = spyOn(component, 'anexarDocumentoInvalido');
    component.validarComprovanteEndereco(responseComprovanteEnderecoMockado.CORRETO, comprovanteEnderecoMockado);
    expect(anexarDocumentoInvalidoSpy).toHaveBeenCalledWith(comprovanteEnderecoMockado);
  });

  it(`#${DebitoJustificativaComponent.prototype.validarComprovanteEndereco.name}
  deve chamar #${DebitoJustificativaComponent.prototype.anexarDocumentoInvalido.name} quando comprovante de residencia for invalidado`, () => {
    component['_dadosDoImovelService'].setEndereco = enderecoMockado.URBANO;
    fixture.detectChanges();
    let anexarDocumentoInvalidoSpy = spyOn(component, 'anexarDocumentoInvalido');
    component.validarComprovanteEndereco(responseComprovanteEnderecoMockado.INCORRETO, comprovanteEnderecoMockado);

    expect(anexarDocumentoInvalidoSpy).toHaveBeenCalledWith(comprovanteEnderecoMockado);
  });


  // it(`#${DebitoJustificativaComponent.prototype.validarComprovanteEndereco.name}
  // deve chamar  #anexarArquivo, quando o documento for validado`, ()=>{
  //   component['_etapaService'].setComprovanteDebitoValidado = true;
  //   fixture.detectChanges();
  //   let spy = spyOn(component,'anexarArquivo');
  //   component.validarComprovanteEndereco()
  //   expect(spy).toHaveBeenCalled()
  // })




  it(`#${DebitoJustificativaComponent.prototype.voltar.name}
  deve voltar a página quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });


  it(`#${DebitoJustificativaComponent.prototype.continuar.name}
  deve chamar alerta quando não houver anexos em comprovante de pagamento`, () => {
    fixture.detectChanges();
    component.documento = "Comprovante de Pagamento";
    let alertSpy = spyOn(component['_alert'], 'alertWarning');
    component.continuar();
    expect(alertSpy).toHaveBeenCalledWith("É necessário enviar o comprovante de pagamento!");
  });

  it(`#${DebitoJustificativaComponent.prototype.continuar.name}
  deve chamar alerta quando não houver anexos em comprovante de endereço`, () => {
    fixture.detectChanges();
    component.documento = "Comprovante de Endereço";
    let alertSpy = spyOn(component['_alert'], 'alertWarning');
    component.continuar();
    expect(alertSpy).toHaveBeenCalledWith("É necessário enviar o comprovante de endereço!");
  });

  it(`#${DebitoJustificativaComponent.prototype.continuar.name}
  deve rediceionar para documento-posse quando for zona rural
  `, () => {
    component['_etapaService'].setJustificativa = 'debitoPago';
    let enderecoZonaRuralMockado = enderecoMockado;
    enderecoZonaRuralMockado.zonaRural = true;
    component['_dadosDoImovelService'].setEndereco = enderecoZonaRuralMockado;

    let navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();
    component.anexarArquivo(comprovanteEnderecoMockado);
    component.continuar();
    expect(navigateSpy).toHaveBeenCalledWith(["ligacao-nova", "pedido", "documento-posse"]);
  });

  it(`#${DebitoJustificativaComponent.prototype.continuar.name}
  deve rediceionar para selecao-perfil quando não for zona rural
  `, () => {
    component['_etapaService'].setJustificativa = 'naoReconhecoDebito';
    let endereco = enderecoMockado;
    endereco.zonaRural = false;
    component['_dadosDoImovelService'].setEndereco = endereco;
    let navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    component.anexarArquivo(comprovanteEnderecoMockado);
    component.continuar();
    expect(navigateSpy).toHaveBeenCalledWith(["ligacao-nova", "pedido", "selecao-perfil"]);
  });












});
