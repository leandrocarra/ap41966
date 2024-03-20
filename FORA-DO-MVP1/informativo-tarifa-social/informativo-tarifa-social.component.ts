import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-informativo-tarifa-social',
  templateUrl: './informativo-tarifa-social.component.html',
  styleUrls: ['./informativo-tarifa-social.component.scss']
})
export class InformativoTarifaSocialComponent implements OnInit {
  
  mobile!: boolean;
  titleTooltip!: string;

  constructor(
    private _location : Location
  ) { 
  }

  ngOnInit(): void {
  }

  voltar(){
    this._location.back();
  }

}
