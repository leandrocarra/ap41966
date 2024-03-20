const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Débito Automático', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        var titleCpfCnpj = element(by.css('button.btn.btn-primary-p-green.btn-login'));
        expect(titleCpfCnpj.getText()).toEqual('ENTRAR');
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());   
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 5000);  
        expect(browser.getCurrentUrl()).not.toEqual("https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/login");
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.col-10.row')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Débito automático')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloH2'))), 5000);
        expect(element(by.id('tituloH2')).getText()).toEqual('Forma de pagamento');
    })

    it('tc7665_debitoAutomatico_fluxoBasico', function () {
        //Tela de cadastro
        element(by.css('.btn-neoprimary')).click();
        //Tela de dados bancários
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloH2'))), 5000);
        expect(element(by.id('tituloH2')).getText()).toEqual('Cadastre-se no débito automático');
        element(by.id('banco')).click();
        element(by.cssContainingText('.mat-option-text', 'BANCO INTER S.A')).click();
        element(by.id('agencia')).sendKeys('1234');
        element(by.id('conta')).sendKeys('12345678');
        element(by.css('.btn-neoprimary')).click();
        //Tela de conferência dos dabos de débito automático
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloH2'))), 5000);
        expect(element(by.id('tituloH2')).getText()).toEqual('Confira os dados cadastrados no débito automático');
        expect(element(by.cssContainingText('.col-6.p-0', '077 - BANCO INTER S.A')));
        expect(element(by.cssContainingText('.col-6.p-0', '1234')));
        expect(element(by.cssContainingText('.col-6.p-0', '12345678')));
        element(by.css('.btn-neoprimary')).click();
        //Tela de envio com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-group-b'))), 5000);
        expect(element(by.css('.color-group-b')).getText()).toEqual('Sua solicitação foi enviada com sucesso!');
        expect(element(by.css('.texto-atencao.m-1')).getText()).toEqual('O débito automático vai ocorrer a partir da próxima fatura deste imóvel');
    })

    it('tc7673_debitoAutomatico_SemSelecionarBanco', function () {
        //Tela de Cadastro
        element(by.css('.btn-neoprimary')).click();
        //Tela de dados bancários
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloH2'))), 5000);
        expect(element(by.id('tituloH2')).getText()).toEqual('Cadastre-se no débito automático');
        element(by.id('agencia')).sendKeys('1234');
        element(by.id('conta')).sendKeys('12345678');
        expect(element(by.css('.btn-neoprimary')).isEnabled()).toBe(false);
    })

    it('tc7674_debitoAutomatico_SemPreencherAgencia', function () {
        //Tela de cadastro
        element(by.css('.btn-neoprimary')).click();
        //Tela de dados bancários
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloH2'))), 5000);
        expect(element(by.id('tituloH2')).getText()).toEqual('Cadastre-se no débito automático');
        element(by.id('banco')).click();
        element(by.cssContainingText('.mat-option-text', 'BANCO INTER S.A')).click();
        element(by.id('conta')).sendKeys('12345678');
        expect(element(by.css('.btn-neoprimary')).isEnabled()).toBe(false);
    })

    it('tc7675_debitoAutomatico_SemPreencherConta', function () {
        //Tela de cadastro
        element(by.css('.btn-neoprimary')).click();
        //Tela de dados bancários
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloH2'))), 5000);
        expect(element(by.id('tituloH2')).getText()).toEqual('Cadastre-se no débito automático');
        element(by.id('banco')).click();
        element(by.cssContainingText('.mat-option-text', 'BANCO INTER S.A')).click();
        element(by.id('agencia')).sendKeys('1234');
        expect(element(by.css('.btn-neoprimary')).isEnabled()).toBe(false);
    })

    it('tc7676_debitoAutomatico_SemPreencherDigitoConta', function () {
        //Tela de cadastro
        element(by.css('.btn-neoprimary')).click();
        //Tela de dados bancários
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloH2'))), 5000);
        expect(element(by.id('tituloH2')).getText()).toEqual('Cadastre-se no débito automático');
        element(by.id('banco')).click();
        element(by.cssContainingText('.mat-option-text', 'BANCO INTER S.A')).click();
        element(by.id('agencia')).sendKeys('1234');
        element(by.id('conta')).sendKeys('1234567');
        expect(element(by.css('.btn-neoprimary')).isEnabled()).toBe(false);
    })

    it('tc7677_debitoAutomatico_DigitarLetrasAgencia', function () {
        //Tela de cadastro
        element(by.css('.btn-neoprimary')).click();
        //Tela de dados bancários
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloH2'))), 5000);
        expect(element(by.id('tituloH2')).getText()).toEqual('Cadastre-se no débito automático');
        element(by.id('banco')).click();
        element(by.cssContainingText('.mat-option-text', 'BANCO INTER S.A')).click();
        element(by.id('agencia')).sendKeys('abcd');
        element(by.id('conta')).sendKeys('12345678');
        expect(element(by.css('.btn-neoprimary')).isEnabled()).toBe(false);
    })

    it('tc7678_debitoAutomatico_DigitarLetrasConta', function () {
        //Tela de cadastro
        element(by.css('.btn-neoprimary')).click();
        //Tela de dados bancários
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloH2'))), 5000);
        expect(element(by.id('tituloH2')).getText()).toEqual('Cadastre-se no débito automático');
        element(by.id('banco')).click();
        element(by.cssContainingText('.mat-option-text', 'BANCO INTER S.A')).click();
        element(by.id('agencia')).sendKeys('1234');
        element(by.id('conta')).sendKeys('abcdefgh');
        expect(element(by.css('.btn-neoprimary')).isEnabled()).toBe(false);
    })
})