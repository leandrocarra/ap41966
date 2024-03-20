import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Anexo } from 'app/core/models/anexo/anexo';

@Component({
  selector: 'app-attached-file',
  templateUrl: './attached-file.component.html',
  styleUrls: ['./attached-file.component.scss']
})
export class AttachedFileComponent {

  @Input() arquivos!: Array<Anexo>;
  @Output() removerArquivo: EventEmitter<Anexo> = new EventEmitter<Anexo>();
  @Output() removerArquivoIndex: EventEmitter<Number> = new EventEmitter<Number>();

  icones: any;
  constructor() {
    this.icones = {
      '.pdf': 'picture_as_pdf',
      '.jpg': 'photo_library',
      '.jpeg': 'photo_library',
      '.png': 'photo_library'
    }
  }

  remove(index:number) {
    this.removerArquivo.emit(this.arquivos[index]);
    this.removerArquivoIndex.emit(index);
  }

}
