import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MontantePontaComponent } from './montante-ponta.component';

describe('MontantePontaComponent', () => {
  let component: MontantePontaComponent;
  let fixture: ComponentFixture<MontantePontaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MontantePontaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontantePontaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
