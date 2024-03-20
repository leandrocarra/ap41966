import { Location } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumTipificacaoFaturaDigital, FaturaDigital, OpcoesDeEnvio, EnumRecebimento } from 'app/core/models/fatura-digital/fatura-digital';
import { SubRotasFaturaDigital } from 'app/core/models/fatura-digital/sub-rotas-fatura-digital';
import { FaturaDigitalService } from 'app/core/services/fatura-digital/fatura-digital.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
	selector: 'app-opcoes-fatura-digital',
	templateUrl: './opcoes-fatura-digital.component.html',
	styleUrls: ['./opcoes-fatura-digital.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OpcoesFaturaDigitalComponent {
	grupoDoUsuario: string;
	dadosFaturaDigital: FaturaDigital;
	tipoRecebimento: string;
	canalDeEnvio: string;
	constructor(
		private _user: UserService,
		private _location: Location,
		private _router: Router,
		private _faturaDigitalService: FaturaDigitalService,
	) {
		this._user.breadcrumb = true;
		this._user.isFluxo = true;
		this.grupoDoUsuario = this._user.group;
		this.dadosFaturaDigital = this._faturaDigitalService.fluxoFaturaDigital;
		this.tipoRecebimento = this._faturaDigitalService.fluxoFaturaDigital.modoDeEnvioAtual.label;
		this.canalDeEnvio = this.dadosFaturaDigital.opcoesDeEnvio.find((item) => item.label === this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio.label)?.label ?? "";
	}

	voltar(): void {
		this._location.back();
	}

	continuar(): void {
		if (this.dadosFaturaDigital.opcoesDeEnvio.find(f => f.label === this.canalDeEnvio)) {
			let opcaoEscolhida: OpcoesDeEnvio = this.dadosFaturaDigital.opcoesDeEnvio.find(f => f.label === this.canalDeEnvio) ?? new OpcoesDeEnvio(EnumRecebimento.novoEmail, "");
			this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio = opcaoEscolhida;
			if (opcaoEscolhida.label === EnumRecebimento.novoEmail || opcaoEscolhida.label === EnumRecebimento.novoWhatsapp) {
				this._router.navigate([PathCompleto.faturaDigital, SubRotasFaturaDigital.alterarFaturaDigital]);
			} else {
				this._faturaDigitalService.fluxoFaturaDigital.tipificacao = EnumTipificacaoFaturaDigital.Cadastro;
				this._router.navigate([PathCompleto.faturaDigital, SubRotasFaturaDigital.confirmarFaturaDigital]);
			}
		}
	}
}
