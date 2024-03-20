import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarDadosCadastroComponent } from './recuperar-dados-cadastro.component';

describe('RecuperarDadosCadastroComponent', () => {
  let component: RecuperarDadosCadastroComponent;
  let fixture: ComponentFixture<RecuperarDadosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarDadosCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarDadosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
