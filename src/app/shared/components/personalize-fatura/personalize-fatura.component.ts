import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";

import { PathCompleto } from "app/core/enums/servicos";
import { EntregaFaturasDTO } from "app/core/models/segunda-via/response/segunda-via-response-dto";
import { DataCertaService } from "app/core/services/data-certa/data-certa.service";
import { DebitoAutomaticoService } from "app/core/services/debito-automatico/debito-automatico.service";
import { SegundaViaService } from "app/core/services/segunda-via/segunda-via.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { ExibirAvisoService } from "../../pages/exibir-aviso/exibir-aviso.service";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { DataCertaDTOResponse } from "../../../core/models/data-certa/response/data-certa-dto";
import { take } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import {
    ContaCadastradaDebitoDTOResponse
} from "../../../core/models/debito-automatico/response/debito-automatico-dto";
import { FaturaDigitalService } from "../../../core/services/fatura-digital/fatura-digital.service";
import { Regiao } from "../../../core/enums/regiao";
import { FaturaDigitalDTOResponse } from "../../../core/models/fatura-digital/response/fatura-digital-dto";
import { STATUS_POSITIVOS_POSSIVEIS } from "../../../core/enums/unidade-consumidora";

@Component({
    selector: "app-personalize-fatura",
    templateUrl: "./personalize-fatura.component.html",
    styleUrls: ["./personalize-fatura.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class PersonalizeFaturaComponent implements OnInit {
    isLoadingDataDeVencimento: boolean = true;
    isLoadingEntregaDaFatura: boolean = true;
    dataDeVencimento!: string;
    opcaoPagamento!: string;
    rotaEntregaDaFatura!: PathCompleto;
    faturaDigitalWhatsapp!: boolean;
    enderecoDaEntrega!: string;
    entregaDaFatura!: string;

    constructor(
        private _dataCertaService: DataCertaService,
        private _selecaoImovelService: SelecaoImovelService,
        private _debitoAutomaticoService: DebitoAutomaticoService,
        private _segundaViaService: SegundaViaService,
        private _router: Router,
        private _exibirAvisoService: ExibirAvisoService,
        private _faturaDigitalService: FaturaDigitalService
    ) {
    }

    ngOnInit(): void {
        this.fetchDataDeVencimento();
        this.fetchMetodoDePagamento();
        this.fetchEntregaDaFatura();
    }

    fetchDataDeVencimento(): void {
        this._dataCertaService.obterDataCerta()
            .pipe(take(1))
            .subscribe({
                next: (response: DataCertaDTOResponse): void => {
                    this.dataDeVencimento = response?.dataAtual.toLowerCase()?.includes('regulada') ?
                        'Sem data fixa':
                        response?.dataAtual;
                    this.isLoadingDataDeVencimento = false;
                },
                error: (httpError: HttpErrorResponse): void => {

                }
            });
    }

    fetchMetodoDePagamento(): void {
        this._debitoAutomaticoService.obterDebitoAutomatico()
            .pipe(take(1))
            .subscribe({
                next: (response: ContaCadastradaDebitoDTOResponse): void => {
                    if (this._selecaoImovelService.getUCSelecionada?.isGrupo === 'X' || response?.retorno?.numero === '135') { //Conta coletiva filha não tem acesso ao serviçco de débito automático
                        this.opcaoPagamento = "Boleto bancário"; //Fixo
                    } else {
                        this.opcaoPagamento = STATUS_POSITIVOS_POSSIVEIS.includes(response.debitoAutomatico) ? "Débito automático" : "Boleto bancário";
                    }
                },
                error: (httpError: HttpErrorResponse): void => {

                }
            })
    }

    fetchEntregaDaFatura(): void {
        if (environment.regiao === Regiao.SE) {
            this._faturaDigitalService.consultarFaturaDigitalSE().then((response: FaturaDigitalDTOResponse): void => {
                this.definirTipoDaentrega(response);
            })
        } else {
            this._faturaDigitalService.validarFaturaDigitalNE().then((response: FaturaDigitalDTOResponse): void => {
                this.definirTipoDaentrega({ ...response, possuiFaturaDigital: response.PossuiFaturaDigital ?? '' });
            });
        }
    }

    definirTipoDaentrega(faturaDigitalResponse: FaturaDigitalDTOResponse): void {
        this.faturaDigitalWhatsapp = faturaDigitalResponse.emailFatura?.includes('whatsapp') ?? false;
        this.entregaDaFatura =
            STATUS_POSITIVOS_POSSIVEIS.includes(faturaDigitalResponse.possuiFaturaDigital ?? '') ?
                'Fatura digital' :
                'Fatura impressa';

        if (this.faturaDigitalWhatsapp) {
            this.enderecoDaEntrega = faturaDigitalResponse.emailFatura?.replace("@faturadigital.whatsapp", "") ?? "";
        } else if (this.entregaDaFatura === 'Fatura digital') {
            this.enderecoDaEntrega = faturaDigitalResponse.emailFatura?.slice(2) ?? "";
        } else {
            this.enderecoDaEntrega = STATUS_POSITIVOS_POSSIVEIS.includes(faturaDigitalResponse.faturaEntregaAlternativa ?? '') ?
                'Endereço alternativo' :
                'Endereço do imóvel';
        }

        this.rotaEntregaDaFatura = this.checarRotaEntrega();
    }

    navigateTo(option: string): void {
        if (option === 'vencimento') {
            this._router.navigate([PathCompleto.alterarDataDeVencimento]);
        } else if (option === 'fatura') {
            this._router.navigate([this.rotaEntregaDaFatura]);
        } else if (option === 'pagamento') {
            this._router.navigate([PathCompleto.debitoAutomatico]);
        }
    }

    checarRotaEntrega(): PathCompleto {
        this.isLoadingEntregaDaFatura = false;
        if (this.entregaDaFatura.includes('digital')) {
            return PathCompleto.faturaDigital;
        } else {
            return PathCompleto.escolhaTipoFatura;
        }
    }
}
