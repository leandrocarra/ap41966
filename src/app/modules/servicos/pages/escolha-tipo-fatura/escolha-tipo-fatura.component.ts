import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { PathCompleto } from "app/core/enums/servicos";
import { SubRotasFaturaImpressa } from "app/core/models/entrega-de-fatura/sub-rotas-falta-de-energia";
import { FaturaImpressaService } from "app/core/services/fatura-impressa/fatura-impressa.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";

@Component({
  selector: 'app-escolha-tipo-fatura',
  templateUrl: './escolha-tipo-fatura.component.html',
  styleUrls: ['./escolha-tipo-fatura.component.scss']
})
export class EscolhaTipoFaturaComponent {
  mobile: boolean;
  grupoDoUsuario: string;
  textoFaturaImpressa: string;
  textoFaturaDigital: string;
  rotaFaturaDigital: PathCompleto;
  
  constructor(
    private _user: UserService,
    private _router: Router,
    private _selecaoImovelService: SelecaoImovelService,
    private _faturaImpressaService: FaturaImpressaService
  ) {
    this.mobile = configureMenuByWindowSize(window.screen.width);
    this.grupoDoUsuario = this._user.group;
    this._user.breadcrumb = false;
    this.textoFaturaImpressa = 'SEGUIR COM FATURA IMPRESSA';
    this.textoFaturaDigital = 'CADASTRAR FATURA DIGITAL';
    this.rotaFaturaDigital = PathCompleto.faturaDigital;
    this.fluxoUCAtiva();
    this.fluxoFaturaDigitalCadastrada();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  fluxoUCAtiva(): void {
    if ( this._selecaoImovelService.getInformacoesUCSelecionada.situacao?.codigo === 'DS') {
    // this._router.navigate([]); // Navegar para a janela de aviso, conforme implementado em exibir-aviso.service.ts.
    }
  }

  fluxoFaturaDigitalCadastrada(): void {
    if (
      this._selecaoImovelService.getInformacoesUCSelecionada.servicos?.entregaAlternativa === "N" &&
      this._selecaoImovelService.getInformacoesUCSelecionada.servicos?.faturaEmail === "S"
    ) {
      this.fluxoSeguirComFaturaDigitalCadastrada();
    } else {
      this.fluxoCadastrarFaturaNoEmail();
    }
  }

  fluxoSeguirComFaturaDigitalCadastrada(): void {
    this.textoFaturaImpressa = 'CADASTRAR FATURA IMPRESSA';
    this.textoFaturaDigital = 'SEGUIR COM A FATURA DIGITAL';
    this.rotaFaturaDigital = PathCompleto.segundaVia; // Navegar para a tela de Segunda Via de faturas?
  }

  fluxoCadastrarFaturaNoEmail(): void {
    this.rotaFaturaDigital = PathCompleto.faturaDigital;
  }

  faturaDigital(): void {
    this._router.navigate([this.rotaFaturaDigital]);
  }

  faturaImpressa(): void {
    this._router.navigate([PathCompleto.faturaImpressa]);
  }
}
