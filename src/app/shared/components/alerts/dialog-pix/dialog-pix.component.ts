import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GerarPixDTOResponse } from 'app/core/models/pix/response/pix-dto';
import { CodigoDeBarraFatura } from 'app/core/models/segunda-via/segunda-via.model';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { PixService } from 'app/core/services/pix/pix.service';
import { SegundaViaService } from 'app/core/services/segunda-via/segunda-via.service';
import { UserService } from 'app/core/services/user/user.service';
import { SnackbarService } from '../../snackbar/snackbar.service';

export interface DialogPixComponent {
	fatura: any;
	tipoFatura: string;
}
@Component({
	selector: 'app-dialog-pix',
	templateUrl: './dialog-pix.component.html',
	styleUrls: ['./dialog-pix.component.scss']
})
export class DialogPixComponent {
	codigoDeBarras: string = '';
	numeroFatura: string = '';
	grupoDoUsuario: string;
	chaveAleatoriaPix: string = '';
	qrcodePix: string | SafeResourceUrl = '';

	constructor(
		private _dialogRef: MatDialogRef<DialogPixComponent>,
		private _user: UserService,
		private _clipboard: Clipboard,
		private _snackbarService: SnackbarService,
		private _pixService: PixService,
		private _alertService: CustomSweetAlertService,
		private _segundaViaService: SegundaViaService,
		private _domSanitizer: DomSanitizer,
		private _loading: LoadingService,
		@Inject(MAT_DIALOG_DATA) public data: DialogPixComponent,
	) {
		this.grupoDoUsuario = this._user.group;
		this._pixService.setFaturaSelecionada = this.data.fatura;

		if (this.data.tipoFatura === 'faturaDTO') {
			this.numeroFatura = this.data.fatura.numeroFatura;
			this.codigoDeBarras = this._segundaViaService.validarFaturaDadosDePagamento(this.data.fatura.numeroFatura);
			if (this.codigoDeBarras == '') {
				this.solicitarCodigoDeBarra();
			} else {
				this.pegarDadosDoPix();
			}
		} else {
			this.numeroFatura = this.data.fatura.numeroFatura;
			this.codigoDeBarras = this.data.fatura.codBarras;
			this.gerarNovoPix();
		}
	}

	copiarCodigoPix(): void {
		this._clipboard.copy(this.chaveAleatoriaPix);
		this._snackbarService.exibirSnackbar('Código PIX copiado com sucesso!', 'Fechar');
	}

	fechar(): void {
		this._dialogRef.close();
	}

	pegarDadosDoPix(): void {
		if (this._pixService.getFaturaSelecionada.numeroFatura === this.data.fatura.numeroFatura && this._pixService.getDadosDoPix !== null) {
			this.buscarPixExistente();
		} else {
			this.gerarNovoPix();
		}
	}

	gerarNovoPix(): void {
		this._loading.start();
		this._pixService.gerarPix(this.codigoDeBarras).subscribe({
			next: (pixGerado: GerarPixDTOResponse) => {
				this._pixService.setDadosDoPix = pixGerado;
				this.qrcodePix = this._domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${pixGerado.qr_code}`);
				this.chaveAleatoriaPix = pixGerado.qr_emv;
				this._loading.stop();
			}, error: () => {
				this._loading.stop();
				this.fechar();
				this._alertService.alertInfo('Ocorreu um erro inesperado');
			}
		});
	}

	buscarPixExistente(): void {
		this.qrcodePix = this._domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this._pixService.getDadosDoPix.qr_code}`);
		this.chaveAleatoriaPix = this._pixService.getDadosDoPix.qr_emv;
	}

	solicitarCodigoDeBarra(): void {
		this._loading.start();
		let tipoPagamento = (this.data.fatura.tipoArrecadacao.toLocaleLowerCase() === "ficha compensação bancária");
		this._segundaViaService.obterDadosPagamentos(this.numeroFatura, tipoPagamento).subscribe({
			next: (data) => {
				let dadosPagamentoResponseDTO = data;
				this.codigoDeBarras = dadosPagamentoResponseDTO.codBarras ?? '';
				if (this.data.tipoFatura === 'faturaDTO') {
					this._segundaViaService.setDadosPagamento = new CodigoDeBarraFatura(this.data.fatura, data);
				}
				this.gerarNovoPix();
			}, error: () => {
				this._loading.stop();
				this.fechar();
				this._alertService.alertInfo('Ocorreu um erro inesperado');
			}, complete: () => {
				this._loading.stop();
			}
		})
	}

}
