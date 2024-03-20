import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NeoSharedModule } from '../shared/shared.module';
import { SidenavListComponent } from './sidenav-list.component';

@NgModule({
    declarations: [SidenavListComponent],
    imports: [
        CommonModule,
        NeoSharedModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule
    ],
    exports: [SidenavListComponent]
})
export class SidenavListComponentModule { }
