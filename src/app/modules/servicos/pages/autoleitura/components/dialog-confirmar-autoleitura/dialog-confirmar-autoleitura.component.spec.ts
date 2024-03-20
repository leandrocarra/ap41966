import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmarAutoleituraComponent } from './dialog-confirmar-autoleitura.component';

describe('DialogConfirmarAutoleituraComponent', () => {
  let component: DialogConfirmarAutoleituraComponent;
  let fixture: ComponentFixture<DialogConfirmarAutoleituraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmarAutoleituraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmarAutoleituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
