import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environments/environment';
import { PathCompleto } from 'app/core/enums/servicos';
import { Canal } from 'app/core/models/canais/enums/canais';
import { SubRotasMinhaConta } from 'app/core/models/minha-conta/minha-conta';

import { MinhaContaService } from 'app/core/services/minha-conta/minha-conta.service';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';
import { NgxMaskModule } from 'ngx-mask';
import { of, throwError } from 'rxjs';
import { MinhaContaModule } from '../../minha-conta.module';
import { EditarDadosComponent } from '../editar-dados/editar-dados.component';
import { AlterarSenhaComponent } from './alterar-senha.component';

describe(AlterarSenhaComponent.name, () => {
    let component: AlterarSenhaComponent;
    let fixture: ComponentFixture<AlterarSenhaComponent>;
    let router: Router;
    let activatedRoute: ActivatedRoute;

    let userService: jasmine.SpyObj<UserService>;
    let minhaContaService: MinhaContaService;

    //Mocks
    let dadosUserMock = require('../../../../shared/mock/preenchimentos/dados-user.json');
    let minhaContaMock = require('../../../../shared/mock/responses/minha-conta.json');

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                AlterarSenhaComponent,
                EditarDadosComponent
            ],

            imports: [
                MinhaContaModule,
                RouterTestingModule.withRoutes([
                    { path: 'home/minha-conta/', component: EditarDadosComponent }
                ]),
                BrowserAnimationsModule,
                HttpClientTestingModule,
                NgxMaskModule.forRoot()
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
                CUSTOM_ELEMENTS_SCHEMA
            ],

            providers: [
                TokenService,
                UserService
            ]
        })
            .compileComponents();


        activatedRoute = TestBed.inject(ActivatedRoute);

        router = TestBed.inject(Router);
        userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

        userService.USUARIO_UE = 'TESTE0001';

        activatedRoute.data = of(minhaContaMock['19935193861']);
        userService.dadosUser = dadosUserMock.PF;


        minhaContaService = TestBed.inject(MinhaContaService);

        fixture = TestBed.createComponent(AlterarSenhaComponent);
        component = fixture.componentInstance;

    });


    it(`Deve instanciar ${AlterarSenhaComponent.name} quando disparado o fluxo de vida o Angular.`, () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });


    it(`#${AlterarSenhaComponent.prototype.voltar.name} deve navegar de volta para a página anterior quando chamado.`, () => {
        fixture.detectChanges();
        let locationSpy = spyOn(component['_location'], 'back');

        component.voltar();
        expect(locationSpy).toHaveBeenCalled();
    });


    it(`#${AlterarSenhaComponent.prototype.continuar.name} deve redirecionar para editarDados quando #getAtualizarSenha estiver retornando for 202.`, fakeAsync(() => {

        let routerSpy = spyOn(router, 'navigate');
        let resultado = {
            "retorno": {
                "mensagem": "A senha foi atualizada com sucesso.",
                "numero": 202
            }
        }

        spyOn(component['_minhaContaService'], 'getAtualizarSenha').and.returnValue(Promise.resolve(resultado));

        fixture.detectChanges();

        environment.canal = Canal.AGE;
        component['_user'].dadosUser.sub = "ELEKTRO/19935193861";
        component['_user'].dadosUser.documento = "19935193861";
        component.senhasFormGroup.patchValue({
            password: '12345',
            senhaAntiga: '1234'
        });

        component.continuar();
        tick();
        expect(routerSpy).toHaveBeenCalledWith([PathCompleto.minhaConta, SubRotasMinhaConta.editarDados]);

    }));

    it(`#${AlterarSenhaComponent.prototype.continuar.name} deve limpar o campo de senha quando #atualizarSenha  retornar Erro.`, fakeAsync(() => {
        let retornoErroAtualizarSenha = {
            "headers": {
                "normalizedNames": {},
                "lazyUpdate": null
            },
            "status": 400,
            "statusText": "Bad Request",
            "url": "http://localhost:4200/api/minha-conta/1.0.0/atualizar-senha",
            "ok": false,
            "name": "HttpErrorResponse",
            "message": "Http failure response for http://localhost:4200/api/minha-conta/1.0.0/atualizar-senha: 400 Bad Request",
            "error": {
                "retorno": {
                    "numero": 400,
                    "mensagem": "30006 - PasswordInvalid Old credential does not match with the existing credentials."
                }
            }
        }

        spyOn(minhaContaService, 'atualizarSenha').and.returnValue(throwError(() => retornoErroAtualizarSenha));
        spyOn(component['_minhaContaService'], 'getAtualizarSenha').and.returnValue(Promise.resolve(retornoErroAtualizarSenha.error.retorno.numero));
        fixture.detectChanges();
        component.continuar();
        tick();
        expect(component.senhasFormGroup.value.senhaAntiga).toEqual('');

    }));



    it(`#${AlterarSenhaComponent.prototype.setPassword.name} deve setar btnContinuar como false quando houver senha por  parâmetro.`, () => {
        fixture.detectChanges();

        component.setPassword('123455');
        expect(component.senhasFormGroup.value.password).toEqual('123455');
    });

});
