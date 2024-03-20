import { Injectable } from '@angular/core';
import { DadosTarifaSocial } from 'app/core/models/tarifa-social-DTO/dados-tarifa-social';

@Injectable({
  providedIn: 'root'
})
export class TarifaSocialService {

  titular!: boolean;
  documentos: any;
  documentosTitular: any;
  documentosNaoTitular: any;
  documentoDuplo: boolean = false;
  _dadosTarifaSocial: DadosTarifaSocial;

  private _documentosValidado: boolean;
  private _especificarArquivoBackoffice!: string;
  private _solicitarKit: boolean;

  private _documento!: string;
  constructor() {
    this._dadosTarifaSocial = new DadosTarifaSocial();
    this._documentosValidado = false;
    this._solicitarKit = false;


    this.documentos = {
      1: {
        label: 'FOLHA RESUMO CADASTRO ÚNICO - V7',
        docName: 'Folha V7'

      },
      2: {
        label: 'COMPROVANTE ASSISTÊNCIA MÉDICA DOMICILIAR',
        docName: 'Ass Medica'

      },
      3: {
        label: 'CARTA DE CONCESSÃO DO INSS',
        docName: 'Carta INSS'

      },
      4: {
        label: 'DOCUMENTO OFICIAL COM FOTO (TITULAR DO BENEFÍCIO)',
        docName: 'Doc Oficial'

      }
    }

    this.documentosTitular = {
      "PROGRAMA SOCIAL DO GOVERNO": [
        this.documentos[1],
      ],
      "ASSISTÊNCIA MÉDICA DOMICILIAR": [
        this.documentos[2],
        this.documentos[1]
      ],
      "BENEFÍCIO DE PRESTAÇÃO CONTINUADA": [
        this.documentos[3]
      ],
    }

    this.documentosNaoTitular = {
      "PROGRAMA SOCIAL DO GOVERNO": [
        this.documentos[4],
        this.documentos[1]
      ],
      "ASSISTÊNCIA MÉDICA DOMICILIAR": [
        this.documentos[4],
        this.documentos[2],
        this.documentos[1]
      ],
      "BENEFÍCIO DE PRESTAÇÃO CONTINUADA": [
        this.documentos[4],
        this.documentos[3]
      ],
    }


  }

  getDocumentosNecessarios(titular: boolean): any {
    return titular || titular === undefined
      ? this.documentosTitular[this._dadosTarifaSocial.beneficio] //verificar documento ja selecionado  
      : this.documentosNaoTitular[this._dadosTarifaSocial.beneficio]
  }


  set setDocumentoTarifa(documentoEnviado: string) {
    this._documento = documentoEnviado;
  }

  get getDocumentoTarifa(): string {
    return this._documento;
  }

  set setBeneficioTarifa(beneficioEscolhido: string) {
    this._dadosTarifaSocial.beneficio = beneficioEscolhido;
  }

  get getBeneficioTarifa(): string {
    return this._dadosTarifaSocial.beneficio;
  }

  set setTitular(dados: boolean) {
    this.titular = dados;
  }

  get getTitular(): boolean {
    return this.titular;
  }

  set setDadosTarifaSocial(valor: any) {
    this._dadosTarifaSocial = valor;
  }

  get getDadosTarifaSocial(): DadosTarifaSocial {
    return this._dadosTarifaSocial;
  }

  // set setDocumentoDuplo(dados: boolean) {
	// 	this.documentoDuplo = dados;
	// }

  // get getDocumentoDuplo() {
	// 	return this.documentoDuplo;
	// }

  urlRedirecionamento(doc: string): void {
    if (doc === 'INSS') {
      if (window.open('https://www.gov.br/inss/pt-br/saiba-mais/seu-beneficio/declaracao-de-beneficio-consta-nada-consta', '_blank')) {
        window.open('https://www.gov.br/inss/pt-br/saiba-mais/seu-beneficio/declaracao-de-beneficio-consta-nada-consta', '_blank')!.opener = null
      }
    } else {
      if (window.open('https://www.gov.br/pt-br/servicos/emitir-comprovante-do-cadastro-unico', '_blank')) {
        window.open('https://www.gov.br/pt-br/servicos/emitir-comprovante-do-cadastro-unico', '_blank')!.opener = null
      }
    }
  }


}
