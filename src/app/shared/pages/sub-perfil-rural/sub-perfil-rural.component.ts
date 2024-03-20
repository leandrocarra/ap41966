import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-sub-perfil-rural',
  templateUrl: './sub-perfil-rural.component.html',
  styleUrls: ['./sub-perfil-rural.component.scss']
})
export class SubPerfilRuralComponent implements OnInit {

  mobile: boolean;
  tiposLadoEsquerdo;
  tiposLadoDireito;
  formSubPerfilRural: FormGroup;
  navExtra!: NavigationExtras;


  constructor(
    public userService: UserService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _router: Router
  ) {
    this.mobile = (window.screen.width <= 768) ? true : false;

    this.tiposLadoEsquerdo = this.preencheTiposLadoEsquerdo();
    this.tiposLadoDireito = this.preencheTiposDireito();
    this.formSubPerfilRural = this.createForm();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any){

    this.configureMenuByWindowSize(event.target.innerWidth);
  }

  configureMenuByWindowSize(width: any): void {
    this.mobile = (width <= 768) ? true : false;
  }

  createForm(): FormGroup {
    return this._formBuilder.group({
      rural: ['', [Validators.required]]
    });
  }

  continuar(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'],
      this.navExtra);
  }

  voltar(): void {
  }

  preencheTiposLadoEsquerdo(): any[] {
    return [
      {
        label: 'RESIDENCIAL RURAL',
        textoTooltip: 'Residência localizada na área rural, com fim residencial, utilizada por trabalhador rural ou aposentado nesta condição.',
        disabled: this.userService.tipoDocumento == 'CNPJ' ? false : true
      },
      {
        label: 'AGROPECUÁRIA RURAL',
        textoTooltip: 'Localizada na área rural, onde seja desenvolvida atividade relativa à agropecuária.',
        disabled: this.userService.tipoDocumento == 'CNPJ' ? false : true //TODO: Corrigir quando necessário dado mocado para a criacao do fluxo
      },
      {
        label: 'ESCOLA AGROTÉCNICA',
        textoTooltip: 'Estabelecimento de ensino direcionado à agropecuária, localizado na área rural, sem fins lucrativos e explorada por entidade pertencente ou vinculada à Administração Direta, Indireta ou Fundações de Direito Público da União, dos Estados, Distrito Federal ou dos Municípios.',
        disabled: this.userService.tipoDocumento == 'CNPJ' ? true : false
      },
      {
        label: 'AQUICULTOR',
        textoTooltip: 'Cargas específicas utilizadas no bombeamento para captação de água e dos tanques de criação, no berçário, na aeração e na iluminação nesses locais.',
        disabled: false
      },
    ];
  }

  preencheTiposDireito(): any[] {
    return [
      {

        label: 'AGROINDUSTRIAL',
        textoTooltip: 'Indústrias de transformação ou beneficiamento de produtos advindos diretamente da agropecuária, mesmo que oriundos de outras propriedades, independentemente de sua localização, desde que a potência nominal total do transformador seja de até 112,5 KVA.',
        disabled: this.userService.tipoDocumento == 'CNPJ' ? true : false


      },
      {

        label: 'AGROPECUÁRIA URBANA',
        textoTooltip: 'Localizada na área urbana, onde seja desenvolvida atividade relativa à agropecuária.',
        disabled: false

      },
      {
        label: 'SERVIÇO PÚBLICO DE IRRIGAÇÃO',
        textoTooltip: 'Serviço público de irrigação rural localizado na área rural em que seja desenvolvida a atividade de irrigação e explorado por entidade pertencente ou vinculada à Administração Direta, Indireta ou Fundações de Direito Público da União, dos Estados, Distrito Federal ou dos Municípios.',
        disabled: this.userService.tipoDocumento == 'CNPJ' ? true : false
      },
      {
        label: 'IRRIGANTE',
        textoTooltip: 'Cargas específicas utilizadas no bombeamento para captação de água e adução, na injeção de fertilizantes na linha de irrigação, na aplicação da água no solo mediante o uso de técnicas específicas e na iluminação dos locais de instalação desses equipamentos.',
        disabled: false
      },
    ];
  }



}
