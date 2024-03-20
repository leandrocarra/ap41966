import { Directive, HostBinding, HostListener } from '@angular/core';
@Directive({
    selector: '[expandMenu]'
})
export class ExpandMenuDirective {
    @HostBinding('class.active') isOpen = false;
    @HostListener('click') toggleOpen($event) {
        this.isOpen = !this.isOpen;
    }
    @HostListener('focusout') focusout($event) {
        setTimeout(() => {
            if (this.isOpen) {
                this.isOpen = false;
            }
        }, 300);
    }
}