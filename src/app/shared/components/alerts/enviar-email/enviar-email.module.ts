import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMaskModule } from 'ngx-mask';
import { NeoButtonModule } from '../../neo-button/neo-button.module';
import { EnviarEmailComponent } from './enviar-email.component';



@NgModule({
  declarations: [
    EnviarEmailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatRadioModule,
    NgxMaskModule,
    NeoButtonModule
  ],
  exports: [
    EnviarEmailComponent
  ]
})
export class EnviarEmailModule { }
