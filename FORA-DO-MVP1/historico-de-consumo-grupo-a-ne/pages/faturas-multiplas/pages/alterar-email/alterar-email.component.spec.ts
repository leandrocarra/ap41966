import { AlterarEmailComponent } from './alterar-email.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('AlterarEmailComponent', () => {
  let component: AlterarEmailComponent;
  let fixture: ComponentFixture<AlterarEmailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
