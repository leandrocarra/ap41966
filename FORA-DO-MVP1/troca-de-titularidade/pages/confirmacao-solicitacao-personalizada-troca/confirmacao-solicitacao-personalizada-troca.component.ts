import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Distribuidora } from 'app/core/enums/distribuidoras';
import { ContaBancaria } from 'app/core/models/conta-bancaria.model';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-confirmacao-solicitacao-personalizada-troca',
  templateUrl: './confirmacao-solicitacao-personalizada-troca.component.html',
  styleUrls: ['./confirmacao-solicitacao-personalizada-troca.component.scss']
})
export class ConfirmacaoSolicitacaoPersonalizadaTrocaComponent implements OnInit {

  // Variables debito automatico
  debitoAutomatico!: string;
  bancoSelected!: ContaBancaria;
  bancos!: ContaBancaria[];
  dadosConta = {
    'agencia': '',
    'conta': '',
    'digito': '',
    'banco': ''
  };
  // End Variables debito automatico

  // Variables data de vencimento
  checkTermo: boolean = false;
  dataCerta!: string;
  datasPossiveis!: Array<string>;
  // End Variables data de vencimento

  // Variables confirmar dados
  isDisabled: boolean = true;
  dadosSolicitacao: any;
  dadosCliente: any;
  // Variables confirmar dados

  constructor(
    public user: UserService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.dadosSolicitacao = [
      {
        "label": "Número do medidor",
        "data": "04600",
      },
      {
        "label": "Data de entrega",
        "data": "17/09/2021",
      },
      {
        "label": "E-mail para contato",
        "data": "kelly@br.ey.com",
        "rota": "/servicos/troca-de-titularidade/novo-titular/cadastrar-fatura-digital",
      },
      {
        "label": "Telefone",
        "data": "1933120310",
        "rota": "/servicos/troca-de-titularidade/novo-titular/cadastrar-fatura-digital",
      },
    ]

    this.dadosCliente = {
      nome: "Kelly Macagi",
      documento: "99999999999",
      docSecundario: "654893245",
      dataNascimento: "1992-08-31",
      telefone: "19940028922",
      celular: "79994011272",
      ucs: [
        {
          uc: '9876543',
          logradouro: 'Logradouro',
          numero: '0000',
          complemento: '',
          bairro: 'URBANO',
          cidade: 'AGUAÍ',
          estado: 'SP',
          cep: '13500-000'
        }
      ]
    }

    this.datasPossiveis = this.getDatas();
    this.listarBancos();


  }


  voltar(): void {
    this._location.back();
  }


  continuar(): void {
    console.log('btn continuar');
  }

  listarBancos() {
    this.bancos = [
      {
        "dicaContaBancaria": "Digite o n&uacute;mero da conta corrente sem digitos.",
        "nomeAbreviadoBanco": "BANCO DO BRASIL",
        "nomeCompletoBanco": "BANCO DO BRASIL SA",
        "numeroBanco": "001",
        "numeroCaracteresContaBancaria": 8,
        "numeroCaracteresDigitoContaBancaria": 0
      },
      {
        "nomeAbreviadoBanco": "BANCO INTER S.A",
        "nomeCompletoBanco": "BANCO INTER S.A",
        "numeroBanco": "077",
        "numeroCaracteresContaBancaria": 7,
        "numeroCaracteresDigitoContaBancaria": 1
      },
      {
        "nomeAbreviadoBanco": "BANCO ITAU",
        "nomeCompletoBanco": "BANCO ITAU S A",
        "numeroBanco": "341",
        "numeroCaracteresContaBancaria": 5,
        "numeroCaracteresDigitoContaBancaria": 1
      },
      {
        "nomeAbreviadoBanco": "BANCO ORIGINAL S.A",
        "nomeCompletoBanco": "BANCO ORIGINAL S.A",
        "numeroBanco": "212",
        "numeroCaracteresContaBancaria": 6,
        "numeroCaracteresDigitoContaBancaria": 1
      },
      {
        "nomeAbreviadoBanco": "BCO.MERCANTIL BRASIL",
        "nomeCompletoBanco": "BANCO MERCANTIL DO BRASIL S A",
        "numeroBanco": "389",
        "numeroCaracteresContaBancaria": 8,
        "numeroCaracteresDigitoContaBancaria": 1
      },
      {
        "dicaContaBancaria": "<strong>Digite o numero da conta com 7 caracteres( se necessario, preencher zero a esquerda). Preencha 1 caracter no campo Digito.",
        "nomeAbreviadoBanco": "BRADESCO.",
        "nomeCompletoBanco": "BANCO BRADESCO SA",
        "numeroBanco": "237",
        "numeroCaracteresContaBancaria": 7,
        "numeroCaracteresDigitoContaBancaria": 1
      },
      {
        "dicaContaBancaria": "<strong>Inserir o tipo da conta com 2 caracteres antes do numero da conta corrente, com 6 caracteres.",
        "nomeAbreviadoBanco": "SANTANDER",
        "nomeCompletoBanco": "BANCO SANTANDER (BRASIL) S.A.",
        "numeroBanco": "033",
        "numeroCaracteresContaBancaria": 8,
        "numeroCaracteresDigitoContaBancaria": 1
      },
      {
        "nomeAbreviadoBanco": "SICREDI",
        "nomeCompletoBanco": "BANCO COOPERATIVO SICREDI S.A.",
        "numeroBanco": "748",
        "numeroCaracteresContaBancaria": 5,
        "numeroCaracteresDigitoContaBancaria": 1
      }
    ]

    this.alterarMascaraContaBancaria(this.bancos);
  }

  alterarMascaraContaBancaria(bancos: any) {
    for (let i = 0; i < bancos.length; i++) {
      bancos[i].numeroCaracteresContaBancaria = "00000000000".substr(0, bancos[i].numeroCaracteresContaBancaria);
      bancos[i].numeroCaracteresDigitoContaBancaria = "00000".substr(0, bancos[i].numeroCaracteresDigitoContaBancaria);
      bancos[i].mascara = bancos[i].numeroCaracteresContaBancaria + bancos[i].numeroCaracteresDigitoContaBancaria;
    }
  }

  getDatas(): Array<string> {
    let datas
    if (environment.title === Distribuidora.ELEKTRO) {
      datas = ['03', '08', '13', '18', '23', '28'];

    } else {
      datas = ['01', '06', '11', '16', '21', '26'];
    }
    return datas;
  }

  verificarBtn() {
    if (this.debitoAutomatico === "Quero cadastrar") {
      if ((this.dadosConta.agencia.length >= 4 && this.dadosConta.conta.length >= this.bancoSelected.mascara!.length) &&
        (this.dataCerta !== null) && (this.checkTermo)) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    } else {
      if ((this.dataCerta !== null) && (this.checkTermo) && (this.debitoAutomatico !== null)) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    }
  }

}
