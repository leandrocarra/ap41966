import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DadosDaLigacao } from '../../../../core/models/dados-da-ligacao/dados-da-ligacao';
import { DadosDoImovel } from '../../../../core/models/dados-do-imovel/endereco';
import { DadosDaLigacaoService } from '../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { DadosDoImovelService } from '../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { LigacaoNovaService } from '../../../../core/services/ligacao-nova/ligacao-nova.service';
import { UserServiceLN } from '../../../../core/services/user/user.service';
import { CustomSweetAlertService } from '../../../../core/services/sweet-alert/custom-sweet-alert.service';

@Component({
  selector: 'neo-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent {

  dadosDoImovel: DadosDoImovel
  dadosDaLigacao: DadosDaLigacao

  constructor(
    private _router: Router,
    private _location: Location,
    private _userServiceLN: UserServiceLN,
    private _alert: CustomSweetAlertService,
    private _ligacaoNovaService: LigacaoNovaService,
    private _dadosDoImovelService: DadosDoImovelService,
    private _dadosDaLigacaoService: DadosDaLigacaoService
  ) {
    this.dadosDoImovel = this._dadosDoImovelService.getDadosDoImovel;
    this.dadosDaLigacao = this._dadosDaLigacaoService.dadosDaLigacao;
    this.finalizarPedido();
  }

  enviar(): void {

    if (this._ligacaoNovaService.checkUE === true) {
      this._ligacaoNovaService.etapaJornada(this._userServiceLN.idAtendimento, 'Vistoria').subscribe((r) => { });
      this._router.navigate(["ligacao-nova", "vistoria"]);
    } else {
      this._ligacaoNovaService.etapaJornada(this._userServiceLN.idAtendimento, 'Acompanhamento Ligação').subscribe((r) => { });
      this._router.navigate(["ligacao-nova", "conclusao"]);
    }
  }


  finalizarPedido(): void {
    setTimeout(() => {
      if (this._ligacaoNovaService.checkUE) {
        if ((this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'nao' || this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'naoSei') && (this._dadosDoImovelService.getEndereco.tipoLocalizacao === 'UB'|| this._dadosDoImovelService.getEndereco.tipoLocalizacao === '' || !this._dadosDoImovelService.getEndereco.tipoLocalizacao)) {
          this._alert.alertUESemPosteUrbano(this._userServiceLN.protocoloFinal).then(r => {
            if (r.value) {
              this.enviar();
            }
          });
        } else if ((this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'nao' || this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'naoSei') && this._dadosDoImovelService.getEndereco.tipoLocalizacao === 'RR') {
          this._alert.alertUESemPosteRural(this._userServiceLN.protocoloFinal).then(r => {
            if (r.value) {
              this.enviar();
            }
          });
        } else if (this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'sim' && this._dadosDoImovelService.getEndereco.tipoLocalizacao === 'RR') {
          this._alert.alertUEComPosteRural(this._userServiceLN.protocoloFinal).then(r => {
            if (r.value) {
              this.enviar();
            }
          });
        } else if (this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'sim' && (this._dadosDoImovelService.getEndereco.tipoLocalizacao === 'UB' || this._dadosDoImovelService.getEndereco.tipoLocalizacao === '' || !this._dadosDoImovelService.getEndereco.tipoLocalizacao)) {
          this._alert.alertUEComPosteUrbano(this._userServiceLN.protocoloFinal).then(r => {
            if (r.value) {
              this.enviar();
            }
          });
        }
      } else {
        if ((this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'nao' || this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'naoSei') && (this._dadosDoImovelService.getEndereco.tipoLocalizacao === 'UB' || this._dadosDoImovelService.getEndereco.tipoLocalizacao === '' || !this._dadosDoImovelService.getEndereco.tipoLocalizacao)) {
          this._alert.alertBackofficeSemPosteUrbano(this._userServiceLN.protocoloFinal).then(r => {
            if (r.value) {
              this.enviar();
            }
          });
        } else if ((this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'nao' || this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'naoSei') && this._dadosDoImovelService.getEndereco.tipoLocalizacao === 'RR') {
          this._alert.alertBackofficeSemPosteRural(this._userServiceLN.protocoloFinal).then(r => {
            if (r.value) {
              this.enviar();
            }
          });
        } else if (this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'sim' && this._dadosDoImovelService.getEndereco.tipoLocalizacao === 'RR') {
          this._alert.alertBackofficeComPosteRural(this._userServiceLN.protocoloFinal).then(r => {
            if (r.value) {
              this.enviar();
            }
          });
        } else if (this._dadosDaLigacaoService.dadosDaLigacao.distanciaPoste === 'sim' && (this._dadosDoImovelService.getEndereco.tipoLocalizacao === 'UB' || this._dadosDoImovelService.getEndereco.tipoLocalizacao === '' || !this._dadosDoImovelService.getEndereco.tipoLocalizacao)) {
          this._alert.alertBackofficeComPosteUrbano(this._userServiceLN.protocoloFinal).then(r => {
            if (r.value) {
              this.enviar();
            }
          });
        }
      }
    }, 500)
  }

  voltar(): void {
    this._location.back();
  }

}
