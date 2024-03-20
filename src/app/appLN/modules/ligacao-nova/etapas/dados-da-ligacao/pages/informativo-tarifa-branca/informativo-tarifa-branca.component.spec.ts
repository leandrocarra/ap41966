import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { InformativoTarifaBrancaComponent } from './informativo-tarifa-branca.component';

describe(InformativoTarifaBrancaComponent.name, () => {
  let component: InformativoTarifaBrancaComponent;
  let fixture: ComponentFixture<InformativoTarifaBrancaComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformativoTarifaBrancaComponent],
      imports: [
        RouterTestingModule
      ],
    })
      .compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);


    //Mockando valor
    spyOn(router, "getCurrentNavigation").and.returnValue({
      "extras": {
        "state": {
          "tarifa": "social"
        }
      }
    } as any);

    //Criando componente e injetando
    fixture = TestBed.createComponent(InformativoTarifaBrancaComponent);
    component = fixture.componentInstance;



  });

  it('Deve criar o componente quando iniciado o ciclo de vida do Angular', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it(`#${InformativoTarifaBrancaComponent.prototype.voltar.name}
  deve voltar página quando chamado `, () => {
    //Criando componente e injetando
    fixture = TestBed.createComponent(InformativoTarifaBrancaComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });
});
