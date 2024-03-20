
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { Autoleitura, EnumFluxoAutoleitura, EnumLeiturasNaMedia, EnumTipificacaoAutoleitura, EnumTiposDeRegistrador, Leitura } from 'app/core/models/autoleitura/autoleitura';
import { AnexarFotoAutoleituraDTORequest, AutoleituraDTORequest, SimulaAutoleituraDTORequest, ValidaAutoleituraDTORequest, ValorLeituraDTORequest } from 'app/core/models/autoleitura/request/autoleitura-dto';
import { AnexarFotoAutoleituraDTOResponse, AutoleituraDTOResponse, LeituraAutoleituraDTOResponse, SimulaAutoleituraDTOResponse, ValidaAutoleituraDTOResponse } from 'app/core/models/autoleitura/response/autoleitura-dto';
import { BoxAnexo } from 'app/core/models/documentos/box-anexo/box-anexo';
import { HeaderMetodo } from 'app/shared/models/header-metodo/header-metodo';
import { Observable, catchError, mergeMap, of, throwError } from 'rxjs';
import { SelecaoImovelService } from '../selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from '../user/user.service';

const NA_ORDEM = 1;
const FORA_DA_ORDEM = -1;

@Injectable({
    providedIn: 'root'
})
export class AutoleituraService {

    autoleitura: Autoleitura;
    listLeituraAutoLeitura: Array<LeituraAutoleituraDTOResponse>;
    autoLeituraDTOResponse!: AutoleituraDTOResponse;

    constructor(
        private _selecaoImovelService: SelecaoImovelService,
        private _userService: UserService,
        private _http: HttpClient,
    ) {
        this.autoleitura = new Autoleitura();
        this.autoleitura.medidor = this._selecaoImovelService.getInformacoesUCSelecionada.medidor;
        this.listLeituraAutoLeitura = [];
    }

    /**
     * Requisições
     */
    requestAutoleitura(): AutoleituraDTORequest {
        let request = new AutoleituraDTORequest(
            this._selecaoImovelService.getInformacoesUCSelecionada.codigo,
            [],
            new HeaderMetodo()
        )
        //preenchendo o headerMetodo
        request.headerMetodo.protocolo = this._userService.getProtocolo.protocoloSalesforceStr,
            request.headerMetodo.tipificacao = EnumTipificacaoAutoleitura.Solicitacao,
            request.headerMetodo.canalSolicitante = environment.canal,
            request.headerMetodo.usuario = environment.USUARIO_UE

        if (environment.regiao === Regiao.NE) {
            request.headerMetodo.documentoSolicitante = this._userService.dadosUser.documento,
                request.termoAceite = 'X', //FIXO
                request.indicadorAlteracao = '' //TODO: aguardando o merge com o validaAutoLeitura
        } else {
            request.headerMetodo.protocoloSonda = this._userService.getProtocolo.protocoloLegadoStr
        }

        //preenchendo o valor leitura
        this.autoleitura.leiturasDestePeriodo.forEach(elemento => {
            let valorLeitura = new ValorLeituraDTORequest(elemento.valor);
            if (environment.regiao === Regiao.NE) {
                valorLeitura.tipoRegistrador = elemento.tipoRegistrador
            } else {
                valorLeitura.codEspec = elemento.tipoRegistrador,
                    valorLeitura.dataLeitura = new Date().toLocaleDateString('pt-BR')
            }
            request.valorLeitura.push(valorLeitura);
        })
        return request
    }

    efetivaAutoleitura(requestDTO: AutoleituraDTORequest): Observable<AutoleituraDTOResponse> {
        let endpoint = `${environment.endpoints.autoleitura}ucs/${encodeURIComponent(requestDTO.codigo)}/autoleitura`;
        let body = Object.assign({}, requestDTO);
        console.log(body)
        return this._http.post<AutoleituraDTOResponse>(endpoint, body).pipe(
            mergeMap((response) => response ? of(response) : throwError(() => response))
        );
    }

    requestValidaAutoleitura(byPassValida: 'X' | ''): ValidaAutoleituraDTORequest {
        let request = new ValidaAutoleituraDTORequest();
        request.codigo =  this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        request.valida = byPassValida;
        request.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        request.canalSolicitante = environment.canal;
        request.usuario =environment.USUARIO_UE;
        request.tipificacao =  EnumTipificacaoAutoleitura.Informacao;


        if (environment.regiao == Regiao.SE) {
            request.protocoloSonda = this._userService.getProtocolo.protocoloLegadoStr
            request.geraSSOS = 'S' //fixo
        }
        return request;
    }

    validaAutoleitura(validaAutoleitura: ValidaAutoleituraDTORequest): Observable<ValidaAutoleituraDTOResponse> {
        let endpoint = `${environment.endpoints.autoleitura}ucs/${encodeURIComponent(validaAutoleitura.codigo)}/valida-autoleitura`
        let params = new HttpParams();
        Object.entries(validaAutoleitura).forEach(([variavel, valor]) => {
            if (valor) {
                params = params.append(variavel, valor);
            }
        });
        params = params.delete('codigo');
        return this._http.get<any>(endpoint, { params }).pipe(
            catchError((error) => {
                return throwError(() => error)
            }));
    }

    getDadosValidaAutoleitura(validaAutoleitura: ValidaAutoleituraDTORequest): Promise<ValidaAutoleituraDTOResponse | any> {
        return new Promise((resolve, reject) => {
            this.validaAutoleitura(validaAutoleitura).subscribe({
                next: (data: ValidaAutoleituraDTOResponse) => {
                    resolve(data)
                },
                error: (error: HttpErrorResponse) => {
                    reject(error)
                }
            })
        });
    }

    simularAutoleitura(simulaAutoleitura: SimulaAutoleituraDTORequest): Observable<any> {
        let endpoint = `${environment.endpoints.autoleitura}ucs/${encodeURIComponent(simulaAutoleitura.codigo)}/simula-autoleitura`
        let params = new HttpParams();
        Object.entries(simulaAutoleitura).forEach(([variavel, valor]) => {
            if (valor) {
                params = params.append(variavel, valor);
            }
        });
        params = params.delete('codigo');
        return this._http.get<any>(endpoint, { params }).pipe(catchError((error) => {
            return throwError(() => error);
        }));
    }

    anexarFotoAutoleitura(anexarFotoAutoleitura: AnexarFotoAutoleituraDTORequest): Observable<AnexarFotoAutoleituraDTOResponse> {
        let endpoint = `${environment.endpoints.autoleitura}anexar-foto-autoleitura`
        let body = Object.assign({}, anexarFotoAutoleitura);
        return this._http.post<AnexarFotoAutoleituraDTOResponse>(endpoint, body).pipe(
            catchError((error) => {
                return throwError(() => error);
            }));
    }

    /**
     * Métodos
     */

    definirPeriodoDeLeitura(validaAutoleitura: ValidaAutoleituraDTOResponse): void {
        let dataAtual = new Date();
        if (environment.regiao === Regiao.NE) {
            this.autoleitura.dataInicio = new Date(validaAutoleitura.dataproximaleitura);
            this.autoleitura.dataFim = new Date(validaAutoleitura.dataproximaleitura);
            this.autoleitura.dataFim.setDate(this.autoleitura.dataFim.getDate() + 6); //NOTA: Regra de negócio 34 - Para Nordeste, Período de leitura é de 6 dias.
            this.autoleitura.dentroDoPeriodoDeLeitura = dataAtual >= this.autoleitura.dataInicio && dataAtual <= this.autoleitura.dataFim
            this.deParaAutoleituraNE(validaAutoleitura);
        } else {
            this.autoleitura.dataInicio = new Date(validaAutoleitura.periodoInicio ?? "");
            this.autoleitura.dataFim = new Date(validaAutoleitura.periodoFim ?? "");
            this.autoleitura.dataFim.setDate(this.autoleitura.dataFim.getDate() - 1); //NOTA: Regra de negocio 30 - SUDESTE se for o ultimo dia do periodo de leitura, nao pode prosseguir
            this.autoleitura.dentroDoPeriodoDeLeitura = dataAtual >= this.autoleitura.dataInicio && dataAtual < this.autoleitura.dataFim
            this.autoleitura.fluxo = this.autoleitura.dentroDoPeriodoDeLeitura ? EnumFluxoAutoleitura.Leitura : EnumFluxoAutoleitura.Simulacao;
        }
    }

    deParaAutoleituraNE(validaAutoleitura: ValidaAutoleituraDTOResponse): void {
        let leituras: Array<Leitura> = [];
        validaAutoleitura.registrador?.forEach(elem => {
            let leitura = new Leitura("", this.definirRegistrador(elem.tipoRegistrador));
            leitura.CD = elem.CD;
            leitura.CV = elem.CV;
            leitura.descricaoRegistrador = elem.descricaoRegistrador;
            leitura.valor = elem.valorLeitura?.toString() ?? "";
            leitura.anexo = new BoxAnexo(leitura.tipoRegistrador, false, leitura.tipoRegistrador);
            leituras.push(leitura);
        });
        this.autoleitura.leiturasDoUltimoPeriodo = this.ordenarLeiturasPorRegistrador(leituras);
        this.autoleitura.leituraInformadaMesmoDia = validaAutoleitura.leituraInformadaMesmoDia === 'X' ? true : false;
    }

    deParaLeituraSE(simulaAutoleitura: SimulaAutoleituraDTOResponse): void {
        let leituras: Array<Leitura> = [];
        let historicoFiltrado: Array<LeituraAutoleituraDTOResponse> = this.filtrarHistoricoPorMesMaisRecente(simulaAutoleitura.equipamentoAutoLeitura.listLeituraAutoLeitura);
        for (let leituraDoHistorico of historicoFiltrado) {
            let leitura = new Leitura(leituraDoHistorico.valor.toString(), this.definirRegistrador(leituraDoHistorico.codTipoEspEqp));
            leitura.consumo = leituraDoHistorico.ultimoConsumo;
            leitura.constante = leituraDoHistorico.constante;
            leitura.descricaoRegistrador = `${leituraDoHistorico.espMedidor} ${leituraDoHistorico.desEspLeitura}`;
            leitura.unidadeMedida = leituraDoHistorico.unidadeMedida;
            leitura.media3Meses = leituraDoHistorico.media3Meses;
            leitura.media12Meses = leituraDoHistorico.media12Meses;
            leituras.push(leitura);
        }
        this.autoleitura.leiturasDoUltimoPeriodo = this.ordenarLeiturasPorRegistrador(leituras);
    }

    definirRegistrador(tipoRegistrador: string): string {
        let registrador = parseInt(tipoRegistrador);
        if (registrador == 3) {
            return EnumTiposDeRegistrador.PotenciaAtiva;
        } else if (registrador == 24) {
            return EnumTiposDeRegistrador.PotenciaCorrespondente;
        } else if (registrador == 65) {
            return EnumTiposDeRegistrador.PotenciaReativa
        } else {
            return EnumTiposDeRegistrador.PotenciaAtiva;
        }

    }

    deParaRegistrador(registrador: string, informarTipo: string): string {
        if (registrador === EnumTiposDeRegistrador.PotenciaAtiva) {
            return this.dadosRegistradorPotenciaAtiva(informarTipo);
        } else if (registrador === EnumTiposDeRegistrador.PotenciaCorrespondente) {
            return this.dadosRegistradorPotenciaCorrespondente(informarTipo);
        } else if (registrador === EnumTiposDeRegistrador.PotenciaReativa) {
            return this.dadosRegistradorPotenciaReativa(informarTipo);
        }
        return this.dadosRegistradorPotenciaAtiva(informarTipo);
    }



    dadosRegistradorPotenciaAtiva(informarTipo: string): string {
        if (informarTipo === 'tipo') {
            return '003';
        } else if (informarTipo === 'descricao') {
            return 'Consumo';
        } else {
            return 'CON'
        }
    }

    dadosRegistradorPotenciaCorrespondente(informarTipo: string): string {
        if (informarTipo === 'tipo') {
            return '065';
        } else if (informarTipo === 'descricao') {
            return 'Consumo';
        } else {
            return 'CON'
        }
    }

    dadosRegistradorPotenciaReativa(informarTipo: string): string {
        if (informarTipo === 'tipo') {
            return '024';
        } else if (informarTipo === 'descricao') {
            return 'Ener.Reat.Indutiva';
        } else {
            return 'ERA'
        }
    }

    public converterLeituraParaDTO(leiturasDestePeriodo: Array<Leitura>): Array<LeituraAutoleituraDTOResponse> {
        let leituraAtualizada: Array<LeituraAutoleituraDTOResponse> = JSON.parse(JSON.stringify(this.listLeituraAutoLeitura)) as typeof this.listLeituraAutoLeitura; //deep copy
        for (let leituraDoPeriodo of leiturasDestePeriodo) {
            leituraAtualizada.push(new LeituraAutoleituraDTOResponse(
                leituraDoPeriodo.constante ?? 1,
                new Date().toISOString(),
                new Date().toISOString(),
                0,
                this.deParaRegistrador(leituraDoPeriodo.tipoRegistrador, 'espMedidor'),
                leituraDoPeriodo.valor,
                parseInt(leituraDoPeriodo.valor),
                leituraDoPeriodo.media3Meses ?? 0,
                leituraDoPeriodo.media12Meses ?? 0,
                leituraDoPeriodo.unidadeMedida ?? 'kWh',
                this.deParaRegistrador(leituraDoPeriodo.tipoRegistrador, 'tipo'),
                this.deParaRegistrador(leituraDoPeriodo.descricaoRegistrador ?? '', 'descricao'),
                ''
            ));
        }
        return leituraAtualizada;
    }

    private contarMesesNoHistorico(): number {
        let historicoFiltrado: Array<LeituraAutoleituraDTOResponse> = this.filtrarHistoricoPorRegistrador(this.listLeituraAutoLeitura, 'CON')
        return historicoFiltrado.length;
    }

    public verificarMediaLeiturasDestePeriodo(statusMediaMesesValido: boolean): void {
        if (this.autoleitura.mesesNoHistorico === 0 || !statusMediaMesesValido) {
            this.autoleitura.statusMediaDasLeituras = EnumLeiturasNaMedia.SemDadosSuficientes;
            return;
        }

        let arrayStatusConsumosNaMedia: Array<string> = [];
        let historicoFiltrado: Array<LeituraAutoleituraDTOResponse> = [];

        for (const leitura of this.autoleitura.leiturasDestePeriodo) {
            historicoFiltrado = this.filtrarHistoricoPorRegistrador(this.listLeituraAutoLeitura, this.deParaRegistrador(leitura.tipoRegistrador, 'espMedidor'))
            leitura.statusMedia = this.verificarMedia(leitura, historicoFiltrado);
            arrayStatusConsumosNaMedia.push(leitura.statusMedia);
        }

        this.autoleitura.statusMediaDasLeituras = arrayStatusConsumosNaMedia.includes(EnumLeiturasNaMedia.ForaDaMedia) ? EnumLeiturasNaMedia.ForaDaMedia : EnumLeiturasNaMedia.NaMedia;
    }


    private filtrarHistoricoPorMesMaisRecente(historicoDeLeituras: Array<LeituraAutoleituraDTOResponse>): Array<LeituraAutoleituraDTOResponse> {
        const historicoOrdenado: Array<LeituraAutoleituraDTOResponse> = this.ordenarHistoricoPorDataCrescente(historicoDeLeituras);
        const anoMaisRecente: number = new Date(historicoOrdenado.slice(-1)[0].dataUltimaLeitura).getFullYear();
        const mesMaisRecente: number = new Date(historicoOrdenado.slice(-1)[0].dataUltimaLeitura).getMonth();
        return historicoOrdenado.filter((leitura) => {
            return (
                new Date(leitura.dataUltimaLeitura).getMonth() === mesMaisRecente &&
                new Date(leitura.dataUltimaLeitura).getFullYear() === anoMaisRecente
            )
        });
    }

    private filtrarHistoricoPorRegistrador(historicoDeLeituras: Array<LeituraAutoleituraDTOResponse>, tipoDeRegistrador: string): Array<LeituraAutoleituraDTOResponse> {
        const historicoOrdenado: Array<LeituraAutoleituraDTOResponse> = this.ordenarHistoricoPorDataCrescente(historicoDeLeituras);
        return historicoOrdenado.filter((leitura) => {
            return (leitura.espMedidor === tipoDeRegistrador);
        });
    }

    private ordenarHistoricoPorDataCrescente(historicoDeLeituras: Array<LeituraAutoleituraDTOResponse>): Array<LeituraAutoleituraDTOResponse> {
        return historicoDeLeituras.sort((a, b) => {
            return (a.dataUltimaLeitura > b.dataUltimaLeitura ? NA_ORDEM : FORA_DA_ORDEM);
        });
    }

    private ordenarLeiturasPorRegistrador(leituras: Array<Leitura>): Array<Leitura> {
        return leituras.sort((a, b) => {
            return (a.tipoRegistrador > b.tipoRegistrador ? NA_ORDEM : FORA_DA_ORDEM);
        });
    }

    private verificarMedia(leitura: Leitura, amostragem: Array<LeituraAutoleituraDTOResponse>): string {
        const constante: number = leitura.constante ?? 1;
        if (this.autoleitura.mesesNoHistorico < 12) {
            return ((parseFloat(leitura.consumo ?? "")) <= leitura.media3Meses!) ? EnumLeiturasNaMedia.NaMedia : EnumLeiturasNaMedia.ForaDaMedia;
        } else if (this.autoleitura.mesesNoHistorico >= 12) {
            return ((parseFloat(leitura.consumo ?? "")) <= leitura.media12Meses!) ? EnumLeiturasNaMedia.NaMedia : EnumLeiturasNaMedia.ForaDaMedia;
        }
        return EnumLeiturasNaMedia.NaMedia;
        // }
    }

    private calcularMedia(amostragem: Array<LeituraAutoleituraDTOResponse>): number {
        let soma: number = 0;
        for (const amostra of amostragem) {
            soma += parseFloat(amostra.ultimoConsumo);
        }
        return soma / amostragem.length;
    }

    /**
     * Setters e Getters
     */
    get getFlagLeituraInformadaMesmoDia(): boolean {
        return this.autoleitura.leituraInformadaMesmoDia ?? false;
    }

    set setFlagLeituraInformadaMesmoDia(status: boolean) {
        this.autoleitura.leituraInformadaMesmoDia = status;
    }

    get getFlagSemMaisTentativas(): boolean {
        return this.autoleitura.semMaisTentativasParaLeitura;
    }

    set setFlagSemMaisTentativas(status: boolean) {
        this.autoleitura.semMaisTentativasParaLeitura = status;
    }

    get getListLeituraAutoLeitura(): Array<LeituraAutoleituraDTOResponse> {
        return this.listLeituraAutoLeitura;
    }

    set setListLeituraAutoLeitura(val: Array<LeituraAutoleituraDTOResponse>) {
        this.listLeituraAutoLeitura = val;
        this.autoleitura.mesesNoHistorico = this.contarMesesNoHistorico();
    }

    get getAutoLeituraDTOResponse(): AutoleituraDTOResponse {
        return this.autoLeituraDTOResponse;
    }

    set setAutoLeituraDTOResponse(autoleitura: AutoleituraDTOResponse) {
        this.autoLeituraDTOResponse = autoleitura;
    }
}
