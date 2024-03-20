import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-confirmacao-solicitacao-troca',
  templateUrl: './confirmacao-solicitacao-troca.component.html',
  styleUrls: ['./confirmacao-solicitacao-troca.component.scss']
})
export class ConfirmacaoSolicitacaoTrocaComponent implements OnInit {

  checkTermo: boolean = false;
  naoParceiro: boolean = false;

  anexos: any;
  grupoCliente: string;
  dadosCliente: any;

  navExtra!: NavigationExtras;
  navExtraDados!: NavigationExtras;
  navExtraConfirmacao!: NavigationExtras;
  textoSolicitacao!: NavigationExtras;

  constructor(
    private _user: UserService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _trocaTitularidadeService: TrocaDeTitularidadeService,
    private _trocaDeTitularidade: TrocaDeTitularidadeService,
  ) {

    this.grupoCliente = _user.group;
    
    this._activatedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });

    console.log(this.navExtra);

    this.getDadosCliente();
    this.recebeAnexos();
  }

  ngOnInit(): void {
  }

  recebeAnexos() {
    if (this.navExtra.state!.docsAnexados.length > 0) {
      this.anexos = this.navExtra.state!.docsAnexados;
    }
  }

  concluir(): void {
    this._trocaTitularidadeService.solicitacaoEnviada = true;
    this._user.isFluxo = false;
    this._user.breadcrumb = false;
    this._trocaDeTitularidade.breadCrumbTroca = false;

    if (this.navExtra.state!.fluxo === 'euMesmo') {
      if (this.naoParceiro) {
        this._router.navigate(['/servicos/troca-de-titularidade/novo-titular/identificacao'], this.navExtra);
      } else {
        this.textoSolicitacao = this._trocaDeTitularidade.criaTextoSolicitacao();
        this.navExtraConfirmacao = this._trocaDeTitularidade.definirNavExtraConfirmacaoNovo(this.navExtra);
  
        this._router.navigate(['/servicos/troca-de-titularidade/novo-titular/solicitacao-enviada'], {
          state: { detalhesSolicitacao: this.navExtraConfirmacao, dadosTextoSolicitacao: this.textoSolicitacao }
        });
      }

    } else {

      this.navExtraDados = this._trocaDeTitularidade.criaTextoSolicitacaoAntigo();
      this.navExtraConfirmacao = this._trocaDeTitularidade.definirNavExtraConfirmacaoAntigo(this.navExtra);
      this._router.navigate(['/servicos/troca-de-titularidade/antigo-titular/solicitacao-enviada'], {
        state: { detalhesSolicitacao: this.navExtraConfirmacao, dadosTextoSolicitacao: this.navExtraDados }
      });

    }
  }

  voltar(): void {
    if (this.navExtra.state!.fluxo == 'euMesmo') {
      this.navExtra.state!.fluxoTroca = true;
      if (this.navExtra.state!.dadosFatura.dataCerta) {
        this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'alterar-data-certa'], this.navExtra);
      } else {
        this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'dados-data-certa'], this.navExtra);
      }
    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'contato-novo-titular'], this.navExtra);
    }
  }

  getDadosCliente() {
    this.dadosCliente = {
      nome: "Kelly Macagi",
      documento: "99999999999",
      docSecundario: "654893245",
      dataNascimento: "31/08/1992",
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
    };
  }

  verificaFaturaDigital(): string {
    if (this.navExtra.state!.dadosFatura.whatsApp && this.navExtra.state!.dadosFatura.whatsApp !== '') {
      return this.navExtra.state!.dadosFatura.whatsApp;
    } else if (this.navExtra.state!.dadosFatura.email && this.navExtra.state!.dadosFatura.email !== '') {
      return this.navExtra.state!.dadosFatura.email;
    } else {
      return 'Não';
    }
  }

}
