import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PathCompleto } from "app/core/enums/servicos";
import { FluxoFaltaDeEnergia } from "app/core/models/falta-de-energia/falta-de-energia";
import { EnumFaltaEnergiaOpcoes, ObjetoGenerico } from "app/core/models/falta-de-energia/fluxo-falta-de-energia";
import { SubRotasFaltaDeEnergia } from "app/core/models/falta-de-energia/sub-rotas-falta-de-energia";
import { FaltaDeEnergiaService } from "app/core/services/falta-de-energia/falta-de-energia.service";
import { TipologiaFaltaEnergiaService } from "app/core/services/falta-de-energia/tipologia-falta-de-energia.service";
import { UserService } from "app/core/services/user/user.service";

@Component({
    selector: "app-verificar-disjuntor",
    templateUrl: "./verificar-disjuntor.component.html",
    styleUrls: ["./verificar-disjuntor.component.scss"],
})
export class VerificarDisjuntorComponent {
    textoTitulo: string;
    textoSubtitulo: string;
    groupColor: string;
    faltaDeEnergia: FluxoFaltaDeEnergia;
    opcoes: Array<ObjetoGenerico>;
    descricaoProblema: string;
    constructor(
        private _faltaDeEnergiaService: FaltaDeEnergiaService,
        private _location: Location,
        private _router: Router,
        private _user: UserService,
        private _tipologiaservice: TipologiaFaltaEnergiaService
    ) {
        this.textoTitulo = "Falta de Energia";
        this.textoSubtitulo = "Após verificar seu disjuntor, o problema foi resolvido?";
        window.scrollTo(0, 0);
        this.groupColor = this._user.group;
        this.faltaDeEnergia = this._faltaDeEnergiaService.fluxoFaltaDeEnergia;
        this.descricaoProblema = this._faltaDeEnergiaService.fluxoFaltaDeEnergia.problemaEscolhido!.key;
        this.opcoes = this._tipologiaservice.OPCOES_DISJUNTOR;
    }

    voltar(): void {
        this._location.back();
    }

    continuar(): void {
        let objetoEscolhido = this.opcoes.find(element => element.key == this.descricaoProblema);
        if (objetoEscolhido) {
            this._faltaDeEnergiaService.fluxoFaltaDeEnergia.opcoesDisjuntor = objetoEscolhido;
    
            if (this.descricaoProblema === EnumFaltaEnergiaOpcoes.SemEnergia) {
                this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.DisjuntorFuncionando]);
    
            } else {
                this._faltaDeEnergiaService.fluxoFaltaDeEnergia.aviso = objetoEscolhido.key;
                this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.Avisos]);
            }
        }
    }
}
