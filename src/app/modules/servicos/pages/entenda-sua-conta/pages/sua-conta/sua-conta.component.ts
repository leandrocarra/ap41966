import { Component, HostListener, OnInit } from '@angular/core';
import { EntendaSuaContaDTOResponse } from 'app/core/models/entenda-sua-conta/response/entenda-sua-conta-dto';
import { EntendaSuaContaService } from 'app/core/services/entenda-sua-conta/entenda-sua-conta.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';
import { DadosConsumo } from 'app/shared/models/cards/card-dados-consumo/dados-consumo';

@Component({
  selector: 'app-sua-conta',
  templateUrl: './sua-conta.component.html',
  styleUrls: ['./sua-conta.component.scss']
})
export class SuaContaComponent implements OnInit {

  mobile: boolean = false;
  faturaComValorDeFaseMinimo: boolean = false;
  faturaDisponivel: boolean = false;
  dadosEntendaContaDTO: EntendaSuaContaDTOResponse;

  descricoesCards: Array<DadosConsumo>; //TODO remover dados mockados
  constructor(private _entendaSuaContaService: EntendaSuaContaService) {
    this.descricoesCards = [
      {
        consumo: "Menor consumo",
        mesAno: "Dezembro/2020",
        valor: "129",
        porcentagem: "-3",
        mediaDiaria: "2.20"
      },
      {
        consumo: "Maior consumo",
        mesAno: "Dezembro/2020",
        valor: "190",
        porcentagem: "+1,7",
        mediaDiaria: "8.90"
      }
    ];

    this.dadosEntendaContaDTO = this._entendaSuaContaService.getDadosEntendaSuaConta;
  }

  ngOnInit(): void {
    this.mobile = configureMenuByWindowSize(window.screen.width);
    this.faturaDisponivel = this.validarFaturaDisponivel();
    this.faturaComValorDeFaseMinimo = this.validarFaturaValorDeFase();
}

validarFaturaDisponivel(): boolean {
  return  (this.dadosEntendaContaDTO.retorno.numero === "353" || this.dadosEntendaContaDTO.retorno.numero === "354")  ? false : true;
}

validarFaturaValorDeFase(): boolean {
  return  (this.dadosEntendaContaDTO.retorno.numero === "353")  ? false : true;
}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }
}
