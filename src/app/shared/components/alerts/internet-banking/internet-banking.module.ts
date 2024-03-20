import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternetBankingComponent } from './internet-banking.component';
import { MatIconModule } from '@angular/material/icon';
import { NeoButtonModule } from '../../neo-button/neo-button.module';
import { NgxMaskModule } from 'ngx-mask';
import { SnackbarServiceModule } from '../../snackbar/snackbar.service.module';



@NgModule({
  declarations: [
    InternetBankingComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    NeoButtonModule,
    NgxMaskModule,
    SnackbarServiceModule
  ],
  exports: [
    InternetBankingComponent
  ]
})
export class InternetBankingModule { }
