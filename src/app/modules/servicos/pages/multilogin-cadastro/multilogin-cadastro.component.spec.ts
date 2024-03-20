import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiloginCadastroComponent } from './multilogin-cadastro.component';

describe('MultiloginCadastroComponent', () => {
  let component: MultiloginCadastroComponent;
  let fixture: ComponentFixture<MultiloginCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiloginCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiloginCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
