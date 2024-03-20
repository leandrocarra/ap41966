import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { FaturaDTO } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { AvisoFatura, StatusFatura } from 'app/core/models/segunda-via/segunda-via.model';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { EntendaSuaContaService } from 'app/core/services/entenda-sua-conta/entenda-sua-conta.service';
import { PixService } from 'app/core/services/pix/pix.service';
import { SegundaViaService } from 'app/core/services/segunda-via/segunda-via.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { converterParaReais } from 'app/core/services/utils/neo-utils.service';
import { DialogPixComponent } from '../alerts/dialog-pix/dialog-pix.component';
import { EnviarEmailComponent } from '../alerts/enviar-email/enviar-email.component';
import { InternetBankingComponent } from '../alerts/internet-banking/internet-banking.component';
import { CodigoDeBarrasComponent } from '../cards/codigo-de-barras/codigo-de-barras.component';
import { BaixarSegundaVia } from '../faturas/baixar-segunda-via.component';

@Component({
	selector: 'app-card-ultima-fatura',
	templateUrl: './card-ultima-fatura.component.html',
	styleUrls: ['./card-ultima-fatura.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CardUltimaFaturaComponent {
	faturas: Array<FaturaDTO>;
	opcoesPagamento: Array<string>;
	opcoesDeFatura: Array<string>;
	faturaAtrasada: boolean = false;
	tooltipMsg: string = '';
	msgInformativoFatura: string = '';

	@Output() maisOpcoes = new EventEmitter();
	constructor(
		private _matIconRegistry: MatIconRegistry,
		private _domSanitizer: DomSanitizer,
		private _alert: CustomSweetAlertService,
		private _router: Router,
		private _segundaViaService: SegundaViaService,
		private _dialog: MatDialog,
		private _entendaSuaContaService: EntendaSuaContaService,
		private _pixService: PixService,
        private _selecaoDeImoveis : SelecaoImovelService,
	) {
		if (this._segundaViaService.getDadosSegundaVia.possuiFaturas) {
			this.faturas = this._segundaViaService.getFaturas;
		} else {
			this.faturas = [];
			this.msgInformativoFatura = (this._segundaViaService.getDadosSegundaVia.erroListarFaturas !== undefined) ?
                AvisoFatura.SemFaturasEmitidas : "Não conseguimos carregar suas informações no momento!";
		}
		this.adicionarSvgs();

		this.opcoesPagamento = [
			'Código',
			'Cartão de crédito',
			'Internet Banking'
		];

		this.opcoesDeFatura = [
			'Download',
			'Visualizar',
			'Enviar por e-mail',
			'Entenda sua conta'
		];
		this.informativoStatusFatura(this.faturas[0]?.statusFatura ?? "");
	}

    ngOnInit(): void {
        if(this._selecaoDeImoveis.getUCSelecionada?.indCCColetiva === 'X'){
            this.opcoesDeFatura.pop() //remover a opcao entenda sua conta
        }
     }

	adicionarSvgs(): void {
		let assetsPath: string = "assets/images/icons/";
		let icones: Array<string> = [
			'pix',
			'mais-opcoes'
		];

		icones.forEach(icon => {
			this._matIconRegistry.addSvgIcon(
				icon,
				this._domSanitizer.bypassSecurityTrustResourceUrl(
					assetsPath + `${icon}.svg`
				)
			);
		});
	}

	informativoStatusFatura(statusFatura: string) {
		let status = statusFatura.toLowerCase().replace(" ", "")
		if (status === "avencer"  || status === "vencida" || status === "parcialmentepago") {
			this.faturaAtrasada = true;
			this.tooltipMsg = AvisoFatura.VencidaAVencer;
		}
	}

	getStatus(status: string): string {
		return this._segundaViaService.getStatus(status);
	}

	valorFatura(valor: string): string {
		return (environment.regiao === Regiao.NE) ?converterParaReais(valor) : `R$ ${valor}`;
	}

	chamarDialogPix(): void {
		this._pixService.setFaturaSelecionada = this.faturas[0];
		this._dialog.open(DialogPixComponent, {
			width: '50vw',
			maxWidth: '900px',
			minWidth: '310px',
			maxHeight: '100vh',
			data: { fatura: this.faturas[0], tipoFatura: "faturaDTO" }
		});
	}

	redirecionar(opcaoPagamento: string) {
		switch (opcaoPagamento) {
			case 'Código': {
				this._dialog.open(CodigoDeBarrasComponent, {
					disableClose: false,
					hasBackdrop: true,
					width: '50vw',
					maxWidth: '900px',
					minWidth: '310px',
					maxHeight: '100vh',
					data: { fatura: this.faturas[0] }
				});
				break;
			}

			case 'Cartão de crédito': {
				this._alert.alertDirecionamentoDePagamento("Você está sendo redirecionado para a página de pagamento do FlexPag.");
				break;
			}

			case 'Internet Banking': {
				this._dialog.open(InternetBankingComponent, {
					disableClose: true,
					hasBackdrop: true,
					maxWidth: '90vw',
					maxHeight: '90vh',
					data: { fatura: this.faturas[0] }
				});
				break;
			}

			case 'Download': {
				this._dialog.open(BaixarSegundaVia, {
					disableClose: true,
					hasBackdrop: true,
					width: 'auto',
					height: 'auto',
					data: { numSeqOper: this.faturas[0].numeroFatura, fatura: this.faturas[0] }
				});
				break;
			}

			case 'Visualizar': {
				this._dialog.open(BaixarSegundaVia, {
					disableClose: true,
					hasBackdrop: true,
					width: 'auto',
					height: 'auto',
					data: { numSeqOper: this.faturas[0].numeroFatura, opcaoFatura: 'visualizar', fatura: this.faturas[0] }
				});
				break;
			}

			case 'Enviar por e-mail': {
				this._dialog.open(EnviarEmailComponent, {
					disableClose: true,
					hasBackdrop: true,
					width: '50vw',
					maxWidth: '900px',
					maxHeight: '100vh',
					minWidth: '310px',
                    data: { numSeqOper: this.faturas[0].numeroFatura, opcaoFatura: 'visualizar', fatura: this.faturas[0] }
				});
				break;
			}

			case 'Entenda sua conta': {
				this._entendaSuaContaService.faturaIndex = 0;
				this._entendaSuaContaService.setFatura = this.faturas[0];
				this._router.navigate([PathCompleto.entendaSuaConta]);
				break;
			}
		}
	}

    habilitarOpcoesDePagamento(fatura: FaturaDTO): boolean {
        return this._segundaViaService.habilitarOpcoesDePagamento(fatura);
    }
}
