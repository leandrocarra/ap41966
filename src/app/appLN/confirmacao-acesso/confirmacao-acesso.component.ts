import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'neo-confirmacao-acesso',
	templateUrl: './confirmacao-acesso.component.html',
	styleUrls: ['./confirmacao-acesso.scss']
})
export class ConfirmacaoAcessoComponent {
	public confirmacaoForm!: FormGroup;
	public codigo: any;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder
	) { 
		this.confirmacaoForm = this.createForm();
	}

	createForm():FormGroup {
		return this.formBuilder.group({
			codigo: [
				"",
				[Validators.required,
				Validators.maxLength(8)]
			]
		});
	}

	confirm() {
		this.router.navigate(['/area-do-cliente']);
	}
}
