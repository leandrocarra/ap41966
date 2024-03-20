import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardAcessoRapido, CardDestaques } from 'app/core/models/pagina-inicial/pagina-inicial';
import { PaginaInicialService } from 'app/core/services/pagina-inicial/pagina-inicial.service';

@Component({
	selector: 'app-pagina-inicial',
	templateUrl: './pagina-inicial.component.html',
	styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {
	mobile: boolean;
	banner: string;
	tituloSectionDois: string;
	tituloSectionTres: string;
	cardsDestaques: Array<CardDestaques>;
	cardsAcessoRapido: Array<CardAcessoRapido>;
	constructor(
		private _paginaInicialService: PaginaInicialService,
		private _router: Router
	) {
		this.mobile = window.screen.width <= 768;
		this.banner = this._paginaInicialService.banner;
		this.tituloSectionDois = this._paginaInicialService.tituloSectionDois;
		this.tituloSectionTres = this._paginaInicialService.tituloSectionTres;
		this.cardsDestaques = this._paginaInicialService.cardsDestaques;
		this.cardsAcessoRapido = this._paginaInicialService.criarCardsAcessoRapido(this._router.url);
	}
	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.configureMenuByWindowSize(event.target.innerWidth);
	}

	configureMenuByWindowSize(width: any) {
		this.mobile = width <= 768;
	}

	ngOnInit(): void {
		window.scroll(0, 0);
	}

}
