import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MultiCadastradasComponent } from './multi-cadastradas.component';

describe('MultiCadastradasComponent', () => {
  let component: MultiCadastradasComponent;
  let fixture: ComponentFixture<MultiCadastradasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiCadastradasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCadastradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
