import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterModule } from 'app/core/footer/footer.module';
import { EntendaSuaContaGuard } from 'app/core/guards/entenda-sua-conta-guard/entenda-sua-conta.guard';
import { FaturaDigitalGuard } from 'app/core/guards/fatura-digital-guard/fatura-digital.guard';
import { HeaderModule } from 'app/core/header/header.module';
import { ServicosRoutes } from 'app/core/routes/home-route/home-child-routes/servicos.routes';
import { SpinnerModule } from 'app/shared/components/spinner/spinner.module';
import { ExibirAvisoModule } from 'app/shared/pages/exibir-aviso/exibir-aviso.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { ProtocoloInformativoComponentModule } from './../../shared/components/protocolo-informativo/protocolo-informativo.module';
import { ServicosComponent } from './servicos.component';

@NgModule({
  declarations: [
    ServicosComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    FooterModule,
    HeaderModule,
    BreadcrumbModule,
    ProtocoloInformativoComponentModule,
    RouterModule.forChild(ServicosRoutes),
    ExibirAvisoModule
  ],
  exports: [
    ServicosComponent
  ],
  providers: [
    EntendaSuaContaGuard,
    FaturaDigitalGuard
  ]
})
export class ServicosModule { }
