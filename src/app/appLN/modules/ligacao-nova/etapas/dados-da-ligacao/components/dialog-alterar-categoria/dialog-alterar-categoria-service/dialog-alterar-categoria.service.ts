import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { tipoCategoria } from 'app/appLN/core/models/dados-da-ligacao/dados-da-ligacao';
import { Observable, map, take } from 'rxjs';
import { DialogAlterarCategoriaComponent } from '../dialog-alterar-categoria.component';

@Injectable({
	providedIn: 'root'
})
export class DialogAlterarCategoriaService {
	dialogRef?: MatDialogRef<DialogAlterarCategoriaComponent>;
	constructor(private dialog: MatDialog) {
    }

	public open(categoria: string) {
		let width = window.screen.width < 768 ? '100%' : '850px';

		this.dialogRef = this.dialog.open(DialogAlterarCategoriaComponent, {
			width: width,
			// height: height,
			disableClose: true,
			hasBackdrop: true,
			maxWidth: '100vw',
			data: { categoria: categoria }
		});
	}

	public alterarCategoria(): Observable<tipoCategoria> {
		return this.dialogRef!.afterClosed().pipe(take(1), map(data => {
			return data;
		}));
	}
}
