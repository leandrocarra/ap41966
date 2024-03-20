import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiloginAcessoComponent } from './multilogin-acesso.component';

describe('MultiloginAcessoComponent', () => {
  let component: MultiloginAcessoComponent;
  let fixture: ComponentFixture<MultiloginAcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiloginAcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiloginAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
