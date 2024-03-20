import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAvisosComponent } from './home-avisos.component';

describe('HomeAvisosComponent', () => {
  let component: HomeAvisosComponent;
  let fixture: ComponentFixture<HomeAvisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAvisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
