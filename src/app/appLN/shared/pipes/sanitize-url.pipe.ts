import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeUrl'
})
export class SanitizeUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    let newURL: SafeResourceUrl;

    newURL = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, url);
    return newURL;
  }
}
