import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-dados-solicitacao-troca',
  templateUrl: './dados-solicitacao-troca.component.html',
  styleUrls: ['./dados-solicitacao-troca.component.scss']
})
export class DadosSolicitacaoTrocaComponent implements OnInit {

  files: any;
  content: any;
  navExtraDados!: NavigationExtras

  @Input() dados!: Object;
  @Input() anexos!: any[];

  constructor(
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.anexos !== undefined && this.anexos.length !== 0) {
      this.files = this.anexos;
    }
  }

  redirecionar(rota: any, navExtra: NavigationExtras): void {
    this._router.navigate([rota], navExtra);
  }

}


