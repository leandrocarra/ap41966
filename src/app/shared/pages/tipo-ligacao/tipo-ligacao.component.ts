import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-tipo-ligacao',
  templateUrl: './tipo-ligacao.component.html',
  styleUrls: ['./tipo-ligacao.component.scss']
})
export class TipoLigacaoComponent implements OnInit {

  formTipoLigacao: FormGroup;
  navExtra!: NavigationExtras;


  constructor(
    public user: UserService,
    private _router: Router,
    private _location: Location,
    private _formBuilder: FormBuilder

  ) { 
    this.formTipoLigacao = this.createForm();
  }

  ngOnInit(): void {
    this.user.isFluxo=false;
  }

  createForm(): FormGroup{
    return this. _formBuilder.group({
      tipoLigacao: ['',[Validators.required]]
    })
  }

  voltar(): void{
    this. _location.back();
  }

  continuar(): void{
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], 
    this.navExtra);
  }

}
