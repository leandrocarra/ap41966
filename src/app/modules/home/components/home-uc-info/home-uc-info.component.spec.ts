import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUcInfoComponent } from './home-uc-info.component';

describe('HomeUcInfoComponent', () => {
  let component: HomeUcInfoComponent;
  let fixture: ComponentFixture<HomeUcInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeUcInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeUcInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
