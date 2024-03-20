import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { ConsultarPixDTORequest, GerarPixDTORequest, TokenPixDTORequest, Valor } from 'app/core/models/pix/request/pix-dto';
import { ConsultarPixDTOResponse, GerarPixDTOResponse, TokenPixDTOResponse, TokenPixJWKSDTOResponse } from 'app/core/models/pix/response/pix-dto';
import { FaturaAbertaDTO, FaturaDTO } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { CodigoDeBarraFatura } from 'app/core/models/segunda-via/segunda-via.model';
import { Observable, catchError, mergeMap, of, throwError } from 'rxjs';
import { LoadingService } from '../customsweetalert/loading.service';
import { SegundaViaService } from '../segunda-via/segunda-via.service';
import { SelecaoImovelService } from '../selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from '../user/user.service';
import { converterDataYMD } from '../utils/neo-utils.service';
import CryptoES from 'crypto-es';

@Injectable({
    providedIn: 'root'
})
export class PixService {
    private storage: Storage = sessionStorage;
    private chaveAES: string = '0123456789123456';
    constructor(
        private _http: HttpClient,
        private _userService: UserService,
        private _selecaoImovelService: SelecaoImovelService,
        private _loadingService: LoadingService,
        private _segundaViaService: SegundaViaService
    ) { }


    /**
     * Parte requisições ↓↓
     */

    tokenPix(tokenPixRequest: TokenPixDTORequest): Observable<TokenPixDTOResponse> {
        tokenPixRequest.token = this.getTokenJWKS.keys[0].n;
        let endpoint = `${environment.endpoints.pix}auth/oauth/token?=${tokenPixRequest.token}`;
        let params = new HttpParams();

        params = params.append('grant_type', tokenPixRequest.grant_type);
        params = params.append('client_id', tokenPixRequest.client_id);
        params = params.append('username', tokenPixRequest.username);
        params = params.append('password', tokenPixRequest.password);
        params = params.append('scope', tokenPixRequest.scope);

        return this._http.post<any>(endpoint, params).pipe(
            mergeMap((response) => response.access_token ? of(response) : throwError(() => response))
        );
    }

    obterTokenJWKS(): Observable<TokenPixJWKSDTOResponse> {
        let endpoint = `${environment.endpoints.pix}auth-server/.well-known/jwks.json`;
        return this._http.get<any>(endpoint, {}).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    gerarPix(codigoDeBarras: string): Observable<GerarPixDTOResponse> {
        let endpoint = `${environment.endpoints.pix}secure/rest/api/v1/gerarPix/`;
        let gerarPixRequest = this.setarDadosGerarPixRequest(codigoDeBarras);
        let body = Object.assign({}, gerarPixRequest);
        return this._http.post<any>(endpoint, body).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    consultarPix(consultarPixRequest: ConsultarPixDTORequest): Observable<ConsultarPixDTOResponse> {
        let endpoint = `${environment.endpoints.pix}secure/rest/api/v1/consultaPix`;
        let body = Object.assign({}, consultarPixRequest)
        return this._http.post<any>(endpoint, body).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    private passarDadosParaPix(dados: CodigoDeBarraFatura): void {
        const faturaAberta = new FaturaAbertaDTO();
        faturaAberta.codbarras = dados.dadosPagamento.codBarras ?? "";
        faturaAberta.numeroBoleto = dados.dadosPagamento.numeroBoleto ?? "";
        faturaAberta.uc = dados.fatura.uc.toString();
        faturaAberta.dataVencimento = dados.fatura.dataVencimento.toLocaleString('pt-br', { day: '2-digit', month: '2-digit', year: 'numeric' });
        faturaAberta.valorEmissao = dados.fatura.valorEmissao.toString();
        faturaAberta.numeroFatura = dados.fatura.numeroFatura.toString();
    }

    /**
     * Métodos para manipular dados para chamada das requisições
     */

    definirLinhaDigitavel(codigoDeBarras: string): string {
        codigoDeBarras = this.cortarCodigoDeBarras(codigoDeBarras);
        codigoDeBarras.trim();
        return this.adequarDadosParaLinhaDigitavel(codigoDeBarras);
    }

    cortarCodigoDeBarras(codBarras: string): string {
        codBarras = codBarras.replace(/\s/g, ""); //Remover espaços entre os intervalos dos números
        let init = 0, final = 11, j = 0;
        let codBarrasParcial = '';
        while (j < 4) {
            codBarrasParcial += codBarras.substring(init, final);
            j++;
            init += 12;
            final += 12;
        }
        return codBarrasParcial;
    }

    adequarDadosParaLinhaDigitavel(dados: string | undefined): string {
        return dados ? dados.replace(/[ .-]/g, '') : '';
    }

    setarDadosGerarPixRequest(codigoDeBarras: string): GerarPixDTORequest {
        let fatura = this.getFaturaSelecionada;
        return new GerarPixDTORequest(
            environment.name,
            environment.canal,
            this._selecaoImovelService.getInformacoesUCSelecionada.codigo,
            this.definirLinhaDigitavel(codigoDeBarras),
            (environment.regiao === Regiao.NE) ? fatura.dataVencimento.toString() : converterDataYMD(fatura.dataVencimento.toString()),
            new Valor(
                (environment.regiao === Regiao.NE) ? fatura.valorEmissao.toString() : (fatura.valorEmissao).replace(".", "").replace(",", "."), //padrão america deixar apenas . para separar centavos
            ),
        )
    }

    definirRequestConsulta(): ConsultarPixDTORequest {
        let fatura = this.getFaturaSelecionada;
        let vencimento = (environment.regiao === Regiao.NE) ? fatura.dataVencimento.toString() : converterDataYMD(fatura.dataVencimento.toString());
        let valor = (environment.regiao === Regiao.NE) ? fatura.valorEmissao.toString() : (fatura.valorEmissao).replace(".", "").replace(",", ".").toString();

        return new ConsultarPixDTORequest(
            this.criptografar(environment.canal),
            this.criptografar(this._selecaoImovelService.getInformacoesUCSelecionada.uc),
            this.criptografar(vencimento),
            new Valor(
                this.criptografar(valor),
            )
        )
    }

    criptografar(val: string): string {
        return CryptoES.AES.encrypt(val, this.chaveAES).toString();
    }

    descriptografar(val: string): string {
        return CryptoES.AES.decrypt(val, this.chaveAES).toString();
    }

    /**
     * Getters e Setters
     */

    set setFaturaSelecionada(fatura: FaturaDTO | FaturaAbertaDTO) {
        this.storage.faturaSelecionada = JSON.stringify(fatura);
    }

    get getFaturaSelecionada(): FaturaDTO | FaturaAbertaDTO {
        return JSON.parse(this.storage.faturaSelecionada);
    }

    set setDadosDoPix(val: GerarPixDTOResponse) {
        this.storage.dadosPix = JSON.stringify(val);
    }

    get getDadosDoPix(): GerarPixDTOResponse {
        return JSON.parse(this.storage.dadosPix ?? null);
    }

    set setTokenJWKS(val: TokenPixJWKSDTOResponse) {
        this.storage.tokenJWKS = JSON.stringify(val)
    }

    get getTokenJWKS(): TokenPixJWKSDTOResponse {
        return JSON.parse(this.storage.tokenJWKS);
    }

    set setTokenPIX(val: TokenPixDTOResponse) {
        this.storage.tokenPix = JSON.stringify(val)
    }

    get getTokenPix(): TokenPixDTOResponse {
        return JSON.parse(this.storage.tokenPix);
    }

}

