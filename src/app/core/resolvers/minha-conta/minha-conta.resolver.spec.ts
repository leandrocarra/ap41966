import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenService } from 'app/core/services/token/token.service';

import { MinhaContaResolver } from './minha-conta.resolver';

describe(MinhaContaResolver.name, () => {
    let resolver: MinhaContaResolver;

    let minhaContaMock = require('../../../shared/mock/responses/minha-conta.json');

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([])
            ],

            providers: [
                TokenService
            ]
        });

        resolver = TestBed.inject(MinhaContaResolver);
    });

    it(`Deve instanciar ${MinhaContaResolver.name} quando chamado`, () => {
        expect(resolver).toBeTruthy();
    });

    it(`Deve chamar o #stop quando  ${MinhaContaResolver.prototype.resolve.name} retornar valor`, fakeAsync(() => {
        let stopSpy = spyOn(resolver['_loadingService'], 'stop');

        spyOn(resolver['_minhaContaService'], 'getDadosMinhaConta').and.returnValue(Promise.resolve(minhaContaMock['19935193861']));
        
        resolver.resolve();
        tick();
        expect(stopSpy).toHaveBeenCalled();
    }));

});
