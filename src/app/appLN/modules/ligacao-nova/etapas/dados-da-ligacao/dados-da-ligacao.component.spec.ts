import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosDaLigacaoComponent } from './dados-da-ligacao.component';

describe(DadosDaLigacaoComponent.name, () => {
  let component: DadosDaLigacaoComponent;
  let fixture: ComponentFixture<DadosDaLigacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DadosDaLigacaoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosDaLigacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
