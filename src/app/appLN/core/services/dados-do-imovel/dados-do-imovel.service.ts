import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, of, throwError } from 'rxjs';
import { environmentLN } from '../../../../../environments/environmentsLN/environment';
import { Anexos } from '../../models/anexo/anexo';
import { DadosDoImovel, Endereco } from '../../models/dados-do-imovel/endereco';
import { Imovel } from '../../models/dados-do-imovel/imovel';
import { DocumentoPosse } from '../../models/documento-posse/documento-posse';
import { ErrorService } from '../error/error.service';
import { OcrService } from '../ocr/ocr.service';
import { UserServiceLN } from '../user/user.service';
import { removerCaracteresEspeciais } from '../utils/neo-utils.service';

@Injectable({
	providedIn: 'root'
})
export class DadosDoImovelService {
	public USUARIO_UE = 'SITE02CMP';
	possivelDebito: boolean;
	private _dadosDoImovel: DadosDoImovel;
	private _docPosse: DocumentoPosse;
	private _docsAnexos: Anexos;
	private _debitos: boolean;
	private _docsNecessarios = {
		"0": [
			{
				label: 'COMPROVANTE DE ENDEREÇO',
				docName: 'Comprovante de Endereço',
				ocr: true
			},
		],
		"1": [
			{
				label: 'LICENÇA AMBIENTAL',
				docName: 'Licença Ambiental',
				ocr: true
			}
		],
		"2": [
			{
				label: 'COMPROVANTE DE ENDEREÇO',
				docName: 'Comprovante de Endereço',
				ocr: true
			},
			{
				label: 'LICENÇA AMBIENTAL',
				docName: 'Licença Ambiental',
				ocr: true
			}
		]
	}

	private _textInfoDoc = {
		"0":
		{
			informativo: "Precisamos que nos envie o comprovante de endereço",
			tooltip: "Como comprovante de Endereço, deve ser enviado um documento recente que comprove o endereço do imóvel. - Exemplo: IPTU (Imposto Territorial Urbano), ITR/IPTR (Imposto Territorial Rural), INCRA (Instituto Nacional de Colonização e Reforma Agrária),DIM (Documento de Inscrição Municipal, DAM (Documento de Arrecadação Municipal), Escritura do Imóvel ou Declaração da Prefeitura.",
		},
		"1":
		{
			informativo: "Precisamos que nos envie a licença ambiental!",
			tooltip: "Em áreas de proteção ambiental, deve ser enviada a Licença Ambiental emitida pelo IBAMA ou Órgão Estadual, contendo os dados de endereço do imóvel."
		},
		"2":
		{
			informativo: "Precisamos que nos envie a licença ambiental e o comprovante de endereço!",
			tooltip: "Como comprovante de Endereço, deve ser enviado um documento recente que comprove o endereço do imóvel. - Exemplo: IPTU (Imposto Territorial Urbano), ITR/IPTR (Imposto Territorial Rural), INCRA (Instituto Nacional de Colonização e Reforma Agrária),DIM (Documento de Inscrição Municipal, DAM (Documento de Arrecadação Municipal), Escritura do Imóvel ou Declaração da Prefeitura.\n\n Em áreas de proteção ambiental, deve ser enviada a Licença Ambiental emitida pelo IBAMA ou Órgão Estadual, contendo os dados de endereço do imóvel."
		},
	}

	PREFEITURAS_COM_AUTORIZACAO: Array<string> = ["ILHABELA", "UBATUBA", "MAIRIPORA"];
	validarDocPrefeitura: boolean;


	constructor(
		private _http: HttpClient,
		private _userServiceLN: UserServiceLN,
		private _errorService: ErrorService,
		private _ocrService: OcrService,

	) {
		this.possivelDebito = false;
		this._docsAnexos = new Anexos();
	    this._debitos = false;
		this._dadosDoImovel = new DadosDoImovel();
		this._docPosse = new DocumentoPosse();
		this.validarDocPrefeitura = false;
	}

	set setPadraoPronto(padrao: boolean | undefined) {
		this._dadosDoImovel.padraoPronto = padrao;
	}

	get getPadraoPronto(): boolean | undefined{
		return this._dadosDoImovel.padraoPronto;
	}

	set setRuaSemCep(ruaSemCep: boolean) {
		this._dadosDoImovel.endereco.ruaSemCep = ruaSemCep;
	}

	get getRuaSemCep(): boolean {
		return this._dadosDoImovel.endereco.ruaSemCep;
	}

	set setCepEncontrado(cepEncontrado: boolean) {
		this._dadosDoImovel.endereco.cepEncontrado = cepEncontrado;
	}

	get getCepEncontrado(): boolean {
		return this._dadosDoImovel.endereco.cepEncontrado;
	}

	set setDebitos(debitos: boolean) {
		this._debitos = debitos;
	}

	get getDebitos(): boolean {
		return this._debitos;
	}

	set setEndereco(endereco: Endereco) {
		this._dadosDoImovel.endereco = endereco;
	}

	get getEndereco(): Endereco {
		return this._dadosDoImovel.endereco;
	}

	set setDadosDoImovel(dadosDoImovel: DadosDoImovel) {
		this._dadosDoImovel = dadosDoImovel;
	}

	get getDadosDoImovel(): DadosDoImovel {
		return this._dadosDoImovel;
	}

	set setEnderecoAnexos(anexos: any) {
		this._dadosDoImovel.endereco.anexos = anexos;
	}

	get getEnderecoAnexos(): any {
		return this._dadosDoImovel.endereco.anexos;
	}

	set setDebitosAnexos(anexos: any) {
		this._dadosDoImovel.endereco.anexosDebitos = anexos;
	}

	get getDebitosAnexos(): any {
		return this._dadosDoImovel.endereco.anexosDebitos;
	}

	set setMultipleUESelection(multipleUESelection: boolean) {
		this._dadosDoImovel.multipleUESelection = multipleUESelection;
	}

	get getMultipleUESelection(): boolean {
		return this._dadosDoImovel.multipleUESelection;
	}

	set setChecarDocPosse(dados: boolean) {
		this._docPosse.checarDocumentoPosse = dados;
	}

	set setTermoPosse(documentoPosse: string) {
		this._docPosse.termoAceitoDocPosse = documentoPosse;
	}

	get getDocPosse(): DocumentoPosse {
		return this._docPosse;
	}

	get getTextInfoDoc(): any {
		return this._textInfoDoc;
	}

	get getDocsNecessarios(): any {
		return this._docsNecessarios;
	}

	validarEnderecoIPTU(ocr: any): boolean {
		let anoCorrente = new Date().getFullYear().toString();

		let nomeValido = (removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'proprietario/contribuinte'))).split(' ', 1)[0]) === removerCaracteresEspeciais(this._userServiceLN.sessionUser.nome).split(' ', 1)[0];

		let enderecoValido = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'endereco_do_imovel'))).includes(removerCaracteresEspeciais(this.getEndereco.endereco));
		let prazoValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'notificacao_lancamento')) >= anoCorrente;

		let cepValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'endereco_do_imovel')).includes(this.getEndereco.cep);
		let cidadeValido = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'endereco_do_imovel'))).includes(removerCaracteresEspeciais(this.getEndereco.cidade));
		let bairroValido = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'endereco_do_imovel'))).includes(removerCaracteresEspeciais(this.getEndereco.bairro));
		let numeroValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'endereco_do_imovel'))?.includes(this.getEndereco.numero);


		if (nomeValido && enderecoValido && prazoValido && bairroValido && numeroValido && (cepValido || cidadeValido)) {
			return true;
		} else {
			return false;
		}
	}

	validacaoINCRA(ocr: any): boolean {
		let nomeValido = (removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'nome'))).split(' ', 1)[0]) === removerCaracteresEspeciais(this._userServiceLN.sessionUser.nome).split(' ', 1)[0];
		let documentoValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'cpf')) === this._userServiceLN.sessionUser.documento;
		let municipioValido = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'cidade'))) === removerCaracteresEspeciais(this.getEndereco.cidade);
		let estadoValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'uf')) === this.getEndereco.estado;
		if (nomeValido && documentoValido && municipioValido && estadoValido) {
			return true;
		} else {
			return false;
		}
	}

	listarUc(endereco: any): Observable<any> {
		let body = {
			"codigoLocalidade": endereco.codigoLocalidade,
			"codigoBairro": endereco.codigoBairro,
			"codigoLogradouro": endereco.codigoLogradouro,
			"numeroImovel": endereco.numero,
		};
		let urlApiNeo = environmentLN.apiUrl + '/v2/ucs/endereco-uc?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(environmentLN.USUARIO_UE);
		return this._http.post<boolean>(urlApiNeo, body);
	}

	listDebitoUc(uc: string): Observable<any> {
		let urlApiNeo = environmentLN.apiUrl + '/v2/ucs/' + encodeURIComponent(uc) + '/debito-ligacao-nova?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(environmentLN.USUARIO_UE);
		return this._http.get<any>(urlApiNeo).pipe(
			mergeMap((response) => response?.status == 401 ? throwError(null) : of(response))
		);
	}

	ligacaoNovaPendente(codigoUc: string): Observable<any> {
		let urlApiNeo = environmentLN.apiUrl + '/v2/ligacao-nova/' + codigoUc + '/ligacao-nova-pendente?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(environmentLN.USUARIO_UE);
		return this._http.get<any>(urlApiNeo);
	}

	buscarCep(cep: string, isCorreios: boolean = false): Observable<any> {
		let urlApiNeo = environmentLN.apiUrl + '/v2/apoio/' + encodeURIComponent(cep) + '/cep-ue?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);

		if (isCorreios) {
			urlApiNeo = environmentLN.apiUrl + '/v2/apoio/' + encodeURIComponent(cep) + '/cep-correios/?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);
		}
		return this._http.get<Imovel>(urlApiNeo).pipe(catchError(this._errorService.handleError<boolean>()));
	}

	cepAberto(cep: string): Observable<any> {
		let urlApiNeo = environmentLN.apiUrl + '/v2/apoio/' + cep + '/cep-aberto?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);
		return this._http.get<any>(urlApiNeo).pipe(catchError(this._errorService.handleError<boolean>()));
	}


}
