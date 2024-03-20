import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuaContaComponent } from './sua-conta.component';

describe(SuaContaComponent.name, () => {
  let component: SuaContaComponent;
  let fixture: ComponentFixture<SuaContaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuaContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuaContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
