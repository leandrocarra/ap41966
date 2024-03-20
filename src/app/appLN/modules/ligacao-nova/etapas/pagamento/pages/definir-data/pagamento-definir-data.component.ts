import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DadosPagamento } from '../../../../../../core/models/dados-pagamento/dados-pagamento';
import { DadosPagamentoService } from '../../../../../../core/services/dados-pagamento/dados-pagamento.service';
import { configureMenuByWindowSize } from '../../../../../../core/services/utils/neo-utils.service';

@Component({
  selector: 'neo-pagamento',
  templateUrl: './pagamento-definir-data.component.html',
  styleUrls: ['./pagamento-definir-data.component.scss']
})
export class PagamentoDefinirDataComponent {

  botaoData: any;
  possiveisDatas: any;
  mobile: boolean;
  dadosPagamento = new DadosPagamento();

  constructor(
    private _router: Router,
    private _etapaService: DadosPagamentoService,
    private _location: Location,
  ) {
    this.possiveisDatas = ['3', '8', '13', '18', '23', '28', 'undefined'];
    this.mobile = configureMenuByWindowSize(window.screen.width);
    this.dadosPagamento = this._etapaService.dadosPagamento;
    this.setDataVencimento(this._etapaService.getDataVencimento);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  setDataVencimento(dataVencimento: string) {
    this._etapaService.setDataVencimento = dataVencimento;
  }

  voltar() {
    this._location.back();
  }

  avancar(): void {
    this._router.navigate(['ligacao-nova', 'pagamento', 'entrega-da-fatura']);
  }

}
