import { ChangeDetectorRef, Directive, Host, HostListener, Optional, SimpleChange } from '@angular/core';
import { NgControl } from "@angular/forms";
import { MaskDirective } from "ngx-mask";

@Directive({
    selector: '[cpfCnpjMask]'
})
export class CpfCnpjMaskDirective {
    cpnjMask = "00.000.000/0000-00";
    cpfMask = "000.000.000-009";
    constructor(
        private control: NgControl,
        private cdr: ChangeDetectorRef,
        @Host() @Optional() private mask: MaskDirective) {
    }

    @HostListener('keyup', ['$event']) keyup(e: any) {
        if (e.srcElement.value != null) {
            this.control.control!.setValue(e.srcElement.value.replace(/\D/g, ''));
            this.processInputChange(e.srcElement.value.replace(/\D/g, ''));
        }
    }

    private processInputChange(cpfCNPJ: string) {
        if (cpfCNPJ.length > 0 && cpfCNPJ.length <= 11) {
            setTimeout(() => {
                this.mask.ngOnChanges({ "maskExpression": new SimpleChange(null, this.cpfMask, false) });
            }, 0);
        } else {
            setTimeout(() => {
                this.mask.ngOnChanges({ "maskExpression": new SimpleChange(null, this.cpnjMask, false) });
            }, 0);
        }
    }
}
