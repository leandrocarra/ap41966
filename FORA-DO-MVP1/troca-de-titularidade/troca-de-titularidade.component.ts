import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-troca-de-titularidade',
  templateUrl: './troca-de-titularidade.component.html',
  styleUrls: ['./troca-de-titularidade.component.scss']
})
export class TrocaDeTitularidadeComponent implements OnInit {

  breadcrumbTroca!: boolean;

  constructor(
    private _router: Router,
    private _user: UserService,
    private _trocaDeTitularidadeService: TrocaDeTitularidadeService
  ) { }

  ngOnInit(): void {
    // this._user.breadcrumb = false;
    this.breadcrumbTroca = this._trocaDeTitularidadeService.breadCrumbTroca;
    console.log(this.breadcrumbTroca);
    // this.informativoTitularidade();
    this.informativoTitularidade()
  }

  red() {
    let dados: NavigationExtras = {
      queryParams: {
        "textos": [
          {
            titulo: "Agora você pode receber sua fatura no e-mail!",
            texto: "Com o serviço de fatura digital, agora você pode receber a sua fatura por e-mail, sendo muito mais rápido, prático e sustentável. Cadastre-se hoje mesmo!",
            titleText: "SIM, DESEJO PERSONALIZAR",
            btnBaixar: false
          },
          {
            titulo: "Fatura final do antigo titular",
            texto: "Verificamos que a data de fechamento foi no dia (13/04), foi gerada uma fatura proporcional para o antigo titular no valor de R$ 15 referente aos dias de uso de energia do imóvel",
            titleText: "BAIXAR",
            btnBaixar: true
          },
        ]
      }
    }

    let data: NavigationExtras = {
      queryParams: {
        "protocolo": "123456789",
        "titulo": "Solicitação enviada com sucesso!",
        "tituloH4": "DADOS",
        "solicitacaoTipo": "Troca de titularidade",
        "infos": [
          {
            "label": "NOME",
            "data": "Kelly Macagi",
          },
          {
            "label": "CPF",
            "data": "99999999999",
          },
          {
            "label": "RG",
            "data": "999999999",
          },
          {
            "label": "TELEFONE CONTATO",
            "data": "999999999",
          }
        ],
        "textos": true,
        "aviso": true,
        "avisoContent": "O titular antigo já foi notificado da pendência existente no imóvel"
      }
    }
    this._router.navigate(['servicos', 'troca-de-titularidade', 'solicitacao-enviada'], {
      state: { detalhesSolicitacao: data, dadosTextoSolicitacao: dados }
    });
  }

  protocoloBaixarFatura() {

    let data: NavigationExtras = {
      queryParams: {
        "protocolo": "123456789",
        "titulo": "Solicitação enviada com sucesso!",
        "tituloH4": "DADOS",
        "solicitacaoTipo": "",
        "infos": [
          {
            "label": "NOME",
            "data": "Kelly Macagi",
          },
          {
            "label": "CPF",
            "data": "1234567890",
          },
          {
            "label": "RG",
            "data": "2525252525",
          },
          {
            "label": "TELEFONE CONTATO",
            "data": "312313123131r.infos.telefone",
          },
          {
            "label": "CATEGORIA",
            "data": "t31231231231SFZCASscolhidaValue",
          },
        ],
      }
    }

    this._router.navigate(['servicos', 'troca-de-titularidade', 'solicitacao-enviada', 'protocolo-baixar-fatura'], {
      state: { detalhesSolicitacao: data }
    });
  }

  escolhaNovoTitular() {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'escolha-titular'], {
    });
  }

  novoTitular() {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular'], {
    });
  }

  antigoTitular() {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular'], {
    });
  }

  informativoTitularidade(): void {
    this._user.isFluxo = false;
    this._user.breadcrumb = false;
    this._trocaDeTitularidadeService.breadCrumbTroca = false;
    this._router.navigate(['servicos', 'troca-de-titularidade', 'informativo-titularidade'], {
    });
  }
  
}
