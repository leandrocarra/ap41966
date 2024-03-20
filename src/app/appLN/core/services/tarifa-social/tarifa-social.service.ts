import { Injectable } from '@angular/core';
import { DocumentosService } from '../documentos/documentos.service';
import { UserServiceLN } from '../user/user.service';
import { CustomSweetAlertService } from '../sweet-alert/custom-sweet-alert.service';
import { Anexo } from '../../models/anexo/anexo';
import { DadosDaLigacaoService } from '../dados-da-ligacao/dados-da-ligacao.service';
import { DadosDoImovelService } from '../dados-do-imovel/dados-do-imovel.service';
import { OcrService } from '../ocr/ocr.service';
import { removerCaracteresEspeciais } from '../utils/neo-utils.service';


@Injectable({
	providedIn: 'root'
})
export class TarifaSocialService {
	documentos: any;
	documentosTitular: any;
	documentosNaoTitular: any;
	private _especificarArquivoBackoffice: string;
	private _solicitarKit: boolean;
	constructor(
		private _dadosDaLigacaoService: DadosDaLigacaoService,
		private _dadosDoImovelService: DadosDoImovelService,
		private _documentosService: DocumentosService,
		private _alert: CustomSweetAlertService,
		private _userServiceLN: UserServiceLN,
		private _ocrService: OcrService,
	) {
        this._especificarArquivoBackoffice = '';
		this._solicitarKit = false;

		this.documentos = {
			1: {
				label: 'FOLHA RESUMO CADASTRO ÚNICO - V7',
				docName: 'Folha V7',
				ocr: true
			},
			2: {
				label: 'COMPROVANTE ASSISTÊNCIA MÉDICA DOMICILIAR',
				docName: 'Ass Medica',
				ocr: false
			},
			3: {
				label: 'CARTA DE CONCESSÃO DO INSS',
				docName: 'Carta INSS',
				ocr: true
			},
			4: {
				label: 'DOCUMENTO OFICIAL COM FOTO (TITULAR DO BENEFÍCIO)',
				docName: 'Doc Oficial',
				ocr: true
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

	getDocumentosNecessiaros(titular: boolean): any {
		return titular
			? this.documentosTitular[this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.beneficio]
			: this.documentosNaoTitular[this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.beneficio]
	}

	set especificarArquivoBackoffice(especificarArquivo: string) {
		this._especificarArquivoBackoffice = especificarArquivo;
	}

	get espeficiarArquivoBackoffice(): string {
		return this._especificarArquivoBackoffice;
	}

	set setTarifaSocialValidada(valor: boolean) {
		this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.tarifaSocialValidada = valor;
	}

	get getTarifaSocialValidada(): boolean {
		return this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.tarifaSocialValidada;
	}

	get deveMostrarPerguntaSolicitacaoKit() {
		if (this._dadosDoImovelService.getDadosDoImovel.endereco.zonaRural) {
			return this._dadosDaLigacaoService.getCategoria != 'TRIFÁSICA' ? true : false;
		}
		return false;
	}

	set setSolicitarKit(dados: boolean) {
		this._solicitarKit = dados;
	}

	get getSolicitarKit(): boolean {
		return this._solicitarKit;
	}

	set setTitular(dados: boolean) {
		this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.titular = dados;
	}

	get getTitular(): boolean {
		return this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.titular;
	}

	set setDisableForm(formularioDesabilitado: boolean) {
		this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.disableForm = formularioDesabilitado;
	}

	get getDisableForm(): boolean {
		return this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.disableForm;
	}

	urlRedirecionamento(doc: string): void {
		if (doc === 'INSS') {
            let newWindow = window.open('https://www.gov.br/inss/pt-br/saiba-mais/seu-beneficio/declaracao-de-beneficio-consta-nada-consta', '_blank');
			if (newWindow) {
				newWindow.opener = null;
			}
		} else {
            let newWindow = window.open('https://www.gov.br/pt-br/servicos/emitir-comprovante-do-cadastro-unico', '_blank');
			if (newWindow) {
				newWindow.opener = null;
			}
		}
	}

	retornaNomeValido(data: any, nomeCampoOCR: string, nameAComparar: string): boolean {
		let nome: string = this._ocrService?.isOCRFieldValid((data.fields.find((f: any) => f.name === nomeCampoOCR)));
		let validacao: boolean = removerCaracteresEspeciais(nome).split(" ", 1)[0] === removerCaracteresEspeciais(nameAComparar).split(" ", 1)[0];
		return validacao;
	}

	retornaDataValida(data: any, nomeCampoOCR: string, dataAComparar: string): boolean {
		let dataDocumento: string = this._ocrService?.isOCRFieldValid((data.fields.find((f: any) => f.name === nomeCampoOCR)));

		if (dataDocumento && dataDocumento != '' && dataDocumento != null) {
			return dataDocumento?.replace(/[^\d]+/g, "") === dataAComparar?.replace(/[^\d]+/g, "");
		} else {
			return false;
		}
	}

	validarCamposOCR(data: any, nomeCampoOCR: string, campoAComparar: string): boolean {
		return this._ocrService.isOCRFieldValid((data.fields.find((f: any) => f.name === nomeCampoOCR))) === campoAComparar;
	}

	validarCamposOCRSemCaracteresEspeciais(data: any, nomeCampoOCR: string, campoAComparar: string): boolean {
		return removerCaracteresEspeciais(this._ocrService.isOCRFieldValid((data.fields.find((f: any) => f.name === nomeCampoOCR)))) === removerCaracteresEspeciais(campoAComparar);
	}


	//Validar Folha v7
	validarFolhaV7(arquivo: Anexo, documento: string, data: any, mobile: boolean): void {
		let dadosBeneficioTitular = this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial;
		let dadosBeneficio = this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosBeneficio;

		let nomeValido: boolean = this.retornaNomeValido(data.result[0], 'responsavel_familiar', this.getTitular ? this._userServiceLN.sessionUser.nome : dadosBeneficioTitular.nomeCompleto);


		let dataNas = this._ocrService.isOCRFieldValid((data.result[0].fields.find((f: any) => f.name === 'data_nascimento')));
		let dataNascimento: boolean = dataNas?.replace(/\D/g, '') === ((this.getTitular) ? this._documentosService.dadosTitular.dataNascimento.replace(/\D/g, '') : dadosBeneficioTitular.dtNascimento.replace(/\D/g, ''));

		let codigoFamiliarValido = this._ocrService.isOCRFieldValid((data.result[0].fields.find((f: any) => f.name === 'cod_familiar')))
		codigoFamiliarValido = codigoFamiliarValido?.replace(/\D+/g, '') === dadosBeneficio.codigoFamiliar;

		let nisValido: boolean = this.validarCamposOCR(data.result[0], 'nis', dadosBeneficio.nis);
		let cidadeValida: boolean = this.validarCamposOCRSemCaracteresEspeciais(data.result[0], 'cidade', this._dadosDoImovelService.getEndereco.cidade);


		// caso o documento esteja assinado, o valor da string de retorno é 1, caso contrário, o retorno é 0
		let assinaturaResponsavel: boolean = this.validarCamposOCR(data.result[0], 'assinatura_responsavel', '1');

		// Valida se o nome informado faz parte de algum dos familiares
		let pessoaValida = false;
		for (let i = 0; i < 4; i++) {
			let nome = 'nome_' + i.toString();
			let nis = 'nis_' + i.toString();
			let dataIndex = 'data_' + i.toString();

			let nomeDoc = this._ocrService.isOCRFieldValid(data.result[0].fields.find((f: any) => f.name === nome));
			removerCaracteresEspeciais(nomeDoc);

			let nisDoc = this._ocrService.isOCRFieldValid(data.result[0].fields.find((f: any) => f.name === nis));
			let dataDoc = this._ocrService.isOCRFieldValid(data.result[0].fields.find((f: any) => f.name === dataIndex));



			if (dataDoc && dataDoc != '' && dataDoc != null) {
				if (codigoFamiliarValido &&
					(
						(
							nomeDoc.includes(this.getTitular ? removerCaracteresEspeciais(this._userServiceLN.sessionUser.nome).split(" ", 1)[0] : removerCaracteresEspeciais(dadosBeneficioTitular.nomeCompleto).split(" ", 1)[0]) &&
							dataDoc.replace(/\D/g, '') === ((this.getTitular) ? this._documentosService.dadosTitular.dataNascimento.replace(/\D/g, '') : dadosBeneficioTitular.dtNascimento.replace(/\D/g, '')) &&
							nisDoc === dadosBeneficio.nis
						)
					)
				) {
					pessoaValida = true;
				}
			}
		}

		//Validar dados do benefício
		if (((nomeValido && dataNascimento && nisValido) || pessoaValida) && codigoFamiliarValido && cidadeValida && assinaturaResponsavel) {
			this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos[documento].arquivos.push(arquivo);
		} else {
			this.alertDocInvalido(documento, mobile);
		}
	}

	//Validar INSS
	validarINSS(arquivo: Anexo, documento: string, data: any, mobile: boolean): void {
		let dadosBeneficioTitular = this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial;
		let dadosBeneficio = this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosBeneficio;

		let nomeValido: boolean = this.retornaNomeValido(data.result[0], 'nome_beneficiario', this.getTitular ? this._userServiceLN.sessionUser.nome : dadosBeneficioTitular.nomeCompleto);
		let cpfValidado: boolean = this.validarCamposOCR(data.result[0], 'cpf', this.getTitular ? this._userServiceLN.sessionUser.documento : dadosBeneficioTitular.cpf);
		let nbValidado: boolean = this.validarCamposOCR(data.result[0], 'numero_beneficio', dadosBeneficio.nb);

		if (nomeValido && cpfValidado && nbValidado) {
			this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos[documento].arquivos.push(arquivo);
		} else {
			this.alertDocInvalido(documento, mobile)
		}
	}

	alertDocInvalido(documento: string, mobile: boolean): void {
		let tentativas = this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos[documento].tentativas;
		if (tentativas === 1) {
			this._alert.alertAttemptOneDocument(mobile);
		} else if (tentativas === 2) {
			this._alert.alertAttemptTwoDocument(mobile);
		} else if (tentativas === 3) {
			this._alert.alertAttemptThreeDocument(mobile);
		}
	}
}



