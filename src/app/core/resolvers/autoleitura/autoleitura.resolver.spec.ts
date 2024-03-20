import { TestBed } from '@angular/core/testing';

import { AutoleituraResolver } from './autoleitura.resolver';

describe('AutoleituraResolver', () => {
  let resolver: AutoleituraResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AutoleituraResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
