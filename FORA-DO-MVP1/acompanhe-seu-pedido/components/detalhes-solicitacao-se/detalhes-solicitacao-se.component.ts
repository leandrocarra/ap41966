import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes-solicitacao-se',
  templateUrl: './detalhes-solicitacao-se.component.html',
  styleUrls: ['./detalhes-solicitacao-se.component.scss']
})
export class DetalhesSolicitacaoComponent implements OnInit {
  @Input() solicitacao: any;
  @Input() etapas: any;
  
  constructor() { }

  ngOnInit(): void {

  }

}
