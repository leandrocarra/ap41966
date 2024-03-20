import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environmentLN } from '../../../../../environments/environmentsLN/environment';
import { Anexo } from '../../models/anexo/anexo';
import { DadosDaLigacao } from '../../models/dados-da-ligacao/dados-da-ligacao';
import { Imovel } from '../../models/dados-do-imovel/imovel';
import { DadosPagamento } from '../../models/dados-pagamento/dados-pagamento';
import { DadosTitularTarifaSocial } from '../../models/dados-tarifa-social/dados-tarifa-social';
import { DadosTitular } from '../../models/dados-titular/dados-titular';
import { DadosDocumentos } from '../../models/documentos/dados-documentos';
import { EscolhaPerfil, SubPerfilRural } from '../../models/escolha-perfil/escolha-perfil';
import { EntregaAlternativa } from '../../models/ligacao-nova/ligacao-nova';
import { DadosDaLigacaoService } from '../dados-da-ligacao/dados-da-ligacao.service';
import { DadosDoImovelService } from '../dados-do-imovel/dados-do-imovel.service';
import { DadosPagamentoService } from '../dados-pagamento/dados-pagamento.service';
import { DebitoFaturaService } from '../debito-fatura/debito-fatura.service';
import { DocumentosService } from '../documentos/documentos.service';
import { ErrorService } from '../error/error.service';
import { TarifaSocialService } from '../tarifa-social/tarifa-social.service';
import { UserServiceLN } from '../user/user.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';


@Injectable({
	providedIn: 'root'
})
export class LigacaoNovaService {
	public video: any;
	public checkUE: boolean;
	public equipamentos: any[] = [];
	public storage: Storage = sessionStorage;
	private _imovel: Imovel;
	private _escolhaPerfil: EscolhaPerfil;
	private _dadosBeneficiario: DadosTitularTarifaSocial;
	constructor(
		private _http: HttpClient,
		private _erroService: ErrorService,
		private _userServiceLN: UserServiceLN,
		private _documentosService: DocumentosService,
		private _dadosDoImovelService: DadosDoImovelService,
		private _dadosPagamentoService: DadosPagamentoService,
		private _dadosDaLigacaoService: DadosDaLigacaoService,
		private _tarifaSocialService: TarifaSocialService,
		private _debitoFaturaService: DebitoFaturaService,
        private _loadingService: LoadingService
    ) {
		this.checkUE = false;
        this._imovel = new Imovel();
        this._escolhaPerfil = new EscolhaPerfil();
        this._dadosBeneficiario = new DadosTitularTarifaSocial();
	}

	set setDadosDaLigacao(dados: DadosDaLigacao) {
		this._dadosDaLigacaoService.dadosDaLigacao = dados;
	}

	set setDadosDocumentos(dados: DadosDocumentos) {
		this._documentosService.documentos = dados;
	}

	set setFormatoDadosTitular(cnpj: boolean) {
		this._documentosService.dadosTitular = new DadosTitular(cnpj);
	}

	get getDadosDocumentos(): DadosDocumentos {
		return this._documentosService?.documentos;
	}

	set imovelEscolhido(imovel: Imovel) {
		this._imovel = imovel;
	}

	get imovelEscolhido(): Imovel {
		return this._imovel;
	}

	set setPerfilEscolhido(perfilEscolhido: EscolhaPerfil) {
		this._escolhaPerfil = perfilEscolhido;
	}

	get getPerfilEscolhido(): EscolhaPerfil {
		return this._escolhaPerfil;
	}

	set setSubPerfilEscolhido(subPerfilEscolhido: SubPerfilRural) {
		this._escolhaPerfil.subPerfil = subPerfilEscolhido;
	}

	get getSubPerfilEscolhido(): SubPerfilRural | null {
		return this._escolhaPerfil?.subPerfil;
	}

	get getDadosDoBeneficiario(): DadosTitularTarifaSocial {
		return this._dadosBeneficiario;
	}

	get dadosDePagamento(): DadosPagamento {
		return this._dadosPagamentoService?.dadosPagamento;
	}

	idAcompanhamentoJornada(documento: string): Observable<string> {
		let urlApiNeo = environmentLN.apiUrl + '/v2/cre/' + encodeURIComponent(documento) + '/jornada-ligacao-nova';
		return this._http.get<any>(urlApiNeo).pipe();
	}

	etapaJornada(idAtendimento: any, etapa: any): Observable<boolean> {
		let urlApiNeo = environmentLN.apiUrl + '/v2/cre/' + encodeURIComponent(idAtendimento) + '/' + encodeURIComponent(etapa) + '/jornada-ligacao-nova';
		return this._http.post<boolean>(urlApiNeo, etapa).pipe(catchError(this._erroService.handleError<boolean>()));
	}

	checkCamera(): Promise<any> {
		return new Promise((resolve) => {
			if (navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'user' } })
					.then(() => {
                        this._loadingService.stop();
						resolve(null);
					}).catch((error) => {
                        this._loadingService.stop();
						resolve(error);
					}).finally(() => {
						resolve(null);
					});
			}
		});
	}

	public stopStreamedVideo(): void {
		let stream = this.video;
		if (stream) {
			let tracks = stream.getTracks();
			tracks.forEach((track: any) => {
				setTimeout(() => {
					track.stop();
				}, 1000);
			});
			this.video = null;
		}
	}

	enviarAnexos(file: Anexo, os: any, protocolo: any, numeroDoc: number) {
		let body = {
			"os": parseInt(os),
			"anexoSSOS": {
				"fileName": 'doc' + numeroDoc.toString() + file.fileExtension,
				"fileSize": file.fileSize.toString(),
				"fileData": file.fileData,
				"fileExtension": file.fileExtension.substr(1)
			}
		}

		let urlApiNeo = environmentLN.apiUrl + '/v2/apoio/ssos-anexo?protocolo=' + encodeURIComponent(protocolo) + '&usuarioUE=' + encodeURIComponent(environmentLN.USUARIO_UE);
		return this._http.post<string>(urlApiNeo, body).pipe(catchError(this._erroService.handleError<string>()));
	}

	formatDate(data: any): string {
		data = data.replace(/[^a-zA-Z0-9 ]/g, '');
		const day = data.substr(0, 2);
		const month = data.substring(2, 4);
		const year = data.substr(4, 8);
		return year + '-' + month + '-' + day;
	}

	sendUE(): Promise<any> {
		this.checkUE = true;
		return new Promise<any>((resolve) => {
			let body = {
				"ligNovaDadosCliente": {
					"codigoTipoDocumento": "CPF",	//FIXO
					"codigoTipoSegundoDocumento": "RG",	//FIXO
					"dataEmissaoRG": this.formatDate(this._documentosService.dadosTitular.dataEmissao),
					"dataNascimento": this.formatDate(this._documentosService.dadosTitular.dataNascimento),
					"email": this._documentosService.dadosTitular.email,
					"nome": this._documentosService.dadosTitular.nome.toUpperCase(),
					"celular": this._documentosService.dadosTitular.celular,
					"documentoPrincipal": this._userServiceLN.sessionUser.documento,
					"segundoDocumento": this._documentosService.dadosTitular.rg,
					"telefone": this._documentosService.dadosTitular.telefone,
					"orgaoExpedidorSegundoDocumento": this._documentosService.dadosTitular.orgaoEmissor,
					"statusEmail": "S",				//FIXO
					"statusSMS": "S",				//FIXO
					"uFSegundoDocumento": this._documentosService.dadosTitular.estado
				},
				"ligNovaListDadosAparelho": this._dadosDaLigacaoService.equipamentos,
				"ligNovaDadosFaturamento": {
					"codigoClasseConsumo": "9101",
					"codigoGrupoTensaoFaturamento": "B",
					"codigoSubGrupoTensaoFaturamento": "1",
					"construtorPadraoEntrada": this._documentosService.dadosTitular.nome.split(" ")[0].toUpperCase(),
				},
				"ligNovaDadosUC": {
					"codigoBairro": this._dadosDoImovelService.getEndereco.codigoBairro,
					"codigoFase": this._dadosDaLigacaoService.codigoFase,
					"codigoGrupoTensao": "B",				//FIXO
					"codigoLocalidadeEmpresa": this._dadosDoImovelService.getEndereco.codigoLocalidade,
					"codigoLogradouro": this._dadosDoImovelService.getEndereco.codigoLogradouro,
					"codigoSubGrupoTensao": "1",			//FIXO
					"codigoTipoDisjuntor": this._dadosDaLigacaoService.codigoTipoDisjuntor,
					"codigoTipoLocalidadeImovel": this._dadosDoImovelService.getEndereco.tipoLocalizacao,
					"codigoTipoLogradouro": this._dadosDoImovelService.getEndereco.tipoLogradouro,
					"codigoTrecho": this._dadosDoImovelService.getEndereco.trecho,
					"complemento": this._dadosDoImovelService.getEndereco.complemento,
					"descricaoPontoReferencia": this._dadosDoImovelService.getEndereco.pontoReferencia === '' ? '' + this.observacoesGerais() : 'Referencia=' + this._dadosDoImovelService.getEndereco.pontoReferencia + this.observacoesGerais(),
					"CEP": this._dadosDoImovelService.getEndereco.cep,
					"numeroImovel": this._dadosDoImovelService.getEndereco.numero,
					"tensaoFornecimentoMaxima": this._dadosDaLigacaoService.tensaoFornecimentoMaxima,
					"tensaoFornecimentoMinima": this._dadosDaLigacaoService.tensaoFornecimentoMinima,
					"codigoUC": this._dadosDoImovelService.getEndereco.uc
				},
				"ligNovaDadosDataCerta": {
					"codigoTipoAlteracaoDataCerta": "M",   //FIXO
					"codigoTipoDiaDataCerta": "VC",        //FIXO
					"codigoTipoDataCerta": "002",          //FIXO
					"dataCerta": this.dataCerta('Data Certa'), //DataCerta 'AAAA-MM-DD'
					"dataInicioDataCerta": this.dataCerta('Data Atual'), // DataInicioDataCerta = próxima data possível de acordo com o dia de hoje 'AAAA-MM-DD'
					"numeroMesDataCerta": "0"             //FIXO
				},
				"ligNovaDadosCadastroCNPJCliente": {
					"cnpj": this._userServiceLN.tipoDocumento === 'CNPJ' ? this._userServiceLN.sessionUser.documento : '', //SE PJ = true -> preencher; senão -> vazio
					"inscricaoEstadual": this._userServiceLN.tipoDocumento === 'CNPJ' ? this._documentosService.dadosCNPJ.inscricaoEstadual : '',
					"tipoInscricaoEstadual": this._userServiceLN.tipoDocumento === 'CNPJ' ? 'ES' : '',
					"dataValidadeIncricaoEstadual": '',
				},
				"ligNovaDadosLigacao": {
					"codigoClassePrincipal": "01", //informações vindas do endpoint classe principal
					"descricaoNaturezaNegocio": "CASA" //informações vindas do endpoint classe principal
				},
				"ligNovaDadosTrocaPadrao": {
					"codigoFase": this._dadosDoImovelService.getEndereco.uc ? this._dadosDaLigacaoService.codigoFase : "",
					"codigoGrupoTensaoFaturamento": this._dadosDoImovelService.getEndereco.uc ? "B" : "",
					"codigoGrupoTensaoOrigem": this._dadosDoImovelService.getEndereco.uc ? "B" : "",
					"codigoSubGrupoTensaoFaturamento": this._dadosDoImovelService.getEndereco.uc ? "1" : "",
					"codigoSubGrupoTensaoOrigem": this._dadosDoImovelService.getEndereco.uc ? "1" : "",
					"codigoTipoDisjuntor": this._dadosDoImovelService.getEndereco.uc ? this._dadosDaLigacaoService.codigoTipoDisjuntor : "",
					"tensaoFornecimentoMaximo": this._dadosDoImovelService.getEndereco.uc ? this._dadosDaLigacaoService.tensaoFornecimentoMaxima : "",
					"tensaoFornecimentoMinimo": this._dadosDoImovelService.getEndereco.uc ? this._dadosDaLigacaoService.tensaoFornecimentoMinima : ""
				}
			}

			this._userServiceLN.getProtocolo().then((protocolo) => {
				this._userServiceLN.protocolo = protocolo;

				let urlApiNeo = environmentLN.apiUrl + '/v2/ligacao-nova?protocolo=' + encodeURIComponent(protocolo) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);


				resolve(this._http.post<string>(urlApiNeo, body).pipe(catchError(this._erroService.handleError<string>())));
			});
		});
	}

	sendBackOffice(motivoRecusa: string): Promise<any> {
		this.checkUE = false;
		return new Promise<any>((resolve) => {
			let body = {
				"ligNovaDadosCliente": {
					"codigoTipoDocumento": "CPF",	//FIXO
					"codigoTipoSegundoDocumento": "RG",	//FIXO
					"dataEmissaoRG": this.formatDate(this._documentosService.dadosTitular.dataEmissao),
					"dataNascimento": this.formatDate(this._documentosService.dadosTitular.dataNascimento),
					"email": this._documentosService.dadosTitular.email,
					"nome": this._documentosService.dadosTitular.nome.toUpperCase(),
					"celular": this._documentosService.dadosTitular.celular,
					"documentoPrincipal": this._userServiceLN.sessionUser.documento,
					"segundoDocumento": this._documentosService.dadosTitular.rg,
					"telefone": this._documentosService.dadosTitular.telefone,
					"orgaoExpedidorSegundoDocumento": this._documentosService.dadosTitular.orgaoEmissor,
					"statusEmail": "S",				//FIXO
					"statusSMS": "S",				//FIXO
					"uFSegundoDocumento": this._documentosService.dadosTitular.estado
				},
				"ligNovaListDadosAparelho": this._dadosDaLigacaoService.equipamentos,
				"ligNovaDadosFaturamento": {
					"codigoClasseConsumo": "9101",
					"codigoGrupoTensaoFaturamento": "B",
					"codigoSubGrupoTensaoFaturamento": "1",
					"construtorPadraoEntrada": this._documentosService.dadosTitular.nome.split(" ")[0].toUpperCase(),
				},
				"ligNovaDadosUC": {
					"codigoBairro": this._dadosDoImovelService.getEndereco.codigoBairro,
					"codigoFase": this._dadosDaLigacaoService.codigoFase,
					"codigoGrupoTensao": "B",				//FIXO
					"codigoLocalidadeEmpresa": this._dadosDoImovelService.getEndereco.codigoLocalidade,
					"codigoLogradouro": this._dadosDoImovelService.getEndereco.codigoLogradouro,
					"codigoSubGrupoTensao": "1",			//FIXO
					"codigoTipoDisjuntor": this._dadosDaLigacaoService.codigoTipoDisjuntor,
					"codigoTipoLocalidadeImovel": this._dadosDoImovelService.getEndereco.tipoLocalizacao,
					"codigoTipoLogradouro": this._dadosDoImovelService.getEndereco.tipoLogradouro,
					"codigoTrecho": this._dadosDoImovelService.getEndereco.trecho,
					"complemento": this._dadosDoImovelService.getEndereco.complemento,
					"descricaoPontoReferencia": this._dadosDoImovelService.getEndereco.pontoReferencia === '' ? 'Referencia_Não informado' : 'Referencia= ' + this._dadosDoImovelService.getEndereco.pontoReferencia,
					"CEP": this._dadosDoImovelService.getEndereco.cep,
					"numeroImovel": this._dadosDoImovelService.getEndereco.numero,
					"tensaoFornecimentoMaxima": this._dadosDaLigacaoService.tensaoFornecimentoMaxima,
					"tensaoFornecimentoMinima": this._dadosDaLigacaoService.tensaoFornecimentoMinima,
					"codigoUC": this._dadosDoImovelService.getEndereco.uc
				},
				"ligNovaDadosDataCerta": {
					"codigoTipoAlteracaoDataCerta": "M",   //FIXO
					"codigoTipoDiaDataCerta": "VC",        //FIXO
					"codigoTipoDataCerta": "002",          //FIXO
					"dataCerta": this.dataCerta('Data Certa'), //DataCerta 'AAAA-MM-DD'
					"dataInicioDataCerta": this.dataCerta('Data Atual'), // DataInicioDataCerta = próxima data possível de acordo com o dia de hoje 'AAAA-MM-DD'
					"numeroMesDataCerta": "0"             //FIXO
				},
				"ligNovaDadosCadastroCNPJCliente": {
					"cnpj": this._userServiceLN.tipoDocumento === 'CNPJ' ? this._userServiceLN.sessionUser.documento : '', //SE PJ = true -> preencher; senão -> vazio
					"inscricaoEstadual": this._userServiceLN.tipoDocumento === 'CNPJ' ? this._documentosService.dadosCNPJ.inscricaoEstadual : '',
					"tipoInscricaoEstadual": this._userServiceLN.tipoDocumento === 'CNPJ' ? 'ES' : '',
					"dataValidadeIncricaoEstadual": '',
				},
				"ligNovaDadosLigacao": {
					"codigoClassePrincipal": "01", //informações vindas do endpoint classe principal
					"descricaoNaturezaNegocio": "CASA" //informações vindas do endpoint classe principal
				},
				"ligNovaDadosTrocaPadrao": {
					"codigoFase": this._dadosDoImovelService.getEndereco.uc ? this._dadosDaLigacaoService.codigoFase : "",
					"codigoGrupoTensaoFaturamento": this._dadosDoImovelService.getEndereco.uc ? "B" : "",
					"codigoGrupoTensaoOrigem": this._dadosDoImovelService.getEndereco.uc ? "B" : "",
					"codigoSubGrupoTensaoFaturamento": this._dadosDoImovelService.getEndereco.uc ? "1" : "",
					"codigoSubGrupoTensaoOrigem": this._dadosDoImovelService.getEndereco.uc ? "1" : "",
					"codigoTipoDisjuntor": this._dadosDoImovelService.getEndereco.uc ? this._dadosDaLigacaoService.codigoTipoDisjuntor : "",
					"tensaoFornecimentoMaximo": this._dadosDoImovelService.getEndereco.uc ? this._dadosDaLigacaoService.tensaoFornecimentoMaxima : "",
					"tensaoFornecimentoMinimo": this._dadosDoImovelService.getEndereco.uc ? this._dadosDaLigacaoService.tensaoFornecimentoMinima : ""
				},
				"entregaAlternativa": this.formatarEntregaAlternativa(),
				"debitoAutomatico": {
					"banco": this._dadosPagamentoService.debitoAutomatico?.banco?.numeroBanco,
					"agencia": this._dadosPagamentoService.debitoAutomatico.agencia,
					"contaCorrente": this._dadosPagamentoService.debitoAutomatico.conta
				},
				"dadosAdicionais": {
					"distanciaPadraoRede": this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'naoSei' ? 'Nao soube informar' : this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste,
					"motivoIndeferimento": motivoRecusa,
					"reconhecimentoFacial": !this._documentosService.documentos.selfieError,
					"score": this._documentosService.documentos.selfieScore,
					"observacao": this.observacoesGerais(),
					"nomeEndereco": this._dadosDoImovelService.getEndereco.endereco,
					"nomeBairro": this._dadosDoImovelService.getEndereco.bairro,
					"nomeLocalidade": this._dadosDoImovelService.getEndereco.cidade,
				}
			}

			let vistoriaPadraoObjeto = {
				cepEndereco: body.ligNovaDadosUC,
				cliente: body.ligNovaDadosCliente
			};

			this.storage.vistoriaPadraoObjeto = vistoriaPadraoObjeto; //usuario titular da ligacao novaova

			this._userServiceLN.getProtocolo().then((protocolo) => {
				this._userServiceLN.protocolo = protocolo;

				let urlApiNeo = environmentLN.apiUrl + '/v2/ligacao-nova/off-line?protocolo=' + encodeURIComponent(protocolo) + '&usuarioUE=' + encodeURIComponent(environmentLN.USUARIO_UE);


				resolve(this._http.post<string>(urlApiNeo, body).pipe(catchError(this._erroService.handleError<string>())));
			});
		});
	}

	formatarEntregaAlternativa(): EntregaAlternativa {
		switch (this._dadosPagamentoService.dadosPagamento.ondeReceber) {
			case 'NO IMÓVEL':
				return new EntregaAlternativa(
					this._dadosPagamentoService.dadosPagamento.receberNoImovel.endereco.cep,
					this._dadosPagamentoService.dadosPagamento.receberNoImovel.endereco.endereco,
					this._dadosPagamentoService.dadosPagamento.receberNoImovel.endereco.complemento,
					this._dadosPagamentoService.dadosPagamento.receberNoImovel.endereco.bairro,
					this._dadosPagamentoService.dadosPagamento.receberNoImovel.endereco.cidade,
					this._dadosPagamentoService.dadosPagamento.receberNoImovel.endereco.estado,
					this._dadosPagamentoService.dadosPagamento.receberNoImovel.endereco.numero
				);

			case 'EM UM IMÓVEL ALTERNATIVO':
				return new EntregaAlternativa(
					this._dadosPagamentoService.dadosPagamento.receberEnderecoAlternativo.endereco.cep,
					this._dadosPagamentoService.dadosPagamento.receberEnderecoAlternativo.endereco.endereco,
					this._dadosPagamentoService.dadosPagamento.receberEnderecoAlternativo.endereco.complemento,
					this._dadosPagamentoService.dadosPagamento.receberEnderecoAlternativo.endereco.bairro,
					this._dadosPagamentoService.dadosPagamento.receberEnderecoAlternativo.endereco.cidade,
					this._dadosPagamentoService.dadosPagamento.receberEnderecoAlternativo.endereco.estado,
					this._dadosPagamentoService.dadosPagamento.receberEnderecoAlternativo.endereco.numero
				);

			case 'CAIXA POSTAL':
				return new EntregaAlternativa(
					this._dadosPagamentoService.dadosPagamento.receberCaixaPostal.cep,
					"",
					"",
					"",
					this._dadosPagamentoService.dadosPagamento.receberCaixaPostal.cidade,
					this._dadosPagamentoService.dadosPagamento.receberCaixaPostal.estado,
					"",
					this._dadosPagamentoService.dadosPagamento.receberCaixaPostal.caixaPostal
				);

			default:
				return new EntregaAlternativa();
		}
	}

	dataCerta(tipo: string): string {
		const hoje = new Date();

		if (tipo === "Data Certa") {
			if (this._dadosPagamentoService.dadosPagamento.dataVencimento === 'undefined' && tipo === "Data Certa") {
				return '';
			}

			const day = parseInt(this._dadosPagamentoService.dadosPagamento.dataVencimento);
			var month = hoje.getMonth();
			var year = hoje.getFullYear();

			const dtCompare = new Date(year, month, day);

			if (dtCompare > hoje) {
				month = (hoje.getMonth() + 1);
				return (year + '-' + month + '-' + day);
			} else {
				if (month == 11) {
					month = 1;
					year += 1;
				} else {
					month = (hoje.getMonth() + 2);
				}
				return (year + '-' + month + '-' + day);
			}
		// } else if ("Data Atual") { // <- Implementação anterior. Errado, pois sempre vai retornar 'true', não?
		} else if (tipo === "Data Atual") {
			return (hoje.getFullYear() + '-' + (hoje.getMonth() + 1) + '-' + hoje.getDate());
		}

        return '';
	}


	verificaPerfil(): string {
		return (this.getPerfilEscolhido.perfil === 'RESIDENCIAL') ? "Casa" : this._documentosService.dadosCNPJ.atividadeFiscal
	}

	verificarDadosTarifaSocial(beneficio: string, campo: string): string {
		if (beneficio !== '') {
			if (campo === 'programaSocial') {
				return (beneficio === 'BENEFÍCIO DE PRESTAÇÃO CONTINUADA') ? 'BPC.NB' : 'CAD.UNICO';
			} else if (campo === 'numeroProgramaSocial') {
				return (this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosBeneficio.nis === '') ? this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosBeneficio.nb : this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosBeneficio.nis;
			} else if (campo === 'nome') {
				return (this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.titular) ? this._documentosService.dadosTitular.nome.toUpperCase() : this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.nomeCompleto.toUpperCase();
			} else if (campo === 'rg') {
				return (this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.titular) ? this._documentosService.dadosTitular.rg : this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.rg;
			} else if (campo === 'documento') {
				return (this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.titular) ? this._documentosService.dadosTitular.cpf : this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.cpf;
			} else if (campo === 'dataNascimento') {
				return (beneficio !== '' && this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.titular) ? this.formatDate(this._documentosService.dadosTitular.dataNascimento) : this.formatDate(this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.dadosTitularTarifaSocial.dtNascimento);
			}
		}
        return '';
	}

	observacoesGerais(): string {
		let content;

		//Opção tarifária
		let capitalizeTarifa = this._dadosDaLigacaoService.dadosDaLigacao.tarifa[0].toUpperCase() + this._dadosDaLigacaoService.dadosDaLigacao.tarifa.slice(1);
		content = 'Tarifa ' + capitalizeTarifa;

		//Doc de posse
		if (this._dadosDoImovelService.getEndereco.zonaRural) {
			if (this._dadosDoImovelService.getDocPosse.termoAceitoDocPosse !== '') {
				content = content + '/' + this._dadosDoImovelService.getDocPosse.termoAceitoDocPosse;
			} else {
				content = this._dadosDoImovelService.getDocPosse.checarDocumentoPosse ? content + '/Avaliar Doc Atend.S.Ônus' : content + '/Atend.S.Ônus Valido';
			}
		}

		//Entrega da fatura
		if (this._dadosPagamentoService.dadosPagamento.faturaDigital === 'Sim') {
			content = content + '/Fatura Email';
		} else {
			if (this._dadosPagamentoService.dadosPagamento.ondeReceber === 'NO IMÓVEL') {
				content = content + '/Fatura Imóvel';
			} else if (this._dadosPagamentoService.dadosPagamento.ondeReceber === 'EM UM IMÓVEL ALTERNATIVO') {
				content = content + '/Fatura End.Alternativo';
			} else if (this._dadosPagamentoService.dadosPagamento.ondeReceber === 'CAIXA POSTAL') {
				content = content + '/Fatura CaixaPostal';
			} else {
				content = content + '/Fatura' + this._dadosPagamentoService.dadosPagamento.ondeReceber;
			}
		}

		//Extensão da rede - distância poste
		if (this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'naoSei' || this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'nao') {
			content = content + '/Avaliar ExtensãoRede';
		} else if (this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'sim') {
			content = content + '/Dist.PosteRede OK';
		}

		//Latitude e longitute do imóvel
		if (this._dadosDoImovelService.getEndereco.latitude) {
			content = content + '/Lat.' + this._dadosDoImovelService.getEndereco.latitude + 'Long.' + this._dadosDoImovelService.getEndereco.longitude;
		}

		//Solicitar kit
		if (this.getPerfilEscolhido.perfil === 'RESIDENCIAL' && this._dadosDoImovelService.getEndereco.zonaRural) {
			content = (this._tarifaSocialService.getSolicitarKit) ? content + '/KitEnergia Sim' : content + '/KitEnergia Não'
		}

		//CEP cadastrado
		if (!this._dadosDoImovelService.getEndereco.cepEncontrado) {
			content = content + '/CadastrarCEP';
		}

		//Rua sem cep
		if (this._dadosDoImovelService.getEndereco.ruaSemCep) {
			content = content + '/RuaProjetada-SemCEP';
		}

		//ART
		if (this._dadosDoImovelService.getRuaSemCep && this._dadosDaLigacaoService.anexos.art.length > 0) {
			content = content + '/Valida ART';
		}

		if (this._dadosDaLigacaoService.dadosDaLigacao.checarDocumentoART && this._dadosDaLigacaoService.anexos.art.length > 0) {
			content = content + '/Valida ART';
		}

		//Tarifa social
		if (this.getPerfilEscolhido.perfil === 'RESIDENCIAL' && this._dadosDaLigacaoService.dadosDaLigacao.tarifa === 'SOCIAL') {
			if (!this._tarifaSocialService.getTarifaSocialValidada || (!this._tarifaSocialService.getTitular && !this._dadosDaLigacaoService.getDocumentoComFotoTarifaSocialValidado)) {
				content = content + '/Validar Doc. Tarifa Social';
			}
		}

		//Débito em aberto
		if (this._dadosDoImovelService.getDebitos) {
			content = (this._debitoFaturaService.getComprovanteDebitoValidado) ? content + '/Comprovante.Validado(Avaliar Débitos em Aberto)' : content + '/Avaliar Doc Débitos em aberto';
		}

		//CADESP
		if (this.getPerfilEscolhido.perfil === 'BENEFÍCIO RURAL' && this._documentosService.documentos['rural'].anexos['Cadesp'].arquivos.length > 0) {
			content = (this._documentosService.getCadespValidado) ? content + '/CADESP validado-Isenção ICMS' : content + '/Avaliar CADESP-Isenção ICMS';
		}

		//Licença ambiental
		if (this._dadosDoImovelService.getEndereco.areaAmbiental == 'SIM' && !this._dadosDoImovelService.getDadosDoImovel.endereco.licencaAmbientalValidado) {
			content = content + '/Avaliar Lic. Ambiental';
		}

		//Comprovante de atividade rural
		let subPerfis = ["AGROPECUÁRIA RURAL", "AGROPECUÁRIA URBANA", "RESIDENCIAL RURAL"];
		if (this.getPerfilEscolhido.perfil == 'BENEFÍCIO RURAL') {
			if (subPerfis.includes(this.getSubPerfilEscolhido!.label)) {
				content = (this._documentosService.getCompAtividadeRuralValidado) ? content + ' /Comprovante Rural Validado' : content + ' /Avaliar Doc benefício rural';
			} else {
				content = content + ' /Avaliar Doc benefício rural'
			}
		}

		//Subperfil rural
		if (this.getPerfilEscolhido.perfil == 'BENEFÍCIO RURAL') {
			content = content + ' /AtividadeRural ' + this.getSubPerfilEscolhido!.label;
		}

		if (this._userServiceLN.tipoDocumento === 'CNPJ') {
			//Obrigatórios
			content = content + '/I.M ' + this._documentosService.dadosCNPJ.inscricaoMunicipal;
			content = content + '/codigoConsumoNeo:' + this._documentosService.dadosCNPJ.codigoConsumo;

			//Opcionais
			content = this._documentosService.getCNPJValidado ? (content + '/CNPJ Validado') : (content + '/Validar CNPJ');
			content = this._documentosService.dadosCNPJ.inscricaoEstadual ? (content + '/I.E ' + this._documentosService.dadosCNPJ.inscricaoEstadual) : content;
		}

		//Checklist rural
		if (this._dadosDoImovelService.getEndereco.zonaRural) {
			if (!this.checkUE) {
				if (!this._dadosDaLigacaoService.dadosDaLigacao.questionarioRural.propriedade.nenhum) {
					content = content + '/Prop.c/ ';
					if (this._dadosDaLigacaoService.dadosDaLigacao.questionarioRural.propriedade.casa) {
						content = content + 'casa ';
					}
					if (this._dadosDaLigacaoService.dadosDaLigacao.questionarioRural.propriedade.cerca) {
						content = content + 'cerca ';
					}
					if (this._dadosDaLigacaoService.dadosDaLigacao.questionarioRural.propriedade.muro) {
						content = content + 'muro ';
					}
					if (this._dadosDaLigacaoService.dadosDaLigacao.questionarioRural.propriedade.barracao) {
						content = content + 'barração ';
					}
					if (this._dadosDaLigacaoService.dadosDaLigacao.questionarioRural.propriedade.poco) {
						content = content + 'poço ';
					}
				}

				if (!this._dadosDaLigacaoService.dadosDaLigacao.questionarioRural.proxPropriedade.nenhum) {
					content = content + '/Prop.Perto ';
					if (this._dadosDaLigacaoService.dadosDaLigacao.questionarioRural.proxPropriedade.corrego) {
						content = content + 'córrego ';
					}
					if (this._dadosDaLigacaoService.dadosDaLigacao.questionarioRural.proxPropriedade.acude) {
						content = content + 'açude ';
					}
					if (this._dadosDaLigacaoService.dadosDaLigacao.questionarioRural.proxPropriedade.rodovia) {
						content = content + 'rodovia ';
					}
					if (this._dadosDaLigacaoService.dadosDaLigacao.questionarioRural.proxPropriedade.ferrovia) {
						content = content + 'ferrovia ';
					}
				}
				if (this._dadosDaLigacaoService.dadosDaLigacao.questionarioRural.desmembrado == 'sim') {
					content = content + '/Loteamento';
				}
			}
		}

		return content;
	}

	criarListaAnexosGeral(): Promise<Array<Anexo>> {
		return new Promise((resolve) => {
			let listaAnexos: Array<Anexo> = [];
			// //Pedido Débitos em Aberto - Comprovante de pagamento ou Comprovante de Endereço
			if (this._debitoFaturaService.getJustificativa == 'debitoPago' && this._documentosService.anexos.comprovanteDePagamento?.length > 0) {
				listaAnexos.push(this._documentosService.anexos.comprovanteDePagamento[0]);
			}

			// Autorizacao Prefeitura
			if (this._dadosDoImovelService.validarDocPrefeitura && this._dadosDoImovelService.getEndereco?.anexos['Autorizacao da Prefeitura']?.arquivos?.length > 0) {
				listaAnexos.push(this._dadosDoImovelService.getEndereco?.anexos['Autorizacao da Prefeitura']?.arquivos[0]);
			}

			if (this._debitoFaturaService.getJustificativa == 'naoReconhecoDebito' && this._documentosService.anexos.comprovanteEnderecoDebitos?.length > 0) {
				listaAnexos.push(this._documentosService.anexos.comprovanteEnderecoDebitos[0]);
			}
			//Licença Ambiental
			if (this._dadosDoImovelService.getEndereco.areaAmbiental === 'SIM' && this._documentosService.anexos.licencaAmbiental?.length > 0) {
				listaAnexos.push(this._documentosService.anexos.licencaAmbiental[0]);
			}
			// //Pedido - Comprovante de Endereço
			if ((this._dadosDoImovelService.getRuaSemCep || !this._dadosDoImovelService.getCepEncontrado) && this._documentosService.anexos.comprovanteEndereco?.length > 0) {
				listaAnexos.push(this._documentosService.anexos.comprovanteEndereco[0]);
			}
			// //Posse Imovel
			if (this._dadosDoImovelService.getDocPosse.posseImovel === 'tenhoDocumento' && this._dadosDoImovelService.getDocPosse.documentoPosseImovel['Doc Posse'].arquivos?.length > 0) {
				listaAnexos.push(this._dadosDoImovelService.getDocPosse.documentoPosseImovel['Doc Posse'].arquivos[0]);
			}
			// //Selfie
			if (this._documentosService.documentos.selfie !== undefined || this._documentosService.documentos.selfie !== null) {
				listaAnexos.push(this._documentosService.documentos.selfie[0]);
			}
			// //ART
			if (this._dadosDaLigacaoService.dadosDaLigacao.dimensionamentoDeRede.possuiART === 'SIM' || this._documentosService.anexos.art.length > 0) {
				listaAnexos.push(this._documentosService.anexos.art[0]);
			}

			resolve(listaAnexos);
		})
	}

	criarListaAnexosPerfil(): Promise<Array<Anexo>> {
		return new Promise((resolve) => {
			this.criarListaAnexosGeral().then((listaAnexos: Array<Anexo>) => {
				let perfil = this.getPerfilEscolhido.perfil == "BENEFÍCIO RURAL" ? 'rural' : this.getPerfilEscolhido.perfil.toLowerCase();
				const anexos = this._documentosService.documentos[perfil].anexos;
				for (let key in anexos) {
					if (anexos[key].arquivos.length > 0) {
						listaAnexos.push(anexos[key].arquivos[0]);
						if (key === 'Doc Oficial' && anexos[key].arquivos.length > 1) {
							listaAnexos.push(anexos[key].arquivos[1]);
						}
					}
				}
				if (this._dadosDaLigacaoService.dadosDaLigacao.tarifa === 'SOCIAL') {
					for (let key in this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos) {
						if (this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos[key].arquivos.length > 0) {
							listaAnexos.push(this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos[key].arquivos[0]);
							if (key === 'Doc Oficial' && this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos[key].arquivos.length > 1) {
								listaAnexos.push(this._dadosDaLigacaoService.dadosDaLigacao.tarifaSocial.anexos[key].arquivos[1]);
							}
						}
					}
				}
				resolve(listaAnexos);
			});
		});
	}
}
