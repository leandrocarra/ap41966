import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { take } from "rxjs";

import { Regiao } from "app/core/enums/regiao";
import { PathCompleto } from "app/core/enums/servicos";
import { FluxoFaltaDeEnergia } from "app/core/models/falta-de-energia/falta-de-energia";
import { EnumFaltaEnergiaOpcoes, EnumTipificacaoInformacao, ObjetoGenerico } from "app/core/models/falta-de-energia/fluxo-falta-de-energia";
import { SubRotasFaltaDeEnergia } from "app/core/models/falta-de-energia/sub-rotas-falta-de-energia";
import { GrupoTensao } from "app/core/models/selecao-de-imoveis/selecao-de-imoveis";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { FaltaDeEnergiaService } from "app/core/services/falta-de-energia/falta-de-energia.service";
import { TipologiaFaltaEnergiaService } from "app/core/services/falta-de-energia/tipologia-falta-de-energia.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";
import { AgenciaVirtualService } from "app/core/services/utils/admin/agencia-virtual.service";

@Component({
    selector: "app-falta-energia",
    templateUrl: "./falta-energia.component.html",
    styleUrls: ["./falta-energia.component.scss"],
})
export class FaltaEnergiaComponent {
    textoTitulo: string;
    textoSubtitulo: string;
    textoTituloRadioButtons: string;
    fluxoFaltaDeEnergia: FluxoFaltaDeEnergia;
    listaOndeFaltaEnergia: Array<ObjetoGenerico>;
    grupoTensao: GrupoTensao;
    ondeFaltaEnergia!: string;

    constructor(
        private _faltaDeEnergiaService: FaltaDeEnergiaService,
        private _selecaoImovelService: SelecaoImovelService,
        private _router: Router,
        private _user: UserService,
        private _tipologiaService: TipologiaFaltaEnergiaService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _loading: LoadingService
    ) {
        window.scrollTo(0,0);

        this.fluxoFaltaDeEnergia = this._faltaDeEnergiaService.fluxoFaltaDeEnergia;
        this.ondeFaltaEnergia = this._faltaDeEnergiaService.fluxoFaltaDeEnergia.ondeFaltaEnergia!.key;
        this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao);
        this._user.isFluxo = false;
        this._user.breadcrumb = true;
        this.textoTitulo = "Falta de Energia";
        this.textoSubtitulo = "Para registrar sua solicitação e melhor podermos te ajudar, pedimos que responda algumas perguntas.";
        this.textoTituloRadioButtons = "Falta de Energia";
        this.listaOndeFaltaEnergia = this._tipologiaService.MOTIVOS_FALTA_DE_ENERGIA;
        this.fluxoFaltaDeEnergia.fluxoIniciado = true;
    }

    distribuidoraAtendeIluminacaoPublica(): boolean {
        console.log(this._selecaoImovelService.getInformacoesUCSelecionada.local.codMunicipio);
        let filtrarCidadesPermitidas: boolean = this._tipologiaService.CODIGOS_DOS_MUNICIPIOS_DE_RESPONSABILIDADE_DA_CONCESSIONARIA.filter(codMunicipio => codMunicipio === this._selecaoImovelService.getInformacoesUCSelecionada.local.codMunicipio).length > 0

        if (this._selecaoImovelService.getInformacoesUCSelecionada.caracteristicas.iluminacao || filtrarCidadesPermitidas
            || environment.regiao == Regiao.SE) {
            return true;
        } else {
            return false;
        }
    }

    cancelar(): void {
        this._router.navigate([PathCompleto.home]);
    }

    continuar(): void {
        this._user.isFluxo = true;
        this._faltaDeEnergiaService.fluxoFaltaDeEnergia.ondeFaltaEnergia = this.listaOndeFaltaEnergia.find(element => element.key == this.ondeFaltaEnergia);

        switch (this.ondeFaltaEnergia) {
            case EnumFaltaEnergiaOpcoes.MinhaUnidadeConsumidora: {
                this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.Passos]);
                break;
            }

            case EnumFaltaEnergiaOpcoes.IluminacaoPublica: {
                this.checarIluminacaoPublica();
                break;
            }

            default: {
                this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.Problema]);
                break;
            }
        }
    }

    checarIluminacaoPublica(): void {
        if (this.distribuidoraAtendeIluminacaoPublica()) {
            this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.IluminacaoPublica]);

        } else {
            this._faltaDeEnergiaService.consultarOcorrencia(EnumTipificacaoInformacao.IluminacaoPublica, false).pipe(take(1)).subscribe(_resposta => { });
            this._faltaDeEnergiaService.fluxoFaltaDeEnergia.aviso = this.ondeFaltaEnergia;
            this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.Avisos]);
        }
    }
}
