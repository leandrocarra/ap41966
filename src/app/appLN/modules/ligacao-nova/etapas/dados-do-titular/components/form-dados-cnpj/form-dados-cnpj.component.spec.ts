import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMaskModule } from 'ngx-mask';
import { of } from 'rxjs';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { NeoSharedModule } from '../../../../../../shared/shared.module';
import { DadosDoTitularRoutingModule } from '../../dados-do-titular-routing.module';
import { DialogClassePrincipalService } from '../dialog-classe-principal/dialog-classe-principal-service/dialog-classe-principal.service';
import { FormDadosCnpjComponent } from './form-dados-cnpj.component';



describe(FormDadosCnpjComponent.name, () => {

	let component: FormDadosCnpjComponent;
	let fixture: ComponentFixture<FormDadosCnpjComponent>;

	let userService: jasmine.SpyObj<UserServiceLN>;
	let sessionUserCNPJMockado = require('src/app/appLN/shared/mock/responses/response-session-user-cnpj.json');
	let classeDataMockado = require("src/app/appLN/shared/mock/responses/response-api-classe-principal.json");

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				FormDadosCnpjComponent,
			],
			providers: [
				{ provide: MAT_DIALOG_DATA, useValue: {} },
				{ provide: MatDialogRef, useValue: {} },
				{ provide: DialogClassePrincipalService, useClass: DialogClassePrincipalService },

			],
			imports: [
				HttpClientTestingModule,
				RouterTestingModule,
				ReactiveFormsModule,
				FormsModule,
				MatInputModule,
				MatFormFieldModule,
				NeoSharedModule,
				NgxMaskModule.forRoot(),
				MatPaginatorModule,
				MatDialogModule,
				MatSelectModule,
				BrowserAnimationsModule,
				DadosDoTitularRoutingModule,
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		})
			.compileComponents();
		fixture = TestBed.createComponent(FormDadosCnpjComponent);
		component = fixture.componentInstance;
	});


	beforeEach(() => {
		userService = TestBed.inject(UserServiceLN) as jasmine.SpyObj<UserServiceLN>;
		userService.sessionUser = sessionUserCNPJMockado;
		userService.cnae = "7319-0/02";
	});

	it(`Deve instanciar ${FormDadosCnpjComponent.name} quando chamado`, () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});


	it(`#${FormDadosCnpjComponent.prototype.onResize.name}
	deve ser atribuir verdadeiro para variável mobile quando resize da tela
	for menor que 768`, () => {
		fixture.detectChanges();
		spyOnProperty(window, 'innerWidth').and.returnValue(768);
		window.dispatchEvent(new Event('resize'));
		expect(component.mobile).toBeTrue();
	});


	it(`#${FormDadosCnpjComponent.prototype.editarClassePrincipal.name} deve
	setar como false a variável #possuiClasse quando o serviço de classePrincipal retornar vazio`, () => {
		fixture.detectChanges();
		spyOn(component['_userServiceLN'], 'buscarClassePrincipal').and.returnValue(of([]))
		component.editarClassePrincipal();
		expect(component.possuiClasse).toBeFalse();
	});


	it(`#${FormDadosCnpjComponent.prototype.editarClassePrincipal.name} deve
	setar valor no formulario formDadosCNPJ quando classePrincipal igual a 1`, () => {
		fixture.detectChanges();
		spyOn(component['_userServiceLN'], 'buscarClassePrincipal').and.returnValue(of(classeDataMockado.UNICA))
		component.editarClassePrincipal();
		expect(component['_etapaService'].dadosCNPJ.codigoConsumo).toBe('5552');
	});

	it(`#${FormDadosCnpjComponent.prototype.editarClassePrincipal.name}
	deve retornar classe como array vazio`, (done) => {

		fixture.detectChanges();

		spyOn(component['_userServiceLN'], 'buscarClassePrincipal').and.returnValue(of(classeDataMockado.VARIAS_CLASSES));
		spyOn(component['_dialogClassePrincipalService'], 'classePrincipal').and.returnValue(of([]));

		component.editarClassePrincipal();

		setTimeout(() => {
			expect(component.possuiClasse).toBeFalse();
			done();
		});

	});


	it(`#${FormDadosCnpjComponent.prototype.editarClassePrincipal.name}
	deve retornar mais de uma classe, escolher uma e setar classePrincipal escolhida
	em formDadosCNPJ quando chamado`, (done) => {

		fixture.detectChanges();

		spyOn(component['_userServiceLN'], 'buscarClassePrincipal').and.returnValue(of(classeDataMockado.VARIAS_CLASSES));
		spyOn(component['_dialogClassePrincipalService'], 'classePrincipal').and.returnValue(of(classeDataMockado.UNICA[0]));

		component.editarClassePrincipal();

		setTimeout(() => {
			expect(component['_etapaService'].dadosCNPJ.codigoConsumo).toBe('5552');
			done();
		});

	});


	it(`#${FormDadosCnpjComponent.prototype.deParaDadosCNPJ.name}
	deve atribuir valores para dadosCNPJ quando chamado`, () => {
		fixture.detectChanges();
		component.formDadosCNPJ.patchValue({
			cnpj: '33991294000110',
			razaoSocial: 'aaaaa',
			atividadeFiscal: '1234',
			classePrincipal: '4321',
			inscricaoMunicipal: '11111',
			inscricaoEstadual: '22222'
		});

		component.deParaDadosCNPJ();

		expect(component['_etapaService'].dadosCNPJ.atividadeFiscal).toBe('1234');

	});


	it(`#${FormDadosCnpjComponent.prototype.validarForms.name}
	deve emitir true quando formulário for válido`, (done) => {
		fixture.detectChanges();
		component.formDadosCNPJ.patchValue({
			cnpj: '33991294000110',
			razaoSocial: 'aaaaa',
			atividadeFiscal: '1234',
			classePrincipal: '4321',
			inscricaoMunicipal: '11111',
			inscricaoEstadual: '22222'
		});

		let emitSpy = spyOn(component.formCNPJValidado, 'emit');
		component.validarForms();


		setTimeout(() => {
			expect(emitSpy).toHaveBeenCalledOnceWith(true);
			done();
		})

	});
});
