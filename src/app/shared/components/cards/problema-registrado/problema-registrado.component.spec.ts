import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProblemaRegistradoComponent } from './problema-registrado.component';

describe(ProblemaRegistradoComponent.name, () => {
  let component: ProblemaRegistradoComponent;
  let fixture: ComponentFixture<ProblemaRegistradoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemaRegistradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemaRegistradoComponent);
    component = fixture.componentInstance;
  });

  it(`#${ProblemaRegistradoComponent.name} 
  deve iniciar o ciclo de vida do angular`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${ProblemaRegistradoComponent.prototype.ngOnInit.name}
  deve exibir o grupo de cores para grupo A, quando acionado`, () => {
    component.user.group = 'A';
    fixture.detectChanges();
    expect(component.groupColor).toBe('color-group-a');
  });

  it(`#${ProblemaRegistradoComponent.prototype.ngOnInit.name}
  deve exibir o grupo de cores para grupo A, quando acionado`, () => {
    component.user.group = 'B';
    fixture.detectChanges();
    expect(component.groupColor).toBe('color-group-b');
  });
});
