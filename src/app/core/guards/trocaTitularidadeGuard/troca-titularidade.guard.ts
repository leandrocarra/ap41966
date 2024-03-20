import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrocaTitularidadeGuard implements CanActivate {

  constructor(
    private _trocaTitularidadeService: TrocaDeTitularidadeService,
    private _router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.verificarAcesso(state);
  }

  canLoad(state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso(state);
  }

  private verificarAcesso(state: any) {
    if (this._trocaTitularidadeService.setTitular() == 'euMesmo') {
      this.fluxoNovoTitular(state);
    } else if (this._trocaTitularidadeService.setTitular() == 'outro') {
      this.fluxoAntigoTitular(state);
    }
    return true;
  }

  fluxoNovoTitular(state: any) {

  }

  fluxoAntigoTitular(state: any) {
    if (state.url && state.url.includes('pendencias-em-aberto')) {
      return this.verificarTitular();
    } else if (state.url && state.url == '/servicos/troca-de-titularidade/antigo-titular/imovel-endereco') {
      return this.verificarImovel();
    } else if (state.url && state.url == '/servicos/troca-de-titularidade/antigo-titular/documento-procuracao') {
      return this.verificarDadosTitular();
    } else if (state.url && state.url == '/servicos/troca-de-titularidade/antigo-titular/documento-com-foto-terceiro') {
      return this.verificarDocumento();
    } else if (state.url && state.url == '/servicos/troca-de-titularidade/antigo-titular/informar-novo-titular') {
      return this.verificarDocumentoFoto();
    } else if (state.url && state.url == '/servicos/troca-de-titularidade/antigo-titular/contato-novo-titular') {
      return this.verificarDadosTitular();
    } else if (state.url && state.url == '/servicos/troca-de-titularidade/antigo-titular/confirmar') {
      return this.confirmarTela();
    } else if (state.path && state.path == 'solicitacao-enviada') {
      return this.solicitacaoEnviada();
    } else if (state.url && state.url == '/servicos/troca-de-titularidade/antigo-titular/solicitacao-enviada') {
      return this.solicitacaoEnviada();
    }
  }

  verificarTitular() {
    if (this._trocaTitularidadeService.setTitular() == 'euMesmo' || this._trocaTitularidadeService.setTitular() == 'outro') {
      return true;
    }
    this._router.navigate(['login']);
  }

  verificarImovel() {
    if (this._trocaTitularidadeService.setImovel() || this._trocaTitularidadeService.setDadosTitular()) {
      return true;
    }
    this._router.navigate(['login']);
  }

  verificarDadosTitular() {
    if (this._trocaTitularidadeService.setDadosTitular()) {
      return true;
    }
    this._router.navigate(['login']);
  }

  verificarDocumento() {
    if (this._trocaTitularidadeService.setDocumentoProcuracao() == 'Documento de Procuração') {
        return true;
    }
    this._router.navigate(['login']);
  }

  verificarDocumentoFoto() {
    if (this._trocaTitularidadeService.setDocumentoFoto()) {
        return true;
    }
    this._router.navigate(['login']);
  }

  confirmarTela() {
    if (this._trocaTitularidadeService.setConfirmarTela()) {
        return true;
    }
    this._router.navigate(['login']);
  }

  solicitacaoEnviada() {
    if (this._trocaTitularidadeService.setSolicitacaoEnviada()) {
        return true;
    }
    this._router.navigate(['login']);
  }
}
