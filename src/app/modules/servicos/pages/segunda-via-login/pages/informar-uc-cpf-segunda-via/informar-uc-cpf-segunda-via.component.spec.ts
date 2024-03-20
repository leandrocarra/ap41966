import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformarUcCpfSegundaViaComponent } from './informar-uc-cpf-segunda-via.component';

describe('InformarUcCpfSegundaViaComponent', () => {
  let component: InformarUcCpfSegundaViaComponent;
  let fixture: ComponentFixture<InformarUcCpfSegundaViaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformarUcCpfSegundaViaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformarUcCpfSegundaViaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
