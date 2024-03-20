import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PendenciasUcComponent } from './pendencias-uc.component';

describe('PendenciasUcComponent', () => {
  let component: PendenciasUcComponent;
  let fixture: ComponentFixture<PendenciasUcComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PendenciasUcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendenciasUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
