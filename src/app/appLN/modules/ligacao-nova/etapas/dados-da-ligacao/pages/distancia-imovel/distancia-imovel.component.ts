import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadosDaLigacaoService } from '../../../../../../core/services/dados-da-ligacao/dados-da-ligacao.service';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';
import { tipoCategoria } from 'app/appLN/core/models/dados-da-ligacao/dados-da-ligacao';

@Component({
	selector: 'neo-distancia-imovel',
	templateUrl: './distancia-imovel.component.html',
	styleUrls: ['./distancia-imovel.component.scss']
})
export class DistanciaImovelComponent implements OnInit {
	urlImgPoste: string;
	tituloPoste: string;
	textoPoste: string;
	distanciaPoste: string;
	temPoste: string;
	zonaRural: boolean;
	formPoste: FormGroup;

	constructor(
		private _router: Router,
		private _serviceEtapa: DadosDaLigacaoService,
		private _location: Location,
		private _formBuilder: FormBuilder,
		private _imovelService: DadosDoImovelService,
		private _alert: CustomSweetAlertService
	) {
        this.urlImgPoste = '';
        this.tituloPoste = '';
        this.textoPoste = '';
        this.distanciaPoste = '';
        this.temPoste = '';
		this.zonaRural = this._imovelService.getDadosDoImovel.endereco.zonaRural;
		this.formPoste = this.createForm();
	}

	ngOnInit(): void {
		this.setTelaPoste(this._serviceEtapa.dadosDaLigacao.categoria);
	}

	setTelaPoste(categoria: tipoCategoria): void {
		this.urlImgPoste = categoria === 'MONOFÁSICA' ? 'assets/assetsLN/images/40m.svg' : 'assets/assetsLN/images/30m.svg'
		this.tituloPoste = categoria === 'MONOFÁSICA' ? 'O imóvel está localizado em até 40 metros do poste de energia mais próximo?' : 'O imóvel está localizado em até 30 metros do poste de energia mais próximo?';
		this.textoPoste = categoria === 'MONOFÁSICA' ? 'Caso esteja a mais de 40 metros do poste de energia, teremos que realizar um serviço de extensão da rede para que você consiga receber a energia no seu imóvel.' : 'Caso esteja a mais de 30 metros do poste de energia, teremos que realizar um serviço de extensão da rede para que você consiga receber a energia no seu imóvel.';
		this.distanciaPoste = categoria === 'MONOFÁSICA' ? '40' : '30';
	}

	createForm(): FormGroup {
		return this._formBuilder.group({
			distanciaPoste: [
				this._serviceEtapa.dadosDaLigacao.distanciaPoste,
				[
					Validators.required
				]
			],
			desmembrado: [
				this._serviceEtapa.dadosDaLigacao.questionarioRural.desmembrado,
				this.zonaRural ? [Validators.required] : []
			]
		});
	}

	voltar(): void {
		this.atualizarDados();
		this._location.back();
	}

	continuar(): void {
		this.atualizarDados();
		let destino = this.zonaRural ? "questionario-zona-rural" : "opcao-tarifaria";

		let valoresAlertaPoste = ['naoSei', 'nao'];
		if (valoresAlertaPoste.includes(this.formPoste.value.distanciaPoste)) {
			this._alert.alertDeclaracaoPoste(this.distanciaPoste).then(r => {
				this._router.navigate(["ligacao-nova", "dados-da-ligacao", destino])
			});
		} else {
			this._router.navigate(["ligacao-nova", "dados-da-ligacao", destino]);
		}
	}

	atualizarDados(): void {
		this._serviceEtapa.poste = this.formPoste.value.distanciaPoste;
		this._serviceEtapa.setDesmembrado = this.formPoste.value.desmembrado;
	}
}
