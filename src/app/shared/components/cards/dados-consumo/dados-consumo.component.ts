import { Component, Input, OnInit } from '@angular/core';
import { DadosConsumo } from 'app/shared/models/cards/card-dados-consumo/dados-consumo';

@Component({
  selector: 'app-dados-consumo',
  templateUrl: './dados-consumo.component.html',
  styleUrls: ['./dados-consumo.component.scss']
})
export class DadosConsumoComponent implements OnInit {

  @Input() valor!: DadosConsumo;
  @Input() tela!: string;
  @Input() corDoCard!: string;


  constructor() { }

  ngOnInit(): void { }

  verificaTipoCard(valor: any): string {
    switch (valor) {
      case 'Maior consumo':
        return "maior-consumo-color tamanho-fonte";

      case 'Consumo mês anterior':
        return "mes-anterior-color tamanho-fonte";

      default:
        return "menor-consumo-color tamanho-fonte";
    }
  }

  verificaTipoClock(valor: any): string {
    switch (valor) {

      case 'Maior consumo':
        return "material-icons-outlined clock maior-consumo-color";

      case 'Consumo mês anterior':
        return "material-icons-outlined clock mes-anterior-color";

      default:
        return "material-icons-outlined clock menor-consumo-color";
    }
  }


}
