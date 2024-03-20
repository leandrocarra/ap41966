import { TestBed } from '@angular/core/testing';

import { DenunciaEticaService } from './denuncia-etica.service';

describe('DenunciaEticaService', () => {
  let service: DenunciaEticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenunciaEticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
