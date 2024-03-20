import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosPessoaJuridicaEmpresaComponent } from './dados-pessoa-juridica-empresa.component';

describe('DadosPessoaJuridicaEmpresaComponent', () => {
  let component: DadosPessoaJuridicaEmpresaComponent;
  let fixture: ComponentFixture<DadosPessoaJuridicaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosPessoaJuridicaEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosPessoaJuridicaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
