import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Anexo } from '../../../core/models/anexo/anexo';
import { BoxFileComponent } from './box-file.component';


describe(BoxFileComponent.name, () => {

  let component: BoxFileComponent;
  let fixture: ComponentFixture<BoxFileComponent>;

  let eventFile = {
    'target': {
      'files': [
        {
          'name': "art 1 - samuel.png",
          'size': 208336,
          'type': "image/png"

        }
      ]
    }
  }

  let anexoMockado = require('src/app/appLN/shared/mock/preenchimentos/anexo.json');

  // let anexoPDFMockado = new Anexo('.pdf', 'DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)', 322408, 'JVBERi0xLjMNCiXi48');
  // let anexoJPEGMockado = new Anexo('.jpeg', 'DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)', 322408, 'JVBERi0xLjMNCiXi48');
  // let anexoJPGMockado = new Anexo('.jpg', 'DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)', 322408, 'JVBERi0xLjMNCiXi48');
  // let  = new Anexo('.png', 'DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)', 322408, 'JVBERi0xLjMNCiXi48');
  // let anexoInvalidoMockado = new Anexo('.INV', 'DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)', 322408, 'JVBERi0xLjMNCiXi48');


  let anexoFotoMockado = new Anexo('.jpeg', 'Comprovante de Endereço', 3060, '/9j/4AAQSkZJRgABAQAAAQABAAD');


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxFileComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxFileComponent);
    component = fixture.componentInstance;
  });

  it(`Deve crair o componente quando iniciar ciclo de vida do angular`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${BoxFileComponent.prototype.onResize.name}
  deve setar tela mobile quando chamado com tela menor que 768`, () => {
    fixture.detectChanges();
    let spyOnResize = spyOn(component, 'onResize');
    component.onResize(window.dispatchEvent(new Event('resize')));
    fixture.detectChanges();
    expect(spyOnResize).toHaveBeenCalled();
  });

  it(`#${BoxFileComponent.prototype.add.name} deve chamar
   #alertWarning quando o arquivo for maior que 2.5MB`, (done) => {
    fixture.detectChanges();

    let alertSpy = spyOn(component['_alert'], 'alertWarning');
    spyOn(component, 'checkType').and.returnValue(Promise.resolve(true));
    spyOn(component, 'fileToBase64').and.returnValue(Promise.resolve(gerarBase64Mockado(2560001)));

    component.add(anexoMockado.DOC_MAIOR_2MB);

    setTimeout(() => {
      expect(alertSpy).toHaveBeenCalledWith('Não conseguimos carregar o seu documento! Nos envie um arquivo com tamanho inferior à 2.5MB.');
      done();
    });
  });

  it(`#${BoxFileComponent.prototype.add.name} deve emitir arquivo
  quando o resultado64 for menor que 2.5MB`, (done) => {
    fixture.detectChanges();
    spyOn(component, 'checkType').and.returnValue(Promise.resolve(true));
    spyOn(component, 'fileToBase64').and.returnValue(Promise.resolve(gerarBase64Mockado(250)));

    let emptyFilePathSpy = spyOn(component, 'emptyFilePath');

    component.add(anexoMockado.PNG);
    setTimeout(() => {
      expect(emptyFilePathSpy).toHaveBeenCalled();
      done();
    });
  });

  it(`#${BoxFileComponent.prototype.add.name} deve chamar
  #alertWarningWithText quando o tipo não for valido`, (done) => {
    fixture.detectChanges();
    spyOn(component, 'checkType').and.returnValue(Promise.resolve(false));
    let alertSpy = spyOn(component['_alert'], 'alertWarningWithText');
    component.add(anexoMockado.PNG);

    setTimeout(() => {
      expect(alertSpy).toHaveBeenCalledWith("FORMATO INVÁLIDO", "O documento precisa ser nos formatos .PDF, .JPG, .JPEG ou .PNG");
      done();
    });
  });

  it(`#${BoxFileComponent.prototype.checkType.name}
  deve retornar verdadeiro quando documento anexado for PDF`, () => {
    fixture.detectChanges();

    component.checkType(anexoMockado.PNG.target.files[0]).then(valorRetornado => {
      expect(valorRetornado).toBeTrue();;
    });
  });

  it(`#${BoxFileComponent.prototype.checkType.name}
  deve retornar falso quando documento anexado for invalido`, () => {
    fixture.detectChanges();
    component.checkType(anexoMockado.INVALIDO.target.files[0]).then(valorRetornado => {
      expect(valorRetornado).toBeFalse();
    });
  });

  // it('should create method orgão emissor back', () => {
  //   fixture.detectChanges();
  //   component.fileToBase64(anexoMockado.PDF.target.files[0]).then(
  //     res => {
  //       expect(res).toEqual('');
  //     }
  //   )
  // });

  it(`#${BoxFileComponent.prototype.getType.name}
  deve retornar tipo jpeg quando chamado`, () => {
    fixture.detectChanges();
    expect(component.getType('image/jpeg')).toEqual('.jpeg');
  });

  it(`#${BoxFileComponent.prototype.getType.name}
  deve retornar tipo png quando chamado`, () => {
    fixture.detectChanges();
    expect(component.getType('image/png')).toEqual('.png');
  });

  it(`#${BoxFileComponent.prototype.getType.name}
  deve retornar tipo pdf quando chamado`, () => {
    fixture.detectChanges();
    expect(component.getType('application/pdf')).toEqual('.pdf');
  });

  it(`#${BoxFileComponent.prototype.emptyFilePath.name} deve
  adicionar fileInput e limpar valor variavel quando chamado`, () => {
    let fileInputMockado = {
      "srcElement": {
        "value": "C:/fakepath/doc-anexado.png"
      }
    }
    component.emptyFilePath(fileInputMockado)
    expect(fileInputMockado.srcElement.value).toBe('');
  });


  it(`#${BoxFileComponent.prototype.openDialog.name}
  deve criar anexo quando tiver foto`, (done) => {
    fixture.detectChanges();
    spyOn(component['_dialogTirarFoto'], 'foto').and.returnValue(of(anexoFotoMockado));
    spyOn(component.arquivoAnexado, 'emit');
    component.openDialog();
    setTimeout(() => {
      expect(component.arquivoAnexado.emit).toHaveBeenCalled();
      done();
    })
  });

});


function gerarBase64Mockado(quantidadeCaracteres: number) {
  let base64Mockado = '';
  for (let i = 0; i < quantidadeCaracteres; i++) {
    base64Mockado += 'A';
  }
  return base64Mockado;
}
