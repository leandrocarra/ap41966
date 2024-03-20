import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { environmentLN } from "../../../../../environments/environmentsLN/environment";
import { UserServiceLN } from "./user.service";

describe(UserServiceLN.name, () => {
    let service: UserServiceLN;
    let httpMock: HttpTestingController;

    let userServiceMockado: jasmine.SpyObj<UserServiceLN>;
    let sessionUserMockado = require('src/app/appLN/shared/mock/responses/response-session-user-cpf.json');

    let responseConsultarCliente = {
        "codUsuario": 157164,
        "codTipoUsuario": 1,
        "codImobiliaria": 0,
        "nome": "Teste CNPJ",
        "documento": "33991294000110",
        "telefone": "",
        "celular": "00000000000",
        "email": "teste@teste.com",
        "senha": "76424F59ED76389C291A418DFFF670EA",
        "recebeEmail": false,
        "recebeSMS": false,
        "data": "2021-03-02T11:51:00.593",
        "ativo": true,
        "dataAtualizacao": "2021-03-19T00:00:00",
        "blacklist": false,
        "isRepositorio": false,
        "dataRepositorio": "0001-01-01T00:00:00",
        "dataNascimento": "0001-01-01T00:00:00",
        "tipoEnvio": 0
    }

    let responseConsultarUsuario = {
        "documento": {
            "tipo": {}
        },
        "segundoDocumento": {
            "orgaoExpedidor": {},
            "tipo": {}
        },
        "contato": {
            "celular": {},
            "telefone": {}
        }
    }

    let responseOCRPessoa = [
        {
            "MatchKeys": "doc{96700905044}",
            "BasicData": {
                "TaxIdNumber": "96700905044",
                "TaxIdStatus": "CPF DOES NOT EXIST IN RECEITA FEDERAL DATABASE",
                "TaxIdStatusDate": "2022-02-10T20:11:04.2776212Z"
            }
        }
    ]

    let responseListarBancos = require('src/app/appLN/shared/mock/responses/response-api-listar-bancos.json');

    let responseCnae = [
        {
            "codigoPrincipal": "03",
            "descricaoPrincipal": "COMERCIAL,SERVICOS,OUTRAS ATIVIDADES",
            "codigoConsumo": "7050",
            "descricaoConsumo": "COOPERATIVAS ESCOLARES",
            "cnae": "8512-1/00",
            "atividadeCNAE": "EDUCACAO INFANTIL - PRE-ESCOLA"
        }
    ]

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserServiceLN],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });

        userServiceMockado = TestBed.inject(UserServiceLN) as jasmine.SpyObj<UserServiceLN>;
        userServiceMockado.sessionUser = sessionUserMockado;

        service = TestBed.inject(UserServiceLN);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it(`#${UserServiceLN.name} Deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
        expect(service).toBeTruthy();
    });

    it(`#${UserServiceLN.prototype.gerarProtocolo.name}deve validar o metodo gerarProtocolo quando protocolo for acionado`, () => {
        let expectUrl = `${environmentLN.apiUrl}/v2/protocolos/${service.USUARIO_UE}/${service.CODIGO_PROTOCOLO}`;

        if (!environmentLN.production) {
            service.gerarProtocolo().subscribe({
                next: value => {
                    expect(value.length).toEqual(10)
                }
            });

            const request = httpMock.expectOne(expectUrl);
            expect(request.request.method).toBe('GET');
        }
    });

    it(`#${UserServiceLN.prototype.consultarCliente.name}Deve validar cliente, quando passar um documento`, () => {
        let documento = "33991294000110";
        let expectUrl = `${environmentLN.apiUrl}/v2/clientes/${documento}?protocolo=${service.protocolo}&usuarioUE=${service.USUARIO_UE}`;

        if (!environmentLN.production) {
            service.consultarCliente(documento).subscribe({
                next: value => {
                    expect(value).toEqual(responseConsultarCliente)
                }
            });

            const request = httpMock.expectOne(expectUrl);
            expect(request.request.method).toBe('GET');
        }
    });

    it(`#${UserServiceLN.prototype.consultarUsuario.name}Deve validar usuario, quando passar um documento valido`, () => {
        let documento = "33991294000110";
        let expectUrl = `${environmentLN.apiUrl}/v2/usuarios/${documento}`;

        if (!environmentLN.production) {
            service.consultarUsuario(documento).subscribe({
                next: value => {
                    expect(value).toEqual(responseConsultarUsuario)
                }
            });

            const request = httpMock.expectOne(expectUrl);
            expect(request.request.method).toBe('GET');
        }
    });

    it(`#${UserServiceLN.prototype.consultarCPF.name}Deve verificar se o cpf é regular, quando passado o documento`, () => {
        let documento = "96700905044";
        let expectUrl = `${environmentLN.apiUrl}/v2/apoio/ocr-pessoa?protocolo=${service.protocolo}&usuarioUE=${service.USUARIO_UE}`;

        if (!environmentLN.production) {
            service.consultarCPF(documento).subscribe({
                next: value => {
                    expect(value).toEqual(responseOCRPessoa)
                }
            });

            const request = httpMock.expectOne(expectUrl);
            expect(request.request.method).toBe('POST');
        }
    });

    it(`#${UserServiceLN.prototype.consultarCPF.name}Deve validar o numero de documento, quando passar cpf`, () => {
        let documento = "00000000000";
        let expectUrl = `${environmentLN.apiUrl}/v2/apoio/ocr-pessoa?protocolo=${service.protocolo}&usuarioUE=${service.USUARIO_UE}`;

        if (!environmentLN.production) {
            service.consultarCPF(documento).subscribe({
                next: value => {
                    expect(value).toBeNull
                }
            });

            const request = httpMock.expectOne(expectUrl);
            expect(request.request.method).toBe('POST');
        }
    });

    it(`#${UserServiceLN.prototype.gerarListaBancos.name}Deve gerar o método #gerarListaBancos, quando acionado`, () => {
        let expectUrl = `${environmentLN.apiUrl}/v2/bancos`;

        if (!environmentLN.production) {
            service.gerarListaBancos().subscribe({
                next: value => {
                    expect(value).toEqual(responseListarBancos)
                }
            });

            const request = httpMock.expectOne(expectUrl);
            expect(request.request.method).toBe('GET');
        }
    });

    it(`#${UserServiceLN.prototype.buscarClassePrincipal.name}Deve validar o método #buscarClassePrincipal, quando passado cnae`, () => {
        let cnae = "8512100";
        let expectUrl = `${environmentLN.apiUrl}/v2/ligacao-nova/classe-principal-consumo?protocolo=${service.protocolo}&usuarioUE=${service.USUARIO_UE}`;

        if (!environmentLN.production) {
            service.buscarClassePrincipal(cnae).subscribe({
                next: value => {
                    expect(value).toEqual(responseCnae)
                }
            });

            const request = httpMock.expectOne(expectUrl);
            expect(request.request.method).toBe('POST');
        }
    });

    it(`#${UserServiceLN.prototype.pedidoRealizado.name}Deve validar o método #pedidoRealizado, quando passar codigo`, () => {
        let codigo = "1003518";
        let response = [];
        let expectUrl = `${environmentLN.apiUrl}/v2/ucs/${codigo}/pedidos?protocolo=${service.protocolo}&usuarioUE=${service.USUARIO_UE}`;

        if (!environmentLN.production) {
            service.pedidoRealizado(codigo).subscribe({
                next: value => {
                    expect(value).toEqual(response)
                }
            });

            const request = httpMock.expectOne(expectUrl);
            expect(request.request.method).toBe('GET');
        }
    });

    it(`#${UserServiceLN.prototype.vistoriaPadrao.name}Deve validar o método #vistoriaPadrao, quando passar codigoLogradouro`, () => {
        let codigoLogradouro = "064297";
        let response = "http://fotospadraohml.elektro.com.br/?token=8001DBE3ADB20D7842A8A1175743CFB1";


        if (!environmentLN.production) {
            let expectUrl = `${environmentLN.apiUrl}/v2/cre/vistoria-foto?protocolo=${service.protocolo}&usuarioUE=${service.USUARIO_UE}`;

            service.vistoriaPadrao(codigoLogradouro).subscribe({
                next: value => {
                    expect(value).toEqual(response)
                }
            });

            const request = httpMock.expectOne(expectUrl);
            expect(request.request.method).toBe('POST');
        }
    });

    // it(`#${UserService.prototype.getProtocolo.name}
    // deve chamar #${UserService.prototype.gerarProtocolo.name}, `, fakeAsync(() => {
    //     let novoProtocolo = "1234";

    //     service.protocolo = "";
    //     spyOn(service, 'gerarProtocolo').and.returnValue(of(novoProtocolo));

    //     service.getProtocolo();
    //     tick();
    //     expect(service.protocolo).toBe(novoProtocolo);

    // }));

    // it(`#${UserService.prototype.getProtocolo.name}
    // deve chamar #${UserService.prototype.gerarProtocolo.name}
    // quando não houver protocolo`, (done) => {
    //     service.protocolo = "";
    //     // let gerarProtocoloSpy = spyOn(service, 'gerarProtocolo');
    //     spyOn(service, 'gerarProtocolo').and.returnValue(of('123456'))
    //     service.getProtocolo();

    //     expect(service.protocolo).toBe('123');


    // })

    it(`Deve validar #getCnae, quando chamado`, () => {
        expect(service.cnae).not.toBeNull;
    })

    it(`#${UserServiceLN.prototype.getProtocolo.name}
    Deve setar valor em #setcnae, quando chamado`, ()=>{
        let numeroCnae = "654321"
        service.cnae = numeroCnae;
        expect(service.cnae).toEqual(numeroCnae)
    })

    // it(``, () => {
    //     service.cnae = "1";
    //     expect(service.cnae).toHaveBeenCalledBefore;
    // })

    it(`Deve setar valor em #idAtendimento, quando chamado`, () => {
        service.setIdAtendimento = null;
        expect(service.idAtendimento).toHaveBeenCalledBefore;
    })

    it(`Deve setar valor em #setprotocolo,
    quando chamado`, () => {
        service.protocolo = "1234567";
        expect(service.protocolo).toHaveBeenCalledBefore;
    })

    it(`Deve setar valor em #setprotocoloFinal,
    quando chamado`, () => {
        service.protocoloFinal = "000000";
        expect(service.protocoloFinal).toHaveBeenCalledBefore;
    })

    // it(`#${UserService.prototype.getProtocolo.name}
    // Deve setar valor em #setprotocoloFinal,quando chamado`, () =>{
    //     let protocoloFinal =  "654321";
    //     service.protocolo = protocoloFinal
    //     expect(service.getProtocolo).toEqual(protocoloFinal)
    // })


    it(`Deve setar valor em #getprotocolo, quando chamado`, () => {
        service.protocolo = null;
        expect(service.protocolo).toHaveBeenCalledBefore;
    })


    it(`#${UserServiceLN.prototype.getProtocolo.name}
    Deve setar valor em #getprotocolo, quando chamado`, () =>{
        let protocoloMockado = '123456'
        service.protocolo = protocoloMockado;
        expect(service.protocolo).toEqual(protocoloMockado)
    })

    it(`#${UserServiceLN.prototype.getProtocolo.name}
    deve retornar protocolo quando acionado`, () => {
        service.protocolo = "123";
        service.getProtocolo().then(valor => {
            expect(valor).toBe(service.protocolo);
        })
    });

    it(`#${UserServiceLN.prototype.getProtocolo.name}
    deve gerar protocolo quando acionado`, () => {
        service.protocolo = "";
        service.getProtocolo().then(valor => {
            expect(valor).toBe(service.gerarProtocolo);
        })
    });

    it(`#${UserServiceLN.prototype.getProtocolo.name}
    deve gerar protocolo quando acionado`, () => {
        service.getProtocolo().then(valorProtocolo => {
            let valorEsperado = valorProtocolo;
            expect(valorProtocolo).toEqual(valorEsperado);
        })

    })


    it(`Deve setar valor em #sessionUser, quando for null`, () => {
        service.sessionUser = null;
        expect(service.sessionUser).toHaveBeenCalledBefore;
    })


    it(`Deve setar valor em #cnae, quando for null`, () => {
        let cnaeMockado = '1234567'
        service.cnae = cnaeMockado;
        expect(service.cnae).toEqual(cnaeMockado)
    })


});
