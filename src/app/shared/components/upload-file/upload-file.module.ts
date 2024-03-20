import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    UploadFileComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UploadFileModule { }
