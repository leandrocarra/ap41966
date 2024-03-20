import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Anexo } from "../../models/anexo/anexo";
import { BoxAnexo } from "../../models/documentos/box-anexo/box-anexo";
import { DocOficial } from "../../models/documentos/dados-documentos";
import { DocumentosService } from "./documentos.service";



describe(DocumentosService.name, () => {
    let service: DocumentosService;
    let httpMock: HttpTestingController;

    let responseRNE = require('src/app/appLN/shared/mock/responses/response-ocr-rne.json');
    let responseRG = require('src/app/appLN/shared/mock/responses/response-ocr-rg-completo.json');
    let responsePRONAF = require('src/app/appLN/shared/mock/responses/response-ocr-pronaf.json');
    let responseCNH = require('src/app/appLN/shared/mock/responses/response-ocr-cnh.json');
    let responsePassaporte = require('src/app/appLN/shared/mock/responses/response-ocr-passaporte.json');
    let responseReservista = require('src/app/appLN/shared/mock/responses/response-ocr-reservista.json');
    let perfilMockado = require('src/app/appLN/shared/mock/preenchimentos/selecao-perfil.json');
    let sessionUserCPF = require('src/app/appLN/shared/mock/responses/response-session-user-cpf.json');

    let boxDocOficialMockado: BoxAnexo = new BoxAnexo("DOCUMENTO OFICIAL COM FOTO (FRENTE E VERSO)", true, "Doc Oficial");


    let arquivoMockado = new Anexo('.pdf', 'Doc Oficial', 32352, '3123ASVNMRFPLKJ');
    let documentoOficial = new DocOficial();


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DocumentosService
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ]
        });

        service = TestBed.inject(DocumentosService);
    });




    it(`Deve instanciar ${DocumentosService.name}`, () => {
        expect(service).toBeTruthy();
    });

    it(`Deve setar valor pelo setCadespValidado e retornar em getCadespValidado quando chamado`, () => {
        service.setCadespValidado = true;
        expect(service.getCadespValidado).toBeTrue();
    });


    it(`#${DocumentosService.prototype.validarDocOficial.name}
    deve anexar documento e chamar #alertDocumentoEstrangeiro quando for RNE `, () => {
        let rneSpy = spyOn(service['_alert'], 'alertDocumentoEstrangeiro');
        service.validarDocOficial(responseRNE.VALIDO, 'residencial', service.documentos.residencial.anexos, arquivoMockado, false);
        expect(rneSpy).toHaveBeenCalled();
    });

    it(`#${DocumentosService.prototype.validarDocOficial.name}
    deve anexar documento nulo e chamar #alertDocOficialInvalido quando for RNE sem result `, () => {
        let alertDocOficialInvalidoSpy = spyOn(service, 'alertDocOficialInvalido');
        service.validarDocOficial(responsePRONAF.VALIDO, 'residencial', service.documentos.residencial.anexos, arquivoMockado, false);
        expect(alertDocOficialInvalidoSpy).toHaveBeenCalled();
    });

    it(`#${DocumentosService.prototype.validarDocOficial.name}
    deve anexar documento nulo e chamar #alertDocOficialInvalido quando for RNE sem result `, () => {
        let alertDocOficialInvalidoSpy = spyOn(service, 'alertDocOficialInvalido');
        service.validarDocOficial(responseRNE.SEM_RESULT, 'residencial', service.documentos.residencial.anexos, arquivoMockado, false);
        expect(alertDocOficialInvalidoSpy).toHaveBeenCalled();
    });


    it(`#identificarDocOficial deve chamar #verificarTipoTag quando tag do documento for tag invalida de doc oficial`, () => {
        let alertSpy = spyOn(service, 'alertDocOficialInvalido');
        service['identificarDocOficial'](responseRG.VERSO_MEDIA_MENOR, service.documentos.residencial.anexos, 'residencial', arquivoMockado, false);
        expect(alertSpy).toHaveBeenCalled();
    });


    it(`#verificarTipoTag deve chamar #checkTagCnh quando documento for do tipo cnh`, () => {
        let checkTagCnhSpy = spyOn<any>(service, 'checkTagCnh');

        service['verificarTipoTag']('cnh', 'residencial', responseCNH.COMPLETO, responseCNH.COMPLETO, arquivoMockado, service.documentos.residencial.anexos, false);

        expect(checkTagCnhSpy).toHaveBeenCalled();

    });

    it(`#verificarTipoTag deve chamar #checkTagCnh quando documento for do tipo cnh_verso`, () => {
        let checkTagCnhSpy = spyOn<any>(service, 'checkTagCnh');

        service['verificarTipoTag']('cnh_verso', 'residencial', responseCNH.COMPLETO, responseCNH.COMPLETO, arquivoMockado, service.documentos.residencial.anexos, false);

        expect(checkTagCnhSpy).toHaveBeenCalled();

    });


    it(`#verificarTipoTag deve chamar #preencherDadostitular quando documento for reservista e a tag for br-passaporte-1 `, () => {
        let preencherDadosSpy = spyOn<any>(service, 'preencherDadostitular');

        service['verificarTipoTag']('br-passaporte-1', 'residencial', responsePassaporte['VALIDO-1'].result[0], responsePassaporte['VALIDO-1'], arquivoMockado, service.documentos.residencial.anexos['Doc Oficial'], false);

        expect(preencherDadosSpy).toHaveBeenCalled();
    });

    it(`#verificarTipoTag deve chamar #preencherDadostitular quando documento for reservista e a tag for br-passaporte-2 `, () => {
        let preencherDadosSpy = spyOn<any>(service, 'preencherDadostitular');

        service['verificarTipoTag']('br-passaporte-2', 'residencial', responsePassaporte['VALIDO-2'].result[0], responsePassaporte['VALIDO-2'], arquivoMockado, service.documentos.residencial.anexos['Doc Oficial'], false);

        expect(preencherDadosSpy).toHaveBeenCalled();
    });

    it(`#verificarTipoTag deve chamar #preencherDadostitular quando documento for reservista e a tag for br-reservista-1 `, () => {
        let preencherDadosSpy = spyOn<any>(service, 'preencherDadostitular');

        service['verificarTipoTag']('br-reservista-1', 'residencial', responseReservista['VALIDO'].result[0], responseReservista['VALIDO'], arquivoMockado, service.documentos.residencial.anexos['Doc Oficial'], false);

        expect(preencherDadosSpy).toHaveBeenCalled();
    });

    it(`#verificarTipoTag deve chamar #alertDocOficialInvalido quando documento não for doc oficial`, () => {
        let alertSpy = spyOn(service, 'alertDocOficialInvalido');

        service['verificarTipoTag']('br-dapweb-1', 'residencial', responsePRONAF['VALIDO'].result[0], responsePRONAF['VALIDO'], arquivoMockado, service.documentos.residencial.anexos['Doc Oficial'], false);

        expect(alertSpy).toHaveBeenCalled();
    });

    it(`#checkTagRg deve setar valor em docFotoParaComparar quando tag do documento for rg_frente`, () => {
        service['checkTagRg']('rg_frente', 'residencial', responseRG['FRENTE'].result[0], responseRG['FRENTE'], arquivoMockado, false);

        expect(service.docFotoParaComparar).toEqual(arquivoMockado.fileData);
    });


    it(`#checkTagRg deve chamar #preencherDadostitular quando tag do documento for rg_verso`, () => {
        let preencherDadosSpy = spyOn<any>(service, 'preencherDadostitular');

        service['checkTagRg']('rg_verso', 'residencial', responseRG['VERSO'].result[0], responseRG['VERSO'], arquivoMockado, false);

        expect(preencherDadosSpy).toHaveBeenCalled();
    });

    it(`#checkTagCnh deve setar valor em docFotoParaComparar quando for cnh_frente e  tarifa social false`, () => {
        let preencherDadosSpy = spyOn<any>(service, 'preencherDadostitular');

        service['checkTagCnh']('cnh_frente', 'residencial', responseCNH['FRENTE'].result[0], arquivoMockado, false);

        expect(service.docFotoParaComparar)
            .withContext('docFotoParaComparar deve receber valor corretamente')
            .toEqual(arquivoMockado.fileData);

        expect(preencherDadosSpy).toHaveBeenCalled();
    });


    it(`#checkTagCnh deve chamar #preencherDadostitular quando for cnh  e tarifa social true`, () => {
        let preencherDadosSpy = spyOn<any>(service, 'preencherDadostitular');

        service['checkTagCnh']('cnh', 'residencial', responseCNH['FRENTE'].result[0], arquivoMockado, true);

        expect(preencherDadosSpy).toHaveBeenCalled();
    });



    it(`#checkTagCnh deve chamar #uploadDoc quando for cnh_verso e tarifa social false`, () => {
        let uploadDocSpy = spyOn<any>(service, 'uploadDoc');

        service['checkTagCnh']('cnh_verso', 'residencial', responseCNH['VERSO'].result[0], arquivoMockado, false);

        expect(uploadDocSpy).toHaveBeenCalledWith('residencial', arquivoMockado, 'Doc Oficial');
    });


    it(`#preencheOrgaoEmissor deve setar doc suficientes quando for anexado rg completo `, (done) => {

        service['_rgCompleto'] = true;
        service['_docVersoDados'] = true;

        service['preencheOrgaoEmissor']('rg_verso', responseRG['COMPLETO'].result[0], 'residencial', arquivoMockado, false);
        setTimeout(() => {
            expect(service.documentos['residencial'].anexos['Doc Oficial'].docsSuficientes).toBeTrue();
            done();
        });

    });

    it(`#preencheOrgaoEmissor deve chamar #alertDocOficialInvalido quando _docVersoDados for false `, (done) => {
        let alertSpy = spyOn(service, 'alertDocOficialInvalido');
        service['_rgCompleto'] = true;
        service['_docVersoDados'] = false;

        service['preencheOrgaoEmissor']('rg_verso', responseRG['COMPLETO'].result[0], 'residencial', arquivoMockado, false);
        setTimeout(() => {
            expect(alertSpy).toHaveBeenCalled();
            done();
        });
    });


    it(`#preencheOrgaoEmissor deve anexar rg_frente quando não for rg completo e for tarifa social`, (done) => {

        service['_rgCompleto'] = false;

        service['preencheOrgaoEmissor']('rg_verso', responseRG['FRENTE'].result[0], 'residencial', arquivoMockado, true);

        setTimeout(() => {
            expect(service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].arquivos.length).toBe(1);
            done();
        });

    });

    //TODO: faltam 2 orgãos emissor
    // it(`#preencheOrgaoEmissor deve`, (done) => {
    //     service['_rgCompleto'] = true;

    //     service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].arquivos.push(arquivoMockado);

    //     service['preencheOrgaoEmissor']('rg_verso', responseRG['FRENTE'].result[0], 'residencial', arquivoMockado, true);


    //     setTimeout(() => {
    //         expect(service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].docsSuficientes).toBeTrue();
    //         done();
    //     });
    // });

    // it(`#preencheOrgaoEmissor deve`, (done) => {
    //     service['_rgCompleto'] = true;

    //     service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].arquivos.push(arquivoMockado);

    //     service['preencheOrgaoEmissor']('rg_verso', responseRG['FRENTE'].result[0], 'residencial', arquivoMockado, true);


    //     setTimeout(() => {
    //         expect(service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].docsSuficientes).toBeTrue();
    //         done();
    //     });
    // });

    it(`#verificaFrenteVerso deve setar `, () => {
        service.documentos['residencial'].anexos['Doc Oficial'].frenteVerso = true;
        service['verificaFrenteVerso']('residencial', false);
        expect(service.documentos['residencial'].anexos['Doc Oficial'].docsSuficientes).toBeFalse();
    });




    it(`#preencherDadostitular deve chamar #${DocumentosService.prototype.alertDocOficialInvalido.name} quando anexar response nulo`, (done) => {
        service['_userService'].sessionUser = sessionUserCPF;

        service['_userService'].tipoDocumento = 'CPF';

        let alertDocOficialInvalidoSpy = spyOn(service, 'alertDocOficialInvalido');
        service['preencherDadostitular']('br-reservista-1', 'residencial', responseReservista['NULO'].result[0], arquivoMockado, false);


        setTimeout(() => {
            expect(alertDocOficialInvalidoSpy).toHaveBeenCalled();
            done();
        });
    });




    it(`#preencherDadostitular deve setar docSuficiente para true quando for anexado rg verso nulo e sessionUser com nome null`, () => {
        let sessionUserMockado = {
            "codUsuario": 157164,
            "codTipoUsuario": 1,
            "codImobiliaria": 0,
            "nome": null,
            "documento": "96700905044",
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
        service['_userService'].sessionUser = sessionUserMockado;
        service['_userService'].tipoDocumento = 'CNPJ';
        service['preencherDadostitular']('rg_verso', 'residencial', responseRG['VERSO'].result[0], arquivoMockado, false);
        expect(service.documentos['residencial'].anexos['Doc Oficial'].verso).toBeTrue();
    });


    it(`#preencherDadostitular deve setar docSuficiente para true quando for anexado rg verso`, () => {
        service['_userService'].sessionUser = sessionUserCPF;
        service['_userService'].tipoDocumento = 'CNPJ';
        service['preencherDadostitular']('rg_verso', 'residencial', responseRG['NULO'].result[0], arquivoMockado, false);
        expect(service.documentos['residencial'].anexos['Doc Oficial'].verso).toBeTrue();
    });


    it(`#preencherDadostitular deve setar docSuficiente para true quando for anexado passaporte`, () => {
        service['_userService'].sessionUser = sessionUserCPF;
        service['preencherDadostitular']('br-reservista-1', 'residencial', responsePassaporte['VALIDO-1'].result[0], arquivoMockado, false);
        expect(service.documentos['residencial'].anexos['Doc Oficial'].docsSuficientes).toBeTrue();
    });


    it(`#preencherDadostitular deve setar docSuficiente para true quando for anexado reservista`, () => {
        service['_userService'].sessionUser = sessionUserCPF;
        service['preencherDadostitular']('br-reservista-1', 'residencial', responseReservista['VALIDO'].result[0], arquivoMockado, false);
        expect(service.documentos['residencial'].anexos['Doc Oficial'].docsSuficientes).toBeTrue();
    });



    it(`#${DocumentosService.prototype.verificarAnexacaoComum.name}
    deve chamar #${DocumentosService.prototype.uploadDocTarifaSocial.name}
    quando for tarifa social e arquivos menor que quantidade máxima`, () => {
        let uploadDocTarifaSocialSpy = spyOn(service, 'uploadDocTarifaSocial');
        service.verificarAnexacaoComum('residencial', arquivoMockado, boxDocOficialMockado, true);

        expect(uploadDocTarifaSocialSpy).toHaveBeenCalled();

    });

    it(`#${DocumentosService.prototype.verificarAnexacaoComum.name}
    deve chamar #${DocumentosService.prototype.uploadDocTarifaSocial.name}
    quando for NÃO for tarifa social e arquivos menor que quantidade máxima`, () => {
        let uploadDocSpy = spyOn(service, 'uploadDoc');
        service.verificarAnexacaoComum('residencial', arquivoMockado, boxDocOficialMockado, false);

        expect(uploadDocSpy).toHaveBeenCalled();

    });

    it(`#${DocumentosService.prototype.verificarAnexacaoComum.name}
    deve chamar #alertSuccess quando quantidade de documento anexados for maior que quantidade máxima`, () => {
        let uploadDocSpy = spyOn(service['_alert'], 'alertSuccess');

        for (let i = 0; i < 2; i++) {
            service.uploadDoc('residencial', arquivoMockado, boxDocOficialMockado.docName);
        }

        service.verificarAnexacaoComum('residencial', arquivoMockado, boxDocOficialMockado, false);

        expect(uploadDocSpy).toHaveBeenCalled();

    });


    it(`#${DocumentosService.prototype.verificarAnexacaoDocOficial.name}
    deve retornar false quando quantidade de documentos for suficiente`, () => {
        service.documentos['residencial'].anexos['Doc Oficial'].docsSuficientes = true;
        expect(
            service.verificarAnexacaoDocOficial('residencial', 'Doc Oficial', 'Doc Oficial', false)
        ).toBeFalse();
    });


    it(`#${DocumentosService.prototype.verificarAnexacaoDocOficial.name}
    deve retornar false quando quantidade de documentos for suficiente`, () => {
        service.documentos['residencial'].anexos['Doc Oficial'].docsSuficientes = true;
        expect(
            service.verificarAnexacaoDocOficial('residencial', 'Doc Oficial', 'Doc Oficial', false)
        ).toBeFalse();
    });


    it(`#${DocumentosService.prototype.verificarAnexacaoDocOficial.name}
    deve retornar false quando docRepetido for true`, () => {
        service.uploadDoc('residencial', arquivoMockado, 'Doc Oficial');
        expect(
            service.verificarAnexacaoDocOficial('residencial', 'Doc Oficial', 'Doc Oficial', false)
        ).toBeFalse();

    });






    it(`#${DocumentosService.prototype.uploadDoc.name}
    deve anexar documento quando chamado`, () => {
        service['_rgCompleto'] = true;
        service.uploadDoc('residencial', arquivoMockado, 'Doc Oficial');
        expect(service.documentos['residencial'].anexos['Doc Oficial'].arquivos.length).toEqual(1);
    });






    it(`#${DocumentosService.prototype.uploadDocTarifaSocial.name}
    deve anexar documento quando chamado`, () => {
        service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].arquivos.push(arquivoMockado);
        service.uploadDocTarifaSocial(arquivoMockado, 'Doc Oficial');

        expect(service['_dadosDaLigacaoService'].dadosDaLigacao.tarifaSocial.anexos['Doc Oficial'].arquivos.length).toEqual(2);
    });




    it(`#${DocumentosService.prototype.alertDocOficialInvalido.name} deve chamar
    #alertAttemptOneDocument quando numero de tentativas do documento for igual a 1`, () => {
        let alertSpy = spyOn(service['_alert'], 'alertAttemptOneDocument');

        service.alertDocOficialInvalido(false, 'residencial');
        expect(alertSpy).toHaveBeenCalled();
    });

    // it(`#${DocumentosService.prototype.alertDocOficialInvalido.name} deve chamar
    // #alertAttemptTwoDocument quando numero de tentativas do documento for igual a 2`, () => {
    //     let alertSpy = spyOn(service['_alert'], 'alertAttemptTwoDocument');
    //     service.documentos['residencial'].anexos['Doc Oficial'].tentativas = 2;
    //     service.alertDocOficialInvalido(false, 'residencial');
    //     expect(alertSpy).toHaveBeenCalled();
    // });

    // it(`#${DocumentosService.prototype.alertDocOficialInvalido.name} deve chamar
    // #alertAttemptThreeDocument quando numero de tentativas do documento for igual a 3`, () => {
    //     let alertSpy = spyOn(service['_alert'], 'alertAttemptThreeDocument');
    //     service.documentos['residencial'].anexos['Doc Oficial'].tentativas = 3;
    //     service.alertDocOficialInvalido(false, 'residencial');
    //     expect(alertSpy).toHaveBeenCalled();
    // });












    /**
     * removeDocOficial
     */


    // it(`#${DocumentosService.prototype.removeDocOficial.name}
    // deve  setar docsSuficientes  como false quando remover frente do rg`, () => {
    //     service.documentos['residencial'].anexos['RG Frente'].arquivos.push(arquivoMockado);
    //     service.removeDocOficial('residencial', 0, 'RG Frente', false);
    //     expect(service.documentos['residencial'].anexos['RG Frente'].docsSuficientes).toBeFalse();

    // });






    it(`#${DocumentosService.prototype.alertNecessarioDocOficial.name}
    deve chamar #verificaFrenteVerso quando for frenteVerso  `, () => {
        service.documentos['residencial'].anexos['Doc Oficial'].verso = true
        service.documentos['residencial'].anexos['Doc Oficial'].frente = true
        service.documentos['residencial'].anexos['Doc Oficial'].frenteVerso = true
        let spy = spyOn<any>(service, 'verificaFrenteVerso');
        service.alertNecessarioDocOficial('residencial', false);
        expect(spy).toHaveBeenCalledWith('residencial', false);
    });

    it(`#${DocumentosService.prototype.alertNecessarioDocOficial.name}
    deve chamar #verificaFrenteVerso quando for frenteVerso  `, () => {
        let spy = spyOn(service['_alert'], 'alertWarning');
        service.alertNecessarioDocOficial('residencial', true);
        expect(spy).toHaveBeenCalledWith("POR FAVOR, ENVIE TODOS OS DOCUMENTOS");
    });

});




