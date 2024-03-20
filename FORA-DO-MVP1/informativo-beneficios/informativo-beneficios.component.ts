import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informativo-beneficios',
  templateUrl: './informativo-beneficios.component.html',
  styleUrls: ['./informativo-beneficios.component.scss']
})
export class InformativoBeneficiosComponent implements OnInit {
  
  mobileXS: boolean = false;
  mobile: boolean = false;

  constructor(
    public router : Router,
    private _location: Location
  ) { 
    this.mobile=window.screen.width < (768) ? true : false;
  }

  ngOnInit(): void {
  }

  @HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.configureMenuByWindowSize(event.target.innerWidth);
	}

  configureMenuByWindowSize(width: any): void {
    this.mobile = width <= 768 ? true : false;
    this.mobileXS = width < 576 ? true : false;
  }

  fechar(): void {
    this._location.back();
  }

}
