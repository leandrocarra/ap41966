import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleanHeaderComponent } from './clean-header.component';



@NgModule({
  declarations: [CleanHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CleanHeaderComponent
  ]
  
})
export class CleanHeaderModule { }
