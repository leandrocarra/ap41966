import { Location } from '@angular/common';
import { Component, HostListener, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import { Anexo } from '../../../../../../core/models/anexo/anexo';
import { DadosDoImovel } from '../../../../../../core/models/dados-do-imovel/endereco';
import { Imovel } from '../../../../../../core/models/dados-do-imovel/imovel';
import { ListaImoveis } from '../../../../../../core/models/dados-do-imovel/lista-imoveis';
import { BoxAnexo } from '../../../../../../core/models/documentos/box-anexo/box-anexo';
import { OcrRequest } from '../../../../../../core/models/ocr/ocr-request';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { DocumentosService } from '../../../../../../core/services/documentos/documentos.service';
import { OcrService } from '../../../../../../core/services/ocr/ocr.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { configureMenuByWindowSize, removerCaracteresEspeciais, validarPrazo } from '../../../../../../core/services/utils/neo-utils.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';

export interface DialogData {
	UEOptions: any;
	UcOptions: any;
	formEndereco: any;
}

@Component({
	selector: 'neo-endereco',
	templateUrl: './endereco.component.html',
	styleUrls: ['./endereco.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EnderecoComponent {
	mobile: boolean;
	resultadoBuscaCep: any;
	documentos: any[];
	anexos: {[key: string]: any};
	dadosDoImovel: DadosDoImovel;
	estados: any[] = [
		{ key: 'MS', value: 'Mato Grosso do Sul (MS)' },
		{ key: 'SP', value: 'São Paulo (SP)' },
	];

	/** informativos ***/
	msgInforDoc: any;
	msgTooltip: any;

	/** variaveis mapa ***/
	map: any;
	marker: any = [];
	allowMarker: boolean = false;
	latitudeMarker: any = '';
	longitudeMarker: any = '';
	markersLayer = new Leaflet.FeatureGroup();

	/** variaveis dialog ***/
	UEOptions: ListaImoveis;
	selectedUE: Imovel;

	constructor(
		private _dadosDoImovelService: DadosDoImovelService,
		private _documentosService: DocumentosService,
		private _userServiceLN: UserServiceLN,
		private _ocrService: OcrService,
		private _alert: CustomSweetAlertService,
		private _dialog: MatDialog,
		private _router: Router,
		private _location: Location,
        private _loadingService: LoadingService
	) {
		this.mobile = configureMenuByWindowSize(window.screen.width);
		this.documentos = [];
		this.anexos = this._dadosDoImovelService.getEndereco.anexos;
        this.dadosDoImovel = this._dadosDoImovelService.getDadosDoImovel;
        this.UEOptions = new ListaImoveis();
        this.selectedUE = new Imovel();
	}

    @HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
	}

	verificarCEP(): void {
		this.dadosDoImovel.endereco.cepEncontrado = false;
		if (this.dadosDoImovel.endereco.ruaSemCep || !this.dadosDoImovel.endereco.cepEncontrado) {
			this._alert.alertRuaSemCepDefinido().then(r => {
				if (r.value) {
					if (this.dadosDoImovel.endereco.ruaSemCep) {
						this.dadosDoImovel.endereco.cep = "";
					}
					this.dadosDoImovel.endereco.cidade = '';
					this.dadosDoImovel.endereco.endereco = '';
					this.dadosDoImovel.endereco.numero = '';
					this.dadosDoImovel.endereco.complemento = '';
					this.dadosDoImovel.endereco.bairro = '';
					this.dadosDoImovel.endereco.estado = '';
					this.dadosDoImovel.endereco.pontoReferencia = '';
					this.resetImovel();
				}
			})
			this.anexarDocs();
		}
	}

	anexar(arquivo: Anexo, NomeDoDocumento: string, box: BoxAnexo): void {
		if (box.docName.toUpperCase() === 'LICENÇA AMBIENTAL' && arquivo.fileExtension != ".pdf") {
			this._alert.alertWarningWithText("FORMATO INVÁLIDO", "O documento precisa ser no formato .PDF");
		} else {
			if (this.anexos[NomeDoDocumento].length < 1) {
				this.validarDocumentoEndereco(arquivo, NomeDoDocumento);
			} else {
				this._alert.alertSuccess("Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo");
			}
		}
	}

	validarDocumentoEndereco(arquivo: Anexo, NomeDoDocumento: string) {
		let base64 = new OcrRequest(arquivo.fileData, false);
		this._ocrService.ocr(base64).then((data: any) => {
			if (data === false) {
				this._loadingService.stop();
				this.anexarDocumento(arquivo, NomeDoDocumento, false);
			} else {
				let dadosValidados = (NomeDoDocumento === 'Licença Ambiental') ? this.validarLicencaAmbiental(data.result[0]) : this.validarComprovanteDeEndereco(data.result[0]);
				this.anexarDocumento(arquivo, NomeDoDocumento, dadosValidados);
			}
		})
	}

	validarComprovanteDeEndereco(ocr: any): boolean {
		if (ocr.docType === 'declaracao') {
			if (ocr.tags.includes('br-imposto-predial e-territorial-urbano-1')) {
				return this._dadosDoImovelService.validarEnderecoIPTU(ocr);
			} else if (ocr.tags.includes('br-incra-1')) {
				return this._dadosDoImovelService.validacaoINCRA(ocr);
			}
		}
		return false;
	}

	validarLicencaAmbiental(ocr: any): boolean {
		if (ocr.docType === 'certidao') {
			if (ocr.tags.includes('br-la-mod1')) {
				return this.validarModelo1Licenca(ocr);
			}
			if (ocr.tags.includes('br-la-mod2')) {
				return this.validarModelo2Licenca(ocr);
			}
		}
		return false;
	}

	validarModelo1Licenca(ocr: any): boolean {
		let nomeValido = (removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'nome_do_detentor'))).split(' ', 1)[0]) === removerCaracteresEspeciais(this._userServiceLN.sessionUser.nome).split(' ', 1)[0];
		let endereceoValido = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'endereco_propriedade'))).includes(removerCaracteresEspeciais(this._dadosDoImovelService.getEndereco.endereco));
		let cepValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'cep_propriedade')) === this._dadosDoImovelService.getEndereco.cep;
		let municipioValido = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'municipio_propriedade'))) === removerCaracteresEspeciais(this._dadosDoImovelService.getEndereco.cidade);
		let atividadeValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'atividade/finalidade_pedido'));
		let prazoValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'prazo'));

		if (nomeValido && endereceoValido && cepValido && municipioValido && this.validarFinalidadeLicenca(atividadeValido) && !validarPrazo(prazoValido)) {
			return true;
		} else {
			return false;
		}
	}

	validarModelo2Licenca(ocr: any): boolean {
		let nomeDoc = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'razao_social/nome_proprietario')));
		let nomeValido = (nomeDoc.split(' ', 1)[0]) === removerCaracteresEspeciais(this._userServiceLN.sessionUser.nome).split(' ', 1)[0];
		let documentoValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'cpf/cnpj_proprietario')) === this._userServiceLN.sessionUser.documento;
		let enderecoValido = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'logradouro'))) === removerCaracteresEspeciais(this._dadosDoImovelService.getEndereco.endereco);
		let cepValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'cep')) === this._dadosDoImovelService.getEndereco.cep;
		let municipioValido = removerCaracteresEspeciais(this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'municipio_1'))) === removerCaracteresEspeciais(this._dadosDoImovelService.getEndereco.cidade);
		let numeroValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'numero')) === this._dadosDoImovelService.getEndereco.numero;
		let atividadeValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'motivacao_justificativa'));
		let prazoValido = this._ocrService.isOCRFieldValid(ocr.fields.find((f: any) => f.name === 'data_validade'));

		if (nomeValido && documentoValido && enderecoValido && cepValido && municipioValido && numeroValido
		 && this.validarFinalidadeLicenca(removerCaracteresEspeciais(atividadeValido)) && !validarPrazo(prazoValido)) {
			return true;
		} else {
			return false;
		}
	}

	validarFinalidadeLicenca(finalidade: string): boolean {
		return (finalidade.includes('REDE ELETRICA') || finalidade.includes('REDES ELETRICA') || finalidade.includes('ENERGIA ELETRICA') || finalidade.includes('PROJETO') ||
			finalidade.includes('LIGACAO DE ENERGIA ELETRICA') || finalidade.includes('OBRA') || finalidade.includes('SISTEMA ELETRICO') || finalidade.includes('ENERGIA')) ? true : false;
	}

	anexarDocumento(arquivo: Anexo, NomeDoDocumento: string, docValidado: boolean) {
		if (NomeDoDocumento === 'Licença Ambiental') {
			this._dadosDoImovelService.getEndereco.licencaAmbientalValidado = docValidado;
		} else if (NomeDoDocumento === 'Comprovante de Endereço') {
			this._alert.alertAnaliseComprovanteEndereco();
			this._dadosDoImovelService.getEndereco.comprovanteEnderecoValidado = docValidado;
		}
		this.anexos[NomeDoDocumento].push(arquivo);
	}

	chamaAlertWarningLicencaAmbiental(): void {
		this._alert.alertWarningLicencaAmbiental();
	}

	anexarDocs(): boolean {
		let comprovanteEndereco: boolean = false;
		if (this.dadosDoImovel.endereco.cep.length >= 8 || this.dadosDoImovel.endereco.areaAmbiental !== '') {
			if (this.dadosDoImovel.endereco.ruaSemCep || !this.dadosDoImovel.endereco.cepEncontrado || this.dadosDoImovel.endereco.areaAmbiental === 'SIM') {
				if (this.dadosDoImovel.endereco.ruaSemCep || !this.dadosDoImovel.endereco.cepEncontrado) {
					comprovanteEndereco = true;
				}
				if (comprovanteEndereco && this.dadosDoImovel.endereco.areaAmbiental !== "SIM") {
					this.configurarAnexosNecessarios(0);
				} else if (!comprovanteEndereco && this.dadosDoImovel.endereco.areaAmbiental === "SIM") {
					this.configurarAnexosNecessarios(1);
				} else if (comprovanteEndereco && this.dadosDoImovel.endereco.areaAmbiental === "SIM") {
					this.configurarAnexosNecessarios(2);
				}
				return true
			}
		}
        return false;
	}

	private configurarAnexosNecessarios(value: number): void {
		this.msgInforDoc = this._dadosDoImovelService.getTextInfoDoc[value].informativo;
		this.msgTooltip = this._dadosDoImovelService.getTextInfoDoc[value].tooltip;
		this.documentos = this._dadosDoImovelService.getDocsNecessarios[value];
	}

	deParaDocumentosService(): void {
		if (this._dadosDoImovelService.getEndereco.anexos['Comprovante de Endereço']?.length > 0) {
			this._documentosService.anexos.comprovanteEndereco = this._dadosDoImovelService.getEndereco.anexos['Comprovante de Endereço'];
		}

		if (this._dadosDoImovelService.getEndereco.anexos['Licença Ambiental']?.length > 0) {
			this._documentosService.anexos.licencaAmbiental = this._dadosDoImovelService.getEndereco.anexos['Licença Ambiental'];
		}
	}

	resetImovel(): void {
		this._dadosDoImovelService.getEndereco.codigoBairro = "";
		this._dadosDoImovelService.getEndereco.codigoLocalidade = "";
		this._dadosDoImovelService.getEndereco.codigoLogradouro = "";
		this._dadosDoImovelService.getEndereco.tipoLogradouro = "";
		this._dadosDoImovelService.getEndereco.tipoLocalizacao = "";
		this._dadosDoImovelService.getEndereco.trecho = "";
		this._dadosDoImovelService.getEndereco.latitude = "";
		this._dadosDoImovelService.getEndereco.longitude = "";
	}

	carregaCep(): void {
		if (this.dadosDoImovel.endereco.cep.length > 7) {
			this.resetImovel();
			this.buscarCep();
		}
	}

	buscarCep(): void {
		if (this.dadosDoImovel.endereco.cep) {
			this._loadingService.start();
			this._dadosDoImovelService.buscarCep(this.dadosDoImovel.endereco.cep).subscribe({
				next: (data) => {
					if (!data || data.length === 0) {
						this.dadosDoImovel.endereco.cepEncontrado = false;
						this._loadingService.stop();
						this._alert.alertDocumentosValidosComprovanteEnd();
						this.verificarCEP();
						this.anexarDocs();
					} else {
						this.UEOptions.imovel = data;
						this.resultadoBuscaCep = data;
						this._loadingService.stop();
						this.openDialog();
					}
				},
				error: () => {
					this._loadingService.stop();
					this._alert.alertDocumentosValidosComprovanteEnd();
				}
			})
		}
	}

	openDialog(): void {
		let width = (window.screen.width < 768) ? '100%' : '850px';

		const dialogRef = this._dialog.open(EnderecosDialogComponent, {
			hasBackdrop: true, // nao fecha a modal ao clicar fora
			width: width,
			minHeight: '500px',
			maxHeight: '95vh',
			maxWidth: '100vw',
			data: { UEOptions: this.UEOptions, mobile: this.mobile }
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result === 'enderecoNaoEncontrado') {
				this.selectedUE = this.UEOptions.imovel[0];
				this.confirmUESelection('naoEncontrado');
			} else {
				this.selectedUE = result;
				this.confirmUESelection('selecionado');
			}
			this._dialog.ngOnDestroy();
		});
	}

	convertCepResultToImovel(result: any): void {
		this.dadosDoImovel.endereco.bairro = result.nomeBairro;
		this.dadosDoImovel.endereco.cidade = result.nomeMunicipio;
		this.dadosDoImovel.endereco.codigoBairro = result.codigoBairro;
		this.dadosDoImovel.endereco.codigoLocalidade = result.codigoLocalidade;
		this.dadosDoImovel.endereco.codigoLogradouro = result.codigoLogradouro;
		this.dadosDoImovel.endereco.endereco = result.nomeLogradouro;
		this.dadosDoImovel.endereco.estado = result.uf;
		this.dadosDoImovel.endereco.tipoLocalizacao = result.tipoLocalizacao;
		this.dadosDoImovel.endereco.tipoLogradouro = result.tipoLogradouro;
		this.dadosDoImovel.endereco.trecho = result.trecho;
		this.dadosDoImovel.endereco.zonaRural = result.tipoLocalizacao === 'RR' ? true : false;
	}

	confirmUESelection(resultado: any): void {
		if (this.resultadoBuscaCep.length === 1 && resultado === 'selecionado') {
			this.convertCepResultToImovel(this.resultadoBuscaCep[0]);
			// this.convertCepResultToImovel(this.resultadoBuscaCep[0]);
			this.dadosDoImovel.endereco.cepEncontrado = true;
			this._dadosDoImovelService.cepAberto(this.dadosDoImovel.endereco.cep).subscribe(r => {
				if (r && r['latitude'] && r['longitude']) {
					this.dadosDoImovel.endereco.cepUnico = true;
					setTimeout(() => {
						this.iniciarMapa();
					}, 1000);

					this.latitudeMarker = r['latitude']
					this.longitudeMarker = r['longitude']
					setTimeout(() => {
						this.setLocalizacaoPorCep();
						this.allowMarker = true;
					}, 1200)
				} else {
					this.dadosDoImovel.endereco.cepUnico = false;
				}
			});
		} else if (this.resultadoBuscaCep.length > 1) {
			this.dadosDoImovel.endereco.cepUnico = false;
			this.dadosDoImovel.endereco.cepEncontrado = true;
		}

		if (this.selectedUE) {
			this.convertCepResultToImovel(this.selectedUE);
			if (resultado === 'naoEncontrado') {
				this.dadosDoImovel.endereco.ruaProjetada = true;
				this.dadosDoImovel.endereco.endereco = "";
				this.dadosDoImovel.endereco.camposBloqueados = false;
				this.dadosDoImovel.endereco.pontoReferencia = "";
				this.dadosDoImovel.endereco.numero = "";
				this.dadosDoImovel.endereco.complemento = "";
				this.dadosDoImovel.endereco.bairro = "";
				this.dadosDoImovel.endereco.cidade = "";
				this.dadosDoImovel.endereco.estado = "";
				this.dadosDoImovel.endereco.enderecoEditavel = true;
				this.dadosDoImovel.endereco.cepEncontrado = false;
				this.dadosDoImovel.endereco.cepUnico = false;
				this.resetImovel();
			} else {
				this.dadosDoImovel.endereco.ruaProjetada = false;
			}
			this._loadingService.stop();
		}
	}

	iniciarMapa(): void {
		if (this.map != undefined || this.map != null) {
			this.map.remove();
		}

		this.map = Leaflet.map("map", {
			center: [-21.5757, -49.8774],
			zoom: 6
		});

		const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
		});

		tiles.addTo(this.map);

		const iconRetinaUrl = 'assets/assetsLN/images/pin.svg';
		const iconUrl = 'assets/assetsLN/images/pin.svg';
		const iconDefault = Leaflet.icon({
			iconRetinaUrl,
			iconUrl,
			iconSize: [23, 58],
		});
		Leaflet.Marker.prototype.options.icon = iconDefault;

		this.map.on('click', (element: any) => {
			if (this.marker || this.marker != null) {
				this.markersLayer.clearLayers();
				if (this.allowMarker) {
					this.marker = Leaflet.marker([element.latlng.lat, element.latlng.lng], { icon: iconDefault });
					this.markersLayer.addLayer(this.marker);
					this.latitudeMarker = element.latlng.lat;
					this.longitudeMarker = element.latlng.lng;
				}
			}
		});
	}

	remove(index: number, documento: string): void {
		if (documento === 'Licença Ambiental') {
			this._dadosDoImovelService.getEndereco.licencaAmbientalValidado = false;
		}
		this.anexos[documento].splice(index, 1);
	}

	setLocalizacaoPorCep(): void {
		this.map = this.map.setView([this.latitudeMarker, this.longitudeMarker], 15)
		this.marker = Leaflet.marker([this.latitudeMarker, this.longitudeMarker]);
		this.markersLayer.clearLayers();
		this.markersLayer.addLayer(this.marker);
		this.map.addLayer(this.markersLayer);
		this._dadosDoImovelService.getDadosDoImovel.endereco.latitude = this.latitudeMarker;
		this._dadosDoImovelService.getDadosDoImovel.endereco.longitude = this.longitudeMarker;
	}


	// ===============metodos botoes==================

	voltar(): void {
		this._location.back();
	}

	continuar(): void {
		if (!this.dadosDoImovel.endereco.endereco || !this.dadosDoImovel.endereco.numero || !this.dadosDoImovel.endereco.bairro || !this.dadosDoImovel.endereco.cidade || !this.dadosDoImovel.endereco.estado) {
			if (this.dadosDoImovel.endereco.ruaSemCep) {
				if (!this.dadosDoImovel.endereco.cep) {
					this._alert.alertWarning('POR FAVOR, PREENCHA TODOS OS CAMPOS');
				}
			} else {
				this._alert.alertWarning('POR FAVOR, PREENCHA TODOS OS CAMPOS');
			}
		} else if (!this.dadosDoImovel.endereco.areaAmbiental) {
			this._alert.alertWarningWithText("Atenção", "Por favor, informe se o imóvel está localizado em uma área de preservação ambiental");

		} else if (this.dadosDoImovel.endereco.areaAmbiental === 'SIM' && this.dadosDoImovel.endereco.anexos['Licença Ambiental'].length === 0) {
			this._alert.alertWarning('POR FAVOR, ENVIE TODOS OS ARQUIVOS');

		} else if ((!this.dadosDoImovel.endereco.cepEncontrado || this.dadosDoImovel.endereco.ruaSemCep) && this.dadosDoImovel.endereco.anexos['Comprovante de Endereço'].length === 0) {
			this._alert.alertWarning('POR FAVOR, ENVIE TODOS OS ARQUIVOS');

		} else if (this.dadosDoImovel.endereco.apartamento === null) {
			this._alert.alertWarningWithText('Atenção', 'Por favor, informe se o imóvel é um apartamento, condomínio ou sala comercial');

		} else if (this.dadosDoImovel.endereco.apartamento && this.dadosDoImovel.endereco.complemento.length < 1) {
			this._alert.alertWarning('POR FAVOR, INFORME O COMPLEMENTO');

		} else {
			this._dadosDoImovelService.setEnderecoAnexos = this.anexos;
			this._dadosDoImovelService.setEndereco = this.dadosDoImovel.endereco;
			this._dadosDoImovelService.getEndereco.zonaRural = (this.dadosDoImovel.endereco.tipoLocalizacao == 'RR') ? true : false;
			this.deParaDocumentosService();
			this._router.navigate(["ligacao-nova", "pedido", "confirmar-endereco"]);
		}
	}
}

// ===============component dialog dados Imovel==================

export class RemovedLabels extends MatPaginatorIntl {
	nextPageLabel: string = '';
	previousPageLabel: string = '';
	itemsPerPageLabel: string = 'Itens por Página:';
	// getRangeLabel = function (page, pageSize, length) {
	// 	const of = this.translate ? this.translate.instant('paginator.of') : 'de';
	// 	if (length === 0 || pageSize === 0) {
	// 		return '0 ' + of + ' ' + length;
	// 	}
	// 	length = Math.max(length, 0);
	// 	const startIndex = page * pageSize;
	// 	const endIndex = startIndex < length ?
	// 		Math.min(startIndex + pageSize, length) :
	// 		startIndex + pageSize;
	// 	return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
	// };
}

@Component({
	selector: 'neo-enderecos-dialog',
	templateUrl: './enderecos-dialog.component.html',
	styleUrls: ['./endereco.component.scss'],
	providers: [{ provide: MatPaginatorIntl, useValue: new RemovedLabels() }]
})
export class EnderecosDialogComponent {
	dataSource: MatTableDataSource<any>;
	activePageDataChunk: any = [];
	enderecosFiltrados: any;
	enderecoEscolhido: any;
	enderecoFilter: any;
	enderecos: any = [];
	pageSize = 5;
	mobile = false;
	constructor(
		public dialogRef: MatDialogRef<EnderecosDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
	) {
        this.dataSource = new MatTableDataSource();
        this.aoInicializar();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    aoInicializar(): void {
        this.enderecos = this.data.UEOptions.imovel;
        this.activePageDataChunk = this.enderecos.slice(0, this.pageSize);
        this.mobile = configureMenuByWindowSize(window.screen.width);
	}

	onPageChanged(event: any): void {
		let firstCut = event.pageIndex * event.pageSize;
		let secondCut = firstCut + event.pageSize;
		this.activePageDataChunk = this.enderecos.slice(firstCut, secondCut);
	}

	escolhaEnd(enderecoEscolhido: any): void {
		this.enderecoEscolhido = enderecoEscolhido;
	}

	confirmar(): void {
		this.dialogRef.close(this.enderecoEscolhido);
	}

	search(): void {
		if (this.enderecoFilter === '') {
			this.aoInicializar();
		} else {
			this.enderecosFiltrados = this.data.UEOptions.imovel.filter((res: any) => {
				if (res.nomeLogradouro.toLocaleLowerCase().match(this.enderecoFilter.toLocaleLowerCase())) {
					return res.nomeLogradouro.toLocaleLowerCase().match(this.enderecoFilter.toLocaleLowerCase());
				} else if (res.tipoLogradouro.toLocaleLowerCase().match(this.enderecoFilter.toLocaleLowerCase())) {
					return res.tipoLogradouro.toLocaleLowerCase().match(this.enderecoFilter.toLocaleLowerCase());
				} else if (res.nomeBairro.toLocaleLowerCase().match(this.enderecoFilter.toLocaleLowerCase())) {
					return res.nomeBairro.toLocaleLowerCase().match(this.enderecoFilter.toLocaleLowerCase());
				}
			});

			this.enderecos = this.enderecosFiltrados;
			this.activePageDataChunk = this.enderecosFiltrados;
			this.activePageDataChunk = this.enderecos.slice(0, this.pageSize);
		}
	}

	close(): void {
		this.dialogRef.close();
	}

	enderecoNaoEncontrado(): void {
		this.dialogRef.close('enderecoNaoEncontrado');
	}



}
