const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Fatura Fácil - Pessoa Jurídica', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.btn.btn-outline-secondary.btn-login'))), 5000);
        element(by.cssContainingText('.btn.btn-outline-secondary.btn-login', 'fatura fácil')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mb-4', 'Fatura fácil'))), 5000);
        element(by.cssContainingText('.mat-radio-label-content', "Pessoa Jurídica")).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-tipo-pessoa', 'Acessar Faturas'))), 5000);
        
    })

    it('tc7813_FaturaFacil_PessoaJuridica', function () {
        //Digitar CNPJ e UC/contrato
        element.all(by.id('userId')).sendKeys('15502723000166');
        element(by.css('.btn.btn-primary-p-light-green.btn-tipo-pessoa')).click();
        //Tela de Fatura Fácil
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.user-greeting.ng-star-inserted'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.listagem-faturas-header', 'Faturas em Aberto')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-5.mb-5', 'Conheça as facilidades da Agência Virtual')));
        ExpectedConditions.presenceOf(element(by.css('p[text="Fatura detalhada"]')));
        ExpectedConditions.presenceOf(element(by.css('p[text="2ª via por e-mail"]')));
        ExpectedConditions.presenceOf(element(by.css('p[text="Formas de pagamento"]')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.topico-fatura-facil', 'Vencimento')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.topico-fatura-facil', 'Esta é a representação numérica do código de barras')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.topico-fatura-facil', 'Valor das faturas em aberto')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.topico-fatura-facil', 'Valor das faturas em aberto')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-button-wrapper', 'Voltar')));
    })

    it('tc7822_FaturaFacil_CNPJ_Vazio', function () {
        //Digitar CNPJ e UC/contrato
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-tipo-pessoa')).isEnabled()).toBe(false);
    })

    it('tc7826_FaturaFacil_UC_Vazio', function () {
        //Digitar CNPJ e UC/contrato
        element.all(by.id('userId')).first().sendKeys('15502723000166');
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-tipo-pessoa')).isEnabled()).toBe(false);
    })

    it('tc_FaturaFacil_copiarCodigo', function () {
        //Digitar CNPJ e UC/contrato
        element.all(by.id('userId')).sendKeys('15502723000166');
        element(by.css('.btn.btn-primary-p-light-green.btn-tipo-pessoa')).click();
        //Tela de Fatura Fácil
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.user-greeting.ng-star-inserted'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.listagem-faturas-header', 'Faturas em Aberto')));
        element(by.cssContainingText('.mat-button-wrapper', 'copiar código')).click();
        //Pop-up copiar com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.col-8', 'Copiado com sucesso!'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')));
        element(by.css('.swal2-confirm.swal2-styled')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-button-wrapper', 'copiar código'))), 5000);
    })

    it('tc_FaturaFacil_vizualizar', function () {
        //Digitar CNPJ e UC/contrato
        element.all(by.id('userId')).sendKeys('15502723000166');
        element(by.css('.btn.btn-primary-p-light-green.btn-tipo-pessoa')).click();
        //Tela de Fatura Fácil
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.user-greeting.ng-star-inserted'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.listagem-faturas-header', 'Faturas em Aberto')));
        element(by.cssContainingText('.mat-button-wrapper', 'visualizar')).click();
        //Pop-up visualizar
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.col-8', 'Informações da fatura'))), 5000);
        ExpectedConditions.presenceOf(element(by.id('copy')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.h4', 'FECHAR')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'Pague com internet banking')));
        expect(element(by.css('p[text="Selecione um dos bancos abaixo ou procure um de sua preferência:"]')));
        expect(element(by.css('span[text="Itaú"]')));
        expect(element(by.css('span[text="Bradesco"]')));
        expect(element(by.css('span[text="Caixa"]')));
        expect(element(by.css('span[text="Banco do Brasil"]')));
        expect(element(by.css('span[text="Santander"]')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')));
        element(by.css('.swal2-confirm.swal2-styled')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-button-wrapper', 'visualizar'))), 5000);
    })
})