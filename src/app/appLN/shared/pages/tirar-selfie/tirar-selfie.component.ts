import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Anexo } from '../../../core/models/anexo/anexo';
import { ReconhecimentoFacialRequest } from '../../../core/models/documentos/reconhecimento-facial-request';
import { DocumentosService } from '../../../core/services/documentos/documentos.service';
import { OcrService } from '../../../core/services/ocr/ocr.service';
import { CustomSweetAlertService } from '../../../core/services/sweet-alert/custom-sweet-alert.service';
import { configureMenuByWindowSize } from '../../../core/services/utils/neo-utils.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';

@Component({
	selector: 'app-tirar-selfie',
	templateUrl: './tirar-selfie.component.html',
	styleUrls: ['./tirar-selfie.component.scss']
})
export class TirarSelfieComponent {
    private faces = new ReconhecimentoFacialRequest();
	video: any;
	selfie: string;
	mobile: boolean;
	mobileXS: boolean;
	showMask: boolean;
	selfieTirada: boolean;
	contadorSelfie: number;
	constructor(
		private _documentoService: DocumentosService,
		private _alert: CustomSweetAlertService,
		private _ocrService: OcrService,
		private _location: Location,
		private _router: Router,
        private _loadingService: LoadingService
	) {
        this.selfie = '';
        this.showMask = false;
        this.selfieTirada = false;
        this.contadorSelfie = 0;
		this.mobile = configureMenuByWindowSize(window.screen.width);
		this.mobileXS = configureMenuByWindowSize(window.screen.width, 576);
        this.aoInicializar();
	}

	thenLoad(r: any) {
		if (r.value) {
			this.loadCamera('user');
		}
	}

	aoInicializar(): void {
		this._alert.alertSelfieInstrucoes().then(r => {
			this.thenLoad(r);
		});
	}

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
		this.mobileXS = configureMenuByWindowSize(event.target.innerWidth,  576);
	}

	private loadCamera(mode: string): void {
		this._loadingService.start();
		let video: HTMLVideoElement = document.querySelector("#webCamera")!;

		//As opções abaixo são necessárias para o funcionamento correto no iOS
		video.setAttribute(this.encodeToPreventXSS('autoplay'), this.encodeToPreventXSS(''));
		video.setAttribute(this.encodeToPreventXSS('muted'), this.encodeToPreventXSS(''));
		video.setAttribute(this.encodeToPreventXSS('playsinline'), this.encodeToPreventXSS(''));
		//--
		this.getMedia(video, mode);
	}

	getMedia(video: any, mode: any) {
		let erro: any;
		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: mode } })
            .then(function (stream) {
                video.srcObject = stream;
            }).catch((error) => {
                erro = error.toString();
            }).finally(() => {
                this.showMask = true;
                if (erro) {
                    if (erro.includes('NotAllowedError: Permission denied')) {
                        this._loadingService.stop();
                        this._alert.alertCamera("Para continuar com a solicitação é necessário o acesso à uma webcam. Acesse o portal utilizando um computador ou dispositivo móvel com uma câmera habilitada.").then((r) => {
                            this.thenLoad(r);
                        });
                    }
                } else {
                    this._loadingService.stop();
                }
            });
		}
	}

	encodeToPreventXSS(s: any): string {
		return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
	}

	takeSelfie(): void {
		//Captura elemento de vídeo
		let video: HTMLVideoElement = document.querySelector("#webCamera")!;

		//Criando um canvas que vai guardar a imagem temporariamente
		var canvas = document.createElement('canvas');
		canvas.width = video.clientWidth;
		canvas.height = video.clientHeight;
		var ctx = canvas.getContext('2d');

		//Desenhando e convertendo as dimensões
		ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);

		//Criando o JPG
		var dataURI = canvas.toDataURL('image/jpeg', 0.92);
		this.selfie = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");

		video.pause();
		this.video = video;
		this.selfieTirada = true;
	}

	takeAnotherSelfie(): void {
		this.stopStreamedVideo();
		this.selfieTirada = false;
		this.loadCamera('user');
	}

	private stopStreamedVideo(): void {
		let stream = this.video.srcObject;

		if (stream) {
			let tracks = stream.getTracks();

			tracks.forEach(function (track: any) {
				track.stop();
			});

			this.video.srcObject = null;
		}
	}

	voltar(): void {
		this._location.back();
	}

	confirmar(): void {
		this.stopStreamedVideo();
		this.compararFaces();
	}

	compararFaces() {
		if (this._documentoService.docFotoParaComparar && this.selfie) {
			this.faces.face_a = this.selfie;
			this.faces.face_b = this._documentoService.docFotoParaComparar;

			this._ocrService.compare(this.faces).then((data: any) => {
					let imageMatch = data?.result?.result === "True" && data?.result?.distance < this._ocrService.ACCEPTABLE_FACE_DISTANCE;
					this.verificaFotoMatch(imageMatch, data);
			});
		} else {
			this._alert.alertError("Imagens nao encontradas");
			setTimeout(() => {
				this.loadCamera('user');
				this.selfieTirada = false;
			}, 3000);
		}
	}

	verificaFotoMatch(imageMatch: boolean, valorRetornadoOCR: any) {
		if (imageMatch) {
			this.selfieMatch();
		} else if (!imageMatch) {
			this.selfieNotMatch(valorRetornadoOCR);
		}
	}

	selfieMatch() {
		this.amazenaFoto(this.selfie);
		this._alert.alertSelfiConfirm().then(r => {
			if (r) {
				this._loadingService.stop();
				this.stopStreamedVideo();
				this._documentoService.documentos.selfieError = false;
				this._router.navigate(['/ligacao-nova/dados-do-titular']);

			}
		});
	}

	selfieNotMatch(valorRetornadoOCR: any) {
		this.contadorSelfie += 1;
		if (this.contadorSelfie < 3) {
			this._alert.alertWarningSelfie().then(r => {
				if (r.value === true) {
					this.selfieTirada = false;
					setTimeout(() => {
						this.loadCamera('user');
					}, 100);
				}
			});
		} else {
			this.amazenaFoto(this.selfie);
			this._alert.alertEndWarningSelfie().then(() => {
				this.stopStreamedVideo();
				this._documentoService.documentos.selfieError = true;
				this._documentoService.documentos.selfieScore = valorRetornadoOCR.result.distance;
				this._router.navigate(['/ligacao-nova/dados-do-titular']);
			});
		}
	}

	amazenaFoto(selfie: any) {
		let arquivo = new Anexo('.jpeg', 'selfie', selfie.length, selfie);
		this._documentoService.documentos.selfie.push(arquivo);
	}
}
