import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IndicadoresContinuidadeComponent } from './indicadores-continuidade.component';

describe(IndicadoresContinuidadeComponent.name, () => {
  let component: IndicadoresContinuidadeComponent;
  let fixture: ComponentFixture<IndicadoresContinuidadeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadoresContinuidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresContinuidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
