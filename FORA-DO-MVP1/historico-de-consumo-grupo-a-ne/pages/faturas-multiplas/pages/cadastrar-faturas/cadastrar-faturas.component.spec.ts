import { CadastrarFaturasComponent } from './cadastrar-faturas.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('CadastrarFaturasComponent', () => {
  let component: CadastrarFaturasComponent;
  let fixture: ComponentFixture<CadastrarFaturasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarFaturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarFaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
