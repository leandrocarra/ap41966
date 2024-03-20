import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccordionGrupoFaturaComponent } from './accordion-grupo-fatura.component';

describe('AccordionGrupoFaturaComponent', () => {
  let component: AccordionGrupoFaturaComponent;
  let fixture: ComponentFixture<AccordionGrupoFaturaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionGrupoFaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionGrupoFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
