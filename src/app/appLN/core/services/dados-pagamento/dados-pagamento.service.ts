import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, Observable } from 'rxjs';
import { Endereco } from '../../models/dados-do-imovel/endereco';
import { DadosBancarios, DadosPagamento, RecCaixaPostal } from '../../models/dados-pagamento/dados-pagamento';
import { DadosDaLigacaoService } from '../dados-da-ligacao/dados-da-ligacao.service';
import { DadosDoImovelService } from '../dados-do-imovel/dados-do-imovel.service';
import { DocumentosService } from '../documentos/documentos.service';
import { ErrorService } from '../error/error.service';
import { UserServiceLN } from "../user/user.service";
import { environmentLN } from '../../../../../environments/environmentsLN/environment';

@Injectable({
	providedIn: 'root'
})
export class DadosPagamentoService {
	public dadosPagamento: DadosPagamento;
	public debitoAutomatico: DadosBancarios = new DadosBancarios();

	constructor(
		private _http: HttpClient,
		private _userServiceLN: UserServiceLN,
		private _errorService: ErrorService,
		private _dadosDaLigacao: DadosDaLigacaoService,
		private _documentosService: DocumentosService,
		private _dadosDoImovelService: DadosDoImovelService
	) {
		this.dadosPagamento = new DadosPagamento();
	}

	enviarDadosFatura() {
		let body = {
			"uc": this._userServiceLN.uc,
			"numeroCliente": this._userServiceLN.numeroCliente,
			"codigoCanalResposta": "1",
			"nomeSolicitante": this._documentosService.dadosTitular.nome,
			"email": this._documentosService.dadosTitular.email,
			"telefone": "",
			"celular": "",
			"codigoMotivoReclamacao": "M03",
			"subTipoSS": "OUV",
			"subTipoOS": "T05",
			"observacao": "Banco=" + this.debitoAutomatico.banco?.numeroBanco + " / Agencia=" + this.debitoAutomatico.agencia + " / Conta=" + this.debitoAutomatico.conta,
			"statusResptForm": false,
			"codigoTipoMotivo": "OUV",
			"codigoOrigem": "AV"
		}

		// "codigoMotivoReclamacao": "M03",
		// "subTipoSS": "OUV",
		// "subTipoOS": "T05",
		// "observacao": "Banco=" + this.debitoAutomatico.banco?.numeroBanco + " / Agencia=" + this.debitoAutomatico.agencia + " / Conta=" + this.debitoAutomatico.conta,
		// "statusResptForm": false,
		// "codigoTipoMotivo": "OUV",
		// "codigoOrigem": "AV"

		//DADOS PRODUCAO
		//"codigoMotivoReclamacao": "S22",
		//"subTipoSS": "SCL",
		//"subTipoOS": "B03",
		//"observacao": "Banco=" + this.debitoAutomatico.banco?.numeroBanco + " / Agencia=" + this.debitoAutomatico.agencia + " / Conta=" + this.debitoAutomatico.conta,
		//"statusResptForm": false,
		//"codigoTipoMotivo": "SOL",
		//"codigoOrigem": "CL"

		let urlApiNeo = environmentLN.apiUrl + '/v2/apoio/ss-reclamacao?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);
		return this._http.post<string>(urlApiNeo, body).pipe(catchError(this._errorService.handleError<string>()))
	}

	taxaEntregaAlternativa() {
		let uc = (this._dadosDoImovelService.getDadosDoImovel.endereco.uc !== "") ? this._dadosDoImovelService.getDadosDoImovel.endereco.uc : "17449260";
		let urlApiNeo = environmentLN.apiUrl + '/v2/ucs/' + uc + '/taxa-entrega-alternativa?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);
		return this._http.get<any>(urlApiNeo).pipe(catchError(this._errorService.handleError<any>()));
	}

	entregaAlternativa(dadosAlternativo: any, recAlternativo: string): Observable<any> {
		let body = {
			"uc": this._dadosDoImovelService.getEndereco.uc,
			"endEntregaAlternativa": {
				"cep": recAlternativo !== 'CAIXA POSTAL' ? dadosAlternativo.cep : '',
				"caixaPostal": recAlternativo === 'CAIXA POSTAL' ? dadosAlternativo.caixaPostal : '',
				"codigoUF": dadosAlternativo.estado,
				"complemento": recAlternativo !== 'CAIXA POSTAL' ? dadosAlternativo.complemento : '',
				"bairro": recAlternativo !== 'CAIXA POSTAL' ? dadosAlternativo.bairro : '',
				"logradouro": recAlternativo !== 'CAIXA POSTAL' ? dadosAlternativo.bairro : '',
				"municipio": dadosAlternativo.cidade,
				"uf": dadosAlternativo.estado,
				"numero": recAlternativo !== 'CAIXA POSTAL' ? dadosAlternativo.numero : '',
			}
		};

		let urlApiNeo = environmentLN.apiUrl + '/v2/ucs/entrega-alternativa?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);
		return this._http.post<boolean>(urlApiNeo, body).pipe(catchError(this._errorService.handleError<boolean>()));
	}

	get getDadosPagamento(): DadosPagamento {
		return this.dadosPagamento;
	}

	set setRecebimentoNoImovel(dadosPagamento: any) {
		this.dadosPagamento.receberNoImovel.endereco = dadosPagamento;
	}

	set setRecebimentoAlternativo(dadosPagamento: any) {
		this.dadosPagamento.receberEnderecoAlternativo.endereco = dadosPagamento;
	}

	set setRecebimentoCaixaPostal(dadosPagamento: any) {
		this.dadosPagamento.receberCaixaPostal = dadosPagamento;
	}

	set setDataVencimento(dataEscolhida: string) {
		this.dadosPagamento.dataVencimento = dataEscolhida;
	}

	get getDataVencimento(): string {
		return this.dadosPagamento.dataVencimento;
	}
}
