import { TestBed } from '@angular/core/testing';

import { CadastroGuardGuard } from './cadastro.guard';

describe('CadastroGuardGuard', () => {
  let guard: CadastroGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CadastroGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
