import { Location } from "@angular/common";
import { AfterViewInit, Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { PathCompleto } from "app/core/enums/servicos";
import { Aviso } from "app/core/models/falta-de-energia/falta-de-energia";
import { EnumFaltaEnergiaOpcoes } from "app/core/models/falta-de-energia/fluxo-falta-de-energia";
import { SubRotasFaltaDeEnergia } from "app/core/models/falta-de-energia/sub-rotas-falta-de-energia";
import { GrupoTensao } from "app/core/models/selecao-de-imoveis/selecao-de-imoveis";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { FaltaDeEnergiaService } from "app/core/services/falta-de-energia/falta-de-energia.service";
import { AgenciaVirtualService } from "app/core/services/utils/admin/agencia-virtual.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { take } from "rxjs";
import { UserService } from "../../../../../../core/services/user/user.service";

@Component({
    selector: "app-avisos",
    templateUrl: "./avisos.component.html",
    styleUrls: ["./avisos.component.scss"],
})
export class AvisosComponent implements AfterViewInit {
    grupoTensao: GrupoTensao;
    aviso: Aviso;
    exibirBotoes: boolean;
    mobile: boolean;
    protocolo: string;

    constructor(
        private _user: UserService,
        private _location: Location,
        private _router: Router,
        private _faltaDeEnergiaService: FaltaDeEnergiaService,
        private _loading: LoadingService,
        private _agenciaVirtualService: AgenciaVirtualService
    ) {
        window.scrollTo(0, 0);
        this.grupoTensao = this._agenciaVirtualService.grupoTensao.pipe(take(1)).subscribe((grupoTensao: GrupoTensao) => this.grupoTensao = grupoTensao);
        this._user.breadcrumb = false;
        this._user.isFluxo = false;
        this.protocolo = this._user.getProtocolo.protocoloSalesforceStr;
        this.exibirBotoes = this._faltaDeEnergiaService.fluxoFaltaDeEnergia.aviso === EnumFaltaEnergiaOpcoes.OscilacaoDeTensaoParteUc ? true : false;
        console.log(this._faltaDeEnergiaService.fluxoFaltaDeEnergia.aviso);
        this.aviso = this._faltaDeEnergiaService.recebeTipoAviso(this._faltaDeEnergiaService.fluxoFaltaDeEnergia.aviso, this.protocolo);
        this.mobile = configureMenuByWindowSize(window.screen.width);
    }

    ngAfterViewInit(): void {
        this._loading.stop();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    voltar(): void {
        this._location.back();
    }

    continuar(): void {
        this._router.navigate([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.DadosContato]);
    }
}
