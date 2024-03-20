import { TestBed } from '@angular/core/testing';

import { MultiloginCadastroService } from './multilogin-cadastro.service';

describe('MultiloginCadastroService', () => {
  let service: MultiloginCadastroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiloginCadastroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
