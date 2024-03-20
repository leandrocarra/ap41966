import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformarCodigoEnviadoComponent } from './informar-codigo-enviado.component';

describe('InformarCodigoEnviadoComponent', () => {
  let component: InformarCodigoEnviadoComponent;
  let fixture: ComponentFixture<InformarCodigoEnviadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformarCodigoEnviadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformarCodigoEnviadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
