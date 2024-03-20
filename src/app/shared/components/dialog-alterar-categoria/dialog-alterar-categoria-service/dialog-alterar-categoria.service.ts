import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DialogAlterarCategoriaComponent } from '../dialog-alterar-categoria.component';

@Injectable({
	providedIn: 'root'
})
export class DialogAlterarCategoriaService {

	constructor(
		private dialog: MatDialog
	) { }
	
	dialogRef!: MatDialogRef<DialogAlterarCategoriaComponent>;

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

	public alterarCategoria(): Observable<string> {
		return this.dialogRef.afterClosed().pipe(take(1), map(data => {
			return data;
		}));
	}
}
