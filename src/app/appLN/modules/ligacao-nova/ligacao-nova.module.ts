import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidenavListComponentModule } from '../../menu-lateral/sidenav-list.module';
import { LigacaoNovaRoutingModule } from './ligacao-nova-routing.module';
import { LigacaoNovaComponent } from './ligacao-nova.component';


@NgModule({
  declarations: [
    LigacaoNovaComponent
  ],
  imports: [
    CommonModule,
    LigacaoNovaRoutingModule,
    SidenavListComponentModule
  ]
})
export class LigacaoNovaModule { }
