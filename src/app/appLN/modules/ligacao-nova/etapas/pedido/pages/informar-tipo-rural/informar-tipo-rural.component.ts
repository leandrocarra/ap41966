import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubPerfilRural } from '../../../../../../core/models/escolha-perfil/escolha-perfil';
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { configureMenuByWindowSize } from '../../../../../../core/services/utils/neo-utils.service';


@Component({
  selector: 'neo-informar-tipo-rural',
  templateUrl: './informar-tipo-rural.component.html',
  styleUrls: ['./informar-tipo-rural.component.scss']
})
export class InformarTipoRuralComponent {

  mobile: boolean;
  tiposLeftArray: any;
  tiposRightArray: any;
  subPerfis: Array<SubPerfilRural>;
  formTipoRural: FormGroup;

  constructor(
    private _router: Router,
    private _userServiceLN: UserServiceLN,
    private _ligacaoNovaService: LigacaoNovaService,
    private _formBuilder: FormBuilder,
    private _location: Location
  ) {
    this.tiposLeftArray = this.preencheTiposLeftArray();
    this.tiposRightArray = this.preencheTiposRightArray();
    this.formTipoRural = this.criaFormulario();
    this.subPerfis = this.tiposLeftArray.concat(this.tiposRightArray);
    this.mobile = configureMenuByWindowSize(window.screen.width);
    this.preencherTipoRural();
  }

  preencherTipoRural(): void {
    if (this._ligacaoNovaService.getSubPerfilEscolhido) {
      this.formTipoRural.patchValue({
        tipoRural: this._ligacaoNovaService.getSubPerfilEscolhido.label,
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  criaFormulario(): FormGroup {
    return this._formBuilder.group({
      tipoRural: [this._ligacaoNovaService.getSubPerfilEscolhido, Validators.required]
    });
  }

  continuar(): void {
    let propriedade: SubPerfilRural = this.subPerfis.find(field => field.label === this.formTipoRural.value.tipoRural) ?? new SubPerfilRural();
    this._ligacaoNovaService.setSubPerfilEscolhido = propriedade;
    this._router.navigate(['ligacao-nova', 'pedido', 'documentos-necessarios']);
  }

  voltar(): void {
    this._location.back();
  }

  preencheTiposLeftArray(): Array<SubPerfilRural> {
    return [
      {
        label: 'RESIDENCIAL RURAL',
        route: 'residencial-rural',
        textoTooltip: 'Residência localizada na área rural, com fim residencial, utilizada por trabalhador rural ou aposentado nesta condição.',
        disabled: this._userServiceLN.tipoDocumento == 'CPF' ? false : true
      },
      {
        label: 'AGROPECUÁRIA RURAL',
        route: 'agropecuaria-rural',
        textoTooltip: 'Localizada na área rural, onde seja desenvolvida atividade relativa à agropecuária.',
        disabled: false
      },
      {
        label: 'ESCOLA AGROTÉCNICA',
        route: 'escola-agrotecnica',
        textoTooltip: 'Estabelecimento de ensino direcionado à agropecuária, localizado na área rural, sem fins lucrativos e explorada por entidade pertencente ou vinculada à Administração Direta, Indireta ou Fundações de Direito Público da União, dos Estados, Distrito Federal ou dos Municípios.',
        disabled: this._userServiceLN.tipoDocumento == 'CPF' ? true : false
      },
      {
        label: 'AQUICULTOR',
        route: 'aquicultor',
        textoTooltip: 'Cargas específicas utilizadas no bombeamento para captação de água e dos tanques de criação, no berçário, na aeração e na iluminação nesses locais.',
        disabled: false
      },
    ];
  }

  preencheTiposRightArray(): Array<SubPerfilRural> {
    return [
      {
        label: 'AGROINDUSTRIAL',
        route: 'agroindustrial',
        textoTooltip: 'Indústrias de transformação ou beneficiamento de produtos advindos diretamente da agropecuária, mesmo que oriundos de outras propriedades, independentemente de sua localização, desde que a potência nominal total do transformador seja de até 112,5 KVA.',
        disabled: this._userServiceLN.tipoDocumento == 'CPF' ? true : false
      },
      {
        label: 'AGROPECUÁRIA URBANA',
        route: 'agropecuaria-urbana',
        textoTooltip: 'Localizada na área urbana, onde seja desenvolvida atividade relativa à agropecuária.',
        disabled: false
      },
      {
        label: 'SERVIÇO PÚBLICO DE IRRIGAÇÃO',
        route: 'servico-publico-de-irrigacao',
        textoTooltip: 'Serviço público de irrigação rural localizado na área rural em que seja desenvolvida a atividade de irrigação e explorado por entidade pertencente ou vinculada à Administração Direta, Indireta ou Fundações de Direito Público da União, dos Estados, Distrito Federal ou dos Municípios.',
        disabled: this._userServiceLN.tipoDocumento == 'CPF' ? true : false
      },
      {
        label: 'IRRIGANTE',
        route: 'irrigante',
        textoTooltip: 'Cargas específicas utilizadas no bombeamento para captação de água e adução, na injeção de fertilizantes na linha de irrigação, na aplicação da água no solo mediante o uso de técnicas específicas e na iluminação dos locais de instalação desses equipamentos.',
        disabled: false
      },
    ];
  }
}
