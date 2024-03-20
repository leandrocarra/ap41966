import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dicas-de-consumo',
  templateUrl: './dicas-de-consumo.component.html',
  styleUrls: ['./dicas-de-consumo.component.scss']
})
export class DicasDeConsumoComponent implements OnInit {

  data: any;

  constructor() { }

  ngOnInit(): void {
    this.data = [
      {
        label: "Canal do Youtube",
        link: "https://www.youtube.com/c/NeoenergiaElektro",
      },
      {
        label: "Consumo consciente",
        link: "https://www.elektro.com.br/sua-casa/dicas-de-economia-e-seguranca-com-energia-eletrica",
      },
      {
        label: "Central de ajuda",
        link: "https://www.neoenergiaelektro.com.br/fale-com-a-gente/canais-de-atendimento",
      }
    ]
  }

}
