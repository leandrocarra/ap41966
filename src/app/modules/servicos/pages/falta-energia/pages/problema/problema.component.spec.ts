import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumFaltaEnergiaOpcoes, EnumOQueSabeSobreProblema, EnumOQueSabeSobreProblemaAvisos, EnumOscilacaoOpcoes } from 'app/core/models/falta-de-energia/falta-de-energia';
import { SubRotasFaltaDeEnergia } from 'app/core/models/falta-de-energia/sub-rotas-falta-de-energia';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';
import { ProblemaComponent } from './problema.component';


describe(ProblemaComponent.name, () => {
    let component: ProblemaComponent;
    let fixture: ComponentFixture<ProblemaComponent>;
    let router: Router

    let navExtraMockado = {
        "extras": {
            "state": {
                "ondeFaltaEnergia": "",
                "tipoAlerta": "",
                "oQueSabeProblemaFaltaEnergia": ""
            }
        }
    }

    let mensagemAviso = ''

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProblemaComponent],
            providers: [
                UserService,
                TokenService
            ],
            imports: [
                CommonModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([])
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.inject(Router);
        spyOn(router, 'getCurrentNavigation').and.returnValue(navExtraMockado as any);
        fixture = TestBed.createComponent(ProblemaComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it(`#${ProblemaComponent.name}
  deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });



    it(`#${ProblemaComponent.prototype.onResize.name}
   deve ser retornar verdadeiro chamado quando emitir resize da tela
  for menor que 768`, () => {
        fixture.detectChanges();
        spyOnProperty(window, 'innerWidth').and.returnValue(760);
        window.dispatchEvent(new Event('resize'));
        expect(component.mobile).toBeTrue();
    });
    
    
    it(`#${ProblemaComponent.prototype.voltar.name} deve navegar de volta para a página anterior quando chamado.`, () => {
        fixture.detectChanges();
        let locationSpy = spyOn(component['_location'], 'back');
        component.voltar();
        expect(locationSpy).toHaveBeenCalled();
    });

    it(`#${ProblemaComponent.prototype.continuar.name}
    deve direcionar para tela de dados contato, quando houver erro na uc`, () => {
       let routerSpy = spyOn(router, 'navigate');
       component['_faltaDeEnergiaService'].fluxoFaltaDeEnergia.problemaEscolhido === EnumOscilacaoOpcoes.ParteDaMinhaUC
       fixture.detectChanges();
       component.continuar();
       expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.DadosContato])
   });

   it(`#${ProblemaComponent.prototype.apresentaAlerta.name}
   deve apresentar alerta, quando houver fio partido`, () => {
      let routerSpy = spyOn(router, 'navigate')
      component.mensagemAviso ===  EnumOQueSabeSobreProblema.FioPartido
      fixture.detectChanges();
      component.apresentaAlerta();
      expect(routerSpy).toBeTruthy();
  });

  it(`#${ProblemaComponent.prototype.apresentaAlerta.name}
  deve apresentar alerta, quando houver fio partido `, () => {
     let routerSpy = spyOn(router, 'navigate');
     component['_faltaDeEnergiaService'].fluxoFaltaDeEnergia.ondeFaltaEnergia = "";
     component.problemaEscolhido = EnumOQueSabeSobreProblema.FioPartido;
     fixture.detectChanges();
     component.apresentaAlerta();
     expect(routerSpy).toBeTruthy(); 
 });


   it(`#${ProblemaComponent.prototype.continuar.name}
   deve direcionar para tela de dados contato, quando houver erro na uc`, () => {
      let routerSpy = spyOn(router, 'navigate');
      component.problemaEscolhido = EnumOscilacaoOpcoes.ParteDaMinhaUC;
      fixture.detectChanges();
      component.continuar();
      expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.Avisos])
  });


    it(`#${ProblemaComponent.prototype.montaArrayDeProblemas.name}
    deve fazer o DePara e salvar os dados na variável navExtra`, () => {
      fixture.detectChanges();
      component['_faltaDeEnergiaService'].fluxoFaltaDeEnergia.ondeFaltaEnergia = EnumFaltaEnergiaOpcoes.OscilacaoDeTensao
      expect(component.montaArrayDeProblemas()).toBeDefined();
    });

  

    
});
