const { browser, element } = require("protractor");
var originalTimeout;

describe('Seleção Imóvel Grupo B', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('http://localhost:4200/#/login');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        var titleCpfCnpj = element(by.css('button.btn.btn-primary-p-green.btn-login'));
        expect(titleCpfCnpj.getText()).toEqual('ENTRAR');
        element(by.id('userId')).sendKeys('19935193861');
        element(by.id('password')).sendKeys('QAZneoenergia@1');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());   
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 30000);  
        expect(browser.getCurrentUrl()).not.toEqual("http://localhost:4200/#/login");
    })

    it('tc7504_selecionarImovelB_FluxoBasicoCPF', function () {
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.col-10.row')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc7601_selecionarImovelB_LigacaoNova', function () {
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        expect(element(by.css('.btn.btn-solicitar-ligacao')).getText()).toEqual('SOLICITAR LIGAÇÃO NOVA');
    })

    it('tc7602_selecionarImovelB_FiltrarUC', function () {
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('input[type="text"]')).sendKeys('29645581');
        var quantidade = element.all(by.css('.unidade-consumidora-value')).getText();
        expect(quantidade.count()).toBe(1);
    })

    it('tc7603_selecionarImovelB_FiltrarSituacaoImovel', function () {
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.mat-select-value')).click();
        element(by.cssContainingText('.mat-option-text', 'Cortado')).click();
        expect(element(by.css('.btn.btn-primary-p-green.btn-status-imovel.status-span.cortado')).getText()).toEqual('CORTADA');
    })

    it('tc7604_selecionarImovelB_FiltrarEndereco', function () {
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('input[type="text"]')).sendKeys('R. da Casa Amarela');
        expect(element(by.cssContainingText('.col-12.col-md-8.col-lg-7.endereco', 'R. da Casa Amarela')).isPresent());
    })
})