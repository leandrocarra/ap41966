import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BaixarFaturaComponent } from './baixar-fatura.component';

describe('BaixarFaturaComponent', () => {
  let component: BaixarFaturaComponent;
  let fixture: ComponentFixture<BaixarFaturaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BaixarFaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaixarFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
