import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tipoCategoria } from '../../../../../../core/models/dados-da-ligacao/dados-da-ligacao';
@Component({
    selector: 'neo-dialog-alterar-categoria',
    templateUrl: './dialog-alterar-categoria.component.html',
    styleUrls: ['./dialog-alterar-categoria.component.scss']
})
export class DialogAlterarCategoriaComponent implements OnInit {
    dialogMock: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
            categoria: tipoCategoria
        },
        private matDialogRef: MatDialogRef<DialogAlterarCategoriaComponent>,
    ) { }

    ngOnInit(): void {
    }

    public close(): void {
        this.matDialogRef.close(this.data.categoria);
    }

    alterarCategoria(categoria: tipoCategoria): void {
        this.matDialogRef.close(categoria);
    }
}
