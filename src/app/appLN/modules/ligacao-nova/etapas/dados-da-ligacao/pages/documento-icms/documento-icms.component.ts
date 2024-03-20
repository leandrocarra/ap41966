import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { BoxAnexo } from '../../../../../../core/models/documentos/box-anexo/box-anexo';
import { OcrRequest } from '../../../../../../core/models/ocr/ocr-request';
import { DocumentosService } from '../../../../../../core/services/documentos/documentos.service';
import { OcrService } from '../../../../../../core/services/ocr/ocr.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { configureMenuByWindowSize, removerCaracteresEspeciais } from '../../../../../../core/services/utils/neo-utils.service';

const PERFIL = 'rural';
const DOC_INVALIDO = false;
const DOC_VALIDADO = true;

@Component({
	selector: 'neo-documento-icms',
	templateUrl: './documento-icms.component.html',
	styleUrls: ['./documento-icms.component.scss']
})
export class DocumentoIcmsComponent {
	CADESP: BoxAnexo = new BoxAnexo('CADESP', true, 'Cadesp');
	anexoCadesp: Array<Anexo>;
	mobile: boolean;

	constructor(
		private _ocrService: OcrService,
		private _documentosService: DocumentosService,
		private _userServiceLN: UserServiceLN,
		private _alert: CustomSweetAlertService,
		private _location: Location,
		private _router: Router,
        private _loadingService: LoadingService
	) {
        this.mobile = configureMenuByWindowSize(window.screen.width);
		this.anexoCadesp = this._documentosService.documentos[PERFIL].anexos[this.CADESP.docName].arquivos;
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
	}

	recebeAnexos(arquivoAnexado: Anexo, box: BoxAnexo): void {
		if (this.anexoCadesp.length < 1) {
			this.chamaOCR(arquivoAnexado, box);
		}
	}

	anexarArquivo(arquivoAnexado: Anexo, docValidado: boolean): void {
		if (!docValidado) {
			this._alert.alertAnexarSemValidar();
		}
		this._documentosService.setCadespValidado = docValidado;
		this.anexoCadesp.push(arquivoAnexado);
	}

	remove(index: any): void {
		this.anexoCadesp.splice(index, 1);
	}

	chamaOCR(arquivoAnexado: Anexo, box: BoxAnexo): void {
		let base64 = new OcrRequest(arquivoAnexado.fileData, false);
		this._ocrService.ocr(base64).then((data: any) => {
			if (data === false) {
				this._loadingService.stop();
				if(this._documentosService.documentos[PERFIL].anexos[this.CADESP.docName].tentativas > this._documentosService.documentos[PERFIL].anexos[this.CADESP.docName].maxTentativas) {
					this.anexarArquivo(arquivoAnexado, DOC_INVALIDO);
				} else {
					this._documentosService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivoAnexado, false);
				}
			} else {
				this.validarCadesp(data, arquivoAnexado, box);
			}
		})
	}

	validarCadesp(data: any, arquivoAnexado: Anexo, box: BoxAnexo): void {
		let ocr: any = data.result[0];
		let situacaoCadespAtivo: boolean = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'situacao'))) !== "INATIVO";;
		if (ocr.tags[1] === 'br-cadesp-1') {
			let cnpjCadesp: boolean = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'cnpj')) === this._userServiceLN.sessionUser.documento;
			if (cnpjCadesp) {
				if (situacaoCadespAtivo) {
					return this.anexarArquivo(arquivoAnexado, DOC_VALIDADO);
				}
			}
		}
		this._documentosService.documentos[PERFIL].anexos[this.CADESP.docName].tentativas = (!situacaoCadespAtivo) ? this._documentosService.documentos[PERFIL].anexos[this.CADESP.docName].tentativas++ : this._documentosService.documentos[PERFIL].anexos[this.CADESP.docName].tentativas;
		this.alertCadespInvalido(arquivoAnexado, situacaoCadespAtivo, box);
	}


	alertCadespInvalido(arquivoAnexado: Anexo, cadespAtivo: boolean, box: BoxAnexo) {
		if (this._documentosService.documentos[PERFIL].anexos[this.CADESP.docName].tentativas < this._documentosService.documentos[PERFIL].anexos[this.CADESP.docName].maxTentativas) {
			if (cadespAtivo) {
				this._documentosService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivoAnexado, false);
			} else {
				return this._alert.alertAttemptCadespInativoDocument();
			}
		} else {
			this.anexarArquivo(arquivoAnexado, DOC_INVALIDO);
		}
	}

	continuar(): void {
		this._router.navigate(["ligacao-nova", "dados-da-ligacao", "opcao-tarifaria"]);
	}

	voltar(): void {
		this._location.back();
	}
}
