import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { CardPerfil, PerfisDeAcesso } from "app/core/models/multilogin/multilogin-acesso";

@Injectable({
    providedIn: "root",
})
export class SelecaoPerfilDeAcessoService {
    cardsPerfis: Array<CardPerfil>;
    banner: string;
    constructor() {
        this.cardsPerfis = this.criarCardPerfis();
        this.banner = "assets/images/banner-inicial.png";
    }

    criarCardPerfis(): Array<CardPerfil> {
        let cardsPerfis: Array<CardPerfil> = [
            new CardPerfil("assets/images/icons/acesso_comum.svg", PerfisDeAcesso.acessoComum, "Espaço reservado do cliente para acesso a informações, serviços e/ou reclamações.", true),
            new CardPerfil("assets/images/icons/perfil_acesso.svg", PerfisDeAcesso.perfilDeAcesso, "", true),
            new CardPerfil("assets/images/icons/corretor.svg", PerfisDeAcesso.corretor, "Acesso reservado e compartilhado para corretores vinculados a uma Imobiliária", true),
            new CardPerfil("assets/images/icons/atendente_cred.svg", PerfisDeAcesso.atendenteCredenciado, "Acesso reservado e concedido pela distribuidora para atendentes vinculados a uma loja credenciada e parceira.", true)
        ];

        if (environment.regiao === Regiao.SE) {
            cardsPerfis.push(
                new CardPerfil("assets/images/icons/padronista.svg", PerfisDeAcesso.padronista, "Acesso reservado e compartilhado por usuário para um profissional de construção de padrão de entrada.", true),
            )
        }

        if (environment.regiao === Regiao.NE) {
            cardsPerfis.push(
                new CardPerfil("assets/images/icons/conjuge.svg", PerfisDeAcesso.conjuge, "Espaço reservado e compartilhado por um titular a um usuário o qual possui relação conjugal para acesso a informações, serviços e/ou reclamações de uma ou mais unidades consumidoras que seja titular.", true),
                new CardPerfil("assets/images/icons/rep_legal.svg", PerfisDeAcesso.representanteLegal, "Acesso reservado e compartilhado para pessoa física indicada no contrato ou estatuto social de uma empresa, ou ainda, legalmente indicada.", true),
            )
        }
        return cardsPerfis;
    }

    get getCardsPerfis(): Array<CardPerfil> {
        return this.cardsPerfis;
    }

    set setCardsPerfis(val: Array<CardPerfil>) {
        this.cardsPerfis = val;
    }
}


