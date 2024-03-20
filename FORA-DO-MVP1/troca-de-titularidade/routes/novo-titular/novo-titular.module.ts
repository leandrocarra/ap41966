import { SelecaoComboModule } from 'app/shared/pages/selecao-combo/selecao-combo.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { BoxFileModule } from 'app/shared/components/box-file/box-file.module';
import { DadosClienteLigacaoModule } from 'app/shared/components/dados-cliente-ligacao/dados-cliente-ligacao.module';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { ToolTipComponentModule } from 'app/shared/components/tooltip/tooltip.module';
import { DadosTitularModule } from 'app/shared/pages/dados-titular/dados-titular.module';
import { InformativoBeneficiosModule } from 'app/shared/pages/informativo-beneficios/informativo-beneficios.module';
import { InformativoSelfieModule } from 'app/shared/pages/informativo-selfie/informativo-selfie.module';
import { InformativoTarifaBrancaModule } from 'app/shared/pages/informativo-tarifa-branca/informativo-tarifa-branca.module';
import { InformativoTarifaSocialModule } from 'app/shared/pages/informativo-tarifa-social/informativo-tarifa-social.module';
import { OpcaoTarifaSocialModule } from 'app/shared/pages/opcao-tarifa-social/opcao-tarifa-social.module';
import { SubPerfilRuralModule } from 'app/shared/pages/sub-perfil-rural/sub-perfil-rural.module';
import { PerguntaApartamentoModule } from 'app/shared/pages/tipo-do-imovel/pergunta-apartamento.module';
import { TipoLigacaoModule } from 'app/shared/pages/tipo-ligacao/tipo-ligacao.module';
import { TirarSelfieModule } from 'app/shared/pages/tirar-selfie/tirar-selfie.module';
import { SharedModule } from 'app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { DataCertaModule } from '../../../data-certa/data-certa.module';
import { DebitoAutomaticoModule } from '../../../debito-automatico/debito-automatico.module';
import { DadosSolicitacaoTrocaModule } from '../../components/dados-solicitacao-troca/dados-solicitacao-troca.module';
import { TrocaStepperModule } from '../../components/troca-stepper/troca-stepper.module';
import { CadastrarWhatsappTrocaComponent } from '../../pages/cadastrar-whatsapp-troca/cadastrar-whatsapp-troca.component';
import { DadosPessoaisTrocaComponent } from '../../pages/dados-pessoais-troca/dados-pessoais-troca.component';
import { IdentificacaoTrocaComponent } from '../../pages/identificacao-troca/identificacao-troca.component';
import { InformativoWhatsappTrocaComponent } from '../../pages/informativo-whatsapp-troca/informativo-whatsapp-troca.component';
import { ManterCaracteristicasLigacaoTrocaComponent } from '../../pages/manter-caracteristicas-ligacao-troca/manter-caracteristicas-ligacao-troca.component';
import { MotivoTrocaComponent } from '../../pages/motivo-troca/motivo-troca.component';
import { OpcaoTarifariaModule } from './../../../../../../shared/pages/opcao-tarifaria/opcao-tarifaria.module';
import { SelecaoPerfilModule } from './../../../../../../shared/pages/selecao-perfil/selecao-perfil.module';
import { NovoTitularRoutingModule } from './novo-titular-routing.module';
import { NovoTitularComponent } from './novo-titular.component';
import { DocumentoModule } from 'app/shared/pages/documento/documento.module';
import { AvaliacaoObraModule } from 'app/shared/pages/avaliacao-obra/avaliacao-obra.module';
import { FormularioTarifaSocialModule } from 'app/shared/pages/formulario-tarifa-social/formulario-tarifa-social.module';
import { TrocaDeLigacaoModule } from 'app/shared/pages/troca-de-ligacao/troca-de-ligacao.module';





@NgModule({
  declarations: [
    MotivoTrocaComponent,
    NovoTitularComponent,
    IdentificacaoTrocaComponent,
    DadosPessoaisTrocaComponent,
    ManterCaracteristicasLigacaoTrocaComponent,
    InformativoWhatsappTrocaComponent,
    CadastrarWhatsappTrocaComponent,
    
  ],
  imports: [
    BoxFileModule,
    CommonModule,
    DadosClienteLigacaoModule,
    DadosSolicitacaoTrocaModule,
    FormsModule,
    InformativoSelfieModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    NeoButtonModule,
    NovoTitularRoutingModule,
    ReactiveFormsModule,
    TirarSelfieModule,
    ToolTipComponentModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    SharedModule,
    NgxMaskModule,
    DebitoAutomaticoModule,
    DataCertaModule,
    MatStepperModule,
    TrocaStepperModule,
    SelecaoPerfilModule,
    DocumentoModule,
    AvaliacaoObraModule,
    OpcaoTarifaSocialModule,
    SelecaoComboModule,
    PerguntaApartamentoModule,
    InformativoTarifaSocialModule,
    OpcaoTarifariaModule,
    TipoLigacaoModule,
    InformativoTarifaBrancaModule,
    InformativoBeneficiosModule,
    SubPerfilRuralModule,
    DadosTitularModule,
    FormularioTarifaSocialModule,
    TrocaDeLigacaoModule
  ]
})
export class NovoTitularModule { }
