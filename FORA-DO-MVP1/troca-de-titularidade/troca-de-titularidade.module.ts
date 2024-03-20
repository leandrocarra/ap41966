import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AccordionModule } from 'app/shared/components/accordion/accordion.module';
import { InternetBankingModule } from 'app/shared/components/alerts/internet-banking/internet-banking.module';
import { BoxFileModule } from 'app/shared/components/box-file/box-file.module';
import { DadosClienteLigacaoModule } from 'app/shared/components/dados-cliente-ligacao/dados-cliente-ligacao.module';
import { DadosImovelLigacaoModule } from 'app/shared/components/dados-imovel-ligacao/dados-imovel-ligacao.module';
import { CepModule } from 'app/shared/components/formularios/cep/cep.module';
import { EnderecoModule } from 'app/shared/components/formularios/endereco/endereco.module';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { SpinnerModule } from 'app/shared/components/spinner/spinner.module';
import { ToolTipComponentModule } from 'app/shared/components/tooltip/tooltip.module';
import { SharedModule } from 'app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { BaixarFaturaModule } from './components/baixar-fatura/baixar-fatura.module';
import { DadosSolicitacaoTrocaModule } from './components/dados-solicitacao-troca/dados-solicitacao-troca.module';
import { ListagemPendenciasModule } from './components/listagem-pendencias/listagem-pendencias.module';
import { PendenciasTerceiroComponent } from './components/pendencias/pendencias-terceiro/pendencias-terceiro.component';
import { PendenciasTitularComponent } from './components/pendencias/pendencias-titular/pendencias-titular.component';
import { PendenciasUcComponent } from './components/pendencias/pendencias-uc/pendencias-uc.component';
import { TrocaStepperModule } from './components/troca-stepper/troca-stepper.module';
import { CadastrarDataCertaTrocaComponent } from './pages/cadastrar-data-certa-troca/cadastrar-data-certa-troca.component';
import { CadastrarDebitoAutomaticoTrocaComponent } from './pages/cadastrar-debito-automatico-troca/cadastrar-debito-automatico-troca.component';
import { CadastrarFaturaDigitalTrocaComponent } from './pages/cadastrar-fatura-digital-troca/cadastrar-fatura-digital-troca.component';
import { ConfirmacaoSolicitacaoPersonalizadaTrocaComponent } from './pages/confirmacao-solicitacao-personalizada-troca/confirmacao-solicitacao-personalizada-troca.component';
import { ConfirmacaoSolicitacaoTrocaComponent } from './pages/confirmacao-solicitacao-troca/confirmacao-solicitacao-troca.component';
import { DadosDebitoAutomaticoTrocaComponent } from './pages/dados-debito-automatico-troca/dados-debito-automatico-troca.component';
import { DadosNovoTitularTrocaComponent } from './pages/dados-novo-titular-troca/dados-novo-titular-troca.component';
import { DocumentoComFotoTerceiroComponent } from './pages/documento-com-foto-terceiro/documento-com-foto-terceiro.component';
import { DocumentoComFotoTrocaComponent } from './pages/documento-com-foto-troca/documento-com-foto-troca.component';
import { EscolhaProximoTitularTrocaComponent } from './pages/escolha-proximo-titular-troca/escolha-proximo-titular-troca.component';
import { InformarEnderecoTrocaComponent } from './pages/informar-endereco-troca/informar-endereco-troca.component';
import { InformarImovelTrocaComponent } from './pages/informar-imovel-troca/informar-imovel-troca.component';
import { InformativoSucessoTrocaComponent } from './pages/informativo-sucesso-troca/informativo-sucesso-troca.component';
import { InformativoTitularidadeTrocaComponent } from './pages/informativo-titularidade-troca/informativo-titularidade-troca.component';
import { PendenciasEmAbertoComponent } from './pages/pendencias-em-aberto/pendencias-em-aberto.component';
import { TrocaDeTitularidadeRoutingModule } from './troca-de-titularidade-routing.module';
import { TrocaDeTitularidadeComponent } from './troca-de-titularidade.component';



@NgModule({
  declarations: [
    InformarImovelTrocaComponent,
    InformativoSucessoTrocaComponent,
    EscolhaProximoTitularTrocaComponent,
    TrocaDeTitularidadeComponent,
    ConfirmacaoSolicitacaoTrocaComponent,
    ConfirmacaoSolicitacaoPersonalizadaTrocaComponent,
    InformativoTitularidadeTrocaComponent,
    CadastrarFaturaDigitalTrocaComponent,
    DadosNovoTitularTrocaComponent,
    DocumentoComFotoTrocaComponent,
    InformarEnderecoTrocaComponent,
    DocumentoComFotoTerceiroComponent,
    PendenciasEmAbertoComponent,
    PendenciasUcComponent,
    PendenciasTerceiroComponent,
    PendenciasTitularComponent,
    CadastrarDataCertaTrocaComponent,
    CadastrarDebitoAutomaticoTrocaComponent,
    DadosDebitoAutomaticoTrocaComponent,
  ],
  imports: [
    CommonModule,
    DadosClienteLigacaoModule,
    DadosSolicitacaoTrocaModule,
    BaixarFaturaModule,
    BoxFileModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    NeoButtonModule,
    ReactiveFormsModule,
    SpinnerModule,
    TrocaDeTitularidadeRoutingModule,
    TrocaStepperModule,
    ToolTipComponentModule,
    NgxMaskModule,
    MatSelectModule,
    CepModule,
    EnderecoModule,
    DadosImovelLigacaoModule,
    AccordionModule,
    InternetBankingModule,
    MatMenuModule,
    ListagemPendenciasModule,
    BreadcrumbModule
  ]
})
export class TrocaDeTitularidadeModule { }
