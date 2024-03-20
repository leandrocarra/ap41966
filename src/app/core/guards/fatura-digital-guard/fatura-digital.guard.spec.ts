import { TestBed } from '@angular/core/testing';

import { FaturaDigitalGuard } from './fatura-digital.guard';

describe('FaturaDigitalGuard', () => {
  let guard: FaturaDigitalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FaturaDigitalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
