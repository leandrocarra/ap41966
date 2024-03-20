import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';
import { Regiao } from 'app/core/enums/regiao';
import { DadosPagamentoDTORequest, GerarURLFlexPagDTORequest, ListaMotivoDTORequest, PdfDTORequest } from 'app/core/models/segunda-via/request/segunda-via-request-dto';
import { EntregaFaturasDTO, FaturaDTO, FaturasDTOResponse } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { CodigoDeBarraFatura, SegundaVia, Status, StatusFatura } from 'app/core/models/segunda-via/segunda-via.model';
import { HeaderMetodo } from 'app/shared/models/header-metodo/header-metodo';
import { SelecaoImovelService } from '../selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from '../user/user.service';
import { MultiloginAcessoService } from '../multilogin-acesso/multilogin-acesso.service';

@Injectable({
	providedIn: 'root'
})
export class SegundaViaService {
	storage: Storage = sessionStorage;
	private _urlFlexPag: string = `https://flexpag-api-neoenergia-hom.flexpag.com/`;
	dadosSegundaVia: SegundaVia
    entregaFaturas: EntregaFaturasDTO;

	constructor(
		private _http: HttpClient,
		private _userService: UserService,
		private _selecaoImovelService: SelecaoImovelService,
		private _multiloginService: MultiloginAcessoService
	) {
		this.dadosSegundaVia = new SegundaVia();
        this.entregaFaturas = new EntregaFaturasDTO();
	}

	/**
	 * Parte requisições ↓↓
	 */

	obterPdf(pdfRequestDTO: PdfDTORequest): Observable<any> {
		let endpoint = `${environment.endpoints.segundaVia}${encodeURIComponent(pdfRequestDTO.numSeqOper)}/pdf`;
		let params = new HttpParams();
		params = params.append('codigo', pdfRequestDTO.codigo);
		params = params.append('protocolo', pdfRequestDTO.protocolo);
		params = params.append('tipificacao', pdfRequestDTO.tipificacao);
		params = params.append('usuario', pdfRequestDTO.usuario);
		params = params.append('canalSolicitante', pdfRequestDTO.canalSolicitante);
		params = params.append('motivo', pdfRequestDTO.motivo);

		if (environment.regiao === Regiao.SE) {
			params = params.append('taxa', pdfRequestDTO.taxa!);
			params = params.append('opcaoSSOS', pdfRequestDTO.opcaoSSOS!);
			params = params.append('protocoloSonda', pdfRequestDTO.protocoloSonda!);
		} else {
			params = params.append('documentoSolicitante', pdfRequestDTO.documentoSolicitante ?? '');
		}

		return this._http.get<any>(endpoint, {
			params
		}).pipe(catchError((error) => { return throwError(() => error) }));
	}

	getEndpointFaturas(byPassActiv: 'X' | '' = ''): Promise<Array<FaturaDTO>> {
		return new Promise((faturas) => {
			this.consultarFaturas(byPassActiv).pipe(take(1)).subscribe({
				next: (faturasResponse: FaturasDTOResponse) => {
					this.setFaturas = faturasResponse.faturas ?? [];
					this.dadosSegundaVia.faturasFiltradas = faturasResponse.faturas ?? [];
					this.dadosSegundaVia.entregaFatura = faturasResponse.entregaFaturas;
                    this.entregaFaturas = faturasResponse.entregaFaturas;
					this.setDadosSegundaVia = this.dadosSegundaVia;
                    this.setEntregaFaturas = this.entregaFaturas;
					this.dadosSegundaVia.unidadeConsumidora = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
					if (environment.regiao === Regiao.NE) {
						this.filtrarPeriodicos();
						this.formartarEnderecoFatura();
					}
					this.anoPorStatus();
					this.ordenarFaturaPorStatus();
					faturas(faturasResponse.faturas ?? []);
				},
				error: (error) => {
					faturas(error);
				}
			});
		});
	}

	/**
	 * Faturas diferentes do tipo PR e CL não devem ser apresentadas no front - NE
	 * Definição válida para MVP1
	 */
	filtrarPeriodicos(): void {
		let faturasFiltrads: Array<FaturaDTO> = [];
		this.getFaturas.forEach(fat => {
			if (fat.tipoFatura?.codigo === "PR" || fat.tipoFatura?.codigo === "CL") {
				faturasFiltrads.push(fat);
			}
		})
		this.setFaturas = faturasFiltrads;
	}

	anoPorStatus(): void {
		let listaStatusFaturas: Array<string> = [];
		let anosPossiveis: Array<string> = [];
		let statusPorAno: Array<string> = [];
		this.dadosSegundaVia.anoStatus = [];
		let statusDaFatura = '';
		let ano: string = '';

		this.getFaturas.forEach((fat, index) => {
			statusDaFatura = fat.statusFatura?.toLowerCase().replace(/\s+/g, '');
			ano = new Date(fat.dataVencimento).getFullYear().toString();

			if (!anosPossiveis.includes(ano)) { // novo ano
				if (statusPorAno.length > 0 && anosPossiveis.length > 0) { // salvar dados do ano anterior
					this.dadosSegundaVia.anoStatus.push({ key: anosPossiveis[anosPossiveis.length - 1], value: statusPorAno })
				}
				anosPossiveis.push(ano); // salvar novo ano
				statusPorAno = [];       // setar status para novo ano
			}

			if (!statusPorAno.includes(this.getStatus(statusDaFatura))) { // evitar add status repetido
				statusPorAno.push(this.getStatus(statusDaFatura));
			}

			if (!listaStatusFaturas.includes(this.getStatus(statusDaFatura))) { // salvar status de todas as faturas
				listaStatusFaturas.push(this.getStatus(statusDaFatura));
			}

			if (index === this.getFaturas.length - 1) { // salvar dados do ultimo ano
				this.dadosSegundaVia.anoStatus.push({ key: anosPossiveis[anosPossiveis.length - 1], value: statusPorAno });
			}
		});
		this.dadosSegundaVia.listaStatusFaturas = listaStatusFaturas;
	}

	ordenarFaturaPorStatus(): void {
		let faturasOrdenadas: Array<FaturaDTO> = [];
		let listaStatus = ["vencida", "avencer", "emprocessamento", "vinculada", "renegociada", "parcialmentepago", "emreserva", "aberto", "pago"];
		for (let status of listaStatus) {
			let statusDaFatura = '';
			this.getFaturas.forEach(fat => {
				statusDaFatura = fat.statusFatura?.toLowerCase().replace(/\s+/g, '');
				if (statusDaFatura == status) {
					faturasOrdenadas.push(fat);
				}
			})
		}
		this.setFaturas = faturasOrdenadas;
	}

	formartarEnderecoFatura(): void {
		let endFormatdo: string = ''
		let enderecoFatura: string = this.dadosSegundaVia.entregaFatura.enderecoEntrega ?? '';

		this.dadosSegundaVia.entregaFatura.enderecoEntrega?.split(" ").forEach(elem => {
			if (elem === enderecoFatura.split(" ")[enderecoFatura.split(" ").length - 1]) { // informar CEP
				endFormatdo += `, ${elem}`
			} else {
				endFormatdo += (elem !== "") ? ` ${elem}` : "," // separar endereco e bairro por vírgula
			}
		})
		this.dadosSegundaVia.entregaFatura.enderecoEntrega = endFormatdo;
	}

    consultarFaturas(byPassActiv: 'X' | ''): Observable<FaturasDTOResponse> {
        const params: HttpParams = new HttpParams()
            .set('codigo', this._selecaoImovelService.getUCSelecionada!.uc)
            .set('documento', this._userService.dadosUser.documento)
            .set('canalSolicitante', environment.canal)
            .set('usuario', environment.USUARIO_UE)
            .set('protocolo', this._userService.getProtocolo.protocoloSalesforceStr)
            .set('tipificacao', '1010602') // fixo
            .set('byPassActiv', byPassActiv)
            .set('opcaoSSOS', environment.regiao === Regiao.SE ? 'S' : '')
            .set('protocoloSonda', environment.regiao === Regiao.SE ? this._userService.getProtocolo.protocoloLegadoStr : '')
            .set('documentoSolicitante', environment.regiao === Regiao.SE ? '' : this._userService.dadosUser.documento);

        const endpoint: string = `${environment.endpoints.segundaVia}ucs/faturas`;

        return this._http.get<FaturasDTOResponse>(endpoint, { params }).pipe(
            mergeMap((response: any) => response?.status != 200 ? of (response) : throwError(() => response))
        );
    }

	obterDadosPagamentos(numeroFatura: string, tipoPagamento: boolean = false): Observable<any> {
		let dadosPagamentoRequestDTO = this.deParaObterDadosPagamentos(numeroFatura);
		let params = new HttpParams();
		params = params.append('codigo', dadosPagamentoRequestDTO.codigo!);
		params = params.append('protocolo', dadosPagamentoRequestDTO.headerMetodo.protocolo!);
		params = params.append('usuario', dadosPagamentoRequestDTO.headerMetodo.usuario);
		params = params.append('canalSolicitante', dadosPagamentoRequestDTO.headerMetodo.canalSolicitante);
		params = params.append('tipificacao', "1010803"); //FIXO

		if (environment.regiao === Regiao.SE) {
			params = params.append('protocoloSonda', dadosPagamentoRequestDTO.headerMetodo.protocoloSonda!);
			params = params.append('geraSsOs', dadosPagamentoRequestDTO.geraSsOs!);
			params = params.append('codCpu', '01') //FIXO
		} else {
			params = params.append('documentoSolicitante', this._userService.dadosUser.documento);
			if (tipoPagamento) {
				params = params.append('tipoPagamento', "1"); //FIXO
			}
		}
		let endpoint = `${environment.endpoints.segundaVia}${encodeURIComponent(dadosPagamentoRequestDTO.numSeqOper)}/dados-pagamento`
		return this._http.get<any>(endpoint, { params }).pipe(catchError((error) => { return throwError(() => error) }));
	}

	deParaObterDadosPagamentos(numeroFatura: string): DadosPagamentoDTORequest {
		let dadosPagamento = new DadosPagamentoDTORequest('', new HeaderMetodo());
		dadosPagamento.numSeqOper = numeroFatura.toString();
		dadosPagamento.codigo = this._selecaoImovelService.getUCSelecionada?.uc;
		dadosPagamento.headerMetodo.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
		dadosPagamento.headerMetodo.canalSolicitante = environment.canal;
		dadosPagamento.headerMetodo.usuario = environment.USUARIO_UE;

		if (environment.regiao === Regiao.SE) {
			dadosPagamento.geraSsOs = "S";
			dadosPagamento.headerMetodo.protocoloSonda = this._userService.getProtocolo.protocoloLegadoStr;
		} else {
			dadosPagamento.headerMetodo.documentoSolicitante = this._userService.dadosUser.documento;
		}
		return dadosPagamento;
	}

	validarFaturaDadosDePagamento(numeroFatura: string): string {
		return (this.getDadosPagamento?.fatura.numeroFatura === numeroFatura) ? (this.getDadosPagamento?.dadosPagamento.codBarras || this.getDadosPagamento?.dadosPagamento.numeroBoleto)  ?? '' : '';
	}

	obterListaMotivo(listaMotivoRequestDTO: ListaMotivoDTORequest): Observable<any> {
		let endpoint = `${environment.endpoints.segundaVia}lista-motivo-segundavia`;
		let params = new HttpParams();
		params = params.append('usuario', listaMotivoRequestDTO.usuario!);
		params = params.append('canalSolicitante', listaMotivoRequestDTO.canalSolicitante!);

		if (environment.regiao === Regiao.SE) {
			params = params.append('tipoOs', 'IF') //FIXO
			params = params.append('subTipoOs', 'W18') //FIXO
		}

		return this._http.get<any>(endpoint, {
			params
		}).pipe(catchError((error) => { return throwError(() => error) }));
	}

	gerarURLFlexPag(gerarURLFlexPag: GerarURLFlexPagDTORequest): Observable<any> {
		let endpoint = `${this._urlFlexPag}v1/consulta-url`;
		let body = Object.assign({}, gerarURLFlexPag);
		return this._http.post<any>(endpoint, body).pipe(
			catchError((error) => {
				return throwError(() => error);
			})
		)
	}

	/**
	 * Getters e Setters
	 */

	get getDadosPagamento(): CodigoDeBarraFatura | null {
		return (this.storage.codigoDeBarraFatura) ? JSON.parse(this.storage.codigoDeBarraFatura) : null;
	}

	set setDadosPagamento(val: CodigoDeBarraFatura) {
		this.storage.codigoDeBarraFatura = JSON.stringify(val);
	}

	get getDadosSegundaVia(): SegundaVia {
		return (this.storage.dadosSegundaVia) ? JSON.parse(this.storage.dadosSegundaVia) : null;
	}

	set setEntregaFaturas(entregaFaturas: EntregaFaturasDTO) {
		this.storage.entregaFaturas = JSON.stringify(entregaFaturas);
	}

	get getEntregaFaturas(): EntregaFaturasDTO {
		return JSON.parse(this.storage.entregaFaturas);
	}

	set setDadosSegundaVia(val: SegundaVia) {
		this.storage.dadosSegundaVia = JSON.stringify(val);
	}

	get getFaturas(): Array<FaturaDTO> {
		return JSON.parse(this.storage.faturas);
	}

	set setFaturas(faturas: Array<FaturaDTO>) {
		this.storage.ultimaAtualizacaoFaturas = new Date().toString();
		this.storage.faturas = JSON.stringify(faturas);
	}


	/**
	 * Métodos
	 */

	getStatus(statusFatura: string): Status {
		return StatusFatura[statusFatura.toLowerCase().replace(/\s/g, '') as Status];
	}

	habilitarOpcoesDePagamento(fatura: FaturaDTO): boolean {
		const verificaStatus: Array<boolean> = [];
		verificaStatus.push(fatura.statusFatura.toLowerCase() !== StatusFatura.pago.toLowerCase());
		verificaStatus.push(fatura.statusFatura.toLowerCase() !== StatusFatura.vinculada.toLowerCase());
		verificaStatus.push(fatura.statusFatura.toLowerCase() !== StatusFatura.emprocessamento.toLowerCase());
		return verificaStatus.includes(false) ? false : true;
	}
}
