import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiloginCadastrarParceirosComponent } from './multilogin-cadastrar-parceiros.component';

describe('MultiloginCadastrarParceirosComponent', () => {
  let component: MultiloginCadastrarParceirosComponent;
  let fixture: ComponentFixture<MultiloginCadastrarParceirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiloginCadastrarParceirosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiloginCadastrarParceirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
