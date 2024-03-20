import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import {
    EnumFluxoAutoleitura,
    EnumLeiturasNaMedia,
    EnumTipificacaoAutoleitura,
    Leitura,
    SubRotasAutoleitura
} from 'app/core/models/autoleitura/autoleitura';
import { LeituraAutoleituraDTOResponse } from 'app/core/models/autoleitura/response/autoleitura-dto';
import { EnumIdTermo } from 'app/core/models/termo-de-adesao/termo-de-adesao';
import { AutoleituraService } from 'app/core/services/autoleitura/autoleitura.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { SolicitacaoEnviadaService } from 'app/core/services/solicitacao-enviada/solicitacao-enviada.service';
import { TermoDeAdesaoService } from 'app/core/services/termo-de-adesao/termo-de-adesao.service';
import { UserService } from 'app/core/services/user/user.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { SolicitacaoContent, SolicitacaoEnviada } from 'app/shared/models/solicitacao-enviada/solicitacao-enviada';
import { take } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { EnumTitulosPadroes } from "../../../../../../core/models/exibir-aviso/exibir-aviso";

@Component({
    selector: 'app-confirmar-autoleitura',
    templateUrl: './confirmar-autoleitura.component.html',
    styleUrls: ['./confirmar-autoleitura.component.scss']
})
export class ConfirmarAutoleituraComponent {
    fluxo: string;
    sudeste: string;
    regiao: string;
    medidor: string;
    leiturasDestePeriodo: Array<Leitura>;
    statusMediaDasLeituras: string;
    linkParaConsumoConsciente: string;
    dadosDoGrafico: any;
    //   leiturasForaDaMedia: string;
    solicitacaoEnviada: SolicitacaoEnviada;
    constructor(
        private _user: UserService,
        private _router: Router,
        private _location: Location,
        private _autoleituraService: AutoleituraService,
        private _solicitacaoEnviadaService: SolicitacaoEnviadaService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _loading: LoadingService,
        private _termoDeAdesaoService: TermoDeAdesaoService
    ) {
        this.fluxo = this._autoleituraService.autoleitura.fluxo;
        this.medidor = this._autoleituraService.autoleitura.medidor;
        this.leiturasDestePeriodo = this._autoleituraService.autoleitura.leiturasDestePeriodo;
        this.statusMediaDasLeituras = this._autoleituraService.autoleitura.statusMediaDasLeituras;
        this.linkParaConsumoConsciente = this._agenciaVirtualService.gerarLinksPorDistribuidora().paginaInstitucionalURL;
        this.dadosDoGrafico = [];
        this.acrescentarLeituraAtualAoGrafico();
        this.solicitacaoEnviada = new SolicitacaoEnviada();
        this.regiao = environment.regiao;
        this.sudeste = Regiao.SE;

    }

    acrescentarLeituraAtualAoGrafico() {
        let leiturasConvertidas = this._autoleituraService.converterLeituraParaDTO(this.leiturasDestePeriodo);
        leiturasConvertidas.forEach((leitura: LeituraAutoleituraDTOResponse) => {
            this.dadosDoGrafico.push(leitura);
        });
        console.log(this.dadosDoGrafico);
    }

    voltar() {
        this._location.back();
    }

    realizaAutoLeitura(): void {
        const autoleituraRequestDTO = this._autoleituraService.requestAutoleitura();
        this._autoleituraService.efetivaAutoleitura(autoleituraRequestDTO).pipe(take(1)).subscribe({
            next: () => {
                this._loading.stop();
                this.cadastrarTermoDeAdesaoAutoleitura();
                this.passarDadosParaSolicitacaoEnviadaService();
                this._solicitacaoEnviadaService.setSolicitacaoEnviada = this.solicitacaoEnviada;
                this.contadorDeLeituras();
                this.navegarParaProximaTela();
            },
            error: (httpErrorResponse: HttpErrorResponse) => {
                if (httpErrorResponse.error?.retorno?.mensagem) {
                    this.redirecionarParaAviso({ titulo: httpErrorResponse.error?.retorno?.mensagem });
                } else {
                    this.redirecionarParaAviso({ titulo: EnumTitulosPadroes.Inesperado});
                }
            }
        });
    }

    confirmarAutoleitura() {
        if(this._autoleituraService.autoleitura.dentroDoPeriodoDeLeitura){
            this.realizaAutoLeitura();
        }else{
            this._router.navigate([PathCompleto.home] );
        }
    }

    cadastrarTermoDeAdesaoAutoleitura(): void {
        this._termoDeAdesaoService.cadastrarTermoDeAdesao(
            EnumIdTermo.Autoleitura,
            EnumTipificacaoAutoleitura.Solicitacao
        );
    }

    passarDadosParaSolicitacaoEnviadaService() {
        const arraySolicitacaoContent: Array<SolicitacaoContent> = this.criarArrayComDadosDaSolicitacao();
        this._solicitacaoEnviadaService.setSolicitacaoEnviada = new SolicitacaoEnviada(
            this._user.getProtocolo.protocoloSalesforceStr,
            arraySolicitacaoContent,
            'Autoleitura registrada com sucesso!',
            '',
            'Informar Autoleitura'
        );
    }

    criarArrayComDadosDaSolicitacao(): Array<SolicitacaoContent> {
        const arraySolicitacaoContent: Array<SolicitacaoContent> = [];
        this._autoleituraService.autoleitura.leiturasDestePeriodo.forEach((leitura) => {
            arraySolicitacaoContent.push(
                new SolicitacaoContent(
                    '',
                    '',
                    'TIPO DE REGISTRADOR',
                    leitura.tipoRegistrador
                ),
                new SolicitacaoContent(
                    'LEITURA',
                    leitura.valor
                ),
                new SolicitacaoContent(
                    'CONSUMO',
                    leitura.consumo + 'kWh'
                )
            );
        });
        return arraySolicitacaoContent;
    }

    contadorDeLeituras() {
        this._autoleituraService.getFlagLeituraInformadaMesmoDia ?
            this._autoleituraService.setFlagSemMaisTentativas = true :
            this._autoleituraService.setFlagLeituraInformadaMesmoDia = true;
    }

    navegarParaProximaTela() {
        if (this.fluxo === EnumFluxoAutoleitura.Leitura) {
            if (this._autoleituraService.autoleitura.statusMediaDasLeituras === EnumLeiturasNaMedia.NaMedia) {
                this._user.isFluxo = false;
                this._router.navigate([PathCompleto.autoleitura, SubRotasAutoleitura.SolicitacaoEnviada]);
            } else {
                this._router.navigate([PathCompleto.autoleitura, SubRotasAutoleitura.AnexarFoto]);
            }
        } else {
            this._router.navigate([PathCompleto.autoleitura]);
        }
    }

    redirecionarParaAviso(queryParams: Object): void {
        this._loading.stop();
        this._router.navigate(
            [PathCompleto.aviso],
            { queryParams: queryParams }
        );
    }

    selecionarTextoDoBotao(): string {
        if (this.fluxo === EnumFluxoAutoleitura.Leitura) return 'ENVIAR AUTOLEITURA';
        else return 'CONCLUIR';
    }
}
