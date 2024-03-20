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
import { DadosDoImovelService } from '../../../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { DistanciaImovelComponent } from './distancia-imovel.component';

describe(DistanciaImovelComponent.name, () => {
	let component: DistanciaImovelComponent;
	let fixture: ComponentFixture<DistanciaImovelComponent>;
	let location: Location;
	let router: Router;
	let imovelService: jasmine.SpyObj<DadosDoImovelService>;
	let enderecoMockado = require('src/app/appLN/shared/mock/responses/response-dados-do-imovel.json');


	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DistanciaImovelComponent],
			imports: [
				RouterTestingModule.withRoutes([]),
				ReactiveFormsModule,
				FormsModule,
				MatInputModule,
				MatFormFieldModule,
				MatRadioModule,
				HttpClientTestingModule
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],

		})
			.compileComponents();
		fixture = TestBed.createComponent(DistanciaImovelComponent);
		component = fixture.componentInstance;
		location = TestBed.inject(Location);
		router = TestBed.inject(Router);
	});

	it(`Deve criar component, quando chamado #detectChange`, () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it(`Deve criar component, quando chamado #detectChange`, () => {
		fixture.detectChanges();
		component.zonaRural = true;
		component.createForm();
		expect(component).toBeTruthy();
	});

	it(`#${DistanciaImovelComponent.prototype.voltar.name}
  deve voltar pagina location quando chamado`, () => {
		component.setTelaPoste("BIFÁSICA");
		fixture.detectChanges();
		component.voltar();
		expect(location.back()).toBe();
	});

	it(`#${DistanciaImovelComponent.prototype.continuar.name}
  deve redirecionar para questionario-zona-rural`, () => {
		component.zonaRural = true;
		component.formPoste.controls.distanciaPoste.setValue('sim');
		fixture.detectChanges();
		const routerSpy = spyOn(router, 'navigate');
		component.continuar();
		expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "questionario-zona-rural"]);
	});



	it(`#${DistanciaImovelComponent.prototype.continuar.name}
  deve chamar alerta de poste e redirecionar para opcão tarifária, quando zona rural for falso e distancia de poste for não `, (done) => {
		component.zonaRural = false;
		fixture.detectChanges();
		component.formPoste.controls.distanciaPoste.setValue('nao');

		let routerSpy = spyOn(router, 'navigate');

		spyOn(component['_alert'], 'alertDeclaracaoPoste').and.returnValue(Promise.resolve<any>({
			"value": true
		}));

		component.continuar();

		setTimeout(() => {
			expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "opcao-tarifaria"]);
			done();
		})
	});




});
