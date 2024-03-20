import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TokenService } from '../token/token.service';
import { LoginService } from './login.service';

describe(LoginService.name, () => {
  let service: LoginService;
  let router: Router;

  const tokenServiceSpy = jasmine.createSpyObj(
		'TokenService',
		{
			login: of({
				"access_token": "Poh30FTyOSVw9Y-OCMX-dkmqi_Aw3xIlLboIdiz59w_S13MNtWyhqUXRhZySBHv95mB_uhfXR8EcM06tISfkbfgXJcfDXY2OnpFvj3HdfO3P-iQOe58BRqPUkCWemzBCBiqBu_IqVKM8kmCXxOiK2Wp4pJj2e9BVf8t_AiElQbjvruhJ0AIqd9BkfdoRp9Oz1EW3GUzC04KYrSvSj86TMXfC-YMCD_PsQ1TSEPjnAH0G8uRI0XHk8Dbh-_j8ICZw2s8wRfwXnnUHIjVEyvcMdssr9yUvuWRhHIhwdByvxk-x7xxv6cRkCb9d1jsg4YXW3AM9SCJiG2fIu_ynQS9QSbyDcz0x7K5k48qiZzCQLGQ",
				"token_type": "bearer",
				"expires_in": 7199,
				"refresh_token": "e7df7bf928d741649762bec769ad59c6",
				"as:client_id": "63F6A29E2517447A96AA3C6575112E83",
				"id": "148382",
				".issued": "Mon, 14 Feb 2022 17:19:58 GMT",
				".expires": "Mon, 14 Feb 2022 19:19:58 GMT"
			}),
		});

    let mockToken = {
      "access_token": "Zz4-rUqWHKLrtbAy7M9QNmaZSMtRdno_GI1xvZf-WbrzFQcdFa0JxsswiCC3zUrvHsMisaek5mkpqADHe1zMra6Zd-qN3ekBDg4BYPRb_S-F_wS0oLUeNH9G4t6KCGhGS9UbhSrHYVTZ0pE-oDeX0oq2a82bcmBWYKkymzb7ytg6MqnDEok5GOc1CpY3HzCrFFpx8E598txPiVetCdZmPXZbSa3803ddYqOqMQi9EeRRyFt4gNaD-7q4iRnxMbP-ajCi1EpVYEF-aWisLTp29Kvvub2PDrcHRcVNov70HmWZS4AHTPTba-e6t9Dwvk347fSm1w4nh8IeK0-cQcBlmp2NJONQGurWRtOtrQbb1OQ",
      "token_type": "bearer",
      "expires_in": 7199,
      "refresh_token": "8f238f8342b24189bb2831365bec9910",
      "as:client_id": "FD185FAB7FB849A3AB8E7D82C8BB3FEA",
      "id": "157164",
      ".issued": "Fri, 03 Jun 2022 14:52:49 GMT",
      ".expires": "Fri, 03 Jun 2022 16:52:49 GMT"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule
      ],
      providers:[
        { provide: TokenService, useValue: tokenServiceSpy },
      ]
    });
    service = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it(`#${LoginService.name} 
  deve criar service quando chamado`, () => {
    expect(service).toBeTruthy();
  });

  // it(`#${LoginService.prototype.login.name}
  // deve chamar o serviço de token`, () => {
  //   // spyOn(service['_token'], 'getToken').and.returnValue(of(mockToken));
  //   spyOn(service, 'login').and.returnValue(of(mockToken));
  //   service.login('33991294000110', 'Desenvolvimento10');
  //   // let tokenSpy = spyOn(service['_token'], 'clearStorage');
  //   let tokenSpy = spyOn(service['_token'], 'getToken');
  //   expect(tokenSpy).toHaveBeenCalled();
  //   expect(service['_token'].storage.length).toEqual(0);
  // })

  it(`#${LoginService.prototype.redirectToLogin.name}
  deve direcionar para login`, () => {
    let routerSpy = spyOn(router, 'navigate');
    service.redirectToLogin();
    expect(routerSpy).toHaveBeenCalledWith(['/']);
  });

  it(`#${LoginService.prototype.logout}
  deve realizar logout e apagar o storage`, () => {
    let serviceSpy = spyOn(service,'redirectToLogin');
    service.logout();

    //Apagar dados no storage
    expect(service.storage.length).toEqual(0);

    //Redirecionar para login
    expect(serviceSpy).toHaveBeenCalled();
  });

});
