import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HistoricoConsumoANordesteComponent } from './historico-consumo-a-nordeste.component';

describe('HistoricoConsumoANordesteComponent', () => {
  let component: HistoricoConsumoANordesteComponent;
  let fixture: ComponentFixture<HistoricoConsumoANordesteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoConsumoANordesteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoConsumoANordesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
