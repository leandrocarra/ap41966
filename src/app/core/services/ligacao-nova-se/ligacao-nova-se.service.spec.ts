import { TestBed } from '@angular/core/testing';

import { LigacaoNovaSEService } from './ligacao-nova-se.service';

describe('LigacaoNovaService', () => {
  let service: LigacaoNovaSEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigacaoNovaSEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
