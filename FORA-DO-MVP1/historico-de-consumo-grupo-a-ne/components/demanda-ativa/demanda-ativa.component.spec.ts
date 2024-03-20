import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemandaAtivaComponent } from './demanda-ativa.component';

describe('DemandaAtivaComponent', () => {
  let component: DemandaAtivaComponent;
  let fixture: ComponentFixture<DemandaAtivaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandaAtivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaAtivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
