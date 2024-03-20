import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { DebitoFaturaService } from '../../../../../../core/services/debito-fatura/debito-fatura.service';

@Component({
  selector: 'neo-debito-imovel',
  templateUrl: './debito-imovel.component.html',
  styleUrls: ['./debito-imovel.component.scss']
})
export class DebitoImovelComponent implements OnInit {

  constructor(
    private _debitoFaturaService: DebitoFaturaService,
    private _dadosDoImovelService: DadosDoImovelService,
  ) { }

  faturasAtrasadasImovel: any = [];
  listaFaturas: any = [];
  selectItem: boolean = false;
  selectAll: boolean = false;
  valorTotalDebitosNoImovel: number = 0;

  @Output() faturasAPagar = new EventEmitter();
  @Output() valorAPagar = new EventEmitter();
  @Output() totalFaturas = new EventEmitter();

  ngOnInit(): void {
    this.consultarDebitoImovel();
  }

  consultarDebitoImovel() {
    this._debitoFaturaService.listarDebitoImovel(this._dadosDoImovelService.getDadosDoImovel.endereco.uc).subscribe(
      (data) => {
        if (data) {
          if (data.length > 0) {
            this.faturasAtrasadasImovel = data;
          }
        }
      })
  }


  onSelectAll(): void {
    this.listaFaturas = [];
    this.valorTotalDebitosNoImovel = 0;

    if (!this.selectItem) {
      this.selectItem = true;
      this.faturasAtrasadasImovel.forEach((vencidas: any) => {
        this.listaFaturas.push(vencidas.numeroFatura);
        this.valorTotalDebitosNoImovel += vencidas.valorEmissao;
      });
    } else {
      this.selectItem = false;
      this.listaFaturas = [];
      this.valorTotalDebitosNoImovel = 0;
    }
    this.faturasAPagar.emit(this.listaFaturas);
    this.valorAPagar.emit(this.valorTotalDebitosNoImovel);
    this.totalFaturas.emit(this.faturasAtrasadasImovel.length);
  }

  faturasSelecionadas(vencida: any): void {
    if (this.listaFaturas) {
      let hasAdded = this.listaFaturas.includes(vencida.numeroFatura);

      if (hasAdded) {
        let index = this.listaFaturas.indexOf(vencida.numeroFatura);
        this.listaFaturas.splice(index, 1);
        this.valorTotalDebitosNoImovel -= vencida.valor;
        vencida.selectItem = false;
      } else {
        this.listaFaturas.push(vencida.numeroFatura);
        this.valorTotalDebitosNoImovel += vencida.valor;
        vencida.selectItem = true;
      }
    }

    this.mudarSelecionarTodos();
    this.faturasAPagar.emit(this.listaFaturas);
    this.valorAPagar.emit(this.valorTotalDebitosNoImovel);
    this.totalFaturas.emit(this.faturasAtrasadasImovel.length);
  }

  mudarSelecionarTodos(): void {
    this.selectAll = this.listaFaturas.length === this.faturasAtrasadasImovel.length ? true : false;
    this.valorTotalDebitosNoImovel = !this.listaFaturas.length ? 0 : this.valorTotalDebitosNoImovel;
  }

  formatarData(data: any): any {
    const vencimento = new Date(data);
    var mes = vencimento.getMonth();
    var mesExtenso = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    return mesExtenso[mes];
  }

  getDate(data: any): Date {
    return new Date(data);
  }

  diasDeAtraso(dataVencimento: any): any {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    const diferença = Math.abs(hoje.getTime() - vencimento.getTime());
    const dias = Math.ceil(diferença / (1000 * 60 * 60 * 24));
    return dias - 1;
  }

}
