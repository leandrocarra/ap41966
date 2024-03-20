import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperHorizontalComponent } from './stepper-horizontal.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    StepperHorizontalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    StepperHorizontalComponent
  ]
})
export class StepperHorizontalModule { }
