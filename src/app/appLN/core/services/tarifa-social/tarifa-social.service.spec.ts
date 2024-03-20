import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TarifaSocialService } from './tarifa-social.service';

describe(TarifaSocialService.name, () => {
  let service: TarifaSocialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TarifaSocialService],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(TarifaSocialService);
  });

  it(`Deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
    expect(service).toBeTruthy();
  });

  
});
