import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegendaComposicaoFaturaComponent } from './legenda-composicao-fatura.component';

describe(LegendaComposicaoFaturaComponent.name, () => {
  let component: LegendaComposicaoFaturaComponent;
  let fixture: ComponentFixture<LegendaComposicaoFaturaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendaComposicaoFaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendaComposicaoFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
