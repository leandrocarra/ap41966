import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogProtocoloComponent } from './dialog-protocolo.component';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DialogProtocoloService {

  constructor(private dialog: MatDialog) { }

  dialogRef!: MatDialogRef<DialogProtocoloComponent>;

  public open(options: any) {
    this.dialogRef = this.dialog.open(DialogProtocoloComponent, {
      width: "900px",
      maxWidth: "95vw",
      disableClose: true,
      hasBackdrop: true,
      data: {
        email: options.email,
        protocolo: options.protocolo
      }
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(data => {
      return data;
    }));
  }
}
