import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { TermoAdesaoConsultaDTORequest, TermoAdesaoDTORequest } from 'app/core/models/termo-de-adesao/request/termo-de-adesao-dto';
import { TermoAdesaoConsultaDTOResponse, TermoAdesaoDTOResponse } from 'app/core/models/termo-de-adesao/response/termo-de-adesao-dto';
import { mergeMap, Observable, of, throwError } from 'rxjs';
import { SelecaoImovelService } from '../selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class TermoDeAdesaoService {
    constructor(
        private _http: HttpClient,
        private _selecaoImovelService: SelecaoImovelService,
        private _userService: UserService,
    ) { }

    termoAdesaoCadastro(requestDTO: TermoAdesaoDTORequest): Observable<TermoAdesaoDTOResponse> {
        const endpoint = `${environment.endpoints.termoDeAdesao}termo-adesao-cadastro`;
        const body = Object.assign({}, requestDTO);
        return this._http.post<TermoAdesaoDTOResponse>(endpoint, body).pipe(
            mergeMap((response) => response ? of(response) : throwError(() => response))
        );
    }

    cadastrarTermoDeAdesao(idTermo: string, tipificacao: string): void {
        if (environment.regiao === Regiao.SE) {
            let requestDTO = new TermoAdesaoDTORequest();
            requestDTO.idTermo = idTermo;
            requestDTO.headerMetodo.tipificacao = tipificacao;
            requestDTO = this.complementarTermoAdesaoCadastroDTO(requestDTO);
            this.termoAdesaoCadastro(requestDTO).subscribe({
                next: (responseDTO) => {
                    console.log('Termo de adesão (sucesso):', responseDTO);
                },
                error: (error) => {
                    console.log('Termo de adesão (erro):', error);
                }
            });
        }
    }

    complementarTermoAdesaoCadastroDTO(requestDTO: TermoAdesaoDTORequest): TermoAdesaoDTORequest {
        requestDTO.telefone = this._userService.dadosUser.telefone;
        requestDTO.celular = this._userService.dadosUser.celular;
        requestDTO.email = this._userService.dadosUser.email;
        requestDTO = this.complementarTermoAdesaoDTO(requestDTO);
        return requestDTO;
    }

    termoAdesaoDescadastro(requestDTO: TermoAdesaoDTORequest): Observable<TermoAdesaoDTOResponse> {
        const endpoint = `${environment.endpoints.termoDeAdesao}termo-adesao-descadastro`;
        const body = Object.assign({}, requestDTO);
        return this._http.post<TermoAdesaoDTOResponse>(endpoint, body).pipe(
            mergeMap((response) => response ? of(response) : throwError(() => response))
        );
    }

    descadastrarTermoDeAdesao(idTermo: string, tipificacao: string): void {
        if (environment.regiao === Regiao.SE) {
            let requestDTO = new TermoAdesaoDTORequest();
            requestDTO.idTermo = idTermo;
            requestDTO.headerMetodo.tipificacao = tipificacao;
            requestDTO = this.complementarTermoAdesaoDTO(requestDTO);
            this.termoAdesaoDescadastro(requestDTO).subscribe({
                next: (responseDTO) => {
                    console.log('Termo de adesão descadastro (sucesso):', responseDTO);
                },
                error: (error) => {
                    console.log('Termo de adesão descadastro (erro):', error);
                }
            });
        }
    }

    complementarTermoAdesaoDTO(requestDTO: TermoAdesaoDTORequest): TermoAdesaoDTORequest {
        requestDTO.distribuidora = environment.name;
        requestDTO.regiao = environment.regiao;
        requestDTO.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        requestDTO.nroCliente = this._selecaoImovelService.getInformacoesUCSelecionada.cliente.codigo;
        requestDTO.nomeSolicitante = this._userService.dadosUser.nome;
        requestDTO.tipoDocumento = (this._userService.dadosUser.documento.length === 14) ? 'CNPJ' : 'CPF';
        requestDTO.documentoSolicitante = this._userService.dadosUser.documento;
        requestDTO.headerMetodo.canalSolicitante = environment.canal;
        requestDTO.headerMetodo.usuario = environment.USUARIO_UE;
        requestDTO.headerMetodo.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        requestDTO.headerMetodo.protocoloSonda = this._userService.getProtocolo.protocoloLegadoStr;
        return requestDTO;
    }

    termoAdesaoConsulta(requestDTO: TermoAdesaoConsultaDTORequest): Observable<TermoAdesaoConsultaDTOResponse> {
        const endpoint = `${environment.endpoints.termoDeAdesao}termo-adesao-consulta`;
        const body = Object.assign({}, requestDTO);
        return this._http.post<TermoAdesaoConsultaDTOResponse>(endpoint, body).pipe(
            mergeMap((response) => response ? of(response) : throwError(() => response))
        );
    }

    consultarTermoDeAdesao(idTermo: string, situacaoTermo: string = ''): Promise<TermoAdesaoConsultaDTOResponse> {
        return new Promise<TermoAdesaoConsultaDTOResponse>((resolve, reject) => {
            if (environment.regiao === Regiao.SE) {
                let requestDTO = new TermoAdesaoConsultaDTORequest();
                requestDTO.idTermo = idTermo;
                requestDTO.situacaoTermo = situacaoTermo;
                requestDTO = this.complementarTermoAdesaoConsultaDTO(requestDTO);
                this.termoAdesaoConsulta(requestDTO).subscribe({
                    next: (responseDTO) => {
                        resolve(responseDTO);
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            } else {
                reject('Fluxo exclusivo do SE.');
            }
        });
    }

    complementarTermoAdesaoConsultaDTO(requestDTO: TermoAdesaoConsultaDTORequest): TermoAdesaoConsultaDTORequest {
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.distribuidora = environment.name;
        requestDTO.regiao = environment.regiao;
        requestDTO.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        requestDTO.nroCliente = this._selecaoImovelService.getInformacoesUCSelecionada.cliente.codigo;
        requestDTO.usuario = environment.USUARIO_UE;
        return requestDTO;
    }

    // Utilizar este método para realizar consultas ao Termo de Adesão em outros serviços, caso seja necessário avaliar a situação de cadastro.
    // Aplicar o 'EnumIdTermo' correspondente

    // consultarTermoDeAdesao(): void {
    //     this._termoDeAdesaoService.consultarTermoDeAdesao(EnumIdTermo.).then((responseDTO) => {
    //         this.checkDeclaracao = (responseDTO.termoAceiteServico[0].situacaoTermo === 'AT'); // Exemplo de implementação: se o termo estiver ATIVO, a checkbox já virá marcada.
    //     }).catch((error) => {
    //     });
    // }



}
