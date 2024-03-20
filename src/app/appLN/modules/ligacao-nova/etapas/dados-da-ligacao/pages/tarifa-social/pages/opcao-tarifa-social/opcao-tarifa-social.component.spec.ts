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

import { OpcaoTarifaSocialComponent } from './opcao-tarifa-social.component';

describe(OpcaoTarifaSocialComponent.name, () => {
	let component: OpcaoTarifaSocialComponent;
	let fixture: ComponentFixture<OpcaoTarifaSocialComponent>;
	let router: Router;
	let location: Location;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [OpcaoTarifaSocialComponent],
			imports: [
				RouterTestingModule.withRoutes([]),
				ReactiveFormsModule,
				FormsModule,
				MatInputModule,
				MatFormFieldModule,
				MatRadioModule,
				HttpClientTestingModule
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(OpcaoTarifaSocialComponent);
		component = fixture.componentInstance;
		router = TestBed.inject(Router);
		location = TestBed.inject(Location);
		fixture.detectChanges();
	});

	it('should create instance', () => {
		expect(component).toBeTruthy();
	});


	it('deve voltar utilizando location', () => {
		component.voltar();
		expect(location.back()).toBe();
	});




	// it('deve contianuar para documentos-tarifa-social', () => {
	// 	let spy = spyOn(router, 'navigate');
	// 	component.continuar();
	// 	expect(spy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "documentos-tarifa-social"]);
	// });

	it(`#${OpcaoTarifaSocialComponent.prototype.continuar.name}
		deve continuar para documentos-tarifa-social`, () => {
			fixture.detectChanges();
			const routerSpy = spyOn(router, 'navigate');
			component.continuar();
			expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "tarifa-social", "dados-tarifa"]);
  	});


});
