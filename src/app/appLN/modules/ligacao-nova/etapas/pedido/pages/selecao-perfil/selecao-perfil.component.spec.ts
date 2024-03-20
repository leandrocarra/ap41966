import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EscolhaPerfil } from '../../../../../../core/models/escolha-perfil/escolha-perfil';
import { TooltipModule } from '../../../../../../shared/components/tooltip/tooltip.module';
import { SelecaoPerfilComponent } from './selecao-perfil.component';


describe(SelecaoPerfilComponent.name, () => {
  let component: SelecaoPerfilComponent;
  let fixture: ComponentFixture<SelecaoPerfilComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelecaoPerfilComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TooltipModule
      ]
    })
      .compileComponents();
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SelecaoPerfilComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    component['_userService'].tipoDocumento = "CNPJ";
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${SelecaoPerfilComponent.prototype.onResize.name}
  deve ser atribuir verdadeiro para variável mobile quando resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${SelecaoPerfilComponent.prototype.alertBlocked.name}
  deve acionar o alert, quando chamado `, () => {
    fixture.detectChanges();
    let mensagemPerfilBloqueado: string = "Residencial Bloqueado"
    let spy = spyOn(component['_alert'], 'alertInfo');
    component.alertBlocked(mensagemPerfilBloqueado)
    expect(spy).toHaveBeenCalledOnceWith(mensagemPerfilBloqueado);
  });

  it(`#${SelecaoPerfilComponent.prototype.continuar.name}
  deve voltar pagina location quando chamado`, () => {
    fixture.detectChanges();
    const escolhaPerfil = new EscolhaPerfil();
    escolhaPerfil.perfil = 'BENEFÍCIO RURAL'
    let routerSpy = spyOn(router, 'navigate');
    component.continuar(escolhaPerfil);
    expect(routerSpy).toHaveBeenCalledOnceWith(['ligacao-nova', 'pedido', 'tipo-perfil-rural']);
  });

  it(`#${SelecaoPerfilComponent.prototype.continuar.name}
  deve direcionar para tela documentos necessários, quando acionado`, () => {
    fixture.detectChanges();
    const escolhaPerfil = new EscolhaPerfil();
    escolhaPerfil.perfil = 'RESIDENCIAL'
    let routerSpy = spyOn(router, 'navigate');
    component.continuar(escolhaPerfil);
    expect(routerSpy).toHaveBeenCalledOnceWith(['ligacao-nova', 'pedido', 'documentos-necessarios']);
  });

  it(`#${SelecaoPerfilComponent.prototype.voltar.name}
  deve voltar pagina location quando chamado`, () => {
    component['_userService'].tipoDocumento = "CPF";
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

});
