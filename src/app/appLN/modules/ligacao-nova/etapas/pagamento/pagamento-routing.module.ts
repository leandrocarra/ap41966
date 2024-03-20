import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebitoAutomaticoComponent } from './pages/debito-automatico/debito-automatico.component';
import { PagamentoDefinirDataComponent } from './pages/definir-data/pagamento-definir-data.component';
import { PagamentoFaturaDigitalComponent } from './pages/fatura-digital/pagamento-fatura-digital.component';



const routes: Routes = [
  {
    path: "definir-data",
    component: PagamentoDefinirDataComponent,
  },
  {
    path: "entrega-da-fatura",
    component: PagamentoFaturaDigitalComponent
  },
  {
    path: "debito-automatico",
    component: DebitoAutomaticoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentoRoutingModule { }
