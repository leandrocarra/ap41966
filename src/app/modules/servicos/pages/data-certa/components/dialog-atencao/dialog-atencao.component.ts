import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-atencao',
	templateUrl: './dialog-atencao.component.html',
	styleUrls: ['./dialog-atencao.component.scss']
})
export class DialogAtencaoComponent {
    dataAlteracao : string;
	constructor(
		public dialogAtencaoRef: MatDialogRef<DialogAtencaoComponent>,
	) {
        this.dataAlteracao = '';
    }

	onContinuar(): void {
		this.dialogAtencaoRef.close();
	}
}
