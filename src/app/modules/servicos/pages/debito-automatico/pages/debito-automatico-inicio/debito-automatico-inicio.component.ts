import { Location } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PathCompleto, Servicos } from 'app/core/enums/servicos';
import { EnumFluxoDebitoAutomatico } from 'app/core/models/debito-automatico/debito-automatico';
import { SubRotasDebitoAutomatico } from 'app/core/models/debito-automatico/sub-rota-debito-automatico';
import { GrupoTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { DebitoAutomaticoService } from 'app/core/services/debito-automatico/debito-automatico.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';
import { DialogPreRequisitosComponent } from '../../components/dialog-pre-requisitos/dialog-pre-requisitos.component';

import { HttpErrorResponse } from "@angular/common/http";
import { EnumTitulosPadroes } from "../../../../../../core/models/exibir-aviso/exibir-aviso";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-debito-automatico-inicio',
    templateUrl: './debito-automatico-inicio.component.html',
    styleUrls: ['./debito-automatico-inicio.component.scss']
})

export class DebitoAutomaticoInicioComponent implements OnDestroy {
    mobile: boolean;
    voltarBtn: string;
    grupoDoUsuario: GrupoTensao;
    private subscription!: Subscription;

    constructor(
        public dialog: MatDialog,
        private _dialogRef: MatDialogRef<DialogPreRequisitosComponent>,
        private _debitoAutomaticoService: DebitoAutomaticoService,
        private _user: UserService,
        private _location: Location,
        private _router: Router,
        private _selecaoImovelService: SelecaoImovelService,
        private _loadingService: LoadingService
    ) {
        this.grupoDoUsuario = this._selecaoImovelService.getGrupoDoUsuario;
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.voltarBtn = (this._debitoAutomaticoService.getDebitoAutomatico.fluxo === Servicos.trocaDeTitularidade) ? "NÃO QUERO" : "VOLTAR";
        this._user.breadcrumb = true;
        this._user.isFluxo = false;
        this._debitoAutomaticoService.fluxoIniciado = true;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    voltar(): void {
        this._location.back();
    }

    exibirPopUpPreRequisitos(): void {
        this._dialogRef = this.dialog.open(DialogPreRequisitosComponent, {
            maxWidth: '900px',
            minWidth: '310px',
        });

        this._dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._debitoAutomaticoService.debitoAutomatico.fluxoDebito = EnumFluxoDebitoAutomatico.Cadastrar;
                this._router.navigate([PathCompleto.debitoAutomatico, SubRotasDebitoAutomatico.CadastrarDebitoAutomatico]);
            }
        });
    }

    cadastrar(): void {
        this._loadingService.start();
        this.subscription = this._debitoAutomaticoService.obterDebitoAutomatico('X').subscribe({
            next: (response: any): void => {
                if (response.retorno?.numero === '029' || response.retorno?.numero === 'OK') {
                    this._loadingService.stop();
                    this.exibirPopUpPreRequisitos();
                } else {
                    this._loadingService.stop();
                    this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: response.error?.retorno?.mensagem } });
                }
            },
            error: (error: HttpErrorResponse): void => {
                this._loadingService.stop();
                this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: error.error?.retorno?.mensagem ?? EnumTitulosPadroes.Inesperado } });
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
