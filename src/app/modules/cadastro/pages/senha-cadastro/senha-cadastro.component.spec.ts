import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenhaCadastroComponent } from './senha-cadastro.component';

describe('SenhaCadastroComponent', () => {
  let component: SenhaCadastroComponent;
  let fixture: ComponentFixture<SenhaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenhaCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenhaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
