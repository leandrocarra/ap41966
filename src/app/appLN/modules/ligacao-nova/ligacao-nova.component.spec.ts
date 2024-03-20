import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LigacaoNovaComponent } from './ligacao-nova.component';

describe(LigacaoNovaComponent.name, () => {
  let component: LigacaoNovaComponent;
  let fixture: ComponentFixture<LigacaoNovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigacaoNovaComponent ],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigacaoNovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
