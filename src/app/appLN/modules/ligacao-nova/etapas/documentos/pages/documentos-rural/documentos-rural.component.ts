import { Location } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { Anexo } from "../../../../../../core/models/anexo/anexo";
import { BoxAnexo } from "../../../../../../core/models/documentos/box-anexo/box-anexo";
import { DadosDocumentos } from '../../../../../../core/models/documentos/dados-documentos';
import { OcrRequest } from "../../../../../../core/models/ocr/ocr-request";
import { DadosDoImovelService } from "../../../../../../core/services/dados-do-imovel/dados-do-imovel.service";
import { DocumentosService } from "../../../../../../core/services/documentos/documentos.service";
import { OcrService } from "../../../../../../core/services/ocr/ocr.service";
import { CustomSweetAlertService } from "../../../../../../core/services/sweet-alert/custom-sweet-alert.service";
import { UserServiceLN } from "../../../../../../core/services/user/user.service";
import { BeneficioRuralUtilsService } from "../../../../../../core/services/utils/beneficio-rural/beneficio-rural-utils.service";
import { configureMenuByWindowSize, removerCaracteresEspeciais, validarPrazo } from "../../../../../../core/services/utils/neo-utils.service";

const PERFIL = 'rural';

@Component({
    selector: 'neo-documentos-rural',
    templateUrl: './documentos-rural.component.html',
    styleUrls: ['./documentos-rural.component.scss']
})
export class DocumentosRuralComponent {
    mobile: boolean;
    docsNecessarios: any;
    dados: DadosDocumentos;
    subperfil: string;
    subperfilCompTrabalhadorRural: Array<string> = ['residencial-rural'];
    subperfilCompAtividadeRural: Array<string> = ['agropecuaria-rural', 'agropecuaria-urbana'];
    constructor(
        private _utilsRural: BeneficioRuralUtilsService,
        private _etapaService: DocumentosService,
        private _dadosImovelService: DadosDoImovelService,
        private _location: Location,
        private _alert: CustomSweetAlertService,
        private _ocrService: OcrService,
        private _userServiceLN: UserServiceLN,
        private _route: ActivatedRoute,
        private _router: Router,
        private _loadingService: LoadingService
    ) {
        this.subperfil = '';
        this._route.params.subscribe(result => {
            this.subperfil = result?.subperfil;
            this.docsNecessarios = this._utilsRural.getBoxsRural(result.subperfil, this._userServiceLN.tipoDocumento === 'CNPJ');
        });
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
                this._alert.alertSuccess("Já recebemos este comprovante. Para enviá-lo novamente, delete o documento abaixo");
            }
        } else {
            if (box.ocr && (this.dados[PERFIL].anexos[box.docName].tentativas < this.dados[PERFIL].anexos[box.docName].maxTentativas)) {
                this.chamarOcr(arquivo, box);
            } else {
                this._etapaService.verificarAnexacaoComum(PERFIL, arquivo, box);
            }
        }
    }

    chamarOcr(arquivo: Anexo, box: BoxAnexo): void {
        let base64 = new OcrRequest(arquivo.fileData, false);
        this._ocrService.ocr(base64).then((data: any) => {
            if (data === false) {
                this._etapaService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivo, false);
            } else {
                this.lerOcr(data, arquivo, box);
            }
        });
    }

    lerOcr(data: any, arquivo: Anexo, box: BoxAnexo): void {
        let ocr = data?.result[0];
        if (box.docName === 'CNPJ') {
            if (ocr.tags.find((tagRetornada: string) => tagRetornada === 'br-cadastro-cnpj-1')) {
                let documentoExtraidoOCR: string = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'numero'));
                documentoExtraidoOCR = documentoExtraidoOCR?.replace(/\D/g, "");

                let cnpjValidado: boolean = this._userServiceLN.sessionUser.documento === documentoExtraidoOCR;

                if (cnpjValidado) {
                    this._etapaService.setCNPJValidado = true;
                    return this._etapaService.uploadDoc(PERFIL, arquivo, box.docName)
                }
            }
            if (this._etapaService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivo, false)) {
                this._etapaService.setCNPJValidado = false;
                this._etapaService.uploadDoc(PERFIL, arquivo, box.docName);
            }
        } else {
            this.lerComprovanteAtividadeRural(data, arquivo, box);
        }
    }

    lerComprovanteAtividadeRural(dataOcr: any, arquivo: Anexo, box: BoxAnexo): void {
        let ocr = dataOcr.result[0];
        if (this.subperfilCompAtividadeRural.includes(this.subperfil)) {

            if (ocr.docType == 'declaracao' && ocr.tags.find((f: any) => f === 'br-dapweb-1')) {
                this.validacaoPronaf(ocr, arquivo, box);
            } else if (ocr.docType === "declaracao" && ocr.tags.find((f: any) => f === 'br-imposto-propriedade-rural-2')) {
                this.validacaoItr(ocr, arquivo, box);
            } else if (ocr.docType === "certidao" && ocr.tags.find((f: any) => f === 'br-certificado-cadastro-imovel-rural-1')) {
                this.validacaoNirf(ocr, arquivo, box);
            } else if (ocr.docType === "certidao" && ocr.tags.find((f: any) => f === 'br-cartorio-registro-imovel-1')) {
                this.validacaoCcir(ocr, arquivo, box);
            } else if (ocr.docType === "declaracao" && ocr.tags.find((f: any) => f === 'br-incra-1')) {
                this.validacaoINCRA(ocr, arquivo, box);
            } else {
                this._etapaService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivo, false);
            }

        } else if (this.subperfilCompTrabalhadorRural.includes(this.subperfil)) {

            if (ocr.docType === "documento_identificacao" && ocr.tags.find((f: any) => f === 'br-cartrural-1')) {
                this.validacaoCarteiraRural(ocr, arquivo, box);
            } else {
                this._etapaService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivo, false);
            }

        } else {
            this._etapaService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivo, false);
        }
    }

    validacaoPronaf(ocr: any, arquivo: Anexo, box: BoxAnexo): void {
        let cpf_titular_1 = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'titular_1_cpf'))
        let nome_titular_1 = (ocr.fields?.find((f: any) => f.name === 'titular_1_nome')?.value?.split(" ", 1)[0]);
        let validar_nome_titular_1 = removerCaracteresEspeciais(nome_titular_1) === removerCaracteresEspeciais(this._userServiceLN.sessionUser?.nome).split(" ", 1)[0];
        let cpf_titular_2 = this._ocrService.isOCRFieldValid(ocr?.fields.find((f: any) => f.name === 'titular_2_cpf'))
        let nome_titular_2 = (ocr.fields.find((f: any) => f.name === 'titular_2_nome')?.value?.split(" ", 1)[0]);
        let validar_nome_titular_2 = removerCaracteresEspeciais(nome_titular_2) === removerCaracteresEspeciais(this._userServiceLN.sessionUser?.nome).split(" ", 1)[0];

        if ((validar_nome_titular_1 || validar_nome_titular_2) || (cpf_titular_1 === this._userServiceLN.sessionUser.documento) || (cpf_titular_2 === this._userServiceLN.sessionUser.documento)) {
            this.verificaComprovanteAtividadeRural(box.docName, true);
            this._etapaService.uploadDoc(PERFIL, arquivo, box.docName);
        } else {
            this._etapaService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivo, false);
        }
    }

    validacaoItr(ocr: any, arquivo: Anexo, box: BoxAnexo): void {
        let cep = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'cep_imovel_rural'));
        let cidade = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'municipio_imovel_rural'));
        let cpf = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'cpf_contribuinte'));
        let nome = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'nome_contribuinte'));
        nome = nome?.split(' ')[0];

        if (cep === this._dadosImovelService.getEndereco.cep && removerCaracteresEspeciais(cidade) === removerCaracteresEspeciais(this._dadosImovelService.getEndereco.cidade) && (cpf === this._userServiceLN.sessionUser.documento || removerCaracteresEspeciais(nome) === removerCaracteresEspeciais(this._userServiceLN.sessionUser.nome).split(" ", 1)[0])) {
            this.verificaComprovanteAtividadeRural(box.docName, true);
            this._etapaService.uploadDoc(PERFIL, arquivo, box.docName);
        } else {
            this._etapaService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivo, false);
        }
    }


    validacaoNirf(ocr: any, arquivo: Anexo, box: BoxAnexo): void {
        let nome = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'contribuinte'));
        let cidade = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'municipio_imovel_rural'));
        let cpf_cnpj = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'cpf_cnpj'));
        let vencida = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'data_validade'));
        vencida = vencida != null ? vencida?.replace(/[^\d]+/g, "") : '';
        vencida = vencida != '' ? validarPrazo(vencida) : false;

        if (!vencida && removerCaracteresEspeciais(cidade) === removerCaracteresEspeciais(this._dadosImovelService.getEndereco.cidade) && (cpf_cnpj === this._userServiceLN.sessionUser.documento || removerCaracteresEspeciais(nome) === removerCaracteresEspeciais(this._userServiceLN.sessionUser.nome).split(" ", 1)[0])) {
            this.verificaComprovanteAtividadeRural(box.docName, true);
            this._etapaService.uploadDoc(PERFIL, arquivo, box.docName);
        } else {
            this._etapaService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivo, false);
        }
    }

    validacaoCcir(ocr: any, arquivo: Anexo, box: BoxAnexo): void {
        let cpf = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'cpf_titular'));
        let localizadorImovel = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'localizador_imovel_rural'));
        let nome = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'nome_titular'));
        let nomeValidado: boolean = removerCaracteresEspeciais(nome).split(' ', 1)[0] === removerCaracteresEspeciais(this._userServiceLN.sessionUser?.nome).split(' ', 1)[0];

        if (cpf === this._userServiceLN.sessionUser.documento && nomeValidado && removerCaracteresEspeciais(localizadorImovel).includes(removerCaracteresEspeciais(this._dadosImovelService.getEndereco.endereco))) {
            this.verificaComprovanteAtividadeRural(box.docName, true);
            this._etapaService.uploadDoc(PERFIL, arquivo, box.docName);
        } else {
            this._etapaService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivo, false);
        }

    }

    validacaoINCRA(ocr: any, arquivo: Anexo, box: BoxAnexo): void {
        if (this._dadosImovelService.validacaoINCRA(ocr)) {
            this.verificaComprovanteAtividadeRural(box.docName, true);
            this._etapaService.uploadDoc(PERFIL, arquivo, box.docName);
        } else {
            this._etapaService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivo, false);
        }
    }

    validacaoCarteiraRural(ocr: any, arquivo: Anexo, box: BoxAnexo): void {
        let nomeValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'nome'));
        let municipioValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'naturalidade_cidade'));
        let estadoValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'naturalidade_uf'));

        if ((removerCaracteresEspeciais(nomeValido).split(' ', 1)[0] === removerCaracteresEspeciais(this._userServiceLN.sessionUser.nome).split(' ', 1)[0]) &&
            (removerCaracteresEspeciais(municipioValido) === removerCaracteresEspeciais(this._dadosImovelService.getEndereco.cidade)) &&
            (removerCaracteresEspeciais(estadoValido)) === removerCaracteresEspeciais(this._dadosImovelService.getEndereco.estado)) {
            this.verificaComprovanteAtividadeRural(box.docName, true);
            this._etapaService.uploadDoc(PERFIL, arquivo, box.docName);
        } else {
            this._etapaService.alertDocumentosInvalidos(this.mobile, PERFIL, box.docName, arquivo, false);
        }
    }

    verificaComprovanteAtividadeRural(docName: string, documentoFoiValidado: boolean): void {
        let documentosDevemValidarAtividadeRural: Array<string> = ['Comp Atividade Rural', 'Outorga', 'Comp Trabalhador Rural'];
        if (documentosDevemValidarAtividadeRural.includes(docName)) {
            this._etapaService.setCompAtividadeRuralValidado = documentoFoiValidado;
        }
    }

    remove(index: number, docName: string): void {
        if (docName === 'Doc Oficial') {
            this._etapaService.removeDocOficial(PERFIL, index, docName, false);
        } else {
            this.verificaComprovanteAtividadeRural(docName, false);
            this.dados[PERFIL].anexos[docName].arquivos.splice(index, 1);
        }
    }

    voltar(): void {
        this._location.back();
    }

    continuar(): void {
        if (this.dados[PERFIL].anexos['Doc Oficial'].docsSuficientes || this.dados[PERFIL].anexos['Doc Oficial'].arquivos.length === this.dados[PERFIL].anexos['Doc Oficial'].maxAnexos) {
            if (this._userServiceLN.tipoDocumento === 'CNPJ') {
                if (this.validarDocsCNPJ()) {
                    this._router.navigate(['/ligacao-nova/documentos/prepare-se-para-selfie']);
                } else {
                    this.alertEnviarDocs();
                }
            } else {
                if (this.validarDocsCPF()) {
                    this._router.navigate(['/ligacao-nova/documentos/prepare-se-para-selfie']);
                } else {
                    this.alertEnviarDocs();
                }
            }
        } else {
            this._etapaService.alertNecessarioDocOficial(PERFIL, false);
        }
    }

    validarDocsCNPJ(): boolean {
        let anexos = this.dados[PERFIL].anexos;
        switch (this.subperfil) {
            case 'agropecuaria-rural':
                return (anexos['CNPJ'].arquivos.length > 0 && anexos['CTT Social ou CCMEI'].arquivos.length > 0 && anexos['Comp Atividade Rural'].arquivos.length > 0);

            case 'escola-agrotecnica':
                return (anexos['CNPJ'].arquivos.length > 0 && anexos['CTT Social ou CCMEI'].arquivos.length > 0);

            case 'aquicultor':
                return (anexos['CNPJ'].arquivos.length > 0 && anexos['CTT Social ou CCMEI'].arquivos.length > 0 && anexos['Comp Atividade Rural'].arquivos.length > 0);

            case 'agroindustrial':
                return (anexos['CNPJ'].arquivos.length > 0 && anexos['CTT Social ou CCMEI'].arquivos.length > 0);

            case 'agropecuaria-urbana':
                return (anexos['CNPJ'].arquivos.length > 0 && anexos['CTT Social ou CCMEI'].arquivos.length > 0 && anexos['Comp Atividade Rural'].arquivos.length > 0);

            case 'servico-publico-de-irrigacao':
                return (anexos['CNPJ'].arquivos.length > 0 && anexos['CTT Social ou CCMEI'].arquivos.length > 0 && anexos['Outorga'].arquivos.length > 0 && anexos['Lic Ambiental'].arquivos.length > 0);

            case 'irrigante':
                return (anexos['CNPJ'].arquivos.length > 0 && anexos['CTT Social ou CCMEI'].arquivos.length > 0 && anexos['Lic Ambiental'].arquivos.length > 0);

            default:
                return false;
        }
    }

    validarDocsCPF(): boolean {
        if (this.subperfil === 'residencial-rural') {
            if ((this.dados[PERFIL].anexos['Doc Oficial'].docsSuficientes || this.dados[PERFIL].anexos['Doc Oficial'].arquivos.length === this.dados[PERFIL].anexos['Doc Oficial'].maxAnexos) && this.dados[PERFIL].anexos['Comp Trabalhador Rural'].arquivos.length === 1) {
                return true;
            } else {
                this.alertEnviarDocs();
                return false;
            }
        } else {
            if ((this.dados[PERFIL].anexos['Doc Oficial'].docsSuficientes || this.dados[PERFIL].anexos['Doc Oficial'].arquivos.length === this.dados[PERFIL].anexos['Doc Oficial'].maxAnexos) && this.dados[PERFIL].anexos['Comp Atividade Rural'].arquivos.length === 1) {
                return true;
            } else {
                this.alertEnviarDocs();
                return false;
            }
        }
    }

    alertEnviarDocs(): void {
        this._alert.alertWarning("POR FAVOR, ENVIE TODOS OS DOCUMENTOS");
    }
}
