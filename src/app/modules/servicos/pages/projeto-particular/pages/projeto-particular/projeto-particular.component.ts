import { ProjetoParticularService } from './../../../../../../core/services/projeto-particular/projeto-particular.service';
import { PathCompleto, Servicos } from 'app/core/enums/servicos';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projeto-particular',
  templateUrl: './projeto-particular.component.html',
  styleUrls: ['./projeto-particular.component.scss']
})
export class ProjetoParticularComponent  {

  public mobile: boolean;

  constructor(
      private _router: Router,
      private _projetoParticularService: ProjetoParticularService
  ) {
    this.mobile = window.screen.width < 768 ? true : false;
    this._projetoParticularService.fluxoIniciado = true;
  }

  voltar(){
    this._router.navigate([PathCompleto.meusImoveis]);
  }

  solicitarAnalise(){
    this._router.navigate([`${PathCompleto.home}servicos/${Servicos.projetoParticular}/${Servicos.projetoParticularFormulario}`]);
  }
}
