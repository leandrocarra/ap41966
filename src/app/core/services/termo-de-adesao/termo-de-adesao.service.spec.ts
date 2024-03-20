import { TestBed } from '@angular/core/testing';

import { TermoDeAdesaoService } from './termo-de-adesao.service';

describe('TermoDeAdesaoService', () => {
  let service: TermoDeAdesaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermoDeAdesaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
