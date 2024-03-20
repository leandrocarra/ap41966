import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NeoUtilsService } from './neo-utils.service';

describe(NeoUtilsService.name, () => {
  let service: NeoUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NeoUtilsService],
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(NeoUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
