import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Anexo, FileExtension } from 'app/core/models/anexo/anexo';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';

@Component({
  selector: 'app-anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.scss']
})
export class AnexosComponent {

  @ViewChild('fileLoader', { static: true })
  fileLoader!: ElementRef;

  myFiles: Array<any> = [];

  @Output() arquivos: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _alert: CustomSweetAlertService
  ) { }

  add(file: any): void {
    this.checkType(file.target.files[0]).then((valid: boolean) => {
      if (valid) {
        this.fileToBase64(file.target.files[0]).then((result: string) => {
          if (result!.length > 2560000) {
            this._alert.alertInfo('Não conseguimos carregar o seu documento! Nos envie um arquivo com tamanho inferior à 2.5MB.')
          } else {
            let arquivo = new Anexo(this.getType(file.target.files[0].type), 'Anexo', result?.length, result)
            this.arquivos.emit(arquivo);
            this.emptyFilePath(file);
          }
        });
      } else {
        this._alert.alertWarningWithText("FORMATO INVÁLIDO", "O documento precisa ser nos formatos .PDF, .JPG, .JPEG ou .PNG");
      }
    });
  }

  getType(fileType: string): FileExtension {
    switch (fileType) {
      case 'image/jpeg': {
        return '.jpeg';
      }
      case 'image/png': {
        return '.png';
      }
      case 'application/pdf': {
        return '.pdf';
      }
      default:
        throw new Error("Documento Inválido");
    }

  }

  checkType(file: any): Promise<boolean> {
    return new Promise((resolve) => {
      if (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  fileToBase64(arquivo: any): Promise<string> {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsDataURL(arquivo);
      reader.onload = function () {
        try {
          resolve(reader.result!.toString().replace(/^data:[a-z]+\/[a-z]+;base64,/, ""));
        } catch (error) {
          throw new Error("Documento Inválido");
        }
      }
    });
  }

  emptyFilePath(fileInput: any) {
    fileInput.srcElement.value = '';
  }

  remove(index: number): void {
    this.myFiles.splice(index, 1);
    this.arquivos.emit(this.myFiles);
  }

}
