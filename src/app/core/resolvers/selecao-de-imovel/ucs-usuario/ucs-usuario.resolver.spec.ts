import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from 'app/core/services/error/error.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';
import { HomeModule } from 'app/modules/home/home.module';
import { UCsUsuariosResolver } from './ucs-usuario.resolver';

describe(UCsUsuariosResolver.name, () => {
    let resolver: UCsUsuariosResolver;
    let mockImportado = require('../../../../shared/mock/responses/response-api-imoveis.json'); 
    let ucsImoveisMockado = mockImportado['ATUAL']; 

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                SelecaoImovelService,
                TokenService,
                UserService,
                ErrorService
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([]),
                HomeModule
            ]
        })
            .compileComponents();
        resolver = TestBed.inject(UCsUsuariosResolver);
    });

    it(`#${UCsUsuariosResolver.name}
    deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
        expect(resolver).toBeTruthy();
    });

    it(`#${UCsUsuariosResolver.prototype.resolve.name}
    deve retornar a relação das ucs`, fakeAsync(() => {
        spyOn(resolver['_selecaoImovelService'], 'getMeusImoveis').and.resolveTo(ucsImoveisMockado);
        resolver.resolve().then((valor) => {
            expect(valor).toEqual(ucsImoveisMockado);
        })
    }));
});
