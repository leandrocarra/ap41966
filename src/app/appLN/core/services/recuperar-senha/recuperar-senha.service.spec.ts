import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { environmentLN } from '../../../../../environments/environmentsLN/environment';
import { RecuperarSenhaService } from './recuperar-senha.service';


describe(RecuperarSenhaService.name, () => {
  let service: RecuperarSenhaService;
  let httpMock: HttpTestingController;

  let mockValToken = {
    "codigo": '1234',
    "senha": "Desenvolvimento10"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecuperarSenhaService],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule]
    });
    service = TestBed.inject(RecuperarSenhaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it(`#${RecuperarSenhaService.name}
  Deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${RecuperarSenhaService.prototype.resgatarSenha.name}
  deve chamar o serviço para recuperar senha`, () => {
    let expectUrl = `${environmentLN.apiUrl}/v2/usuarios/esqueci-senha`;
    let formRecuperarSenha = new FormGroup({
      documento: new FormControl('00000000000'),
      email: new FormControl('teste@teste.com'),
      tipoEnvioToken: new FormControl('1'),
    });
    if (environmentLN.production) {
      service.resgatarSenha(formRecuperarSenha).subscribe({
        next: value => {
          expect(value).toEqual(null)
        }
      });
      const request = httpMock.expectOne(expectUrl);
      expect(request.request.method).toBe('POST');
    }
  });


  it(`#${RecuperarSenhaService.prototype.validarNovaSenha.name}
  deve chamar o serviço, quando for validar uma nova senha`, () => {
    let expectUrl = `${environmentLN.apiUrl}/v2/usuarios/esqueci-senha-valida`;
    if (environmentLN.production) {
      service.validarNovaSenha(true).subscribe({
        next: value => {
          expect(value).toEqual(null)
        }
      });
      const request = httpMock.expectOne(expectUrl);
      expect(request.request.method).toBe('POST');
    }
  });

});
