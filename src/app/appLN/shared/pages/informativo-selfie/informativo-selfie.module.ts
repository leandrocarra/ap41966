import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InformativoSelfieComponent } from './informativo-selfie.component';

@NgModule({
	declarations: [InformativoSelfieComponent],
	imports: [
		CommonModule,
		MatListModule
	],
	exports: [
		InformativoSelfieComponent,
	]
})
export class InformativoSelfieModule { }
