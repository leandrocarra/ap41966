import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaDebitoAutomaticoComponent } from './tabela-debito-automatico.component';

describe('TabelaDebitoAutomaticoComponent', () => {
  let component: TabelaDebitoAutomaticoComponent;
  let fixture: ComponentFixture<TabelaDebitoAutomaticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaDebitoAutomaticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaDebitoAutomaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
