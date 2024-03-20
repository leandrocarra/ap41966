import { Location } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { PathCompleto } from "app/core/enums/servicos";
import { EnumCasoFaltaEnergia, EnumOQueSabeSobreProblemaAvisos, EnumTipificacao } from "app/core/models/falta-de-energia/falta-de-energia";
import { EnumFaltaEnergiaOpcoes, ObjetoGenericoMotivo } from "app/core/models/falta-de-energia/fluxo-falta-de-energia";
import { SubRotasFaltaDeEnergia } from "app/core/models/falta-de-energia/sub-rotas-falta-de-energia";
import { GrupoTensao } from "app/core/models/selecao-de-imoveis/selecao-de-imoveis";
import { CustomSweetAlertService } from "app/core/services/customsweetalert/custom-sweet-alert.service";
import { FaltaDeEnergiaService } from "app/core/services/falta-de-energia/falta-de-energia.service";
import { TipologiaFaltaEnergiaService } from "app/core/services/falta-de-energia/tipologia-falta-de-energia.service";
import { UserService } from "app/core/services/user/user.service";
import { AgenciaVirtualService } from "app/core/services/utils/admin/agencia-virtual.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { take } from "rxjs";

@Component({
    selector: "app-problema",
    templateUrl: "./problema.component.html",
    styleUrls: ["./problema.component.scss"],
})
export class ProblemaComponent {
    grupoTensao: GrupoTensao;
    mobile: boolean;
    problemas: Array<ObjetoGenericoMotivo>;
    mensagemAviso: string;
    problemaEscolhido!: string;

    constructor(
        private _faltaDeEnergiaService: FaltaDeEnergiaService,
        private _location: Location,
        private _router: Router,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _tipologiaService: TipologiaFaltaEnergiaService

    ) {
        window.scrollTo(0, 0);
        this.mensagemAviso = "";
        this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao);
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.problemas = this.montaArrayDeProblemas();
        this.problemaEscolhido = this.problemas.includes(this._faltaDeEnergiaService.fluxoFaltaDeEnergia.problemaEscolhido!) ? this._faltaDeEnergiaService.fluxoFaltaDeEnergia.problemaEscolhido!.key : "";
    }

    @HostListener("window:resize", ["$event"])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    montaArrayDeProblemas(): Array<ObjetoGenericoMotivo> {
        if (this._faltaDeEnergiaService.fluxoFaltaDeEnergia.ondeFaltaEnergia!.key === EnumFaltaEnergiaOpcoes.OscilacaoDeTensao) {
            return this._tipologiaService.getOpcoesOscilacao(environment.regiao);
        }
        return this._tipologiaService.getMotivosVizinhanca(environment.regiao, this.grupoTensao);
    }

    apresentaAlerta(): boolean {
        if ((this.problemaEscolhido === EnumFaltaEnergiaOpcoes.PosteCaido || this.problemaEscolhido === EnumFaltaEnergiaOpcoes.FioPartidoNaRede)) {
            this.mensagemAviso = EnumOQueSabeSobreProblemaAvisos.FioPartido;
            return true;
        }
        return false;
    }

    voltar(): void {
        this._location.back();
    }

    continuar(): void {
        this._faltaDeEnergiaService.fluxoFaltaDeEnergia.problemaEscolhido = this.problemas.find(element => element.key == this.problemaEscolhido);

        if (this._faltaDeEnergiaService.fluxoFaltaDeEnergia.problemaEscolhido!.key === EnumFaltaEnergiaOpcoes.ParteDaUc) {
            // TODO: Implementar aviso
            this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.Avisos]);
        } else {
            this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.DadosContato]);
        }
    }

    definirHoraDaOscilacao(): string {
        let data: string = new Date().toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        return data.slice(-5);
    }
}
