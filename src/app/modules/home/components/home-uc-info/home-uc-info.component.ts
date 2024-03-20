import { Component, Input, OnInit } from '@angular/core';
import { SelecaoImovelService } from "../../../../core/services/selecao-de-imovel/selecao-de-imovel.service";
import { GrupoTensao } from "../../../../core/models/selecao-de-imoveis/selecao-de-imoveis";
import { take } from "rxjs";
import { AgenciaVirtualService } from "../../../../core/services/utils/admin/agencia-virtual.service";
import { UserService } from "../../../../core/services/user/user.service";
import { Router } from "@angular/router";
import { SubRotasHome } from "../../../../core/models/home/sub-rotas-home";

@Component({
    selector: 'app-home-uc-info',
    templateUrl: './home-uc-info.component.html',
    styleUrls: ['./home-uc-info.component.scss']
})
export class HomeUcInfoComponent implements OnInit {
    enderecoCompleto: string;
    @Input() grupoTensao: GrupoTensao;
    contaColetiva: boolean;
    uc: string;
    htmlbuttonImoveis: string;

    constructor(
        private _selecaoImovelService: SelecaoImovelService,
        private _agenciaVirtualService: AgenciaVirtualService,
        private _userService: UserService,
        private _router: Router
    ) {
        this.grupoTensao = 'B';
        console.log(this._selecaoImovelService.getUCSelecionada)
        this.contaColetiva = this._selecaoImovelService.getUCSelecionada?.indCCColetiva === 'X';
        this.uc = this._selecaoImovelService.getUCSelecionada?.uc ?? '';
        this.enderecoCompleto = this._selecaoImovelService.getEnderecoCompleto;
        this.htmlbuttonImoveis = `<div class="d-flex align-items-center">
            <span class="material-icons-outlined me-1">change_circle</span>
            <span class="text-meus-imoveis">Selecionar outra unidade consumidora</span>
        </div>`;
    }

    ngOnInit(): void {

    }

    redirecionarMeusImoveis(): void {
        this._userService.pageSelected = true;
        this._router.navigate(["home", SubRotasHome.MinhasUnidadesConsumidoras]);
    }
}
