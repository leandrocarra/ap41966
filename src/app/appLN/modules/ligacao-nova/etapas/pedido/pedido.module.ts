import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { BoxFileModule } from '../../../../shared/components/box-file/box-file.module';
import { TooltipModule } from '../../../../shared/components/tooltip/tooltip.module';
import { NeoSharedModule } from '../../../../shared/shared.module';
import { AttachedFileModule } from '../../../../shared/components/attached-file/attached-file.module';
import { DebitoDocumentoModule } from './components/debito-documento/debito-documento.module';
import { DebitoImovelModule } from './components/debito-imovel/debito-imovel.module';
import { DialogRepresentanteLegalComponent } from './components/dialog-representante-legal/dialog-representante-legal.component';
import { BemVindoComponent } from './pages/bem-vindo/bem-vindo.component';
import { ConfirmarEnderecoComponent, UcDialogComponent } from './pages/confirmar-endereco/confirmar-endereco.component';
import { DebitoJustificativaComponent } from './pages/debito-justificativa/debito-justificativa.component';
import { DebitosComponent } from './pages/debitos/debitos.component';
import { DocumentoPosseComponent } from './pages/documento-posse/documento-posse.component';
import { DocumentosAceitosComponent } from './pages/documentos-aceitos/documentos-aceitos.component';
import { DocumentosNecessariosComponent } from './pages/documentos-necessarios/documentos-necessarios.component';
import { EnderecoComponent, EnderecosDialogComponent } from './pages/endereco/endereco.component';
import { ImovelProntoComponent } from './pages/imovel-pronto/imovel-pronto.component';
import { InformarTipoRuralComponent } from './pages/informar-tipo-rural/informar-tipo-rural.component';
import { InformativoTarifaSocialComponent } from './pages/informativo-tarifa-social/informativo-tarifa-social.component';
import { SelecaoPerfilComponent } from './pages/selecao-perfil/selecao-perfil.component';
import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoComponent } from './pedido.component';
import { AnexarAutorizacaoPrefeituraComponent } from './pages/anexar-autorizacao-prefeitura/anexar-autorizacao-prefeitura.component';


@NgModule({
  declarations: [
    PedidoComponent,
    BemVindoComponent,
    ImovelProntoComponent,
    EnderecoComponent,
    EnderecosDialogComponent,
    ConfirmarEnderecoComponent,
    UcDialogComponent,
    DebitosComponent,
    DebitoJustificativaComponent,
    SelecaoPerfilComponent,
    DocumentoPosseComponent,
    InformarTipoRuralComponent,
    DocumentosNecessariosComponent,
    DocumentosAceitosComponent,
    InformativoTarifaSocialComponent,
    DialogRepresentanteLegalComponent,
    AnexarAutorizacaoPrefeituraComponent
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    TooltipModule,
    MatRadioModule,
    MatTooltipModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DebitoDocumentoModule,
    DebitoImovelModule,
    BoxFileModule,
    AttachedFileModule,
    NgxMaskModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    NeoSharedModule
  ],
})

export class PedidoModule { }
