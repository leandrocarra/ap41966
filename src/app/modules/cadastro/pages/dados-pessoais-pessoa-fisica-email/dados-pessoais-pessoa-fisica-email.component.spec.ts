import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DadosPessoaisPessoaFisicaEmailComponent } from './dados-pessoais-pessoa-fisica-email.component';


describe('DadosPessoaisPessoaFisicaEmailComponent', () => {
  let component: DadosPessoaisPessoaFisicaEmailComponent;
  let fixture: ComponentFixture<DadosPessoaisPessoaFisicaEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosPessoaisPessoaFisicaEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosPessoaisPessoaFisicaEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
