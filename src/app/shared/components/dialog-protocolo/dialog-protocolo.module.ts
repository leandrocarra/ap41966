import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogProtocoloComponent } from './dialog-protocolo.component';
import { DialogProtocoloService } from './dialog-protocolo.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [DialogProtocoloComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    
  ],
  exports: [
    DialogProtocoloComponent
  ],
  providers: [
    DialogProtocoloService
  ]

})

export class DialogProtocoloModule { }
