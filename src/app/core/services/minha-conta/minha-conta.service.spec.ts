import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environments/environment';
import { Canal } from 'app/core/models/canais/enums/canais';
import { MinhaContaDTORequest } from 'app/core/models/minha-conta/request/minha-conta-dto';
import { MinhaContaDTOResponse } from 'app/core/models/minha-conta/response/minha-conta-dto';
import { of, throwError } from 'rxjs';
import { TokenService } from '../token/token.service';

import { MinhaContaService } from './minha-conta.service';

describe(MinhaContaService.name, () => {
    let httpTestingController: HttpTestingController;
    let service: MinhaContaService;

    let minhaContaMock = require('../../../shared/mock/responses/minha-conta.json');
    let atualizarContaMock = require('../../../shared/mock/preenchimentos/atualizar-minha-conta-request.json');
    let atualizarSenhaMock = require('../../../shared/mock/preenchimentos/atualizar-senha-minha-conta.json');
    beforeEach(() => {

        TestBed.configureTestingModule({
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                TokenService
            ]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(MinhaContaService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });


    it(`Deve instanciar ${MinhaContaService.name} quando chamado`, () => {
        expect(service).toBeTruthy();
    });


    it(`#${MinhaContaService.prototype.consultarMinhaConta.name} deve retornar ${MinhaContaDTOResponse.name} preenchido quando for 200`, () => {
        environment.canal = Canal.AGE;
        service['_user'].dadosUser.documento = '19935193861';
        service['_user'].dadosUser.sub = 'ELEKTRO/19935193861';

        let minhaContaRequestDTO: MinhaContaDTORequest = new MinhaContaDTORequest(environment.canal, '', service['_user'].dadosUser.documento, service['_user'].dadosUser.sub);

        service.consultarMinhaConta().subscribe({
            next: value => {
                expect(value)
                    .withContext(`Retorno 200 para o método ${MinhaContaService.prototype.consultarMinhaConta.name}`)
                    .toEqual(minhaContaMock['19935193861']);
            },
        });

        let urlEsperada: string = `${environment.endpoints.minhaConta}?canalSolicitante=${minhaContaRequestDTO.canalSolicitante}&documento=${minhaContaRequestDTO.documento}&userName=${minhaContaRequestDTO.userName}`;
        validaRequisicao(urlEsperada, 'GET', minhaContaMock['19935193861']);

    });

    it(`#${MinhaContaService.prototype.consultarMinhaConta.name} deve retornar  Erro  quando Retorno for 404`, () => {
        environment.canal = Canal.AGE;
        service['_user'].dadosUser.documento = '1111111';
        service['_user'].dadosUser.sub = 'ELEKTRO/1111111';

        let minhaContaRequestDTO: MinhaContaDTORequest = new MinhaContaDTORequest(environment.canal, '', service['_user'].dadosUser.documento, service['_user'].dadosUser.sub);

        service.consultarMinhaConta().subscribe({
            error: error => {
                expect(error)
                    .withContext(`Retorno 404 para o método ${MinhaContaService.prototype.consultarMinhaConta.name}`)
                    .toEqual(minhaContaMock['USUARIO_NAO_ENCONTRADO']);
            },
        });

        let urlEsperada: string = `${environment.endpoints.minhaConta}?canalSolicitante=${minhaContaRequestDTO.canalSolicitante}&documento=${minhaContaRequestDTO.documento}&userName=${minhaContaRequestDTO.userName}`;
        validaRequisicao(urlEsperada, 'GET', minhaContaMock['USUARIO_NAO_ENCONTRADO']);
    });



    it(`#${MinhaContaService.prototype.atualizarMinhaConta.name} deve retornar valor quando for 200`, () => {
        let dadosContaMock = atualizarContaMock["INPUT"];

        service.atualizarMinhaConta(dadosContaMock).subscribe({
            next: value => {
                expect(value)
                    .toEqual(atualizarContaMock["RESPONSE"]);
            },
        });
        validaRequisicao(environment.endpoints.atualizarMinhaConta, 'PUT', atualizarContaMock["RESPONSE"])
    });

    it(`#${MinhaContaService.prototype.atualizarMinhaConta.name} deve retornar valor quando for 404`, () => {
        let dadosContaMock = atualizarContaMock["INPUT"];

        service.atualizarMinhaConta(dadosContaMock).subscribe({
            error: error => {
                expect(error)
                    .toEqual(atualizarContaMock["404"].error);
            },
        });

        validaRequisicao(environment.endpoints.atualizarMinhaConta, 'PUT', atualizarContaMock["404"].error)
    });



    it(`#${MinhaContaService.prototype.atualizarSenha.name} deve retornar senha Alterada quando DTO for enviado corretamente`, () => {
        service.atualizarSenha(atualizarSenhaMock['request']).subscribe({
            error: (error) => {
                expect(error)
                    .toEqual(atualizarSenhaMock['response']);
            }
        });
        validaRequisicao(environment.endpoints.atualizarSenha, 'PUT', atualizarSenhaMock['response']);
    });

    it(`#${MinhaContaService.prototype.atualizarSenha.name} deve retornar senha Alterada quando DTO for enviado incorreto`, () => {
        service.atualizarSenha(atualizarSenhaMock['request']).subscribe({
            error: (error) => {
                expect(error)
                    .toEqual(atualizarSenhaMock['404'].error);
            }
        });
        validaRequisicao(environment.endpoints.atualizarSenha, 'PUT', atualizarSenhaMock['404'].error)
    });



    it(`#${MinhaContaService.prototype.getDadosMinhaConta.name} deve retornar valor minha conta quando #consultarMinhaConta retornar valor`, () => {
        spyOn(service, 'consultarMinhaConta').and.returnValue(of(atualizarSenhaMock['response']));
        service.getDadosMinhaConta().then((response) => {
            expect(response).toEqual(atualizarSenhaMock['response']);
        });
    });

    it(`#${MinhaContaService.prototype.getDadosMinhaConta.name} deve retornar valor minha conta quando #consultarMinhaConta retornar valor`, fakeAsync(() => {
        spyOn(service, 'consultarMinhaConta').and.returnValue(throwError(() => atualizarSenhaMock['404']));
        service.getDadosMinhaConta().then((response) => {
            expect(response).toEqual(atualizarSenhaMock['404']);
        });
    }));



    it(`#${MinhaContaService.prototype.getAtualizarMinhaConta.name} deve retornar valor minha conta quando #atualizarMinhaConta retornar valor`, fakeAsync(() => {
        spyOn(service, 'atualizarMinhaConta').and.returnValue(of(atualizarContaMock['RESPONSE']));
        let alertSucesso = spyOn(service['_alert'], 'alertAlteradoSucesso');

        service.getAtualizarMinhaConta(atualizarContaMock['INPUT']).then(() => {
            expect(alertSucesso).toHaveBeenCalled();
        });
    }));

    it(`#${MinhaContaService.prototype.getAtualizarMinhaConta.name} deve chamar #alertaErroRequisicao e retornar Erro quando #atualizarMinhaConta retornar status 400`, fakeAsync(() => {
        spyOn(service, 'atualizarMinhaConta').and.returnValue(throwError(() => atualizarContaMock['404']));
        service.getAtualizarMinhaConta(atualizarContaMock['request']).catch((response) => {
            expect(response).toEqual(atualizarContaMock['404']);
        });

    }));



    it(`#${MinhaContaService.prototype.getAtualizarSenha.name} deve chamar #alertAlteradoSucesso quando retorno for 200`, () => {
        spyOn(service, 'atualizarSenha').and.returnValue(of(atualizarSenhaMock['response']));
        let alertSucesso = spyOn(service['_alert'], 'alertAlteradoSucesso');
        service.getAtualizarSenha(atualizarSenhaMock['request']).then(() => {
            expect(alertSucesso).toHaveBeenCalled();
        });
    });

    it(`#${MinhaContaService.prototype.getAtualizarSenha.name} deve chamar #alertErroRequisicao quando retorno for 400`, fakeAsync(() => {
        spyOn(service, 'atualizarSenha').and.returnValue(throwError(() => atualizarSenhaMock['400']));
        let alertSucesso = spyOn(service['_alert'], 'alertErroRequisicao');
        service.getAtualizarSenha(atualizarSenhaMock['request']).catch(() => {
            expect(alertSucesso).toHaveBeenCalledOnceWith("Senha antiga não confere. Tente novamente.");
        });
    }));

    it(`#${MinhaContaService.prototype.getAtualizarSenha.name} deve retornar 'Não autorizado' quando retorno do #atualizarSenha for 401`, fakeAsync(() => {
        spyOn(service, 'atualizarSenha').and.returnValue(throwError(() => atualizarSenhaMock['401']));
        service.getAtualizarSenha(atualizarSenhaMock['request']).catch((response) => {
            expect(response).toEqual("não autorizado");
        });
    }));

    it(`#${MinhaContaService.prototype.getAtualizarSenha.name} deve retornar 'Usuário com o perfil inativo!' quando retorno do #atualizarSenha for 403`, fakeAsync(() => {
        spyOn(service, 'atualizarSenha').and.returnValue(throwError(() => atualizarSenhaMock['403']));
        service.getAtualizarSenha(atualizarSenhaMock['request']).catch((response) => {
            expect(response).toEqual("Usuário com o perfil inativo!");
        });
    }));



    it(`#${MinhaContaService.prototype.getAtualizarSenha.name} deve retornar 'Usuário não encontrado' quando retorno do #atualizarSenha for 404`, fakeAsync(() => {
        spyOn(service, 'atualizarSenha').and.returnValue(throwError(() => atualizarSenhaMock['404']));
        service.getAtualizarSenha(atualizarSenhaMock['request']).catch((response) => {
            expect(response).toEqual("Usuário não encontrado");
        });
    }));

    it(`#${MinhaContaService.prototype.getAtualizarSenha.name} deve retornar error quando retorno do #atualizarSenha for error default`, fakeAsync(() => {
        spyOn(service, 'atualizarSenha').and.returnValue(throwError(() => atualizarSenhaMock['DEFAULT']));
        service.getAtualizarSenha(atualizarSenhaMock['request']).catch((response) => {
            expect(response).toEqual(atualizarSenhaMock['DEFAULT']);
        });
    }));



    it(`#${MinhaContaService.prototype.clearStorage.name}
    deve limpar localStorage e sessionStorage quando chamado`, () => {
        let localStorageSpy = spyOn(localStorage, 'clear');
        let sessionStorageSpy = spyOn(sessionStorage, 'clear');
        service.clearStorage();
        expect(localStorageSpy).toHaveBeenCalled();
        expect(sessionStorageSpy).toHaveBeenCalled();
    });


    function validaRequisicao(endpoint: any, tipoRequisicao: string, valorFlush: any) {
        const requisicao = httpTestingController.expectOne(endpoint);
        expect(requisicao.request.method).toEqual(tipoRequisicao);
        requisicao.flush(valorFlush);
    }

});


