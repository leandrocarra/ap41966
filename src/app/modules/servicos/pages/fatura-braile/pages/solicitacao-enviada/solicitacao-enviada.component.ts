import { Component, OnDestroy, OnInit } from "@angular/core";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";
import { getEnderecoCompleto } from "app/core/services/utils/utils.service";
import { BreadcrumbService } from "xng-breadcrumb";

@Component({
    selector: 'app-solicitacao-enviada',
    templateUrl: './solicitacao-enviada.component.html',
    styleUrls: ['./solicitacao-enviada.component.scss']
})

export class SolicitacaoEnviadaComponent implements OnInit {
    groupColor!: string;
    uc!: string;
    protocolo!: string;
    enderecoCompleto!: string;

    constructor(
        public user: UserService,
        private _selecaoImovelService: SelecaoImovelService,
    ) { }

    ngOnInit(): void {
        this.preencheDados();
    }


    preencheDados(): void {
        this.protocolo = "0578607593";
        this.uc = this._selecaoImovelService.getInformacoesUCSelecionada.codigo
        this.enderecoCompleto = getEnderecoCompleto(this._selecaoImovelService);
    }

}