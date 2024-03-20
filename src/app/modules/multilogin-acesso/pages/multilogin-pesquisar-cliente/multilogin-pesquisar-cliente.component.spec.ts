import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiloginPesquisarClienteComponent } from './multilogin-pesquisar-cliente.component';

describe('MultiloginPesquisarClienteComponent', () => {
  let component: MultiloginPesquisarClienteComponent;
  let fixture: ComponentFixture<MultiloginPesquisarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiloginPesquisarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiloginPesquisarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
