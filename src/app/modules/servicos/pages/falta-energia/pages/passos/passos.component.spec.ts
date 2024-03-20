import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasFaltaDeEnergia } from 'app/core/models/falta-de-energia/sub-rotas-falta-de-energia';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';
import { PassosComponent } from './passos.component';


describe(PassosComponent.name, () => {
  let component: PassosComponent;
  let fixture: ComponentFixture<PassosComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PassosComponent ],
      providers:[
        UserService,
        TokenService
      ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(PassosComponent);
    component = fixture.componentInstance;
  });

  it(`#${PassosComponent.name} 
  deve criar o componente quando iniciado o ciclo de vida do Angular para grupo B`, () => {
    component['_user'].group = 'B';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${PassosComponent.name} 
  deve criar o componente quando iniciado o ciclo de vida do Angular para grupo A`, () => {
    component['_user'].group = 'A';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${PassosComponent.prototype.onResize.name}
  deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
    component['_user'].group = 'A';
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });


  it(`#${PassosComponent.prototype.voltar.name}
  deve navegar de volta para a página anterior.`, () => {
    component['_user'].group = 'A';
    fixture.detectChanges();
    let locationSpy = spyOn(component['_location'], 'back');
    component.voltar();
    expect(locationSpy).toHaveBeenCalled();
  });


  it(`#${PassosComponent.prototype.continuar.name}
  deve direcionar para tela anterior`, () => {
    component['_user'].group = 'A';
    let routerSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    component.continuar();
    expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.VerificarDisjuntor]);
    fixture.detectChanges();
  })

  // it(`#${PassosComponent.prototype.voltar.name}
  // deve direcionar para tela anterior`, () => {
  //   let routerSpy = spyOn(router, 'navigate');
  //   fixture.detectChanges();
  //   component.voltar();
  //   expect(routerSpy).toHaveBeenCalledOnceWith(["servicos", "falta-de-energia"], component.navExtra);
  //   fixture.detectChanges();
  // })

});
