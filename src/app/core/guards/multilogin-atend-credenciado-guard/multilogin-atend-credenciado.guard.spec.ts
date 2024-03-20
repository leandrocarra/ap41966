import { TestBed } from '@angular/core/testing';

import { MultiloginAtendCredenciadoGuard } from './multilogin-atend-credenciado.guard';

describe('MultiloginAtendCredenciadoGuardGuard', () => {
  let guard: MultiloginAtendCredenciadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MultiloginAtendCredenciadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
