import {​ Directive, Input }​ from '@angular/core';

@Directive({​
    selector: '[focus]'
}​)
export class FocusDirective  {​
    @Input() public inputId: string;
    constructor() {​
        this.inputId = '';
    }​
    ngAfterViewInit(){
        if(this.inputId){
            setTimeout(() => {​
                document.getElementById(this.inputId)!.focus();
                document.getElementById(this.inputId)!.blur();
            }​, 500);
        }​
    }​
}​





