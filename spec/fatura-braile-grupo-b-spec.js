const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Fatura em Braile Grupo B', function() {
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
    })

    it('tc9710_faturaBraileGrupoB_fluxoBasico', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Fatura em braile'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Fatura em braile')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Fatura em Braile'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura em Braile')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referentes ao recebimento das faturas em braile:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mt-4.subtitulo-h6', 'Sua forma de recebimento primário de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.cssContainingText('.mt-5.mb-0.subtitulo-h6', 'Serviço de faturas em braile:')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CADASTRAR FATURA EM BRAILE')).isDisplayed());
        element(by.buttonText('CADASTRAR FATURA EM BRAILE')).click();
        //Tela de questionamento se deseja cadastrar fatura em braile
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Deseja cadastrar a fatura em braile?'))), 5000);
        expect(element(by.cssContainingText('.col-12.col-lg-10.ps-0.subtitulo.mt-3.mb-3', 'Para portadores de deficiência visual, disponibilizamos a versão da fatura em braile.')).isDisplayed());
        expect(element(by.buttonText('EFETUAR O CADASTRO')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        element(by.buttonText('EFETUAR O CADASTRO')).click();
        //Tela de solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle.flex', 'Fatura em Braile')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.title.col-6.p-0', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.title.col-6.p-0', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.title-protocolo', 'Protocolo Informativo: 123456')).isDisplayed());
    })

    it('tc9711_faturaBraileGrupoB_cancelar', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Fatura em braile'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Fatura em braile')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Fatura em Braile'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura em Braile')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referentes ao recebimento das faturas em braile:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mt-4.subtitulo-h6', 'Sua forma de recebimento primário de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.cssContainingText('.mt-5.mb-0.subtitulo-h6', 'Serviço de faturas em braile:')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CADASTRAR FATURA EM BRAILE')).isDisplayed());
        element(by.buttonText('CADASTRAR FATURA EM BRAILE')).click();
        //Tela de questionamento se deseja cadastrar fatura em braile
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Deseja cadastrar a fatura em braile?'))), 5000);
        expect(element(by.cssContainingText('.col-12.col-lg-10.ps-0.subtitulo.mt-3.mb-3', 'Para portadores de deficiência visual, disponibilizamos a versão da fatura em braile.')).isDisplayed());
        expect(element(by.buttonText('EFETUAR O CADASTRO')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        element(by.buttonText('CANCELAR')).click();
        //Pop-up de confirmação
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Tem certeza que deseja cancelar esta solicitação?'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Todas as informações prenchidas serão perdidas.')).isDisplayed());
        expect(element(by.buttonText('SIM')).isDisplayed());
        expect(element(by.buttonText('NÃO')).isDisplayed());
        element(by.buttonText('SIM')).click();
        //Retorna para a Home
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc9712_faturaBraileGrupoB_voltarCadastro', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Fatura em braile'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Fatura em braile')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Fatura em Braile'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura em Braile')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referentes ao recebimento das faturas em braile:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mt-4.subtitulo-h6', 'Sua forma de recebimento primário de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.cssContainingText('.mt-5.mb-0.subtitulo-h6', 'Serviço de faturas em braile:')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CADASTRAR FATURA EM BRAILE')).isDisplayed());
        element(by.buttonText('VOLTAR')).click();
        //Retorna para a Home
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })
})
