import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { BoxAnexo } from '../../../../../../core/models/documentos/box-anexo/box-anexo';
import { DocComum } from '../../../../../../core/models/documentos/dados-documentos';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { configureMenuByWindowSize, NeoUtilsService } from '../../../../../../core/services/utils/neo-utils.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';

@Component({
	selector: 'neo-anexar-autorizacao-prefeitura',
	templateUrl: './anexar-autorizacao-prefeitura.component.html',
	styleUrls: ['./anexar-autorizacao-prefeitura.component.scss']
})
export class AnexarAutorizacaoPrefeituraComponent {
	mobile: boolean = false;
	docNecessario: BoxAnexo;
	anexo: DocComum;
	infoTooltip: string;

	constructor(
		private _alert: CustomSweetAlertService,
		private _neoUtils: NeoUtilsService,
		private _location: Location,
		private _router: Router,
		private _dadosDoImovelService: DadosDoImovelService
	) {
		this.mobile = configureMenuByWindowSize(window.screen.width);
		this.docNecessario = this._neoUtils.DOC_AUTORIZACAO_PREFEITURA;
		this.anexo = this._dadosDoImovelService.getEndereco?.anexos['Autorizacao da Prefeitura'];
		this.infoTooltip = 'Para emissão de pedidos de ligações de energia elétrica em sua região é necessária autorização da prefeitura, em papel timbrado e devidamente assinado, para prosseguir com a sua solicitação junto a concessionária de energia elétrica.';
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
	}

	recebeAnexos(arquivo: Anexo): void {
		if (this.anexo.arquivos.length < this.anexo.maxAnexos) {
			this.anexo.arquivos.push(arquivo);
		} else {
			this._alert.alertSuccess("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo");
		}
	}

	continuar(): void {
		if (this.anexo.arquivos.length > 0) {
			this._router.navigate(["ligacao-nova", "pedido", 'selecao-perfil']);
		}
	}

	remove(): void {
		this.anexo.arquivos?.splice(0 ,1);
	}

	voltar(): void {
		this._location.back();
	}
}
