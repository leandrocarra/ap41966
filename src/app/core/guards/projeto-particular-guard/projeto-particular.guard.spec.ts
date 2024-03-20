import { TestBed } from '@angular/core/testing';

import { ProjetoParticularGuard } from './projeto-particular.guard';

describe('ProjetoParticularGuard', () => {
  let guard: ProjetoParticularGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProjetoParticularGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
