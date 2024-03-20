import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProblemaRegistradoComponent } from "./problema-registrado.component";

@NgModule({
    declarations: [
        ProblemaRegistradoComponent
    ],
    imports: [
        CommonModule,
        
    ],
    exports: [
        ProblemaRegistradoComponent
    ]

})

export class ProblemaRegistradoModule {}

