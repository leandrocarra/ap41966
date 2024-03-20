import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { accordionHeader } from "app/core/models/debitos_historico.model";
import { UserService } from "app/core/services/user/user.service";
import { AccordionComponent } from "app/shared/components/accordion/accordion.component";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";


@Component({
	selector: "app-historico-consumo",
	templateUrl: "./historico-consumo-a.component.html",
	styleUrls: ["./historico-consumo-a.component.scss"],
})
export class HistoricoConsumoAComponent implements OnInit {

	@ViewChild(AccordionComponent, { static: false })
	accordion!: AccordionComponent;

	@ViewChild(PaginationComponent, { static: false })
	pagination!: PaginationComponent;

	isTelaHistorico: boolean = true;
	ativarDados: Array<any> = [];
	isTela = 'historicoConsumo';
	showIframe: boolean = false;
	iframeURL: any;


	itens: accordionHeader[] = [
		{
			imovel: "987654321",
			vencimento: "12/01/2021",
			valor: "249,00",
			situacao: "A vencer",
			consumo: "122",
			isSelected: false,
			estilo: "t-color-blue-royal-100",
		},
		{
			imovel: "987654321",
			vencimento: "12/12/2020",
			valor: "249,00",
			situacao: "Atrasada",
			consumo: "992",
			isSelected: false,
			estilo: "t-color-red-200",
		},
		{
			imovel: "987654321",
			vencimento: "12/12/2022",
			valor: "249,00",
			situacao: "Em processamento",
			consumo: "433",
			isSelected: false,
			estilo: "t-color-light-blue-100",
		},
		{
			imovel: "987654321",
			vencimento: "12/12/2023",
			valor: "249,00",
			situacao: "Vinculada",
			consumo: "344",
			isSelected: false,
			estilo: "t-color-black-100",
		},
		{
			imovel: "987654321",
			vencimento: "12/12/2024",
			valor: "249,00",
			situacao: "Paga",
			consumo: "42",
			isSelected: false,
			estilo: "t-color-green-sage-100",
		},
	];
	pageSize = 5;

	constructor(
		public user: UserService,
		private sanitizer: DomSanitizer,
	) {

	}

	ngOnInit() {
		this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://meuperfildeconsumo.elektro.com.br/Home/MeuPerfil/?token=MTg0NDIzMTV8MzEvMy8yMDIxIDk6NDI6MzQ=');
		this.showIframe = true;
		this.mostrarDadosPorPagina();
	}

	mostrarDadosPorPagina() {
		this.ativarDados = this.itens.slice(0, this.pageSize);
	}

	eventFilter(event: any) {
		this.ativarDados = event;
		this.pagination.numberPagination(this.ativarDados);
	}

	eventClear(event: any) {
		if (event == true) {
			this.pagination.numberPagination(this.itens);
		}
	}

	eventSelectAll(event: any) {
		this.accordion.checkedAll(event);
	}

	eventPagination(event: any) {
		this.ativarDados = event;
	}

}