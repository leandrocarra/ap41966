import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProjetoParticularComponent } from './formulario-projeto-particular.component';

describe('FormularioProjetoParticularComponent', () => {
  let component: FormularioProjetoParticularComponent;
  let fixture: ComponentFixture<FormularioProjetoParticularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioProjetoParticularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioProjetoParticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
