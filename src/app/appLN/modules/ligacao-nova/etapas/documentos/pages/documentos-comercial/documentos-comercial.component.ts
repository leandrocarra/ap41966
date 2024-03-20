import { Location } from '@angular/common';
import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { BoxAnexo } from '../../../../../../core/models/documentos/box-anexo/box-anexo';
import { DadosDocumentos } from '../../../../../../core/models/documentos/dados-documentos';
import { OcrRequest } from "../../../../../../core/models/ocr/ocr-request";
import { DocumentosService } from "../../../../../../core/services/documentos/documentos.service";
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { OcrService } from "../../../../../../core/services/ocr/ocr.service";
import { CustomSweetAlertService } from "../../../../../../core/services/sweet-alert/custom-sweet-alert.service";
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { NeoUtilsService, configureMenuByWindowSize } from "../../../../../../core/services/utils/neo-utils.service";


@Component({
    selector: 'neo-documentos-comercial',
    templateUrl: './documentos-comercial.component.html',
    styleUrls: ['./documentos-comercial.component.scss']
})
export class DocumentosComercialComponent {
    perfil: string;
    mobile: boolean = false;
    docsNecessarios: any;
    dados: DadosDocumentos;

    constructor(
        private _utilsService: NeoUtilsService,
        private _alert: CustomSweetAlertService,
        private _ocrService: OcrService,
        private _etapaService: DocumentosService,
        private _location: Location,
        private _router: Router,
        private _userServiceLN: UserServiceLN,
        private _ligacaoNovaService: LigacaoNovaService,
        private _loadingService: LoadingService
    ) {
        this.perfil = this._ligacaoNovaService.getPerfilEscolhido.perfil.toLocaleLowerCase();
        this.docsNecessarios = this._utilsService.DOCUMENTOS_COMERCIAL;
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
            if (this.dados[this.perfil].anexos[box.docName].arquivos.length < this.dados[this.perfil].anexos[box.docName].maxAnexos && !this.dados[this.perfil].anexos[box.docName].docsSuficientes) {
                let base64 = new OcrRequest(arquivo.fileData, false);
                this._ocrService.ocr(base64).then((data: any) => {
                    if (data === false) {
                        this._etapaService.alertDocOficialInvalido(this.mobile, this.perfil);
                    } else {
                        this._etapaService.validarDocOficial(data, this.perfil, this.dados[this.perfil].anexos[box.docName], arquivo, false);
                    }
                });
            } else {
                this._alert.alertSuccess("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo");
            }
        } else {
            if (box.ocr) {
                this.chamarOcr(arquivo, box);
            } else {
                this._etapaService.verificarAnexacaoComum(this.perfil, arquivo, box);
            }
        }
    }

    chamarOcr(arquivo: Anexo, box: BoxAnexo): void {
        let base64 = new OcrRequest(arquivo.fileData, false);
        this._ocrService.ocr(base64).then((data: any) => {
            if (data === false) {
                this._etapaService.alertDocumentosInvalidos(this.mobile, this.perfil, box.docName, arquivo, false);
            } else {
                this.lerOcr(data, arquivo, box);
            }
        });
    }

    lerOcr(data: any, arquivo: Anexo, box: BoxAnexo): void {
        if (box.docName === 'CNPJ') {
            return this.validarCNPJ(data, arquivo, box);
        } else {
            this._etapaService.alertDocumentosInvalidos(this.mobile, this.perfil, box.docName, arquivo, false);
        }
    }

    validarCNPJ(data: any, arquivo: Anexo, box: BoxAnexo): void {
        if (data?.result[0]?.tags[1] === 'br-cadastro-cnpj-1') {
            const cnpjValidado= this._ocrService.isOCRFieldValid(data?.result[0]?.fields?.find((f: any) => f.name ===  "numero"));

            if (this._userServiceLN.sessionUser.documento === cnpjValidado) {
                this._etapaService.setCNPJValidado = true;
                return this._etapaService.uploadDoc(this.perfil, arquivo, box.docName)
            }
        }
        if (this._etapaService.alertDocumentosInvalidos(this.mobile, this.perfil, box.docName, arquivo, false)) {
            this._etapaService.setCNPJValidado = false;
            this._etapaService.uploadDoc(this.perfil, arquivo, box.docName);
        }
    }

    remove(index: number, docName: string): void {
        if (docName === 'Doc Oficial') {
            this._etapaService.removeDocOficial(this.perfil, index, docName, false);
        } else {
            this.dados[this.perfil].anexos[docName].arquivos.splice(index, 1);
        }
    }

    voltar(): void {
        this._location.back();
    }

    continuar(): void {
        if (this.dados[this.perfil].anexos['Doc Oficial'].docsSuficientes || this.dados[this.perfil].anexos['Doc Oficial'].arquivos.length === this.dados[this.perfil].anexos['Doc Oficial'].maxAnexos) {
            if (this.dados[this.perfil].anexos['CTT Social ou CCMEI'].arquivos.length > 0 && this.dados[this.perfil].anexos['CNPJ'].arquivos.length > 0) {
                this._router.navigate(['/ligacao-nova/documentos/prepare-se-para-selfie']);
            } else {
                this._alert.alertWarning("POR FAVOR, ENVIE TODOS OS DOCUMENTOS");
            }
        } else {
            this._etapaService.alertNecessarioDocOficial(this.perfil, false);
        }
    }
}
