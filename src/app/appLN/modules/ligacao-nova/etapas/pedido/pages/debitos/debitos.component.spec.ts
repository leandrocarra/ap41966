import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebitosComponent } from './debitos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatRadioModule } from '@angular/material/radio';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe(DebitosComponent.name, () => {
  let component: DebitosComponent;
  let fixture: ComponentFixture<DebitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebitosComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatRadioModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DebitosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
