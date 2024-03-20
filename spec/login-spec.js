const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Tela de Login', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        var titleCpfCnpj = element(by.css('button.btn.btn-primary-p-green.btn-login'));
        expect(titleCpfCnpj.getText()).toEqual('ENTRAR');
    })

    it('tc7385_loginPessoaFisica', function() {
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.sleep(5000);
        expect(browser.getCurrentUrl()).not.toEqual("https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/login");
        //element(by.css('h6.group-a-text-lightgreen')).isDisplayed;
    })

    it('tc7386_loginPessoaJuridica', function() {
        element(by.id('userId')).sendKeys('15502723000166');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.sleep(5000);
        expect(browser.getCurrentUrl()).not.toEqual("https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/login");
        //element(by.css('h6.group-a-text-lightgreen')).isDisplayed;
    })

    it('tc7389_loginCPF_Vazio', function() {
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.sleep(2000);
        var mensagemErro = element(by.css('.m-custom1'));
        expect(mensagemErro.getText()).toEqual('Dados incorretos, por favor tente novamente!');
    })

    it('tc7389_loginCNPJ_Vazio', function() {
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.sleep(2000);
        var mensagemErro = element(by.css('.m-custom1'));
        expect(mensagemErro.getText()).toEqual('Dados incorretos, por favor tente novamente!');
    })

    it('tc7391_senhaVazio', function() {
        element(by.id('userId')).sendKeys('55240048320');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.sleep(2000);
        var mensagemErro = element(by.css('.m-custom1'));
        expect(mensagemErro.getText()).toEqual('Dados incorretos, por favor tente novamente!');
    })

    it('tc7399_cpfInvalido', function() {
        element(by.id('userId')).sendKeys('91798436035');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.sleep(5000);
        var mensagemErro = element(by.css('.m-custom1'));
        expect(mensagemErro.getText()).toEqual('CPF/CNPJ, e-mail ou senha não conferem');
    })
    it('tc7399_cnpjInvalido', function() {
        element(by.id('userId')).sendKeys('95162458000153');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.sleep(5000);
        var mensagemErro = element(by.css('.m-custom1'));
        expect(mensagemErro.getText()).toEqual('CPF/CNPJ, e-mail ou senha não conferem');
    })

    it('tc7448_cpfIncompleto', function() {
        element(by.id('userId')).sendKeys('55240');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.sleep(5000);
        var mensagemErro = element(by.css('.m-custom1'));
        expect(mensagemErro.getText()).toEqual('Dados incorretos, por favor tente novamente!');
    })

    it('tc7449_cnpjIncompleto', function() {
        element(by.id('userId')).sendKeys('15502723');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.sleep(5000);
        var mensagemErro = element(by.css('.m-custom1'));
        expect(mensagemErro.getText()).toEqual('Dados incorretos, por favor tente novamente!');
    })

    it('tc11808_usuarioSenhaNaoCoincidemPF', function() {
        element(by.id('userId')).sendKeys('91798436035');
        element(by.id('password')).sendKeys('Elektro556');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.sleep(5000);
        var mensagemErro = element(by.css('.m-custom1'));
        expect(mensagemErro.getText()).toEqual('CPF/CNPJ, e-mail ou senha não conferem');
    })

    it('tc12991_usuarioSenhaNaoCoincidemPJ', function() {
        element(by.id('userId')).sendKeys('47562626000155');
        element(by.id('password')).sendKeys('Elektro556');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.sleep(5000);
        var mensagemErro = element(by.css('.m-custom1'));
        expect(mensagemErro.getText()).toEqual('CPF/CNPJ, e-mail ou senha não conferem');
    })

    it('tc12992_senhaIncompleta', function() {
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('password')).sendKeys('Elektro2');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.sleep(5000);
        var mensagemErro = element(by.css('.m-custom1'));
        expect(mensagemErro.getText()).toEqual('Dados incorretos, por favor tente novamente!');
    })

});