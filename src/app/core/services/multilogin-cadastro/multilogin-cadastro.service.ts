import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Grupo } from 'app/core/enums/grupos';
import { Regiao } from 'app/core/enums/regiao';
import { Anexo } from 'app/core/models/anexo/anexo';
import { PerfisDeAcesso, TipoAcesso, TipoPerfil } from 'app/core/models/multilogin/multilogin-acesso';
import { AcessoComumCompartilhaCom, CredenciadoCompartilhaCom, ImobiliariaCompartilhaCom, MultiloginCompartilharAcesso, RepresetanteLegalCompartilhaCom, emailsBO, servicosMKTAutomation } from 'app/core/models/multilogin/multilogin-cadastro';
import { AnexosDTORequest, BuscaTipoClienteDTORequest, CabecalhoMKT, EnvioMensagensDTORequest, MensagemMKTCredenciado, MensagemMKTImobiliaria, VinculosDTORequest } from 'app/core/models/multilogin/request/multilogin-dto';
import { BuscaTipoClienteDTOResponse, PerfilAtivo, VinculoPerfisDTOResponse } from 'app/core/models/multilogin/response/multilogin-dto';
import { ProtocoloDTOResponse } from 'app/core/models/protocolo/response/protocolo-dto';
import { Observable, catchError, mergeMap, of, throwError } from 'rxjs';
import { SelecaoImovelService } from '../selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from '../user/user.service';
import { AgenciaVirtualService } from '../utils/admin/agencia-virtual.service';

@Injectable({
	providedIn: 'root'
})
export class MultiloginCadastroService {
	fluxoIniciado: boolean;
	multiloginCompartilharAcesso: MultiloginCompartilharAcesso;
	relacoesLegado: Array<PerfisDeAcesso>;
	protocoloAreaNaoLogada: ProtocoloDTOResponse;
	constructor(
		private _http: HttpClient,
		private _selecaoImovelService: SelecaoImovelService,
		private _agenciaVirtualService: AgenciaVirtualService,
		private _userService: UserService
	) {
		this.fluxoIniciado = false;
		this.multiloginCompartilharAcesso = new MultiloginCompartilharAcesso('', '', '', '');
		this.relacoesLegado = this.definirRelacoesLegado(false);
		this.protocoloAreaNaoLogada = new ProtocoloDTOResponse();
	}

	/**
	 * Parte requisições ↓↓
	 */

	criarVinculo(requestDTO: VinculosDTORequest): Observable<VinculoPerfisDTOResponse> {
		const endpoint = `${environment.endpoints.multilogin}adiciona-vinculo-perfis`;
		const body = Object.assign({}, requestDTO);
		return this._http.post<VinculoPerfisDTOResponse>(endpoint, body).pipe(
			catchError((error) => {
				return throwError(() => error);
			})
		);
	}

	removerVinculo(requestDTO: VinculosDTORequest): Observable<VinculoPerfisDTOResponse> {
		const endpoint = `${environment.endpoints.multilogin}remove-vinculo-perfis`;
		const body = Object.assign({}, requestDTO);
		return this._http.post<VinculoPerfisDTOResponse>(endpoint, body).pipe(
			catchError((error) => {
				return throwError(() => error);
			})
		);
	}

	criarVinculoUC(requestDTO: VinculosDTORequest): Observable<VinculoPerfisDTOResponse> {
		const endpoint = `${environment.endpoints.multilogin}adiciona-vinculo-uc`;
		const body = Object.assign({}, requestDTO);
		return this._http.post<VinculoPerfisDTOResponse>(endpoint, body).pipe(
			catchError((error) => {
				return throwError(() => error)
			})
		);
	}

	removerVinculoUC(requestDTO: VinculosDTORequest): Observable<VinculoPerfisDTOResponse> {
		const endpoint = `${environment.endpoints.multilogin}remove-vinculo-uc`;
		const body = Object.assign({}, requestDTO);
		return this._http.post<VinculoPerfisDTOResponse>(endpoint, body).pipe(
			catchError((error) => {
				return throwError(() => error)
			})
		);
	}

	buscaTipoCliente(buscaTipoCliente: BuscaTipoClienteDTORequest): Observable<BuscaTipoClienteDTOResponse> {
		const endpoint = `${environment.endpoints.multilogin}usuarios/busca-tipo-cliente`;
		const body = Object.assign({}, buscaTipoCliente);
		return this._http.post<any>(endpoint, body).pipe(catchError((error) => {
			return throwError(() => error);
		}));
	}


	/**
	 * Métodos ↓↓
	 */

	validarRelacaoLegado(perfil: PerfisDeAcesso, considerarConjuge: boolean = false): boolean {
		this.relacoesLegado = this.definirRelacoesLegado(considerarConjuge)
		return this.relacoesLegado.includes(perfil);
	}

	private definirRelacoesLegado(considerarConjuge: boolean): Array<PerfisDeAcesso> {
		return considerarConjuge ? [PerfisDeAcesso.representanteLegal, PerfisDeAcesso.conjuge] : [PerfisDeAcesso.representanteLegal];
	}

	definirRelacoesBO(perfil: PerfisDeAcesso): boolean {
		let relacoesBO = [
			PerfisDeAcesso.representanteLegal,
			PerfisDeAcesso.conjuge,
			PerfisDeAcesso.atendenteCredenciado
		]
		return relacoesBO.includes(perfil);
	}

	/**
	 * Critério para NE e-mail será definido de acordo com o retorno GET /busca-tipo-cliente
	 * Critério para SE e-mail será definido de acordo com o grupo tensão do usuário
	 * @return e-mail destinatário B.O
	 */
	definirEmailBO(): string {
		let tipoEmail = (environment.regiao == Regiao.NE) ? this.multiloginCompartilharAcesso.tipoEmailBO ?? '' : this._selecaoImovelService.getGrupoDoUsuario;

		switch (tipoEmail) {
			case Grupo.B:
			case 'NORM':
				return `${emailsBO.represetanteLegal}${environment.name.toLocaleLowerCase()}.com.br`;

			case Grupo.A:
			case 'FEDR' || 'CORP':
				return `${emailsBO.representanteLegalCNPJ}${environment.name.toLocaleLowerCase()}.com.br`;

			default:
				return `${emailsBO.imobiliaria}${environment.name.toLocaleLowerCase()}.com.br`;
		}
	}

	definirTipoAtribuicao(perfilDeAcesso: PerfisDeAcesso, tipoAcesso: TipoPerfil, perfilEscolhido: string): string {
		let tipoDeCompartilha = this.definirCompartilhamentos(perfilDeAcesso, tipoAcesso);
		let tipoAtribuicao = '';
		tipoDeCompartilha.forEach(function (elem) {
			if (elem.value.toUpperCase() === perfilEscolhido.toUpperCase()) {
				tipoAtribuicao = elem.key;
			}
		});
		return tipoAtribuicao;
	}

	definirCompartilhamentos(perfilDeAcesso: PerfisDeAcesso, tipoAcesso: TipoPerfil): Array<any> {
		if (tipoAcesso === TipoAcesso.acessoComum) {
			if (perfilDeAcesso === PerfisDeAcesso.conjuge) {
				return AcessoComumCompartilhaCom;

			} else if (perfilDeAcesso === PerfisDeAcesso.representanteLegal) {
				return RepresetanteLegalCompartilhaCom;
			}

			return AcessoComumCompartilhaCom;

		} else if (tipoAcesso === TipoAcesso.imobiliaria) {
			return ImobiliariaCompartilhaCom;

		} else {
			return CredenciadoCompartilhaCom;
		}
	}

	definirTimeStamp(areaNaoLogada: boolean = false): string {
		if (areaNaoLogada) {
			return `${Math.floor(new Date().getTime() / 1000).toString()}`;
		} else {
			return `${Math.floor(new Date().getTime() / 1000).toString()}${this._selecaoImovelService.getInformacoesUCSelecionada?.codigo ?? ''}${this._selecaoImovelService.getInformacoesUCSelecionada.cliente.documento.numero}`;

		}
	}

	requestAnexo(dadosAnexo: Anexo): any {
		let request = new AnexosDTORequest();
		request.base64 = dadosAnexo.fileData;
		request.extensaoArquivo = dadosAnexo.fileExtension.split(".")[1];
		request.nomeArquivo = `${this.definirTimeStamp()}${dadosAnexo.fileName}`;
		return request;
	}

	requestVinculoLegado(dadosRepresentante: PerfilAtivo, possuiUc: boolean = true): any {
		let request = new EnvioMensagensDTORequest();

		request.cabecalho.canalContato = environment.canal;
		request.cabecalho.tipoEntrega = "email"; //FIXO
		request.cabecalho.tipoServico = servicosMKTAutomation.informativoBO; //FIXO
		request.cabecalho.codigoJornada = environment.codigoJornada.informativoBO; //FIXO
		request.cabecalho.idCliente = this.definirEmailBO();
		request.cabecalho.subscricao = this.definirEmailBO();

		request.mensagem.EmailAddress = this.definirEmailBO();
		request.mensagem.codigoCliente = possuiUc ? this._selecaoImovelService.getInformacoesUCSelecionada?.cliente?.codigo ?? '' : '';
		request.mensagem.documento = (this._selecaoImovelService.getInformacoesUCSelecionada !== null) ? this._selecaoImovelService.getInformacoesUCSelecionada?.cliente?.documento?.numero : this._userService.dadosUser.documento;
		request.mensagem.dataValidadeRepresentacao = dadosRepresentante.dataVigencia;
		request.mensagem.documentoRepresentante = dadosRepresentante.docTitular;
		request.mensagem.pnClientePrincipal = possuiUc ?  this._selecaoImovelService.getInformacoesUCSelecionada?.cliente?.codigo ?? '': '';
		request.mensagem.pnClienteRepresentante = '';
		request.mensagem.dataSolicitacao = new Date().toLocaleDateString('pt-BR');
		request.mensagem.protocoloSalesforce = this._userService.getProtocolo?.protocoloSalesforceStr;
		request.mensagem.protocoloAssociado = this._userService.getProtocolo?.protocoloLegadoStr;
		request.mensagem.usuarioSite = environment.USUARIO_UE;
		request.mensagem.digitalChannel = environment.name;
		request.mensagem.tituloEmail = "VALIDACAO REPRESENTANTE"; //FIXO
		request.mensagem.urlCanal = this._agenciaVirtualService.gerarLinksPorDistribuidora().multiloginURL;
		request.mensagem.urlMultiLogin = this._agenciaVirtualService.gerarLinksPorDistribuidora().multiloginURL;
		request.mensagem.customerKey = this.multiloginCompartilharAcesso.customerKey ?? '';
		request.mensagem.guid = this.definirTimeStamp();

		return request;
	}

	requestCadastrarImobiliaria(dados: any, areaNaoLogada: boolean = false, protocolo: string): any {
		let requestCabecalho = new CabecalhoMKT();
		let requestMensagem = new MensagemMKTImobiliaria();

		requestCabecalho.canalContato = environment.canal; //FIXO
		requestCabecalho.tipoEntrega = "email"; //FIXO
		requestCabecalho.tipoServico = servicosMKTAutomation.informativoBO; //FIXO
		requestCabecalho.codigoJornada = environment.codigoJornada.informativoBO; //FIXO
		requestCabecalho.idCliente = this.definirEmailBO();
		requestCabecalho.subscricao = this.definirEmailBO();

		requestMensagem.Customer_Name = "AV";
		requestMensagem.EmailAddress = this.definirEmailBO();
		requestMensagem.urlCanal = "";//TODO: validar com time de REQ
		requestMensagem.dataSolicitacao = new Date().toLocaleDateString('pt-BR');
		requestMensagem.documento = `${dados.value.documentoRepresentanteLegal}`;
		requestMensagem.telefone = `55${dados.value.telefone.trim()}`;
		requestMensagem.usuarioSite = environment.USUARIO_UE;
		requestMensagem.tituloEmail = "VALIDACAO IMOBILIARIO"; //FIXO
		requestMensagem.creciImobiliaria = `${dados.value.numeroCreci}`;
		requestMensagem.documentoImobiliaria = `${dados.value.documentoEmpresa}`;
		requestMensagem.numeroOS = "";
		requestMensagem.nomePerfil = `${dados.value.nome}`;
		requestMensagem.enderecoImobiliaria = `${dados.value.logradouro},${dados.value.numeroEndereco},${dados.value.complemento} - ${dados.value.bairro},${dados.value.CEP} - ${dados.value.cidade}/${dados.value.estado}`;
		requestMensagem.nomeImobiliaria = `${dados.value.nomeFantasia}`;
		requestMensagem.protocolo = (areaNaoLogada) ? protocolo : this._userService.getProtocolo.protocoloSalesforceStr
		requestMensagem.guid = this.definirTimeStamp(areaNaoLogada);

		let request = new EnvioMensagensDTORequest();
		request.cabecalho = requestCabecalho;
		request.mensagem = requestMensagem;
		return request;
	}

	requestCadastrarCredenciado(dados: any, areaNaoLogada: boolean = false, protocolo: string = ''): any {
		let requestCabecalho = new CabecalhoMKT();
		let requestMensagem = new MensagemMKTCredenciado();

		requestCabecalho.canalContato = environment.canal; //FIXO
		requestCabecalho.tipoEntrega = "email"; //FIXO
		requestCabecalho.tipoServico = servicosMKTAutomation.informativoBO; //FIXO
		requestCabecalho.codigoJornada = environment.codigoJornada.informativoBO; //FIXO
		requestCabecalho.idCliente = this.definirEmailBO();
		requestCabecalho.subscricao = this.definirEmailBO();

		requestMensagem.Customer_Name = "AV";
		requestMensagem.EmailAddress = this.definirEmailBO();
		requestMensagem.urlCanal = "";
		requestMensagem.dataSolicitacao = new Date().toLocaleDateString('pt-BR');
		requestMensagem.documento = `${dados.value.documentoRepresentanteLegal}`;
		requestMensagem.telefone = `${dados.value.telefone} - ${dados.value.emailRepresentante}`;
		requestMensagem.usuarioSite = environment.USUARIO_UE;
		requestMensagem.tituloEmail = "VALIDACAO CREDENCIADO" //FIXO
		requestMensagem.documentoCredenciado = `${dados.value.documentoEmpresa}`;
		requestMensagem.localidade = `${dados.value.cidade}/${dados.value.estado}`;
		requestMensagem.nomePerfil = `${dados.value.nome}`;
		requestMensagem.enderecoCredenciado = `${dados.value.logradouro},${dados.value.numeroEndereco}, ${dados.value.complemento} - ${dados.value.bairro},${dados.value.CEP}`;
		requestMensagem.protocolo = (areaNaoLogada) ? protocolo : this._userService.getProtocolo.protocoloSalesforceStr,
		requestMensagem.nomeFantasia = `${dados.value.nomeFantasia}`
		requestMensagem.guid = this.definirTimeStamp(areaNaoLogada);

		let request = new EnvioMensagensDTORequest();
		request.cabecalho = requestCabecalho;
		request.mensagem = requestMensagem;
		return request;
	}
}
