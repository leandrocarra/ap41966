import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalculadoraUtilsService } from '../../../../../../core/services/calculadora/calculadora-utils.service';
import { DadosDaLigacaoService } from '../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';
import { tipoCategoria } from 'app/appLN/core/models/dados-da-ligacao/dados-da-ligacao';

@Component({
  selector: 'neo-questionario-apartamento',
  templateUrl: './questionario-apartamento.component.html',
  styleUrls: ['./questionario-apartamento.component.scss']
})
export class QuestionarioApartamentoComponent {

  isDisabled: boolean = true;
  categoriaApt: tipoCategoria;

  constructor(
    private _router: Router,
    private _location: Location,
    private _alert: CustomSweetAlertService,
    private _dadosDaLigacaoService: DadosDaLigacaoService,
    private _calculadoraUtils: CalculadoraUtilsService,
    private _ligacaoNovaService: LigacaoNovaService,

  ) {
    this.categoriaApt = this._dadosDaLigacaoService.getCategoria;
  }

  voltar(): void {
    this._location.back();
  }

  continuar(): void {
    let itemApartamento = this._calculadoraUtils.itensCategoriaApartamento[this.categoriaApt];
    this._dadosDaLigacaoService.definirDimensionamentoDeRede(
			"CATEGORIA",
			itemApartamento.categoria,
			[itemApartamento.equipamentos],
			itemApartamento.potencia
		);

    this._dadosDaLigacaoService.tipoDimensionamento = "CATEGORIA";
    if (this._ligacaoNovaService.getPerfilEscolhido.perfil === 'COMERCIAL') {
      this._alert.alertConfirmacaoDeCategoria(this.categoriaApt).then((r) => {
        if (r.dismiss) {
          this._router.navigate(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);
        }
      });

    } else {
      this._router.navigate(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);

    }
  }

}
