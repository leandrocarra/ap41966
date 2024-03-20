import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DadosPagamentoService } from '../../../../../../core/services/dados-pagamento/dados-pagamento.service';
import { RecebimentoCaixaPostalComponent } from './recebimento-caixa-postal.component';

describe(RecebimentoCaixaPostalComponent.name, () => {
  let component: RecebimentoCaixaPostalComponent;
  let fixture: ComponentFixture<RecebimentoCaixaPostalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecebimentoCaixaPostalComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatOptionModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(RecebimentoCaixaPostalComponent);
    component = fixture.componentInstance;
  });

  it('should create instance', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${RecebimentoCaixaPostalComponent.prototype.onResize.name}
  deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${RecebimentoCaixaPostalComponent.prototype.validaFormulario.name}
  deve emitir dados de acordo com o status do formulário válido`, () => {
    fixture.detectChanges();
    component.formaRecebimentoFormGroup.patchValue({
      caixaPostal: "11608454",
      cidade: "campinas",
      estado: "SP",
      cep: "11608454"
    })
    spyOn(component.enviarDados, 'emit');
    component.validaFormulario();
    expect(component.enviarDados.emit).toHaveBeenCalled();
  });

  it(`#${RecebimentoCaixaPostalComponent.prototype.atualizarDados.name}
  deve atualizar dados quando solicitado`, () => {
    fixture.detectChanges();
    component.formaRecebimentoFormGroup.patchValue({
      caixaPostal: "11608454",
      cidade: "campinas",
      estado: "SP",
      cep: "11608454"
    })
    component.atualizarDados();
    expect(component.dadosPagamento.receberCaixaPostal.cep).toEqual(component.formaRecebimentoFormGroup.value.cep);
  });

  it(`#${RecebimentoCaixaPostalComponent.prototype.formToModel.name}
  deve atualizar dados e validar formulario`, () => {
    fixture.detectChanges();
    let atualizarDadosSpy = spyOn(component, 'atualizarDados');
    let validaFormularioSpy = spyOn(component, 'validaFormulario');
    component.formToModel();
    expect(atualizarDadosSpy).toHaveBeenCalled();
    expect(validaFormularioSpy).toHaveBeenCalled();
  });

});


