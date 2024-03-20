import { TestBed } from '@angular/core/testing';

import { MultiloginCadastroResolver } from './multilogin-cadastro.resolver';

describe('MultiloginSelecaoDePerfilResolver', () => {
  let resolver: MultiloginCadastroResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MultiloginCadastroResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
