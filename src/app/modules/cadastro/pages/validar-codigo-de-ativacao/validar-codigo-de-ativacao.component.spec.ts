import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarCodigoDeAtivacaoComponent } from './validar-codigo-de-ativacao.component';

describe('ValidarCodigoDeAtivacaoComponent', () => {
  let component: ValidarCodigoDeAtivacaoComponent;
  let fixture: ComponentFixture<ValidarCodigoDeAtivacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarCodigoDeAtivacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarCodigoDeAtivacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
