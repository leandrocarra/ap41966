import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiloginSelecaoPerfisComponent } from './multilogin-selecao-perfis.component';

describe('MultiloginSelecaoPerfisComponent', () => {
  let component: MultiloginSelecaoPerfisComponent;
  let fixture: ComponentFixture<MultiloginSelecaoPerfisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiloginSelecaoPerfisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiloginSelecaoPerfisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
