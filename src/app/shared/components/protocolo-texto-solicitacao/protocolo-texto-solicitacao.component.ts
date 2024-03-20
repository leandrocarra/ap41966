import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protocolo-texto-solicitacao',
  templateUrl: './protocolo-texto-solicitacao.component.html',
  styleUrls: ['./protocolo-texto-solicitacao.component.scss']
})
export class ProtocoloTextoSolicitacaoComponent implements OnInit {

  @Input() dados: any;
  // dados;

  constructor(
    private _router: Router
  ) {
    // this.dados = this._router.getCurrentNavigation()?.extras.state?.dadosTextoSolicitacao.queryParams.textos;
    // console.log(this.dados);
   }

  ngOnInit(): void {
  }

}
