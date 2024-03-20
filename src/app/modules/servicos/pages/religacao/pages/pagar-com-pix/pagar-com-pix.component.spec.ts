import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarComPixComponent } from './pagar-com-pix.component';

describe('PagarComPixComponent', () => {
  let component: PagarComPixComponent;
  let fixture: ComponentFixture<PagarComPixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagarComPixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarComPixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
