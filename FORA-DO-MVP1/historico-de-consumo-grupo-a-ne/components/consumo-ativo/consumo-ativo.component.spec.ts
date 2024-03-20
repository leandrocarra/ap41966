import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsumoAtivoComponent } from './consumo-ativo.component';

describe('ConsumoAtivoComponent', () => {
  let component: ConsumoAtivoComponent;
  let fixture: ComponentFixture<ConsumoAtivoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumoAtivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumoAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
