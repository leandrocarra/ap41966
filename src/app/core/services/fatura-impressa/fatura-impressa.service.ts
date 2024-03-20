import { CancelaEntregaAlternativaDTOResponse,  EnderecoAlternativoValidaDTOResponse, EntregaAlternativaDTOResponse, TaxaEntregaAlternativaDTOResponse } from './../../models/fatura-impressa/response/fatura-impressa-dto';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { DadosDeEndereco, EntregaDaFatura } from "app/core/models/entrega-de-fatura/entrega-da-fatura";
import { CancelaEntregaAlternativaDTORequest, EnderecoAlternativoValidaDTORequest, EntregaAlternativaDTORequest, TaxaEntregaAlternativaDTORequest } from "app/core/models/fatura-impressa/request/fatura-impressa-dto";
import { BehaviorSubject, Observable, catchError, mergeMap, of, throwError } from "rxjs";
import { SelecaoImovelService } from "../selecao-de-imovel/selecao-de-imovel.service";

const TARIFA_REGIAO_SE = 'R$ 2,59';

@Injectable({
  providedIn: 'root'
})
export class FaturaImpressaService {
  entregaDaFaturaSubject: BehaviorSubject<EntregaDaFatura>;
  entregaDaFatura: EntregaDaFatura;

  mockFluxoCC: boolean;


  constructor(
    private _selecaoImovelService: SelecaoImovelService,
    private _http: HttpClient
  ) {
    this.entregaDaFaturaSubject = new BehaviorSubject<EntregaDaFatura>(new EntregaDaFatura());
    this.entregaDaFatura = new EntregaDaFatura();
    this.mockFluxoCC = false;
  }


  /*
    REQUISIÇÕES
  */


  cadastrarEntregaAlternativa(requestDTO: EntregaAlternativaDTORequest): Observable<EntregaAlternativaDTOResponse> {
    let endpoint = `${environment.endpoints.faturaImpressa}/ucs/${requestDTO.codigo}/entrega-alternativa`;
    if (environment.regiao === Regiao.NE){
      //endpoint NE foi criado sem numero de versao
      endpoint = `${environment.endpoints.host}/entrega-fatura/ucs/${requestDTO.codigo}/entrega-alternativa`;
    }
		const body = Object.assign({}, requestDTO);
		return this._http.post<EntregaAlternativaDTOResponse>(endpoint, body).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
		);
	}
  
  descadastrarEntregaAlternativa(requestDTO: CancelaEntregaAlternativaDTORequest): Observable<CancelaEntregaAlternativaDTOResponse> {
		const endpoint = `${environment.endpoints.faturaImpressa}/ucs/${requestDTO.codigo}/cancela-entrega-alternativa`;
		const body = Object.assign({}, requestDTO);
		return this._http.post<CancelaEntregaAlternativaDTOResponse>(endpoint, body).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
		);
	}
  recebeTaxa( taxaEnderecoAlternativo :TaxaEntregaAlternativaDTORequest){

    let endpoint = `${environment.endpoints.faturaImpressa}/ucs/${taxaEnderecoAlternativo.codigo}/taxa-entrega-alternativa`;
    let params = new HttpParams();

    Object.entries(taxaEnderecoAlternativo).forEach(([variavel, valor]) => {
      params = params.append(variavel, valor);
    });

    return this._http.get<TaxaEntregaAlternativaDTOResponse>(endpoint, { params }).pipe(
      catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  enderecoAlternativoValida(enderecoAlternativoValida :EnderecoAlternativoValidaDTORequest){
      let endpoint = `${environment.endpoints.faturaImpressa}/endereco-alternativo-valida`;
      let params = new HttpParams();
  
      Object.entries(enderecoAlternativoValida).forEach(([variavel, valor]) => {
          params = params.append(variavel, valor);
      });
      return this._http.get<EnderecoAlternativoValidaDTOResponse>(endpoint, { params }).pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /*
    MÉTODOS
  */

  limparServico(): void {
    this.entregaDaFatura = new EntregaDaFatura();
  }

  validaTipologia(): string {
    if ('cadastro') {
      return '1032805'
    } else if ('Descadastro') {
      return '1032806'
    } else {
      return '1010201'
    }
  }

  preencheValoresMinhaUC(): void {
    let endereco: DadosDeEndereco = new DadosDeEndereco();
    endereco.cep = this._selecaoImovelService.getInformacoesUCSelecionada.local.cep;
    endereco.logradouro = this._selecaoImovelService.getInformacoesUCSelecionada.local.endereco
    endereco.numero = this._selecaoImovelService.getInformacoesUCSelecionada.local.numero
    endereco.complemento = this._selecaoImovelService.getInformacoesUCSelecionada.local.complementoEndereco
    endereco.bairro = this._selecaoImovelService.getInformacoesUCSelecionada.local.bairro
    endereco.cidade = this._selecaoImovelService.getInformacoesUCSelecionada.local.localidade
    endereco.estado = this._selecaoImovelService.getInformacoesUCSelecionada.local.uf

    this.entregaDaFatura.dadosEndereco = endereco;

  }

  /*
     GETTERS E SETTERS
  */



}