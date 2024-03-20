import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosPessoaJuridicaRepresentanteContatoComponent } from './dados-pessoa-juridica-representante-contato.component';

describe('DadosPessoaJuridicaRepresentanteContatoComponent', () => {
  let component: DadosPessoaJuridicaRepresentanteContatoComponent;
  let fixture: ComponentFixture<DadosPessoaJuridicaRepresentanteContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosPessoaJuridicaRepresentanteContatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosPessoaJuridicaRepresentanteContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
