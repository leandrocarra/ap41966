import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiloginSelecionarClienteComponent } from './multilogin-selecionar-cliente.component';


describe('SelecionarClienteComponent', () => {
  let component: MultiloginSelecionarClienteComponent;
  let fixture: ComponentFixture<MultiloginSelecionarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiloginSelecionarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiloginSelecionarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
