import { Component, HostListener } from '@angular/core';
import { DadosPagamentoService } from '../../../../core/services/dados-pagamento/dados-pagamento.service';
import { LigacaoNovaService } from '../../../../core/services/ligacao-nova/ligacao-nova.service';
import { UserServiceLN } from '../../../../core/services/user/user.service';
import { GerarPdfService } from '../../../../core/services/utils/gerar-pdf/gerar-pdf.service';
import { configureMenuByWindowSize } from '../../../../core/services/utils/neo-utils.service';

@Component({
  selector: 'neo-conclusao',
  templateUrl: './conclusao.component.html',
  styleUrls: ['./conclusao.component.scss']
})
export class ConclusaoComponent {

  public mobile: boolean;
  public protocolo: string;
  public dadosUsuario: any;
  public dadosPagamento: any;
  public checkUE: boolean;
  public gostariaReceberEmail: boolean = false;

  constructor(
    private _userServiceLN: UserServiceLN,
    private _dadosPagamentoService: DadosPagamentoService,
    private _ligacaoNovaService: LigacaoNovaService,
    private _gerarPDFService: GerarPdfService
  ) {
    this.gostariaReceberEmail = this._dadosPagamentoService.dadosPagamento.faturaDigital == 'Sim' ? true : false;
    this.dadosUsuario = this._ligacaoNovaService.getDadosDoBeneficiario;
    this.dadosPagamento = this._ligacaoNovaService.dadosDePagamento;
    this.protocolo = this._userServiceLN.protocoloFinal;
    this.checkUE = this._ligacaoNovaService.checkUE;
    this.mobile = configureMenuByWindowSize(window.screen.width, 998);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  preencherPDF(): void {
    if (this.checkUE) {
      this._gerarPDFService.criaAnexoContrato();
    }
  }

}
