import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexarComprovanteComponent } from './anexar-comprovante.component';

describe('AnexarComprovanteComponent', () => {
  let component: AnexarComprovanteComponent;
  let fixture: ComponentFixture<AnexarComprovanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnexarComprovanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnexarComprovanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
