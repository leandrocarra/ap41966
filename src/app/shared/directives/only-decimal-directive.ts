import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[onlyDecimal]'
})
export class OnlyDecimalDirective {

    constructor(
        private elem: ElementRef,
        private control: NgControl
    ) {
    }

    @HostListener('keyup', ['$event']) keyup(e : any) {
        this.elem.nativeElement.value = this.elem.nativeElement.value.replace(/[^0-9.,]+/g, '');
        this.control.control?.setValue(this.elem.nativeElement.value.replace(/[^0-9.,]+/g, ''));
    }
}
