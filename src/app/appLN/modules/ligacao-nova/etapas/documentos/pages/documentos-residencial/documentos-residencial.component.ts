import { Location } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { Router } from '@angular/router';
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { DadosTitular } from '../../../../../../core/models/dados-titular/dados-titular';
import { BoxAnexo } from "../../../../../../core/models/documentos/box-anexo/box-anexo";
import { DadosDocumentos } from '../../../../../../core/models/documentos/dados-documentos';
import { OcrRequest } from '../../../../../../core/models/ocr/ocr-request';
import { DocumentosService } from '../../../../../../core/services/documentos/documentos.service';
import { OcrService } from '../../../../../../core/services/ocr/ocr.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';
import { NeoUtilsService, configureMenuByWindowSize } from '../../../../../../core/services/utils/neo-utils.service';

const PERFIL = 'residencial';

@Component({
	selector: 'neo-documentos-residencial',
	templateUrl: './documentos-residencial.component.html',
	styleUrls: ['./documentos-residencial.component.scss']
})

export class DocumentosResidencialComponent {
	mobile: boolean = false;
	docsNecessarios: any;
	dados: DadosDocumentos;
	dadosTitular = new DadosTitular(false);
	constructor(
		private _alert: CustomSweetAlertService,
		private _utilsService: NeoUtilsService,
		private _ocrService: OcrService,
		private _etapaService: DocumentosService,
		private _location: Location,
		private _router: Router,
        private _loadingService: LoadingService
	) {
		this.docsNecessarios = this._utilsService.DOCUMENTOS_RESIDENCIAL;
		this.mobile = configureMenuByWindowSize(window.screen.width);
		this.dados = this._etapaService.documentos;
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
	}

    recebeAnexos(arquivo: Anexo, box: BoxAnexo): void {
        this._loadingService.stop();
        if (box.docName === 'Doc Oficial') { // Se for documento oficial
            if (this.dados[PERFIL].anexos[box.docName].arquivos.length < this.dados[PERFIL].anexos[box.docName].maxAnexos && !this.dados[PERFIL].anexos[box.docName].docsSuficientes) {
                let base64 = new OcrRequest(arquivo.fileData, false);
                this._ocrService.ocr(base64).then((data: any) => {
                    if (data === false) {
                        this._etapaService.alertDocOficialInvalido(this.mobile, PERFIL);
                    } else {
                        this._etapaService.validarDocOficial(data, PERFIL, this.dados[PERFIL].anexos[box.docName], arquivo, false);
                    }
                });
            } else {
                this._alert.alertSuccess("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo");
            }
        }
    }

	remove(index: number, docName: string): void {
        this._etapaService.removeDocOficial(PERFIL, index, docName, false);
    }

	voltar(): void {
        this._location.back();
    }

	continuar(): void {
		if (this.dados[PERFIL].anexos['Doc Oficial'].docsSuficientes || this.dados[PERFIL].anexos['Doc Oficial'].arquivos.length === this.dados[PERFIL].anexos['Doc Oficial'].maxAnexos) {
			this._router.navigate(['/ligacao-nova/documentos/prepare-se-para-selfie']);
		} else {
			this._etapaService.alertNecessarioDocOficial(PERFIL, false);
		}
    }
}
