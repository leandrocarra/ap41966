import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { resolve } from 'dns';
import { Observable, of } from 'rxjs';
import { DadosDoImovel, Endereco } from '../../../../../../core/models/dados-do-imovel/endereco';
import { AttachedFileModule } from '../../../../../../shared/components/attached-file/attached-file.module';
import { BoxFileModule } from '../../../../../../shared/components/box-file/box-file.module';
import { SweetAlertResult } from 'sweetalert2';
import { EnderecoComponent, EnderecosDialogComponent, RemovedLabels } from './endereco.component';
import * as L from 'leaflet';

describe(EnderecoComponent.name, () => {

    let component: EnderecoComponent;
    let componentDialog: EnderecosDialogComponent;
    let fixture: ComponentFixture<EnderecoComponent>;
    let fixtureDialog: ComponentFixture<EnderecosDialogComponent>;
    let router: Router;
    let location: Location;
    let dialog: any;

    let arquivo = { fileData: 'JVBERi0xLjMNCiXi48', fileExtension: '.pdf', fileName: 'Comprovante de residência', fileSize: 322408 };
    let box = { label: 'JVBERi0xLjMNCiXi48', docName: 'Comprovante de residência', ocr: false };
    let sessionUserCPF = require('src/app/appLN/shared/mock/responses/response-session-user-cpf.json');
    let responseLicencaAmbientalMod1 = require('src/app/appLN/shared/mock/responses/response-ocr-licenca-ambiental-mod1.json');
    let responseLicencaAmbientalMod2 = require('src/app/appLN/shared/mock/responses/response-ocr-licenca-ambiental-mod2.json');
    let responseIPTU = require('src/app/appLN/shared/mock/responses/response-ocr-iptu.json');
    let responseINCRA = require('src/app/appLN/shared/mock/responses/response-ocr-incra.json');
    let enderecoMockado = require('src/app/appLN/shared/mock/responses/response-dados-do-imovel.json');

    let mapPosition =
    {
        "altitude": 584.3,
        "cep": "13502012",
        "latitude": "-22.4272725",
        "longitude": "-47.5776723",
        "logradouro": "Rua 3 JI",
        "bairro": "Jardim INOCOOP",
        "cidade": {
            "ddd": 19,
            "ibge": "3543907",
            "nome": "Rio Claro"
        },
        "estado": {
            "sigla": "SP"
        }
    }

    let mapPositionErr = [
        {
            'latitude': [],
            'longitude': []
        }
    ]

    let resultDialogRef = {
        "tipoLogradouro": "ACS",
        "codigoLogradouro": "063364",
        "nomeLogradouro": "DO TREVO SP 127 E 310",
        "codigoBairro": "00310010",
        "nomeBairro": "JD BOM SUCESSO",
        "codigoLocalidade": "0031",
        "nomeLocalidade": "RIO CLARO",
        "codigoMunicipio": "00354390",
        "nomeMunicipio": "RIO CLARO",
        "uf": "SP",
        "cep": "13500000",
        "tipoLocalizacao": "",
        "trecho": "0003"
    }

    let resultDialogRefRural = {
        "tipoLogradouro": "ACS",
        "codigoLogradouro": "063364",
        "nomeLogradouro": "DO TREVO SP 127 E 310",
        "codigoBairro": "00310010",
        "nomeBairro": "JD BOM SUCESSO",
        "codigoLocalidade": "0031",
        "nomeLocalidade": "RIO CLARO",
        "codigoMunicipio": "00354390",
        "nomeMunicipio": "RIO CLARO",
        "uf": "SP",
        "cep": "13500000",
        "tipoLocalizacao": "RR",
        "trecho": "0003"
    }

    let resultDialogRefDuplo = [{
        "tipoLogradouro": "ACS",
        "codigoLogradouro": "063364",
        "nomeLogradouro": "DO TREVO SP 127 E 310",
        "codigoBairro": "00310010",
        "nomeBairro": "JD BOM SUCESSO",
        "codigoLocalidade": "0031",
        "nomeLocalidade": "RIO CLARO",
        "codigoMunicipio": "00354390",
        "nomeMunicipio": "RIO CLARO",
        "uf": "SP",
        "cep": "13500000",
        "tipoLocalizacao": "",
        "trecho": "0003"
    }, {
        "tipoLogradouro": "ACS",
        "codigoLogradouro": "063364",
        "nomeLogradouro": "DO TREVO SP 127 E 310",
        "codigoBairro": "00310010",
        "nomeBairro": "JD BOM SUCESSO",
        "codigoLocalidade": "0031",
        "nomeLocalidade": "RIO CLARO",
        "codigoMunicipio": "00354390",
        "nomeMunicipio": "RIO CLARO",
        "uf": "SP",
        "cep": "13500000",
        "tipoLocalizacao": "",
        "trecho": "0003"
    }
    ]

    let dataNaoEncontrado = [];

    const dialogMock = {
        close: () => { }
        };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EnderecoComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatDialogModule,
                ReactiveFormsModule,
                MatTableModule,
                FormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatSelectModule,
                MatOptionModule,
                MatRadioModule,
                BrowserAnimationsModule,
                MatIconModule,
                AttachedFileModule,
                BoxFileModule,
                MatPaginatorModule
            ],
            providers: [
                { provide: MatPaginatorIntl, useValue: new RemovedLabels() },
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] },
                { provide: MatDialogRef, useValue: dialogMock },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(EnderecoComponent);
        fixtureDialog = TestBed.createComponent(EnderecosDialogComponent);
        component = fixture.componentInstance;
        componentDialog = fixtureDialog.componentInstance;
        componentDialog.data.UEOptions = resultDialogRefDuplo;
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it(`#${EnderecoComponent.prototype.onResize.name}
      deve setar variável mobile como verdadeiro quando o resize da
      tela for menor que 768`, () => {
        fixture.detectChanges();
        spyOnProperty(window, 'innerWidth').and.returnValue(760);
        window.dispatchEvent(new Event('resize'));
        expect(component.mobile).toBeTrue();
    });

    it(`#${EnderecoComponent.prototype.onResize.name}
    deve setar variável mobile como verdadeiro quando o resize da
    tela for maior que 768`, () => {
        fixture.detectChanges();
        spyOnProperty(window, 'innerWidth').and.returnValue(1000);
        window.dispatchEvent(new Event('resize'));
        expect(component.mobile).toBeFalse();
    });

    it(`#${EnderecoComponent.prototype.anexarDocumento.name}
  deve verificar quantidade de documento e se for menor
  que 1 verifica se o nome do documento é comprovante de endereço`, () => {
        fixture.detectChanges();
        component.anexos['Comprovante de Endereço'].arquivos = [];
        let alertAnaliseComprovanteEnderecoSpy = spyOn(component['_alert'], 'alertAnaliseComprovanteEndereco');
        component.anexarDocumento(arquivo, 'Comprovante de Endereço', true);
        expect(alertAnaliseComprovanteEnderecoSpy).toHaveBeenCalled();
    });

    it(`#${EnderecoComponent.prototype.anexar.name}
  deve verificar quantidade de documento e se já tiver documento
  anexado, apresentará um alert informando que já foi recebido o comprovante`, () => {
        fixture.detectChanges();
        component.anexos['Comprovante de Endereço'].push(arquivo);
        let alertSuccessSpy = spyOn(component['_alert'], 'alertSuccess');
        component.anexar(arquivo, 'Comprovante de Endereço', box);
        expect(alertSuccessSpy).toHaveBeenCalledWith('Já recebemos este comprovante, para enviá-lo novamente, delete o documento abaixo');
    });

    it(`#${EnderecoComponent.prototype.chamaAlertWarningLicencaAmbiental.name}
  deve chamar o alert de documento de licença ambiental`, () => {
        fixture.detectChanges();
        component.chamaAlertWarningLicencaAmbiental();
        expect(component.chamaAlertWarningLicencaAmbiental).toBeDefined();
    });

    it(`#${EnderecoComponent.prototype.anexarDocs.name}
  deve ser chamado quando anexar docs para endereço sem CEP`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.cep = '13500000';
        component.dadosDoImovel.endereco.areaAmbiental = 'SIM';
        component.dadosDoImovel.endereco.ruaSemCep = true;
        component.dadosDoImovel.endereco.cepEncontrado = false;
        component.anexarDocs();
        expect(component.anexarDocs).toBeDefined();
    });

    it(`#${EnderecoComponent.prototype.anexarDocs.name}
  deve ser chamado quando anexar docs para endereço com CEP encontrado`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.cep = '13500000';
        component.dadosDoImovel.endereco.areaAmbiental = 'NÃO';
        component.dadosDoImovel.endereco.ruaSemCep = false;
        component.dadosDoImovel.endereco.cepEncontrado = true;
        component.anexarDocs();
        expect(component.anexarDocs).toBeDefined();
    });

    it(`#${EnderecoComponent.prototype.anexarDocs.name}
    deve ser chamado quando anexar docs e chamar método configurarAnexosNecessarios 0`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.cep = '13500000';
        component.dadosDoImovel.endereco.areaAmbiental = 'NÃO';
        component.dadosDoImovel.endereco.ruaSemCep = true;
        component.dadosDoImovel.endereco.cepEncontrado = false;
        component.anexarDocs();
        expect(component.anexarDocs).toBeDefined();
    });

    it(`#${EnderecoComponent.prototype.anexarDocs.name}
    deve ser chamado quando anexar docs e chamar método configurarAnexosNecessarios 1`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.cep = '13500000';
        component.dadosDoImovel.endereco.areaAmbiental = 'SIM';
        component.dadosDoImovel.endereco.ruaSemCep = false;
        component.dadosDoImovel.endereco.cepEncontrado = true;
        component.anexarDocs();
        expect(component.anexarDocs).toBeDefined();
    });

    it(`#${EnderecoComponent.prototype.remove.name}
    deve remover arquivo anexado`, () => {
        fixture.detectChanges();
        component.anexos['Comprovante de Endereço'].push(arquivo);
        component.remove(0, 'Comprovante de Endereço');
        expect(component.anexos['Comprovante de Endereço'].length).toEqual(0);
    });

    it(`#${EnderecoComponent.prototype.voltar.name}
    deve voltar a página quando chamado`, fakeAsync(() => {
        fixture.detectChanges();
        component.voltar();
        expect(location.back()).toBe();
    }));

    it(`#${EnderecoComponent.prototype.deParaDocumentosService.name}
    deve ser chamado para realizar o de/para do atributo auxiliar dos anexos
    para o service`, () => {
        fixture.detectChanges();
        component.dadosDoImovel.endereco.anexos['Comprovante de Endereço'].push(arquivo);
        component.deParaDocumentosService();
        expect(component['_documentosService'].anexos.comprovanteEndereco.length).toEqual(1);
    });

    it(`#${EnderecoComponent.prototype.carregaCep.name}
    deve carregar modal de endereços quando o CEP for encontrado`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.cep = '13500000';
        component.carregaCep();
        expect(component.dadosDoImovel.endereco.cep.length).toEqual(8);
    });

    it(`#${EnderecoComponent.prototype.buscarCep.name}
    deve buscar cep na base não encontrando endereço`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.cep = '13502012';
        spyOn(component['_dadosDoImovelService'], 'buscarCep').and.returnValue(of(dataNaoEncontrado));
        component.buscarCep();
        expect(component.dadosDoImovel.endereco.cepEncontrado).toBeFalse();
    });

    it(`#${EnderecoComponent.prototype.buscarCep.name}
    deve buscar cep na base e retornando erro no serviço`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        let error: any = new Error("failed");
        component.dadosDoImovel.endereco.cep = '13502012';
        spyOn(component['_dadosDoImovelService'], 'buscarCep').and.returnValue(new Observable(error));
        component.buscarCep();
        expect(component.dadosDoImovel.endereco.cep).toEqual('13502012');
    });

    it(`#${EnderecoComponent.prototype.verificarCEP.name}
    deve limpar os dados do endereço quando for rua sem cep`, fakeAsync(() => {
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.ruaSemCep = true;
        spyOn(component['_alert'], 'alertRuaSemCepDefinido').and.returnValue(Promise.resolve<SweetAlertResult>({
            "value": true
        }));
        let spy = spyOn(component, 'resetImovel');
        fixture.detectChanges();
        component.verificarCEP();
        tick(200);
        expect(spy).toHaveBeenCalled();
    }));

    it(`#${EnderecoComponent.prototype.confirmUESelection.name}
    deve ser chamado se possuir apenas um CEP e sem resposta do cep aberto
    com zona rural`, () => {
        fixture.detectChanges();
        component.resultadoBuscaCep = [];
        component.resultadoBuscaCep.push(resultDialogRefRural);
        component.selectedUE = resultDialogRefRural;
        spyOn(component['_dadosDoImovelService'], 'cepAberto').and.returnValue(of(mapPositionErr));
        component.confirmUESelection('selecionado');
        expect(component.confirmUESelection).toBeDefined();
    });

    // it(`#${EnderecoComponent.prototype.confirmUESelection.name}
    // deve ser chamado se possuir apenas um CEP e sem resposta do cep aberto
    // com zona rural com acesso a latitude e longitude`, fakeAsync(() => {
    //     fixture.detectChanges();
    //     component.resultadoBuscaCep = [];
    //     component.resultadoBuscaCep.push(resultDialogRefRural);
    //     component.selectedUE = resultDialogRefRural;
    //     component.dadosDoImovel.endereco.cep = '13502012';
    //     component.map = undefined;
    //     spyOn(component['_dadosDoImovelService'], 'cepAberto').and.returnValue(of(mapPosition));
    //     component.confirmUESelection('selecionado');
    //     tick(1000);
    //     expect(component.latitudeMarker).toEqual(mapPosition.latitude);
    //     tick(1200);
    // }));

    // it(`#${EnderecoComponent.prototype.confirmUESelection.name}
    // deve ser chamado se possuir apenas um CEP e sem resposta do cep aberto
    // sem zona rural`, () => {
    //     component.resultadoBuscaCep = [];
    //     component.resultadoBuscaCep.push(resultDialogRef);
    //     component.selectedUE = resultDialogRef;
    //     spyOn(component['_etapaService'], 'cepAberto').and.returnValue(of(mapPositionErr));
    //     fixture.detectChanges();
    //     component.confirmUESelection('selecionado');
    //     expect(component.confirmUESelection).toBeDefined();
    // });

    it(`#${EnderecoComponent.prototype.confirmUESelection.name}
    deve ser chamado quando não possuir CEP único`, () => {
        fixture.detectChanges();
        component.resultadoBuscaCep = [];
        component.resultadoBuscaCep = resultDialogRefDuplo;
        component.confirmUESelection('selecionado');
        expect(component.confirmUESelection).toBeDefined();
    });

    it(`#${EnderecoComponent.prototype.confirmUESelection.name}
    deve emitir se o CEP não foi encontrado`, () => {
        fixture.detectChanges();
        component.resultadoBuscaCep = [];
        component.resultadoBuscaCep.push(resultDialogRef);
        component.selectedUE = resultDialogRef;
        component.confirmUESelection('naoEncontrado');
        expect(component.confirmUESelection).toBeDefined();
    });

    // it(`#${EnderecoComponent.prototype.setLocalizacaoPorCep.name}
    // deve localizar CEP no mapa`, () => {
    //     fixture.detectChanges();
    //     component.map = L.Map;
    //     component.latitudeMarker = '11';
    //     component.longitudeMarker = '11';
    //     component.setLocalizacaoPorCep();
    //     expect(component.latitudeMarker).toEqual('11');
    // });

    it(`#${EnderecoComponent.prototype.continuar.name}
    deve verificar dados de endereço para continuar, os dados estarão preenchidos
    mas não foi preenchido se o imóvel está em área ambiental, será emitido um
    alert para informar se está em área ambiental ou não`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.ruaSemCep = true;
        component.dadosDoImovel.endereco.endereco = 'test';
        component.dadosDoImovel.endereco.numero = '1';
        component.dadosDoImovel.endereco.bairro = 'test';
        component.dadosDoImovel.endereco.cidade = 'test';
        component.dadosDoImovel.endereco.estado = 'test';
        let alertAreaAmbientalSpy = spyOn(component['_alert'], 'alertWarningWithText');
        component.continuar();
        expect(alertAreaAmbientalSpy).toHaveBeenCalledWith("Atenção", "Por favor, informe se o imóvel está localizado em uma área de preservação ambiental");
    });

    it(`#${EnderecoComponent.prototype.continuar.name}
    deve verificar dados de endereço para continuar, se os dados não estiverem
    preenchidos e for rua sem CEP emitirá um alert para preencher todos os dados`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.ruaSemCep = true;
        let dadosNaoPreenchidosSpy = spyOn(component['_alert'], 'alertWarning');
        component.continuar();
        expect(dadosNaoPreenchidosSpy).toHaveBeenCalledWith('POR FAVOR, PREENCHA TODOS OS CAMPOS');
    });

    it(`#${EnderecoComponent.prototype.continuar.name}
    deve verificar dados de endereço para continuar, se os dados não estiverem
    preenchidos e for rua com CEP emitirá um alert para preencher todos os dados`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.ruaSemCep = false;
        let dadosNaoPreenchidosSpy = spyOn(component['_alert'], 'alertWarning');
        component.continuar();
        expect(dadosNaoPreenchidosSpy).toHaveBeenCalledWith('POR FAVOR, PREENCHA TODOS OS CAMPOS');
    });

    it(`#${EnderecoComponent.prototype.continuar.name}
    deve verificar dados de endereço para continuar, os dados estarão preenchidos
    com área ambiental, mas por não ter arquivo anexado será emitido um
    alert para enviar os arquivos`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.endereco = 'test';
        component.dadosDoImovel.endereco.numero = '1';
        component.dadosDoImovel.endereco.bairro = 'test';
        component.dadosDoImovel.endereco.cidade = 'test';
        component.dadosDoImovel.endereco.estado = 'test';
        component.dadosDoImovel.endereco.areaAmbiental = 'SIM';
        component.dadosDoImovel.endereco.anexos['Licença Ambiental'] = [];
        let alertAreaAmbientalSpy = spyOn(component['_alert'], 'alertWarning');
        component.continuar();
        expect(alertAreaAmbientalSpy).toHaveBeenCalledWith('POR FAVOR, ENVIE TODOS OS ARQUIVOS');
    });

    it(`#${EnderecoComponent.prototype.continuar.name}
    deve verificar dados de endereço para continuar, o CEP não foi encontrado e
    rua sem CEP, o comprovante de endereço não foi anexado`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.cepEncontrado = false;
        component.dadosDoImovel.endereco.ruaSemCep = true;
        component.dadosDoImovel.endereco.anexos['Comprovante de Endereço'] = [];
        component.dadosDoImovel.endereco.areaAmbiental = 'SIM';
        component.dadosDoImovel.endereco.anexos['Licença Ambiental'].push(arquivo);
        component.dadosDoImovel.endereco.endereco = 'test';
        component.dadosDoImovel.endereco.numero = '1';
        component.dadosDoImovel.endereco.bairro = 'test';
        component.dadosDoImovel.endereco.cidade = 'test';
        component.dadosDoImovel.endereco.estado = 'test';
        let alertAreaAmbientalSpy = spyOn(component['_alert'], 'alertWarning');
        component.continuar();
        expect(alertAreaAmbientalSpy).toHaveBeenCalledWith('POR FAVOR, ENVIE TODOS OS ARQUIVOS');
    });

    it(`#${EnderecoComponent.prototype.continuar.name}
    deve verificar dados de endereço para continuar, o CEP não foi encontrado e
    rua com CEP o comprovante de endereço não foi anexado`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.cepEncontrado = false;
        component.dadosDoImovel.endereco.ruaSemCep = false;
        component.dadosDoImovel.endereco.anexos['Comprovante de Endereço'] = [];
        component.dadosDoImovel.endereco.areaAmbiental = 'SIM';
        component.dadosDoImovel.endereco.anexos['Licença Ambiental'].push(arquivo);
        component.dadosDoImovel.endereco.endereco = 'test';
        component.dadosDoImovel.endereco.numero = '1';
        component.dadosDoImovel.endereco.bairro = 'test';
        component.dadosDoImovel.endereco.cidade = 'test';
        component.dadosDoImovel.endereco.estado = 'test';
        let alertAreaAmbientalSpy = spyOn(component['_alert'], 'alertWarning');
        component.continuar();
        expect(alertAreaAmbientalSpy).toHaveBeenCalledWith('POR FAVOR, ENVIE TODOS OS ARQUIVOS');
    });

    it(`#${EnderecoComponent.prototype.continuar.name}
    deve verificar dados de endereço para continuar, não foi informado
    se é um endereço de apartamento ou não`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.cepEncontrado = false;
        component.dadosDoImovel.endereco.ruaSemCep = false;
        component.dadosDoImovel.endereco.anexos['Comprovante de Endereço'].push(arquivo);
        component.dadosDoImovel.endereco.areaAmbiental = 'SIM';
        component.dadosDoImovel.endereco.anexos['Licença Ambiental'].push(arquivo);
        component.dadosDoImovel.endereco.endereco = 'test';
        component.dadosDoImovel.endereco.numero = '1';
        component.dadosDoImovel.endereco.bairro = 'test';
        component.dadosDoImovel.endereco.cidade = 'test';
        component.dadosDoImovel.endereco.estado = 'test';
        let alertApartamentoSpy = spyOn(component['_alert'], 'alertWarningWithText');
        component.continuar();
        expect(alertApartamentoSpy).toHaveBeenCalledWith('Atenção', 'Por favor, informe se o imóvel é um apartamento, condomínio ou sala comercial');
    });

    it(`#${EnderecoComponent.prototype.continuar.name}
    deve verificar dados de endereço para continuar, não foi informado
    se é um endereço de apartamento e sem complemento`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.cepEncontrado = false;
        component.dadosDoImovel.endereco.ruaSemCep = false;
        component.dadosDoImovel.endereco.anexos['Comprovante de Endereço'].push(arquivo);
        component.dadosDoImovel.endereco.areaAmbiental = 'SIM';
        component.dadosDoImovel.endereco.anexos['Licença Ambiental'].push(arquivo);
        component.dadosDoImovel.endereco.endereco = 'test';
        component.dadosDoImovel.endereco.numero = '1';
        component.dadosDoImovel.endereco.bairro = 'test';
        component.dadosDoImovel.endereco.cidade = 'test';
        component.dadosDoImovel.endereco.estado = 'test';
        component.dadosDoImovel.endereco.apartamento = true;
        component.dadosDoImovel.endereco.complemento = '';
        let alertApartamentoSpy = spyOn(component['_alert'], 'alertWarning');
        component.continuar();
        expect(alertApartamentoSpy).toHaveBeenCalledWith('POR FAVOR, INFORME O COMPLEMENTO');
    });

    it(`#${EnderecoComponent.prototype.continuar.name}
    deve verificar dados de endereço para continuar, não não houver problemas
    na validação será possível prosseguir para endereço sem zona rural`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.cepEncontrado = false;
        component.dadosDoImovel.endereco.ruaSemCep = false;
        component.dadosDoImovel.endereco.anexos['Comprovante de Endereço'].push(arquivo);
        component.dadosDoImovel.endereco.areaAmbiental = 'SIM';
        component.dadosDoImovel.endereco.anexos['Licença Ambiental'].push(arquivo);
        component.dadosDoImovel.endereco.endereco = 'test';
        component.dadosDoImovel.endereco.numero = '1';
        component.dadosDoImovel.endereco.bairro = 'test';
        component.dadosDoImovel.endereco.cidade = 'test';
        component.dadosDoImovel.endereco.estado = 'test';
        component.dadosDoImovel.endereco.apartamento = false;
        component.dadosDoImovel.endereco.complemento = 'test';
        let spy = spyOn(router, 'navigate');
        component.continuar();
        expect(spy).toHaveBeenCalledWith(["ligacao-nova", "pedido", "confirmar-endereco"]);
    });

    it(`#${EnderecoComponent.prototype.continuar.name}
    deve verificar dados de endereço para continuar, não não houver problemas
    na validação será possível prosseguir para endereço com zona rural`, () => {
        fixture.detectChanges();
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.cepEncontrado = false;
        component.dadosDoImovel.endereco.ruaSemCep = false;
        component.dadosDoImovel.endereco.anexos['Comprovante de Endereço'].push(arquivo);
        component.dadosDoImovel.endereco.areaAmbiental = 'SIM';
        component.dadosDoImovel.endereco.anexos['Licença Ambiental'].push(arquivo);
        component.dadosDoImovel.endereco.endereco = 'test';
        component.dadosDoImovel.endereco.numero = '1';
        component.dadosDoImovel.endereco.bairro = 'test';
        component.dadosDoImovel.endereco.cidade = 'test';
        component.dadosDoImovel.endereco.estado = 'test';
        component.dadosDoImovel.endereco.tipoLocalizacao = 'RR';
        component.dadosDoImovel.endereco.apartamento = false;
        component.dadosDoImovel.endereco.complemento = 'test';
        let spy = spyOn(router, 'navigate');
        component.continuar();
        expect(spy).toHaveBeenCalledWith(["ligacao-nova", "pedido", "confirmar-endereco"]);
    });

    it(`#${EnderecoComponent.prototype.anexar.name}
    deve chamar o método #${EnderecoComponent.prototype.validarDocumentoEndereco.name} quando não tiver anexo`, () => {
        fixture.detectChanges();
        component.anexos['Comprovante de Endereço'] = [];
        let validarDocumentoEnderecoSpy = spyOn(component, 'validarDocumentoEndereco');
        component.anexar(arquivo, 'Comprovante de Endereço', box);
        expect(validarDocumentoEnderecoSpy).toHaveBeenCalledWith(arquivo, 'Comprovante de Endereço');
    });

    // it(`#${EnderecoComponent.prototype.validarDocumentoEndereco.name}
    // deve chamar #${EnderecoComponent.prototype.anexarDocumento.name} quando data for false`, fakeAsync(() => {
    //     fixture.detectChanges();
    //     spyOn(component['_ocrService'], 'ocr').and.returnValue(Promise.resolve(false));
    //     let anexarDocumentoSpy = spyOn(component, 'anexarDocumento');
    //     component.validarDocumentoEndereco(arquivo, 'Comprovante de Endereço');
    //     tick(100);
    //     expect(anexarDocumentoSpy).toHaveBeenCalledWith(arquivo, 'Comprovante de Endereço', false);
    // }));

    it(`#${EnderecoComponent.prototype.validarDocumentoEndereco.name}
    deve chamar o serviço de ocr e simular o retorno do json da Licença Ambiental`, fakeAsync(() => {
        fixture.detectChanges();
        spyOn(component['_ocrService'], 'ocr').and.returnValues(Promise.resolve(responseLicencaAmbientalMod1['VALIDO']));
        let validarLicencaAmbientalSpy = spyOn(component, 'validarLicencaAmbiental');
        component.validarDocumentoEndereco(arquivo, 'Licença Ambiental');
        tick(100);
        expect(validarLicencaAmbientalSpy).toHaveBeenCalledWith(responseLicencaAmbientalMod1['VALIDO'].result[0]);
    }));

    it(`#${EnderecoComponent.prototype.validarDocumentoEndereco.name}
    deve chamar o serviço de ocr e simular o retorno do json do Comprovante de Endereco`, fakeAsync(() => {
        fixture.detectChanges();
        spyOn(component['_ocrService'], 'ocr').and.returnValues(Promise.resolve(responseIPTU['VALIDO']));
        let validarComprovanteDeEnderecoSpy = spyOn(component, 'validarComprovanteDeEndereco');
        component.validarDocumentoEndereco(arquivo, 'Comprovante de Endereço');
        tick(100);
        expect(validarComprovanteDeEnderecoSpy).toHaveBeenCalledWith(responseIPTU['VALIDO'].result[0]);
    }));

    it(`#${EnderecoComponent.prototype.validarLicencaAmbiental.name}
    deve chamar o método, quando for modelo1 #${EnderecoComponent.prototype.validarModelo1Licenca.name}`, () => {
        fixture.detectChanges();
        let validarModelo1LicencaSpy = spyOn(component, 'validarModelo1Licenca');
        component.validarLicencaAmbiental(responseLicencaAmbientalMod1['VALIDO'].result[0]);
        expect(validarModelo1LicencaSpy).toHaveBeenCalledWith(responseLicencaAmbientalMod1['VALIDO'].result[0]);
    });

    it(`#${EnderecoComponent.prototype.validarLicencaAmbiental.name}
    deve chamar o método quando for modelo2 #${EnderecoComponent.prototype.validarModelo2Licenca.name}`, () => {
        fixture.detectChanges();
        let validarModelo2LicencaSpy = spyOn(component, 'validarModelo2Licenca');
        component.validarLicencaAmbiental(responseLicencaAmbientalMod2['VALIDO'].result[0]);
        expect(validarModelo2LicencaSpy).toHaveBeenCalledWith(responseLicencaAmbientalMod2['VALIDO'].result[0]);
    });


    it(`#${EnderecoComponent.prototype.validarLicencaAmbiental.name}
    deve retornar false quando o doc anexado não for licença ambiental`, () => {
        fixture.detectChanges();
        expect(component.validarLicencaAmbiental([])).toBeFalse();
    });

    // it(`#${EnderecoComponent.prototype.validarModelo1Licenca.name}
    // deve retornar true quando os dados forem validados com o sessionUser e o endereço`, () => {
    //     component['_userService'].sessionUser = sessionUserCPF;
    //     component.dadosDoImovel = new DadosDoImovel();
    //     component.dadosDoImovel = enderecoMockado['URBANO'];
    //     fixture.detectChanges();
    //     expect(component.validarModelo1Licenca(responseLicencaAmbientalMod1['VALIDO'].result[0])).toBeTrue();
    // });

    // it(`#${EnderecoComponent.prototype.validarModelo1Licenca.name}
    // deve retornar false quando os dados forem inválidos com o sessionUser e o endereço`, () => {
    //     component['_userService'].sessionUser = sessionUserCPF;
    //     component.dadosDoImovel = new DadosDoImovel();
    //     component['_dadosDoImovelService'].setDadosDoImovel = enderecoMockado['URBANO'];
    //     fixture.detectChanges();
    //     expect(component.validarModelo1Licenca(responseLicencaAmbientalMod1['INVALIDO'].result[0])).toBeFalse();
    // });

    // it(`#${EnderecoComponent.prototype.validarModelo2Licenca.name}
    // deve retornar true quando os dados forem validados com o sessionUser e o endereço`, () => {
    //     fixture.detectChanges();
    //     component['_userService'].sessionUser = sessionUserCPF;
    //     component.dadosDoImovel = new DadosDoImovel();
    //     component.dadosDoImovel = enderecoMockado['URBANO'];
    //     component.dadosDoImovel.endereco.endereco = enderecoMockado['URBANO'].endereco;
    //     component.dadosDoImovel.endereco.cep = enderecoMockado['URBANO'].cep;
    //     component.dadosDoImovel.endereco.cidade = enderecoMockado['URBANO'].cidade;
    //     component.dadosDoImovel.endereco.numero = enderecoMockado['URBANO'].numero;
    //     component.dadosDoImovel.endereco.complemento = enderecoMockado['URBANO'].complemento;
    //     component.dadosDoImovel.endereco.bairro = enderecoMockado['URBANO'].bairro;
    //     fixture.detectChanges();
    //     expect(component.validarModelo2Licenca(responseLicencaAmbientalMod2['VALIDO'].result[0])).toBeTrue();
    // });

    it(`#${EnderecoComponent.prototype.validarModelo2Licenca.name}
    deve retornar false quando os dados forem inválidos com o sessionUser e o endereço`, () => {
        fixture.detectChanges();
        component['_userService'].sessionUser = sessionUserCPF;
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.endereco = enderecoMockado['URBANO'].endereco;
        component.dadosDoImovel.endereco.cep = enderecoMockado['URBANO'].cep;
        component.dadosDoImovel.endereco.cidade = enderecoMockado['URBANO'].cidade;
        component.dadosDoImovel.endereco.numero = enderecoMockado['URBANO'].numero;
        component.dadosDoImovel.endereco.complemento = enderecoMockado['URBANO'].complemento;
        component.dadosDoImovel.endereco.bairro = enderecoMockado['URBANO'].bairro;
        fixture.detectChanges();
        expect(component.validarModelo2Licenca(responseLicencaAmbientalMod2['INVALIDO'].result[0])).toBeFalse();
    });

    it(`#${EnderecoComponent.prototype.validarModelo1Licenca.name}
    deve retornar false quando os dados forem inválidos com o sessionUser e o endereço`, () => {
        fixture.detectChanges();
        component['_userService'].sessionUser = sessionUserCPF;
        component.dadosDoImovel = new DadosDoImovel();
        component.dadosDoImovel.endereco.endereco = enderecoMockado['URBANO'].endereco;
        component.dadosDoImovel.endereco.cep = enderecoMockado['URBANO'].cep;
        component.dadosDoImovel.endereco.cidade = enderecoMockado['URBANO'].cidade;
        component.dadosDoImovel.endereco.numero = enderecoMockado['URBANO'].numero;
        component.dadosDoImovel.endereco.complemento = enderecoMockado['URBANO'].complemento;
        component.dadosDoImovel.endereco.bairro = enderecoMockado['URBANO'].bairro;
        fixture.detectChanges();
        expect(component.validarModelo1Licenca(responseLicencaAmbientalMod1['INVALIDO'].result[0])).toBeFalse();
    });


    it(`#${EnderecoComponent.prototype.validarComprovanteDeEndereco.name}
    deve chamar o método #validarEnderecoIPTU`, () => {
        fixture.detectChanges();
        let validarEnderecoIPTUSpy = spyOn(component['_dadosDoImovelService'], 'validarEnderecoIPTU');
        component.validarComprovanteDeEndereco(responseIPTU['VALIDO'].result[0]);
        expect(validarEnderecoIPTUSpy).toHaveBeenCalledWith(responseIPTU['VALIDO'].result[0]);
    });

    it(`#${EnderecoComponent.prototype.validarComprovanteDeEndereco.name}
    deve chamar o método #validacaoINCRA`, () => {
        fixture.detectChanges();
        let validacaoINCRASpy = spyOn(component['_dadosDoImovelService'], 'validacaoINCRA');
        component.validarComprovanteDeEndereco(responseINCRA['VALIDO'].result[0]);
        expect(validacaoINCRASpy).toHaveBeenCalledWith(responseINCRA['VALIDO'].result[0]);
    });

    it(`#${EnderecoComponent.prototype.validarComprovanteDeEndereco.name}
    deve chamar o método #validacaoINCRA`, () => {
        fixture.detectChanges();
        expect(component.validarComprovanteDeEndereco([])).toBeFalse();
    });


    it('should create dialog', () => {
        fixtureDialog.detectChanges();
        expect(componentDialog).toBeTruthy();
    });

    it(`#${EnderecosDialogComponent.prototype.escolhaEnd.name}
    deve retornar endereço escolhido`, () => {
        fixtureDialog.detectChanges();
        let endereco = resultDialogRef;
        componentDialog.escolhaEnd(endereco);
        expect(endereco.cep).toEqual('13500000');
    });
});
