import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { prototype } from 'events';
import { NgxMaskModule } from 'ngx-mask';
import { of } from 'rxjs';
import { Endereco } from '../../../../../../core/models/dados-do-imovel/endereco';
import { RecCaixaPostal, RecImovel, RecAlternativo } from '../../../../../../core/models/dados-pagamento/dados-pagamento';
import { EscolhaPerfil } from '../../../../../../core/models/escolha-perfil/escolha-perfil';
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { DebitoFaturaService } from '../../../../../../core/services/debito-fatura/debito-fatura.service';
import { DocumentosService } from '../../../../../../core/services/documentos/documentos.service';
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { NeoSharedModule } from '../../../../../../shared/shared.module';
import { RecebimentoAlternativoModule } from '../../components/recebimento-alternativo/recebimento-alternativo.module';
import { RecebimentoCaixaPostalModule } from '../../components/recebimento-caixa-postal/recebimento-caixa-postal.module';
import { RecebimentoImovelModule } from '../../components/recebimento-imovel/recebimento-imovel.module';
import { PagamentoRoutingModule } from '../../pagamento-routing.module';
import { DebitoAutomaticoComponent } from './debito-automatico.component';

describe(DebitoAutomaticoComponent.name, () => {
	let component: DebitoAutomaticoComponent;
	let fixture: ComponentFixture<DebitoAutomaticoComponent>;

	let ligacaoNovaService: jasmine.SpyObj<LigacaoNovaService>;
	let dadosDoImovelService: jasmine.SpyObj<DadosDoImovelService>;
	let userService: jasmine.SpyObj<UserServiceLN>;
	let debitoFaturaService: jasmine.SpyObj<DebitoFaturaService>;
	let documentoService: jasmine.SpyObj<DocumentosService>;


	let router: Router;
	let location: Location;

	//Mocks
	let listaBancosMockado = require('src/app/appLN/shared/mock/responses/response-api-listar-bancos.json');
	let perfilEscolhidoMockado = require('src/app/appLN/shared/mock/preenchimentos/selecao-perfil.json');

	let listaAnexosMockados = [
		{
			"fileExtension": ".jpeg",
			"fileName": "selfie",
			"fileSize": 27064,
			"fileData": "/9j/"
		},
		{
			"fileExtension": ".jpeg",
			"fileName": "CNH",
			"fileSize": 176604,
			"fileData": "/9"
		}
	]


	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DebitoAutomaticoComponent],
			imports: [
				ReactiveFormsModule,
				RouterTestingModule.withRoutes([]),
				HttpClientTestingModule,
				FormsModule,
				MatInputModule,
				MatFormFieldModule,
				MatRadioModule,
				MatSelectModule,
				MatOptionModule,
				BrowserAnimationsModule,
				RecebimentoImovelModule,
				RecebimentoCaixaPostalModule,
				RecebimentoAlternativoModule,
				PagamentoRoutingModule,
				NgxMaskModule,
				HttpClientModule,
				NeoSharedModule
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],

		})
			.compileComponents();

		router = TestBed.inject(Router);
		location = TestBed.inject(Location);

	});

	beforeEach(() => {

		ligacaoNovaService = TestBed.inject(LigacaoNovaService) as jasmine.SpyObj<LigacaoNovaService>;
		dadosDoImovelService = TestBed.inject(DadosDoImovelService) as jasmine.SpyObj<DadosDoImovelService>;
		userService = TestBed.inject(UserServiceLN) as jasmine.SpyObj<UserServiceLN>;
		debitoFaturaService = TestBed.inject(DebitoFaturaService) as jasmine.SpyObj<DebitoFaturaService>;

		fixture = TestBed.createComponent(DebitoAutomaticoComponent);
		component = fixture.componentInstance;
	});

	it(`Deve instanciar ${DebitoAutomaticoComponent.name} quando chamado`, () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});


	it(`#${DebitoAutomaticoComponent.prototype.onResize.name}
	deve setar variável mobile como verdadeiro quando o resize
	da tela for menor que 768`, () => {
		fixture.detectChanges();
		spyOnProperty(window, 'innerWidth').and.returnValue(760);
		window.dispatchEvent(new Event('resize'));
		expect(component.mobile).toBeTrue();
	});


	it(`#${DebitoAutomaticoComponent.prototype.controlFormRequired.name}
	deve setar required como true e setar valores do formDebitoAutomatico como required`, () => {
		fixture.detectChanges();
		component.controlFormRequired(true);
		let banco = component.formDebitoAutomatico.controls['banco'];
		banco.setValue('');
		expect(banco.valid).toBeFalsy();
	});


	it(`#${DebitoAutomaticoComponent.prototype.controlFormRequired.name}
	deve limpar formDebitoAutomatico quando required for false`, () => {
		fixture.detectChanges();
		component.controlFormRequired(false);
		let banco = component.formDebitoAutomatico.controls['banco'];
		expect(banco.value).toEqual('');
	});

	it(`#${DebitoAutomaticoComponent.prototype.listarBancos.name}
	deve retornar lista de bancos e setar bancoSelected como undefined`, (done) => {
		fixture.detectChanges();
		spyOn(component['_userServiceLN'], 'gerarListaBancos').and.returnValue(of(listaBancosMockado));
		component.listarBancos();
		setTimeout(() => {
			expect(component.bancoSelected).toBe(undefined);
			done();
		})
	});


	it(`#${DebitoAutomaticoComponent.prototype.setBanco.name}
	deve setar valor em bancoSelected quando selecionar banco`, (done) => {
		fixture.detectChanges();
		spyOn(component['_userServiceLN'], 'gerarListaBancos').and.returnValue(of(listaBancosMockado));
		component.listarBancos();
		component.formDebitoAutomatico.controls['banco'].setValue(listaBancosMockado[0]);
		component.setBanco();

		setTimeout(() => {
			expect(component.bancoSelected).toEqual(listaBancosMockado[0]);
			done();
		});
	});

	it(`Deve setar valores em dadosPagamento.dadosBancarios quando #${DebitoAutomaticoComponent.prototype.deParaDadosBancarios.name} for chamado`, () => {
		fixture.detectChanges();
		component.formDebitoAutomatico.patchValue({
			debitoAutomatico: false,
			banco: listaBancosMockado[0],
			agencia: "1001",
			conta: "12313123"
		});

		component.deParaDadosBancarios();

		expect(component.dadosPagamento.dadosBancarios.banco).toEqual(component.formDebitoAutomatico.controls['banco'].value);
	});

	it(`Deve voltar página com location.back quando #${DebitoAutomaticoComponent.prototype.voltar.name} for chamado`, () => {
		fixture.detectChanges();
		component.voltar();
		expect(location.back()).toBe();
	});

	it(`#${DebitoAutomaticoComponent.prototype.finalizar.name} deve chamar #alertWarning quando tiver problema ao finalizar pedido`, (done) => {
		fixture.detectChanges();
		let alertSpy = spyOn(component['_alert'], 'alertWarning');
		component.problemaAoFinalizarPedido = true;
		component.finalizar();

		setTimeout(() => {
			expect(alertSpy).toHaveBeenCalledWith("Ocorreu um erro ao realizar o pedido.");
			done();
		});
	});

	it(`#${DebitoAutomaticoComponent.prototype.finalizar.name} deve chamar #${DebitoAutomaticoComponent.prototype.finalizarPedido.name} quando NÃO tiver problema ao finalizar pedido`, (done) => {
		fixture.detectChanges();
		let finalizarSpy = spyOn(component, 'finalizarPedido');
		component.problemaAoFinalizarPedido = false;
		component.finalizar();

		setTimeout(() => {
			expect(finalizarSpy).toHaveBeenCalled();
			done();
		});
	});


	it(`#${DebitoAutomaticoComponent.prototype.sendPedido.name}
	deve chamar #${DebitoAutomaticoComponent.prototype.sendPedido.name}
    quando houver #getRuaSemCep`, () => {
        fixture.detectChanges();
        let spy = spyOn(component, 'sendBackOffice');
		let dadosImovel = new Endereco();
		dadosImovel.ruaSemCep = true;
		dadosImovel.cepEncontrado = true;
        component['_dadosImovelService'].setEndereco = dadosImovel;
        component.sendPedido(listaAnexosMockados);
        expect(spy).toHaveBeenCalled();
    });

	it(`#${DebitoAutomaticoComponent.prototype.sendPedido.name}
	deve chamar #${DebitoAutomaticoComponent.prototype.sendPedido.name} quando
	houver justificativa de fatura`, () =>{
		fixture.detectChanges();
		let spy = spyOn(component, 'sendBackOffice');
		let dadosImovel = new Endereco();
		dadosImovel.ruaSemCep = false;
		dadosImovel.cepEncontrado = true;
		component['_dadosImovelService'].setEndereco = dadosImovel;
		component['_debitoFaturaService'].setJustificativa = "123"
		fixture.detectChanges();
		component.sendPedido(listaAnexosMockados)
		expect(spy).toHaveBeenCalled();

	})

	it(`#${DebitoAutomaticoComponent.prototype.sendPedido.name}
	deve chamar #${DebitoAutomaticoComponent.prototype.sendPedido.name} quando
	for Tarifa social`, () =>{
		fixture.detectChanges();
		let spy = spyOn(component, 'sendBackOffice');
		let dadosImovel = new Endereco();
		dadosImovel.ruaSemCep = false;
		dadosImovel.cepEncontrado = true;
		component['_dadosImovelService'].setEndereco = dadosImovel;
		component['_debitoFaturaService'].setJustificativa = ""
		component['_dadosLigacaoService'].setTarifa = "SOCIAL"
		fixture.detectChanges();
		component.sendPedido(listaAnexosMockados)
		expect(spy).toHaveBeenCalled();

	})

	it(`#${DebitoAutomaticoComponent.prototype.sendPedido.name}
	deve chamar #${DebitoAutomaticoComponent.prototype.sendPedido.name} quando
	houver falha na selfie`, () =>{
		fixture.detectChanges();
		let spy = spyOn(component, 'sendBackOffice');
		let dadosImovel = new Endereco();
		dadosImovel.ruaSemCep = false;
		dadosImovel.cepEncontrado = true;
		component['_dadosImovelService'].setEndereco = dadosImovel;
		component['_debitoFaturaService'].setJustificativa = ""
		component['_dadosLigacaoService'].setTarifa = ""
		component['_documentosService'].documentos.selfieError= true;
		fixture.detectChanges();
		component.sendPedido(listaAnexosMockados)
		expect(spy).toHaveBeenCalled();
	})

	it(`#${DebitoAutomaticoComponent.prototype.sendPedido.name}
	deve chamar #${DebitoAutomaticoComponent.prototype.sendPedido.name} quando
	for CNPJ`, () =>{
		fixture.detectChanges();
		let spy = spyOn(component, 'sendBackOffice');
		let dadosImovel = new Endereco();
		dadosImovel.ruaSemCep = false;
		dadosImovel.cepEncontrado = true;
		component['_dadosImovelService'].setEndereco = dadosImovel;
		component['_debitoFaturaService'].setJustificativa = "";
		component['_dadosLigacaoService'].setTarifa = "";
		component['_documentosService'].documentos.selfieError= false;
		component['_userServiceLN'].tipoDocumento = "CNPJ";
		fixture.detectChanges();
		component.sendPedido(listaAnexosMockados)
		expect(spy).toHaveBeenCalled();
	});

	it(`#${DebitoAutomaticoComponent.prototype.sendPedido.name}
	deve chamar #${DebitoAutomaticoComponent.prototype.sendPedido.name} quando
	for prefeituras autorizadas`, () =>{
		fixture.detectChanges();
		let spy = spyOn(component, 'sendBackOffice');
		let dadosImovel = new Endereco();
		dadosImovel.ruaSemCep = false;
		dadosImovel.cepEncontrado = true;
		dadosImovel.cidade ="ILHABELA";
		component['_dadosImovelService'].setEndereco = dadosImovel;
		component['_debitoFaturaService'].setJustificativa = "";
		component['_dadosLigacaoService'].setTarifa = "";
		component['_documentosService'].documentos.selfieError = false;
		component['_userServiceLN'].tipoDocumento = "";
		fixture.detectChanges();
		component.sendPedido(listaAnexosMockados)
		expect(spy).toHaveBeenCalled();
	});

	it(`#${DebitoAutomaticoComponent.prototype.sendPedido.name}
	deve chamar #${DebitoAutomaticoComponent.prototype.sendPedido.name} quando
	houver debitos`, () =>{
		fixture.detectChanges();
		let spy = spyOn(component, 'sendBackOffice');
		let dadosImovel = new Endereco();
		dadosImovel.ruaSemCep = false;
		dadosImovel.cepEncontrado = true;
		dadosImovel.cidade ="SATIRO DIAS";
		component['_dadosImovelService'].setEndereco = dadosImovel;
		component['_debitoFaturaService'].setJustificativa = "";
		component['_dadosLigacaoService'].setTarifa = "";
		component['_documentosService'].documentos.selfieError = false;
		component['_userServiceLN'].tipoDocumento = "";
		component['_dadosImovelService'].possivelDebito = true;
		fixture.detectChanges();
		component.sendPedido(listaAnexosMockados)
		expect(spy).toHaveBeenCalled();
	});





	it(`#${DebitoAutomaticoComponent.prototype.finalizarPedido.name}
	deve chamar #${DebitoAutomaticoComponent.prototype.sendPedido.name}
	quando houver listaAnexos`, (done) => {
		fixture.detectChanges();
		let escolhaPerfilMockado = new EscolhaPerfil()
		escolhaPerfilMockado.perfil = perfilEscolhidoMockado.RESIDENCIAL.perfil;
		ligacaoNovaService.setPerfilEscolhido = escolhaPerfilMockado;
		spyOn(component['_ligacaoNovaService'], 'criarListaAnexosGeral').and.returnValue(Promise.resolve(listaAnexosMockados));
		let sendPedidoSpy = spyOn(component, 'sendPedido');
		component.finalizar();

		setTimeout(() => {
			expect(sendPedidoSpy).toHaveBeenCalledWith(listaAnexosMockados);
			done();
		});
	});



	it(`#${DebitoAutomaticoComponent.prototype.sendPedido.name}
	deve chamar #${DebitoAutomaticoComponent.prototype.sendBackOffice.name}
	quando for backOffice`, () => {
		fixture.detectChanges();
		let sendBackOfficeSpy = spyOn(component, 'sendBackOffice');
		dadosDoImovelService.setCepEncontrado = true;
		let enderecoMockado = new Endereco();
		enderecoMockado.cidade = "";
		dadosDoImovelService.setEndereco = enderecoMockado;
		component.sendPedido(listaAnexosMockados);
		expect(sendBackOfficeSpy).toHaveBeenCalled();
	});

	it(`#sendDadosEntregaAlternativa deve preencher os dados da entrega da fatura quando for Caixa Postal`, () => {
		component['_dadosPagamentoService'].dadosPagamento.ondeReceber = 'CAIXA POSTAL';
		let mockCaixaPostal = new RecCaixaPostal();
		mockCaixaPostal.caixaPostal = '1234';
		mockCaixaPostal.cidade = 'São Paulo';
		mockCaixaPostal.estado = 'SP';
		mockCaixaPostal.cep = '0000000';
		component['_dadosPagamentoService'].dadosPagamento.receberCaixaPostal = mockCaixaPostal;

		let spyComponent = spyOn(component['_dadosPagamentoService'], 'entregaAlternativa');
		fixture.detectChanges();

		component['sendDadosEntregaAlternativa']();
		expect(spyComponent).toHaveBeenCalled();
	});

	it(`#sendDadosEntregaAlternativa deve preencher os dados da entrega da fatura quando for no imóvel`, () => {
		component['_dadosPagamentoService'].dadosPagamento.ondeReceber = 'NO IMÓVEL';
		let mockRecImovel = new RecImovel()
		let mockEndereco = new Endereco();
		mockEndereco.cep = '0000000';
		mockEndereco.cidade = 'São Paulo';
		mockEndereco.endereco = 'Rua Teste';
		mockEndereco.numero = '0';
		mockEndereco.complemento = 'Próxima a Padaria Teste';
		mockEndereco.bairro = 'Teste';
		mockEndereco.estado = 'SP';
		mockRecImovel.endereco = mockEndereco

		component['_dadosPagamentoService'].dadosPagamento.receberNoImovel = mockRecImovel;

		let spyComponent = spyOn(component['_dadosPagamentoService'], 'entregaAlternativa');
		fixture.detectChanges();

		component['sendDadosEntregaAlternativa']();
		expect(spyComponent).toHaveBeenCalled();
	});

	it(`#sendDadosEntregaAlternativa deve preencher os dados da entrega da fatura quando for no imóvel alternativo`, () => {
		component['_dadosPagamentoService'].dadosPagamento.ondeReceber = 'EM UM IMÓVEL ALTERNATIVO';
		let mockRecImovel = new RecAlternativo()
		let mockEndereco = new Endereco();
		mockEndereco.cep = '0000000';
		mockEndereco.cidade = 'São Paulo';
		mockEndereco.endereco = 'Rua Teste';
		mockEndereco.numero = '0';
		mockEndereco.complemento = 'Próxima a Padaria Teste';
		mockEndereco.bairro = 'Teste';
		mockEndereco.estado = 'SP';
		mockRecImovel.endereco = mockEndereco

		component['_dadosPagamentoService'].dadosPagamento.receberEnderecoAlternativo = mockRecImovel;

		let spyComponent = spyOn(component['_dadosPagamentoService'], 'entregaAlternativa');
		fixture.detectChanges();

		component['sendDadosEntregaAlternativa']();
		expect(spyComponent).toHaveBeenCalled();
	});


	/**
	 * FIM SEND PEDIDO
	 */


	// //FIXME: falta ajustar r.subscribe
	// it(`#${DebitoAutomaticoComponent.prototype.sendBackOffice.name}
	// deve chamar #${DebitoAutomaticoComponent.prototype.sendAnexoTarifa.name}
	// quando `, (done) => {
	// 	fixture.detectChanges();

	// 	spyOn(component['_ligacaoNovaService'], 'sendBackOffice').and.returnValue(Promise.resolve('202261389312319'));

	// 	spyOn(component['_userServiceLN'], 'getProtocolo').and.returnValue(Promise.resolve('1231231'));
	// 	let sendAnexoSpy = spyOn(component, 'sendAnexoTarifa');


	// 	component.sendBackOffice(listaAnexosMockados, '');

	// 	setTimeout(() => {
	// 		expect(sendAnexoSpy).toHaveBeenCalled();
	// 		done();
	// 	});

	// });








	// it(`#${DebitoAutomaticoComponent.prototype.sendAnexoTarifa.name}
	// deve chamar #sendAnexos quando chamado`, () => {

	// });

});
