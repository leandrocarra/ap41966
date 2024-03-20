import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmacaoAcessoComponent } from './confirmacao-acesso.component';


describe(ConfirmacaoAcessoComponent.name, () => {
	let component: ConfirmacaoAcessoComponent;
	let fixture: ComponentFixture<ConfirmacaoAcessoComponent>;
	let router: Router;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ConfirmacaoAcessoComponent],
			imports: [
				HttpClientTestingModule,
				RouterTestingModule.withRoutes([]),
				ReactiveFormsModule
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfirmacaoAcessoComponent);
		component = fixture.componentInstance;
		router = TestBed.inject(Router);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('deve redirecionar pela funcao confirm', () => {
		let spy = spyOn(router, 'navigate');
		component.confirm();
		expect(spy).toHaveBeenCalledWith(['/area-do-cliente']);
	})
});
