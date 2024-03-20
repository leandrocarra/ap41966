import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { whatsAppUrl } from 'app/core/services/utils/utils.service';

@Component({
	selector: 'app-stepper-status-solicitacoes',
	templateUrl: './stepper-status-solicitacoes.component.html',
	styleUrls: ['./stepper-status-solicitacoes.component.scss'],
	providers: [{
		provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
	}]
})
export class StepperStatusSolicitacoesComponent implements OnInit {

	@Input() solicitacao!: any;
	isLinear = true;
	@ViewChild("stepper", { static: false }) stepper!: MatStepper;

	linkWhatsapp: string = whatsAppUrl('Atendimento Humanizado');
	distribuidora!: string;

	iconesObj = {
		"Concluida": "check_circle_outline",
		"Realizada": "check_circle_outline",
		"Em andamento": "radio_button_unchecked",
		"Rejeitada": "error_outline",
		"Cancelada": "highlight_off",
		"Finalizada": "highlight_off",

	}

	iconesDetalhes = {
		"true": "check",
		"false": "access_time",
		"finalizada": "close",
		"Concluida": "done",
		"Realizada": "done",
		"Em andamento": "access_alarm",
		"Rejeitada": "close",
		"Cancelada": "close",
	}

	motivoRejeitada!: string;

	constructor() { }

	ngOnInit(): void {
		this.motivoRejeitada = "FALTA APRESENTAR CONTAS PAGAS POSTE - LOCALIZAÇÃO IRREGULAR";
		this.distribuidora = "ELEKTRO";
	}

	redirectWhatsapp() {
		let otherWindow = window.open(this.linkWhatsapp, '_blank');
		if (otherWindow) { otherWindow.opener = null };
	}

}
