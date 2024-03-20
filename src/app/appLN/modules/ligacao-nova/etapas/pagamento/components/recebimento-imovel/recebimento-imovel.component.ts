import { Component, EventEmitter, HostListener, OnInit, Output } from "@angular/core";
import { DadosPagamento } from '../../../../../../core/models/dados-pagamento/dados-pagamento';
import { DadosDoImovelService } from "../../../../../../core/services/dados-do-imovel/dados-do-imovel.service";
import { configureMenuByWindowSize } from "../../../../../../core/services/utils/neo-utils.service";
import { DadosPagamentoService } from '../../../../../../core/services/dados-pagamento/dados-pagamento.service';

@Component({
  selector: 'neo-recebimento-imovel',
  templateUrl: './recebimento-imovel.component.html',
  styleUrls: ['./recebimento-imovel.component.scss']
})
export class RecebimentoImovelComponent implements OnInit {

  mobile: boolean;
  dadosPagamento: DadosPagamento;
  @Output() enviarDados = new EventEmitter();

  constructor(
    public _dadosImovelService: DadosDoImovelService,
    private _etapaService: DadosPagamentoService
  ) {
    this.mobile = configureMenuByWindowSize(window.screen.width);
    this._etapaService.setRecebimentoNoImovel = this._dadosImovelService.getEndereco;
    this.dadosPagamento = this._etapaService.getDadosPagamento;

  }

  ngOnInit(): void {
    this.enviarDados.emit(true);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }
}
