import { TestBed } from '@angular/core/testing';

import { AtendimentoPresencialAgendadoService } from './atendimento-presencial-agendado.service';

describe('AtendimentoPresencialAgendadoService', () => {
  let service: AtendimentoPresencialAgendadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtendimentoPresencialAgendadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
