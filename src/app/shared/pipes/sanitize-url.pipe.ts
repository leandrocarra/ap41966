import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeValue } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeUrl'
})
export class SanitizeUrlPipe implements PipeTransform {

  constructor(public sanitizer: DomSanitizer) {}
  transform(url: SafeValue) {
    let newURL: SafeResourceUrl;

     return this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, url);
    
  }
}
