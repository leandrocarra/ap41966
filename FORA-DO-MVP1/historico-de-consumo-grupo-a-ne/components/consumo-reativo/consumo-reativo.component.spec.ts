import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsumoReativoComponent } from './consumo-reativo.component';

describe('ConsumoReativoComponent', () => {
  let component: ConsumoReativoComponent;
  let fixture: ComponentFixture<ConsumoReativoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumoReativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumoReativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
