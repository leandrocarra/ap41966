import { Component, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { accordionHeader } from "app/core/models/debitos_historico.model";
import { PdfDTORequest } from "app/core/models/segunda-via/request/segunda-via-request-dto";
import { FaturaDTO, PdfDTOResponse } from "app/core/models/segunda-via/response/segunda-via-response-dto";
import { Status } from "app/core/models/segunda-via/segunda-via.model";
import { SegundaViaService } from "app/core/services/segunda-via/segunda-via.service";
import { UserService } from "app/core/services/user/user.service";
import { converterParaReais } from "app/core/services/utils/neo-utils.service";
import { BaixarSegundaVia } from "../faturas/baixar-segunda-via.component";

@Component({
	selector: "app-accordion",
	templateUrl: "./accordion.component.html",
	styleUrls: ["./accordion.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class AccordionComponent {
	panelOpenState = false; //variavel do accordion
	itens: accordionHeader[] | Array<FaturaDTO>;
	collection: any;
	userGroup: string;

	pdfRequestDTO = new PdfDTORequest("", "", "", 1, "", "", "");
	pdfResponseDTO = new PdfDTOResponse();

	constructor(
		private _user: UserService,
		private _segundaViaService: SegundaViaService,
		private _activatedRoute: ActivatedRoute,
        private _dialog: MatDialog,
	) {
		this.userGroup = this._user.group;
		this.itens = this._activatedRoute.snapshot.data.faturas;
		this.itens.forEach((value: any) => (value.selecionado = false));
	}

	expandPanel(matExpansionPanel: any, event: any): void {
		event.stopPropagation();

		if (!this._isExpansionIndicator(event.target)) {
			matExpansionPanel.close();
		}
	}

	valorFatura(valor: string): string {
		return (environment.regiao === Regiao.NE) ?converterParaReais(valor) : `R$ ${valor}`;
	}

	private _isExpansionIndicator(target: any): boolean {
		const expansionIndicatorClass = 'mat-expansion-indicator';
		return (target['classList'] && target['classList'].contains(expansionIndicatorClass));
	}

	checkedAll(e: any): void {
		this.itens.forEach((value: any) => (value.selecionado = e));
	}

	setarFatura(fatura: any) {
		fatura.selecionado = !fatura.selecionado;
	}

	baixarFaturas(): void {
        this._dialog.open(BaixarSegundaVia, {
			disableClose: true,
			hasBackdrop: true,
			width: 'auto',
			height: 'auto',
			data: { listaFaturas: this.itens }
		});
	}

	getStatus(statusFatura: string): Status {
		return this._segundaViaService.getStatus(statusFatura);
	}
}
