import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';

@Component({
	selector: 'app-tirar-selfie',
	templateUrl: './tirar-selfie.component.html',
	styleUrls: ['./tirar-selfie.component.scss']
})
export class TirarSelfieComponent implements OnInit {
	selfie!: string;
	video!: any;
	mobile: boolean = false;
	mobileXS: boolean = false;
	hasSelfie!: boolean;
	showMask!: boolean;

	navExtra!: NavigationExtras; 
	constructor(
		private alert: CustomSweetAlertService,
		private _router: Router,
		private _activedRouter: ActivatedRoute
	) { 

		this._activedRouter.queryParams.subscribe(params => {
			if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
			  this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
			}
		  });
	  
		  console.log(this.navExtra);
	}

	ngOnInit(): void {
		this.loadCamera('user');
		this.alert.alertSelfieInstrucoes();

		if (window.screen.width <= 768) {
			this.mobile = true;
		}

		if (window.screen.width < 576) {
			this.mobileXS = true;
		}
	}

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.configureMenuByWindowSize(event.target.innerWidth);
	}

	configureMenuByWindowSize(width: any) {
		this.mobile = width <= 768 ? true : false;
		this.mobileXS = width < 576 ? true : false;
	}

	private loadCamera(mode: string): void {
		this.hasSelfie = false;
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
					this.showMask = true;
					if (erro) {
						if (erro.includes('NotAllowedError: Permission denied')) {
							this.alert.alertCamera("Para continuar com a solicitação é necessário o acesso à uma webcam. Acesse o portal utilizando um computador ou dispositivo móvel com uma câmera habilitada.").then((r) => {
								if (r.value) {
									this.loadCamera('user');
								}
							});
						}
					}
				});


		}
	}

	encodeToPreventXSS(s: string): string {

		return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
	}

	takeSelfie(): void {
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
		var ctx = canvas.getContext("2d");
		ctx?.drawImage(video, 0, 0, width, height);

		//Criando o JPG
		var dataURI = canvas.toDataURL('image/jpeg', 0.92);
		this.selfie = dataURI.replace(/^data:image\/[a-z]+;base64,/, "");

		video.pause();
		this.video = video;
		this.hasSelfie = true;
		this.showMask = false;
		this.alert.alertWarningSelfie();
	}

	takeAnotherSelfie(): void {
		this.stopStreamedVideo();
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
		this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'informativo-selfie'], this.navExtra)
	}

	confirm(): void {
		this.stopStreamedVideo();
		this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'informativo-sucesso'], this.navExtra)
	}
}
