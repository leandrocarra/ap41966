import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DebitoJustificativa } from '../../../../../../core/models/debito-fatura/debito-justificativa';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { DebitoFaturaService } from '../../../../../../core/services/debito-fatura/debito-fatura.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';

@Component({
  selector: 'neo-debitos',
  templateUrl: './debitos.component.html',
  styleUrls: ['./debitos.component.scss']
})
export class DebitosComponent {
  selecionadasDoc: any = [];
  selecionadasImovel: any = [];
  valorDoc: number = 0;
  valorImovel: number = 0;
  totalDoc: number = 0;
  totalImovel: number = 0;
  btnJustificar: boolean = false;
  debitoJustificativa = new DebitoJustificativa();
  liberaProsseguir: boolean = false;
  uc: string;
  justificaDebito: boolean;
  constructor(
    private _router: Router,
    private _etapaService: DebitoFaturaService,
    private _dadosDoImovelService: DadosDoImovelService,
    private _alert: CustomSweetAlertService
  ) {
    this._dadosDoImovelService.setDebitos = true;
    this.uc = '';
    this.justificaDebito = false;
  }

  faturasAPagarDocumento(event: any): void {
    this.selecionadasDoc = event;
  }

  faturasAPagarImovel(event: any): void {
    this.selecionadasImovel = event;
  }

  obterUcDoc(event: any): void {
    if (event) {
      this.uc = event;
    }
  }

  pagarCartao(): void {
    const faturasSelecionadas = this.selecionadasDoc.concat(this.selecionadasImovel); //mocado abaixo
    const ucToSend = this.uc ? this.uc : this._dadosDoImovelService.getDadosDoImovel.endereco.uc;

    this._etapaService.gerarTokenPagarFaturas(ucToSend, faturasSelecionadas).subscribe(result => {
      document.getElementById('linkPagarFatura')!.setAttribute("href", "https://neoenergia.flexpag.com/elektro/#/pages/elektro?token=" + result);
      document.getElementById('modalPagar')!.style.display = "block";
    });

    this.justificaDebito = false;
  }

  valorAPagarDoc(event: any): void {
    this.valorDoc = event;
  }

  valorAPagarImovel(event: any): void {
    this.valorImovel = event;
  }

  getValorTotalDebitosSomados(): number {
    return this.valorDoc + this.valorImovel;
  }

  verificarTotalDoc(event: any): void {
    this.totalDoc = event;
    this.habilitarJustificar();
  }

  verificarTotalImovel(event: any): void {
    this.totalImovel = event;
    this.habilitarJustificar();
  }

  habilitarJustificar(): void {
    const faturasSelecionadas = this.selecionadasDoc.concat(this.selecionadasImovel);
    this.btnJustificar = this.totalDoc + this.totalImovel === faturasSelecionadas.length ? true : false;
  }

  justificarDebito(): void {
    this.justificaDebito = true;
    setTimeout(() => {
      document.getElementById('debitoPago')!.focus();
    }, 500);
  }

  checkPagamento(): void {
    let codigos: any = [];
    this.selecionadasImovel.forEach((vencidasImovel: any) => {
      codigos.push(vencidasImovel.numeroFatura);
    });
    this.selecionadasDoc.forEach((vencidasCpf: any) => {
      codigos.push(vencidasCpf.numeroFatura);
    })

    this.verificarPagamento(codigos);
  }

  verificarPagamento(codigos: any): void {
    this._etapaService.verificaPagamento(codigos).subscribe(
      (data) => {
        document.getElementById('modalPagar')!.style.display = "none";
        if (data) {
          this._router.navigateByUrl('/ligacao-nova/pedido/debitos');
        } else {
          this._alert.alertInfo("Ainda não conseguimos identificar o pagamento dos débitos listados. Caso já tenha efetuado o pagamento, tente novamente em alguns minutos.");
        }
      });
  }

  closePagar(): void {
    document.getElementById('modalPagar')!.style.display = "none";
  }

  liberaBtnProsseguir(): void {
    setTimeout(() => {
      this.liberaProsseguir = true;
    }, 10000);
  }

  setJustificativa(value: string): void {
    this._etapaService.setJustificativa = value;
    this._router.navigate(['/ligacao-nova/pedido/justificativa']);
  }

}
