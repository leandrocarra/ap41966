import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentificacaoDadosCadastroComponent } from './identificacao-dados-cadastro.component';


describe('IdentificacaoDadosCadastroComponent', () => {
  let component: IdentificacaoDadosCadastroComponent;
  let fixture: ComponentFixture<IdentificacaoDadosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificacaoDadosCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificacaoDadosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
