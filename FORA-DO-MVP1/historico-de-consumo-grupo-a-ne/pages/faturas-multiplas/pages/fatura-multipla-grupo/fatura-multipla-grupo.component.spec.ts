import { FaturaMultiplaGrupoComponent } from './fatura-multipla-grupo.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('FaturaMultiplaGrupoComponent', () => {
  let component: FaturaMultiplaGrupoComponent;
  let fixture: ComponentFixture<FaturaMultiplaGrupoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaturaMultiplaGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaturaMultiplaGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
