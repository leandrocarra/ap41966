import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiloginCadastroImobiliarioComponent } from './multilogin-cadastro-imobiliario.component';

describe('MultiloginCadastroImobiliarioComponent', () => {
  let component: MultiloginCadastroImobiliarioComponent;
  let fixture: ComponentFixture<MultiloginCadastroImobiliarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiloginCadastroImobiliarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiloginCadastroImobiliarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
