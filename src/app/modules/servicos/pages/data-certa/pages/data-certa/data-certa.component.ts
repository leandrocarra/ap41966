import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PathCompleto, Servicos } from 'app/core/enums/servicos';
import { DataAlteracao, SubRotasDataCerta } from 'app/core/models/data-certa/data-certa';
import { DataCertaService } from 'app/core/services/data-certa/data-certa.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
    selector: 'app-data-certa',
    templateUrl: './data-certa.component.html',
    styleUrls: ['./data-certa.component.scss']
})
export class DataCertaComponent {
    dataCerta: string;
    voltarBtn: string;
    titlePage: string;
    grupoDoUsuario: string;
    constructor(
        private _location: Location,
        private _router: Router,
        private _dataCertaService: DataCertaService,
        private _user: UserService
    ) {
        this._user.isFluxo = false;
        this.grupoDoUsuario = this._user.group;
        this.dataCerta = this._dataCertaService.dataCerta.dataDeVencimento;
        this.voltarBtn = (this._dataCertaService.dataCerta.fluxoDoCliente === Servicos.trocaDeTitularidade) ? "NÃO QUERO" : "VOLTAR";
        this.titlePage = (this._dataCertaService.dataCerta.fluxoDoCliente === Servicos.trocaDeTitularidade) ? "Deseja alterar a data de vencimento da fatura?" : "Data de vencimento da fatura";
    }

    voltar(): void {
        this._location.back();
    }

    alterarData(): void {
        if (this._dataCertaService.dataCerta.fluxoDoCliente === Servicos.trocaDeTitularidade) {
            //TODO: Alterar para enum quando for criar fluxo de Troca.
            this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'alterar-data-certa']);
        } else {
            this._router.navigate([PathCompleto.alterarDataDeVencimento, SubRotasDataCerta.alterar]);
        }
    }

    obterDataDeVencimento(): string {
        if (Number.isNaN(parseInt(this.dataCerta))) {
            return this.dataCerta ? (this.dataCerta === DataAlteracao.DATA_NORMAL_REGULADA ? DataAlteracao.SEM_DATA_FIXA : this.dataCerta) : DataAlteracao.SEM_DATA_FIXA;
        } else {
            return 'Dia ' + this.dataCerta;
        }
    }
}
