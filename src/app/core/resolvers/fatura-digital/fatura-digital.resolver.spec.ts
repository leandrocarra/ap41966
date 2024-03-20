import { TestBed } from '@angular/core/testing';

import { FaturaDigitalResolver } from './fatura-digital.resolver';

describe('FaturaDigitalResolver', () => {
  let resolver: FaturaDigitalResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FaturaDigitalResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
