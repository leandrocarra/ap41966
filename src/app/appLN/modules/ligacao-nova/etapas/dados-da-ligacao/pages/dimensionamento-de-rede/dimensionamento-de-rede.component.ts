import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DimensionamentoDeRede, tipoCategoria } from '../../../../../../core/models/dados-da-ligacao/dados-da-ligacao';
import { CalculadoraUtilsService } from '../../../../../../core/services/calculadora/calculadora-utils.service';
import { DadosDaLigacaoService } from '../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';

@Component({
	selector: 'neo-dimensionamento-de-rede',
	templateUrl: './dimensionamento-de-rede.component.html',
	styleUrls: ['./dimensionamento-de-rede.component.scss']
})
export class DimensionamentoDeRedeComponent implements OnInit {
	options: Array<string>;
	categorias: Array<tipoCategoria>;
	possuiART: string;
	tituloPerguntaART: string;
	subTituloPerguntaART: string;
	possuiCargasEspeciais: string;
	possui220: string;
	categoria: tipoCategoria;
	fluxoResidencial: boolean;
	perfil: string;
	perfisFluxoNaoResidencial: Array<string> = ['INDUSTRIAL', 'COMERCIAL', 'BENEFÍCIO RURAL'];

	constructor(
		private _router: Router,
		private _alert: CustomSweetAlertService,
		private _ligacaoNovaService: LigacaoNovaService,
		private _dadosDaLigacaoService: DadosDaLigacaoService,
		private _dadosDoImovelService: DadosDoImovelService,
		private _calculadoraUtils: CalculadoraUtilsService,
		private _location: Location,
	) {
		this.options = [
			'NÃO SEI',
			'NÃO',
			'SIM'
		];
		this.categorias = [
			'MONOFÁSICA',
			'BIFÁSICA',
			'TRIFÁSICA'
		];
        this.tituloPerguntaART = '';
        this.subTituloPerguntaART = '';
		this.possuiART = this._dadosDaLigacaoService.dadosDaLigacao.dimensionamentoDeRede.possuiART;
		this.possuiCargasEspeciais = this._dadosDaLigacaoService.dadosDaLigacao.dimensionamentoDeRede.possuiCargasEspeciais;
		this.possui220 = this._dadosDaLigacaoService.dadosDaLigacao.dimensionamentoDeRede.possui220;
		this.categoria = this._dadosDaLigacaoService.dadosDaLigacao.categoria;
		this.perfil = this._ligacaoNovaService.getPerfilEscolhido.perfil;
		this.fluxoResidencial = ((this.perfil === 'RESIDENCIAL') || (this.perfil === 'BENEFÍCIO RURAL' && this._ligacaoNovaService.getSubPerfilEscolhido!.label === 'RESIDENCIAL RURAL')) ? true : false;
		this.preparaPerguntasART();
	}

	ngOnInit(): void {
		if (this.perfil === 'INDUSTRIAL') {
			this.prepararDimensionamentoIndustrial();
		}
	}

	preparaPerguntasART(): void {
		if (this.perfil === 'INDUSTRIAL' && this._dadosDoImovelService.getEndereco.apartamento) {
			this.tituloPerguntaART = 'Qual é o tipo de ligação do seu prédio ou condomínio?';
			this.subTituloPerguntaART = 'Caso não saiba responder, consulte o síndico ou construtora para obter essa informação.';
		} else {
			this.tituloPerguntaART = 'Qual é o tipo de ligação do seu imóvel?';
			this.subTituloPerguntaART = 'Você pode consultar qual a categoria da ligação com o responsável técnico pela documentação.';
		}
	}

	prepararDimensionamentoIndustrial(): void {
		this.possuiART = "SIM";
	}

	deveDesabilitarBotao(): boolean {
		if (this.fluxoResidencial) {
			return this.validarFluxoRedisencial();
		} else {
			return this.validarFluxoNaoResidencial();
		}
	}

	validarFluxoRedisencial(): boolean {
		if (this.possuiART === 'SIM') {
			return this.validarPossuiArt();
		} else {
			if (this.possuiCargasEspeciais === 'SIM') {
				this.possui220 = '';
				this.categoria = '';
				this._dadosDaLigacaoService.setAnexoART = [];
				return false;
			} else {
				return this.validarNaoPossuiArt();
			}
		}
	}

	validarFluxoNaoResidencial(): boolean {
		if (this.possuiART == "SIM") {
			return this.validarPossuiArt();
		} else {
			return (this.possuiART === 'NÃO' || this.possuiART === 'NÃO SEI') ? false : true;
		}
	}

	validarPossuiArt(): boolean {
		this.possuiCargasEspeciais = '';
		this.possui220 = '';
		if (this.categoria !== "" && this._dadosDaLigacaoService.checkArt()) {
			return false;
		} else {
			return true;
		}
	}

	validarNaoPossuiArt(): boolean {
		this.categoria = '';
		this._dadosDaLigacaoService.setAnexoART = [];
		if (this.possuiART === '') {
			return true;
		} else {
			if (this.possui220 === '') {
				return true;
			} else {
				return false;
			}
		}
	}

	atualizarDados(): void {
		let dimensionamento = this._calculadoraUtils.itensCategoriaApartamento[this.categoria];
		let dimensionamentoDeRede = new DimensionamentoDeRede(this.possuiART, this.possuiCargasEspeciais, this.possui220);
		this._dadosDaLigacaoService.setDimensionamentoDeRede = dimensionamentoDeRede;
		if (this._dadosDaLigacaoService.dadosDaLigacao.dimensionamentoDeRede.possuiART === 'SIM') {
			this._dadosDaLigacaoService.definirDimensionamentoDeRede(
				"CATEGORIA",
				dimensionamento.categoria,
				[dimensionamento.equipamentos],
				dimensionamento.potencia
			);
		}
	}

	voltar(): void {
		this._location.back();
	}

	continuar(): void {
		this.redirect();
	}

	redirect(): void {
		this.atualizarDados();
		if (this._dadosDaLigacaoService.dadosDaLigacao.dimensionamentoDeRede.possuiART === 'SIM') {
			if (this.perfisFluxoNaoResidencial.includes(this.perfil)) {
				this._alert.alertConfirmacaoDeCategoria(this.categoria).then((r) => {
					if (r.dismiss) {
						this._dadosDaLigacaoService.tipoDimensionamento = "CATEGORIA";
						this._router.navigate(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);
					}
				});
			} else {
				this._router.navigate(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);
			}
		} else {
			this.redirectCalculadoraCombo();
		}
	}

	redirectCalculadoraCombo(): void {
		if (!this.fluxoResidencial && this.perfisFluxoNaoResidencial.includes(this.perfil)) {
			this._router.navigate(["ligacao-nova", "dados-da-ligacao", "calculadora"]);
		} else {
			if (this._dadosDaLigacaoService.dadosDaLigacao.dimensionamentoDeRede.possuiCargasEspeciais === 'SIM') {
				this._router.navigate(["ligacao-nova", "dados-da-ligacao", "calculadora"]);
			} else {
				this._router.navigate(["ligacao-nova", "dados-da-ligacao", "combos"]);
			}
		}
	}

}
