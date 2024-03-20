import { MatStepper } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { HostListener, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: 'mat-vertical-stepper'
})
export class MatVerticalStepperScrollerDirective {

    constructor(private stepper: MatStepper) {
    }

    @HostListener('selectionChange', ['$event'])
    selectionChanged(selection: StepperSelectionEvent) {
        const stepId = this.stepper._getStepLabelId(selection.selectedIndex);
        const stepElement = document.getElementById(stepId);
        if (stepElement) {
            setTimeout(() => {
                stepElement.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
            }, 250);
        }
    }
}