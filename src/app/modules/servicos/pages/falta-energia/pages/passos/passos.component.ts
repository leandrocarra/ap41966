import { Location } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { PathCompleto } from "app/core/enums/servicos";
import { Passo } from "app/core/models/falta-de-energia/falta-de-energia";
import { SubRotasFaltaDeEnergia } from "app/core/models/falta-de-energia/sub-rotas-falta-de-energia";
import { GrupoTensao } from "app/core/models/selecao-de-imoveis/selecao-de-imoveis";
import { UserService } from "app/core/services/user/user.service";
import { AgenciaVirtualService } from "app/core/services/utils/admin/agencia-virtual.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { take } from "rxjs";

@Component({
  selector: "app-passos",
  templateUrl: "./passos.component.html",
  styleUrls: ["./passos.component.scss"],
})
export class PassosComponent {
  grupoTensao: GrupoTensao;
  passos: Array<Passo>;
  mobile: boolean;

  textoTitulo: string;
  textoSubtitulo: string;

  constructor(
    private _userService: UserService,
    private _location: Location,
    private _router: Router,
    private _agenciaVirtualService: AgenciaVirtualService
  ) {
    this._userService.isFluxo = true;
    window.scrollTo(0, 0);
    this.mobile = configureMenuByWindowSize(window.screen.width);
    this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao);

    this.textoTitulo = "Falta de Energia";
    this.textoSubtitulo = "Antes de seguir com a solicitação, verifique o seu disjuntor.";

    this.passos = [
      new Passo("Passo 1", "Coloque a chave do disjuntor na posição desligada."),
      new Passo("Passo 2", "Coloque a chave do disjuntor na posição ligada."),
      new Passo("Passo 3", "Verifique se as luzes voltaram a funcionar."),
      new Passo("Passo 4", "Verifique se a chave desligou sozinha. Isso quer dizer que o disjuntor está danificado."),
    ];
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  voltar(): void {
    this._location.back();
  }

  continuar(): void {
    this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.VerificarDisjuntor]);
  }
}
