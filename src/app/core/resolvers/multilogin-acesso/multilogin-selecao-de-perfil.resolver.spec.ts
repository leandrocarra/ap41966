import { TestBed } from '@angular/core/testing';

import { MultiloginSelecaoDePerfilResolver } from './multilogin-selecao-de-perfil.resolver';

describe('MultiloginSelecaoDePerfilResolver', () => {
  let resolver: MultiloginSelecaoDePerfilResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MultiloginSelecaoDePerfilResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
