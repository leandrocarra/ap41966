import { CommonModule, NgOptimizedImageModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from "@angular/router";
import { DialogLoginModule } from "app/shared/components/dialog-login/dialog-login.module";
import { BandeiraTarifariaComponent } from './components/bandeira-tarifaria/bandeira-tarifaria.component';
import { InfosUsuarioComponent } from './components/infos-usuario/infos-usuario.component';
import { NotificacoesHeaderComponent } from './components/notificacoes-header/notificacoes-header.component';
import { HeaderComponent } from "./header.component";

@NgModule({
    declarations: [
        HeaderComponent,
        InfosUsuarioComponent,
        BandeiraTarifariaComponent,
        NotificacoesHeaderComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatMenuModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatSidenavModule,
        MatExpansionModule,
        MatDividerModule,
        MatListModule,
        MatBadgeModule,
        DialogLoginModule,
        NgOptimizedImageModule
    ],
    exports: [
        HeaderComponent
    ]

})

export class HeaderModule { }

