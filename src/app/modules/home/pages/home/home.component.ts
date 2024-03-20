import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { Distribuidora } from "app/core/enums/distribuidoras";
import { PathCompleto } from "app/core/enums/servicos";
import { CarouselItem } from "app/core/models/home/home";
import { SubRotasHome } from "app/core/models/home/sub-rotas-home";
import { UcInfosResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/uc-infos-response-dto';
import { GrupoTensao } from "app/core/models/selecao-de-imoveis/selecao-de-imoveis";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { SegundaViaService } from "app/core/services/segunda-via/segunda-via.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { UserService } from "app/core/services/user/user.service";
import { AgenciaVirtualService } from "app/core/services/utils/admin/agencia-virtual.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

	lastInputFilesByInputType = {};
	carouselItens: any = [
		new CarouselItem(
			this._agenciaVirtual.grupoTensao === "A" ? "deb-auto.svg" : "deb-auto_light.svg",
			"Débito automático",
			// ["servicos", "debito-automatico"],
			[PathCompleto.debitoAutomatico.toString()]

		),
		new CarouselItem(
			this._agenciaVirtual.grupoTensao === "A" ? "email.svg" : "email_light.svg",
			"Fatura digital",
			[PathCompleto.faturaDigital.toString()]
		),
		new CarouselItem(
			this._agenciaVirtual.grupoTensao === "A" ? "hist-consumo.svg" : "hist-consumo_light.svg",
			"Histórico de consumo",
			this._agenciaVirtual.grupoTensao === "A" ? environment.title === Distribuidora.ELEKTRO ? [PathCompleto.historicoDeconsumo.toString(), "grandes-clientes-se" ] : [PathCompleto.historicoDeconsumo.toString(), "grandes-clientes-ne"] : [PathCompleto.historicoDeconsumo.toString()]
		),
		new CarouselItem(
			this._agenciaVirtual.grupoTensao === "A" ? "religa.svg" : "religa_light.svg",
			"Solicitar religação",
			[PathCompleto.religacao.toString()]
		),
		new CarouselItem(
			this._agenciaVirtual.grupoTensao === "A" ? "autoleitura_green.svg" : "autoleitura_light.svg",
			"Autoleitura",
			[PathCompleto.autoleitura.toString()]
		)
	];

	// ucInfosResponse: any;
	ucInfosResponse: UcInfosResponseDTO;
	mobile: boolean;
	enderecoCompleto: string;
    contaColetiva: boolean;
    textoContaColetiva: string;
	statusUc: string;
	uc: string;
	user: any
    grupoTensao: GrupoTensao;

	//FIXME: Verificar possibilidade de deletar a variável.
	isTela: string = 'home';

	constructor(
		private _loadingService: LoadingService,
		private _router: Router,
		private _selecaoImovelService: SelecaoImovelService,
		private _userService: UserService,
		private _segundaViaService: SegundaViaService,
        private _agenciaVirtual: AgenciaVirtualService
	) {

		this.ucInfosResponse = this._selecaoImovelService.getInformacoesUCSelecionada;

		this._userService.uc = this._selecaoImovelService.getUCSelecionada?.uc;
		this._userService.enderecoCompleto = this._selecaoImovelService.getUCSelecionada?.local;
		this._userService.statusUc = this._selecaoImovelService.getUCSelecionada?.status;

		this.user = this._userService;
		this.enderecoCompleto = this._selecaoImovelService.getEnderecoCompleto;
        this.contaColetiva = (this._selecaoImovelService.getUCSelecionada?.indCCColetiva === 'X');
        this.textoContaColetiva = 'Unidade Consumidora Coletiva';
		this.statusUc = this._userService.statusUc;
		this.uc = this._userService.uc;
		this.mobile = configureMenuByWindowSize(window.screen.width);
        this.grupoTensao = 'B';
        this._agenciaVirtual.grupoTensao.subscribe((grupoTensao: GrupoTensao) => {
            this.grupoTensao = grupoTensao;
        });
	}

	ngOnInit() {
		this._userService.isFluxo = false;
		window.scroll(0, 0);
		this._userService.pageSelected = false;
		this._loadingService.stop();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any): void {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
	}

	redirecionarMeusImoveis(): void {
		this._userService.pageSelected = true;
		this._router.navigate(["home", SubRotasHome.MinhasUnidadesConsumidoras]);
	}

	navigateTo(routeNavigate: Array<string>): void {
		this._router.navigate(routeNavigate);
	}

    navigateToHistConsumos(): void {
        this._router.navigate([PathCompleto.historicoDeconsumo]);
    }

}


