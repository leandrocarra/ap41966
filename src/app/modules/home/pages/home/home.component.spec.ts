import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environments/environment';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { Distribuidora } from 'app/core/enums/distribuidoras';
import { FooterModule } from 'app/core/footer/footer.module';
import { HeaderModule } from 'app/core/header/header.module';
import { FaltaEnergiaDTOResponse } from 'app/core/models/falta-de-energia/responses/falta-de-energia-dto';
import { SubRotasHome } from 'app/core/models/home/sub-rotas-home';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';
import { CardAlertaModule } from 'app/shared/components/cards/alertas/alertas.module';
import { CardFaturaInfoModule } from 'app/shared/components/cards/fatura-info/fatura-info.module';
import { SolicitacoesComponentModule } from 'app/shared/components/cards/solicitacoes/solicitacoes.module';
import { ConsumptionChartModule } from 'app/shared/components/consumption-chart/consumption-chart.module';
import { PaginationComponentModule } from 'app/shared/components/pagination/pagination.module';
import { SpinnerModule } from 'app/shared/components/spinner/spinner.module';
import { NaoPossuiImovelModule } from 'app/shared/pages/avisos/nao-possui-imovel/nao-possui-imovel.module';
import { catchError, of } from 'rxjs';
import { HomeComponent } from './home.component';


describe(HomeComponent.name, () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let user: UserService;
  let router: Router;
  let service: SelecaoImovelService;
  let ucSelecionadoMockado = require('app/shared/mock/responses/response-api-imoveis.json');

  let tokenServiceMockado: jasmine.SpyObj<TokenService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
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
      ],
      providers: [
        TokenService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    tokenServiceMockado = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    user = TestBed.inject(UserService);
    service = TestBed.inject(SelecaoImovelService);
    service.setUCSelecionada = ucSelecionadoMockado['ATUAL'].ucs[0];
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it(`Deve criar ${HomeComponent.name} quando chamado`, () => {
    expect(component).toBeTruthy();
  });

  it(`${HomeComponent.name} deve alterar o conteúdo do carousel quando o grupo de tensão for 'A'`, () => {
    user = TestBed.inject(UserService);
    user.group = 'A';
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    expect(component.carouselItens[0].icon).toEqual("deb-auto.svg");
  });

  it(`${HomeComponent.name} deve alterar o conteúdo do carousel quando o grupo de tensão for 'A' e a Distribuidora for Elektro`, () => {
    user = TestBed.inject(UserService);
    user.group = 'A';
    environment.title = Distribuidora.ELEKTRO;
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    expect(component.carouselItens[2].routeNavigate).toEqual(["servicos", "historico-de-consumo", "grandes-clientes-se"]);
  });

  it(`${HomeComponent.name} atribuir 'undefined' ao _user quando o método #getUCSelecionada do ${SelecaoImovelService.name} retornar null`, () => {
    user = TestBed.inject(UserService);
    service = TestBed.inject(SelecaoImovelService);
    service.setUCSelecionada = null;
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component['_user'].uc).not.toBeDefined();
  });

  it(`#${HomeComponent.prototype.consultarFaltaDeEnergia.name}
  faz algo na integração quando chamado`, () => {
    let consultarSpy = spyOn(component['_faltaEnergiaService'], 'consultarFaltaEnergia').and.returnValue(of(new FaltaEnergiaDTOResponse('','','','')));
    component.consultarFaltaDeEnergia();
    expect(consultarSpy).toBeDefined();
    });

    //TODO: Realizar teste quando houver tratamento de erros no método testado.
    // it(`#${HomeComponent.prototype.deveConsultarFaltaEnergia.name}
    // faz algo quando a integração retornar erro`, () => {
    //     let consultarSpy = spyOn(component['_faltaEnergiaService'], 'consultarFaltaEnergia').and.throwError('erro mock');
    //     component.deveConsultarFaltaEnergia();
    //     expect(consultarSpy).toThrowError();
    //   });

    it(`#${HomeComponent.prototype.redirecionarMeusImoveis.name}
    deve navegar para 'home/${SubRotasHome.MinhasUnidadesConsumidoras} quando chamado`, () => {
        router = TestBed.inject(Router);
        let routerSpy = spyOn(router, 'navigate');
        component.redirecionarMeusImoveis();
        expect(routerSpy).toHaveBeenCalledOnceWith(["home", SubRotasHome.MinhasUnidadesConsumidoras]);
    });

    it(`#${HomeComponent.prototype.navigateTo.name}
    deve navegar para o caminho especificado no parâmetro do método quando chamado`, () => {
        router = TestBed.inject(Router);
        let routerSpy = spyOn(router, 'navigate');
        component.navigateTo(['mock']);
        expect(routerSpy).toHaveBeenCalledOnceWith(['mock']);
    });
});
