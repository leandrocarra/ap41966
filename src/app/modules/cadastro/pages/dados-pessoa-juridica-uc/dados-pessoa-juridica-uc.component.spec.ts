import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosPessoaJuridicaUcComponent } from './dados-pessoa-juridica-uc.component';

describe('DadosPessoaJuridicaUcComponent', () => {
  let component: DadosPessoaJuridicaUcComponent;
  let fixture: ComponentFixture<DadosPessoaJuridicaUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosPessoaJuridicaUcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosPessoaJuridicaUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
