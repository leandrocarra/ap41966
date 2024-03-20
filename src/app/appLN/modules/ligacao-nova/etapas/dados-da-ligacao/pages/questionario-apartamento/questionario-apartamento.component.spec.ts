import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import Swal from 'sweetalert2';
import { QuestionarioApartamentoComponent } from './questionario-apartamento.component';


describe('QuestionarioApartamentoComponent', () => {
  let component: QuestionarioApartamentoComponent;
  let fixture: ComponentFixture<QuestionarioApartamentoComponent>;
  let location: Location;
  let router: Router;

  let perfilResidencial = {
    perfil: "RESIDENCIAL",
    textoPerfil: "Imóvel será utilizado apenas para fins residenciais.",
    imagem: "assets/assetsLN/images/Residencial.svg",
    alt: "Residencial",
    bloqueado: false,
    mensagemBloqueado: "",
  }

  let perfilComercial = {
    perfil: "COMERCIAL",
    textoPerfil: "Imóvel será utilizado para fins de atividades comerciais ou de prestação de serviços, à exceção dos serviços públicos.",
    imagem: "assets/assetsLN/images/comercial.svg",
    alt: "Comercial Bloqueado",
    bloqueado: false,
    mensagemBloqueado: "",
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionarioApartamentoComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MatRadioModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(QuestionarioApartamentoComponent);
    component = fixture.componentInstance;
  });

  
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${QuestionarioApartamentoComponent.prototype.voltar.name}
  deve voltar pagina Location quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`#${QuestionarioApartamentoComponent.prototype.continuar.name}
   deve redirecionar para distancia-imovel chamando alerta quando for perfil COMERCIAL`, (done) => {
    fixture.detectChanges();
    let navigateSpy = spyOn(router, 'navigate');
    component['_ligacaoNovaService'].setPerfilEscolhido = perfilComercial;
    component.continuar();
    Swal.clickCancel();
    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);
      done();
    });
  });

  it(`#${QuestionarioApartamentoComponent.prototype.continuar.name}
  deve chamar o continuar caso o perfil não seja COMERCIAL`, () => {
    fixture.detectChanges();
    let Spy = spyOn(router, 'navigate');
    component['_ligacaoNovaService'].setPerfilEscolhido = perfilResidencial;
    component.continuar();
    expect(Spy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);
  });

});
