import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DadosPessoaisPessoaFisicaComponent } from './dados-pessoais-pessoa-fisica.component';


describe('DadosPessoaisPessoaFisicaComponent', () => {
  let component: DadosPessoaisPessoaFisicaComponent;
  let fixture: ComponentFixture<DadosPessoaisPessoaFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosPessoaisPessoaFisicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosPessoaisPessoaFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
