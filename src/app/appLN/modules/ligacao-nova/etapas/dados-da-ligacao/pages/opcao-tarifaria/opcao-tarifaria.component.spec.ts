import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import Swal from 'sweetalert2';
import { OpcaoTarifariaComponent } from './opcao-tarifaria.component';


describe(OpcaoTarifariaComponent.name, () => {
  let component: OpcaoTarifariaComponent;
  let fixture: ComponentFixture<OpcaoTarifariaComponent>;;
  let router: Router;
  let location: Location;

  let documento = 'CPF';

  let infosPerfis = [
    {
      perfil: "RESIDENCIAL",
      textoPerfil: "Imóvel será utilizado apenas para fins residenciais.",
      imagem: "assets/assetsLN/images/Residencial.svg",
      alt: "Residencial",
      bloqueado: documento === 'CPF' ? false : true,
      mensagemBloqueado: documento === 'CPF' ? '' : "Para fazer esta solicitação, você deve fazer o login utilizando um CPF ativo com situação regular na Receita Federal.",
    },
    {
      perfil: "BENEFÍCIO RURAL",
      textoPerfil: "Imóvel será utilizado para fins de atividades rurais ou para fins residenciais de trabalhadores ou aposentados rurais.",
      imagem: "assets/assetsLN/images/atividadesrurais.svg",
      alt: "Rural",
      bloqueado: false,
      mensagemBloqueado: '',
    },
    {
      perfil: "COMERCIAL",
      textoPerfil: "Imóvel será utilizado para fins de atividades comerciais ou de prestação de serviços, à exceção dos serviços públicos.",
      imagem: "assets/assetsLN/images/comercial.svg",
      alt: documento === 'CPF' ? "Comercial Bloqueado" : "Comercial",
      bloqueado: documento === 'CPF' ? true : false,
      mensagemBloqueado: documento === 'CNPJ' ? '' : "Para fazer esta solicitação, você deve fazer o login utilizando um CNPJ ativo com situação regular na Receita Federal."
    },
    {
      perfil: "INDUSTRIAL",
      textoPerfil: "Imóvel será utilizado para fins de atividades industriais caracterizadas como baixa tensão.",
      imagem: "assets/assetsLN/images/Industrial.svg",
      alt: documento === 'CPF' ? "Industrial Bloqueado" : "Industrial",
      bloqueado: documento === 'CPF' ? true : false,
      mensagemBloqueado: documento === 'CNPJ' ? '' : "Para fazer esta solicitação, você deve fazer o login utilizando um CNPJ ativo com situação regular na Receita Federal."
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpcaoTarifariaComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })

      .compileComponents();
    fixture = TestBed.createComponent(OpcaoTarifariaComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    component['_ligacaoNovaService'].setPerfilEscolhido = infosPerfis[0];
  });

  it(`#${OpcaoTarifariaComponent.name} Deve criar o componente quando iniciado o ciclo de vidado Angular`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${OpcaoTarifariaComponent.prototype.infoTarifa.name}
  deve redirecionar para informativo tarifa quando chamado e parâmetro é branca`, () => {
    fixture.detectChanges();
    let routerSpy = spyOn(router, 'navigate');
    component.infoTarifa("branca");
    expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "informativo-tarifa"], component.navExtraInfoTarifa);
  });

  it(`#${OpcaoTarifariaComponent.prototype.infoTarifa.name}
  deve redirecionar para informativo tarifa quando chamado e parâmetro é social`, () => {
    fixture.detectChanges();
    let routerSpy = spyOn(router, 'navigate');
    component.infoTarifa("social");
    expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "informativo-tarifa"], component.navExtraInfoTarifa);
  })

  it(`#${OpcaoTarifariaComponent.prototype.voltar.name}
  deve voltar pagina quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  it(`#${OpcaoTarifariaComponent.prototype.onResize.name}
  deve ser chamado quando emitir resize da tela for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`${OpcaoTarifariaComponent.prototype.continuar.name}
  deve direcionar para tela de opção de benfício da tarifa social`, () => {
    fixture.detectChanges();
    component.formTarifa.controls.tarifa.setValue('SOCIAL');
    let spy = spyOn(router, 'navigate');
    component.continuar();
    expect(spy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "tarifa-social"]);
  });


  it(`${OpcaoTarifariaComponent.prototype.continuar.name}
  deve direcionar para tela de seleção para data de vencimento da fatura quando for tarifa convencional`, () => {
    fixture.detectChanges();
    component.formTarifa.controls.tarifa.setValue('CONVENCIONAL');
    let spy = spyOn(router, 'navigate');
    component.continuar();
    expect(spy).toHaveBeenCalledWith(["ligacao-nova", "pagamento", "definir-data"]);
  });


  it(`${OpcaoTarifariaComponent.prototype.continuar.name}
  deve permanecer na mesma tela quando nenhuma tarifa é selecionado`, () => {
    fixture.detectChanges();
    component.formTarifa.controls.tarifa.setValue('');
    component.continuar();
    expect(location.back()).toBe();
  });

  it(`${OpcaoTarifariaComponent.prototype.continuar.name}
  deve direcionar para tela de seleção para data de vencimento da fatura quando for tarifa branca`, (done) => {
    fixture.detectChanges();
    component.formTarifa.controls.tarifa.setValue('BRANCA');
    let spy = spyOn(router, 'navigate');
    component.continuar();
    Swal.clickCancel();
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(["ligacao-nova", "pagamento", "definir-data"]);
      done();
    });
  });


});
