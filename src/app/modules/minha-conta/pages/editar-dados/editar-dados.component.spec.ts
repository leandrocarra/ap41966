import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, InjectionToken, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasMinhaConta } from 'app/core/models/minha-conta/minha-conta';
import { MinhaContaService } from 'app/core/services/minha-conta/minha-conta.service';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';
import { NgxMaskModule } from 'ngx-mask';
import { MinhaContaModule } from '../../minha-conta.module';
import { EditarDadosComponent } from './editar-dados.component';


describe(EditarDadosComponent.name, () => {
    let router: Router;

    let component: EditarDadosComponent;
    let fixture: ComponentFixture<EditarDadosComponent>;
    let userService: jasmine.SpyObj<UserService>;
    let minhaContaService: jasmine.SpyObj<MinhaContaService>;

    //Mocks
    let dadosUserMock = require('../../../../shared/mock/preenchimentos/dados-user.json');
    let minhaContaMock = require('../../../../shared/mock/responses/minha-conta.json');



    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditarDadosComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
                NgxMaskModule.forRoot(),
                BrowserAnimationsModule,
                MinhaContaModule
            ],

            providers: [
                TokenService,
                UserService,
                {
                    provide: MAT_DATE_LOCALE,
                    useValue: 'en-GB'
                },
                {
                    provide: InjectionToken,
                    useValue: '',
                    multi: true
                }
            ]
        })
            .compileComponents();


        router = TestBed.inject(Router);
        userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        minhaContaService = TestBed.inject(MinhaContaService) as jasmine.SpyObj<MinhaContaService>;
    });


    it(`Deve instanciar ${EditarDadosComponent.name} quando chamado`, () => {
        userService.dadosUser = dadosUserMock.PF;
        minhaContaService.setMinhaConta = minhaContaMock['19935193861'];

        fixture = TestBed.createComponent(EditarDadosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it(`Deve setar tipoPessoa como 'JURIDICA' quando documento for maior que 11 caracteres`, () => {
        userService.dadosUser = dadosUserMock.PJ;
        minhaContaService.setMinhaConta = minhaContaMock['19935193861'];

        fixture = TestBed.createComponent(EditarDadosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.tipoPessoa).toEqual("JURIDICA");
    });


    it(`#${EditarDadosComponent.prototype.editarDados.name} deve setar "VOLTAR" em textoPrimeiroBotao quando bloquearDados for true`, () => {
        userService.dadosUser = dadosUserMock.PF;
        minhaContaService.setMinhaConta = minhaContaMock['19935193861'];

        fixture = TestBed.createComponent(EditarDadosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        component.editarDados();
        expect(component.textoPrimeiroBotao).toEqual("VOLTAR");
    });


    it(`#${EditarDadosComponent.prototype.alterarSenha.name} deve redirecionar para  Altear senha quando bloquearDados for true`, () => {
        userService.dadosUser = dadosUserMock.PF;
        minhaContaService.setMinhaConta = minhaContaMock['19935193861'];

        fixture = TestBed.createComponent(EditarDadosComponent);
        component = fixture.componentInstance;

        let routerSpy = spyOn(router, 'navigate');

        fixture.detectChanges();
        component.alterarSenha();
        expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.minhaConta, SubRotasMinhaConta.alterarSenha]);
    });

    // it(`#${EditarDadosComponent.prototype.alterarSenha.name} deve setar bloquearDados como true quando bloquearDados for false e #getAtualizarMinhaConta retornar valor`, () => {

    //     userService.dadosUser = dadosUserMock.PF;
    //     minhaContaService.setMinhaConta = minhaContaMock['19935193861'];

    //     let retornoEndpoint = {
    //         "retorno": {
    //             "numero": 202,
    //             "mensagem": "O perfil do usuário foi atualizado com sucesso."
    //         }
    //     }

    //     fixture = TestBed.createComponent(EditarDadosComponent);
    //     component = fixture.componentInstance;


    //     spyOn(component['_minhaContaService'], 'getAtualizarMinhaConta').and.returnValue(Promise.resolve(retornoEndpoint));

    //     fixture.detectChanges();
    //     component.bloquearDados = false;
    //     component.alterarSenha();
    //     expect(component.bloquearDados).toBeTrue();
    // });

});