import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MultiloginCompartilharAcessoRoutes } from 'app/core/routes/home-route/home-child-routes/multilogin-compartilhar-acesso.routes';
import { AttachedFileModule } from 'app/shared/components/attached-file/attached-file.module';
import { BoxFileModule } from 'app/shared/components/box-file/box-file.module';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { PaginationComponentModule } from 'app/shared/components/pagination/pagination.module';
import { ToolTipComponentModule } from 'app/shared/components/tooltip/tooltip.module';
import { NgxMaskModule } from 'ngx-mask';
import { BreadcrumbModule } from "xng-breadcrumb";
import { ConjugeBlockModule } from './components/conjuge-block/conjuge-block.module';
import { MeusGruposModule } from './components/meus-grupos/meus-grupos.module';
import { MultiloginCompartilharAcessoComponent } from './multilogin-compartilhar-acesso.component';



@NgModule({
    declarations: [MultiloginCompartilharAcessoComponent],
    imports: [
        FormsModule,
        MatExpansionModule,
        BreadcrumbModule,
        BoxFileModule,
        AttachedFileModule,
        PaginationComponentModule,
        MatRadioModule,
        CommonModule,
        RouterModule.forChild(MultiloginCompartilharAcessoRoutes),
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        NeoButtonModule,
        ToolTipComponentModule,
        ConjugeBlockModule,
        MeusGruposModule,
        NgxMaskModule,
        MatCheckboxModule
    ]
})
export class MultiloginCompartilharAcessoModule { }
