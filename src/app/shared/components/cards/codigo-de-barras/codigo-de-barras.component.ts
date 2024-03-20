import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { DadosPagamentoDTORequest } from 'app/core/models/segunda-via/request/segunda-via-request-dto';
import { DadosPagamentoDTOResponse, FaturaDTO } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { CodigoDeBarraFatura } from 'app/core/models/segunda-via/segunda-via.model';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { SegundaViaService } from 'app/core/services/segunda-via/segunda-via.service';
import { UserService } from 'app/core/services/user/user.service';
import { HeaderMetodo } from 'app/shared/models/header-metodo/header-metodo';
import { SnackbarService } from '../../snackbar/snackbar.service';

export interface CodigoDeBarrasComponent {
	fatura: FaturaDTO;
}

@Component({
	selector: 'app-codigo-de-barras',
	templateUrl: './codigo-de-barras.component.html',
	styleUrls: ['./codigo-de-barras.component.scss']
})
export class CodigoDeBarrasComponent {
	grupoDoUsuario: string;
	codigoDeBarras: string = '';
	dadosPagamentoRequestDTO = new DadosPagamentoDTORequest('', new HeaderMetodo());
	dadosPagamentoResponseDTO = new DadosPagamentoDTOResponse();
	constructor(
		public dialogRef: MatDialogRef<CodigoDeBarrasComponent>,
		private _user: UserService,
		private _snackbarService: SnackbarService,
		private _segundaViaService: SegundaViaService,
		private _alertService: CustomSweetAlertService,
		@Inject(MAT_DIALOG_DATA) public data: CodigoDeBarrasComponent,
	) {
		this.grupoDoUsuario = this._user.group;
		this.codigoDeBarras = this._segundaViaService.validarFaturaDadosDePagamento(this.data.fatura.numeroFatura);
		if (this.codigoDeBarras == '') {
			this.solicitarCodigoDeBarra();
		}
	}

	solicitarCodigoDeBarra(): void {
		this._alertService.showLoading();
		this._segundaViaService.obterDadosPagamentos(this.data.fatura.numeroFatura).subscribe({
			next: (data) => {
				this.dadosPagamentoResponseDTO = data;
				if (environment.regiao == Regiao.NE) {
					this.codigoDeBarras = this.dadosPagamentoResponseDTO.codBarras !== undefined ? this.dadosPagamentoResponseDTO.codBarras : this.dadosPagamentoResponseDTO.numeroBoleto ?? '';
				} else {
					this.codigoDeBarras = this.dadosPagamentoResponseDTO.codBarras ?? '';
				}

				this._segundaViaService.setDadosPagamento = new CodigoDeBarraFatura(this.data.fatura, data);
			}, error: () => {
				this.fechar();
				this._alertService.alertInfo('Ocorreu um erro inesperado');
			}, complete: () => {
				this._alertService.closeLoading();
			}
		})
	}

	copiarCodigoDeBarras(): void {
		navigator.clipboard.writeText(this.codigoDeBarras);
		this._snackbarService.exibirSnackbar('Código de Barras copiado com sucesso.', 'Fechar', 5);
	}

	fechar() {
		this.dialogRef.close();
	}
}
