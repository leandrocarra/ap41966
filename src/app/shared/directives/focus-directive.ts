import {​ Directive, HostListener, ElementRef, Input, OnInit, AfterViewInit }​ from '@angular/core';
import {​ NgControl }​ from '@angular/forms';

@Directive({​
    selector: '[focus]'
}​)
export class FocusDirective  {​
    @Input() public inputId: string;
    constructor() {​
        
    }​
    ngAfterViewInit(){
        if(this.inputId){
            setTimeout(()=>{​
                document.getElementById(this.inputId).focus();
                document.getElementById(this.inputId).blur();
            }​,100);
        }​
    }​
}