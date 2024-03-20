import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardAcessoRapidoComponent } from './card-acesso-rapido.component';

@NgModule({
    exports: [CardAcessoRapidoComponent],
    imports: [
        CommonModule,
        MatCardModule
    ],
    declarations: [CardAcessoRapidoComponent],
    providers: []
})

export class CardAcessoRapidoModule { }
