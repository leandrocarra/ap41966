import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, take } from 'rxjs';
import { DialogRepresentanteLegalComponent } from '../dialog-representante-legal.component';

@Injectable({
  providedIn: 'root'
})
export class DialogRepresentanteLegalService {

  constructor(private _dialog: MatDialog) { }
  dialogRef?: MatDialogRef<DialogRepresentanteLegalComponent>;

  public open(): void {
    let width = window.screen.width <= 768 ? '95%' : '70%';
    let height = window.screen.width <= 768 ? '90%' : '450pxs';

    this.dialogRef = this._dialog.open(DialogRepresentanteLegalComponent, {
      width: width,
      height: height,
      disableClose: true,
      maxWidth: '100vw',
    });
  }

  public termoRepresentante(): Observable<boolean> {
		return this.dialogRef!.afterClosed().pipe(take(1), map(data => {
			return data;
		}));
	}

}
