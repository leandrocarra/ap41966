import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomSweetAlertService } from '../../../core/services/sweet-alert/custom-sweet-alert.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';

@Component({
	selector: 'neo-dialog-tirar-foto',
	templateUrl: './dialog-tirar-foto.component.html',
	styleUrls: ['./dialog-tirar-foto.component.scss']
})
export class DialogTirarFotoComponent implements AfterViewInit {
	video: any;
	retorno: any;
	fileConfirm = false;
	imgString: string;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: {
			tipoCamera: string;
		},
		private _matDialogRef: MatDialogRef<DialogTirarFotoComponent>,
		private _alert: CustomSweetAlertService,
        private _loadingService: LoadingService
    ) {
        //user -> camera frontal;
        //environment -> camera traseira;
        this.imgString = '';
    }

    ngAfterViewInit(): void {
        this.loadCamera(this.data.tipoCamera);
    }

	private loadCamera(mode: string): void {
		this._loadingService.start();

		let erro: any;
		let video = (document.querySelector("#webCamera") as HTMLVideoElement);

		//As opções abaixo são necessárias para o funcionamento correto no iOS
		video.setAttribute(this.encodeToPreventXSS('autoplay'), this.encodeToPreventXSS(''));
		video.setAttribute(this.encodeToPreventXSS('muted'), this.encodeToPreventXSS(''));
		video.setAttribute(this.encodeToPreventXSS('playsinline'), this.encodeToPreventXSS(''));
		//--

		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: mode } }).then(function (stream) {
                video.srcObject = stream;
            }).catch((error) => {
                erro = error.toString();
            }).finally(() => {
                if (erro) {
                    if (erro.includes('NotAllowedError: Permission denied')) {
                        this._alert.alertCamera("Para continuar com a solicitação é necessário o acesso câmera. Acesse o portal utilizando um computador ou dispositivo móvel com uma câmera habilitada.").then((r) => {
                            if (r.value) {
                                this.loadCamera('user');
                            }
                        });
                    }
                }
                this._loadingService.stop();
            });
		}
	}

	encodeToPreventXSS(source: string): string {
		return source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
	}

	takeSnapShot(): void {
		//Captura elemento de vídeo
		let video = (document.querySelector("#webCamera") as HTMLVideoElement);

		//Criando um canvas que vai guardar a imagem temporariamente
		var canvas = document.createElement('canvas');
		canvas.width = video.clientWidth;
		canvas.height = video.clientHeight;
		var ctx = canvas.getContext('2d')!;

		//Desenhando e convertendo as dimensões
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

		var width = video.clientWidth;
		var height = video.clientHeight;

		canvas.width = width;
		canvas.height = height;
		ctx = canvas.getContext("2d")!;
		ctx.drawImage(video, 0, 0, width, height);

		//Criando o JPG
		var dataURI = canvas.toDataURL('image/jpeg', 0.92); //O resultado é um BASE64 de uma imagem.
		this.imgString = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");

		video.pause();
		this.video = video;
		this.fileConfirm = true;
	}

	private stopStreamedVideo(): void {
		this.video = (document.querySelector("#webCamera") as HTMLVideoElement);
		let stream = this.video.srcObject;

		if (stream) {
			let tracks = stream.getTracks();

			tracks.forEach((track: any) => {
				track.stop();
			});

			this.video.srcObject = null;
		}
	}

	public close(): void {
		this.retorno = false;
		this._matDialogRef.close(this.retorno);
		this.stopStreamedVideo();
	}

	confirm(): void {
		this.retorno = this.imgString;
		this._matDialogRef.close(this.retorno);
		this.stopStreamedVideo();
	}
}
