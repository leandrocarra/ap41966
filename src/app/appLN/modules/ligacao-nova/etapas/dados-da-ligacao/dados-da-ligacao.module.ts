import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { AnexarArtModule } from '../../../../shared/components/anexar-art/anexar-art.module';
import { AttachedFileModule } from '../../../../shared/components/attached-file/attached-file.module';
import { BoxFileModule } from '../../../../shared/components/box-file/box-file.module';
import { TooltipModule } from '../../../../shared/components/tooltip/tooltip.module';
import { NeoSharedModule } from '../../../../shared/shared.module';
import { DialogAlterarCategoriaComponent } from './components/dialog-alterar-categoria/dialog-alterar-categoria.component';
import { EditCalculadoraComponent } from './components/edit-calculadora/edit-calculadora.component';
import { EquipamentosAdicionadosComponent } from './components/equipamentos-adicionados/equipamentos-adicionados.component';
import { ItemCalculadoraComponent } from './components/item-calculadora/item-calculadora.component';
import { DadosDaLigacaoRoutingModule } from './dados-da-ligacao-routing.module';
import { DadosDaLigacaoComponent } from './dados-da-ligacao.component';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { ComboComponent } from './pages/combo/combo.component';
import { DimensionamentoDeRedeComponent } from './pages/dimensionamento-de-rede/dimensionamento-de-rede.component';
import { DistanciaImovelComponent } from './pages/distancia-imovel/distancia-imovel.component';
import { DocumentoIcmsComponent } from './pages/documento-icms/documento-icms.component';
import { InformativoInicialComponent } from './pages/informativo-inicial/informativo-inicial.component';
import { InformativoLigacaoComponent } from './pages/informativo-ligacao/informativo-ligacao.component';
import { IsencaoIcmsComponent } from './pages/isencao-icms/isencao-icms.component';
import { OpcaoTarifariaComponent } from './pages/opcao-tarifaria/opcao-tarifaria.component';
import { QuestionarioApartamentoComponent } from './pages/questionario-apartamento/questionario-apartamento.component';
import { QuestionarioZonaRuralComponent } from './pages/questionario-zona-rural/questionario-zona-rural.component';
import { InformativoTarifaSocialComponent } from './pages/informativo-tarifa-social/informativo-tarifa-social.component';
import { InformativoTarifaBrancaComponent } from './pages/informativo-tarifa-branca/informativo-tarifa-branca.component';



@NgModule({
  declarations: [
    DadosDaLigacaoComponent,
    InformativoInicialComponent,
    InformativoLigacaoComponent,
    QuestionarioApartamentoComponent,
    DistanciaImovelComponent,
    QuestionarioZonaRuralComponent,
    OpcaoTarifariaComponent,
    InformativoTarifaSocialComponent,
    InformativoTarifaBrancaComponent,
    ComboComponent,
    CalculadoraComponent,
    ItemCalculadoraComponent,
    EditCalculadoraComponent,
    EquipamentosAdicionadosComponent,
    DialogAlterarCategoriaComponent,
    DimensionamentoDeRedeComponent,
    IsencaoIcmsComponent,
    DocumentoIcmsComponent
  ],
  imports: [
    CommonModule,
    DadosDaLigacaoRoutingModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    TooltipModule,
    NeoSharedModule,
    BoxFileModule,
    AnexarArtModule,
    AttachedFileModule
  ]
})
export class DadosDaLigacaoModule { }
