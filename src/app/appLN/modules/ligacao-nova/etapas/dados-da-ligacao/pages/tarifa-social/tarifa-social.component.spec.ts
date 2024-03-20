import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifaSocialComponent } from './tarifa-social.component';

describe('TarifaSocialComponent', () => {
  let component: TarifaSocialComponent;
  let fixture: ComponentFixture<TarifaSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifaSocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifaSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
