import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiloginCadastroCredenciadoComponent } from './multilogin-cadastro-credenciado.component';

describe('MultiloginCadastroCredenciadoComponent', () => {
  let component: MultiloginCadastroCredenciadoComponent;
  let fixture: ComponentFixture<MultiloginCadastroCredenciadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiloginCadastroCredenciadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiloginCadastroCredenciadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
