import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { DadosBandeiraTarifaria, EnumBandeiraCodigo, EnumBandeiraCor, EnumBandeiraMensagem, EnumBandeiraTipo } from 'app/core/models/bandeira-tarifaria/bandeira-tarifaria';
import { BandeiraTarifariaDTORequest } from 'app/core/models/bandeira-tarifaria/request/bandeira-tarifaria.dto';
import { BandeiraTarifariaDTOResponse } from 'app/core/models/bandeira-tarifaria/response/bandeira-tarifaria.dto';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { BehaviorSubject, Observable, mergeMap, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandeiraTarifariaService {
    public dadosBandeiraTarifaria: BehaviorSubject<DadosBandeiraTarifaria>;
    constructor(
        private _http: HttpClient,
        private _loadingService: LoadingService
    ) {
        this.dadosBandeiraTarifaria = new BehaviorSubject(new DadosBandeiraTarifaria());
    }

    private bandeiraTarifaria(requestDTO: BandeiraTarifariaDTORequest): Observable<BandeiraTarifariaDTOResponse> {
        let endpoint = environment.endpoints.bandeiraTarifaria + '/bandeira-tarifaria';
        let params = new HttpParams();
        Object.entries(requestDTO).forEach(([atributo, valor]) => {
            params = params.append(atributo, valor);
        });
        return this._http.get<BandeiraTarifariaDTOResponse>(endpoint, { params }).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
        );
    }

    obterBandeiraTarifaria(): void {
        this._loadingService.start();
        let requestDTO = this.definirDadosParaRequisicao();
        // TO DO: Remover condição abaixo referente a ELEKTRO, após implementação do endpoint de Bandeira Tarifária no WSO2 SE.
        if(environment.name === 'ELEKTRO'){
            setTimeout(() => {
                this._loadingService.stop();
                this.dadosBandeiraTarifaria.next(this.definirTipo("VD", this.formatarMesReferencia("01/2024")));
            }, 2000);
        }else{
            this.bandeiraTarifaria(requestDTO).subscribe({
                next: (responseDTO) => {
                    this._loadingService.stop();
                    this.dadosBandeiraTarifaria.next(this.definirTipo(responseDTO.bandeiraTarifaria[0].bandeira, this.formatarMesReferencia(responseDTO.bandeiraTarifaria[0].mesReferencia)));
                },
                error: () => {
                    this._loadingService.stop();
                    this.dadosBandeiraTarifaria.next(this.definirTipo('ERRO', ''));
                }
            });
        }
    }

    private definirDadosParaRequisicao(): BandeiraTarifariaDTORequest {
        let requestDTO = new BandeiraTarifariaDTORequest();
        requestDTO.usuario = environment.USUARIO_UE;
        requestDTO.canalSolicitante = environment.canal;
        return requestDTO;
    }

    private definirTipo(bandeira: string, mesReferencia: string): DadosBandeiraTarifaria {
        switch (bandeira) {
            case EnumBandeiraCodigo.EscassezHidrica1:
            case EnumBandeiraCodigo.EscassezHidrica2:
                return {
                    tipo: EnumBandeiraTipo.Preta,
                    cor: EnumBandeiraCor.Preta,
                    mensagem: EnumBandeiraMensagem.Preta,
                    mesReferencia: mesReferencia
                }
            case EnumBandeiraCodigo.VermelhaDois1:
            case EnumBandeiraCodigo.VermelhaDois2:
                return {
                    tipo: EnumBandeiraTipo.Vermelha2,
                    cor: EnumBandeiraCor.Vermelha2,
                    mensagem: EnumBandeiraMensagem.Vermelha2,
                    mesReferencia: mesReferencia
                }
            case EnumBandeiraCodigo.VermelhaUm1:
            case EnumBandeiraCodigo.VermelhaUm2:
                return {
                    tipo: EnumBandeiraTipo.Vermelha1,
                    cor: EnumBandeiraCor.Vermelha1,
                    mensagem: EnumBandeiraMensagem.Vermelha1,
                    mesReferencia: mesReferencia
                }
            case EnumBandeiraCodigo.Amarela1:
            case EnumBandeiraCodigo.Amarela2:
                return {
                    tipo: EnumBandeiraTipo.Amarela,
                    cor: EnumBandeiraCor.Amarela,
                    mensagem: EnumBandeiraMensagem.Amarela,
                    mesReferencia: mesReferencia
                }
            case EnumBandeiraCodigo.Verde1:
            case EnumBandeiraCodigo.Verde2:
                return {
                    tipo: EnumBandeiraTipo.Verde,
                    cor: EnumBandeiraCor.Verde,
                    mensagem: EnumBandeiraMensagem.Verde,
                    mesReferencia: mesReferencia
                }
            default:
                return {
                    tipo: EnumBandeiraTipo.Erro,
                    cor: '',
                    mensagem: EnumBandeiraMensagem.Erro,
                    mesReferencia: ''
                }
        }
    }

    private formatarMesReferencia(mesReferencia: string): string {
        const [mes, ano] = mesReferencia.split('/');
        const data = new Date(Number(ano), Number(mes) - 1);
        const mesFormatado = data.toLocaleString('pt-BR', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase());
        return `${mesFormatado} ${ano}`;
    }
}
