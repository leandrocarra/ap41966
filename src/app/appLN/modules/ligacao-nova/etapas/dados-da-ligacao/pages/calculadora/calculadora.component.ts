import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Equipamento, tipoCategoria } from '../../../../../../core/models/dados-da-ligacao/dados-da-ligacao';
import { CalculadoraUtilsService } from '../../../../../../core/services/calculadora/calculadora-utils.service';
import { DadosDaLigacaoService } from '../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { configureMenuByWindowSize } from '../../../../../../core/services/utils/neo-utils.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';
import { DialogAlterarCategoriaService } from '../../components/dialog-alterar-categoria/dialog-alterar-categoria-service/dialog-alterar-categoria.service';

@Component({
	selector: 'neo-calculadora',
	templateUrl: './calculadora.component.html',
	styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent {
	equipamento: any;
	itensCalculadora: any[];
	equipamentosAdicionados: any = [];
	categoria: tipoCategoria;
	mobile: boolean;
	mobileXS: boolean;
	necessitaART: boolean;
	potencia: number;
	categoriaAlterada: boolean;
	categoriaAntiga: tipoCategoria;
	fluxoResidencial: boolean;

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
		this.mobileXS = configureMenuByWindowSize(event.target.innerWidth, 576);
	}

	constructor(
		private _dadosDaLigacao: DadosDaLigacaoService,
		private _calculadoraService: CalculadoraUtilsService,
		private _dialogCategoriaService: DialogAlterarCategoriaService,
		private _alert: CustomSweetAlertService,
		private _ligacaoNovaService: LigacaoNovaService,
		private _location: Location,
		private _router: Router
	) {
		this.equipamentosAdicionados = this._dadosDaLigacao.equipamentosCalculadora;
		this.necessitaART = false;
		this.categoria = this._dadosDaLigacao.getCategoria;
        this.categoriaAntiga = this.categoria;
        this.categoriaAlterada = false;
		this.mobile = configureMenuByWindowSize(window.screen.width)
		this.mobileXS = configureMenuByWindowSize(window.screen.width, 576)
		this.potencia = this._dadosDaLigacao.potencia;
		this.fluxoResidencial = (this._ligacaoNovaService.getPerfilEscolhido?.perfil === 'RESIDENCIAL' || this._ligacaoNovaService.getSubPerfilEscolhido?.label === 'RESIDENCIAL RURAL') ? true : false;
		this.itensCalculadora = this.fluxoResidencial ? this._calculadoraService.itensCalculadora['CPF'] : this._calculadoraService.itensCalculadora['CNPJ'];
	}

	adicionar(equipamento: any): void {
		this.equipamentosAdicionados.push(equipamento);
		this.calcular();
	}

	excluir(index: number): void {
		this.equipamentosAdicionados.splice(index, 1);
		this.calcular();
	}

	atualizar(equipamento: any, index: number): void {
		this.equipamentosAdicionados[index] = equipamento;
		this.calcular();
	}

	calcular(): void {
		this.verificarMotor().then((categoriaMotor: string) => {
			this._calculadoraService.calcular(this.equipamentosAdicionados).then((potencia: number) => {
				this._calculadoraService.getCategoria(potencia).then((categoria: tipoCategoria) => {
					if (categoriaMotor === 'BIFÁSICA') {
						this.categoria = categoria === 'TRIFÁSICA' ? categoria : categoriaMotor;
					} else if (categoriaMotor === 'TRIFÁSICA') {
						this.categoria = categoriaMotor;
					} else {
						this.categoria = categoria;
					}
					this.potencia = potencia;
					this.necessitaART = this.potencia > 25000 ? true : false;
				});
			});
		});
	}

	verificarMotor(): Promise<string> {
		return new Promise((resolve) => {
			let categoriaMotor = '';
			this.equipamentosAdicionados.forEach((equipamento: any) => {
				if (equipamento.equipamento === 'MOTORES/BOMBAS' && equipamento.potencia === 1450) {
					categoriaMotor = 'BIFÁSICA';
				} else if (equipamento.equipamento === 'MOTORES/BOMBAS' && equipamento.potencia === 2170) {
					categoriaMotor = 'TRIFÁSICA';
				}
			});

			resolve(categoriaMotor);
		});
	}

	selecionarEquipamento(index: number): void {
		if (this.itensCalculadora[index].selected === true) {
			this.itensCalculadora[index].selected = false;
		} else {
			this.itensCalculadora.forEach((result, i) => {
				this.itensCalculadora[i].selected = false;
			});

			this.itensCalculadora[index].selected = true;
		}
	}

	desfazerAlteracao(): void {
		this.categoriaAlterada = false;
		this.categoria = this.categoriaAntiga;
	}

	alterarCategoria(): void {
		this._dialogCategoriaService.open(this.categoria);

		this._dialogCategoriaService.alterarCategoria().subscribe((categoria: tipoCategoria) => {
			this.categoriaAlterada = categoria === this.categoria ? false : true;
			this.categoriaAntiga = this.categoriaAlterada ? this.categoria : this.categoriaAntiga;
			this.categoria = categoria;
		});
	}

	voltar(): void {
		this._location.back();
	}

	validarContinuar(): void {
		if (this.categoria === 'TRIFÁSICA' && this._dadosDaLigacao.anexos.art.length == 0 && this.necessitaART) {
			this._alert.alertWarningWithText("ATENÇÃO", "Para as solicitações de categoria TRIFÁSICA é obrigatório o envio do ART, clique no botão abaixo para carregar o documento.");
		} else {
			this.continuar();
		}
	}

	continuar(): void {
		let equipamentos: Array<Equipamento> = [];
		this.equipamentosAdicionados.forEach((equipamento: any) => {
			equipamentos.push(equipamento?.objeto);
		});

		this._dadosDaLigacao.definirDimensionamentoDeRede(
			"CALCULADORA",
			this.categoria,
			equipamentos,
			this.potencia
		);

		this._dadosDaLigacao.equipamentosCalculadora = this.equipamentosAdicionados;

		if (!this.fluxoResidencial) {
			this._alert.alertConfirmacaoDeCategoria(this.categoria).then((r) => {
				if (r.dismiss) {
					this._router.navigate(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);
				}
			})
		} else {
			this._router.navigate(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);
		}

	}
}
