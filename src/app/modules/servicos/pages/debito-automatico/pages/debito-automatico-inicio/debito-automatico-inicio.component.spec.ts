import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitoAutomaticoInicioComponent } from './debito-automatico-inicio.component';

describe('DebitoAutomaticoInicioComponent', () => {
  let component: DebitoAutomaticoInicioComponent;
  let fixture: ComponentFixture<DebitoAutomaticoInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitoAutomaticoInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitoAutomaticoInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
