import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-fatura-info",
  templateUrl: "./fatura-info.component.html",
  styleUrls: ["./fatura-info.component.scss"],
})
export class FaturaInfoComponent implements OnInit {
  fatura = {
    formaPagamento: "Boleto",
    entregaFatura: "No imóvel",
    vencimento: "03/03/2021",
    demanda: "20.000kWh",
  };
  constructor() {}

  ngOnInit(): void {}
}
