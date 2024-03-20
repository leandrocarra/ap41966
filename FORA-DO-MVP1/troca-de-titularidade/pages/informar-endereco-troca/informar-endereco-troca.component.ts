import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-informar-endereco-troca',
  templateUrl: './informar-endereco-troca.component.html',
  styleUrls: ['./informar-endereco-troca.component.scss']
})
export class InformarEnderecoTrocaComponent implements OnInit {

  ucs: any;
  selectedUC: any;
  endereco: any = [];
  hasDebitoUC: boolean = true;
  invalidContinuar: boolean = true;
  navExtra!: NavigationExtras;

  constructor(
    public _user: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _trocaTitularidadeService: TrocaDeTitularidadeService
  ) {
      //TODO: remover dados mocados quando for realizado a integração com endpoints
      this.ucs = ['189489', '489894', '489489489'];
      this.endereco.cep = "13500-000";
      this.endereco.logradouro = "Rua Vicente Carlos";
      this.endereco.bairro = "Pitangueiras";
      this.endereco.cidade = "Guarujá";
      this.endereco.estado = "SP";
      this.endereco.numero = "123";

    this._activatedRoute.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {        
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });

    this.setDados();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
    // Quando houver apenas uma UC ele deverá ser pré-selecionada 
    // TODO: quando tiver uma UC selecionada
    if (this.ucs.length === 1) {
      this.selectedUC = this.ucs[0];
    }

    this.isDisabled()
  }

  setDados() {
    if (this.navExtra.state!.ucImovel !== null && this.navExtra.state!.dadosImovel !== null ) {
      this.selectedUC = this.navExtra.state!.ucImovel;
      this.endereco = this.navExtra.state!.dadosImovel;
    }
  }

  continuar(): void {
    this.navExtra.state!.dadosImovel = this.endereco;
    this.navExtra.state!.ucImovel = this.selectedUC;
    if(this.hasDebitoUC) {
      this.navExtra.state!.fluxoPendencia = 'pendencia-antigo-uc';
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'pendencias-em-aberto'], this.navExtra);
    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'documento-procuracao'], this.navExtra);
    }
  }
    
  voltar(): void {
    if (this.navExtra.state!.fluxoPendencia === 'pendencia-antigo-titular') {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'pendencias-em-aberto'], this.navExtra);
    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'escolha-titular'], this.navExtra);
    }
  }

  isDisabled() {
    if (this.selectedUC !== undefined) {
      this.invalidContinuar = false;
      this._trocaTitularidadeService.imovel = true;
    }
  }

}
