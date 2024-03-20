import { Component, HostListener } from '@angular/core';
import { environment } from '@environments/environment';
import { Distribuidora } from 'app/core/enums/distribuidoras';
import { AlertaConsumo } from 'app/core/models/hitorico-de-consumo/historico-de-consumo';
import { HistoricoDeConsumoService } from 'app/core/services/historico-de-consumo/historico-de-consumo.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';

@Component({
	selector: 'app-alerta-consumo',
	templateUrl: './alerta-consumo.component.html',
	styleUrls: ['./alerta-consumo.component.scss']
})
export class AlertaConsumoComponent {

	youtubeURL: string;
	paginaInstitucionalUrl: string;
	consumoAtual: string;
	consumoAnterior: string;
	alertaConsumo: AlertaConsumo;
	mobile: boolean = false;

	constructor(
		private _historicoDeConsumo: HistoricoDeConsumoService,
		private _agenciaService: AgenciaVirtualService
	) {
		this.mobile = configureMenuByWindowSize(window.screen.width);
		this.consumoAnterior = this._historicoDeConsumo.obterPenultimaLeitura().consumoKw
		this.consumoAtual = this._historicoDeConsumo.obterUltimaLeitura().consumoKw;

		this.alertaConsumo = {
			titulo: (parseInt(this.consumoAtual, 10) < parseInt(this.consumoAnterior, 10)) ? "PARABÉNS, SEGUIU AS NOSSAS DICAS E ECONOMIZOU NA CONTA DE ENERGIA!" : "ALERTA PARA O AUMENTO DO CONSUMO DE ENERGIA",
			mensagem: (parseInt(this.consumoAtual, 10) < parseInt(this.consumoAnterior, 10)) ? `${parseInt(this.consumoAnterior, 10) - parseInt(this.consumoAtual, 10)} kWh menor que o mês anterior.` : `${parseInt(this.consumoAnterior, 10) - parseInt(this.consumoAtual, 10)} kWh maior que o mês anterior.`,
			icone: (parseInt(this.consumoAtual, 10) < parseInt(this.consumoAnterior, 10)) ? "trending_down" : "trending_up",
			classeIcone: (parseInt(this.consumoAtual, 10) < parseInt(this.consumoAnterior, 10)) ? "icon-green" : "icon-red",
			classeTexto: (parseInt(this.consumoAtual, 10) < parseInt(this.consumoAnterior, 10)) ? "text-green" : "text-red"
		}

		this.youtubeURL = this._agenciaService.linksNeoenergia.youtubeURL;
		this.paginaInstitucionalUrl = this._agenciaService.linksNeoenergia.paginaInstitucionalURL;
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth, 767);
	}

}
