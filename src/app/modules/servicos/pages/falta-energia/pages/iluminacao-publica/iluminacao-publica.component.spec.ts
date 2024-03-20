import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumIluminacaoPublicaOpcoes } from 'app/core/models/falta-de-energia/falta-de-energia';
import { SubRotasFaltaDeEnergia } from 'app/core/models/falta-de-energia/sub-rotas-falta-de-energia';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';

import { IluminacaoPublicaComponent } from './iluminacao-publica.component';

describe(IluminacaoPublicaComponent.name, () => {
    let component: IluminacaoPublicaComponent;
    let fixture: ComponentFixture<IluminacaoPublicaComponent>;
    let router: Router;
    let ucSelecionada = require('../../../../../../shared/mock/responses/response-api-ucs.json');

    let mockNavExtra = {
        "extras": {
            "state": {
                "ondeFaltaEnergia": null,
                "tipoAlerta": null,
                "isIluminacao": null,
                "oQueSabeProblemaIluminacao": null
            }
        }
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [IluminacaoPublicaComponent],
            providers: [
                UserService,
                TokenService
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([])
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.inject(Router);
        spyOn(router, 'getCurrentNavigation').and.returnValue(mockNavExtra as any);
        fixture = TestBed.createComponent(IluminacaoPublicaComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it(`#${IluminacaoPublicaComponent.name}
     deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });



    it(`#${IluminacaoPublicaComponent.prototype.continuar.name}
     deve direcionar para tela de avisos, quando a falta de iluminacao for em praca ou jardim`, () => {
        let routerSpy = spyOn(router, 'navigate');
        component.descricaoProblema = EnumIluminacaoPublicaOpcoes.EmPracaOuJardim;
        fixture.detectChanges();
        component.continuar();
        expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.Avisos]);
    });

    it(`#${IluminacaoPublicaComponent.prototype.continuar.name}
     deve direcionar para tela dados contato, quando a falta de iluminacao for diferente de praca ou jardim`, () => {
        let routerSpy = spyOn(router, 'navigate');
        component.descricaoProblema = EnumIluminacaoPublicaOpcoes.AcesaDeDia;
        fixture.detectChanges();
        component.continuar();
        expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.DadosContato]);
    });



    it(`#${IluminacaoPublicaComponent.prototype.distribuidoraNaoAtende.name}
    deve setar como true quando a distribuidora for NE`, () => {
       let routerSpy = spyOn(component, 'distribuidoraNaoAtende');
       environment.regiao = Regiao.NE;
       component['_selecaoImovelService'].setUCSelecionada =  ucSelecionada.NE;
       fixture.detectChanges();
       component.distribuidoraNaoAtende();
       expect(routerSpy).toBeTruthy();
   });

 







    it(`#${IluminacaoPublicaComponent.prototype.voltar.name} deve navegar de volta para a página anterior quando chamado.`, () => {
        fixture.detectChanges();
        let locationSpy = spyOn(component['_location'], 'back');
        component.voltar();
        expect(locationSpy).toHaveBeenCalled();
    });
});


