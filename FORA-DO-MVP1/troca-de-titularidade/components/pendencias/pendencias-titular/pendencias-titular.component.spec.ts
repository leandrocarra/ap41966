import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PendenciasTitularComponent } from './pendencias-titular.component';

describe('PendenciasTitularComponent', () => {
  let component: PendenciasTitularComponent;
  let fixture: ComponentFixture<PendenciasTitularComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PendenciasTitularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendenciasTitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
