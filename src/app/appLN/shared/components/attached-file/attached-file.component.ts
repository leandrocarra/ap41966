import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Anexo } from '../../../core/models/anexo/anexo';

@Component({
    selector: 'app-attached-file',
    templateUrl: './attached-file.component.html',
    styleUrls: ['./attached-file.component.scss']
})
export class AttachedFileComponent implements OnInit {
    @Input() arquivoAnexado: Anexo;
    @Output() arquivoRemovido: EventEmitter<any> = new EventEmitter<any>()
    icones: any;
    constructor() {
        this.arquivoAnexado = new Anexo();
        this.icones = {
        '.pdf': 'picture_as_pdf',
        '.jpg': 'photo_library',
        '.jpeg': 'photo_library',
        '.png': 'photo_library'
        }
    }

    ngOnInit(): void {
    }

    remove(index: number) {
        this.arquivoRemovido.emit(index);
    }
}
