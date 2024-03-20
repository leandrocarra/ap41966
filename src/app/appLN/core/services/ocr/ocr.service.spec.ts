import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { OcrService } from './ocr.service';

describe(OcrService.name, () => {
  let service: OcrService;
  let sessionUserCpfMockado = require('src/app/appLN/shared/mock/responses/response-session-user-cpf.json');
  let arquivoMock = {
    "image": "JVBERi0xLjQNJeLjz9",
    "return_deskew_img": false
  }
  let dataMock = require('src/app/appLN/shared/mock/responses/response-ocr-cadesp.json');
  let dataMockUmaTag = require('src/app/appLN/shared/mock/responses/response-ocr-cnh.json')

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OcrService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(OcrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${OcrService.prototype.log.name} deve chamar o servico de log com
  variavel doc vazia, e retornar true`, () => {
    service['_userService'].protocolo = "1234";
    service['_userService'].sessionUser = sessionUserCpfMockado;
    service.log(1, "").subscribe((response) => {
      expect(response).toBeTrue();
    });
  })

  it(`#${OcrService.prototype.log.name} deve chamar o servico de log com
  variavel doc preechido, e retornar true`, () => {
    service['_userService'].protocolo = "1234";
    service['_userService'].sessionUser = sessionUserCpfMockado;
    service.log(1, "DocumentoOficialFoto").subscribe((response) => {
      expect(response).toBeTrue();
    });
  })

  it(`#${OcrService.prototype.ocr.name} deve testar o servico de ocr quando cair em false`, () => {
    spyOn(service, "addFileToOCR").and.returnValue(of(dataMock['VALIDO'].result[0].fields));
    spyOn(service, "log").and.returnValue(of(true));
    // spyOn(service, "ocr").and.returnValue(Promise.resolve<any>(dataMock['VALIDO']));

    let spyAlert = spyOn(service.alert, "closeLoading");

    service.ocr(arquivoMock).then(data => {
      expect(data).toEqual(false);
    })

    // expect(spyAlert).toHaveBeenCalled();
  })

  it(`#${OcrService.prototype.ocr.name} deve testar o servico de ocr quando cair em true com documento
  que possui pelo menos duas tags`, (done) => {
    spyOn(service, "addFileToOCR").and.returnValue(of(dataMock['VALIDO']));
    spyOn(service, "log").and.returnValue(of(true));
    // spyOn(service, "ocr").and.returnValue(Promise.resolve<any>(dataMock['VALIDO']));

    let spyAlert = spyOn(service.alert, "closeLoading");

    service.ocr(arquivoMock).then(data => {
      expect(data).toEqual(dataMock['VALIDO']);
      done()
    })

    // expect(spyAlert).toHaveBeenCalled();
  })

  it(`#${OcrService.prototype.ocr.name} deve testar o servico de ocr quando cair em true com documento
  que possui pelo uma tags`, (done) => {
    spyOn(service, "addFileToOCR").and.returnValue(of(dataMockUmaTag['COMPLETO']));
    spyOn(service, "log").and.returnValue(of(true));
    // spyOn(service, "ocr").and.returnValue(Promise.resolve<any>(dataMock['VALIDO']));

    let spyAlert = spyOn(service.alert, "closeLoading");

    service.ocr(arquivoMock).then(data => {
      expect(data).toEqual(dataMockUmaTag['COMPLETO']);
      done()
    })

    // expect(spyAlert).toHaveBeenCalled();
  })

  // it(`#${OcrService.prototype.compare.name}`, () => {
  //   spyOn(service, "compareFaces").and.returnValue(of());
  //   spyOn(service, "log").and.returnValue(of())


  // })
})
