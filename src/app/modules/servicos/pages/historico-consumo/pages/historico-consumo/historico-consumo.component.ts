import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { UserService } from "app/core/services/user/user.service";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";
import { ConsumosRequestDTO } from 'app/core/models/hitorico-de-consumo/old/consumosRequestDTO.model';
import { ConsumosResponseDTO } from 'app/core/models/hitorico-de-consumo/old/consumosResponseDTO.model';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';
import { ActivatedRoute } from "@angular/router";
import { SegundaViaService } from "app/core/services/segunda-via/segunda-via.service";
import { FaturaDTO } from "app/core/models/segunda-via/response/segunda-via-response-dto";
import { Alerta } from "app/core/models/home/home";
import { whatsAppUrl } from "app/core/services/utils/utils.service";
import { ChangeDetectorRef } from '@angular/core';
import { HistoricoDeConsumoService } from "app/core/services/historico-de-consumo/historico-de-consumo.service";
import { ConsumosDTOResponse, LeituraDeConsumoDTO } from "app/core/models/hitorico-de-consumo/response/historico-de-consumo-dto";
import { AccordionHistoricoComponent } from "app/shared/components/accordion-historico/accordion-historico.component";

const NUMERO_DE_FATURAS_VISIVEIS: number = 13;

@Component({
  selector: "app-historico-consumo",
  templateUrl: "./historico-consumo.component.html",
  styleUrls: ["./historico-consumo.component.scss"],
})
export class HistoricoConsumoComponent implements AfterViewInit {
    ativarDados: any = [];
    pageSize = 13;

    mobile: boolean;
    grupoDoUsuario: string;

    isTela = 'historicoConsumo';
    isTelaHistorico = true;

    consumosRequestDTO = new ConsumosRequestDTO();
    consumosResponseDTO = new ConsumosResponseDTO();


    @ViewChild(AccordionHistoricoComponent, { static: false })
    accordion!: AccordionHistoricoComponent;

    @ViewChild(PaginationComponent, { static: false })
    pagination!: PaginationComponent;

    youtubeURL = "https://www.youtube.com/watch?v=6lfzFQ2KhEQ";
    paginaInstitucionalUrl =
        "https://www.elektro.com.br/sua-casa/dicas-de-economia-e-seguranca-com-energia-eletrica";

    itens: Array<{fatura: FaturaDTO, historico: boolean | LeituraDeConsumoDTO}> = [];
    faturasExibidas: Array<{fatura: FaturaDTO, historico: boolean | LeituraDeConsumoDTO}> = []
    faturas: Array<{fatura: FaturaDTO, historico: boolean | LeituraDeConsumoDTO}> = [];
    card!: Alerta;

    exibirPaginacao: boolean = false;

    consumos: ConsumosDTOResponse;

    constructor(
        private _user: UserService,
        private _segundaViaService: SegundaViaService,
        private cdref: ChangeDetectorRef,
        private _historicoDeConsumo: HistoricoDeConsumoService,
    ) {
        this.mobile = configureMenuByWindowSize(window.screen.width);
        this.grupoDoUsuario = this._user.group;
        this.consumos = this._historicoDeConsumo.getHistoricoConsumo;
        this.setDadosFaturas();
    }

    ngAfterViewInit(): void {
		this.setDadosFaturas();
		this.accordion.itens = this.faturasExibidas;
		this.pagination.ativarDados = this.faturasExibidas;
		this.pagination.collections = this.faturas;
        this.cdref.detectChanges();
	}

	eventFilter(event: any): void {
		this.ativarDados = event;
		this.accordion.itens = event;
        this.pagination.numberPagination(event);
	}

	eventClear(event: any): void {
		if (event) {
			this.accordion.itens = this.faturasExibidas;
			this.ativarDados = this.faturasExibidas;
			this.pagination.numberPagination(this.faturas);
			this.pagination.pageIndex = 1;
		}
	}

	eventSelectAll(event: any): void {
		this.accordion.checkedAll(event);
	}

	baixarFaturas(): void {
		this.accordion.baixarFaturas();
	}

	eventPagination(event: any): void {
		this.accordion.itens = event;
        this.pagination.numberPagination(this.faturas);
	}

	eventOutputFiltered(event: any) {
		this.pagination.collections = event;
		this.pagination.pageIndex = 1;
	}

	criarCards(): Alerta | void {
		if (this._segundaViaService.getDadosSegundaVia.faturasVencidas > 0) {
			this.card = new Alerta("falta_energia_vermelho.svg", true, whatsAppUrl('Negociação de dívidas'), "Negociar", "Faturas atrasadas com risco de suspensão do fornecimento!", `O imóvel possui ${this._segundaViaService.getDadosSegundaVia.faturasVencidas} fatura(s) vencida(s). Não corra o risco de ficar sem energia elétrica!`, "text-danger")
		}
	}

	preencherFaturasExibidas(): Array<{fatura: FaturaDTO, historico: boolean | LeituraDeConsumoDTO}> {
		return (this.exibirPaginacao) ? this.faturas.slice(0, NUMERO_DE_FATURAS_VISIVEIS) : this.faturas;
	}

    setDadosFaturas(): void {
		const arrayFaturas = (this._segundaViaService.getDadosSegundaVia.possuiFaturas) ? this._segundaViaService.getFaturas : [];
        let objArray = []
        for (let index = 0; index < arrayFaturas.length; index++) {

            const hist = this.consumos.historicoConsumo[index] === undefined ? false : this.consumos.historicoConsumo[index]
            const fat = arrayFaturas[index]

            let data = {
                fatura: fat,
                historico: hist
            };
            objArray.push(data)
        }
        this.faturas = objArray;
        this.exibirPaginacao = (this.faturas.length >= NUMERO_DE_FATURAS_VISIVEIS);
		this.faturasExibidas = this.preencherFaturasExibidas();
        this.itens = this.faturas;
	}
}
