import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-opcao-tarifa-social',
  templateUrl: './opcao-tarifa-social.component.html',
  styleUrls: ['./opcao-tarifa-social.component.scss']
})
export class OpcaoTarifaSocialComponent implements OnInit {

  navExtra!: NavigationExtras;
  disableButtonTwo: boolean = true;
  formTarifaSocial: FormGroup;

  constructor(
    private _router: Router,
    public user: UserService,
    private _formBuilder: FormBuilder
  ) { 
    this.formTarifaSocial= this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): FormGroup{
    return this._formBuilder.group({
      tarifa: ['', [Validators.required]]
    });
  }

  continuar(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }

  voltar(){
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }
}
