import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";
import { PathCompleto } from "app/core/enums/servicos";
import { EnumAvisosPadroes, EnumTitulosPadroes } from "app/core/models/exibir-aviso/exibir-aviso";
import { PerfisDeAcesso } from "app/core/models/multilogin/multilogin-acesso";
import { ObterServicosDTOResponse, PerfilAtivo } from "app/core/models/multilogin/response/multilogin-dto";
import { UCResponseDTO, UserUcsResponseDTO } from "app/core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { MultiloginAcessoService } from "app/core/services/multilogin-acesso/multilogin-acesso.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";

@Injectable({
	providedIn: 'root'
})
export class UCsUsuariosResolver implements Resolve<UserUcsResponseDTO | ObterServicosDTOResponse> {
	constructor(
		private _selecaoImovelService: SelecaoImovelService,
		private _multiloginAcessoService: MultiloginAcessoService,
		private _user: UserService,
		private _loading: LoadingService,
		private _router: Router
	) { }

	resolve(): Promise<UserUcsResponseDTO | ObterServicosDTOResponse> {

		/**
		 * Fluxo permitido para perfis: Perfil de Acesso, Padronista
		 * Pesquisar pelo documento informado na listagem dos vínculos recebidos
		 */
		if (this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso === PerfisDeAcesso.perfilDeAcesso ||
			this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso === PerfisDeAcesso.padronista) {
			return this.pesquisarPorVinculosRecebidos();
		}
		/**
		 * Fluxo permitido para os perfis: 
		 * Pesquisar pelo documento do login: Acesso Comum
		 * Pesquisar pelo documento definido no resolver selecao de perfil: Conjuge
		 * Pesquisar pelo documento informado na tela pesquisar cliente: Corretor, Representante Legal e Atend. Credenciado
		 */
		else {
			return this.pesquisarPorDocInformado();
		}

	}

	pesquisarPorDocInformado(): Promise<UserUcsResponseDTO | ObterServicosDTOResponse> {
		return new Promise((resolve) => {
			let documento = this.definirDocumento();

			this._loading.start();
			this._selecaoImovelService.getMeusImoveis(documento).then((meusImoveis: UserUcsResponseDTO | any) => {
				this._loading.stop();

				//Permitir acesso apenas das UCs compartilhadas
				if (this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso == PerfisDeAcesso.corretor) {
					let listaUCs: Array<UCResponseDTO> = [];
					listaUCs = this.setarUCsMultilogin(meusImoveis.ucs, 'DOC'); //FIXO
					this._multiloginAcessoService.multiloginAcesso.ucsCompartilhadas = listaUCs;
					this._multiloginAcessoService.setMultiloginAcesso = this._multiloginAcessoService.multiloginAcesso;
				}
				resolve(meusImoveis);

			}).catch((error) => {
				if (error.error.retorno.numero == '343') {
					this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: EnumTitulosPadroes.DadosCadastrais } });
				} else {
					this._router.navigate([PathCompleto.aviso], { queryParams: {titulo: EnumTitulosPadroes.Inesperado } });
				}
				resolve(error);
			});
		});
	}

	definirDocumento(): string {
		if (this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso === PerfisDeAcesso.atendenteCredenciado ||
			this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso === PerfisDeAcesso.representanteLegal ||
			this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso === PerfisDeAcesso.conjuge
		) {
			return this._multiloginAcessoService.multiloginAcesso.documentoCliente;
		} else {
			return this._user.dadosUser.documento;
		}
	}

	setarUCsMultilogin(listaDeUCs: Array<UCResponseDTO>, tipoBusca: string = ''): Array<UCResponseDTO> {
		let listaUCsMultilogin: Array<UCResponseDTO> = []
		listaDeUCs.forEach(elem => {

			//Pesquisar por doc informado
			if (tipoBusca === 'doc') {
				if (this._multiloginAcessoService.multiloginAcesso.vinculoAcessado?.listaDeUcs.includes(elem.uc)) {
					listaUCsMultilogin.push(elem);
				}
			}

			//Pesquisar pelo documento informado na listagem dos vínculos recebidos
			else {
				this._multiloginAcessoService.multiloginAcesso.vinculosRecebidos.forEach(vinculo => {
					if (vinculo.listaDeUcs.includes(elem.uc)) {
						listaUCsMultilogin.push(elem);
					}

				})
			}
		});

		return listaUCsMultilogin;
	}

	pesquisarPorVinculosRecebidos(): Promise<UserUcsResponseDTO> {
		return new Promise((imoveisRecebidos) => {
			let listaUCs: Array<UCResponseDTO> = [];
			let listaDadosUser: Array<UserUcsResponseDTO> = [];
			let listDocumentos: Array<string> = this._multiloginAcessoService.multiloginAcesso.vinculosRecebidos.map((elem: PerfilAtivo) => elem.docTitular);

			this._loading.start();
			listDocumentos.forEach(elem => {
				this._selecaoImovelService.getMeusImoveis(elem).then((imoveis: UserUcsResponseDTO | any) => {
					let listUCsTemp = this.setarUCsMultilogin(imoveis.ucs)
					listaUCs.concat(listUCsTemp);
					listaDadosUser.push(imoveis);

					if (elem === listDocumentos[listDocumentos.length-1]) {
						this._loading.stop();
						this._selecaoImovelService.setMeusImoveis = listaDadosUser[0] ?? new UserUcsResponseDTO([]);
						this._multiloginAcessoService.multiloginAcesso.ucsCompartilhadas = listaUCs;
						this._multiloginAcessoService.setMultiloginAcesso = this._multiloginAcessoService.multiloginAcesso;
						imoveisRecebidos(listaDadosUser[0] ?? new UserUcsResponseDTO([]));
					}
				}).catch((error) => {
					if (error.error.retorno.numero == '343') {
						this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: EnumTitulosPadroes.DadosCadastrais } });
					} else {
						this._router.navigate([PathCompleto.aviso], { queryParams: {titulo: EnumTitulosPadroes.Inesperado } });
					}
					imoveisRecebidos(error);
				})
			});
		});
	}

}

