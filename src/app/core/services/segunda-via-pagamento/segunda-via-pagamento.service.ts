import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { FaturaSimplificadaDTORequest } from 'app/core/models/segunda-via-pagamento/request/segunda-via-pagamento-dto';
import { FaturaSimplificadaDTO, FaturaSimplificadaDTOResponse } from 'app/core/models/segunda-via-pagamento/response/segunda-via-pagamento-dto';
import { CodigoTipoFatura, FluxoSegundaViaPagamento, UCCondensada } from 'app/core/models/segunda-via-pagamento/segunda-via-pagamento';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SegundaViaPagamentoService {
    fluxoSegundaViaPagamento: FluxoSegundaViaPagamento;
    faturaRequestDTO: FaturaSimplificadaDTORequest;
    faturasResponseDTO: FaturaSimplificadaDTOResponse;
    faturasUnicaUCResponseDTO: FaturaSimplificadaDTOResponse;
    constructor(
        private _http: HttpClient
    ) {
        this.fluxoSegundaViaPagamento = new FluxoSegundaViaPagamento();
        this.faturaRequestDTO = new FaturaSimplificadaDTORequest();
        this.faturasResponseDTO = new FaturaSimplificadaDTOResponse();
        this.faturasUnicaUCResponseDTO = new FaturaSimplificadaDTOResponse();
    }

    faturasSimplificada(requestDTO: FaturaSimplificadaDTORequest): Observable<FaturaSimplificadaDTOResponse> {
		const endpoint = `${environment.endpoints.areaNaoLogada}/faturas-simplificada`;
        let params = new HttpParams();
        Object.entries(requestDTO).forEach(([atributo, valor]) => {
            params = params.append(atributo, valor);
        });
		return this._http.get<FaturaSimplificadaDTOResponse>(endpoint, { params }).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
		);
	}

    formatarDataParaAnoMesDia(input: string): string {
        let output: Array<string> = [];
        output.push(input.slice(4));
        output.push(input.slice(2,4));
        output.push(input.slice(0,2));
        return output.join('-');
    }

    condensarListaDeUCs(faturasAbertas: Array<FaturaSimplificadaDTO>): Array<UCCondensada> {
        const listaDeUCs: Array<UCCondensada> = [];
        faturasAbertas.forEach((fatura) => {
            listaDeUCs.push(new UCCondensada(fatura.uc, fatura.endereco));
        })
        const ucsFiltradas: Array<UCCondensada> = [];
        listaDeUCs.filter((uc) => {
            let index = ucsFiltradas.findIndex((item) => {
                return (item.numeroUc === uc.numeroUc && item.endereco === uc.endereco);
            });
            if (index <= -1) {
                ucsFiltradas.push(uc);
            }
            return null;
        });
        return ucsFiltradas;
    }

    filtrarFaturasPorUCSelecionada(faturasAbertas: Array<FaturaSimplificadaDTO>, ucSelecionada: UCCondensada): Array<FaturaSimplificadaDTO> {
        const faturasFiltradas = faturasAbertas.filter((fatura) => {
            return (fatura.uc === ucSelecionada.numeroUc && fatura.endereco === ucSelecionada.endereco)
        });
        return faturasFiltradas;
    }

    filtrarUCs(listaDeUCs: Array<UCCondensada>, ucDesejada: string): UCCondensada {
        let ucParaRetorno: UCCondensada = new UCCondensada();
        let ucCortada = ucDesejada.replace(/^(0+)/g, '');
        ucCortada = ucCortada.slice(0, 2) + ucCortada.slice(-2, ucCortada.length);
        listaDeUCs.every((uc) => {
            let semZerosIniciaisEAsteriscos = uc.numeroUc.replace(/^0+/g, '');
            semZerosIniciaisEAsteriscos = semZerosIniciaisEAsteriscos.replace(/\*/g, '');
            if (ucCortada === semZerosIniciaisEAsteriscos) {
                ucParaRetorno = uc;
                return false;
            } else {
                return true;
            }
        });
        return ucParaRetorno;
    }

    filtrarFaturaPorTipo(listaDeFaturas: Array<FaturaSimplificadaDTO>): Array<FaturaSimplificadaDTO> {
        return listaDeFaturas.filter((fatura) => {
            return (
                fatura.tipoFatura.codigo === CodigoTipoFatura.Periodica ||
                fatura.tipoFatura.codigo === CodigoTipoFatura.Coletiva
            );
        })
    }

    ordenarFaturasPorStatus(listaDeFaturas: Array<FaturaSimplificadaDTO>): Array<FaturaSimplificadaDTO> {
        let faturasOrdenadas: Array<FaturaSimplificadaDTO> = [];
        let listaStatus = ["vencida", "avencer", "emprocessamento", "vinculada", "renegociada", "parcialmentepago", "emreserva", "aberto", "pago"];
        for (let status of listaStatus) {
            let statusDaFatura = '';
            listaDeFaturas.forEach(fatura => {
                statusDaFatura = fatura.statusFatura?.toLowerCase().replace(/\s+/g,'');
                if (statusDaFatura === status) {
                    faturasOrdenadas.push(fatura);
                }
            });
        }
        return faturasOrdenadas;
    }

    tratarFaturasParaExibicao(): Array<FaturaSimplificadaDTO> {
        let faturasFiltradas: Array<FaturaSimplificadaDTO>;
        faturasFiltradas = this.fluxoSegundaViaPagamento.faturasFiltradas;
        faturasFiltradas = this.filtrarFaturaPorTipo(faturasFiltradas);
        faturasFiltradas = this.ordenarFaturasPorStatus(faturasFiltradas);
        return faturasFiltradas;
    }
}
