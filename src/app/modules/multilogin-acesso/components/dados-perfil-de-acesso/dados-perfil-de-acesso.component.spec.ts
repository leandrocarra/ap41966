import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosPerfilDeAcessoComponent } from './dados-perfil-de-acesso.component';

describe('DadosPerfilDeAcessoComponent', () => {
  let component: DadosPerfilDeAcessoComponent;
  let fixture: ComponentFixture<DadosPerfilDeAcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosPerfilDeAcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosPerfilDeAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
