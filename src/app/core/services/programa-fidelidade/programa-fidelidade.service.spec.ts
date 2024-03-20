import { TestBed } from '@angular/core/testing';

import { ProgramaFidelidadeService } from './programa-fidelidade.service';

describe('ProgramaFidelidadeService', () => {
  let service: ProgramaFidelidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramaFidelidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
