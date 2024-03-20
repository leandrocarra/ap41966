import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ContaBancaria } from 'app/core/models/conta-bancaria.model';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-dados-debito-automatico-troca',
  templateUrl: './dados-debito-automatico-troca.component.html',
  styleUrls: ['./dados-debito-automatico-troca.component.scss']
})
export class DadosDebitoAutomaticoTrocaComponent implements OnInit {

  bancoSelected!: ContaBancaria;
  bancos!: any[];
  dadosConta = {
    'agencia': '',
    'conta': '',
    'digito': '',
    'banco': ''
  };

  isDisabled: boolean = true;

  dadosConfirmacao!: any[];
  navExtra!: NavigationExtras;

  constructor(
    public user: UserService,
    private _location: Location,
    private _router: Router,
    private _activedRouter: ActivatedRoute,
  ) {

    this.navExtra = {
      queryParams: {},
      state: {
        ucImovel: null,
        numeroDoMedidor: null,
        dadosImovel: null,
        dadosUsuario: null,
        docsAnexados: [],
        dadosConfirmar: null,
        fluxo: null,
        fluxoPendencia: null,
        result: null
      }
    }

    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        const dados = this._router.getCurrentNavigation()?.extras.state;
        this.navExtra.state!.ucImovel = dados?.ucImovel;
        this.navExtra.state!.numeroDoMedidor = dados?.numeroDoMedidor;
        this.navExtra.state!.dadosImovel = dados?.dadosImovel;
        this.navExtra.state!.dadosUsuario = dados?.dadosUsuario;
        this.navExtra.state!.docsAnexados = dados?.docsAnexados;
        this.navExtra.state!.dadosConfirmar = dados?.dadosConfirmar;
        this.navExtra.state!.fluxo = dados?.fluxo;
      }
    });

   }

  ngOnInit(): void {
    this.listarBancos();
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

  verificar() {
    if (this.dadosConta.agencia && this.dadosConta.conta) {
      this.isDisabled = this.dadosConta.agencia.length < 4 || this.dadosConta.conta.length < this.bancoSelected.mascara!.length ? true : false;
    }
  }

  voltar() {
    this._location.back();
  }

  continuar() {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-data-certa'], {
		});
  }

}
