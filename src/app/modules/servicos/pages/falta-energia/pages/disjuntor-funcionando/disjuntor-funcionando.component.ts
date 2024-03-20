import { Location } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { PathCompleto } from "app/core/enums/servicos";
import { EnumDisjuntorFuncionandoAvisos, EnumDisjuntorFuncionandoCorpo } from "app/core/models/falta-de-energia/falta-de-energia";
import { EnumFaltaEnergiaOpcoes, ObjetoGenericoMotivo } from "app/core/models/falta-de-energia/fluxo-falta-de-energia";
import { SubRotasFaltaDeEnergia } from "app/core/models/falta-de-energia/sub-rotas-falta-de-energia";
import { GrupoTensao } from "app/core/models/selecao-de-imoveis/selecao-de-imoveis";
import { FaltaDeEnergiaService } from "app/core/services/falta-de-energia/falta-de-energia.service";
import { TipologiaFaltaEnergiaService } from "app/core/services/falta-de-energia/tipologia-falta-de-energia.service";
import { AgenciaVirtualService } from "app/core/services/utils/admin/agencia-virtual.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { take } from "rxjs";

@Component({
  selector: "app-disjuntor-funcionando",
  templateUrl: "./disjuntor-funcionando.component.html",
  styleUrls: ["./disjuntor-funcionando.component.scss"],
})
export class DisjuntorFuncionandoComponent {
  textoTitulo: string;
  textoSubtitulo: string;
  mobile: boolean;
  mensagemAviso: string;
  grupoTensao: GrupoTensao;
  opcoes: Array<ObjetoGenericoMotivo>;
  problemaEscolhido: string;

  constructor(
    private _faltaDeEnergiaService: FaltaDeEnergiaService,
    private _location: Location,
    private _router: Router,
    private _agenciaVirtualService: AgenciaVirtualService,
    private _tipologiaService: TipologiaFaltaEnergiaService

  ) {
    window.scrollTo(0, 0);
    this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao);
    this.mensagemAviso = "";
    this.textoTitulo = EnumDisjuntorFuncionandoCorpo.Titulo;
    this.textoSubtitulo = EnumDisjuntorFuncionandoCorpo.Subtitulo;
    this.mobile = configureMenuByWindowSize(window.screen.width);
    this.problemaEscolhido = this._faltaDeEnergiaService.fluxoFaltaDeEnergia.problemaEscolhido!.key;
    this.opcoes = this._tipologiaService.getMotivosIndividual(environment.regiao, this.grupoTensao);
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  // FIXME: Tornar essa função dinâmica para os demais tipo de avisos.
  apresentaAlerta() {
    if (
      this.problemaEscolhido === EnumFaltaEnergiaOpcoes.PosteCaido ||
      this.problemaEscolhido === EnumFaltaEnergiaOpcoes.FioPartido
    ) {
      this.mensagemAviso = EnumDisjuntorFuncionandoAvisos.PostePadraoCaido;
      return true;
    }
    return false;
  }

  voltar(): void {
    this._location.back();
  }

  continuar(): void {
    this._faltaDeEnergiaService.fluxoFaltaDeEnergia.problemaEscolhido = this.opcoes.find(element => element.key == this.problemaEscolhido);

    this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.DadosContato]);
  }
}
