import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoParticularComponent } from './projeto-particular.component';

describe('ProjetoParticularComponent', () => {
  let component: ProjetoParticularComponent;
  let fixture: ComponentFixture<ProjetoParticularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoParticularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoParticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
