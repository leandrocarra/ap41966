import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';
import { UserService } from 'app/core/services/user/user.service';
import { cpfCnpj } from 'app/core/services/utils/neo-utils.service';

@Component({
  selector: 'app-dados-novo-titular-troca',
  templateUrl: './dados-novo-titular-troca.component.html',
  styleUrls: ['./dados-novo-titular-troca.component.scss']
})
export class DadosNovoTitularTrocaComponent implements OnInit {

  dadosNovoTitularFormGroup!: FormGroup;

  mobile: boolean = false;
  naoConferemTextBtn!: string;
  cpfCnpjmask!: string;

  dados: any;
  hasDebitoNovoTitular: boolean = true;
  navExtra!: NavigationExtras;

  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _router: Router,
    private _activedRouter: ActivatedRoute,
    public user: UserService,
    private _trocaTitularidadeService: TrocaDeTitularidadeService
  ) { 

    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {        
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.configureMenuByWindowSize(event.target.innerWidth);
  }

  configureMenuByWindowSize(width: any): void {
    this.mobile = (width <= 768) ? true : false;
    this.naoConferemTextBtn = (this.mobile) ? "DADOS INCORRETOS" : "DADOS NÃO CONFEREM";
  }

  ngOnInit(): void {

    this.dados = {
      nome: 'Kelly Macagi',
      cpf: '99999999999',
      rg: '123456789',
      dataNascimento: "11/05/1993"
    }

    this.mobile = (window.screen.width <= 768) ? true : false;
    this.naoConferemTextBtn = (this.mobile) ? "DADOS INCORRETOS" : "DADOS NÃO CONFEREM";
    this.applyMaskCpfCnpj();

    this.dadosNovoTitularFormGroup = this._formBuilder.group({
      nome: [{ value: this.dados.nome, disabled: true }, [Validators.maxLength(50)]],
      cpf: [{ value: this.dados.cpf, disabled: true }],
      rg: [{ value: this.dados.rg, disabled: true }],
      dataNascimento: [{ value: this.dados.dataNascimento, disabled: true }],
    });

  }

  applyMaskCpfCnpj(): void {
    this.cpfCnpjmask = cpfCnpj(this.dados.cpf);
  }

  prosseguir(): void {
    this.navExtra.state!.dadosUsuario = this.dados;
    this._trocaTitularidadeService.dadosTitular = true;
    if (this.hasDebitoNovoTitular) {
      this.navExtra.state!.fluxoPendencia = 'pendencia-antigo-terceiro';
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'pendencias-em-aberto'], this.navExtra);
    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'contato-novo-titular'], this.navExtra);
    }
   
  }

  dadosNaoConferem(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'documento-com-foto-terceiro'], this.navExtra);
  }

}
