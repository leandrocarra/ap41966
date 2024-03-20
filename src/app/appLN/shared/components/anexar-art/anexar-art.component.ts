import { Component } from '@angular/core';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { Anexo } from '../../../core/models/anexo/anexo';
import { OcrRequest } from '../../../core/models/ocr/ocr-request';
import { CalculadoraUtilsService } from '../../../core/services/calculadora/calculadora-utils.service';
import { DadosDaLigacaoService } from '../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { DadosDoImovelService } from '../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { DocumentosService } from '../../../core/services/documentos/documentos.service';
import { OcrService } from '../../../core/services/ocr/ocr.service';
import { CustomSweetAlertService } from '../../../core/services/sweet-alert/custom-sweet-alert.service';
import { removerCaracteresEspeciais } from '../../../core/services/utils/neo-utils.service';


@Component({
	selector: 'neo-anexar-art',
	templateUrl: './anexar-art.component.html',
	styleUrls: ['./anexar-art.component.scss']
})
export class AnexarArtComponent {
	art: Array<Anexo>;
	tentativas: number;

	constructor(
		private _documentosService: DocumentosService,
		private _etapaService: DadosDaLigacaoService,
		private _imovelService: DadosDoImovelService,
		private _alert: CustomSweetAlertService,
		private _utils: CalculadoraUtilsService,
		private _ocrService: OcrService,
        private _loadingService: LoadingService

	) {
		this.tentativas = 0;
		this.art = this._etapaService.checkArt() ? this._etapaService.anexos.art : [];
	}

	anexar(arquivo: Anexo): void {
		if (this._etapaService.tentativasArt === 3) {
			this.art.push(arquivo);
			this._etapaService.setAnexoART = this.art;
			this._documentosService.anexos.art = this.art;
		} else {
			let ocr = new OcrRequest(arquivo.fileData, false);
			this._ocrService.ocr(ocr).then((data: any) => {
				if (data === false) {
					this.artInvalido('', arquivo);
				} else {
					this.validarDocOcr(data.result[0], arquivo);
				}
			});
		}
	}

	artInvalido(alert: string, arquivo: Anexo) {
		this._loadingService.stop();
		this._etapaService.tentativaArt();

		if (this._etapaService.tentativasArt < 3) {
			if (alert === 'CEP') {
				this._alert.alertWarningWithText('Atenção', 'Identificamos que o endereço do imóvel no documento ART não é o mesmo endereço cadastrado na solicitação de ligação nova.<br/> Por favor, envie o documento ART referente ao imóvel que receberá a ligação nova');

			} else {
				this._alert.alertWarning('O documento enviado não é um ART válido. Tente novamente!');

			}
		} else {
			this.pushAnexo(arquivo);
			this._etapaService.checarDocumentoART = true;
			this._alert.alertInfoWithText("ATENÇÃO", "Não conseguimos validar o documento! Um membro de nossa equipe irá analisar o documento enviado.");
		}
	}

	validarDocOcr(data: any, arquivo: any) {
		let isArt1 = data.tags[0] ? data.tags[0] : '';
		let isArt2 = data.tags[1] ? data.tags[1] : '';
		let cep = this._ocrService.isOCRFieldValid((data.fields.find((f: any) => f.name === 'cep_obra')));
		let atividadeTecnica = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid((data.fields.find((f: any) => f.name === 'atividade_tecnica'))));
		let temPalavra: boolean = false;

		this._utils.palavrasArt.forEach(palavrasChave => { // TODO: Verificar, mas acredito que possa ser substituído pelo método 'some()', em vez de 'forEach()', para esse caso."
			if (atividadeTecnica && atividadeTecnica.includes(removerCaracteresEspeciais(palavrasChave))) {
				temPalavra = true;
			}
		});

		if ((isArt1.includes('art') || isArt1.includes('trt') || isArt2.includes('art') || isArt2.includes('trt')) && temPalavra) {
			if (temPalavra && this._imovelService.getRuaSemCep || (this._imovelService.getEndereco.cep === cep)) {
				this.pushAnexo(arquivo);
				this._etapaService.checarDocumentoART = false;
			} else {
				this.artInvalido('CEP', arquivo);
			}
		} else {
			this.artInvalido('', arquivo);
		}
	}

	pushAnexo(arquivo: Anexo) {
		this.art.push(arquivo);
		this._etapaService.setAnexoART = this.art;
		this._documentosService.anexos.art = this.art;
	}

	remove(index: number): void {
		this.art.splice(index, 1);
		this._etapaService.setAnexoART = this.art;
		this._documentosService.anexos.art = [];
	}
}
