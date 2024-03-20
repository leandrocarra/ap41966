import { TestBed } from '@angular/core/testing';

import { CustomSweetAlertService } from './custom-sweet-alert.service';

describe('CustomSweetAlertService', () => {
  let service: CustomSweetAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomSweetAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
