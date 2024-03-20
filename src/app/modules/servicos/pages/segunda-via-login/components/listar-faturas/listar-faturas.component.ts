import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FaturaSimplificadaDTO } from 'app/core/models/segunda-via-pagamento/response/segunda-via-pagamento-dto';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { formatarSeparadoresNumericos } from 'app/core/services/utils/neo-utils.service';
import { InternetBankingComponent } from 'app/shared/components/alerts/internet-banking/internet-banking.component';

@Component({
  selector: 'app-listar-faturas',
  templateUrl: './listar-faturas.component.html',
  styleUrls: ['./listar-faturas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListarFaturasComponent {
    @Input() listaDeFaturas: Array<FaturaSimplificadaDTO>
    constructor(
        private _alert: CustomSweetAlertService,
        private _clipboard: Clipboard,
        private _dialog: MatDialog
    ) {
        this.listaDeFaturas = [];
    }

    chamarAlertCodigoDeBarras(faturaSimplificada: FaturaSimplificadaDTO): void {
        console.log(faturaSimplificada.codbarras ?? faturaSimplificada.numeroCodigoBarras)
        this._clipboard.copy(faturaSimplificada.codbarras ?? faturaSimplificada.numeroCodigoBarras);
        this._alert.alertCodigoDeBarrasPagamento();
    }

    visualizarFatura(fatura: FaturaSimplificadaDTO): void {
        let codigoBarras = fatura.codbarras ?? fatura.numeroCodigoBarras;
        this._clipboard.copy(codigoBarras);
        const dialogRef = this._dialog.open(InternetBankingComponent, {
            disableClose: true,
            hasBackdrop: true,
            maxWidth: '90vw',
            maxHeight: '90vh',
            data: { fatura: fatura, tipoFatura: 'faturaSimplificada' }
        });
        dialogRef.afterClosed().subscribe(_res => {
            console.log('formulario  preenchido', _res)
            console.log('dialog finalizado');
        });
    }

    formatarValor(valor: string): string {
        return formatarSeparadoresNumericos(valor);
    }
}
