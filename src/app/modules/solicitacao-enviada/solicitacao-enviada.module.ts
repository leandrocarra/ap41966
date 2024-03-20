import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { SolicitacaoEnviadaComponent } from './solicitacao-enviada.component';

import { SolicitacaoEnviadaRoutingModule } from './solicitacao-enviada-routing.module';
import { ProtocoloTextoSolicitacaoModule } from 'app/shared/components/protocolo-texto-solicitacao/protocolo-texto-solicitacao.module';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';

@NgModule({
  declarations: [SolicitacaoEnviadaComponent],
  imports: [
    CommonModule,
    SolicitacaoEnviadaRoutingModule,
    MatIconModule,
    ProtocoloTextoSolicitacaoModule,
    NeoButtonModule
  ]
})
export class SolicitacaoEnviadaModule { }
