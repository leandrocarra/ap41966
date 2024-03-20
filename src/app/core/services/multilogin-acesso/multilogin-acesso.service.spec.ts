import { TestBed } from '@angular/core/testing';

import { MultiloginAcessoService } from './multilogin-acesso.service';

describe('MultiloginAcessoService', () => {
  let service: MultiloginAcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiloginAcessoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
