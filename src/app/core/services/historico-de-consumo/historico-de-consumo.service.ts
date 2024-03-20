
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ConsumosDTOResponse, LeituraDeConsumoDTO } from 'app/core/models/hitorico-de-consumo/response/historico-de-consumo-dto';

import { LoadingService } from '../customsweetalert/loading.service';
import { UserService } from '../user/user.service';

import { ConsumosDTORequest } from 'app/core/models/hitorico-de-consumo/request/historico-de-consumo-dto';
import { SelecaoImovelService } from '../selecao-de-imovel/selecao-de-imovel.service';
import { Regiao } from 'app/core/enums/regiao';


@Injectable({
	providedIn: 'root'
})
export class HistoricoDeConsumoService {
	storage: Storage = sessionStorage;
    consumos: ConsumosDTOResponse;

	constructor(
		public loading: LoadingService,
		private _http: HttpClient,
		private _user: UserService,
        private _selecaoImovelService: SelecaoImovelService,
	) {
        this.consumos = new ConsumosDTOResponse();
	}

    getDataChart() {
        const ano = this.getHistoricoConsumo.historicoConsumo.slice()[0].mesReferencia.toString();
        const anoArray = ano.split("/");
        const anoFinal = anoArray.reverse()[0];
        return anoFinal;
    }

	obterMaiorLeitura(historico: Array<LeituraDeConsumoDTO>) {
		let maiorLeitura: LeituraDeConsumoDTO;
        let filterConsumo = []
        for (let index = 0; index < historico.length; index++) {
            const date = historico[index].mesReferencia.toString().split('/')[1]
            const dateIndex = historico[0].mesReferencia.toString().split('/')[1]
            if (date === dateIndex) {
                filterConsumo.push(historico[index])
            }
        };
        let kWh = [];
        for (let index = 0; index < filterConsumo.length; index++) {
            kWh.push(parseInt(filterConsumo[index].consumoKw, 10))
        };
        let maior: any = kWh[0];
        for (let index = 0; index < kWh.length; index++) {
            if (kWh[index] > maior) {
                maior = kWh[index];
            }
        };
        let filtro
        for (let index = 0; index < filterConsumo.length; index++) {
            const consumo = parseInt(filterConsumo[index].consumoKw, 10 )
            if (maior === consumo) {
                filtro = filterConsumo[index]
            }
        };
        maiorLeitura = filtro as LeituraDeConsumoDTO
		return maiorLeitura;
	}

	obterMenorLeitura(historico: Array<LeituraDeConsumoDTO>) {
		let menorLeitura: LeituraDeConsumoDTO;
        let filterConsumo = []
        for (let index = 0; index < historico.length; index++) {
             filterConsumo.push(historico[index]);
        };
        let kWh = [];
        for (let index = 0; index < filterConsumo.length; index++) {
            kWh.push(parseInt(filterConsumo[index].consumoKw, 10))
        }
        let menor: any = kWh[0];
        for (let index = 0; index < kWh.length; index++) {
            if (kWh[index] < menor) {
                menor = kWh[index];
            }
        }
        let filtro
        for (let index = 0; index < filterConsumo.length; index++) {
            const consumo = parseInt(filterConsumo[index].consumoKw, 10 )
            if (menor === consumo) {
                filtro = filterConsumo[index];
            }
        };
        menorLeitura = filtro as LeituraDeConsumoDTO
		return menorLeitura;
	}

	obterUltimaLeitura(): LeituraDeConsumoDTO {
		return this.getHistoricoConsumo.historicoConsumo.slice(0)[0];
	}

	obterPenultimaLeitura(): LeituraDeConsumoDTO {
		return this.getHistoricoConsumo.historicoConsumo.slice(-2)[0];
	}

	calcularDiferencaPercentual(consumo: string): number {
        const toNumber:number = parseInt(consumo, 10);
        const consumoKw:number = parseInt(this.obterUltimaLeitura().consumoKw, 10);
		let retornoArredondado = Math.abs((1 - toNumber / consumoKw) * 100);
		retornoArredondado = Math.ceil(retornoArredondado * 100) / 100;
		return retornoArredondado;
	}

    gerarCodigoValido(requestDTO: ConsumosDTORequest): Observable<ConsumosDTOResponse> {
        const codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        const anoAtual = new Date().getFullYear();

        const data  = `${anoAtual - 5}-12-01`;
        const canalSolicitante = environment.canal;
        const usuario = environment.USUARIO_UE;

        const dataInicioPeriodoCalc = environment.regiao === Regiao.NE ? data : '';
        const dataFimPeriodoCalc = '';
        const statusFatura = '';
        const protocoloSonda = this._user.getProtocolo.protocoloLegadoStr;
        const codCliente = '';
        const opcaoSSOS = '';
        const dataInicioVencFat = data;
        const dataFimVencFat = '';
        const protocolo = this._user.getProtocolo.protocoloSalesforceStr;
        const atividade = '';
        const tipificacao = '10399055';
        const documentoSolicitante = this._user.dadosUser.documento;
        const dataCriaAtividade = '';
        const byPassAtiv = 'X';

        requestDTO = new ConsumosDTORequest(
            canalSolicitante,
            usuario,
            dataInicioPeriodoCalc,
            dataFimPeriodoCalc,
            statusFatura,
            protocoloSonda,
            codCliente,
            opcaoSSOS,
            dataInicioVencFat,
            dataFimVencFat,
            protocolo,
            atividade,
            tipificacao,
            documentoSolicitante,
            dataCriaAtividade,
            byPassAtiv
        );

        let params = new HttpParams();

        Object.entries(requestDTO).forEach(([variavel, valor]) => {
            if (valor != '') {
                params = params.append(variavel, valor);
            }
        });
        const endpoint = `${environment.endpoints.historicoConsumo}${codigo}/consumos`;

        return this._http.get<ConsumosDTOResponse>(endpoint, { params }).pipe(
            map((response) => response)
        );
	}

    set setHistoricoConsumo(leituraConsumo: ConsumosDTOResponse) {
        this.storage.historicoConsumo = JSON.stringify(leituraConsumo);
    }

    get getHistoricoConsumo(): ConsumosDTOResponse {
        return JSON.parse(this.storage.historicoConsumo);
    }

	get getDataHistorico(): Array<LeituraDeConsumoDTO> {
        let arrayBranco: Array<LeituraDeConsumoDTO> = [];
        let consumo: Array<LeituraDeConsumoDTO> = this.getHistoricoConsumo.historicoConsumo

        for (let index = 0; index < consumo.length; index++) {
            const element = consumo[index];
            arrayBranco.push(element);
        }

		return arrayBranco;
	}

	set setDataHistorico(val: Array<LeituraDeConsumoDTO>) {
		if (!val) this.storage.removeItem("data_historico");
		else this.storage.data_historico = JSON.stringify(val);
	}

    historicoresetJson() {
        const Json = {
            "dataPagamento": "00/00/0000",
            "dataVencimento": "00/00/0000",
            "dataLeitura": "00/00/0000",
            "consumoKw": "0",
            "mesReferencia": "0",
            "numeroLeitura": " 0",
            "tipoLeitura": "01",
            "dataInicioPeriodoCalc": "00/00/0000",
            "dataFimPeriodoCalc": "00/00/0000",
            "dataProxLeitura": "00/00/0000",
            "valorFatura": "00/00/0000",
            "situacaoFatura": "AB",
            "origem": "FAT",
            "numeroFatura": "0",
            "statusFatura": "",
            "indicativoCustoDisponibilidade": null,
            "indicativoMedia": null,
            "mensagemDisponibilidadeMedia": null,
            "mediaDiaria": "0"
        }
        return Json
    }
}

