import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Anexo } from '../../../core/models/anexo/anexo';
import { CustomSweetAlertService } from '../../../core/services/sweet-alert/custom-sweet-alert.service';
import { UserServiceLN } from '../../../core/services/user/user.service';
import { configureMenuByWindowSize } from '../../../core/services/utils/neo-utils.service';
import { DialogTirarFotoService } from '../dialog-tirar-foto/dialog-tirar-foto.service';

export interface DialogData {
	imgString: string;
	fileName: string;
}

@Component({
	selector: 'app-box-file',
	templateUrl: './box-file.component.html',
	styleUrls: ['./box-file.component.scss']
})

export class BoxFileComponent {
	@ViewChild('fileLoader', { static: true }) fileLoader: ElementRef;
	@Input() tipoCamera: string;
	@Input() docName: string;
	@Input() documentoLabel: string;
	@Input() infoDoc: string;
	@Output() arquivoAnexado: EventEmitter<Anexo> = new EventEmitter<any>();
	mobile: boolean;
	constructor(
		public dialog: MatDialog,
		public user: UserServiceLN,
		private _alert: CustomSweetAlertService,
		private _dialogTirarFoto: DialogTirarFotoService
	) {
        this.fileLoader = new ElementRef('');
        this.tipoCamera = '';
        this.docName = '';
        this.documentoLabel = '';
        this.infoDoc = '';
        this.mobile = configureMenuByWindowSize(window.screen.width);
    }

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
	}


	add(file: any): void {
		this.checkType(file.target.files[0]).then((valid: boolean) => {
			if (valid) {
				this.fileToBase64(file.target.files[0]).then((result: string) => {
					if (result.length > 2560000) {
						this._alert.alertWarning('Não conseguimos carregar o seu documento! Nos envie um arquivo com tamanho inferior à 2.5MB.')
					} else {
						let arquivo = new Anexo();
                        arquivo.fileExtension = this.getType(file.target.files[0].type);
                        arquivo.fileName = this.docName;
                        arquivo.fileSize = result.length;
                        arquivo.fileData = result;
						this.arquivoAnexado.emit(arquivo);
						this.emptyFilePath(file);
					}
				});
			} else {
				this._alert.alertWarningWithText("FORMATO INVÁLIDO", "O documento precisa ser nos formatos .PDF, .JPG, .JPEG ou .PNG");
			}
		});
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

	fileToBase64(arquivo: Blob): Promise<string> {
		return new Promise((resolve) => {
			let reader = new FileReader();
			reader.readAsDataURL(arquivo);
			reader.onload = function () {
				resolve(reader.result!.toString().replace(/^data:[a-z]+\/[a-z]+;base64,/, ""));
			}
		});
	}

	getType(fileType: string): string {
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
            default: {
                return '';
            }
		}
	}

	emptyFilePath(fileInput: any) {
		fileInput.srcElement.value = '';
	}

	openDialog(): void {
		this._dialogTirarFoto.open('environment');
		this._dialogTirarFoto.foto().subscribe(foto => {
			if (foto !== false) {
				let arquivo = new Anexo('.jpeg', this.docName, foto.length, foto)
				this.arquivoAnexado.emit(arquivo);
			}
		});
	}
}
