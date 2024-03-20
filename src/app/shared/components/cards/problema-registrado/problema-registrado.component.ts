import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-problema-registrado',
  templateUrl: './problema-registrado.component.html',
  styleUrls: ['./problema-registrado.component.scss']
})
export class ProblemaRegistradoComponent implements OnInit {
  
  //@Input() protocolo:string;
  protocolo = "0578607593";
  
  //@Input() endereco:Object;
  endereco = {
    codigo: "0067171982",
    endereco: "Av. Nossa Sra. de Fátima, 138 Taquaral, Campinas - SP, 13076-000",
    celular: "(19)99698-2019",
    pontoReferencia: "em frente ao supermercado",
  };
  @Input() showAtencao!: Boolean;
  @Input() titulo!: String;
  @Input() tipo!: String;
  @Input() dados!:any;

  problema1 = {
    titulo: "Seu problema de iluminação pública foi registrado.",
    tipo: "Iluminação Pública",
    tipoSolicitacao: "Problema de iluminação pública",
    descricao: "várias lâmpadas apagadas"
  };

  groupColor!: String;
  
  constructor(public user: UserService) {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.groupColor = (this.user.group === 'A') ? 'color-group-a' : 'color-group-b';
  }

}
