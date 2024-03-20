import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-avaliacao-obra',
  templateUrl: './avaliacao-obra.component.html',
  styleUrls: ['./avaliacao-obra.component.scss']
})
export class AvaliacaoObraComponent {
  navExtra!: NavigationExtras;
  formAvaliacaoObra: FormGroup;
  opcoes: Array<string>;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    public user: UserService
  ) {
    this.formAvaliacaoObra = this.createForm();
    this.opcoes = [
      'NÃO',
      'SIM'
    ];
  }

  createForm(): FormGroup {
    return this._formBuilder.group({
      temAvaliacaoObra: ['', [Validators.required]],
      temNumeroObra: ['', [Validators.required]],
      informarNumeroObra: [''],
    });
  }

  validarInput(): void {
    if (this.formAvaliacaoObra.value.temNumeroObra !== undefined) {
      if (this.formAvaliacaoObra.value.temNumeroObra === 'NÃO') {
        this.formAvaliacaoObra.controls['informarNumeroObra'].clearValidators()
      }
      else {
        this.formAvaliacaoObra.controls['informarNumeroObra'].setValidators([Validators.required])
      }
      this.formAvaliacaoObra.controls['informarNumeroObra'].updateValueAndValidity()
    }
  }

  continuar(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }

  voltar(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }

}
