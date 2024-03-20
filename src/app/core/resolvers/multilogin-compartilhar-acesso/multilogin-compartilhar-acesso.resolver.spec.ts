import { TestBed } from '@angular/core/testing';

import { MultiloginCompartilharAcessoResolver } from './multilogin-compartilhar-acesso.resolver';

describe('MultiloginCompartilharAcessoResolver', () => {
  let resolver: MultiloginCompartilharAcessoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MultiloginCompartilharAcessoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
