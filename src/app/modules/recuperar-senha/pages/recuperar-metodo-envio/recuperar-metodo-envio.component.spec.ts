import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarMetodoEnvioComponent } from './recuperar-metodo-envio.component';

describe('RecuperarMetodoEnvioComponent', () => {
  let component: RecuperarMetodoEnvioComponent;
  let fixture: ComponentFixture<RecuperarMetodoEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarMetodoEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarMetodoEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
