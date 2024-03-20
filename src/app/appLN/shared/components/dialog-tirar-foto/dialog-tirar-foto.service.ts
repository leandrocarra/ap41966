import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, take } from 'rxjs';
import { DialogTirarFotoComponent } from './dialog-tirar-foto.component';

@Injectable({
  providedIn: 'root'
})
export class DialogTirarFotoService {

  constructor(private _dialog: MatDialog) { }
  dialogRef?: MatDialogRef<DialogTirarFotoComponent>;

  public open(tipoCamera: string): void {
    this.dialogRef = this._dialog.open(DialogTirarFotoComponent, {
      hasBackdrop: true,
			disableClose: true,
			width: 'auto',
			height: 'auto',
			maxWidth: '90%',
      data: {
        tipoCamera: tipoCamera
      }
    })
  }

  public foto():Observable<any> {
    return this.dialogRef!.afterClosed().pipe(take(1), map(data => {
      return data;
    }));
  }
}
