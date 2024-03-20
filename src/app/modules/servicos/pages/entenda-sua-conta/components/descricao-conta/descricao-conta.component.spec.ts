import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DescricaoContaComponent } from './descricao-conta.component';

describe(DescricaoContaComponent.name, () => {
  let component: DescricaoContaComponent;
  let fixture: ComponentFixture<DescricaoContaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DescricaoContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
