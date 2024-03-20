import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { NeoSharedModule } from '../../../../shared/shared.module';
import { RecebimentoAlternativoModule } from './components/recebimento-alternativo/recebimento-alternativo.module';
import { RecebimentoCaixaPostalModule } from './components/recebimento-caixa-postal/recebimento-caixa-postal.module';
import { RecebimentoImovelModule } from './components/recebimento-imovel/recebimento-imovel.module';
import { PagamentoRoutingModule } from './pagamento-routing.module';
import { DebitoAutomaticoComponent } from './pages/debito-automatico/debito-automatico.component';
import { PagamentoDefinirDataComponent } from './pages/definir-data/pagamento-definir-data.component';
import { PagamentoFaturaDigitalComponent } from './pages/fatura-digital/pagamento-fatura-digital.component';


@NgModule({
  declarations: [
    PagamentoDefinirDataComponent,
    PagamentoFaturaDigitalComponent,
    DebitoAutomaticoComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    RecebimentoImovelModule,
    RecebimentoCaixaPostalModule,
    RecebimentoAlternativoModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    PagamentoRoutingModule,
    NgxMaskModule,
    HttpClientModule,
    NeoSharedModule
  ]
})
export class PagamentoModule { }
