import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[withoutNumber]'
})
export class WithoutNumberDirective {

    constructor(
        private control: NgControl
    ) {
    }

    @HostListener('keyup', ['$event']) keyup(e : any) {
        e.srcElement.value = this.encodeToPreventXSS(e.srcElement.value.replace(/[0-9]/g, ''));
        this.control.control?.setValue(e.srcElement.value);
    }

    encodeToPreventXSS(s : any) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }
}
