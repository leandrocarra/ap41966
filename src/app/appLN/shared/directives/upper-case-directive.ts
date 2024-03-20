import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[upperCase]'
})
export class UpperCaseDirective {
    constructor(private control: NgControl) {}

    @HostListener('input', ['$event']) onInput(event: any) {
        event.srcElement.value = event.srcElement.value.toUpperCase();
        this.control.control!.setValue(event.srcElement.value);
    }

}
