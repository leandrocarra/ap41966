import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';
import { filter } from 'rxjs/operators';


@Component({
	selector: 'app-troca-stepper',
	templateUrl: './troca-stepper.component.html',
	styleUrls: ['./troca-stepper.component.scss']
})
export class TrocaStepperComponent implements OnInit {
	rotaTrocaTitularidade: any;
	url!: string;
	mobile: boolean;
	mobileXS: boolean;

	constructor(
		public loading: LoadingService,
		private _router: Router,
		private _service: TrocaDeTitularidadeService
	) {
		this.mobile = window.screen.width <= 768 ? true : false;
		this.mobileXS = window.screen.width < 576 ? true : false;
		_router.events.pipe(
			filter(event => event instanceof NavigationEnd)
		).subscribe((event: any) => {
			this.url = event.url;
			this.checkRoute(event.url);
		});
	}

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.configureMenuByWindowSize(event.target.innerWidth);
	}

	configureMenuByWindowSize(width: any) {
		this.mobile = width <= 768 ? true : false;
		this.mobileXS = width < 576 ? true : false;
	}

	ngOnInit(): void {
		this.rotaTrocaTitularidade = [
			"Dados do Imóvel",
			"Dados Pessoais",
			"Características",
			"Geração",
			"Concluído",
		]
	}

	checkRoute(rota: string): void {
		if (rota.includes("informativo-titularidade")) {
			document.getElementById("stepper-troca")!.style.display = "none";
		} else {
			this.rotaTrocaTitularidade = rota.includes("/novo-titular") ? this._service.stepsNovoTitular : this._service.stepsAntigoTitular;
			document.getElementById("stepper-troca")!.style.display = "flex";

			if (rota.includes("/novo-titular")) {
				this.checkStepNovo(rota); 
			} else {
				this.checkStepAntigo(rota);
			}
		}
	}

	checkStepAntigo(rota: string):void {
		if (rota.includes('documento-procuracao')) {
			this.setStep(0);
		} else if (rota.includes('contato-novo-titular')) {
			this.setStep(1);
		} else if (rota.includes('confirmar')) {
			this.setStep(2);
		} else if (rota.includes('solicitacao-enviada')) {
			this.setStep(3);
		} 
	}

	checkStepNovo(rota:string):void{
		if (rota.includes('documento-com-foto')) {
			this.setStep(0);
		} else if (rota.includes('informativo-sucesso')) {
			this.setStep(1);
		} else if (rota.includes('cadastrar-fatura-digital')) {
			this.setStep(2);
		} else if (rota.includes('confirmar')) {
			this.setStep(3);
		} else if (rota.includes('solicitacao-enviada')) {
			this.setStep(4);
		}
	}

	setStep(step: any): void {
		this.rotaTrocaTitularidade[step].current = false;
		this.rotaTrocaTitularidade[step].done = true
		if (step == 4 && this.url.includes("/novo-titular")) {
			this.rotaTrocaTitularidade[(step + 1)].done = true;
		} else if (step == 3 && this.url.includes("/antigo-titular")) {
			this.rotaTrocaTitularidade[(step + 1)].done = true;
		} else if (step != 4) {
			this.rotaTrocaTitularidade![(step + 1)].current = true;
		} 
	}
}
