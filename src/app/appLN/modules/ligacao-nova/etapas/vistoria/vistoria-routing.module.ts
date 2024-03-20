import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistoriaComponent } from './vistoria.component';

const routes: Routes = [{ path: '', component: VistoriaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistoriaRoutingModule { }
