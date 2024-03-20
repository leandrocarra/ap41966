import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnexarArtComponent } from './anexar-art.component';
import { BoxFileModule } from '../box-file/box-file.module';
import { AttachedFileModule } from '../attached-file/attached-file.module';



@NgModule({
	declarations: [
		AnexarArtComponent
	],
	imports: [
		CommonModule,
		BoxFileModule,
		AttachedFileModule
	],
	exports: [
		AnexarArtComponent
	]
})
export class AnexarArtModule { }
