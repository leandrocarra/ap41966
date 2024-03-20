import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { PathCompleto } from 'app/core/enums/servicos';
import { EnumStatusUC } from 'app/core/enums/unidade-consumidora';
import { ProjetoParticularService } from 'app/core/services/projeto-particular/projeto-particular.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { SolicitacaoEnviadaService } from 'app/core/services/solicitacao-enviada/solicitacao-enviada.service';
import { UserService } from 'app/core/services/user/user.service';
import { getEnderecoCompleto } from 'app/core/services/utils/utils.service';
import { SolicitacaoEnviada } from 'app/shared/models/solicitacao-enviada/solicitacao-enviada';

@Component({
    selector: 'app-solicitacao-enviada',
    templateUrl: './solicitacao-enviada.component.html',
    styleUrls: ['./solicitacao-enviada.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SolicitacaoEnviadaComponent {
    grupoDoUsuario: string;
    dadosUC: string
    dadosEnderecoUC: string;
    dados: SolicitacaoEnviada;
    statusUc : string

    constructor(
        private _userService: UserService,
        private _selecaoImovelService: SelecaoImovelService,
        private _solicitacaoEnviadaService: SolicitacaoEnviadaService,
        private _router: Router,
        private _projetoParticularService: ProjetoParticularService
    ) {
        this._userService.breadcrumb = false;
        this._userService.isFluxo = false;
        this.grupoDoUsuario = this._userService.group;
        this.dadosUC = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        this.dadosEnderecoUC = getEnderecoCompleto(this._selecaoImovelService);
        this.dados = this._solicitacaoEnviadaService.getSolicitacaoEnviada;
        this.statusUc =  EnumStatusUC.Cortado || EnumStatusUC.Suspensa;

        this._projetoParticularService.fluxoIniciado = false;
    }

    finalizarFluxo(): void {
        this._router.navigate([PathCompleto.home]);
    }

    navigateTo(): void{
        this._router.navigate([PathCompleto.religacao]);
    }

}

