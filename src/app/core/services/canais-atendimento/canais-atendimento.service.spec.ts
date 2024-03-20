import { TestBed } from '@angular/core/testing';

import { CanaisAtendimentoService } from './canais-atendimento.service';

describe('CanaisAtendimentoService', () => {
  let service: CanaisAtendimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanaisAtendimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
