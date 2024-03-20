import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ConclusaoComponent } from './conclusao.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DadosPagamentoService } from '../../../../core/services/dados-pagamento/dados-pagamento.service';

describe(ConclusaoComponent.name, () => {
  let component: ConclusaoComponent;
  let fixture: ComponentFixture<ConclusaoComponent>;
  let dadosPagamentoService: jasmine.SpyObj<DadosPagamentoService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConclusaoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    dadosPagamentoService = TestBed.inject(DadosPagamentoService) as jasmine.SpyObj<DadosPagamentoService>;
  });

  it('Deve criar o componente quando iniciado o ciclo de vida do Angular', () => {
    dadosPagamentoService.dadosPagamento.faturaDigital = "Sim";
    fixture = TestBed.createComponent(ConclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it(`#${ConclusaoComponent.prototype.onResize.name}
  deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture = TestBed.createComponent(ConclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${ConclusaoComponent.prototype.preencherPDF.name}
  deve chamar a função criarAnexo`, () => {
    fixture = TestBed.createComponent(ConclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let anexoSpy = spyOn(component['_gerarPDFService'], 'criaAnexoContrato')
    component.checkUE = true;
    component.preencherPDF();
    expect(anexoSpy).toHaveBeenCalled();
  });
});
