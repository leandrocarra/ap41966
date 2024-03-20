import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DadosDoTitularComponent } from './dados-do-titular.component';

const routes: Routes = [{ path: '', component: DadosDoTitularComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DadosDoTitularRoutingModule { }
