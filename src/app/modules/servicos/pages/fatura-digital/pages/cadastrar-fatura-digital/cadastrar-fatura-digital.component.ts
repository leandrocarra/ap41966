import { Location } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";

import { Regiao } from "app/core/enums/regiao";
import { PathCompleto } from "app/core/enums/servicos";
import { FaturaDigital } from "app/core/models/fatura-digital/fatura-digital";
import { SubRotasFaturaDigital } from "app/core/models/fatura-digital/sub-rotas-fatura-digital";
import { UcInfosResponseDTO } from "app/core/models/selecao-de-imoveis/DTO/responses/uc-infos-response-dto";
import { FaturaDigitalService } from "app/core/services/fatura-digital/fatura-digital.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";

@Component({
    selector: 'app-cadastrar-fatura-digital',
    templateUrl: './cadastrar-fatura-digital.component.html',
    styleUrls: ['./cadastrar-fatura-digital.component.scss']
})
export class CadastrarFaturaDigitalComponent {
    mobile: boolean;
    grupoDoUsuario: string;
    dadosUC: UcInfosResponseDTO;
    possuiFaturaDigital: boolean;
    dadosFaturaDigital: FaturaDigital;
    constructor(
        private _userService: UserService,
        private _router: Router,
        private _location: Location,
        private _faturaDigitalService: FaturaDigitalService,
        private _selecaoImovelService: SelecaoImovelService
    ) {
        this._userService.breadcrumb = true;
        this._userService.isFluxo = false;
        this.grupoDoUsuario = this._userService.group;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.dadosUC = this._selecaoImovelService.getInformacoesUCSelecionada;
        this.possuiFaturaDigital = this._faturaDigitalService.verificarSePossuiFaturaDigital();
        this._faturaDigitalService.definirDadosIniciais();
        this.dadosFaturaDigital = this._faturaDigitalService.fluxoFaturaDigital;
        this.alterarNomeBtn();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
        this.alterarNomeBtn();
    }

    alterarNomeBtn(): string {
        if (this.possuiFaturaDigital) {
            return this.mobile ? "DESCADASTRAR" : "DESCADASTRAR FATURA DIGITAL";
        } else {
            return this.mobile ? "CADASTRAR" : "CADASTRAR FATURA DIGITAL";
        }
    }

    voltar(): void {
        this._location.back();
    }

    alterar(): void {
        this._router.navigate([PathCompleto.faturaDigital, SubRotasFaturaDigital.opcoesFaturaDigital]);
    }

    continuar(): void {
        if(environment.regiao === Regiao.NE) this._faturaDigitalService.validarFaturaDigitalNE('X');
        if (this.possuiFaturaDigital) {
            this._router.navigate([PathCompleto.faturaDigital, SubRotasFaturaDigital.descadastrarFaturaDigital]);
        } else {
            this._router.navigate([PathCompleto.faturaDigital, SubRotasFaturaDigital.opcoesFaturaDigital]);
        }
    }
}
