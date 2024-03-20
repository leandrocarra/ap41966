import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-multi-cadastradas',
  templateUrl: './multi-cadastradas.component.html',
  styleUrls: ['./multi-cadastradas.component.scss']
})
export class MultiCadastradasComponent implements OnInit {
  faturas: any;
  grupo = [];

  navExtra: NavigationExtras = {
    queryParams: null,
    state: {
        nomeGrupo: null,
    }
  };

  constructor(
    public user: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
      this.faturas = [
        {
          grupo: '1',
          email: 'kelly@gmail.com',
          vencimento: '09',
          ucs: [
            {
              cnpj: '86.973.170/0001-78',
              uc: '008456',
              endereco: 'Rua João José, 1110 - Centro, Limeira',
              cep: '13480-002'
            },
            {
              cnpj: '86.973.170/0001-78',
              uc: '009544',
              endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
              cep: '13855-040'
            },
            {
              cnpj: '86.973.170/0001-78',
              uc: '008456',
              endereco: 'Rua João José, 1110 - Centro, Limeira',
              cep: '13480-002'
            },
            {
              cnpj: '86.973.170/0001-78',
              uc: '009544',
              endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
              cep: '13855-040'
            }
          ]
        },
        {
          grupo: '2',
          email: 'kelly@gmail.com',
          vencimento: '28',
          ucs: [
            {
              cnpj: '86.973.170/0001-78',
              uc: '008456',
              endereco: 'Rua João José, 1110 - Centro, Limeira',
              cep: '13480-002'
            },
            {
              cnpj: '86.973.170/0001-78',
              uc: '009544',
              endereco: 'Rua Almirante 08, 90 - Urbano, Limeira',
              cep: '13855-040'
            },
          ]
        }
      ]
  }

  confirmar() {
    this.router.navigate(['faturas-multiplas/fatura-multipla-grupo']);
  }

  grupoEscolhido(event: any) {
    this.grupo = event;
  }

  criarGrupo() {
    this.router.navigate(['faturas-multiplas/cadastrar-faturas']);
  }

}
