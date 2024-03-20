import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Anexo, FileExtension } from 'app/core/models/anexo/anexo';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';

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

	@ViewChild('fileLoader', { static: true })
	fileLoader!: ElementRef;
	
	@Input() tipoCamera!: string;
	@Input() infoDoc!: string;
	@Input() documentoLabel!: string;
	@Output() arquivoAnexado: EventEmitter<any> = new EventEmitter<any>();
	@Input() formatosAceitos: string;
	@Input() maxSize!: number; //Bytes
	
	mobile: boolean;
	myFiles: Array<any> = [];
	
	constructor(
		public dialog: MatDialog,
		public user: UserService,
		public _alert: CustomSweetAlertService
	) {
		this.mobile = configureMenuByWindowSize(window.screen.width);

		this.formatosAceitos = '.png, .jpg, .jpeg, .pdf';
	}

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		configureMenuByWindowSize(event.target.innerWidth);
	}


	add(file: any): void {
		this.checkType(file.target.files[0]).then((valid: boolean) => {
			if (valid) {
				this.fileToBase64(file.target.files[0]).then((result: string) => {
					if (result!.length > (this.maxSize / 4 * 3)) { // Cáculo do tamanho em base64
						this._alert.alertInfo(`Não conseguimos carregar o seu documento! Nos envie um arquivo com tamanho inferior à ${this.formatBytes(this.maxSize)}`);
					} else {
						let arquivo = new Anexo(this.getType(file.target.files[0].type), 'Anexo', result?.length, result)
						this.arquivoAnexado.emit(arquivo);
						this.emptyFilePath(file);
					}
				});
			} else {
				this._alert.alertWarningWithText("FORMATO INVÁLIDO", `O documento precisa ser nos formatos ${this.formatosAceitos.toLocaleUpperCase()}`);
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
				return 'invalido';
		}
	}

	checkType(file: any): Promise<boolean> {
		return new Promise((resolve) => {
			if (this.formatosAceitos.includes(this.getType(file.type))) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	}

	formatBytes(bytes: number): string {
		let decimals: number = 2;	
		const k = 1024;
		const decimais = decimals < 0 ? 0 : decimals;
		const tamanho = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimais))} ${tamanho[i]}`;
	}

	fileToBase64(arquivo: Blob): Promise<string> {
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

	openDialog(): void {
		let dialogRef = this.dialog.open(TirarFotoComponentDialog, {
			hasBackdrop: false, // não fecha a modal ao clicar fora
			width: 'auto',
			height: 'auto',
			maxWidth: '90%',
			data: { fileName: this.documentoLabel, tipoCamera: this.tipoCamera }
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result !== false) {
				let file: Anexo = new Anexo ('.jpeg', this.documentoLabel, result.length, result);
				this.arquivoAnexado.emit(file);
			}
		});
	}
}

@Component({
	selector: 'tirar-foto-dialog',
	templateUrl: 'tirar-foto-dialog.component.html',
	styleUrls: ["./tirar-foto-dialog.component.scss"]
})
export class TirarFotoComponentDialog {

	video!: any;
	retorno: any;
	flConfirm = false; //Habilitar botão de confirmação

	constructor(
		public dialogRef: MatDialogRef<TirarFotoComponentDialog>,
		public alert: CustomSweetAlertService,
		public user: UserService,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

	ngOnInit() {
		this.loadCamera('user');
	}

	private loadCamera(mode: string): void {
		this.alert.showLoading();

		let erro: any;
		let video = (document.querySelector("#webCamera") as HTMLVideoElement);

		//As opções abaixo são necessárias para o funcionamento correto no iOS
		video.setAttribute(this.encodeToPreventXSS('autoplay'), this.encodeToPreventXSS(''));
		video.setAttribute(this.encodeToPreventXSS('muted'), this.encodeToPreventXSS(''));
		video.setAttribute(this.encodeToPreventXSS('playsinline'), this.encodeToPreventXSS(''));
		//--

		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: mode } })
				.then(function (stream) {
					video.srcObject = stream;
				}).catch((error) => {
					erro = error.toString();
				}).finally(() => {
					if (erro) {
						if (erro.includes('NotAllowedError: Permission denied')) {
							this.alert.alertCamera("Para continuar com a solicitação é necessário o acesso câmera. Acesse o portal utilizando um computador ou dispositivo móvel com uma câmera habilitada.").then((r) => {
								if (r.value) {
									this.loadCamera('user');
								}
							});
						}
					}
					this.alert.closeLoading();
				});
		}
	}

	encodeToPreventXSS(s: any): string {
		return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
	}

	takeSnapShot(): void {
		//Captura elemento de vídeo
		let video = (document.querySelector("#webCamera") as HTMLVideoElement);

		//Criando um canvas que vai guardar a imagem temporariamente
		var canvas = document.createElement('canvas');
		canvas.width = video.clientWidth;
		canvas.height = video.clientHeight;
		var ctx = canvas.getContext('2d');

		//Desenhando e convertendo as dimensões
		ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

		var width = video.clientWidth;
		var height = video.clientHeight;

		canvas.width = width;
		canvas.height = height;
		ctx = canvas.getContext("2d");
		ctx?.drawImage(video, 0, 0, width, height);

		//Criando o JPG
		var dataURI = canvas.toDataURL('image/jpeg', 0.92); //O resultado é um BASE64 de uma imagem.
		this.data.imgString = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");

		video.pause();
		this.video = video;
		this.flConfirm = true;
	}

	private stopStreamedVideo(): void {
		let video = (document.querySelector("#webCamera") as HTMLVideoElement);
		this.video = video;
		let stream = this.video.srcObject;
		if (stream) {
			let tracks = stream.getTracks();
			tracks.forEach(function (track: any) {
				track.stop();
			});
			this.video.srcObject = null;
		}

	}

	close(): void {
		this.retorno = false;
		this.dialogRef.close(this.retorno);
		this.stopStreamedVideo();
	}

	confirm(): void {
		this.retorno = this.data.imgString;
		this.dialogRef.close(this.retorno);
		this.stopStreamedVideo();
	}
}
