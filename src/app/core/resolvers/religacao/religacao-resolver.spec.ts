import { TestBed } from '@angular/core/testing';

import { ReligacaoResolver } from './religacao.resolver';

describe('ReligacaoResolverResolver', () => {
  let resolver: ReligacaoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ReligacaoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
