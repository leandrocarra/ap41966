import { TestBed } from '@angular/core/testing';

import { TrocaTitularidadeService } from './troca-titularidade.service';

describe('TrocaTitularidadeService', () => {
  let service: TrocaTitularidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrocaTitularidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
