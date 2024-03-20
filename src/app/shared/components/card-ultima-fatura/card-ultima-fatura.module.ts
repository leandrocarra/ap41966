import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DialogPixModule } from '../alerts/dialog-pix/dialog-pix.module';
import { EnviarEmailModule } from '../alerts/enviar-email/enviar-email.module';
import { InternetBankingModule } from '../alerts/internet-banking/internet-banking.module';
import { CodigoDeBarrasModule } from '../cards/codigo-de-barras/codigo-de-barras.module';
import { BaixarSegundaViaModule } from '../faturas/baixar-segunda-via.module';
import { ToolTipComponentModule } from '../tooltip/tooltip.module';
import { CardUltimaFaturaComponent } from './card-ultima-fatura.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    CardUltimaFaturaComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    ToolTipComponentModule,
    MatDialogModule,
    DialogPixModule,
    InternetBankingModule,
    MatMenuModule,
    EnviarEmailModule,
    CodigoDeBarrasModule,
    BaixarSegundaViaModule
  ],
  exports: [
    CardUltimaFaturaComponent
  ],

  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ]
})
export class CardUltimaFaturaModule { }
