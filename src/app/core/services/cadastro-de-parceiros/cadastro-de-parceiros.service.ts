import { Injectable } from "@angular/core";
import { CardPerfil } from "app/core/models/multilogin/multilogin-acesso";
import { SubRotasMultiloginCadastro } from 'app/core/models/multilogin/multilogin-cadastro';

@Injectable({
    providedIn: "root",
})
export class CadastroDeParceirosService {
    cardsParceiros: Array<CardPerfil>;
    banner: string;
    constructor() {
        this.cardsParceiros = this.criarCardParceiros();
        this.banner = "assets/images/banner-inicial.png";
    }

    criarCardParceiros(): Array<CardPerfil> {
        return [
        new CardPerfil("assets/images/icons/formulario_cadastro.svg", "Cadastro Imobiliário", "Cadastre uma imobiliária e conceda acesso aos corretores.", false, SubRotasMultiloginCadastro.Imobiliaria),
        new CardPerfil("assets/images/icons/formulario_cadastro.svg", "Cadastro de Credenciados", "Cadastre uma loja e conceda acesso aos seus atendentes.", false, SubRotasMultiloginCadastro.Credenciado)
        ];
    }
}


