import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DadosDoImovel } from '../../../../../../core/models/dados-do-imovel/endereco';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { DebitoFaturaService } from '../../../../../../core/services/debito-fatura/debito-fatura.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';

export interface DialogData {
	UEOptions: any;
	UcOptions: any;
	dadosImovel: any;
}

@Component({
	selector: 'neo-confirmar-endereco',
	templateUrl: './confirmar-endereco.component.html',
	styleUrls: ['./confirmar-endereco.component.scss']
})
export class ConfirmarEnderecoComponent implements OnInit {
	public dadosDoImovel: DadosDoImovel;
	public confirmarEnderecoPreenchido: boolean;
	constructor(
		public dialog: MatDialog,
		private _router: Router,
		private _location: Location,
		private _dadosDoImovelService: DadosDoImovelService,
		private _alert: CustomSweetAlertService,
		private _debitoService: DebitoFaturaService,
		private _userServiceLN: UserServiceLN,
	) {
		this.dadosDoImovel = this._dadosDoImovelService.getDadosDoImovel;
        this.confirmarEnderecoPreenchido = false;
	}

	ngOnInit(): void {
		document.body.scrollTop = 0;
	}

	voltar(): void {
		this._location.back();
	}

	debitoCep(): void {
		this._dadosDoImovelService.listarUc(this.dadosDoImovel.endereco).subscribe(data => {
			if (data && data.length > 0) {
				this.openUcDialog(data);
			} else {
				this._dadosDoImovelService.getDadosDoImovel.endereco.uc = "";
				this.verificaFluxoDebitos();
			}
		});
	}

	openUcDialog(data: any): void {
		let mobile = window.screen.width < 768 ? true : false;

		const dialogRef = this.dialog.open(UcDialogComponent, {
			width: mobile ? '100%' : '850px',
			height: mobile ? '100%' : '465px',
			maxWidth: '100vw',
			data: { UcOptions: data, mobile: mobile, dadosImovel: this._dadosDoImovelService.getDadosDoImovel.endereco }
		});

		dialogRef.afterClosed().subscribe(result => {
			this.verificarSelecao(result);
		});
	}

	verificarSelecao(result: any): void {
		if (result === 'naoEncontrado') {
			this._dadosDoImovelService.getDadosDoImovel.endereco.uc = "";
			this.verificaFluxoDebitos();
		} else {
			this._dadosDoImovelService.ligacaoNovaPendente(result.uc.toString()).subscribe(temLigacao => {
				if (temLigacao) {
					this._alert.alertAcompanhar('Identificamos que já tem um pedido de Ligação Nova para o seu imóvel.').then((r => {
						window.open("https://agencia.neoenergiaelektro.com.br/", "_self");
					}))
				} else {
					// CEP POSSUI UC E NAO POSSUI PEDIDO EM ANDAMENTO
					this._dadosDoImovelService.getDadosDoImovel.endereco.uc = result.uc;
					this.hasDebito();
				}
			})
		}
	}

	hasDebito() {
		if (this._dadosDoImovelService.getDadosDoImovel.endereco.uc) {
			this._dadosDoImovelService.listDebitoUc(this._dadosDoImovelService.getDadosDoImovel.endereco.uc).subscribe((r) => {
				if (r.length > 0) {
					this._dadosDoImovelService.possivelDebito = false;
					this._dadosDoImovelService.setDebitos = true;
					this._debitoService.listaFaturasImovel = r;
					this._router.navigate(["ligacao-nova", "pedido", "debitos"]);
				} else {
					this.verificaFluxoDebitos();
				}
			}, (error) => {
				if (error.status === 401) {
					this._dadosDoImovelService.possivelDebito = true;
					this.verificaFluxoDebitos();
				}
			});
		}
	}

	verificaFluxoDebitos() {
		this._userServiceLN.consultarCliente(this._userServiceLN.sessionUser.documento).subscribe((data) => {
			if (data && data.codigo) {
				this._debitoService.listarFaturas(data.codigo).subscribe(debitos => {
					this._debitoService.setCodigoCliente = data.codigo;
					this._debitoService.setPendencias = debitos.vencidas;
					if (debitos.vencidas.length > 0) {
						this._debitoService.listaFaturasCPF = debitos && debitos.vencidas ? debitos.vencidas : null;
						this.moveTo("debitos");
					} else {
						this.verificaFluxoPosse();
					}
				});
			} else {
				this.verificaFluxoPosse();
			}
		});
	}

	verificaFluxoPosse(): void {
		if (this._dadosDoImovelService.PREFEITURAS_COM_AUTORIZACAO.includes(this.dadosDoImovel.endereco.cidade)) {
			this._dadosDoImovelService.validarDocPrefeitura = true;
			this.moveTo(this._dadosDoImovelService.getDadosDoImovel.endereco.zonaRural ? 'documento-posse' : 'anexar-autorizacao-da-prefeitura');
		} else {
			this._dadosDoImovelService.validarDocPrefeitura = false;
			this.moveTo(this._dadosDoImovelService.getDadosDoImovel.endereco.zonaRural ? 'documento-posse' : 'selecao-perfil');
		}
	}

	moveTo(etapa: string): void {
		this._router.navigate(["ligacao-nova", "pedido", etapa]);
	}
}

class REMOVED_LABELS extends MatPaginatorIntl {
    nextPageLabel: string = '';
	previousPageLabel: string = '';
	itemsPerPageLabel: string = 'Itens por Página:';

// TODO: Override de getRangeLabel do MatPaginatorIntl. Verificar utilidade. Já implementado em dialog-classe-principal.component.ts.
// 	getRangeLabel = function (page, pageSize, length) {
// 		const of = this.translate ? this.translate.instant('paginator.of') : 'de';
// 		if (length === 0 || pageSize === 0) {
// 			return '0 ' + of + ' ' + length;
// 		}
// 		length = Math.max(length, 0);
// 		const startIndex = page * pageSize;
// 		const endIndex = startIndex < length ?
// 			Math.min(startIndex + pageSize, length) :
// 			startIndex + pageSize;
// 		return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
// 	};
}

@Component({
	selector: 'neo-uc-dialog',
	templateUrl: './uc-dialog.component.html',
	styleUrls: ['./confirmar-endereco.component.scss'],
	providers: [{ provide: MatPaginatorIntl, useValue: new REMOVED_LABELS }]
})
export class UcDialogComponent {
	ucs: any = [];
	ucsAll: any = [];
	ucEscolhida: any;
	ucFilter: any;
	mobile = false;
	pageSize = 5;
	activePageUc: any = [];
	ucsFiltradas: any;
	dadosImovel: any;

	constructor(
		public dialogRef: MatDialogRef<UcDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

	ngOnInit(): void {
		this.dadosImovel = this.data.dadosImovel;

		this.data.UcOptions.forEach((option: any) => {
			this.ucs.push(option);
		});
		if (this.ucs.length === 0) {
			this.activePageUc = this.ucs
		} else {
			this.activePageUc = this.ucs.slice(0, this.pageSize);
		}

		if (window.screen.width < 768) {
			this.mobile = true;
		}
	}

	onPageChanged(event: any) {
		let firstCut = event.pageIndex * event.pageSize;
		let secondCut = firstCut + event.pageSize;
		this.activePageUc = this.ucs.slice(firstCut, secondCut);
	}

	escolhaUc(ucEscolhida: any) {
		this.ucEscolhida = ucEscolhida;
		this.dialogRef.close(this.ucEscolhida);
	}

	searchUc() {
		if (this.ucFilter === '') {
			this.ngOnInit();
		} else {
			this.ucsFiltradas = this.data.UcOptions.filter((res: any) => {
				if (res.complemento.toLocaleLowerCase().match(this.ucFilter.toLocaleLowerCase())) {
					return res.complemento.toLocaleLowerCase().match(this.ucFilter.toLocaleLowerCase());
				}
			});

			this.ucs = this.ucsFiltradas;
			this.activePageUc = this.ucsFiltradas;
			this.activePageUc = this.ucs.slice(0, this.pageSize);
		}
	}

	setNaoEncontrei() {
		this.dialogRef.close('naoEncontrado');
	}

	close(): void {
		this.dialogRef.close();
	}
}
