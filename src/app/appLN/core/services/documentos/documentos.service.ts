import { Injectable } from "@angular/core";
import { OcrService } from '../ocr/ocr.service';
import { CustomSweetAlertService } from "../sweet-alert/custom-sweet-alert.service";
import { Anexo, Anexos } from "../../models/anexo/anexo";
import { DadosCnpj, DadosTitular } from "../../models/dados-titular/dados-titular";
import { BoxAnexo } from "../../models/documentos/box-anexo/box-anexo";
import { DadosDocumentos, DocOficial } from "../../models/documentos/dados-documentos";
import { DadosDaLigacaoService } from "../dados-da-ligacao/dados-da-ligacao.service";
import { LoginService } from "../login/login.service";
import { UserServiceLN } from "../user/user.service";
import { ORGAO_EMISSORES, removerCaracteresEspeciais } from "../utils/neo-utils.service";




@Injectable({
    providedIn: 'root'
})
export class DocumentosService {
    public documentos: DadosDocumentos;
    public docFotoParaComparar: string;
    public dadosTitular: DadosTitular;
    public dadosCNPJ: DadosCnpj;
    public anexos: Anexos;
    private _cadespValidado: boolean;
    private _cnpjValidado: boolean;
    private _rgCompleto: boolean = false;
    private _docVersoDados: boolean = false;
    private _docVersoDadosTarifaSocial: boolean = false;
    private _compAtividadeRuralValidado: boolean = false;
    private _docTypes = ["rg_frente", "rg_verso", "cnh_frente", "cnh_verso", "cnh", "documento_identificacao"];



    constructor(
        private _userServiceLN: UserServiceLN,
        private _alert: CustomSweetAlertService,
        private _loginService: LoginService,
        private _dadosDaLigacaoService: DadosDaLigacaoService,
        private _ocrService: OcrService
    ) {
        this.docFotoParaComparar = '';
        this.documentos = new DadosDocumentos();
        this.dadosTitular = new DadosTitular(this._userServiceLN.tipoDocumento === 'CNPJ');
        this.dadosCNPJ = new DadosCnpj();
        this.anexos = new Anexos();
        this._cadespValidado = false;
        this._cnpjValidado = false;
    }

    set setCNPJValidado(cnpjValidado: boolean) {
        this._cnpjValidado = cnpjValidado;
    }

    get getCNPJValidado(): boolean {
        return this._cnpjValidado;
    }

    set setCompAtividadeRuralValidado(compAtividadeRuralValidado: boolean) {
        this._compAtividadeRuralValidado = compAtividadeRuralValidado;
    }

    get getCompAtividadeRuralValidado(): boolean {
        return this._compAtividadeRuralValidado;
    }

    set setCadespValidado(cadespValidado: boolean) {
        this._cadespValidado = cadespValidado;
    }

    get getCadespValidado(): boolean {
        return this._cadespValidado;
    }

    get getDadosCNPJ(): DadosCnpj {
        return this.dadosCNPJ;
    }

    get getRGCompleto(): boolean {
        return this._rgCompleto;
    }

    set setRGCompleto(rgCompleto: boolean) {
        this._rgCompleto = rgCompleto;
    }




    validarDocOficial(dataOcr: any, perfil: string, docOficial: DocOficial, arquivo: Anexo, tarifaSocial: boolean): void {
        if (dataOcr.result[0]) {
            if (dataOcr.result[0].docType === 'documento_identificacao' && dataOcr.result[0].tags[1] === 'br-rne-1') {
                this._alert.alertDocumentoEstrangeiro();
            }

            else if (this._docTypes.includes(dataOcr.result[0].docType)) {
                this.identificarDocOficial(dataOcr, docOficial, perfil, arquivo, tarifaSocial);
            }

            else {
                tarifaSocial ? this.alertDocumentosInvalidos(window.screen.width <= 768, perfil, "Doc Oficial", arquivo, tarifaSocial) :
                    this.alertDocOficialInvalido(window.screen.width <= 768, perfil);

            }

        } else {
            tarifaSocial ? this.alertDocumentosInvalidos(window.screen.width <= 768, perfil, "Doc Oficial", arquivo, tarifaSocial) :
                this.alertDocOficialInvalido(window.screen.width <= 768, perfil);
        }
    }

    private identificarDocOficial(dataOcr: any, docOficial: DocOficial, perfil: string, arquivo: Anexo, tarifaSocial: boolean): void {
        //Identificar rg completo - frente e verso no mesmo arquivo
        let tagsRG = ["rg_frente", "rg_verso"];

        if (dataOcr.result.length == 2 && tagsRG.includes(dataOcr.result[0].tags[0])) {
            if (this.ordemDocComFoto(dataOcr.result))
                this._rgCompleto = true;
        }

        dataOcr.result.forEach((json: any) => {
            if (json.docQualityScore > this._ocrService.ACCEPTABLE_OCR_SCORE) {
                json.tags.forEach((tag: any) => {
                    this.verificarTipoTag(tag, perfil, json, dataOcr, arquivo, docOficial, tarifaSocial);
                });

            } else {
                tarifaSocial ? this.alertDocumentosInvalidos(window.screen.width <= 768, perfil, "Doc Oficial", arquivo, tarifaSocial) :
                    this.alertDocOficialInvalido(window.screen.width <= 768, perfil);

            }

        });
    }

    private verificarTipoTag(tag: string, perfil: string, json: any, dataOcr: any, arquivo: Anexo, docOficial: DocOficial, tarifaSocial: boolean): void {
        if (tag == 'rg_frente' || tag == 'rg_verso') {
            this.checkTagRg(tag, perfil, json, dataOcr, arquivo, tarifaSocial);

        } else if (tag == 'cnh_frente' || tag == 'cnh' || tag == 'cnh_verso') {
            this.checkTagCnh(tag, perfil, json, arquivo, tarifaSocial);

        } else if (json.tags.includes('documento_identificacao') && (json.tags.includes('br-passaporte-1') ||
            json.tags.includes('br-passaporte-2') || json.tags.includes('br-reservista-1'))) {
            this.docFotoParaComparar = arquivo.fileData;
            if (this.verificarAnexacaoDocOficial(perfil, 'Doc Oficial', 'Doc Oficial', tarifaSocial)) {
                this.preencherDadostitular(tag, perfil, json, arquivo, tarifaSocial);
            }

        } else {
            tarifaSocial ? this.alertDocumentosInvalidos(window.screen.width <= 768, perfil, "Doc Oficial", arquivo, tarifaSocial) :
                this.alertDocOficialInvalido(window.screen.width <= 768, perfil);
        }
    }

    private checkTagRg(tag: string, perfil: string, json: any, dataOcr: any, arquivo: Anexo, tarifaSocial: boolean): void {
        if (tag == 'rg_frente') {
            arquivo.fileName = this._rgCompleto ? 'Doc Oficial' : 'RG Frente';

            if (!tarifaSocial) {
                this.docFotoParaComparar = arquivo.fileData;
            }

            if (this.verificarAnexacaoDocOficial(perfil, 'Doc Oficial', arquivo.fileName, tarifaSocial)) {
                this.preencheOrgaoEmissor(tag, json, perfil, arquivo, tarifaSocial);
            }

        } else {
            arquivo.fileName = this._rgCompleto ? 'Doc Oficial' : 'RG Verso';
            if (this.verificarAnexacaoDocOficial(perfil, 'Doc Oficial', arquivo.fileName, tarifaSocial)) {
                this.preencherDadostitular(tag, perfil, json, arquivo, tarifaSocial);
            }
        }
    }

    private checkTagCnh(tag: string, perfil: string, json: any, arquivo: Anexo, tarifaSocial: boolean): void {
        let arrayAnexos = (tarifaSocial) ? this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial : this.documentos[perfil];

        if (tag == 'cnh_frente' || tag == 'cnh') {
            arquivo.fileName = tag == 'cnh_frente' ? 'CNH Frente' : 'CNH';

            if (!tarifaSocial) {
                this.docFotoParaComparar = arquivo.fileData;
            }

            if (this.verificarAnexacaoDocOficial(perfil, 'Doc Oficial', arquivo.fileName, tarifaSocial)) {
                arrayAnexos.anexos['Doc Oficial'].docsSuficientes = true;
                arrayAnexos.anexos['Doc Oficial'].frenteVerso = false;
                arrayAnexos.anexos['Doc Oficial'].frente = true;
                this.preencherDadostitular(tag, perfil, json, arquivo, tarifaSocial);
            }

        } else if (tag == 'cnh_verso') {
            arquivo.fileName = 'CNH Verso';

            if (this.verificarAnexacaoDocOficial(perfil, 'Doc Oficial', arquivo.fileName, tarifaSocial)) {
                arrayAnexos.anexos['Doc Oficial'].frenteVerso = true;
                arrayAnexos.anexos['Doc Oficial'].verso = true;

                if (!tarifaSocial) {
                    this.uploadDoc(perfil, arquivo, 'Doc Oficial');
                } else {
                    this.uploadDocTarifaSocial(arquivo, 'Doc Oficial')
                }
            }

            this.verificaFrenteVerso(perfil, tarifaSocial);
        }
    }

    private verificaFrenteVerso(perfil: string, tarifaSocial: boolean): void {
        let arrayAnexos = (tarifaSocial) ? this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial : this.documentos[perfil];

        if (arrayAnexos.anexos['Doc Oficial'].frenteVerso) {
            if (!arrayAnexos.anexos['Doc Oficial'].frente) {
                arrayAnexos.anexos['Doc Oficial'].docsSuficientes = false;
                this._alert.alertInfo('Para continuar, favor enviar a frente da identidade.');

            } else if (!arrayAnexos.anexos['Doc Oficial'].verso) {
                arrayAnexos.anexos['Doc Oficial'].docsSuficientes = false;
                this._alert.alertInfo('Para continuar, favor enviar o verso da identidade.');
            }
        }
    }

    private preencheOrgaoEmissor(tag: any, json: any, perfil: string, arquivo: Anexo, tarifaSocial: boolean): void {
        let arrayAnexos = (tarifaSocial) ? this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial : this.documentos[perfil];

        if (!tarifaSocial) {
            let jsonOrgaoEmissor = this._ocrService.isOCRFieldValid(json.fields.find((f: any) => f.name === 'orgao_emissor'));
            let orgaoValido: boolean = false;

            ORGAO_EMISSORES.forEach(element => {
                if (jsonOrgaoEmissor?.includes(element.key) || jsonOrgaoEmissor?.toUpperCase() === element.value) {
                    this.dadosTitular.orgaoEmissor = element.key;
                    orgaoValido = true;
                }
            });

            this.dadosTitular.orgaoEmissor = orgaoValido ? this.dadosTitular.orgaoEmissor : "";
        }

        arrayAnexos.anexos['Doc Oficial'].frenteVerso = true;
        arrayAnexos.anexos['Doc Oficial'].frente = true;

        if (this._rgCompleto) {
            if ((!tarifaSocial && this._docVersoDados) || (tarifaSocial && this._docVersoDadosTarifaSocial)) {
                arrayAnexos.anexos['Doc Oficial'].docsSuficientes = true;
            } else {
                tarifaSocial ? this.alertDocumentosInvalidos(window.screen.width <= 768, perfil, "Doc Oficial", arquivo, tarifaSocial) :
                    this.alertDocOficialInvalido(window.screen.width <= 768, perfil);
            }

        } else {
            this.verificaFrenteVerso(perfil, tarifaSocial);

            if (!tarifaSocial) {
                this.uploadDoc(perfil, arquivo, 'Doc Oficial');
            } else {
                this.uploadDocTarifaSocial(arquivo, 'Doc Oficial')
            }
        }
    }

    private preencherDadostitular(tag: string, perfil: string, json: any, arquivo: Anexo, tarifaSocial: boolean): void {
        if (tarifaSocial) {
            this.validarDadosTitularTarifaSocial(tag, perfil, json, arquivo);
        } else {

            //anexo reservista
            let jsonCPF;
            if (!json.tags.includes('br-reservista-1')) {
                jsonCPF = this._ocrService.isOCRFieldValid(json.fields?.find((f: any) => f.name === 'cpf'));
            }

            const jsonNome = (removerCaracteresEspeciais(json.fields?.find((f: any) => f.name === 'nome').value).split(" ", 1)[0]) === removerCaracteresEspeciais(this._userServiceLN.sessionUser.nome).split(" ", 1)[0];

            if (jsonCPF === this._userServiceLN.sessionUser.documento || jsonNome || this._userServiceLN.tipoDocumento === 'CNPJ') {
                if (tag === 'rg_verso') {
                    this.documentos[perfil].anexos['Doc Oficial'].frenteVerso = true;
                    this.documentos[perfil].anexos['Doc Oficial'].verso = true;
                    this.dadosTitular.dataEmissao = this._ocrService.isOCRFieldValid(json.fields?.find((f: any) => f.name === 'data_expedicao'));
                }

                this.dadosTitular.nome = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(json.fields?.find((f: any) => f.name === 'nome')));
                this.dadosTitular.estado = this._ocrService.isOCRFieldValid(json.fields?.find((f: any) => f.name === 'naturalidade_uf'));
                this.dadosTitular.rg = this._ocrService.isOCRFieldValid(json.fields?.find((f: any) => f.name === 'rg'));
                this.dadosTitular.cpf = this._ocrService.isOCRFieldValid(json.fields?.find((f: any) => f.name === 'cpf'));

                // doc suficiente - passaporte
                if (json.tags.includes('br-passaporte-1') || json.tags.includes('br-passaporte-2')) {
                    let arrayData = this._ocrService.isOCRFieldValid(json.fields.find((f: any) => f.name === 'data_nascimento')).split('-');
                    this.dadosTitular.dataNascimento = arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0]
                    this.documentos[perfil].anexos['Doc Oficial'].docsSuficientes = true;
                }

                // doc suficiente - reservista
                else if (json.tags.includes('br-reservista-1')) {
                    this.dadosTitular.dataNascimento = this._ocrService.isOCRFieldValid(json.fields.find((f: any) => f.name === 'data_nascimento'))
                    this.documentos[perfil].anexos['Doc Oficial'].docsSuficientes = true;
                }

                else {
                    this.dadosTitular.dataNascimento = this._ocrService.isOCRFieldValid(json.fields?.find((f: any) => f.name === 'data_nascimento'));
                }

                if (!this._rgCompleto && !this.documentos[perfil].anexos['Doc Oficial'].docsSuficientes) {
                    this.verificaFrenteVerso(perfil, tarifaSocial);
                }

                this.uploadDoc(perfil, arquivo, 'Doc Oficial');

            } else {
                tarifaSocial ? this.alertDocumentosInvalidos(window.screen.width <= 768, perfil, "Doc Oficial", arquivo, tarifaSocial) :
                    this.alertDocOficialInvalido(window.screen.width <= 768, perfil);
            }
        }
    }

    validarDadosTitularTarifaSocial(tag: string, perfil: string, json: any, arquivo: Anexo): void {
        const maxTentativas = 3;
        let dataDeNascimento: string;

        const jsonCPF = this._ocrService.isOCRFieldValid(json.fields.find((f: any) => f.name === 'cpf'));
        const jsonNome = (removerCaracteresEspeciais(json.fields?.find((f: any) => f.name === 'nome').value).split(" ", 1)[0]) === removerCaracteresEspeciais(this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.nomeCompleto).split(" ", 1)[0];

        //Data de nascimento
        // if (tag.includes('br-passaporte')) {
        //     let arrayData = this._ocrService.isOCRFieldValid(json.fields.find((f: any) => f.name === 'data_nascimento')).split('-');
        //     dataDeNascimento = arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
        //     this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].docsSuficientes = true;
        // } else {
        dataDeNascimento = this._ocrService.isOCRFieldValid(json.fields.find((f: any) => f.name === 'data_nascimento'));
        // }

        if (jsonCPF === this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.cpf && dataDeNascimento.replace(/\D/g, '') === this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.dtNascimento.replace(/\D/g, '') && jsonNome) {
            this._dadosDaLigacaoService.setDocumentoComFotoTarifaSocialValidado = true;
            this.uploadDocTarifaSocial(arquivo, 'Doc Oficial');

            if (tag === 'rg_verso') {
                this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].frenteVerso = true;
                this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].verso = true;
            }

            if (this._rgCompleto) {
                this._docVersoDadosTarifaSocial = true;
            }

            if (!this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].docsSuficientes) {
                this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].docsSuficientes = this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].arquivos.length === this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].maxAnexos;
            }

            if (!this._rgCompleto && !this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].docsSuficientes) {
                this.verificaFrenteVerso(perfil, true);
            }

        } else {
            this._dadosDaLigacaoService.setDocumentoComFotoTarifaSocialValidado = false;
            if (this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].tentativas < maxTentativas - 1) {
                this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].docsSuficientes = false;
                this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].frenteVerso = false;
                this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].verso = false;
                this.alertDocumentosInvalidos(window.screen.width <= 768, 'residencial', 'Doc Oficial', arquivo, true);
            } else {
                this._alert.alertAnexarSemValidar();
                this.uploadDocTarifaSocial(arquivo, 'Doc Oficial');
                this._dadosDaLigacaoService.setDocumentoComFotoTarifaSocialValidado = false;
                this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].tentativas++;
                this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].frenteVerso = (tag === 'rg_verso' && !this._rgCompleto) ? true : false;
                this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].verso = (tag === 'rg_verso' && !this._rgCompleto) ? true : false;
                this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].docsSuficientes = (this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos["Doc Oficial"].frenteVerso) ? false : true;
            }

        }
    }

    verificarAnexacaoComum(perfil: string, arquivo: Anexo, box: BoxAnexo, tarifaSocial?: boolean): void {
        let doc = tarifaSocial ? this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos[box.docName] : this.documentos[perfil].anexos[box.docName];

        if (doc.arquivos.length < doc.maxAnexos) {
            if (tarifaSocial) {
                this.uploadDocTarifaSocial(arquivo, box.docName)
            } else {
                this.uploadDoc(perfil, arquivo, box.docName);
            }

        } else {
            this._alert.alertSuccess("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo");
        }
    }

    verificarAnexacaoDocOficial(perfil: string, docName: string, doc: string, tarifaSocial: boolean): boolean {
        let docRepetido = false;
        let arquivosParaVerificar = tarifaSocial ? this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos[docName].arquivos : this.documentos[perfil].anexos[docName].arquivos;
        let docSuficienteVerificar = tarifaSocial ? this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos[docName] : this.documentos[perfil].anexos[docName];

        if (docSuficienteVerificar.docsSuficientes) {
            return false;

        } else if (!this._rgCompleto) {
            arquivosParaVerificar.forEach((element: any) => {

                //Anexou o mesmo documento duas vezes
                if (element.fileName === doc) {
                    this.verificaFrenteVerso(perfil, tarifaSocial);
                    docRepetido = true;
                }

                //Anexou o documento com o par correto para RG
                else if ((element.fileName === 'RG Frente' && doc === 'RG Verso') || (element.fileName === 'RG Verso' && doc === 'RG Frente')) {
                    docRepetido = false;
                }

                //Anexou o documento com o par errado do documento anterior - por exemplo enviar RG Frente e depois CNH Verso
                else if (element.fileName.includes('RG') && doc.includes('CNH Verso') || element.fileName.includes('CNH Verso') && doc.includes('RG')) {
                    this._alert.alertSuccess("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo");
                    docRepetido = true;
                }

                //Anexou o documento com o par incorreto e que é TAG única - cnh frente, passaporte e doc oficial (rg frente e verso no mesmo arquivo)
                else {
                    docRepetido = this.validarTagUnica(element, perfil, docName, doc);
                }
            });
            return docRepetido ? false : true;
        } else {
            //Tratativa caso ja tenha anexado um doc anterior ao rg completo (rg frente e rg verso no mesmo arquivo)
            if (this.documentos[perfil].anexos[docName].arquivos.length > 0) {
                if (this.documentos[perfil].anexos[docName].arquivos[0].fileName !== 'Doc Oficial') {
                    this.documentos[perfil].anexos[docName].frente = false;
                    this.documentos[perfil].anexos[docName].frenteVerso = true;
                    this.documentos[perfil].anexos[docName].arquivos = [];
                }
            }
            return true;
        }
    }

    validarTagUnica(element: any, perfil: string, docName: string, doc: string): boolean {
        let docsUnicos = ['Doc Oficial', 'CNH Frente', 'CNH'];
        let dadosCNH = (element.fileName === 'RG Frente' || element.fileName === 'RG Verso') && docsUnicos.includes(doc)
        let dadosRG = (element.fileName === 'CNH Verso') && docsUnicos.includes(doc)

        if (dadosCNH || dadosRG) {
            this.documentos[perfil].anexos[docName].frenteVerso = false;
            this.documentos[perfil].anexos[docName].arquivos = []
            return false;
        } else {
            return true;
        }
    }

    ordemDocComFoto(data: any): boolean {
        var temp;
        //Validar score de ambos lados do rg - caso algum seja menor que ACCEPTABLE_OCR_SCORE o doc não deve ser aceito
        if (data[0].docQualityScore < this._ocrService.ACCEPTABLE_OCR_SCORE || data[1].docQualityScore < this._ocrService.ACCEPTABLE_OCR_SCORE) {
            if (data[0].docQualityScore < data[1].docQualityScore) {
                data[1].docQualityScore = data[0].docQualityScore;
            } else {
                data[0].docQualityScore = data[1].docQualityScore;
            }
            return false;
        }
        if (data[0].docType === 'rg_frente') {
            temp = data[0];
            data[0] = data[1];
            data[1] = temp;
        }
        return true;
    }

    alertDocOficialInvalido(mobile: boolean, perfil: string): void {
        this.documentos[perfil].anexos['Doc Oficial'].tentativas++;
        this.documentos[perfil].anexos['Doc Oficial'].docsSuficientes = false;
        if (this.documentos[perfil].anexos['Doc Oficial'].tentativas === 1) {
            this._alert.alertAttemptOneDocument(mobile);
        } else if (this.documentos[perfil].anexos['Doc Oficial'].tentativas === 2) {
            this._alert.alertAttemptTwoDocument(mobile);
        } else if (this.documentos[perfil].anexos['Doc Oficial'].tentativas === 3) {
            this._alert.alertAttemptThreeDocument(mobile);
        } else {
            this._alert.alertAttemptFourDocument().then(r => {
                if (r) {
                    this._userServiceLN.usuarioBloqueado = this._userServiceLN.sessionUser.documento;
                    this._loginService.logout();
                    this._loginService.redirectToLogin();
                }
            });
        }
    }

    alertDocumentosInvalidos(mobile: boolean, perfil: string, docName: string, arquivo: Anexo, tarifaSocial: boolean): boolean {
        let documentos = tarifaSocial ? this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos[docName] : this.documentos[perfil].anexos[docName]
        documentos.tentativas++;
        let tentativas = documentos.tentativas;
        let maxTentativas = (tarifaSocial && docName === 'Doc Oficial') ? 3 : documentos.maxTentativas;

        if (tentativas === 1) {
            this._alert.alertAttemptOneDocument(mobile);
        } else if (tentativas === 2) {
            this._alert.alertAttemptTwoDocument(mobile);
        } else if (tentativas === 3 && tentativas < maxTentativas) {
            this._alert.alertAttemptThreeDocument(mobile);
        }
        if (tentativas === maxTentativas) {
            if (docName !== 'CNPJ') {
                this._alert.alertAnexarSemValidar();
                if (tarifaSocial) {
                    this.uploadDocTarifaSocial(arquivo, docName)
                } else {
                    this.uploadDoc(perfil, arquivo, docName);
                }

            }
            return true;
        } else {
            return false;
        }
    }

    uploadDoc(perfil: string, arquivo: Anexo, docName: string): void {
        if (this._rgCompleto && docName === 'Doc Oficial') {
            this._docVersoDados = true;
        }
        this.documentos[perfil].anexos[docName].arquivos.push(arquivo);
    }

    uploadDocTarifaSocial(arquivo: Anexo, docName: string): void {
        this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos[docName].arquivos.push(arquivo);
        if (docName === 'Doc Oficial') {
            if (this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].arquivos.length === this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].maxAnexos ||
                this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].tentativas >= 3) {
                this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].docsSuficientes = true;
            }
        }
    }

    removeDocOficial(perfil: string, index: number, docName: string, tarifaSocial: boolean): void {
        let arrayAnexos = (tarifaSocial) ? this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial : this.documentos[perfil];

        if (arrayAnexos.anexos[docName].arquivos[index].fileName.includes('Frente')) {
            arrayAnexos.anexos[docName].frente = false;
            arrayAnexos.anexos[docName].docsSuficientes = false;
        } else {
            if (this._rgCompleto || arrayAnexos.anexos[docName].arquivos[index].fileName.includes('CNH')) {
                arrayAnexos.anexos[docName].frenteVerso = false;
                arrayAnexos.anexos[docName].frente = false;
                this._rgCompleto = false;
                if (tarifaSocial) {
                    this._docVersoDadosTarifaSocial = false
                } else {
                    this._docVersoDados = false;
                }
            }
            arrayAnexos.anexos[docName].verso = false;
            arrayAnexos.anexos[docName].docsSuficientes = false;
        }

        arrayAnexos.anexos[docName].arquivos.splice(index, 1);
        if (arrayAnexos.anexos[docName].arquivos.length !== 0) {
            this.verificaFrenteVerso(perfil, tarifaSocial);
        }

    }

    alertNecessarioDocOficial(perfil: string, tarifaSocial: boolean = false): void {
        let documentosParaTestar = tarifaSocial ? this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'] : this.documentos[perfil].anexos['Doc Oficial'].verso && this.documentos[perfil].anexos['Doc Oficial'];
        if (documentosParaTestar.frenteVerso) {
            this.verificaFrenteVerso(perfil, tarifaSocial)
        } else {
            this._alert.alertWarning("POR FAVOR, ENVIE TODOS OS DOCUMENTOS");
        }
    }

}
