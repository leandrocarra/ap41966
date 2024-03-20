import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-pergunta-apartamento',
  templateUrl: './pergunta-apartamento.component.html',
  styleUrls: ['./pergunta-apartamento.component.scss']
})
export class PerguntaApartamentoComponent implements OnInit {

  formPerguntaApartamento: FormGroup;

  constructor(
    public user: UserService,
    private _location: Location,
    private _formBuilder: FormBuilder
    ) { 
      this.formPerguntaApartamento= this.createForm();
  }

  ngOnInit(): void {
    this.user.isFluxo = false;
  }

  createForm(): FormGroup{
    return this._formBuilder.group({
      apartamento: ['', [Validators.required]]
    });

  }

  voltar(): void {
		this._location.back();
	}

 continuar(): void {

 }
  
  

}
