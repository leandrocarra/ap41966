import { HttpClientTestingModule } from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { UcInfosResponseDTO } from "app/core/models/selecao-de-imoveis/DTO/responses/uc-infos-response-dto";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { TokenService } from "app/core/services/token/token.service";
import { UserService } from "app/core/services/user/user.service";
import { HomeModule } from "app/modules/home/home.module";
import { InformacoesUCResolver } from "./informacoes-uc.resolver";


describe(InformacoesUCResolver.name, () => {

    let resolver: InformacoesUCResolver;
    let dadosMockados = require('../../../../shared/mock/responses/response-api-detalhes-uc.json');
    let ucInfosMockadas: UcInfosResponseDTO = dadosMockados['MOCK'];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                SelecaoImovelService,
                TokenService,
                UserService
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([]),
                HomeModule
            ]
        })
            .compileComponents();
        resolver = TestBed.inject(InformacoesUCResolver);
    });

    it(`#${InformacoesUCResolver.name}
  deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
        expect(resolver).toBeTruthy();
    });

    it(`#${InformacoesUCResolver.prototype.resolve.name}
    deve retornar as informações da UC selecionada quando chamado`, fakeAsync(() => {
        resolver['_selecaoImovelService'].setInformacoesUCSelecionada = ucInfosMockadas;
        resolver.resolve().then((result: any) => {
            expect(result).toEqual(ucInfosMockadas);
        })
    }));

    it(`#${InformacoesUCResolver.prototype.resolve.name}
    deve retornar informações do storage para a UC quando não houver UC selecionada`, fakeAsync(() => {
        resolver['_selecaoImovelService'].setUCSelecionada = null;
        resolver['_selecaoImovelService'].setInformacoesUCSelecionada = ucInfosMockadas;
        resolver.resolve().then((result: any) => {
            expect(result).toEqual(ucInfosMockadas);
        })
    }));

    it(`#${InformacoesUCResolver.prototype.resolve.name}
    deve resolver a promessa do método 'temInformacoesUCSelecionada' quando chamado`, fakeAsync(() => {
        let methodSpy = spyOn(resolver['_selecaoImovelService'], 'temInformacoesUCSelecionada').and.resolveTo(undefined);
        resolver.resolve().then((result: any) => {
            expect(methodSpy).toHaveBeenCalled();
        })
    }));
});