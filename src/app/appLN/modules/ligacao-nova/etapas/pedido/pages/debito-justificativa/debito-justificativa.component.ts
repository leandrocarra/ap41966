import { Location } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { Anexo } from "../../../../../../core/models/anexo/anexo";
import { OcrRequest } from "../../../../../../core/models/ocr/ocr-request";
import { DadosDoImovelService } from "../../../../../../core/services/dados-do-imovel/dados-do-imovel.service";
import { DebitoFaturaService } from "../../../../../../core/services/debito-fatura/debito-fatura.service";
import { DocumentosService } from "../../../../../../core/services/documentos/documentos.service";
import { OcrService } from "../../../../../../core/services/ocr/ocr.service";
import { CustomSweetAlertService } from "../../../../../../core/services/sweet-alert/custom-sweet-alert.service";
import { configureMenuByWindowSize, removerCaracteresEspeciais } from "../../../../../../core/services/utils/neo-utils.service";

@Component({
    selector: 'neo-debito-justificativa',
    templateUrl: './debito-justificativa.component.html',
    styleUrls: ['./debito-justificativa.component.scss']
})
export class DebitoJustificativaComponent {
    mobile: boolean;
    documento: string;
    anexos: {[key: string]: any};
    etapaServiceJustificativa: string;
    constructor(
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _etapaService: DebitoFaturaService,
        private _documentosService: DocumentosService,
        private _dadosDoImovelService: DadosDoImovelService,
        private _location: Location,
        private _ocrService: OcrService,
        private _loadingService: LoadingService
    ) {
        this.anexos = this._dadosDoImovelService.getEndereco.anexosDebitos;
        this.etapaServiceJustificativa = this._etapaService.getJustificativa;
        this.documento = this.etapaServiceJustificativa === 'debitoPago' ? 'Comprovante de Pagamento' : 'Comprovante de Endereço';
        this.mobile = configureMenuByWindowSize(window.screen.width);
    }

    @HostListener("window:resize", ["$event"])
    onResize(event: any): void {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    recebeAnexos(arquivoAnexado: Anexo): void {
        if (this.anexos[this.documento].length < 1) {
            if (arquivoAnexado.fileName === "Comprovante de Endereço") {
                this.chamaOCR(arquivoAnexado);
            } else {
                this.anexarDocumentoInvalido(arquivoAnexado);
            }
        }
    }

    anexarArquivo(arquivoAnexado: Anexo) {
        this.anexos[this.documento].push(arquivoAnexado);
    }

    remove(index: any): void {
        this.anexos[this.documento].splice(index, 1);
    }

    chamaOCR(arquivoAnexado: Anexo) {
        let base64 = new OcrRequest(arquivoAnexado.fileData, false);
        this._ocrService.ocr(base64).then((data: any) => {
            if (data === false) {
                this.anexarDocumentoInvalido(arquivoAnexado);
            } else {
                this.validarComprovanteEndereco(data, arquivoAnexado);
            }
        })
    }

    anexarDocumentoInvalido(arquivoAnexado: Anexo) {
        this._etapaService.setComprovanteDebitoValidado = false;
        this._loadingService.stop();
        this.anexarArquivo(arquivoAnexado);
    }

    validarComprovanteEndereco(data: any, arquivoAnexado: Anexo) {

        //comprovantes usuais de endereço

        let ocr = data.result[0]
        if (ocr.docType === "comprovante_residencia") {
            let cepValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'cep')) === this._dadosDoImovelService.getEndereco.cep;
            let cidadeValida = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'cidade'))) === removerCaracteresEspeciais(this._dadosDoImovelService.getEndereco.cidade);

            if (cepValido && cidadeValida) {
                this._etapaService.setComprovanteDebitoValidado = true;
                this.anexarArquivo(arquivoAnexado);
            } else {
                this.anexarDocumentoInvalido(arquivoAnexado);
            }


            //IPTU
        } else if (ocr.docType === "declaracao") {
            if (ocr.tags.includes('br-imposto-predial e-territorial-urbano-1')) {
               if (this._dadosDoImovelService.validarEnderecoIPTU(ocr)) {
                    this._etapaService.setComprovanteDebitoValidado = true;
                    this.anexarArquivo(arquivoAnexado);
                } else {
                    this.anexarDocumentoInvalido(arquivoAnexado);
                }
            }
        } else {
            this.anexarDocumentoInvalido(arquivoAnexado);
        }
    }


    voltar(): void {
        this._location.back();
    }

    continuar(): void {

        if (this.anexos[this.documento].length === 0) {
            let msg = this.documento === 'Comprovante de Pagamento' ? 'É necessário enviar o comprovante de pagamento!' : 'É necessário enviar o comprovante de endereço!';
            this._alert.alertWarning(msg);
        } else {
            this._dadosDoImovelService.setDebitosAnexos = this.anexos
            if (this._etapaService.getJustificativa === 'debitoPago' && this._dadosDoImovelService.getEndereco.anexosDebitos[this.documento]?.length > 0) {
                this._documentosService.anexos.comprovanteDePagamento = this._dadosDoImovelService.getEndereco.anexosDebitos[this.documento];
            } else if (this._etapaService.getJustificativa == 'naoReconhecoDebito' && this._dadosDoImovelService.getEndereco.anexosDebitos[this.documento]?.length > 0) {
                this._documentosService.anexos.comprovanteEnderecoDebitos = this._dadosDoImovelService.getEndereco.anexosDebitos[this.documento];
            }

            this.verificaFluxoPosse();
        }
    }

    verificaFluxoPosse(): void {
		if (this._dadosDoImovelService.PREFEITURAS_COM_AUTORIZACAO.includes(this._dadosDoImovelService.getEndereco?.cidade)) {
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
