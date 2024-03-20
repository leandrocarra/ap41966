import { Injectable } from '@angular/core';
import { SolicitacaoEnviada } from 'app/shared/models/solicitacao-enviada/solicitacao-enviada';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoEnviadaService {

  private _solicitacaoEnviada: SolicitacaoEnviada;

  constructor() {
    this._solicitacaoEnviada = new SolicitacaoEnviada();
  }

  /**
   * Getters e Setters
   */

  set setSolicitacaoEnviada(dados: SolicitacaoEnviada) {
    this._solicitacaoEnviada = dados;
  }

  get getSolicitacaoEnviada(): SolicitacaoEnviada {
    return this._solicitacaoEnviada;
  }

}
