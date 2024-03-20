import { TestBed } from '@angular/core/testing';
import { MultiloginCadastroGuard } from './multilogin-cadastro.guard';

describe('CadastroGuardGuard', () => {
  let guard: MultiloginCadastroGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MultiloginCadastroGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
