import { TestBed } from '@angular/core/testing';

import { LigacaoNovaService } from './ligacao-nova.service';

describe('LigacaoNovaService', () => {
  let service: LigacaoNovaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigacaoNovaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
