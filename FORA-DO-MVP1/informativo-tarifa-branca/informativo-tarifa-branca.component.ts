import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informativo-tarifa-branca',
  templateUrl: './informativo-tarifa-branca.component.html',
  styleUrls: ['./informativo-tarifa-branca.component.scss']
})
export class InformativoTarifaBrancaComponent {

  mobile:boolean;

  constructor(
    public _router: Router,
    private _location: Location,
  ) { 
    this.mobile = window.screen.width <= (768) ? true : false;
  }

  @HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.configureMenuByWindowSize(event.target.innerWidth);
	}

  configureMenuByWindowSize(width: any): void {
    this.mobile = (width <= 768 ) ? true : false;
  }

  voltar(): void{
    this._location.back();
  }

}
