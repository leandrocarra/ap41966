const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Recuperar Senha', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        var titleCpfCnpj = element(by.css('button.btn.btn-primary-p-green.btn-login'));
        expect(titleCpfCnpj.getText()).toEqual('ENTRAR');
        element(by.id('recuperar-senha')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 1 DE 3');
    })

    it('tc7390_RecuperarSenha_Email', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        browser.executeScript('arguments[0].click()', element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.m-0')).getWebElement());
        //Passo 2 parte 1
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 3');
        browser.executeScript('arguments[0].click()', element(by.id('email-input')).getWebElement());
        browser.executeScript('arguments[0].click()', element(by.css('.btn-neoprimary')).getWebElement());
        //Passo 2 parte 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 3');
        element(by.css('input[type="tel"]')).sendKeys('12345678');
        browser.executeScript('arguments[0].click()', element(by.css('.btn-neoprimary')).getWebElement());
    })

    it('tc7390_RecuperarSenha_SMS', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        browser.executeScript('arguments[0].click()', element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.m-0')).getWebElement());
        //Passo 2 parte 1
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 3');
        browser.executeScript('arguments[0].click()', element(by.id('sms-input')).getWebElement());
        browser.executeScript('arguments[0].click()', element(by.css('.btn-neoprimary')).getWebElement());
        //Passo 2 parte 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 3');
        element(by.css('input[type="tel"]')).sendKeys('12345678');
        browser.executeScript('arguments[0].click()', element(by.css('.btn-neoprimary')).getWebElement());
    })

    it('tc7431_RecuperarSenha_CodigoInvalido', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        browser.executeScript('arguments[0].click()', element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.m-0')).getWebElement());
        //Passo 2 parte 1
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 3');
        browser.executeScript('arguments[0].click()', element(by.id('email-input')).getWebElement());
        browser.executeScript('arguments[0].click()', element(by.css('.btn-neoprimary')).getWebElement());
        //Passo 2 parte 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 3');
        element(by.css('input[type="tel"]')).sendKeys('12345678');
        browser.executeScript('arguments[0].click()', element(by.css('.btn-neoprimary')).getWebElement());
        expect(element(by.css('.mt-3.ng-star-inserted')).getText()).toEqual('report_problem Código incorreto. Tente novamente.');
    })

    it('tc7433_RecuperarSenha_CodigoNãoRecebido', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        browser.executeScript('arguments[0].click()', element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.m-0')).getWebElement());
        //Passo 2 parte 1
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 3');
        browser.executeScript('arguments[0].click()', element(by.id('email-input')).getWebElement());
        browser.executeScript('arguments[0].click()', element(by.css('.btn-neoprimary')).getWebElement());
        //Passo 2 parte 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 3');
        element(by.css('input[type="tel"]')).sendKeys('12345678');
        browser.executeScript('arguments[0].click()', element(by.css('.btn-neoprimary')).getWebElement());
        browser.executeScript('arguments[0].click()', element(by.css('.btn.btn-outline-secondary.btn-codereceived.btn-invalidcode')).getWebElement());
        expect(element(by.css('.btn.btn-outline-secondary.btn-codereceived')).isEnabled()).toBe(false);
    })

    it('tc7437_RecuperarSenha_EnvioEmail', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        browser.executeScript('arguments[0].click()', element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.m-0')).getWebElement());
        //Passo 2 parte 1
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 3');
        browser.executeScript('arguments[0].click()', element(by.id('email-input')).getWebElement());
        expect(element(by.css('.btn-neoprimary')).isEnabled()).toBe(true);
    })

    it('tc7438_RecuperarSenha_EnvioSMS', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        browser.executeScript('arguments[0].click()', element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.m-0')).getWebElement());
        //Passo 2 parte 1
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 3');
        browser.executeScript('arguments[0].click()', element(by.id('sms-input')).getWebElement());
        expect(element(by.css('.btn-neoprimary')).isEnabled()).toBe(true);
    })

    it('tc7441_RecuperarSenha_LimparCodigoInvalido', function () {
        //Passo 1
        element(by.id('userId')).sendKeys('55240048320');
        browser.executeScript('arguments[0].click()', element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.m-0')).getWebElement());
        //Passo 2 parte 1
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 3');
        browser.executeScript('arguments[0].click()', element(by.id('email-input')).getWebElement());
        browser.executeScript('arguments[0].click()', element(by.css('.btn-neoprimary')).getWebElement());
        //Passo 2 parte 2
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        expect(element(by.css('.mb-4')).getText()).toEqual('PASSO 2 DE 3');
        element(by.css('input[type="tel"]')).sendKeys('12345678');
        browser.executeScript('arguments[0].click()', element(by.css('.btn-neoprimary')).getWebElement());
        expect(element(by.css('.mt-3.ng-star-inserted')).getText()).toEqual('report_problem Código incorreto. Tente novamente.');
        browser.executeScript('arguments[0].click()', element(by.css('.btn.btn-outline-secondary.btn-forget-password')).getWebElement());
        expect(element(by.css('.ng-star-inserted.empty')).getText()).toEqual('');
    })

    it('tc7455_RecuperarSenha_CPF_CNPJ_Vazio', function () {
        //Passo 1
        expect(element(by.css('.btn.btn-primary-p-light-green.btn-forget-password.m-0')).isEnabled()).toBe(false);
    })
})