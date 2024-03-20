import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosMaisUtilizadosComponent } from './servicos-mais-utilizados.component';

describe('ServicosMaisUtilizadosComponent', () => {
  let component: ServicosMaisUtilizadosComponent;
  let fixture: ComponentFixture<ServicosMaisUtilizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicosMaisUtilizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosMaisUtilizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
