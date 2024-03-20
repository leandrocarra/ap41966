import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentificacaoCadastroComponent } from './identificacao-cadastro.component';

describe('IdentificacaoCadastroComponent', () => {
  let component: IdentificacaoCadastroComponent;
  let fixture: ComponentFixture<IdentificacaoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificacaoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificacaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
