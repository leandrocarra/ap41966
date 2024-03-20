import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MontanteComponent } from './montante.component';

describe('MontanteComponent', () => {
  let component: MontanteComponent;
  let fixture: ComponentFixture<MontanteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MontanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
