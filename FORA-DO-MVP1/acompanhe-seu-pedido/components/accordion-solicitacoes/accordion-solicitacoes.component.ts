import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { UserService } from 'app/core/services/user/user.service';
import { environment } from '@environments/environment';


@Component({
	selector: 'app-accordion-solicitacoes',
	templateUrl: './accordion-solicitacoes.component.html',
	styleUrls: ['./accordion-solicitacoes.component.scss']
})
export class AccordionSolicitacoesComponent implements OnInit, AfterViewInit {

	@Input() itens: any;
	@Input() solicitacoes: any;
	mobileXS: boolean = false;
	iconesObj = {
		"Concluida": "check_circle_outline",
		"Realizada": "check_circle_outline",
		"Em andamento": "radio_button_unchecked",
		"Rejeitada": "error_outline",
		"Cancelada": "highlight_off",
		"Finalizada": "highlight_off"
	}

	distribuidoraUF: string;

	etapas = [
		{
			etapa: "Criada",
			status: ["CRID", "CREA",]
		},
		{
			etapa: "Em análise",
			status: []
		},
		{
			etapa: "Realizada",
			status: ["ENCE", "ENCE", "RGDC", "ENCE", "ENCE", "ENCE", "ENCE", "ENCE", "ENCR", "CONC", "COEN", "COEN", "CONC", "FINI", "CONC", "ENCE", "ENCE", "ENCE", "ENCE", "ENCE", "ENCE", "ENCE", "ENCE", "ENCE", "ENCE", "ENCE", "CCDO", "CONC", "CONC", "ence", "ECEX", "ESEX"]
		},
		{
			etapa: "Em andamento",
			status: ["DESP", "VIRE", "VNRE", "NVIS", "RGDC", "EMPR", "ANAP", "ENCL", "AGRE", "DRRE", "RGDC", "EMPR", "NOBR", "ORCC", "CPAR", "CSOL", "REOR", "COND", "CONT", "CAN1", "OBCO", "LIAG", "CAN2", "EMPR", "NOCR", "ORCC", "CPAR", "CSOL", "REOR", "COND", "CONT", "CAN1", "NLEI", "LECO", "AINS", "OBCO", "CMOD", "MORE", "CAN2", "RGDC", "EMPR", "NOCR", "ORCC", "CPAR", "CSOL", "REOR", "COND", "CONT", "CAN1", "NLEI", "LECO", "AINS", "OBCO", "CMOD", "MORE", "CAN2", "RGDC", "EMPR", "ADCM", "ELCM", "ADSM", "ELSM", "ASSC", "ASSS", "DESL", "RGDC", "EMPR", "CONT", "ATIN", "RGDC", "EMPR", "NOBR", "ORCC", "CPAR", "CSOL", "REOR", "COND", "CONT", "CAN1", "OBCO", "LIAG", "CAN2", "ABER", "ABER", "REAT", "COAB", "COAT", "COAB", "PREP", "REAG", "ABER", "PETO", "ABER", "ENAS", "LIPS", "ASSS", "LIPE", "ELAB", "EELA", "ASSC", "COAT", "ENAS", "LIPE", "ASSC", "ELAB", "EELA", "ABER", "RGDC", "EMPR", "ANAP", "ENCL", "AGRE", "DRRE", "RGDC", "EMPR", "NOBR", "ORCC", "CPAR", "CSOL", "REOR", "COND", "CONT", "OBCO", "LIAG", "CAN1", "CAN2", "NSOL", "RGDC", "EMPR", "ORCC", "CPAR", "CSOL", "REOR", "COND", "CONT", "AINS", "OBCO", "CMOD", "NOCR", "CAN1", "CAN2", "NMCR", "RGDC", "EMPR", "COND", "CONT", "AINS", "CMOD", "CAN2", "NMCR", "RGDC", "EMPR", "ADCM", "ELCM", "ADSM", "ELSM", "DESL", "ASSC", "ASSS", "RGDC", "EMPR", "CONT", "ATIN", "RGDC", "EMPR", "NOBR", "ORCC", "CPAR", "CSOL", "REOR", "COND", "CONT", "OBCO", "LIAG", "CAN1", "CAN2", "NLCR", "RGDC", "EMPR", "NOBR", "ORCC", "CPAR", "CSOL", "REOR", "COND", "CONT", "OBCO", "LIAG", "CAN1", "CAN2", "NLCR", "RDOC", "EMPR", "ELCT", "ABE1", "Abe2", "ABER", "PROC", "CSTP", "SSTP", "RPAR", "ABER", "PROC", "CSTP", "SSTP", "GANH", "PERD", "ABER", "PROC", "CSTP", "SSTP", "PROC", "Aber", "Proc", "ABER", "PROC"]
		},
		{
			etapa: "Aguardando",
			status: ["RETI", "RATC", "RLIB", "REDI", "OBRA", "NINT", "IMST"]
		},
	]

	fluxos = {
		0: {
			etapas: ["Criada", "Em análise", "Realizada"],
			notas: ["CX", "OM", "OR", "OX", "RA", "RB", "RC", "RD", "RE", "RI", "RL", "RM", "RO", "RR", "RS", "RT", "CV"]
		},

		1: {
			etapas: ["Criada", "Em andamento", "Aguardando", "Realizada"],
			notas: ["CS", "CR", "CB", "CC"]
		},

		2: {
			etapas: ["Criada", "Em andamento", "Aguardando", "Em obras", "Realizada"],
			notas: ["CL", "CM"]
		},

		3: {
			etapas: ["Em verificação", "Realizada"],
			notas: ["CE"]
		},

		4: {
			etapas: ["Criada", "Em verificação", "Aprovação", "Resultado da aprovação", "Finalizada"],
			notas: ["CN"]
		},

		5: {
			etapas: ["Criada", "Análise de orçamento", "Em andamento", "Aguardando", "Em obras", "Em comissionamento", "Realizada"],
			notas: ["CO"]
		}
	}

	constructor(
		public user: UserService,
	) {
		// this.distribuidoraUF = environment.regiao;
		this.distribuidoraUF = "NE";
	}

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.configureMenuByWindowSize(event.target.innerWidth);
	}

	ngOnInit(): void {
		if (window.screen.width < 576) {
			this.mobileXS = true;
		}
	}

	ngAfterViewInit() {
		this.checkEtapa();
	}


	configureMenuByWindowSize(width: any) {
		this.mobileXS = width < 576 ? true : false;
	}

	expandPanel(matExpansionPanel: any, event: any): void {
		event.stopPropagation();

		if (!this._isExpansionIndicator(event.target)) {
			matExpansionPanel.close();
		}
	}

	private _isExpansionIndicator(target: any): boolean {
		const expansionIndicatorClass = 'mat-expansion-indicator';
		return (target['classList'] && target['classList'].contains(expansionIndicatorClass));
	}

	checkEtapa() {
		console.log(this.itens);
		console.log(this.solicitacoes);
	}



}
