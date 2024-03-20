import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrocaStepperComponent } from './troca-stepper.component';
import {MatStepperModule} from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from 'app/shared/components/spinner/spinner.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [TrocaStepperComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    RouterModule,
    SpinnerModule,
    MatIconModule
  ],
  exports: [
    TrocaStepperComponent
  ]
})
export class TrocaStepperModule { }
