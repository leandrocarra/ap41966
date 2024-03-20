import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tipoCategoria } from '../../../../../../core/models/dados-da-ligacao/dados-da-ligacao';
import { DadosDaLigacaoService } from '../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { configureMenuByWindowSize } from '../../../../../../core/services/utils/neo-utils.service';

@Component({
	selector: 'neo-questionario-zona-rural',
	templateUrl: './questionario-zona-rural.component.html',
	styleUrls: ['./questionario-zona-rural.component.scss']
})
export class QuestionarioZonaRuralComponent {

	formPropriedade!: FormGroup;
	formNaPropriedade!: FormGroup;
	disabledNaPropriedade: boolean = false;
	disabledProxPropriedade: boolean = false;

	checkPropriedade: boolean = false;
	checkProxPropriedade: boolean = false;
	isDisabled: boolean = true;
	mobile: boolean;
	categoria: tipoCategoria;
	urlImgPoste: string;

	constructor(
		private _formBuilder: FormBuilder,
		private _location: Location,
		private _etapaService: DadosDaLigacaoService,
		private _router: Router,
		private _userServiceLN: UserServiceLN
	) {
        this.mobile = configureMenuByWindowSize(window.screen.width);
		this.categoria = this._etapaService.dadosDaLigacao.categoria;
        this.urlImgPoste = this.categoria === 'MONOFÁSICA' ? 'assets/assetsLN/images/40m.svg' : 'assets/assetsLN/images/30m.svg';
        this.formPropridade();
        this.formProximaPropriedade();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
	}

	formPropridade() {
		this.formPropriedade = this._formBuilder.group({
			casa: { value: this._etapaService.dadosDaLigacao.questionarioRural.propriedade.casa, disabled: this.disabledNaPropriedade },
			cerca: { value: this._etapaService.dadosDaLigacao.questionarioRural.propriedade.cerca, disabled: this.disabledNaPropriedade },
			muro: { value: this._etapaService.dadosDaLigacao.questionarioRural.propriedade.muro, disabled: this.disabledNaPropriedade },
			barracao: { value: this._etapaService.dadosDaLigacao.questionarioRural.propriedade.barracao, disabled: this.disabledNaPropriedade },
			poco: { value: this._etapaService.dadosDaLigacao.questionarioRural.propriedade.poco, disabled: this.disabledNaPropriedade },
			nenhum: { value: this._etapaService.dadosDaLigacao.questionarioRural.propriedade.nenhum, disabled: this.disabledNaPropriedade },
		});
	}

	formProximaPropriedade() {
		this.formNaPropriedade = this._formBuilder.group({
			corrego: { value: this._etapaService.dadosDaLigacao.questionarioRural.proxPropriedade.corrego, disabled: this.disabledProxPropriedade },
			acude: { value: this._etapaService.dadosDaLigacao.questionarioRural.proxPropriedade.acude, disabled: this.disabledProxPropriedade },
			rodovia: { value: this._etapaService.dadosDaLigacao.questionarioRural.proxPropriedade.rodovia, disabled: this.disabledProxPropriedade },
			ferrovia: { value: this._etapaService.dadosDaLigacao.questionarioRural.proxPropriedade.ferrovia, disabled: this.disabledProxPropriedade },
			nenhum: { value: this._etapaService.dadosDaLigacao.questionarioRural.proxPropriedade.nenhum, disabled: this.disabledProxPropriedade },
		});
	}

	atualizarDados(): void {
		this._etapaService.dadosDaLigacao.questionarioRural.propriedade = this.formPropriedade.value;
		this._etapaService.dadosDaLigacao.questionarioRural.proxPropriedade = this.formNaPropriedade.value;
	}

	controlPropriedade(field?: boolean): void {
		if (field && !this.formPropriedade.value.nenhum) {
			this.formPropriedade.patchValue({
				casa: false,
				cerca: false,
				muro: false,
				barracao: false,
				poco: false,
			});
		} else if (field === undefined) {
			this.formPropriedade.patchValue({
				nenhum: false
			});
		}
	}

	controlNaPropriedade(field?: boolean): void {
		if (field && !this.formNaPropriedade.value.nenhum) {
			this.formNaPropriedade.patchValue({
				corrego: false,
				acude: false,
				rodovia: false,
				ferrovia: false,
			});
		} else if (field === undefined) {
			this.formNaPropriedade.patchValue({
				nenhum: false
			});

		}
	}

	disable(): boolean {
		let propriedade = Object.values(this.formPropriedade.value).find(field => field === true);
		let proximo = Object.values(this.formNaPropriedade.value).find(field => field === true);
		return (!propriedade || !proximo) ? true : false;
	}

	voltar(): void {
		this.atualizarDados();
		this._location.back();
	}

	continuar(): void {
		this.atualizarDados();
		if (this._userServiceLN.tipoDocumento == "CNPJ") {
			this._router.navigate(["ligacao-nova", "dados-da-ligacao", "isencao-icms"]);

		} else {
			this._router.navigate(["ligacao-nova", "dados-da-ligacao", "opcao-tarifaria"]);
		}
	}
}
