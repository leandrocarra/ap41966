import { TestBed } from '@angular/core/testing';

import { LgpdService } from './lgpd.service';

describe('LgpdService', () => {
  let service: LgpdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LgpdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
