import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Regiao } from 'app/core/enums/regiao';
import { EnumFaturaImpressa, EnumOperacoes, EnumRecebimento, EnumTipificacaoFaturaDigital, FaturaDigital, OpcoesDeEnvio } from 'app/core/models/fatura-digital/fatura-digital';
import { FaturaDigitalDTORequest, FaturaDigitalValidaDTORequest, FaturaEmailCadastraDTORequest } from 'app/core/models/fatura-digital/request/fatura-digital-dto';
import { FaturaDigitalCadastraDTOResponse, FaturaDigitalDTOResponse } from 'app/core/models/fatura-digital/response/fatura-digital-dto';
import { MinhaContaDTOResponse } from 'app/core/models/minha-conta/response/minha-conta-dto';
import { SelecaoImovelService } from '../selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class FaturaDigitalService {
    fluxoFaturaDigital: FaturaDigital;
    faturaDigitalResponseDTO = new FaturaDigitalDTOResponse();
    cadastraResponseDTO = new FaturaDigitalCadastraDTOResponse();
    descadastraResponseDTO = new FaturaDigitalCadastraDTOResponse();
    minhaContaResponseDTO = new MinhaContaDTOResponse();
    constructor(
        private _http: HttpClient,
        private _selecaoImovelService: SelecaoImovelService,
        private _userService: UserService
    ) {
        this.fluxoFaturaDigital = new FaturaDigital();
    }

    /******************************/
    /* Métodos
    /******************************/
    definirDadosIniciais(): void {
        this.atualizarDadosDoFluxo(this.faturaDigitalResponseDTO);
        this.definirOpcoesDeEnvioDaFaturaDigital();
    }

	atualizarFaturaDigitalService(cadastrouFaturaDigital: boolean): void {
		this.atualizarDadosDoFluxo(this.reunirDadosAtualizados(cadastrouFaturaDigital));
		this.definirOpcoesDeEnvioDaFaturaDigital();
	}

    atualizarDadosDoFluxo(dadosDeEntrada: FaturaDigitalDTOResponse | FaturaDigital): void {
        const dadosDoFluxo = new FaturaDigital();
        dadosDoFluxo.emailAcesso = this.minhaContaResponseDTO.emailAcesso;
        dadosDoFluxo.emailCadastro = dadosDeEntrada.emailCadastro ?? '';
        dadosDoFluxo.emailFatura = dadosDeEntrada.emailFatura ?? '';
        dadosDoFluxo.emailHistorico = dadosDeEntrada.emailHistorico ?? '';
        dadosDoFluxo.dominioWhatsapp = dadosDeEntrada.dominioWhatsapp ?? '';
        dadosDoFluxo.dominioSMS = dadosDeEntrada.dominioSMS ?? '';
        dadosDoFluxo.faturaBraile = dadosDeEntrada.faturaBraile ?? '';
        dadosDoFluxo.faturaEntregaAlternativa = dadosDeEntrada.faturaEntregaAlternativa ?? '';
        dadosDoFluxo.modoDeEnvioAtual = this.definirModoDeEnvio(dadosDoFluxo);
        this.fluxoFaturaDigital = dadosDoFluxo;
    }

    reunirDadosAtualizados(possuiFaturaDigital: boolean): FaturaDigital {
        const dadosAtualizados = this.fluxoFaturaDigital;
        const enderecoParaEnvio = this.fluxoFaturaDigital.novoModoDeEnvio.valor;
        dadosAtualizados.possuiFaturaDigital = possuiFaturaDigital;
        if (possuiFaturaDigital) {
            dadosAtualizados.emailFatura = enderecoParaEnvio;
            switch(dadosAtualizados.novoModoDeEnvio.label) {
                case EnumRecebimento.emailAcesso:
                    dadosAtualizados.emailAcesso = enderecoParaEnvio;
                    break;
                case EnumRecebimento.emailCadastro:
                    dadosAtualizados.emailCadastro = enderecoParaEnvio;
                    break;
                case EnumRecebimento.whatsapp:
                case EnumRecebimento.novoWhatsapp:
                    dadosAtualizados.dominioWhatsapp = 'X';
                    break;
            }
        } else {
            // Para descadastro, as verificações não podem ser feitas com o switch(), já que não é possível saber para qual forma de fatura impressa o sistema reverterá, pois essas informações só podem vir do endpoint.
            // TODO: Reavaliar sentido de fazer toda essa implementação.
            dadosAtualizados.emailFatura = '';
            dadosAtualizados.dominioWhatsapp = '';
            dadosAtualizados.dominioSMS = '';
        }
        return dadosAtualizados;
    }


    definirModoDeEnvio(dadosDoFluxo: FaturaDigital): OpcoesDeEnvio {
        if (dadosDoFluxo.faturaBraile === 'X') return new OpcoesDeEnvio(
                EnumRecebimento.vazio,
                EnumFaturaImpressa.braile
            );
        if (dadosDoFluxo.faturaEntregaAlternativa === 'X') return new OpcoesDeEnvio(
                EnumRecebimento.vazio,
                EnumFaturaImpressa.enderecoAlternativo
            );
        if (dadosDoFluxo.dominioWhatsapp === 'X') return new OpcoesDeEnvio(
                EnumRecebimento.whatsapp,
                this.formatarNumeroDeTelefoneDaResponse(dadosDoFluxo.emailFatura)
            );
        if (dadosDoFluxo.emailFatura !== '') {
            if ((environment.regiao === Regiao.SE) && (this.fluxoFaturaDigital.possuiFaturaDigital !== true)) {
                return new OpcoesDeEnvio(
                    EnumRecebimento.vazio,
                    EnumFaturaImpressa.noImovel
                );
            } else {
                return new OpcoesDeEnvio(
                    this.definirRecebimentoEmailFatura(dadosDoFluxo),
                    dadosDoFluxo.emailFatura
                );
            }
        } else {
            return new OpcoesDeEnvio(
                EnumRecebimento.vazio,
                EnumFaturaImpressa.noImovel
            );
        }
    }

    definirRecebimentoEmailFatura(dadosDoFluxo: FaturaDigital): EnumRecebimento {
        switch(dadosDoFluxo.emailFatura) {
            case dadosDoFluxo.emailAcesso: return EnumRecebimento.emailAcesso;
            case dadosDoFluxo.emailCadastro: return EnumRecebimento.emailCadastro;
            case dadosDoFluxo.emailFatura: return EnumRecebimento.emailFatura;
            default: return EnumRecebimento.erro;
        }
    }

    // ATENÇÃO: Método utilizado para quando o fluxo de cadastro de WhatsApp estiver ligado. Não remover.
    formatarNumeroDeTelefoneDaResponse(numero: string): string {
        numero = numero.includes('55') ? numero.split('55')[1] : numero;
        numero = numero.split('@')[0];
        return numero;
    }

    // ATENÇÃO: Método utilizado para quando o fluxo de cadastro de WhatsApp estiver ligado. Não remover.
    formatarNumeroDeTelefoneParaEnvio(numero: number | string): string {
        numero = typeof(numero) === 'string' ? numero : numero.toString();
        numero = '55'.concat(numero.toString());
        numero = numero.concat('@faturadigital.whatsapp.com');
        numero = (environment.regiao === Regiao.SE) ? numero.concat('.br') : numero;
        return numero;
    }

    definirOpcoesDeEnvioDaFaturaDigital(): void {
        const opcoesDeEnvio: Array<OpcoesDeEnvio> = [];
        const emailAcesso = new OpcoesDeEnvio(EnumRecebimento.emailAcesso, this.fluxoFaturaDigital.emailAcesso);
        const emailCadastro = new OpcoesDeEnvio(EnumRecebimento.emailCadastro, this.fluxoFaturaDigital.emailCadastro);
        const novoEmail = new OpcoesDeEnvio(EnumRecebimento.novoEmail, this.fluxoFaturaDigital.emailAlternativo);
        if (this.fluxoFaturaDigital.possuiFaturaDigital) {
            if (this.fluxoFaturaDigital.emailCadastro && this.fluxoFaturaDigital.emailFatura !== this.fluxoFaturaDigital.emailCadastro) opcoesDeEnvio.push(emailCadastro);
            if (this.fluxoFaturaDigital.emailAcesso && this.fluxoFaturaDigital.emailFatura !== this.fluxoFaturaDigital.emailAcesso) opcoesDeEnvio.push(emailAcesso);
            opcoesDeEnvio.push(novoEmail);
            if (this.fluxoFaturaDigital.dominioWhatsapp === 'X') {
                const numeroWhatsappFormatado = this.formatarNumeroDeTelefoneDaResponse(this.fluxoFaturaDigital.emailFatura);
                const whatsapp = new OpcoesDeEnvio(EnumRecebimento.whatsapp, numeroWhatsappFormatado);
                const novoWhatsapp = new OpcoesDeEnvio(EnumRecebimento.novoWhatsapp, '');
                opcoesDeEnvio.push(whatsapp);
                opcoesDeEnvio.push(novoWhatsapp);
            }
        } else {
            if (this.fluxoFaturaDigital.emailCadastro) opcoesDeEnvio.push(emailCadastro);
            if (this.fluxoFaturaDigital.emailAcesso) opcoesDeEnvio.push(emailAcesso);
            opcoesDeEnvio.push(novoEmail);
        }
        this.fluxoFaturaDigital.opcoesDeEnvio = opcoesDeEnvio;
    }

    verificarSePossuiFaturaDigital(): boolean {
        let validadores: Array<boolean> = [];
        if (environment.regiao === Regiao.NE) {
            validadores.push(this.faturaDigitalResponseDTO.emailFatura !== null);
            validadores.push(this.faturaDigitalResponseDTO.dominioWhatsapp !== null);
        } else {
            validadores.push(this.faturaDigitalResponseDTO.retornoSonda);
        }
        // this.fluxoFaturaDigital.possuiFaturaDigital = validadores.includes(true);
        this.fluxoFaturaDigital.possuiFaturaDigital = validadores.includes(true);
        return this.fluxoFaturaDigital.possuiFaturaDigital;
    }

    /******************************/
    /* APIs apenas NE
    /******************************/
    validarFaturaDigitalNE(byPassValida: 'X' | '' = ''): Promise<FaturaDigitalDTOResponse> {
		return new Promise((resolve, reject) => {
			let requestDTO = this.reunirDadosParaValidacao(byPassValida);
			this.getFaturaDigitalValida(requestDTO).subscribe({
				next: (responseDTO) => {
					this.faturaDigitalResponseDTO = responseDTO;
                    resolve(responseDTO);
				},
                error: (error) => {
                    reject(error);
                }
			});
		});
	}

	reunirDadosParaValidacao(byPassValida: 'X' | ''): FaturaDigitalValidaDTORequest {
		let requestDTO = new FaturaDigitalValidaDTORequest();
		requestDTO.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
		requestDTO.canalSolicitante = environment.canal;
		requestDTO.usuario = environment.USUARIO_UE;
		requestDTO.operacao = EnumOperacoes.Valida;
		requestDTO.tipificacao = EnumTipificacaoFaturaDigital.Informacao;
		requestDTO.documentoSolicitante = this._userService.dadosUser.documento;
		requestDTO.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        requestDTO.valida = byPassValida;
        return requestDTO;
    }

    getFaturaDigitalValida(request: FaturaDigitalValidaDTORequest): Observable<FaturaDigitalDTOResponse> {
        let params = new HttpParams();
        Object.entries(request).forEach(([atributo, valor]) => {
            if (valor && atributo !== 'codigo') {
                params = params.append(atributo, valor);
            }
        });
        let endpoint = `${environment.endpoints.faturaDigital}${request.codigo}/fatura-digital-valida`
        return this._http.get<FaturaDigitalDTOResponse>(endpoint, { params }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    /******************************/
    /* APIs apenas SE
    /******************************/
    consultarFaturaDigitalSE(): Promise<FaturaDigitalDTOResponse> {
        return new Promise((resolve, reject) => {
            let requestDTO = this.reunirDadosParaConsulta();
            this.getFaturaDigital(requestDTO).subscribe({
                next: (responseDTO) => {
                    this.faturaDigitalResponseDTO = responseDTO;
                    this.fluxoFaturaDigital.possuiFaturaDigital = responseDTO.retornoSonda!;
                    resolve(responseDTO);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    reunirDadosParaConsulta(): FaturaDigitalDTORequest {
        let requestDTO = new FaturaDigitalDTORequest();
        requestDTO.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.usuario = environment.USUARIO_UE;
        return requestDTO;
    }

    getFaturaDigital(request: FaturaDigitalDTORequest): Observable<FaturaDigitalDTOResponse> {
        let params = new HttpParams();
        Object.entries(request).forEach(([atributo, valor]) => {
            if (valor) {
                params = params.append(atributo, valor);
            }
        });
        let endpoint = `${environment.endpoints.faturaDigital}/fatura-digital`
        return this._http.get<FaturaDigitalDTOResponse>(endpoint, { params }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    /******************************/
    /* APIs comuns a ambas regiões
    /******************************/
    postFaturaDigitalCadastra(request: FaturaEmailCadastraDTORequest): Observable<FaturaDigitalCadastraDTOResponse> {
        let endpoint = `${environment.endpoints.faturaDigital}${request.codigo}/fatura-email-cadastra`
        let body = Object.assign({}, request);
        return this._http.post<FaturaDigitalCadastraDTOResponse>(endpoint, body).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    postFaturaDigitalDescadastra(request: FaturaEmailCadastraDTORequest): Observable<FaturaDigitalCadastraDTOResponse> {
        let endpoint = `${environment.endpoints.faturaDigital}${request.codigo}/fatura-email-descadastra`
        let body = Object.assign({}, request);
        return this._http.post<FaturaDigitalCadastraDTOResponse>(endpoint, body).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }
}
