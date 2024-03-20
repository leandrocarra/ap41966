import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { FooterModule } from 'app/core/footer/footer.module';
import { HeaderModule } from 'app/core/header/header.module';
import { UCResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto';
import { EnumGrupoDeIdentificacao, EnumGrupoDeTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { TokenService } from 'app/core/services/token/token.service';
import { CardAlertaModule } from 'app/shared/components/cards/alertas/alertas.module';
import { CardFaturaInfoModule } from 'app/shared/components/cards/fatura-info/fatura-info.module';
import { SolicitacoesComponentModule } from 'app/shared/components/cards/solicitacoes/solicitacoes.module';
import { ConsumptionChartModule } from 'app/shared/components/consumption-chart/consumption-chart.module';
import { PaginationComponentModule } from 'app/shared/components/pagination/pagination.module';
import { SpinnerModule } from 'app/shared/components/spinner/spinner.module';
import { NaoPossuiImovelModule } from 'app/shared/pages/avisos/nao-possui-imovel/nao-possui-imovel.module';
import { of } from 'rxjs';
import { MeusImoveisComponent } from './meus-imoveis.component';


describe(MeusImoveisComponent.name, () => {
  let component: MeusImoveisComponent;
  let fixture: ComponentFixture<MeusImoveisComponent>;

  let imoveisIntegracao: any = {
    "ucsUsuario": {
      "ucs": [
        {
          "instalacao": "0001089164",
          "status": "Ligada",
          "uc": "29645581",
          "nomeCliente": "YUDI TAMAGOSH DE ALMEIRA ASSIS",
          "local": {
            "bairro": "Centro",
            "cep": "13480-002",
            "endereco": "R. Anhangabau, 1110",
            "municipio": "Indaiatuba",
            "uf": "SP"
          },
          "isGrupo": true,
          "nomeGrupo": "grupo 1",
          "contaColetivaPrincipal": false,
          "grupoTensao": "Grupo A",
          "bOptante": true,
        },
        {
          "instalacao": "0001089164",
          "status": "Ligada",
          "uc": "26225019",
          "nomeCliente": "ZENOBIO CAMARA",
          "local": {
            "bairro": "Centro",
            "cep": "13480-002",
            "endereco": "R. Anhangabau, 1110",
            "municipio": "Indaiatuba",
            "uf": "SP"
          },
          "isGrupo": true,
          "nomeGrupo": "grupo 1",
          "contaColetivaPrincipal": false,
          "grupoTensao": "Grupo A",
          "bOptante": true,
        },
        {
          "instalacao": "0001089164",
          "status": "Ligada",
          "uc": "29883025",
          "nomeCliente": "MAURICIO DE ALMEIRA ASSIS",
          "local": {
            "bairro": "Centro",
            "cep": "13480-002",
            "endereco": "R. da Casa Amarela, 425",
            "municipio": "Louveira",
            "uf": "SP"
          },
          "isGrupo": true,
          "nomeGrupo": "grupo 1",
          "contaColetivaPrincipal": false,
          "grupoTensao": "Grupo A",
          "bOptante": true,
        },
        {
          "instalacao": "0001089164",
          "status": "ainda não ligada",
          "uc": "789987",
          "nomeCliente": "MAURICIO DE ALMEIRA ASSIS",
          "local": {
            "bairro": "Centro",
            "cep": "13480-002",
            "endereco": "R. Sen. Vergueiro, 1110",
            "municipio": "Limeira",
            "uf": "UF"
          },
          "isGrupo": true,
          "nomeGrupo": "grupo 1",
          "contaColetivaPrincipal": false,
          "grupoTensao": "Grupo A",
          "bOptante": true,
        },
        {
          "instalacao": "0001089164",
          "status": "cortada",
          "uc": "2345678",
          "nomeCliente": "GABRIEL PENSADOR",
          "local": {
            "bairro": "Centro",
            "cep": "13480-002",
            "endereco": "R. da Paz, 1110",
            "municipio": "Rio de Janeiro",
            "uf": "RJ"
          },
          "isGrupo": true,
          "nomeGrupo": "grupo 1",
          "contaColetivaPrincipal": false,
          "grupoTensao": "Grupo A",
          "bOptante": true,
        },
        {
          "instalacao": "0001089164",
          "status": "sem luz",
          "uc": "156753648",
          "nomeCliente": "MAURICIO DE ALMEIRA ASSIS",
          "local": {
            "bairro": "Centro",
            "cep": "13480-002",
            "endereco": "R. Sen. Vergueiro, 1110",
            "municipio": "Limeira",
            "uf": "SP"
          },
          "isGrupo": true,
          "nomeGrupo": "grupo 1",
          "contaColetivaPrincipal": false,
          "grupoTensao": "Grupo A",
          "bOptante": true,
        },
        {
          "instalacao": "0001089164",
          "status": "desligada",
          "uc": "102030",
          "nomeCliente": "MAURICIO DE ALMEIRA ASSIS",
          "local": {
            "bairro": "Centro",
            "cep": "22250-040",
            "endereco": "R. Sen. Vergueiro, 1110",
            "municipio": "Limeira",
            "uf": "SP"
          },
          "isGrupo": true,
          "nomeGrupo": "grupo 1",
          "contaColetivaPrincipal": false,
          "grupoTensao": "Grupo A",
          "bOptante": true,
        },
  
      ]
    }
  }

  const activatedRoute = ({ data: of( imoveisIntegracao ) } as any) as ActivatedRoute;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MeusImoveisComponent],
      providers: [
        SelecaoImovelService,
        TokenService,
        { provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    data: {
                        meusImoveis: imoveisIntegracao.ucsUsuario
                    }
                }
            }
        }
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        PaginationComponentModule,
        ConsumptionChartModule,
        IvyCarouselModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        CardFaturaInfoModule,
        CardAlertaModule,
        SolicitacoesComponentModule,
        HeaderModule,
        FooterModule,
        MatButtonModule,
        NaoPossuiImovelModule,
        SpinnerModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusImoveisComponent);
    component = fixture.componentInstance;
  });

  it(`Deve criar o componente ${MeusImoveisComponent.name} quando chamado`, fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it(`${MeusImoveisComponent.prototype.verificarSePossuiUC.name} deve atribuir o valor false em 'possuiImovel' quando não houver unidades consumidoras nas informações do cliente`, () => {
    component.meusImoveis = { ucs: [] };
    component.verificarSePossuiUC();
    expect(component.possuiImovel).toBeFalse();
  });

  it(`${MeusImoveisComponent.prototype.verificarSePossuiUC.name} deve atribuir o valor false em 'possuiImovel' quando não houver informações alocadas na variável 'meusImoveis'`, () => {
    component.meusImoveis = <never>undefined;
    component.verificarSePossuiUC();
    expect(component.possuiImovel).toBeFalse();
  });

//   it(`${MeusImoveisComponent.prototype.definirGrupoDoUsuario.name} deve atribuir o valor ${EnumGrupoDeIdentificacao.B} em ${SelecaoImovelService.name} quando for grupo de consumo B`, () => {
//     imoveisIntegracao.ucsUsuario.ucs.forEach((element: UCResponseDTO) => {
//         element.grupoTensao = EnumGrupoDeIdentificacao.B;
//     });
//     spyOn(component, 'ehGrupoA').and.returnValue(false);
//     component.definirGrupoDoUsuario();
//     fixture.detectChanges();
//     expect(component['_selecaoImovelService'].getGrupoDoUsuario).toEqual(EnumGrupoDeIdentificacao.B);
//   });

  it(`${MeusImoveisComponent.prototype.definirGrupoDoUsuario.name} deve atribuir o valor ${EnumGrupoDeIdentificacao.A} em ${SelecaoImovelService.name} quando a única UC do usuário for grupo de consumo A`, () => {
    component.meusImoveis.ucs.length = 1;
    component.meusImoveis.ucs[0].grupoTensao = EnumGrupoDeTensao.A;
    component.definirGrupoDoUsuario();
    expect(component['_selecaoImovelService'].getGrupoDoUsuario).toEqual(EnumGrupoDeIdentificacao.A);
  });
  
  it(`${MeusImoveisComponent.prototype.definirGrupoDoUsuario.name} deve atribuir o valor ${EnumGrupoDeIdentificacao.B} em ${SelecaoImovelService.name} quando a única UC do usuário for grupo de consumo B`, () => {
    component.meusImoveis.ucs.length = 1;
    component.meusImoveis.ucs[0].grupoTensao = EnumGrupoDeTensao.B;
    component.definirGrupoDoUsuario();
    expect(component['_selecaoImovelService'].getGrupoDoUsuario).toEqual(EnumGrupoDeIdentificacao.B);
  });

  it(`${MeusImoveisComponent.prototype.ehGrupoA.name} deve retornar false quando não houver nenhuma UC do 'grupo A' entre as UCs do usuário`, () => {
    spyOn(component.meusImoveis.ucs, 'find').and.returnValue(undefined);
    expect(component.ehGrupoA()).toBeFalse();
  });

//   it(`${MeusImoveisComponent.prototype.preencherListaDeUCsExibidas.name} deve limitar o numero de UCs exibidas quando houver mais UCs do que o máximo permitido por vez`, () => {
//     component.todasAsUCsOrdenadas.length = 100;
//     let sliceSpy = spyOn(component.todasAsUCsOrdenadas, 'slice');
//     component.preencherListaDeUCsExibidas();
//     expect(sliceSpy).toHaveBeenCalled();
//   });
});
