import { Component } from '@angular/core';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss'],
})

export class CepComponent {
  public linkBuscaCEP: string;
  constructor() {
    this.linkBuscaCEP = 'https://buscacepinter.correios.com.br/app/endereco/index.php';
  }
}
