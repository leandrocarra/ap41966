import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { Aviso, definirMatriculaPlataforma, EnumTipificacao, FluxoFaltaDeEnergia } from 'app/core/models/falta-de-energia/falta-de-energia';
import { EnumFaltaEnergiaOpcoes, EnumTipificacaoInformacao, EnumTipificacaoReclamacao, ObjetoGenerico } from 'app/core/models/falta-de-energia/fluxo-falta-de-energia';
import { FaltaEnergiaDTORequest, FaltaEnergiaOcorrenciaDTORequest, POSTFaltaEnergiaDTORequest } from 'app/core/models/falta-de-energia/requests/falta-de-energia-dto';
import { FaltaEnergiaDTOResponse, FaltaEnergiaOcorrenciaDTOResponse, POSTFaltaEnergiaDTOResponse } from 'app/core/models/falta-de-energia/responses/falta-de-energia-dto';
import { SubRotasFaltaDeEnergia } from 'app/core/models/falta-de-energia/sub-rotas-falta-de-energia';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomSweetAlertService } from '../customsweetalert/custom-sweet-alert.service';
import { SelecaoImovelService } from '../selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from '../user/user.service';
import { convertDates, convertHours } from '../utils/utils.service';
import { TipologiaFaltaEnergiaService } from './tipologia-falta-de-energia.service';

@Injectable({
    providedIn: 'root'
})
export class FaltaDeEnergiaService {
    fluxoFaltaDeEnergia: FluxoFaltaDeEnergia;
    private _postFaltaDeEnergiaResponse: POSTFaltaEnergiaDTOResponse;
    private _faltaDeEnergiaResponse: Array<FaltaEnergiaDTOResponse>;
    private _faltaDeEnergiaOcorrenciaResponse: FaltaEnergiaOcorrenciaDTOResponse;
    constructor(
        private _http: HttpClient,
        private _selecaoImovelService: SelecaoImovelService,
        private _userService: UserService,
        private _alert: CustomSweetAlertService,
        private _router: Router,
        private _tipologiaService: TipologiaFaltaEnergiaService
    ) {
        this.fluxoFaltaDeEnergia = new FluxoFaltaDeEnergia();
        this._postFaltaDeEnergiaResponse = new POSTFaltaEnergiaDTOResponse('', '');
        this._faltaDeEnergiaResponse = [];
        this._faltaDeEnergiaOcorrenciaResponse = new FaltaEnergiaOcorrenciaDTOResponse('N', 'N');
    }

    consultarFaltaEnergia(byPassActiv: boolean): Observable<Array<FaltaEnergiaDTOResponse>> {
        let endpoint: string;
        let params = new HttpParams();
        let consultarFaltaEnergia = this.preencherDadosGetFaltaEnergia(byPassActiv);
        endpoint = `${environment.endpoints.faltaEnergia}${consultarFaltaEnergia.codigo}/falta-energia`;
        Object.entries(consultarFaltaEnergia).forEach(([atributo, valor]) => {
            if (valor != "") {
                params = params.append(atributo, valor);
            }
        });
        params = params.delete('codigo');
        return this._http.get<Array<FaltaEnergiaDTOResponse>>(endpoint, { params }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    preencherDadosGetFaltaEnergia(byPassActiv: boolean): FaltaEnergiaDTORequest {
        const dadosFaltaEnergia = new FaltaEnergiaDTORequest();
        dadosFaltaEnergia.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo,
        dadosFaltaEnergia.protocolo = this._userService.getProtocolo.protocoloSalesforceStr,
        dadosFaltaEnergia.tipificacao = EnumTipificacao.FaltaIndividual, //FIXO
        dadosFaltaEnergia.canalSolicitante = environment.canal,
        dadosFaltaEnergia.documentoSolicitante = this._userService.dadosUser.documento;
        if (environment.regiao === Regiao.NE) {
            dadosFaltaEnergia.matriculaPlataforma = definirMatriculaPlataforma()!.toString();
            dadosFaltaEnergia.byPassActiv = byPassActiv ? 'X' : '';
        }
        return dadosFaltaEnergia;
    }

    consultarOcorrencia(tipificacao: EnumTipificacaoReclamacao | EnumTipificacaoInformacao, byPassActiv: boolean): Observable<FaltaEnergiaOcorrenciaDTOResponse> {
        let params = new HttpParams();
        let dadosOcorrencia = this.preencherDadosOcorrencia(tipificacao, byPassActiv);
        let endpoint: string = `${environment.endpoints.faltaEnergia}${dadosOcorrencia.codigo}/falta-energia-ocorrencia`;
        Object.entries(dadosOcorrencia).forEach(([atributo, valor]) => {
            if (valor != "") {
                params = params.append(atributo, valor);
            }
        });
        params = params.delete('codigo');
        return this._http.get<FaltaEnergiaOcorrenciaDTOResponse>(endpoint, { params }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    preencherDadosOcorrencia(tipificacao: EnumTipificacaoReclamacao | EnumTipificacaoInformacao, byPassActiv: boolean): FaltaEnergiaOcorrenciaDTORequest {
        const dadosOcorrencia = new FaltaEnergiaOcorrenciaDTORequest();
        dadosOcorrencia.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        dadosOcorrencia.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        dadosOcorrencia.tipificacao = tipificacao;
        dadosOcorrencia.canalSolicitante = environment.canal;
        dadosOcorrencia.documentoSolicitante = this._userService.dadosUser.documento;
        if (environment.regiao === Regiao.NE) {
            dadosOcorrencia.matriculaPlataforma = definirMatriculaPlataforma()!.toString();
            dadosOcorrencia.byPassActiv = byPassActiv ? 'X' : '';
        }
        return dadosOcorrencia;
    }

    registrarFaltaEnergia(faltaEnergiaRequest: POSTFaltaEnergiaDTORequest): Observable<any> {
        let endpoint = `${environment.endpoints.faltaEnergia}falta-energia`;
        let body = Object.assign({}, faltaEnergiaRequest)
        body.canalSolicitante = environment.canal;
        return this._http.post<any>(endpoint, body).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    postRegistroFaltaDeEnergia(faltaEnergiaDTORequest: POSTFaltaEnergiaDTORequest): Promise<POSTFaltaEnergiaDTOResponse> {
        return new Promise((resolve, errorResolve) => {
            this.registrarFaltaEnergia(faltaEnergiaDTORequest).subscribe({
                next: (data) => {

                    resolve(data);
                },
                error: (error) => {
                    errorResolve(error);
                }
            });
        });
    }

    getConsultarOcorrencia(tipificacao: EnumTipificacaoReclamacao | EnumTipificacaoInformacao, byPassActiv: boolean): Promise<FaltaEnergiaOcorrenciaDTOResponse | boolean> {
        return new Promise((ocorrencia) => {
            this.consultarOcorrencia(tipificacao, byPassActiv).subscribe({
                next: (data: FaltaEnergiaOcorrenciaDTOResponse) => {
                    this.setOcorrenciaFaltaDeEnergia = data;
                    ocorrencia(data);
                },
                error: () => {
                    ocorrencia(false);
                }
            });
        });
    }

    getConsultarFaltaEnergia(byPassActiv: boolean): Promise<Array<FaltaEnergiaDTOResponse> | boolean> {
        return new Promise((dados) => {
            this.consultarFaltaEnergia(byPassActiv).subscribe({
                next: (data: Array<FaltaEnergiaDTOResponse>) => {
                    this.setFaltaDeEnergia = data;
                    dados(data);
                },
                error: () => {
                    dados(false);
                }
            });
        });
    }

    recebeTipoAviso(aviso: string, protocolo: string): Aviso {
        switch (aviso) {
            case EnumFaltaEnergiaOpcoes.EnergiaVoltou: {
                return new Aviso(
                    "energia-voltou",
                    "otima-noticia",
                    "Ótima notícia! \n Parece que resolvemos o problema :)",
                    "verde",
                    "",
                    false,
                    false,
                    protocolo);
            }
            case EnumFaltaEnergiaOpcoes.SemEnergiaDisjuntorDanificado: {
                return new Aviso("",
                    "chamar-eletricista",
                    "Consulte um eletricista particular para consertar seu disjuntor!",
                    "laranja",
                    "O jeito mais rápido de resolver o problema com o seu disjuntor é chamando um profissional qualificado (eletricista) de sua confiança.\nDefeitos na instalação elétrica da Unidade Consumidora são de responsabilidade do cliente.",
                    false,
                    false,
                    protocolo
                );
            }
            case EnumFaltaEnergiaOpcoes.IluminacaoPublica: {
                return new Aviso("escolhendo a opção 'Lâmpada apagada em praça ou jardim'",
                    "contato",
                    "Entre em contato com a prefeitura",
                    "laranja",
                    "A manutenção e expansão da iluminação em praças ou jardins públicos de sua cidade é de responsabilidade da prefeitura municipal.",
                    false,
                    false,
                    protocolo
                );
            }
            case EnumFaltaEnergiaOpcoes.ParteDaUc: {
                return new Aviso("",
                    "chamar-eletricista",
                    "Consulte um profissional especializado!",
                    "laranja",
                    "Recomendamos contratar um eletricista particular para averiguação da instalação interna e possível redistribuição/balanceamento das cargas.",
                    false,
                    false,
                    protocolo
                );
            }
            default: {
                return new Aviso("",
                    "contato",
                    "Entre em contato com a prefeitura",
                    "laranja",
                    "A manutenção e expansão da iluminação pública das ruas de sua cidade é de responsabilidade da prefeitura municipal.",
                    false, false, protocolo
                );
            }
        }
    }

    get getPostFaltaDeEnergia(): POSTFaltaEnergiaDTOResponse {
        return this._postFaltaDeEnergiaResponse;
    }

    get getFaltaDeEnergia(): Array<FaltaEnergiaDTOResponse> {
        return this._faltaDeEnergiaResponse;
    }

    get getOcorrenciaFaltaDeEnergia(): FaltaEnergiaOcorrenciaDTOResponse {
        return this._faltaDeEnergiaOcorrenciaResponse;
    }

    set setFaltaDeEnergia(dtoResponse: Array<FaltaEnergiaDTOResponse>) {
        this._faltaDeEnergiaResponse = dtoResponse;
    }

    set setOcorrenciaFaltaDeEnergia(dtoResponse: FaltaEnergiaOcorrenciaDTOResponse) {
        this._faltaDeEnergiaOcorrenciaResponse = dtoResponse;
    }

    get getLengthObservacoes(): number {
        return this.fluxoFaltaDeEnergia.problemaEscolhido!.observacoes.length ?? 0;
    }

    verificarChamadosPendentes(): void {
        if (this.getOcorrenciaFaltaDeEnergia.chamadosPendentes === "Sim") {
            return this.verificarOcorrencia(this.getFaltaDeEnergia[0].dataHoraCombinada);
        }
    }

    verificarOcorrencia(estimativaRetorno: Date | string): void {
        let dataSolicitacaoAtual = new Date();
        let dataHoraCompleta = (estimativaRetorno !== undefined) ? new Date(estimativaRetorno) : dataSolicitacaoAtual;
        let data = convertDates(dataHoraCompleta);
        let hours = convertHours(dataHoraCompleta);

        if (dataHoraCompleta > dataSolicitacaoAtual) {
            this._alert.faltaEnergiaJaIdentificada(data, hours).then((result) => {
                if (!result.value) {
                    this._router.navigate(['home']);
                }
                if (this.getOcorrenciaFaltaDeEnergia.interrupcao === "Sim") {
                    return this.verificarFaltaDeEnergia(this.getFaltaDeEnergia[0].dataHoraInclusao, this.getFaltaDeEnergia[0].dataHoraCombinada);
                }
            });
        }
    }

    verificarFaltaDeEnergia(dataHoraDeInclusao: Date | string, dataHoraPrevisao: Date | string): void {
        let dataHoraInclusao = new Date(dataHoraDeInclusao);
        let dataHoraCombinada = new Date(dataHoraPrevisao);
        let horaInclusao = convertHours(dataHoraInclusao);
        let horaCombinada = convertHours(dataHoraCombinada);
        this._alert.faltaEnergiaManutencao(horaInclusao, horaCombinada).then((result) => {
            if (!result.value) {
                this._router.navigate(['home']);
            }
        });
    }

    dataDeOcorrenciaValida(dataHoraPrevisao: Date | string): boolean {
        let dataHoraCombinada = new Date(dataHoraPrevisao);
        return dataHoraCombinada > new Date();
    }

    chamarAssistenciaMedica(): void {
        this._alert.faltaEnergiaAssistenciaMedica().then((result) => {
            if (result.value) {
                this.fluxoFaltaDeEnergia.ondeFaltaEnergia = new ObjetoGenerico(
                    EnumFaltaEnergiaOpcoes.MinhaUnidadeConsumidora,
                    "Apenas na minha unidade consumidora."
                );
                this.fluxoFaltaDeEnergia.problemaEscolhido = this._tipologiaService.ASS_MEDICA_DOMICILIAR;
                this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.DadosContato]);
            } else {
                this._router.navigate(['home']);
            }
        });
    }

    possuiSuporteAVida(): boolean {
        return (this._selecaoImovelService.getInformacoesUCSelecionada.caracteristicas.vip7 === 'X') ? true : false;
    }
}
