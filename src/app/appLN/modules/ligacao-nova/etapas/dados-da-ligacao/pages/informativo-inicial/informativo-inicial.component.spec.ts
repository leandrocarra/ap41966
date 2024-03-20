import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InformativoInicialComponent } from './informativo-inicial.component';


describe(InformativoInicialComponent.name, () => {
  let component: InformativoInicialComponent;
  let fixture: ComponentFixture<InformativoInicialComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformativoInicialComponent],
      imports: [RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
    fixture = TestBed.createComponent(InformativoInicialComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${InformativoInicialComponent.prototype.continuar.name}`, () => {
    fixture.detectChanges();
    const routerSpy = spyOn(router, 'navigate');
    component.continuar();
    expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "informativo-ligacao"]);
  });

  it(`#${InformativoInicialComponent.prototype.voltar.name}
  deve voltar de página quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });


  it(`#${InformativoInicialComponent.prototype.onResize.name}
  deve ser atribuir verdadeiro para variável mobile quando resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

});
