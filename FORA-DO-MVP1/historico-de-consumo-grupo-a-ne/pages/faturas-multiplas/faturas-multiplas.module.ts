import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FooterModule } from "app/core/footer/footer.module";
import { HeaderModule } from "app/core/header/header.module";
import { AccordionModule } from 'app/shared/components/accordion/accordion.module';
import { ProblemaRegistradoModule } from 'app/shared/components/cards/problema-registrado/problema-registrado.module';
import { EmailRecebimentoModule } from 'app/shared/components/email-recebimento/email-recebimento.module';
import { FilterscomponentModule } from 'app/shared/components/filters/filters.module';
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { PaginationComponentModule } from 'app/shared/components/pagination/pagination.module';
import { PersonalizeFaturaComponentModule } from 'app/shared/components/personalize-fatura/personalize-fatura.module';
import { SpinnerModule } from 'app/shared/components/spinner/spinner.module';
import { AccordionGrupoFaturaModule } from './components/accordion-grupo-fatura/accordion-grupo-fatura.module';
import { FaturasMultiplasRoutingModule } from "./faturas-multiplas-routing.module";
import { AlterarEmailComponent } from './pages/alterar-email/alterar-email.component';
import { BuscarUc, CadastrarFaturasComponent } from "./pages/cadastrar-faturas/cadastrar-faturas.component";
import { EditarGrupoComponent } from './pages/editar-grupo/editar-grupo.component';
import { FaturaMultiplaGrupoComponent } from './pages/fatura-multipla-grupo/fatura-multipla-grupo.component';
import { FaturasMultiplasComponent } from "./pages/faturas-multiplas/faturas-multiplas.component";
import { MultiCadastradasComponent } from './pages/multi-cadastradas/multi-cadastradas.component';

@NgModule({
    declarations: [
        FaturasMultiplasComponent,
        CadastrarFaturasComponent,
        BuscarUc,
        MultiCadastradasComponent,
        FaturaMultiplaGrupoComponent,
        EditarGrupoComponent,
        AlterarEmailComponent
    ],
    imports: [
        CommonModule,
        SpinnerModule,
        FaturasMultiplasRoutingModule,
        HeaderModule,
        FooterModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NeoButtonModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        PaginationComponentModule,
        AccordionGrupoFaturaModule,
        ProblemaRegistradoModule,
        PersonalizeFaturaComponentModule,
        FilterscomponentModule,
        AccordionModule,
        EmailRecebimentoModule
    ],
})

export class FaturasMultiplasModule { }