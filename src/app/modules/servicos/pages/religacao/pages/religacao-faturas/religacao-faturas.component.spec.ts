import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligacaoFaturasComponent } from './religacao-faturas.component';

describe('ReligacaoFaturasComponent', () => {
  let component: ReligacaoFaturasComponent;
  let fixture: ComponentFixture<ReligacaoFaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReligacaoFaturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligacaoFaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
