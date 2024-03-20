import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadUtilsService {

  download(blob: any, fileName: any) {
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  }
}
