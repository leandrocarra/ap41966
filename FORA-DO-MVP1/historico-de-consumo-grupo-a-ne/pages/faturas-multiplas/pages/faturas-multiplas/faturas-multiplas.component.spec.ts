import { FaturasMultiplasComponent } from './faturas-multiplas.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('FaturasMultiplasComponent', () => {
  let component: FaturasMultiplasComponent;
  let fixture: ComponentFixture<FaturasMultiplasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaturasMultiplasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaturasMultiplasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
