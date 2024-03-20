import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InformarTipoRuralComponent } from './informar-tipo-rural.component';

describe(InformarTipoRuralComponent.name, () => {
	let component: InformarTipoRuralComponent;
	let fixture: ComponentFixture<InformarTipoRuralComponent>;
	let router: Router;
	let location: Location;

	let subPerfil =
	{
		label: 'AGROPECUÁRIA RURAL',
		route: 'agropecuaria-rural',
		textoTooltip: 'Localizada na área rural, onde seja desenvolvida atividade relativa à agropecuária.',
		disabled: false
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InformarTipoRuralComponent],
			imports: [
				RouterTestingModule.withRoutes([]),
				HttpClientTestingModule,
				ReactiveFormsModule,
				FormsModule,
				MatInputModule,
				MatFormFieldModule,
				MatRadioModule
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		})

			.compileComponents();
		fixture = TestBed.createComponent(InformarTipoRuralComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		router = TestBed.inject(Router);
		location = TestBed.inject(Location);
	});


	it(`#${InformarTipoRuralComponent.prototype.onResize.name}
	deve ser chamado quando emitir resize da tela for menor que 768`, () => {
		fixture.detectChanges();
		spyOnProperty(window, 'innerWidth').and.returnValue(760);
		window.dispatchEvent(new Event('resize'));
		expect(component.mobile).toBeTrue();
	});


	it(`#${InformarTipoRuralComponent.prototype.continuar.name}
	deve redirecionar para tela que informar os documentos necessário`, () => {
		let spy = spyOn(router, 'navigate');
		component.formTipoRural.controls.tipoRural.setValue(subPerfil);
		spyOnProperty(component['_ligacaoNovaService'], 'setSubPerfilEscolhido', 'set').and.returnValue(subPerfil);
		fixture.detectChanges();
		component.continuar();
		expect(spy).toHaveBeenCalledWith(['ligacao-nova', 'pedido', 'documentos-necessarios']);
	})


	it(`#${InformarTipoRuralComponent.prototype.voltar.name}
	deve voltar pagina quando chamado`, () => {
		fixture.detectChanges();
		component.voltar();
		expect(location.back()).toBe();
	});


	it(`${InformarTipoRuralComponent.prototype.preencheTiposLeftArray.name}
	deve criar retornar disable false em residencial rural quando for CPF`, () => {
		let valorEsperado = {
			label: 'RESIDENCIAL RURAL',
			route: 'residencial-rural',
			textoTooltip: 'Residência localizada na área rural, com fim residencial, utilizada por trabalhador rural ou aposentado nesta condição.',
			disabled: false
		}
		fixture.detectChanges();
		spyOnProperty(component['_userService'], 'tipoDocumento').and.returnValue('CPF');
		let arrayCPF = component.preencheTiposLeftArray();

		expect(arrayCPF[0]).toEqual(valorEsperado);
	});

	it(`${InformarTipoRuralComponent.prototype.preencheTiposLeftArray.name}
	deve criar retornar disable true em residencial rural quando for CNPJ`, () => {
		let valorEsperado = {
			label: 'RESIDENCIAL RURAL',
			route: 'residencial-rural',
			textoTooltip: 'Residência localizada na área rural, com fim residencial, utilizada por trabalhador rural ou aposentado nesta condição.',
			disabled: true
		}

		fixture.detectChanges();
		spyOnProperty(component['_userService'], 'tipoDocumento').and.returnValue('CNPJ');
		let arrayCPF = component.preencheTiposLeftArray();

		expect(arrayCPF[0]).toEqual(valorEsperado);
	});



	it(`${InformarTipoRuralComponent.prototype.preencheTiposRightArray.name}
	deve criar retornar disable true em AGROINDUSTRIAL quando for CPF`, () => {
		let valorEsperadoCPF = {
			label: 'AGROINDUSTRIAL',
			route: 'agroindustrial',
			textoTooltip: 'Indústrias de transformação ou beneficiamento de produtos advindos diretamente da agropecuária, mesmo que oriundos de outras propriedades, independentemente de sua localização, desde que a potência nominal total do transformador seja de até 112,5 KVA.',
			disabled: true
		};
		fixture.detectChanges();
		spyOnProperty(component['_userService'], 'tipoDocumento').and.returnValue('CPF');
		let arrayCPF = component.preencheTiposRightArray();

		expect(arrayCPF[0]).toEqual(valorEsperadoCPF);
	});

	it(`${InformarTipoRuralComponent.prototype.preencheTiposRightArray.name}
	deve criar retornar disable false em AGROINDUSTRIAL quando for CNPJ`, () => {
		let valorEsperadoCNPJ = {
			label: 'AGROINDUSTRIAL',
			route: 'agroindustrial',
			textoTooltip: 'Indústrias de transformação ou beneficiamento de produtos advindos diretamente da agropecuária, mesmo que oriundos de outras propriedades, independentemente de sua localização, desde que a potência nominal total do transformador seja de até 112,5 KVA.',
			disabled: false
		};

		fixture.detectChanges();
		spyOnProperty(component['_userService'], 'tipoDocumento').and.returnValue('CNPJ');
		let arrayCPF = component.preencheTiposRightArray();

		expect(arrayCPF[0]).toEqual(valorEsperadoCNPJ);
	});



	it(`#${InformarTipoRuralComponent.prototype.ngOnInit.name}
	Deve setar formulário, quando o subPerfil estiver selecionado `, () => {

		let subPerfilEscolhido = {
			label: 'AGROPECUÁRIA RURAL',
			route: 'agropecuaria-rural',
			textoTooltip: 'teste',
			disabled: false,
		};

		spyOnProperty(component['_ligacaoNovaService'], 'getSubPerfilEscolhido', 'get').and.returnValue(subPerfilEscolhido)
		fixture.detectChanges();
		component.ngOnInit();
		expect(component['_ligacaoNovaService'].getSubPerfilEscolhido.label).toEqual(component.formTipoRural.value.tipoRural);
	});



});
