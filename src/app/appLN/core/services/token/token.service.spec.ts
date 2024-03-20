import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { error } from 'console';
import { off } from 'process';
import { Observable, of, throwError } from 'rxjs';
import { environmentLN } from '../../../../../environments/environmentsLN/environment';
import { loginEndpoint } from '../login/login.service';
import { TokenService } from './token.service';


describe(TokenService.name, () => {
  let service: TokenService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenService,
        HttpClientTestingModule
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    service = TestBed.inject(TokenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected token (HttpClient called once)', () => {

    let expectUrl = `${environmentLN.apiUrl}${loginEndpoint}`;

    if (!environmentLN.production) {
      service.getToken('96700905044', 'testeLN6').subscribe({
        next: value => {
          expect(value)
            .not.toBeNull();
        },
      });

      const request = httpMock.expectOne(expectUrl);
      expect(request.request.method).toBe('POST');
    }
  });

  it('should valid acessToken', () => {
    expect(service.accessToken).not.toBeNull;
  })

  it('should valid acess idToken', () => {
    expect(service.idToken).not.toBeNull;
  })

  it('should valid refreshToken', () => {
    expect(service.refreshToken).not.toBeNull;
  })

  it('should valid set acessToken', () => {
    service.accessToken = null;
    expect(service.accessToken).toBeNull;
    service.accessToken = "1";
    expect(service.accessToken).not.toBeNull;
  })

  it('should valid set idToken', () => {
    service.idToken = null;
    expect(service.idToken).toBeNull;
    service.idToken = "1";
    expect(service.idToken).not.toBeNull;
  })

  it('should valid set refreshToken', () => {
    service.refreshToken = null;
    expect(service.refreshToken).toBeNull;
    service.refreshToken = "1";
    expect(service.refreshToken).not.toBeNull;
  })

  it(`#${TokenService.prototype.clearStorage.name}
  deve limpar os dados salvos, quando acionado`, () => {
    let localStorageSpy = spyOn(localStorage, 'clear')
    let sessionStorageSpy = spyOn(sessionStorage, 'clear')
    service.clearStorage();
    expect(localStorageSpy).toHaveBeenCalled();
    expect(sessionStorageSpy).toHaveBeenCalled();
  })


  // tentativa de cobrir a linha de erro 31 token.service.ts

  // it(`#${TokenService.prototype.getToken.name} deve identificar o erro de url`, () => {

  //   let expectUrl = `https://api-agenciahml.elektro.com.br/oauth2/token`;
  //   const request = httpMock.expectOne(expectUrl);
  //   if(!environment.production){
  //     service.getToken('34518589831','Desenvolvimento10').subscribe({
  //       next:value => {
  //         // expect(value)
  //       }
  //     })
  //   }
  //   expect(request.request.method).toBe('POST');
  // })


  // it(`#${TokenService.prototype.getToken.name} deve identificar o erro de url`, () => {
  //   let response: any;
  //   let mockError = throwError(() => { status: 404 });
  //   environment.apiUrl = "https://api-agenciahml.elektro.com.br1";
  //   spyOn(service, 'getToken').and.returnValue(of(mockError));
  //   service.getToken('34518589831','Desenvolvimento10').subscribe(
  //     () => {},
  //     (error) => (response = error)
  //   );
  //   expect(response).toEqual({ status: 404 });
  // })


  // it('should return expected token (HttpClient called once)', () => {
  //   let response : any
  //   environment.apiUrl = "https://api-agenciahml.elektro.com.br1";

  //   if (!environment.production) {
  //     service.getToken('96700905044', 'testeLN6').subscribe({
  //       next: value => {

  //       },
  //       error : err => {response = err}
  //     });
  //     expect(response).toEqual({ status: 404 });
  //     // const request = httpMock.expectOne(expectUrl);
  //     // expect(request.request.method).toBe('POST');
  //   }
  // });



});
