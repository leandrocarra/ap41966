import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[onlyNumber]'
})
export class OnlyNumberDirective {

    constructor(
        private control: NgControl
    ) {
    }

    @HostListener('keyup', ['$event']) keyup(e: any) {
        e.srcElement.value = this.encodeToPreventXSS(e.srcElement.value.replace(/[^0-9]+/g, ''));
        this.control.control!.setValue(e.srcElement.value);
    }

    encodeToPreventXSS(original: string) {
        return original.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }
}
