import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { ValidaAutoleituraDTOResponse } from 'app/core/models/autoleitura/response/autoleitura-dto';
import { EnumTipificacaoInformacao } from 'app/core/models/falta-de-energia/fluxo-falta-de-energia';
import { FaltaEnergiaOcorrenciaDTOResponse } from 'app/core/models/falta-de-energia/responses/falta-de-energia-dto';
import { Alerta } from 'app/core/models/home/home';
import { SubRotasMultiloginCadastro } from 'app/core/models/multilogin/multilogin-cadastro';
import { FaturaDTO } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { Status, StatusFatura } from 'app/core/models/segunda-via/segunda-via.model';
import { AutoleituraService } from 'app/core/services/autoleitura/autoleitura.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { FaltaDeEnergiaService } from 'app/core/services/falta-de-energia/falta-de-energia.service';
import { ReligacaoService } from 'app/core/services/religacao/religacao.service';
import { SegundaViaService } from "app/core/services/segunda-via/segunda-via.service";
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { converterHora, initialCapitalize } from 'app/core/services/utils/neo-utils.service';
import { whatsAppUrl } from 'app/core/services/utils/utils.service';

@Component({
	selector: 'app-home-avisos',
	templateUrl: './home-avisos.component.html',
	styleUrls: ['./home-avisos.component.scss']
})
export class HomeAvisosComponent {
	cards: Array<Alerta>;

	constructor(
		private _loadingService: LoadingService,
		private _faltaDeEnergiaService: FaltaDeEnergiaService,
		private _segundaViaService: SegundaViaService,
		private _religacaoService: ReligacaoService,
		private _selecaoImovelService: SelecaoImovelService,
		private _autoleituraService: AutoleituraService
	) {
		this.cards = [];
		this.cards.push(
			new Alerta("formulario_cadastro.svg", true, `${PathCompleto.multiloginCadastro}/${SubRotasMultiloginCadastro.CadastroDeParceiros}`, "Acessar","Cadastro Imobiliário e Credenciado","Cadastre sua Imobiliária ou Loja Credenciada e conceda acesso aos seus colaboradores", "text-light-blue" )
		);
		this.consultarFaturasVencidas();
		if (environment.regiao == Regiao.SE) {
			this.consultarPeriodoLeituraSE();
			this.consultarOcorrenciaFaltaDeEnergia();
		}
	}


	consultarPeriodoLeituraSE(): void {
		let request = this._autoleituraService.requestValidaAutoleitura("");
		this._autoleituraService.validaAutoleitura(request).subscribe({
			next: (data: ValidaAutoleituraDTOResponse) => {
				this._autoleituraService.definirPeriodoDeLeitura(data);
				if (data.isValidAutoleitura) {
					if (this._autoleituraService.autoleitura.dentroDoPeriodoDeLeitura) {
						this.cards.push(
							new Alerta("help_outline_black_24dp.svg", true, PathCompleto.autoleitura, "Acessar", "Faça a sua autoleitura agora!", `Faça você mesmo o registro da sua leitura. A próxima data viável para informar a leitura é dia ${this._autoleituraService.autoleitura.dataInicio?.toLocaleDateString()} até ${this._autoleituraService.autoleitura.dataFim?.toLocaleDateString()}.`, "text-danger"),
						);
					}
				}
			},
			complete: () => {
				this._loadingService.stop();
			}
		})
	}

	consultarFaltaDeEnergia(byPassActiv: boolean): void {
		this._faltaDeEnergiaService.consultarFaltaEnergia(byPassActiv).subscribe({
			next: (data: any) => {
				this._faltaDeEnergiaService.setFaltaDeEnergia = data;
				let dadosFaltaDeEnergia = (data.length > 0) ? data[0] : data;
					if (this._faltaDeEnergiaService.getOcorrenciaFaltaDeEnergia.chamadosPendentes == 'Sim' && this._faltaDeEnergiaService.dataDeOcorrenciaValida(dadosFaltaDeEnergia.dataHoraCombinada)) {
						this.cards.push(
							new Alerta("falta_energia_azul.svg", true, PathCompleto.faltaDeEnergia, "Acessar", "Falta de Energia já identificada!", `Trata-se de uma interrupção imprevista na rede elétrica da ${initialCapitalize(environment.title.split(" ")[1])}. Previsão de retorno às ${converterHora(dadosFaltaDeEnergia.dataHoraCombinada.toString())} horas.`, "text-dark-blue")
						);
					} else if (this._faltaDeEnergiaService.getOcorrenciaFaltaDeEnergia.interrupcao == 'Sim') {
						this.cards.push(
							new Alerta("falta_energia_azul.svg", true, PathCompleto.faltaDeEnergia, "Acessar", "Desligamento programado", `Estamos realizando serviços de manutenção e melhorias na rede elétrica. Previsão de retorno às ${converterHora(dadosFaltaDeEnergia.dataHoraCombinada.toString())} horas.`, "text-dark-blue")
						);
					}
			},
			complete: () => {
				this._loadingService.stop();
			}
		});
	}

	consultarOcorrenciaFaltaDeEnergia(): void {
		this._faltaDeEnergiaService.consultarOcorrencia(EnumTipificacaoInformacao.FaltaIndividual, true).subscribe({
			next: (data: FaltaEnergiaOcorrenciaDTOResponse) => {
				this._faltaDeEnergiaService.setOcorrenciaFaltaDeEnergia = data;
				if (data.interrupcao == 'Sim' || data.chamadosPendentes == 'Sim') {
					this.consultarFaltaDeEnergia(true);
				}
			},
			complete: () => {
				this._loadingService.stop();
			}
		});
	}

	consultarFaturasVencidas(): void {
		let contadorFaturasVencidas: number = 0;
		this._religacaoService.dadosReligacao.faturas = [];

		if (this._segundaViaService.getDadosSegundaVia.possuiFaturas) {
			let faturaVencidas: Array<FaturaDTO> = this._segundaViaService.getFaturas;
			faturaVencidas.forEach((elem: FaturaDTO) => {

				if (StatusFatura[elem.statusFatura.toLowerCase() as Status] == StatusFatura.vencida) {
					contadorFaturasVencidas++;
				}

				// Regra de negócio 10 - Religação
				// Exibidos todos os tipos de faturas existente como pendente de pagamento na API: exceto as vinculadas (SE)
				if (StatusFatura[elem.statusFatura.toLowerCase() as Status] !== StatusFatura.vinculada &&
					StatusFatura[elem.statusFatura.toLowerCase() as Status] !== StatusFatura.pago) {
					this._religacaoService.dadosReligacao.faturas?.push(elem);
				}

			});

			// Regra de negócio 10 - Religação
			// Exibidos todos os tipos de faturas existente como pendente de pagamento na API: as faturas coletivas filhas (NE).
			if (environment.regiao === Regiao.NE && this._selecaoImovelService.getUCSelecionada?.isGrupo == 'X') {
				this._religacaoService.dadosReligacao.faturas = [];
			}

			this._segundaViaService.dadosSegundaVia.faturasVencidas = contadorFaturasVencidas;
			this._segundaViaService.setDadosSegundaVia = this._segundaViaService.dadosSegundaVia;
			this._religacaoService.setDadosReligacao = this._religacaoService.dadosReligacao;

			if (contadorFaturasVencidas > 0) {
				this.cards.push(
					new Alerta("falta_energia_vermelho.svg", true, whatsAppUrl('Negociação de dívidas'), "Negociar", "Faturas atrasadas com risco de suspensão do fornecimento!", `O imóvel possui ${contadorFaturasVencidas} fatura(s) vencida(s). Não corra o risco de ficar sem energia elétrica!`, "text-danger"),
				)
			}

		}
	}

}


