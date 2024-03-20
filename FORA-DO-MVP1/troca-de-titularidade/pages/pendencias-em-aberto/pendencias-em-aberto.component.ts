import { Clipboard } from '@angular/cdk/clipboard';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { UserService } from 'app/core/services/user/user.service';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';
import { InternetBankingComponent } from 'app/shared/components/alerts/internet-banking/internet-banking.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-pendencias-em-aberto',
	templateUrl: './pendencias-em-aberto.component.html',
	styleUrls: ['./pendencias-em-aberto.component.scss']
})

export class PendenciasEmAbertoComponent implements OnInit {

	/*
		TODO: Ao realizar integração, é necessário ajustar fluxo de pendências UC e de CPF.
		prototipo terceiro com pendências => https://xd.adobe.com/view/e8d9384b-2ad1-4cef-b62f-355c6d568cd8-bd8a/screen/1cad4e7d-0769-4c89-b69a-17d6913a6f2c/
		prototipo uc com pendências => https://xd.adobe.com/view/e8d9384b-2ad1-4cef-b62f-355c6d568cd8-bd8a/screen/af49eed4-b39b-49a1-bad4-bbdb5abbc8b5/

	*/

	groupUser: string;
	isDisabled: boolean = true;
	checkDeclaracao: boolean = false;
	validarPagamentoNovoUC: boolean = false;

	listaFaturas!: Array<any>;
	totalFaturas: any;

	myFiles!: Array<any>;
	arquivo: any;

	navExtra!: NavigationExtras;

	mobileXS: boolean;
	mobileS: boolean;

	constructor(
		private _user: UserService,
		private _router: Router,
		private _activedRouter: ActivatedRoute,
		private _clipboard: Clipboard,
		private _dialog: MatDialog,
		public alert: CustomSweetAlertService,
		public trocaTitularidadeService: TrocaDeTitularidadeService
	) {
		this.groupUser = this._user.group;

		this.mobileXS = (window.screen.width < 612) ? true : false;
		this.mobileS = (window.screen.width < 370) ? true : false;

		this._activedRouter.queryParams.subscribe(params => {
			if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
				this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
			}
		});
		console.log(this.navExtra);
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.configureMenuByWindowSize(event.target.innerWidth);
	}

	configureMenuByWindowSize(width: any) {
		this.mobileXS = width <= 612 ? true : false;
		this.mobileS = width <= 370 ? true : false;
	}

	codigoBarras(): void {
		this.copiarCodigoBarras();
		this.alert.alertCodigoDeBarrasPagamento();
		this.validarPagamento('bloquear');
	}

	cartaoCredito(): void {
		this.alert.alertDirecionamentoDePagamento("Você está sendo redirecionado para a página de pagamento do FlexPag.");
		this.validarPagamento('ok');
	}

	internetBanking(): void {
		this.copiarCodigoBarras();
		const dialogRef = this._dialog.open(InternetBankingComponent, {
			disableClose: true,
			hasBackdrop: true,
			maxWidth: '90vw',
			maxHeight: '90vh'
		});
		this.validarPagamento('bloquear');
	}

	copiarCodigoBarras(): void {
		this._clipboard.copy('12345556778899000000098763211345677880000000000000');
	}

	pix(): void {
		this.alert.alertPixIndisponivel();
		this.validarPagamento('bloquear');
	}

	ngOnInit(): void {
		this.totalFaturas = 'R$ 572.00'
		this.listaFaturas = [

			{
				'imovel': "987654321",
				'valor': '199,00',
				'vencimento': '28/08/2021',
				'status': 'Em aberto',
				'codigoBarras': '12345556778899000000098763211345677880000000000000'
			},
			{
				'imovel': "987654321",
				'valor': '240,00',
				'vencimento': '28/08/2021',
				'status': 'Em aberto',
				'codigoBarras': '12345556778899033000098763211345677880000000000000'
			}
		]
	}

	validarBtnNovoUC(): void {
		this.isDisabled = (this.validarPagamentoNovoUC && this.checkDeclaracao) ? false : true;
	}

	validarPagamento(result: string): void {
		if (this.navExtra.state!.fluxoPendencia === 'pendencia-novo-uc') {
			this.validarPagamentoNovoUC = (result === 'ok') ? true : false;
			if (this.validarPagamentoNovoUC && this.checkDeclaracao) {
				this.isDisabled = false;
			} else {
				this.isDisabled = true;
			}
		} else {
			this.isDisabled = (result === 'ok') ? false : true;
		}
	}

	naoReconheceDivida(): void {
		if (this.navExtra.state!.fluxoPendencia === 'pendencia-novo-uc') {
			this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'motivo'], this.navExtra);
		} else {
			this.alert.alertNaoReconheceDividaTroca().then((r => {
				if (r.value) {
					this._router.navigate(['home', 'meus-imoveis']);
				}
			}));
		}
	}

	recebeAnexos(file: any): void {
		if (file !== undefined) {
			this.myFiles.push(file);
			this.validarPagamento('ok');
		}
	}

	removeAnexo(file: any): void {
		var indice = this.myFiles.indexOf(file);
		this.myFiles.splice(indice, 1);
		this.validarPagamento('bloquear');
	}

	voltar(): void {
		if (this.navExtra.state!.fluxoPendencia === 'pendencia-antigo-terceiro') {
			this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'informar-novo-titular'], this.navExtra);
		} else if (this.navExtra.state!.fluxoPendencia === 'pendencia-antigo-uc') {
			this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'imovel-endereco'], this.navExtra);
		} else if (this.navExtra.state!.fluxoPendencia === 'pendencia-novo-uc') {
			this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'informar-imovel'], this.navExtra);
		} else if (this.navExtra.state!.fluxoPendencia === 'pendencia-antigo-titular' || this.navExtra.state!.fluxoPendencia === 'pendencia-novo-titular') {
			this._router.navigate(['servicos', 'troca-de-titularidade', 'escolha-titular'], this.navExtra);
		}
	}

	continuar(): void {
		if (this.navExtra.state!.fluxoPendencia === 'pendencia-antigo-terceiro') {
			this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'contato-novo-titular'], this.navExtra);
		} else if (this.navExtra.state!.fluxoPendencia === 'pendencia-antigo-uc') {
			this.trocaTitularidadeService.dadosTitular = true;
			this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'documento-procuracao'], this.navExtra);
		} else if (this.navExtra.state!.fluxoPendencia === 'pendencia-novo-uc') {
			this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'documento-com-foto'], this.navExtra);
		} else if (this.navExtra.state!.fluxoPendencia === 'pendencia-novo-titular') {
			this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'informar-imovel'], this.navExtra);
		} else if (this.navExtra.state!.fluxoPendencia === 'pendencia-antigo-titular') {
			this.trocaTitularidadeService.imovel = true;
			this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'imovel-endereco'], this.navExtra);
		}
	}
}
