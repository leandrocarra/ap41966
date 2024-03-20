import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasReligacao } from 'app/core/models/religacao/sub-rotas-religacao';
import { GrupoTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { ReligacaoService } from 'app/core/services/religacao/religacao.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
@Component({
    selector: 'app-dialog-pagamento',
    templateUrl: './dialog-pagamento.component.html',
    styleUrls: ['./dialog-pagamento.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogPagamentoComponent {
    grupoTensao: GrupoTensao;
    pagamento: string;
    opcoesPagamento: Array<string> = [
        'Pix.',
        // 'Cartão de crédito.', MVP2
        'Segunda via.'
    ];

    constructor(
        private _dialogRef: MatDialogRef<DialogPagamentoComponent>,
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _religacaoService: ReligacaoService,
        private _selecaoImovelService: SelecaoImovelService
    ) {
        window.scrollTo(0, 0);
        this.grupoTensao = this._selecaoImovelService.getGrupoDoUsuario;
        this.pagamento = '';

        if (this._religacaoService.getDadosReligacao.faturas.length > 3) {
            this.opcoesPagamento.shift();
            //NOTE:: Para MVP1 não teremos a opção flexpag
            //Nesse cenário quando houver mais de 3 faturas o usuário deverá ser direcionado para segunda via
            this._router.navigate([PathCompleto.segundaVia]);
            this.cancelar();
        }
    }

    continuar(): void {
        this.cancelar();
        if (this.pagamento === 'Pix.') {
            this._router.navigate([PathCompleto.religacao, SubRotasReligacao.PagarComPix])
        } else if (this.pagamento === 'Cartão de crédito.') {
            this._alert.alertDirecionamentoDePagamento("Você está sendo redirecionado para a página de pagamento do FlexPag.");
        } else {
            this._router.navigate([PathCompleto.segundaVia])
        }
    }

    cancelar(): void {
        this._dialogRef.close();
    }

}
