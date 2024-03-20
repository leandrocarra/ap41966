import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoButtonComponent } from './neo-button.component';



@NgModule({
  declarations: [NeoButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [NeoButtonComponent]
})
export class NeoButtonModule { }
