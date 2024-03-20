import { TestBed } from '@angular/core/testing';

import { MultiloginCompartilharAcessoGuard } from './multilogin-compartilhar-acesso.guard';

describe('MultiloginCompartilharAcessoGuard', () => {
  let guard: MultiloginCompartilharAcessoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MultiloginCompartilharAcessoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
