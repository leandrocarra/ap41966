import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[specialCharacters]'
})
export class SpecialCharactersDirective {
    @Input() isAlphaNumeric: boolean;
    regexExp: string;
    constructor(
        private control: NgControl
    ) {
        this.isAlphaNumeric = false;
        this.regexExp = '^[a-zA-Z0-9 ]*$';
    }

    @HostListener('keypress', ['$event']) onKeyPress(event: any) {
      return new RegExp(this.regexExp).test(event.key);
    }

    @HostListener('paste', ['$event']) blockPaste(event: any) {
        event.srcElement.value = event.srcElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
        this.control.control!.setValue(event.srcElement.value);
    }
}
