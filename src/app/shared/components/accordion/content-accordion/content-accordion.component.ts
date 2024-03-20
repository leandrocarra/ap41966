import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { PathCompleto } from "app/core/enums/servicos";
import { AccountDTO, AddressDTO, ClienteDTO, GerarURLFlexPagDTORequest, InvoiceDTO, OrderDTO, UnidadeConsumidoraDTO } from "app/core/models/segunda-via/request/segunda-via-request-dto";
import { FaturaDTO, GerarURLFlexPagDTOResponse } from "app/core/models/segunda-via/response/segunda-via-response-dto";
import { AvisoFatura, Status, StatusFatura } from "app/core/models/segunda-via/segunda-via.model";
import { UCResponseDTO } from "app/core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto";
import { CustomSweetAlertService } from "app/core/services/customsweetalert/custom-sweet-alert.service";
import { EntendaSuaContaService } from "app/core/services/entenda-sua-conta/entenda-sua-conta.service";
import { PixService } from "app/core/services/pix/pix.service";
import { SegundaViaService } from "app/core/services/segunda-via/segunda-via.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";
import { converterParaReais, Meses } from "app/core/services/utils/neo-utils.service";
import { DialogPixComponent } from "../../alerts/dialog-pix/dialog-pix.component";
import { EnviarEmailComponent } from "../../alerts/enviar-email/enviar-email.component";
import { InternetBankingComponent } from "../../alerts/internet-banking/internet-banking.component";
import { CodigoDeBarrasComponent } from "../../cards/codigo-de-barras/codigo-de-barras.component";
import { BaixarSegundaVia } from "../../faturas/baixar-segunda-via.component";

@Component({
	selector: "app-content-accordion",
	templateUrl: "./content-accordion.component.html",
	styleUrls: ["./content-accordion.component.scss"],
})
export class ContentAccordionComponent {
	ucSelecionada: UCResponseDTO | null;
	@Input() fatura!: FaturaDTO;
	@Input() indexFatura!: number;
	codigoDeBarras: string = '';
    tipoDocumento: string;

	constructor(
		private _router: Router,
		private _dialog: MatDialog,
		private _matIconRegistry: MatIconRegistry,
		private _domSanitizer: DomSanitizer,
		private _alert: CustomSweetAlertService,
		private _segundaViaService: SegundaViaService,
		private _userService: UserService,
		private _selecaoImovelService: SelecaoImovelService,
		private _entendaSuaContaService: EntendaSuaContaService,
		private _pixService: PixService
	) {
		this.adicionarSvgs();
		this.ucSelecionada = _selecaoImovelService.getUCSelecionada;
        this.tipoDocumento = '';
	}

	adicionarSvgs(): void {
		let assetsPath: string = "assets/images/icons/";
		let icones: Array<string> = [
			'pix',
			'codigo-barras',
			'cartao-credito',
			'internet-banking',
			'visualizar',
			'email2',
			'entenda-conta',
			'download',
			'warning-outline'
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

	get mesReferencia(): string {
		if (this.fatura.mesReferencia) {
			let data = this.fatura.mesReferencia;
			let mes = new Date(data).getMonth();
			return Meses[mes ?? 0]
		} else {
			return 'Error';
		}
	}

	valorFatura(valor: string): string {
		return (environment.regiao === Regiao.NE) ?converterParaReais(valor) : `R$ ${valor}`;
	}

	getStatus(statusFatura: string): Status {
		return this._segundaViaService.getStatus(statusFatura);
	}

	settarAvisoFatura(statusFatura: string): string {
		let status = statusFatura.toLowerCase().replace(" ", "");
		if (status === "emprocessamento") {
			return AvisoFatura.EmProcessamento;
		} else if (status === "vinculada") {
			return AvisoFatura.Vinculada;
		} else if(status === "avencer"  || status === "vencida" || status === "parcialmentepago") {
			return AvisoFatura.VencidaAVencer;
		} else {
			return '';
		}
	}

	validarAvisoFatura(statusFatura: string): boolean {
		let faturaComAviso = ["emprocessamento", "vinculada", "avencer" , "vencida", "parcialmentepago"]
		return faturaComAviso.includes(statusFatura.toLowerCase().replace(" ", ""));
	}

	chamarFlexPag(): void {
		this._alert.showLoading();
		this.solicitarCodigoDeBarra();
		let gerarURLFlexPag = new GerarURLFlexPagDTORequest(
			this.deParaClienteDTO(),
			true, //FIXO
			2,    //FIXO
			this.deParaOrderDTO()
		)
		if (gerarURLFlexPag.order.account[0].invoices[0].bar_code_one !== '') {
			this._segundaViaService.gerarURLFlexPag(gerarURLFlexPag).subscribe({
				next: (data: GerarURLFlexPagDTOResponse) => {
					this._alert.alertDirecionamentoDePagamento("Você está sendo redirecionado para a página de pagamento do FlexPag.");
					window.open(data.url, '_blank')!.opener = null;
				},
				error: () => {
					this._alert.alertInfo('Ocorreu um erro inesperado');
				}
			})
		} else {
			this._alert.closeLoading();
		}

	}

	chamarInternetBanking(): void {
		this._dialog.open(InternetBankingComponent, {
			disableClose: true,
			hasBackdrop: true,
			maxWidth: '90vw',
			maxHeight: '90vh',
			data: { fatura: this.fatura }
		});
	}

	chamarAlertCodigoDeBarra(): void {
		this._dialog.open(CodigoDeBarrasComponent, {
			disableClose: false,
			hasBackdrop: true,
			width: '50vw',
			maxWidth: '900px',
			minWidth: '310px',
			maxHeight: '100vh',
			data: { fatura: this.fatura }
		});
	}

    exibirDadosDePagamento(){
        if(this.ucSelecionada?.isGrupo === 'X'){
            return false;
        }else{
            return this._segundaViaService.habilitarOpcoesDePagamento(this.fatura);
        }
    }

	chamarDialogPix(): void {
		this._pixService.setFaturaSelecionada = this.fatura;
		this._dialog.open(DialogPixComponent, {
			width: '50vw',
			maxWidth: '900px',
			maxHeight: '100vh',
			minWidth: '310px',
			data: { fatura: this.fatura, tipoFatura: "faturaDTO" }
		});
	}

	redirecionarEntendaSuaConta(evento: any): void {
		this._entendaSuaContaService.faturaIndex = this.indexFatura + ((this._segundaViaService.dadosSegundaVia.indicePagina -1)* this._segundaViaService.dadosSegundaVia.pageSize) ;
		this._entendaSuaContaService.setFatura = this.fatura;
		this._router.navigate([PathCompleto.entendaSuaConta]);
	}

	abrirDialogDownloadFatura(opcaoFatura: string): void {
		this._dialog.open(BaixarSegundaVia, {
			disableClose: true,
			hasBackdrop: true,
			width: 'auto',
			height: 'auto',
			data: { numSeqOper: this.fatura.numeroFatura, opcaoFatura: opcaoFatura, fatura: this.fatura }
		});
	}

	faturaPorEmail(opcaoFatura: string): void {
		this._dialog.open(EnviarEmailComponent, {
			disableClose: true,
			hasBackdrop: true,
			width: '50vw',
			maxWidth: '900px',
			maxHeight: '100vh',
			minWidth: '310px',
            data: { numSeqOper: this.fatura.numeroFatura, opcaoFatura: opcaoFatura, fatura: this.fatura }
		});
	}

	deParaClienteDTO(): ClienteDTO {
		return new ClienteDTO(
			this._userService.dadosUser.name,
            this._userService.dadosUser.tipoDocumento,
			this._userService.dadosUser.documento,
			this._userService.dadosUser.email,
			this._userService.dadosUser.telefone,
			this._userService.dadosUser.dataNascimento,
			this.deParaAdressDTO()
		)
	}

	deParaAdressDTO(): AddressDTO {
		return new AddressDTO(
			this._selecaoImovelService.getInformacoesUCSelecionada.local.cep,
			this._selecaoImovelService.getInformacoesUCSelecionada.local.nomeLogradouro,
			this._selecaoImovelService.getInformacoesUCSelecionada.local.numero,
			'',
			this._selecaoImovelService.getInformacoesUCSelecionada.local.municipio,
			this._selecaoImovelService.getInformacoesUCSelecionada.local.municipio,
			this._selecaoImovelService.getInformacoesUCSelecionada.local.uf,
		)
	}


	deParaOrderDTO(): OrderDTO {
		return new OrderDTO(
			(this._userService.getProtocolo.protocoloSalesforce + Math.floor(Date.now() / 1000)).toString(),
			parseInt(this.fatura.valorEmissao),
			this.deParaAccountDTO(),
		)
	}

	deParaAccountDTO(): Array<AccountDTO> {
		let account: Array<AccountDTO> = [];
		account.push(
			new AccountDTO(
				this.deParaUnidadeConsumidoraDTO(),
				this.deParaInvoiceDTO(),
			)
		)
		return account;
	}

	deParaUnidadeConsumidoraDTO(): UnidadeConsumidoraDTO {
		return new UnidadeConsumidoraDTO(
			this._selecaoImovelService.getInformacoesUCSelecionada.codigo,
			this._userService.dadosUser.documento
		)
	}


	deParaInvoiceDTO(): Array<InvoiceDTO> {
		let invoices: Array<InvoiceDTO> = [];
		invoices.push(
			new InvoiceDTO(
				parseInt(this.fatura.numeroFatura),
				parseInt(this.fatura.valorEmissao),
				this.fatura.dataVencimento.toString(),
				this.codigoDeBarras,
				this.codigoDeBarras,
			)
		)
		return invoices;
	}

	solicitarCodigoDeBarra(): void {
		this.codigoDeBarras = this._segundaViaService.validarFaturaDadosDePagamento(this.fatura.numeroFatura);
		if (this.codigoDeBarras == '') {
			this._segundaViaService.obterDadosPagamentos(this.fatura.numeroFatura).subscribe({
				next: (data) => {
					this.codigoDeBarras = data.codBarras !== undefined ? data.codBarras.toString() : data.numeroBoleto?.toString() ?? '';
				}, error: () => {
					this._alert.closeLoading();
					this._alert.alertInfo('Ocorreu um erro inesperado');
				}
			})
		}

	}

}
