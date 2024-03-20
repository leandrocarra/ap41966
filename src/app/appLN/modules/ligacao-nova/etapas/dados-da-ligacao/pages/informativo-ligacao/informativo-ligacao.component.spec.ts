import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DadosDoImovel } from '../../../../../../core/models/dados-do-imovel/endereco';
import { InformativoLigacaoComponent } from './informativo-ligacao.component';


describe('InformativoLigacaoComponent', () => {
  let component: InformativoLigacaoComponent;
  let fixture: ComponentFixture<InformativoLigacaoComponent>;
  let router: Router;
  let location: Location;

  //Mocks
  let perfilMockado = require('src/app/appLN/shared/mock/preenchimentos/selecao-perfil.json');
  let enderecoMockado = require('src/app/appLN/shared/mock/responses/response-dados-do-imovel.json');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformativoLigacaoComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(InformativoLigacaoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it(`Deve criar o componente ${InformativoLigacaoComponent.name}
   quando iniciado o ciclo de vida do Angular`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${InformativoLigacaoComponent.prototype.voltar.name}
  deve voltar página quando chamado `, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });


  it(`#${InformativoLigacaoComponent.prototype.continuar.name}
  deve redirecionar para questionario-apartamento quando for apartamento e não for industrial`, () => {
    fixture.detectChanges();

    //Mocks
    let dadosImovelMockado = new DadosDoImovel()
    dadosImovelMockado.endereco = enderecoMockado.URBANO_APT;
    component['_dadosDoImovelService'].setDadosDoImovel = dadosImovelMockado;
    component['_ligacaoNovaService'].setPerfilEscolhido = perfilMockado.RESIDENCIAL;


    let routeSpy = spyOn(router, 'navigate');
    component.continuar();

    expect(routeSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "questionario-apartamento"]);
  });

  it(`#${InformativoLigacaoComponent.prototype.continuar.name}
  deve redirecionar para dimensionamento-de-rede quando não for apartamento ou for perfil industrial`, () => {
    const routerSpy = spyOn(router, 'navigate');
    component['_ligacaoNovaService'].setPerfilEscolhido = perfilMockado.INDUSTRIAL;
    fixture.detectChanges();
    component.continuar();
    expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "dimensionamento-de-rede"]);
  });
});
