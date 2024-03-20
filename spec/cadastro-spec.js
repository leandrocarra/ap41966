const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Tela de Cadastro', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        var titleCpfCnpj = element(by.css('button.btn.btn-primary-p-green.btn-login'));
        expect(titleCpfCnpj.getText()).toEqual('ENTRAR');
        element(by.id('cadastro')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 1 DE 4');
    })

    it('tc7346_cadastroCPF_Email', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 4');
        element(by.id('fullName')).sendKeys('Cenario Teste');
        element(by.id('mat-select-0')).click();
        element(by.css('.mat-option-text')).click();
        element(by.css('.mat-button-wrapper')).click();
        element(by.cssContainingText('.mat-button-wrapper', ' AGO. DE 2021 ')).click();
        element(by.css('.mat-calendar-previous-button.mat-focus-indicator.mat-icon-button.mat-button-base')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 1999 ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' OUT. ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 10 ')).click();
        element(by.id('tel')).sendKeys('81988036974');
        element(by.id('rg')).sendKeys('1234567');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo3
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 3 DE 4');
        element(by.id('password')).sendKeys('Elektro21');
        element(by.id('password2')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo 4
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 4 DE 4');
        browser.executeScript('arguments[0].click()', element(by.id('email-input')).getWebElement());
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Conclusão
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.text-center.mb-4.d-flex.flex-nowrap.justify-content-center'))), 5000);
        expect(element(by.css('.text-center.mb-4.d-flex.flex-nowrap.justify-content-center')).getText()).toEqual('Seja bem-vindo(a)!');
    })

    it('tc7348_cadastroCPF_SMS', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 4');
        element(by.id('fullName')).sendKeys('Cenario Teste');
        element(by.id('mat-select-0')).click();
        element(by.css('.mat-option-text')).click();
        element(by.css('.mat-button-wrapper')).click();
        element(by.cssContainingText('.mat-button-wrapper', ' AGO. DE 2021 ')).click();
        element(by.css('.mat-calendar-previous-button.mat-focus-indicator.mat-icon-button.mat-button-base')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 1999 ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' OUT. ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 10 ')).click();
        element(by.id('tel')).sendKeys('81988036974');
        element(by.id('rg')).sendKeys('1234567');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo3
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 3 DE 4');
        element(by.id('password')).sendKeys('Elektro21');
        element(by.id('password2')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo 4
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 4 DE 4');
        browser.executeScript('arguments[0].click()', element(by.id('sms-input')).getWebElement());
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Conclusão
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.text-center.mb-4.d-flex.flex-nowrap.justify-content-center'))), 5000);
        expect(element(by.css('.text-center.mb-4.d-flex.flex-nowrap.justify-content-center')).getText()).toEqual('Seja bem-vindo(a)!');
    })

    it('tc7349_cadastroCNPJ_Imobiliaria', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('15502723000166');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        browser.executeScript('arguments[0].click()', element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Se é imobiliária
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.text-center.mb-4.d-flex.flex-nowrap.justify-content-center.color-orange'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('Sua empresa é uma imobiliária?');
        var botaoSim = element(by.cssContainingText('.btn.btn-outline-secondary.btn-voltar', ' SIM '));
        botaoSim.click();
        //browser.executeScript('arguments[0].click()', element(by.css('')).getWebElement());
        //Informativo Cadastro Imobiliária
        //browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        //expect(element(by.css('.mb-4')).getText()).toEqual('Cadastro de imobiliária');
        browser.sleep(5000);
    })

    it('tc7403_erroFormatacaoSenha_MinimoCaracteres', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 4');
        element(by.id('fullName')).sendKeys('Cenario Teste');
        element(by.id('mat-select-0')).click();
        element(by.css('.mat-option-text')).click();
        element(by.css('.mat-button-wrapper')).click();
        element(by.cssContainingText('.mat-button-wrapper', ' AGO. DE 2021 ')).click();
        element(by.css('.mat-calendar-previous-button.mat-focus-indicator.mat-icon-button.mat-button-base')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 1999 ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' OUT. ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 10 ')).click();
        element(by.id('tel')).sendKeys('81988036974');
        element(by.id('rg')).sendKeys('1234567');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo3
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 3 DE 4');
        element(by.id('password')).sendKeys('Elek');
        element(by.id('password2')).sendKeys('Elektro21');
        expect(element(by.css('.not-according-criteria')).getText()).toEqual('report_problem As informações de acesso fornecidas não são válidas. Tente novamente.');
    })

    it('tc7404_erroFormatacaoSenha_CaracteresNumericosSequencia', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 4');
        element(by.id('fullName')).sendKeys('Cenario Teste');
        element(by.id('mat-select-0')).click();
        element(by.css('.mat-option-text')).click();
        element(by.css('.mat-button-wrapper')).click();
        element(by.cssContainingText('.mat-button-wrapper', ' AGO. DE 2021 ')).click();
        element(by.css('.mat-calendar-previous-button.mat-focus-indicator.mat-icon-button.mat-button-base')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 1999 ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' OUT. ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 10 ')).click();
        element(by.id('tel')).sendKeys('81988036974');
        element(by.id('rg')).sendKeys('1234567');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo3
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 3 DE 4');
        element(by.id('password')).sendKeys('Elektro1234');
        element(by.id('password2')).sendKeys('Elektro1234');
        expect(element(by.css('.not-according-criteria')).getText()).toEqual('close');
    })

    it('tc7406_erroFormatacaoSenha_RepeticaoCaracteresNumericos', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 4');
        element(by.id('fullName')).sendKeys('Cenario Teste');
        element(by.id('mat-select-0')).click();
        element(by.css('.mat-option-text')).click();
        element(by.css('.mat-button-wrapper')).click();
        element(by.cssContainingText('.mat-button-wrapper', ' AGO. DE 2021 ')).click();
        element(by.css('.mat-calendar-previous-button.mat-focus-indicator.mat-icon-button.mat-button-base')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 1999 ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' OUT. ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 10 ')).click();
        element(by.id('tel')).sendKeys('81988036974');
        element(by.id('rg')).sendKeys('1234567');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo3
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 3 DE 4');
        element(by.id('password')).sendKeys('Elektro2222');
        element(by.id('password2')).sendKeys('Elektro2222');
        expect(element(by.css('.not-according-criteria')).getText()).toEqual('close');
    })

    it('tc7407_erroFormatacaoSenha_ParteCPFnaSenha', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 4');
        element(by.id('fullName')).sendKeys('Cenario Teste');
        element(by.id('mat-select-0')).click();
        element(by.css('.mat-option-text')).click();
        element(by.css('.mat-button-wrapper')).click();
        element(by.cssContainingText('.mat-button-wrapper', ' AGO. DE 2021 ')).click();
        element(by.css('.mat-calendar-previous-button.mat-focus-indicator.mat-icon-button.mat-button-base')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 1999 ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' OUT. ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 10 ')).click();
        element(by.id('tel')).sendKeys('81988036974');
        element(by.id('rg')).sendKeys('1234567');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo3
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 3 DE 4');
        element(by.id('password')).sendKeys('Elektro55240');
        element(by.id('password2')).sendKeys('Elektro55240');
        expect(element(by.css('.not-according-criteria')).getText()).toEqual('close');
    })

    it('tc7411_erroCadastroCPF_NomeVazio', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 4');
        element(by.id('mat-select-0')).click();
        element(by.css('.mat-option-text')).click();
        element(by.css('.mat-button-wrapper')).click();
        element(by.cssContainingText('.mat-button-wrapper', ' AGO. DE 2021 ')).click();
        element(by.css('.mat-calendar-previous-button.mat-focus-indicator.mat-icon-button.mat-button-base')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 1999 ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' OUT. ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 10 ')).click();
        element(by.id('tel')).sendKeys('81988036974');
        element(by.id('rg')).sendKeys('1234567');
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).isEnabled()).toBe(false);
    })

    it('tc7414_erroCadastroCPF_RGVazio', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 4');
        element(by.id('fullName')).sendKeys('Cenario Teste');
        element(by.id('mat-select-0')).click();
        element(by.css('.mat-option-text')).click();
        element(by.css('.mat-button-wrapper')).click();
        element(by.cssContainingText('.mat-button-wrapper', ' AGO. DE 2021 ')).click();
        element(by.css('.mat-calendar-previous-button.mat-focus-indicator.mat-icon-button.mat-button-base')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 1999 ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' OUT. ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 10 ')).click();
        element(by.id('tel')).sendKeys('81988036974');
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).isEnabled()).toBe(false);
    })

    it('tc7416_erroCadastroCPF_DataNascimentoVazio', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 4');
        element(by.id('fullName')).sendKeys('Cenario Teste');
        element(by.id('mat-select-0')).click();
        element(by.css('.mat-option-text')).click();
        element(by.id('tel')).sendKeys('81988036974');
        element(by.id('rg')).sendKeys('1234567');
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).isEnabled()).toBe(false);
    })

    it('tc7420_erroCadastroCPF_CelularVazio', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        browser.executeScript('arguments[0].click()', element(by.css('button.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).getWebElement());
        //Passo 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 4');
        element(by.id('fullName')).sendKeys('Cenario Teste');
        element(by.id('mat-select-0')).click();
        element(by.css('.mat-option-text')).click();
        element(by.css('.mat-button-wrapper')).click();
        element(by.cssContainingText('.mat-button-wrapper', ' AGO. DE 2021 ')).click();
        element(by.css('.mat-calendar-previous-button.mat-focus-indicator.mat-icon-button.mat-button-base')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 1999 ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' OUT. ')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', ' 10 ')).click();
        element(by.id('rg')).sendKeys('1234567');
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).isEnabled()).toBe(false);
    })

    it('tc7427_erroCadastroCPF_CPFVazio', function () {
        //Passo 1
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).isEnabled()).toBe(false);
    })

    it('tc7428_erroCadastroCPF_EmailVazio', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).isEnabled()).toBe(false);
    })

    it('tc7432_erroCadastroCPF_EmailConfirmacaoVazio', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).isEnabled()).toBe(false);
    })

    it('tc7433_erroCadastroCPF_EmailConfirmacaoDiferente', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('diferente@gmail.com');
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).isEnabled()).toBe(false);
    })

    it('tc7469_erroCadastroCPF_CPF_Invalido', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('552400');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).isEnabled()).toBe(false);
    })

    it('tc7470_erroCadastroCNPJ_CNPJ_Invalido', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('213233123456');
        element(by.id('email')).sendKeys('cpbhom@gmail.com');
        element(by.id('confirmEmail')).sendKeys('cpbhom@gmail.com');
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.me-md-3.m-0')).isEnabled()).toBe(false);
    })
})
