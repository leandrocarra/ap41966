import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NeoButtonModule } from '../../neo-button/neo-button.module';
import { DialogPixComponent } from './dialog-pix.component';
//import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [DialogPixComponent],
  imports: [
    CommonModule,
    NeoButtonModule,
    MatIconModule,
    //QRCodeModule
  ],
  exports: [DialogPixComponent],  
})
export class DialogPixModule { }

