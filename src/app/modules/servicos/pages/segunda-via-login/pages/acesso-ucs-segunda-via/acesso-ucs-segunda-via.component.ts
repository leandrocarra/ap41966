import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { FaturaSimplificadaDTO } from 'app/core/models/segunda-via-pagamento/response/segunda-via-pagamento-dto';
import { UCCondensada } from 'app/core/models/segunda-via-pagamento/segunda-via-pagamento';
import { SubRotaSegundaViaLogin } from 'app/core/models/segunda-via/sub-rotas-segunda-via-login';
import { SegundaViaPagamentoService } from 'app/core/services/segunda-via-pagamento/segunda-via-pagamento.service';

@Component({
    selector: 'app-acesso-ucs-segunda-via',
    templateUrl: './acesso-ucs-segunda-via.component.html',
    styleUrls: ['./acesso-ucs-segunda-via.component.scss']
})
export class AcessoUcsSegundaViaComponent {
    listaDeFaturas: Array<FaturaSimplificadaDTO>;
    listaDeUCs: Array<UCCondensada>;
    constructor(
        private _location: Location,
        private _router: Router,
        private _segundaViaPagamentoService: SegundaViaPagamentoService
    ) {
        this.listaDeFaturas = this._segundaViaPagamentoService.faturasResponseDTO.faturasAbertas;
        this.listaDeUCs = this._segundaViaPagamentoService.condensarListaDeUCs(this.listaDeFaturas);
    }

    aoSelecionarUC(ucSelecionada: UCCondensada): void {
        this._segundaViaPagamentoService.fluxoSegundaViaPagamento.faturasFiltradas = this._segundaViaPagamentoService.filtrarFaturasPorUCSelecionada(this.listaDeFaturas, ucSelecionada);
        this._router.navigate([PathCompleto.segundaViaLogin, SubRotaSegundaViaLogin.AcessarFaturas]);
    }

    voltar(): void {
        this._location.back();
    }
}
