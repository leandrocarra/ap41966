import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumLeiturasNaMedia, Leitura, SubRotasAutoleitura } from 'app/core/models/autoleitura/autoleitura';
import { AutoleituraDTOResponse, ValorLeituraDTOResponse } from 'app/core/models/autoleitura/response/autoleitura-dto';
import { AutoleituraService } from 'app/core/services/autoleitura/autoleitura.service';
import { UserService } from 'app/core/services/user/user.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';

export interface DialogConfirmarAutoleituraComponent {
    dadosAutoleitura: AutoleituraDTOResponse;
}

@Component({
    selector: 'app-dialog-confirmar-autoleitura',
    templateUrl: './dialog-confirmar-autoleitura.component.html',
    styleUrls: ['./dialog-confirmar-autoleitura.component.scss']
})
export class DialogConfirmarAutoleituraComponent {
    dadosAutoleitura: AutoleituraDTOResponse;
    protocolo;
    linkParaConsumoConsciente: string;
    leiturasDestePeriodo: Array<Leitura>;
    statusMediaDasLeituras: string;

    constructor(
        private _dialogRef: MatDialogRef<DialogConfirmarAutoleituraComponent>,
        private _autoleituraService: AutoleituraService,
        private _userService: UserService,
        private _router: Router,
        private _agenciaVirtualService: AgenciaVirtualService,
        @Inject(MAT_DIALOG_DATA) public data: DialogConfirmarAutoleituraComponent,
    ) {
        this.leiturasDestePeriodo = this._autoleituraService.autoleitura.leiturasDestePeriodo;
        this.statusMediaDasLeituras = this._autoleituraService.autoleitura.statusMediaDasLeituras
        this.dadosAutoleitura = this.data.dadosAutoleitura;
        this.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        this.linkParaConsumoConsciente = this._agenciaVirtualService.gerarLinksPorDistribuidora().paginaInstitucionalURL;
    }

    alterar(): void {
        this._dialogRef.close();
    }

    continuar(): void {
        this._dialogRef.close();
        if (this._autoleituraService.setAutoLeituraDTOResponse.leituraForaMedia === ' ') {
            this._userService.isFluxo = false;
            this._router.navigate([PathCompleto.autoleitura, SubRotasAutoleitura.SolicitacaoEnviada]);
        } else {
            this._router.navigate([PathCompleto.autoleitura, SubRotasAutoleitura.AnexarFoto]);
        }
    }
    
}
