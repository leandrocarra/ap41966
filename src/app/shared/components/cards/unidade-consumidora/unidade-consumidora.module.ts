import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UnidadeConsumidoraComponent } from './unidade-consumidora.component'
 

@NgModule({
    declarations: [
        UnidadeConsumidoraComponent
    ],
    imports: [
        MatCardModule,
        CommonModule,
    ],
    exports: [
        UnidadeConsumidoraComponent
    ],
})

export class UnidadeConsumidoraModule { }
