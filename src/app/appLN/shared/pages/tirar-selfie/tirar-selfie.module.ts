import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TirarSelfieComponent } from './tirar-selfie.component';

@NgModule({
	declarations: [TirarSelfieComponent],
	imports: [
		CommonModule,
	],
	exports: [
		TirarSelfieComponent
	]
})
export class TirarSelfieModule { }
