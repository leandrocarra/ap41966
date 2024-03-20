import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'app/core/services/user/user.service';
import { FormatCpfCnpjPipe } from 'app/shared/pipes/format-cpf-cnpj.pipe';

@Component({
  selector: 'app-dados-cliente-ligacao',
  templateUrl: './dados-cliente-ligacao.component.html',
  styleUrls: ['./dados-cliente-ligacao.component.scss']
})
export class DadosClienteLigacaoComponent implements OnInit {

  @Input() valores: any;
  dados: any;
  formatDocumento= new FormatCpfCnpjPipe();
  

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    
  }
 

}
