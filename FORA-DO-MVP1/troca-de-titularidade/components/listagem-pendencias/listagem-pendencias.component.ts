import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { UserService } from 'app/core/services/user/user.service';
import { InternetBankingComponent } from 'app/shared/components/alerts/internet-banking/internet-banking.component';

@Component({
  selector: 'app-listagem-pendencias',
  templateUrl: './listagem-pendencias.component.html',
  styleUrls: ['./listagem-pendencias.component.scss']
})
export class ListagemPendenciasComponent implements OnInit {


  @Input() faturas: any;
  @Output() pagamentoRealizado: EventEmitter<any> = new EventEmitter<any>()

  mobile = false;
  mobileXS= false;

  constructor(
    public user: UserService,
    private _clipboard: Clipboard,
    private _dialog: MatDialog,
    public alert: CustomSweetAlertService
  ) { }

  ngOnInit(): void {
    if (window.screen.width < 576) {
      this.mobileXS = true;
    }

    if (window.screen.width <= 768) {
        this.mobile = true;
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.configureMenuByWindowSize(event.target.innerWidth);
  }

  configureMenuByWindowSize(width: any) {
    this.mobile = width <= 768 ? true : false;
    this.mobileXS = width < 576 ? true : false;
  }

  codigoBarras(codigoBarras: any) {
    this.copiarCodigoBarras(codigoBarras);
    this.alert.alertCodigoDeBarrasPagamento();
    this.pagamentoRealizado.emit('bloquear');
  }

  copiarCodigoBarras(codigoBarras: any) {
    this._clipboard.copy(codigoBarras);
    this.pagamentoRealizado.emit('bloquear');
  }

	pagarComCartaoCredito(): void {
		this.alert.alertDirecionamentoDePagamento("Você está sendo redirecionado para a página de pagamento do FlexPag.");
    this.pagamentoRealizado.emit('ok');
	}

	pagarComInternetBanking(codigoBarras: any): void {
		this.copiarCodigoBarras(codigoBarras);
		const dialogRef = this._dialog.open(InternetBankingComponent, {
			disableClose: true,
			hasBackdrop: true,
			maxWidth: '90vw',
			maxHeight: '90vh'
		});
    this.pagamentoRealizado.emit('bloquear');
	}

	pagarComPix(): void {
		this.alert.alertPixIndisponivel();
    this.pagamentoRealizado.emit('bloquear');
	}

  visualizar(fatura: any) {
    this.alert.alertVisualizarFatura(fatura);
    this.pagamentoRealizado.emit('bloquear');
  }

}
