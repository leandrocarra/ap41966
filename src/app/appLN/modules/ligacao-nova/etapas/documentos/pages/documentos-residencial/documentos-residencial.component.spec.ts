import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { BoxAnexo } from '../../../../../../core/models/documentos/box-anexo/box-anexo';
import { AttachedFileModule } from '../../../../../../shared/components/attached-file/attached-file.module';
import { BoxFileModule } from '../../../../../../shared/components/box-file/box-file.module';
import { DocumentosResidencialComponent } from './documentos-residencial.component';

describe(DocumentosResidencialComponent.name, () => {
  let component: DocumentosResidencialComponent;
  let fixture: ComponentFixture<DocumentosResidencialComponent>;
  let location: Location;
  let router: Router;

  //Mocks
  let arquivoMockado = new Anexo('.pdf', 'DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)', 322408, 'JVBERi0xLjMNCiXi48');

  let boxDocOficialMockado = new BoxAnexo("DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)", true, "Doc Oficial");

  let cnhMockado = require('src/app/appLN/shared/mock/responses/response-ocr-cnh.json');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentosResidencialComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        AttachedFileModule,
        BoxFileModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosResidencialComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it(`Deve criar o component ${DocumentosResidencialComponent.name} quando criado`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${DocumentosResidencialComponent.prototype.onResize.name}
  deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${DocumentosResidencialComponent.prototype.recebeAnexos.name}
  deve anexar 'Doc Oficial' inválido  e chamar #alertDocOficialInvalido`, (done) => {
    fixture.detectChanges();
    component.mobile = false;
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(false));
    let alertDocumentoInvalidoSpy = spyOn(component['_etapaService'], 'alertDocOficialInvalido');
    component.recebeAnexos(arquivoMockado, boxDocOficialMockado);

    setTimeout(() => {
      expect(alertDocumentoInvalidoSpy).toHaveBeenCalledWith(component.mobile, 'residencial');
      done();
    });
  });

  it(`Deve anexar 'Doc Oficial' válido  e chamar #validarDocOficial quando #${DocumentosResidencialComponent.prototype.recebeAnexos.name} for chamado `, (done) => {
    fixture.detectChanges();
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(cnhMockado.COMPLETO));
    let validarDocOficialSpy = spyOn(component['_etapaService'], 'validarDocOficial');
    component.recebeAnexos(arquivoMockado, boxDocOficialMockado);

    setTimeout(() => {
      expect(validarDocOficialSpy).toHaveBeenCalled();
      done();
    });
  });

  it(`#${DocumentosResidencialComponent.prototype.recebeAnexos.name}
  deve chamar #alertSuccess quando quantidade de documento já estiver anexado e com a quantidade máxima`, (done) => {
    fixture.detectChanges();
    spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(cnhMockado.COMPLETO));
    let alertSpy = spyOn(component['_alert'], 'alertSuccess');

    for (let quantidadeDeAnexos: number = 0; quantidadeDeAnexos < 3; quantidadeDeAnexos++) {
      component['_etapaService'].uploadDoc('residencial', arquivoMockado, 'Doc Oficial');
    }

    component.recebeAnexos(arquivoMockado, boxDocOficialMockado);

    setTimeout(() => {
      expect(alertSpy).toHaveBeenCalledWith("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo");
      done();
    });
  });

  it(`#${DocumentosResidencialComponent.prototype.remove.name}
  deve remover documento pelo index quando passado por parametro`, () => {
    fixture.detectChanges();
    component['_etapaService'].uploadDoc('residencial', arquivoMockado, 'Doc Oficial');
    component.remove(0, 'Doc Oficial');
    expect(component.dados['residencial'].anexos['Doc Oficial'].arquivos.length).toBe(0);
  });

  it(`#${DocumentosResidencialComponent.prototype.voltar.name}
  deve chamar a função de voltar e location ser chamado`, fakeAsync(() => {
    component.voltar();
    expect(location.back).toBeDefined();
  }));


  it(`#${DocumentosResidencialComponent.prototype.continuar.name} deve redirecionar para preparação de selfie quando tiver quantidade de documentos necessário`, (done) => {
    fixture.detectChanges();

    component['_etapaService'].uploadDoc('residencial', arquivoMockado, 'Doc Oficial');
    component['_etapaService'].uploadDoc('residencial', arquivoMockado, 'Doc Oficial');

    let routerSpy = spyOn(router, 'navigate');
    component.continuar();

    setTimeout(() => {
      expect(routerSpy).toHaveBeenCalledWith(['/ligacao-nova/documentos/prepare-se-para-selfie']);
      done();
    });
  });

  it(`#${DocumentosResidencialComponent.prototype.continuar.name} deve chamar #${DocumentosResidencialComponent.prototype.continuar.name} quando tiver menos documentos que o necessário`, (done) => {
    fixture.detectChanges();
    let alertDocsNecessariosSpy = spyOn(component['_etapaService'], 'alertNecessarioDocOficial');
    component.continuar();

    setTimeout(() => {
      expect(alertDocsNecessariosSpy).toHaveBeenCalledWith('residencial', false);
      done();
    });
  });



});
