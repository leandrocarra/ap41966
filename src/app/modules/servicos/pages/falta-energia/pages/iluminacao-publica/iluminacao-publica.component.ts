import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { PathCompleto } from "app/core/enums/servicos";
import { EnumIluminacaoPublicaCorpo } from "app/core/models/falta-de-energia/falta-de-energia";
import { ObjetoGenericoMotivo } from "app/core/models/falta-de-energia/fluxo-falta-de-energia";
import { SubRotasFaltaDeEnergia } from "app/core/models/falta-de-energia/sub-rotas-falta-de-energia";
import { GrupoTensao } from "app/core/models/selecao-de-imoveis/selecao-de-imoveis";
import { FaltaDeEnergiaService } from "app/core/services/falta-de-energia/falta-de-energia.service";
import { TipologiaFaltaEnergiaService } from "app/core/services/falta-de-energia/tipologia-falta-de-energia.service";
import { AgenciaVirtualService } from "app/core/services/utils/admin/agencia-virtual.service";
import { take } from "rxjs";

@Component({
    selector: "app-iluminacao-publica",
    templateUrl: "./iluminacao-publica.component.html",
    styleUrls: ["./iluminacao-publica.component.scss"],
})
export class IluminacaoPublicaComponent {
    textoTitulo: string;
    textoSubtitulo: string;
    grupoTensao: GrupoTensao;

    problemasIluminacao: Array<ObjetoGenericoMotivo>;
    descricaoProblema: string;

    constructor(
        private _faltaDeEnergiaService: FaltaDeEnergiaService,
        private _location: Location,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _router: Router,
        private _tipologiaService: TipologiaFaltaEnergiaService
    ) {
        window.scrollTo(0, 0);

        this.textoTitulo = EnumIluminacaoPublicaCorpo.Titulo;
        this.textoSubtitulo = EnumIluminacaoPublicaCorpo.Subtitulo;
        this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao);
        this.descricaoProblema = this._faltaDeEnergiaService.fluxoFaltaDeEnergia.problemaEscolhido!.key;
        this.problemasIluminacao = this._tipologiaService.getOpcoesIluminacaoPublica(environment.regiao);
    }

    continuar(): void {
        this._faltaDeEnergiaService.fluxoFaltaDeEnergia.problemaEscolhido = this.problemasIluminacao.find(element => element.key == this.descricaoProblema);

        this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.DadosContato]);
    }

    voltar(): void {
        this._location.back();
    }
}
