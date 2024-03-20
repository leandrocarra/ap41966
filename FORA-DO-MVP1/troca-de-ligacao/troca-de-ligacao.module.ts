import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrocaDeLigacaoComponent } from './troca-de-ligacao.component';
import { MatRadioModule } from '@angular/material/radio';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnexosComponentModule } from 'app/shared/components/anexos/anexos.module';
import { ToolTipComponentModule } from 'app/shared/components/tooltip/tooltip.module';
import { BoxFileComponent } from 'app/shared/components/box-file/box-file.component';
import { BoxFileModule } from 'app/shared/components/box-file/box-file.module';



@NgModule({
  declarations: [TrocaDeLigacaoComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    NeoButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AnexosComponentModule,
    ToolTipComponentModule,
    BoxFileModule
  ],

  exports:[TrocaDeLigacaoComponent]
})
export class TrocaDeLigacaoModule { }
