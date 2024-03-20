import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InformativoTarifaSocialComponent } from './informativo-tarifa-social.component';

describe(InformativoTarifaSocialComponent.name, () => {

  let component: InformativoTarifaSocialComponent;
  let fixture: ComponentFixture<InformativoTarifaSocialComponent>;
  let location: Location;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativoTarifaSocialComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(InformativoTarifaSocialComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
  });


  it(`#${InformativoTarifaSocialComponent.prototype.onResize.name}
  Deve-se criar a component, quando disparado detectChange`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  
  it(`#${InformativoTarifaSocialComponent.prototype.onResize.name}
  deve ser chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${InformativoTarifaSocialComponent.prototype.abrirURL.name} deve abrir o link, quando chamado`, () => {
    fixture.detectChanges();
    component.abrirURL('www.google.com.br');
    expect(component.abrirURL).toBeDefined();
  });

  // it(`#${InformativoTarifaSocialComponent.prototype.tarifasSociais.name}dever preencher variaveis quando chamado`, () => {
  //   expect(component.PreencheTarifasSociais).toBeDefined();
  // });

  it(`#${InformativoTarifaSocialComponent.prototype.fechar.name}
  deve fechar pagina quando chamado`, () => {
    fixture.detectChanges();
    component.fechar();
    expect(location.back()).toBe();
  });

});
