import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RecebimentoAlternativoComponent } from './recebimento-alternativo.component';

describe(RecebimentoAlternativoComponent.name, () => {
	let component: RecebimentoAlternativoComponent;
	let fixture: ComponentFixture<RecebimentoAlternativoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RecebimentoAlternativoComponent],
			imports: [
				ReactiveFormsModule,
				FormsModule,
				MatInputModule,
				MatFormFieldModule,
				MatSelectModule,
				MatOptionModule,
				BrowserAnimationsModule,
				HttpClientTestingModule,
				RouterTestingModule
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

		})
			.compileComponents();
		fixture = TestBed.createComponent(RecebimentoAlternativoComponent);
		component = fixture.componentInstance;
	});

	it('should create instance', () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it(`#${RecebimentoAlternativoComponent.prototype.onResize.name}
	deve ser chamado quando emitir resize da tela
	for menor que 768`, () => {
		fixture.detectChanges();
		spyOnProperty(window, 'innerWidth').and.returnValue(760);
		window.dispatchEvent(new Event('resize'));
		expect(component.mobile).toBeTrue();
	});

	it(`#${RecebimentoAlternativoComponent.prototype.validaFormulario.name}
	deve emitir dados de acordo com o status do formulário válido`, () => {
		fixture.detectChanges();
		component.formaRecebimentoFormGroup.patchValue({
			cep: "11608454",
			endereco: "avenida navegantes",
			numero: "222",
			complemento: "em frente farmacia",
			bairro: "centro",
			cidade: "campinas",
			estado: "SP"
		})
		spyOn(component.enviarDados, 'emit');
		component.formToModel();
		expect(component.enviarDados.emit).toHaveBeenCalled();
	});

	it(`#${RecebimentoAlternativoComponent.prototype.atualizarDados.name}
  deve atualizar dados quando soliticado`, () => {
		fixture.detectChanges();
		component.formaRecebimentoFormGroup.patchValue({
			cidade: "campinas",
			estado: "SP",
			endereco: "avenida getulio",
			numero: "100",
			complemento: "predio verde",
			bairro: "carneiro",
			cep: "11608454"
		})
		component.atualizarDados();
		expect(component.dadosPagamento.receberEnderecoAlternativo.endereco.endereco).toEqual(component.formaRecebimentoFormGroup.value.endereco);
	});


});
