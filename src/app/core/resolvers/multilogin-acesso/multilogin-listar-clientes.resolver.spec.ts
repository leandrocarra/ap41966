import { TestBed } from '@angular/core/testing';

import { MultiloginListarClientesResolver } from './multilogin-listar-clientes.resolver';

describe('MultiloginListarClientesResolver', () => {
  let resolver: MultiloginListarClientesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MultiloginListarClientesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
