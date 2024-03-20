import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MemoriaDeMassaComponent } from './memoria-de-massa.component';

describe('MemoriaDeMassaComponent', () => {
  let component: MemoriaDeMassaComponent;
  let fixture: ComponentFixture<MemoriaDeMassaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoriaDeMassaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoriaDeMassaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
