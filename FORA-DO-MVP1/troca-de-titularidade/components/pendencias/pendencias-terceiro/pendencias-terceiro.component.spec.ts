import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PendenciasTerceiroComponent } from './pendencias-terceiro.component';

describe('PendenciasTerceiroComponent', () => {
  let component: PendenciasTerceiroComponent;
  let fixture: ComponentFixture<PendenciasTerceiroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PendenciasTerceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendenciasTerceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
