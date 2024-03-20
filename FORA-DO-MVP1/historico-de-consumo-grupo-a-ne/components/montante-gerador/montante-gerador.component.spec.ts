import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MontanteGeradorComponent } from './montante-gerador.component';

describe('MontanteGeradorComponent', () => {
  let component: MontanteGeradorComponent;
  let fixture: ComponentFixture<MontanteGeradorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MontanteGeradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontanteGeradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
