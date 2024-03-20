const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Seleção Imóvel Grupo A', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        var titleCpfCnpj = element(by.css('button.btn.btn-primary-p-green.btn-login'));
        expect(titleCpfCnpj.getText()).toEqual('ENTRAR');
        element(by.id('userId')).sendKeys('15502723000166');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());   
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 5000);  
        expect(browser.getCurrentUrl()).not.toEqual("https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/login");
    })

    it('tc7496_selecionarImovelA_FluxoBasico', function () {
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.col-10.row')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc7510_selecionarImovelA_LigacaoNova', function () {
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        expect(element(by.css('.btn.btn-solicitar-ligacao')).getText()).toEqual('SOLICITAR LIGAÇÃO NOVA');
    })

    it('tc7514_selecionarImovelA_FiltrarUC', function () {
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('input[type="text"]')).sendKeys('0067171981');
        expect(element(by.css('.unidade-consumidora-value')).getText()).not.toEqual('0067171985');
    })

    it('tc7515_selecionarImovelA_FiltrarSituacaoImovel', function () {
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.mat-select-value')).click();
        element(by.cssContainingText('.mat-option-text', 'Suspenso')).click();
        expect(element(by.css('.btn.btn-primary-p-green.btn-status-imovel.status-span.suspenso')).getText()).toEqual('SUSPENSO');
    })

    it('tc7514_selecionarImovelA_FiltrarEndereco', function () {
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('input[type="text"]')).sendKeys('Vila Rocha');
        expect(element(by.css('.unidade-consumidora-value')).getText()).toEqual('0067171985');
    })
})