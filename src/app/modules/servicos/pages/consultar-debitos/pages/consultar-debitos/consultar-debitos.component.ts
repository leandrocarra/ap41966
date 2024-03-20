import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { Alerta } from "app/core/models/home/home";
import { FaturaDTO } from "app/core/models/segunda-via/response/segunda-via-response-dto";
import { SegundaViaService } from "app/core/services/segunda-via/segunda-via.service";
import { UserService } from "app/core/services/user/user.service";
import { whatsAppUrl } from "app/core/services/utils/utils.service";
import { AccordionComponent } from "app/shared/components/accordion/accordion.component";
import { PaginationComponent } from 'app/shared/components/pagination/pagination.component';

const NUMERO_DE_FATURAS_VISIVEIS: number = 5;
@Component({
	selector: "app-consultar-debitos",
	templateUrl: "./consultar-debitos.component.html",
	styleUrls: ["./consultar-debitos.component.scss"],
})
export class ConsultarDebitosComponent implements AfterViewInit {

	faturas: Array<FaturaDTO> = [];
	grupoDoUsuario: string;
	panelOpenState = false; //variavel do accordion
	ativarDados: any = [];
	pageSize : number;
	statusFilter: any;
	selectall: boolean = false;
	card!: Alerta;
	exibirPaginacao: boolean = false;
	faturasExibidas: Array<FaturaDTO> = []

	@ViewChild(PaginationComponent, { static: false })
	pagination!: PaginationComponent;

	@ViewChild(AccordionComponent, { static: false })
	accordion!: AccordionComponent;

	constructor(
		private _userService: UserService,
		private _segundaViaService: SegundaViaService,
	) {
		window.scrollTo(0, 0);
		this.criarCards();
		this.grupoDoUsuario = this._userService.group;
		this.setDadosFaturas();
		this.pageSize = this._segundaViaService.dadosSegundaVia.pageSize;
	}

	ngAfterViewInit(): void {
		this.setDadosFaturas();
		this.accordion.itens = this.faturasExibidas;
		this.pagination.ativarDados = this.faturasExibidas;
		this.pagination.collections = this.faturas;
	}

	eventFilter(event: any): void {
		this.ativarDados = event;
		this.accordion.itens = event;
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
		this._segundaViaService.dadosSegundaVia.indicePagina = this.pagination.pageIndex;
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

	preencherFaturasExibidas(): Array<FaturaDTO> {
		return (this.exibirPaginacao) ? this.faturas.slice(0, NUMERO_DE_FATURAS_VISIVEIS) : this.faturas;
	}

	setDadosFaturas(): void {
		this.faturas = (this._segundaViaService.getDadosSegundaVia.possuiFaturas) ? this._segundaViaService.getFaturas : [];
		this.exibirPaginacao = (this.faturas.length >= NUMERO_DE_FATURAS_VISIVEIS);
		this.faturasExibidas = this.preencherFaturasExibidas();
	}
}

