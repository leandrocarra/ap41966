import { Component, OnInit } from "@angular/core";
import { Distribuidora } from "../enums/distribuidoras";
import { Grupo } from "../enums/grupos";
import { EnumEnderecoNeo, EnumEstiloDoFooter } from "../models/footer/footer";
import { GrupoTensao } from "../models/selecao-de-imoveis/selecao-de-imoveis";
import { LgpdService } from "../services/lgpd/lgpd.service";
import { AgenciaVirtualService } from "../services/utils/admin/agencia-virtual.service";
import { environment } from './../../../environments/environment';

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
    logoGrupoA = environment.logoLetraBranca;
    logoGrupoB = environment.logoLetraVerde;
    grupoTensao: GrupoTensao;
    distribuidora = this.capitalizeFirst(environment.title)

    twitterURL = "https://twitter.com/neoenergiaElekt";
    facebookURL = "https://www.facebook.com/neoenergiaelektro";
    instagramURL = "https://www.instagram.com/neoenergiaelektro";
    linkedinURL =
        "https://www.linkedin.com/company/elektro/?trk=biz-companies-cym";
    youtubeURL = "https://www.youtube.com/c/NeoenergiaElektro";
    ano: number;

    enderecoDistribuidora: string;
    linkDePrivacidade: string;
    footerClass: string;

    constructor(
        private _lgpdService: LgpdService,
        private _agenciaVirtualService: AgenciaVirtualService
    ) {
        this.ano = new Date().getFullYear()
        this.enderecoDistribuidora = this.getEnderecoDistribuidora();
        this.linkDePrivacidade = this._lgpdService.getLinkLGPD('PRIVACIDADE');
        this.grupoTensao = this._agenciaVirtualService.grupoTensao;
        this.footerClass = EnumEstiloDoFooter.Light;
    }

    ngOnInit(): void {
		this._agenciaVirtualService.grupoTensao.subscribe((grupoTensao: GrupoTensao) => {
            this.grupoTensao = grupoTensao;
            this.footerClass = this.definirEstiloDoFooter(grupoTensao);
        });
        console.log(this.grupoTensao)
    }

    capitalizeFirst(str: string): string {
        const subst = str.toLowerCase().replace(/(?:^|\s)\S/g,
            function (a: string) {
                return a.toUpperCase();
            });
        return subst;
    }

    getEnderecoDistribuidora(): string {
        switch (environment.title) {
            case Distribuidora.COELBA:
                return `${EnumEnderecoNeo.GrupoNeo}<br>${EnumEnderecoNeo.Coelba}`
            case Distribuidora.COSERN:
                return `${EnumEnderecoNeo.GrupoNeo}<br>${EnumEnderecoNeo.Cosern}`
            case Distribuidora.CELPE:
                return `${EnumEnderecoNeo.GrupoNeo}<br>${EnumEnderecoNeo.Celpe}`
            default:
                return `${EnumEnderecoNeo.GrupoNeo}<br>${EnumEnderecoNeo.Elektro}`
        }
    }

    definirEstiloDoFooter(grupoDeTensao: string = EnumEstiloDoFooter.Light): string {
        if (grupoDeTensao === Grupo.A) {
            return EnumEstiloDoFooter.Dark;
        } else {
            return EnumEstiloDoFooter.Light;
        }
    }
}
