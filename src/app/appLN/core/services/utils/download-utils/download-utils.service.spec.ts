import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DownloadUtilsService } from './download-utils.service';

describe(DownloadUtilsService.name, () => {
  let service: DownloadUtilsService;
  
  let blob = new Blob([''], { type: 'application/pdf' });

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        DownloadUtilsService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    service = TestBed.inject(DownloadUtilsService);
  });

  it(`Deve instanciar ${DownloadUtilsService.name} quando chamado`, () => {
    expect(service).toBeTruthy();
  });

  // it(`#${DownloadUtilsService.prototype.download.name}
  // deve realizar o download de um arquivo`, fakeAsync(() => {
  //   let urlSpy = spyOn(URL, 'revokeObjectURL');
  //   service.download(blob, "contratoelektro.pdf");
  //   tick(7001);
  //   expect(urlSpy).toHaveBeenCalled();

  // }));


});
