import { TestBed } from '@angular/core/testing';

import { ProjetoParticularService } from './projeto-particular.service';

describe('ProjetoParticularService', () => {
  let service: ProjetoParticularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetoParticularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
