import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, take } from 'rxjs';
import { DialogClassePrincipalComponent } from '../dialog-classe-principal.component';

@Injectable({
  providedIn: 'root'
})
export class DialogClassePrincipalService {

  constructor(private _dialog: MatDialog) { }
  dialogRef?: MatDialogRef<DialogClassePrincipalComponent>;

  public open(classes: any, mobile: boolean): void {
    let width = window.screen.width < 768 ? '100%' : '850px';
    let height = window.screen.width < 768 ? '100%' : '465';

    this.dialogRef = this._dialog.open(DialogClassePrincipalComponent, {
      width: width,
      height: height,
      maxWidth: '100vw',
      data: {classes: classes, mobile: mobile}
    });
  }

  public classePrincipal(): Observable<any> {
    return this.dialogRef!.afterClosed().pipe(take(1), map(data => {
      return data;
    }))
  }

}
