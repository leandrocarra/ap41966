import { TestBed } from '@angular/core/testing';

import { DataCertaGuard } from './data-certa.guard';

describe('DataCertaGuard', () => {
  let guard: DataCertaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DataCertaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
