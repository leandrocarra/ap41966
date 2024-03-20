import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosPessoaJuridicaRepresentanteComponent } from './dados-pessoa-juridica-representante.component';

describe('DadosPessoaJuridicaRepresentanteComponent', () => {
  let component: DadosPessoaJuridicaRepresentanteComponent;
  let fixture: ComponentFixture<DadosPessoaJuridicaRepresentanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosPessoaJuridicaRepresentanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosPessoaJuridicaRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
