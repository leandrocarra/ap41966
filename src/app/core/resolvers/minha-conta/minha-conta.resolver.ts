import {Injectable} from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {environment} from '@environments/environment';
import {Regiao} from 'app/core/enums/regiao';
import {PathCompleto} from 'app/core/enums/servicos';
import {
    AtualizarMinhaContaDTORequest,
    MinhaContaDTORequest,
    MinhaContaLegadoDTORequest
} from 'app/core/models/minha-conta/request/minha-conta-dto';
import {
    ClienteDocumentoSecundario,
    MinhaContaDTOResponse,
    MinhaContaLegadoDTOResponse
} from 'app/core/models/minha-conta/response/minha-conta-dto';
import {CustomSweetAlertService} from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import {LoadingService} from 'app/core/services/customsweetalert/loading.service';
import {MinhaContaService} from 'app/core/services/minha-conta/minha-conta.service';
import {UserService} from 'app/core/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MinhaContaResolver implements Resolve<void> {
    dadosResponseAtualizados: MinhaContaDTOResponse;
    constructor(
		private _router: Router,
		private _userService: UserService,
        private _minhaContaService: MinhaContaService,
        private _loadingService: LoadingService,
		private _customSweetAlertService: CustomSweetAlertService
    ) {
        this.dadosResponseAtualizados = new MinhaContaDTOResponse();
    }

    resolve(): Promise<void> {
        this._loadingService.start();
        return new Promise( async (resolve) => {
            let dadosLegados : MinhaContaLegadoDTOResponse =  await this.chamarLegado(environment.regiao);
            let dadosMinhaConta : MinhaContaDTOResponse =  await this.getDadosMinhaConta();

            this.compararLegadoComWSO2(dadosLegados, dadosMinhaConta).then(() => {
                this._minhaContaService.setMinhaConta = dadosMinhaConta;
                resolve();
            })
        });
    }

    preencherMinhaContaLegadoDTORequest(): MinhaContaLegadoDTORequest {
        let requestDTO = new MinhaContaLegadoDTORequest();
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.usuario = environment.USUARIO_UE;
        requestDTO.documento = this._userService.dadosUser.documento;
        requestDTO.tipoDocumento = this._userService.dadosUser.documento.length > 11 ? 'CPJ' : 'CPF';
        return requestDTO;
    }

    getDadosMinhaConta(): Promise<MinhaContaDTOResponse> {
		return new Promise((minhaContaPromise, errorPromise) => {
            let requestDTO = this.preencherMinhaContaDTORequest();
			this._minhaContaService.consultarMinhaConta(requestDTO).subscribe({
				next: (responseDTO) => {
					this.verificarPerfilDoUsuario(responseDTO);
					minhaContaPromise(responseDTO);
                    this._loadingService.stop();
				},
				error: (error) => {
					errorPromise(this.tratarErrosMinhaConta(error));
                    this._loadingService.stop();
				}
			});
		});
	}

    preencherMinhaContaDTORequest(): MinhaContaDTORequest {
        let requestDTO = new MinhaContaDTORequest();
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.userName = this._userService.dadosUser.sub;
        requestDTO.documento = this._userService.dadosUser.documento;
        return requestDTO;
    }

    verificarPerfilDoUsuario(responseDTO: MinhaContaDTOResponse): void {
        if (responseDTO.retorno.numero === '200' && responseDTO.retorno.mensagem.includes("não foi encontrado")) {
            this._customSweetAlertService.alertErroRequisicao("O perfil do usuário não foi encontrado ou não está completo.").then(() => {
                this._loadingService.stop();
                this._router.navigate([PathCompleto.home])});

        }
    }

    tratarErrosMinhaConta(error: any): any {
        switch (error.status) {
            case '400': {
                return error;
            }
            case '401': {
                return `não autorizado`;
            }
            case '403': {
                return `Usuário com o perfil inativo!`;
            }
            case '404': {
                return `Usuário não encontrado`;
            }
            case '502': {
                this._customSweetAlertService.alertErroRequisicao("Sistema fora do ar, por favor tente novamente mais tarde.").then(() => {
                    this._router.navigate([PathCompleto.home]);
                });
                return error;
            }
            default: {
                return error;
            }
        }
    }

    compararLegadoComWSO2(legado: MinhaContaLegadoDTOResponse, wso2: MinhaContaDTOResponse): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this.dadosLegadoIguaisAoWSO2(legado, wso2)) {
                resolve(true);
            } else {
                resolve(this.alterarDadosNoWSO2(legado, wso2));
            }
        });
    }

    dadosLegadoIguaisAoWSO2(legado: MinhaContaLegadoDTOResponse, wso2: MinhaContaDTOResponse): boolean {
        let dadosIguais: Array<boolean> = [];
        let propriedadesIgnoradas: Array<string> = this.definirPropriedadesIgnoradas(wso2.documento);
        dadosIguais.push(
            Object.keys(new MinhaContaLegadoDTOResponse()).every((propriedade) => {
                if (legado.hasOwnProperty(propriedade) && !propriedadesIgnoradas.includes(propriedade)) {
                    return (legado[propriedade] === wso2[propriedade]);
                } else {
                    return true;
                }
            })
        );
        if (legado.clienteDocumentoSecundario){
            if (legado.clienteDocumentoSecundario.tipoDocumentoSecundario && legado.clienteDocumentoSecundario.documentoSecundario) {
                dadosIguais.push(this.removerPrefixo(legado.clienteDocumentoSecundario.tipoDocumentoSecundario) === wso2.tipoDocumentoSecundario);
                dadosIguais.push(legado.clienteDocumentoSecundario.documentoSecundario === wso2.documentoSecundario);
            }
        }
        return (!dadosIguais.includes(false)); // Caso 'true', não há divergências entre os dados do Legado e do WSO2.
    }

    definirPropriedadesIgnoradas(documento: string): Array<string> {
        let sempreIgnorar = ['clienteDocumentoSecundario', 'e_resultado', 'retorno'];
        let ignorarPorDocumentoFiscal = (documento.length === 11) ? ['razaoSocial'] : ['nomeTitular', 'dtNascimento', 'tipoDocumentoSecundario', 'documentoSecundario'];
        return sempreIgnorar.concat(ignorarPorDocumentoFiscal);
    }

    removerPrefixo(original: string): string {
        return original?.startsWith('Z_') ? original.substring(2) : original;
    }

    alterarDadosNoWSO2(legado: MinhaContaLegadoDTOResponse, wso2: MinhaContaDTOResponse): Promise<boolean> {
        let atualizarContaRequestDTO = this.preencherDadosParaRequest(legado, wso2);
        return new Promise<boolean>((resolve) => {
            this._minhaContaService.getAtualizarMinhaConta(atualizarContaRequestDTO, true).then(() => { resolve(true) });
        });
    }

    preencherDadosParaRequest(legado: MinhaContaLegadoDTOResponse, wso2: MinhaContaDTOResponse): AtualizarMinhaContaDTORequest {
        this.dadosResponseAtualizados = this.substituirDadosDaResponse(legado, wso2);
        let requestDTO = new AtualizarMinhaContaDTORequest();
        Object.keys(requestDTO).forEach((propriedade) => {
            if (this.dadosResponseAtualizados.hasOwnProperty(propriedade)) {
              requestDTO[propriedade] = this.dadosResponseAtualizados[propriedade];
            }
        });
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.userName = this._userService.dadosUser.sub;
        requestDTO.documento = this._userService.dadosUser.documento;
        requestDTO.termosUso = true;
        return requestDTO;
    }

    substituirDadosDaResponse(legado: MinhaContaLegadoDTOResponse, wso2: MinhaContaDTOResponse): MinhaContaDTOResponse {
        let tipoPessoa = this._userService.dadosUser.documento.length === 11 ? "FISICA" : "JURIDICA";
        let dadosResponseAtualizados: MinhaContaDTOResponse = new MinhaContaDTOResponse();
        dadosResponseAtualizados.telefone = wso2.telefone ?? '';
        dadosResponseAtualizados.usuarioAcesso = wso2.usuarioAcesso ?? '';
        dadosResponseAtualizados.emailAcesso = wso2.emailAcesso ?? '';
        dadosResponseAtualizados.dtUltimaAtualizacao = new Date().toISOString();
        dadosResponseAtualizados.emailCadastro = wso2.emailCadastro ? wso2.emailCadastro : (legado.emailCadastro ?? '');
        dadosResponseAtualizados.telefoneContato = wso2.telefoneContato ? wso2.telefoneContato : (legado.telefoneContato ?? '');
        if (tipoPessoa === 'JURIDICA') {
            dadosResponseAtualizados.razaoSocial = wso2.razaoSocial ? wso2.razaoSocial : (legado.razaoSocial?? '');
        } else {
            dadosResponseAtualizados.nomeTitular = wso2.nomeTitular ? wso2.nomeTitular : (legado.nomeTitular?? '');
            dadosResponseAtualizados.dtNascimento = legado.dtNascimento ?? '';
            if (legado.clienteDocumentoSecundario){
                dadosResponseAtualizados.tipoDocumentoSecundario = wso2.tipoDocumentoSecundario ? wso2.tipoDocumentoSecundario : (this.removerPrefixo(legado.clienteDocumentoSecundario.tipoDocumentoSecundario) ?? '');
                dadosResponseAtualizados.documentoSecundario = wso2.documentoSecundario ? wso2.documentoSecundario : (legado.clienteDocumentoSecundario.documentoSecundario ?? '');
            }
            else{
                dadosResponseAtualizados.tipoDocumentoSecundario = wso2.tipoDocumentoSecundario ?? '';
                dadosResponseAtualizados.documentoSecundario =  wso2.documentoSecundario ?? '';
            }

        }
        return dadosResponseAtualizados;
    }

    async chamarLegado(regiao: Regiao): Promise<MinhaContaLegadoDTOResponse> {
        return new Promise((resolve, reject) => {
            let legadoRequestDTO = this.preencherMinhaContaLegadoDTORequest();
            let legadoResponse = new MinhaContaLegadoDTOResponse();

            if (regiao === Regiao.NE) {
                this._minhaContaService.consultarMinhaContaLegado(legadoRequestDTO).subscribe({
                    next: (legadoResponseDTO) => {
                        legadoResponse = legadoResponseDTO;
                        resolve(legadoResponse);
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            } else {
                this._minhaContaService.consultarMinhaContaLegadoSE(legadoRequestDTO).subscribe({
                    next: (legadoResponseDTO) => {
                        legadoResponse.retorno = legadoResponseDTO.retorno;
                        legadoResponse.e_resultado = legadoResponseDTO.listaDadosCliente[0].e_resultado;
                        legadoResponse.dtNascimento = legadoResponseDTO.listaDadosCliente[0].dtNascimento;
                        legadoResponse.nomeTitular = legadoResponseDTO.listaDadosCliente[0].nomeTitular;
                        legadoResponse.emailCadastro = legadoResponseDTO.listaDadosCliente[0].emailCadastro;
                        legadoResponse.razaoSocial = legadoResponseDTO.listaDadosCliente[0].razaoSocial;
                        legadoResponse.clienteDocumentoSecundario = legadoResponseDTO.listaDadosCliente[0].clienteDocumentoSecundario;
                        if (!legadoResponse.clienteDocumentoSecundario){
                            legadoResponse.clienteDocumentoSecundario = new ClienteDocumentoSecundario(
                                legadoResponseDTO.listaDadosCliente[0].tipoDocumentoSecundario,
                                legadoResponseDTO.listaDadosCliente[0].documentoSecundario,
                            )
                        }
                        legadoResponse.telefoneContato = legadoResponseDTO.listaDadosCliente[0].telefoneContato;

                        resolve(legadoResponse);
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            }
        });
    }

}
