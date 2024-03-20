import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-protocolo',
	templateUrl: './dialog-protocolo.component.html',
	styleUrls: ['./dialog-protocolo.component.scss']
})
export class DialogProtocoloComponent implements OnInit {
	public dialogForm: FormGroup;

	constructor(@Inject(MAT_DIALOG_DATA) public data: {
		protocolo: string
		email: string
	},
	private matDialogRef: MatDialogRef <DialogProtocoloComponent>,
	private formBuilder: FormBuilder
	) {
		this.dialogForm = this.createForm();
	}

	ngOnInit(): void {
	}

	public close(): void{
		this.matDialogRef.close();
	}

	createForm(): FormGroup{
        return this.formBuilder.group(
            {
                selectedEmail: ["", [Validators.required]],
                otherEmail: [{value: "", disabled: true}]
            }
        )
    }

	submit(): void {
		console.log(this.dialogForm.value);
	}

	selectEmail(value: string): void {
		console.log(this.dialogForm.get('selectedEmail')?.value)
		if (value == "registered") {
			this.dialogForm.controls['otherEmail'].clearValidators();
			this.dialogForm.get('otherEmail')?.disable();


		} else {
			this.dialogForm.controls['otherEmail'].setValidators([Validators.required, Validators.email])
			this.dialogForm.get('otherEmail')?.enable();

		}
	}
}
