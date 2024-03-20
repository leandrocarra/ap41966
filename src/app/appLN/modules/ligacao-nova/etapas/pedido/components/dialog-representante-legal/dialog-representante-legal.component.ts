import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'neo-dialog-representante-legal',
  templateUrl: './dialog-representante-legal.component.html',
  styleUrls: ['./dialog-representante-legal.component.scss']
})
export class DialogRepresentanteLegalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      representante: boolean
    },
    private _matDialogRef: MatDialogRef <DialogRepresentanteLegalComponent>,
  ) { }

  public close(): void {
		this._matDialogRef.close(this.data.representante);
	}

  termoRepresentante(representante: boolean): void {
    this._matDialogRef.close(representante);
  }

}
