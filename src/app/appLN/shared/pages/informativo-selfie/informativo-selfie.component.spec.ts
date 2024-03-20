import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InformativoSelfieComponent } from './informativo-selfie.component';


describe(InformativoSelfieComponent.name, () => {
  let component: InformativoSelfieComponent;
  let fixture: ComponentFixture<InformativoSelfieComponent>;
  let location: Location;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformativoSelfieComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatListModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
      .compileComponents();
    fixture = TestBed.createComponent(InformativoSelfieComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location)
    router = TestBed.inject(Router)
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${InformativoSelfieComponent.prototype.onResize.name}
  deve ser atribuir verdadeiro para variável mobile quando resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });


  it(`#${InformativoSelfieComponent.prototype.voltar.name}
  Deve voltar a tela quando chamado`, fakeAsync(() => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  }));

  it(`#${InformativoSelfieComponent.prototype.tirarSelfie.name}
  deve redirecionar para tirar-selfie quando chamado`, () => {
    fixture.detectChanges();
    let routerSpy = spyOn(router, 'navigate');
    component.tirarSelfie();
    expect(routerSpy).toHaveBeenCalledOnceWith(['/ligacao-nova/documentos/tirar-selfie']);
  });
});
