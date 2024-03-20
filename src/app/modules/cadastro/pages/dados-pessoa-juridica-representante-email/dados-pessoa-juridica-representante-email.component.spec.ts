import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosPessoaJuridicaRepresentanteEmailComponent } from './dados-pessoa-juridica-representante-email.component';

describe('DadosPessoaJuridicaRepresentanteEmailComponent', () => {
  let component: DadosPessoaJuridicaRepresentanteEmailComponent;
  let fixture: ComponentFixture<DadosPessoaJuridicaRepresentanteEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosPessoaJuridicaRepresentanteEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosPessoaJuridicaRepresentanteEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
