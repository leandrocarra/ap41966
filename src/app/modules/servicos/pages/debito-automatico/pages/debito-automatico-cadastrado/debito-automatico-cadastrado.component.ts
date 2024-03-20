import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumFluxoDebitoAutomatico } from 'app/core/models/debito-automatico/debito-automatico';
import { SubRotasDebitoAutomatico } from 'app/core/models/debito-automatico/sub-rota-debito-automatico';
import { DebitoAutomaticoService } from 'app/core/services/debito-automatico/debito-automatico.service';
import { UserService } from 'app/core/services/user/user.service';
import { DialogPreRequisitosComponent } from '../../components/dialog-pre-requisitos/dialog-pre-requisitos.component';
import { ContaCadastradaDebitoDTORequest } from 'app/core/models/debito-automatico/request/debito-automatico-dto';
import { environment } from '@environments/environment';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { HttpErrorResponse } from "@angular/common/http";
import { EnumTitulosPadroes } from "../../../../../../core/models/exibir-aviso/exibir-aviso";
import { Subscription } from "rxjs";
@Component({
	selector: 'app-debito-automatico-cadastrado',
	templateUrl: './debito-automatico-cadastrado.component.html',
	styleUrls: ['./debito-automatico-cadastrado.component.scss']
})
export class DebitoAutomaticoCadastradoComponent {
	grupoDoUsuario: string;
	banco: string;
	agencia: string;
	conta: string;
    private subscription!: Subscription;
	constructor(
		private _dialog: MatDialog,
		private _dialogRef: MatDialogRef<DialogPreRequisitosComponent>,
		private _debitoAutomaticoService: DebitoAutomaticoService,
		private _selecaoImovelService: SelecaoImovelService,
		private _user: UserService,
		private _router: Router,
		private _location: Location,
		private _loadingService: LoadingService
	) {
		this.grupoDoUsuario = this._user.group;
		this.banco = this._debitoAutomaticoService.getDebitoAutomatico.dadosBancarios.banco;
		this.agencia = this._debitoAutomaticoService.getDebitoAutomatico.dadosBancarios.agencia;
		this.conta = this._debitoAutomaticoService.getDebitoAutomatico.dadosBancarios.conta;
		this._user.breadcrumb = true;
		this._user.isFluxo = false;
	}

	exibirPopUpPreRequisitos(): void {
		this._dialogRef = this._dialog.open(DialogPreRequisitosComponent, {
			maxWidth: '90vw',
			width: '900px',
			maxHeight: '90vh',
		});


		this._dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this._debitoAutomaticoService.debitoAutomatico.fluxoDebito = EnumFluxoDebitoAutomatico.Alterar;
				this._debitoAutomaticoService.setDebitoAutomatico = this._debitoAutomaticoService.debitoAutomatico;
				this._debitoAutomaticoService.fluxoIniciado = true;
				this._router.navigate([PathCompleto.debitoAutomatico, SubRotasDebitoAutomatico.CadastrarDebitoAutomatico]);
			}
		});
	}

	voltar(): void {
		this._location.back();
	}

	alterar(): void {
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

	descadastrar(): void {
        this._loadingService.start();
        this.subscription = this._debitoAutomaticoService.obterDebitoAutomatico('X').subscribe({
            next: (dadosDebitoAutomatico) => {
                if (dadosDebitoAutomatico.retorno?.numero === '029' || dadosDebitoAutomatico.retorno?.numero === 'OK') {
                    this._debitoAutomaticoService.debitoAutomatico.fluxoDebito = EnumFluxoDebitoAutomatico.Descadastrar;
                    this._debitoAutomaticoService.setDebitoAutomatico = this._debitoAutomaticoService.debitoAutomatico;
                    this._debitoAutomaticoService.fluxoIniciado = true;
                    this._loadingService.stop();
                    this._router.navigate([PathCompleto.debitoAutomatico, SubRotasDebitoAutomatico.ConfirmarDebitoAutomatico]);
                } else {
                    this._loadingService.stop();
                    this._router.navigate([PathCompleto.aviso], { queryParams: { titulo: dadosDebitoAutomatico?.retorno?.mensagem } });
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
