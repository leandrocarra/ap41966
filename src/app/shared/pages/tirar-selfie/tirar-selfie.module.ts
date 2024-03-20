import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TirarSelfieComponent } from './tirar-selfie.component';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';



@NgModule({
	declarations: [TirarSelfieComponent],
	imports: [
		CommonModule,
		NeoButtonModule
	],
	exports: [
		TirarSelfieComponent
	]
})
export class TirarSelfieModule { }
