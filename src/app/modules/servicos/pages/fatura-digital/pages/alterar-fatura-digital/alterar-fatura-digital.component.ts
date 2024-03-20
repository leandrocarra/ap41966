import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { PathCompleto } from "app/core/enums/servicos";
import { EnumTipificacaoFaturaDigital, EnumRecebimento, TypeRecebimento, OpcoesDeEnvio } from "app/core/models/fatura-digital/fatura-digital";
import { SubRotasFaturaDigital } from "app/core/models/fatura-digital/sub-rotas-fatura-digital";
import { FaturaDigitalService } from "app/core/services/fatura-digital/fatura-digital.service";
import { UserService } from "app/core/services/user/user.service";

@Component({
    selector: 'app-alterar-fatura-digital',
    templateUrl: './alterar-fatura-digital.component.html',
    styleUrls: ['./alterar-fatura-digital.component.scss']
})
export class AlterarFaturaDigitalComponent {
    fluxo: TypeRecebimento;
    grupoDoUsuario: string;
    modoDeEnvio: OpcoesDeEnvio;
    habilitarBtn: boolean;
    fluxoSE: boolean;
    msgTitulo: string;
    constructor(
        private _userService: UserService,
        private _faturaDigitalService: FaturaDigitalService,
        private _router: Router,
        private _location: Location,
    ) {
        this.fluxoSE = (environment.regiao === Regiao.SE);
        this._userService.isFluxo = true;
        this._userService.breadcrumb = true;
        this.grupoDoUsuario = this._userService.group;
        this.modoDeEnvio = new OpcoesDeEnvio();
        this.fluxo = this.verificarFluxoAtual();
        this.habilitarBtn = false;
        this.msgTitulo = (this.fluxoSE) ? "Para receber suas faturas por e-mail, forneça pelo menos um e-mail de recebimento:" : "Para receber suas faturas por e-mail, forneça um e-mail de recebimento:";
    }

    voltar(): void {
        this._location.back();
    }

    verificarFluxoAtual(): TypeRecebimento {
        if (this._faturaDigitalService.fluxoFaturaDigital.modoDeEnvioAtual.label === EnumRecebimento.whatsapp) {
            this.habilitarBtn = this._faturaDigitalService.fluxoFaturaDigital.whatsappAlternativo.length > 10 ? true : false;
        } else {
            this.habilitarBtn = this._faturaDigitalService.fluxoFaturaDigital.emailAlternativo.length > 0 ? true : false
        }
        return this._faturaDigitalService.fluxoFaturaDigital.modoDeEnvioAtual.label;
    }

    emailDigitado(event: any): void {
        if (event == null) {
            this.habilitarBtn = false;
        } else {
            this.habilitarBtn = true;
            this.modoDeEnvio.valor = event;
            this._faturaDigitalService.fluxoFaturaDigital.emailAlternativo = event;
            this.modoDeEnvio.label = EnumRecebimento.emailFatura;
        }
    }

    whatsappDigitado(event: any) {
        if (event == null) {
            this.habilitarBtn = false;
        } else {
            this.habilitarBtn = true;
            this.modoDeEnvio.valor = event;
            this._faturaDigitalService.fluxoFaturaDigital.whatsappAlternativo = event;
            this.modoDeEnvio.label = EnumRecebimento.whatsapp;
        }
    }

    continuar(): void {
        this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio = this.modoDeEnvio;
        this._faturaDigitalService.fluxoFaturaDigital.tipificacao = EnumTipificacaoFaturaDigital.Modificacao;
        this._router.navigate([PathCompleto.faturaDigital, SubRotasFaturaDigital.confirmarFaturaDigital]);
    }
}
