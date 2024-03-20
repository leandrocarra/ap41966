const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Memória de Massa', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        var titleCpfCnpj = element(by.css('button.btn.btn-primary-p-green.btn-login'));
        expect(titleCpfCnpj.getText()).toEqual('ENTRAR');
        element(by.id('userId')).sendKeys('11111111111111');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 5000);
        expect(browser.getCurrentUrl()).not.toEqual("https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/login");
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.col-10.row')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.text-black'))), 5000);
        expect(element(by.css('.text-black')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc9554_memoriaMassa_maisServicosAVencer', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.meu-perfil-header', 'MEU PERFIL DE CONSUMO')).isDisplayed());
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-option-text', 'A Vencer')).getWebElement());
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-blue-royal-100', 'A vencer'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Solicitar memória de massa')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Solicitar memória de massa')).getWebElement());
        //Tela de memória de massa
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element(by.css('.mat-select-arrow-wrapper')).click();
        element(by.cssContainingText('.mat-option-text', '1 minuto')).click();
        var intervalo = element(by.cssContainingText('.mat-option-text', '1 minuto')).getText();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        expect(element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).isDisplayed());
        var email = element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).getAttribute('ng-reflect-value');
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA INICIAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA FINAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'INTERVALO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', intervalo)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'EMAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', email)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'VALOR DA TAXA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', taxa)).isDisplayed());
    })

    it('tc9556_memoriaMassa_maisServicosAtrasadas', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.meu-perfil-header', 'MEU PERFIL DE CONSUMO')).isDisplayed());
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-option-text', 'Atrasada')).getWebElement());
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-red-200', 'Atrasada'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Solicitar memória de massa')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Solicitar memória de massa')).getWebElement());
        //Tela de memória de massa
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element(by.css('.mat-select-arrow-wrapper')).click();
        element(by.cssContainingText('.mat-option-text', '1 minuto')).click();
        var intervalo = element(by.cssContainingText('.mat-option-text', '1 minuto')).getText();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        expect(element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).isDisplayed());
        var email = element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).getAttribute('ng-reflect-value');
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA INICIAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA FINAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'INTERVALO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', intervalo)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'EMAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', email)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'VALOR DA TAXA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', taxa)).isDisplayed());
    })

    it('tc9557_memoriaMassa_maisServicosProcessando', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.meu-perfil-header', 'MEU PERFIL DE CONSUMO')).isDisplayed());
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-option-text', 'Processando')).getWebElement());
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-light-blue-100', 'Processando'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Solicitar memória de massa')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Solicitar memória de massa')).getWebElement());
        //Tela de memória de massa
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element(by.css('.mat-select-arrow-wrapper')).click();
        element(by.cssContainingText('.mat-option-text', '1 minuto')).click();
        var intervalo = element(by.cssContainingText('.mat-option-text', '1 minuto')).getText();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        expect(element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).isDisplayed());
        var email = element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).getAttribute('ng-reflect-value');
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA INICIAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA FINAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'INTERVALO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', intervalo)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'EMAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', email)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'VALOR DA TAXA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', taxa)).isDisplayed());
    })

    it('tc9558_memoriaMassa_maisServicosPagas', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.meu-perfil-header', 'MEU PERFIL DE CONSUMO')).isDisplayed());
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-option-text', 'Paga')).getWebElement());
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-green-sage-100', 'Paga'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Solicitar memória de massa')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Solicitar memória de massa')).getWebElement());
        //Tela de memória de massa
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element(by.css('.mat-select-arrow-wrapper')).click();
        element(by.cssContainingText('.mat-option-text', '1 minuto')).click();
        var intervalo = element(by.cssContainingText('.mat-option-text', '1 minuto')).getText();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        expect(element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).isDisplayed());
        var email = element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).getAttribute('ng-reflect-value');
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA INICIAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA FINAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'INTERVALO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', intervalo)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'EMAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', email)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'VALOR DA TAXA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', taxa)).isDisplayed());
    })

    it('tc9559_memoriaMassa_maisServicosVinculadas', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.meu-perfil-header', 'MEU PERFIL DE CONSUMO')).isDisplayed());
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-option-text', 'Vinculada')).getWebElement());
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-black-100', 'Vinculada'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Solicitar memória de massa')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Solicitar memória de massa')).getWebElement());
        //Tela de memória de massa
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element(by.css('.mat-select-arrow-wrapper')).click();
        element(by.cssContainingText('.mat-option-text', '1 minuto')).click();
        var intervalo = element(by.cssContainingText('.mat-option-text', '1 minuto')).getText();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        expect(element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).isDisplayed());
        var email = element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).getAttribute('ng-reflect-value');
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(true));
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA INICIAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA FINAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'INTERVALO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', intervalo)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'EMAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', email)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'VALOR DA TAXA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', taxa)).isDisplayed());
    })

    it('tc9563_memoriaMassa_dataInicialMaiorDataFinal', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element.all(by.buttonText('CONFIRMAR'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Data final não pode ser menor que a inicial'))), 5000);
        expect(element(by.buttonText('FECHAR')).isDisplayed());
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
    })

    it('tc9570_memoriaMassa_alterarEmailCadastrado', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element.all(by.buttonText('CONFIRMAR'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element(by.css('.mat-select-arrow-wrapper')).click();
        element(by.cssContainingText('.mat-option-text', '1 minuto')).click();
        var intervalo = element(by.cssContainingText('.mat-option-text', '1 minuto')).getText();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        element(by.cssContainingText('.alterar-entrega.pe-0', 'Alterar')).click();
        //Tela alterar e-mail
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.mt-3.mb-4', 'E-MAIL:'))), 5000);
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var email = 'teste@teste.com'
        element(by.id('email')).sendKeys(email);
        element(by.id('confirmarEmail')).sendKeys(email);
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Voltar para a tela de memória de massa
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        expect(element(by.css('input[ng-reflect-value="' + email + '"]')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(true));
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA INICIAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA FINAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'INTERVALO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', intervalo)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'EMAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', email)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'VALOR DA TAXA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', taxa)).isDisplayed());
    })

    it('tc9618_memoriaMassa_1minutoIntervalo', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element.all(by.buttonText('CONFIRMAR'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element(by.css('.mat-select-arrow-wrapper')).click();
        element(by.cssContainingText('.mat-option-text', '1 minuto')).click();
        var intervalo = element(by.cssContainingText('.mat-option-text', '1 minuto')).getText();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        expect(element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).isDisplayed());
        var email = element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).getAttribute('ng-reflect-value');
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(true));
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA INICIAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA FINAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'INTERVALO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', intervalo)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'EMAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', email)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'VALOR DA TAXA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', taxa)).isDisplayed());
    })

    it('tc9619_memoriaMassa_5minutosIntervalo', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element.all(by.buttonText('CONFIRMAR'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element(by.css('.mat-select-arrow-wrapper')).click();
        element(by.cssContainingText('.mat-option-text', '5 minutos')).click();
        var intervalo = element(by.cssContainingText('.mat-option-text', '5 minutos')).getText();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        expect(element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).isDisplayed());
        var email = element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).getAttribute('ng-reflect-value');
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(true));
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA INICIAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA FINAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'INTERVALO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', intervalo)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'EMAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', email)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'VALOR DA TAXA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', taxa)).isDisplayed());
    })

    it('tc9620_memoriaMassa_10minutosIntervalo', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element.all(by.buttonText('CONFIRMAR'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element(by.css('.mat-select-arrow-wrapper')).click();
        element(by.cssContainingText('.mat-option-text', '10 minutos')).click();
        var intervalo = element(by.cssContainingText('.mat-option-text', '10 minutos')).getText();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        expect(element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).isDisplayed());
        var email = element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).getAttribute('ng-reflect-value');
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(true));
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA INICIAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA FINAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'INTERVALO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', intervalo)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'EMAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', email)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'VALOR DA TAXA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', taxa)).isDisplayed());
    })

    it('tc9621_memoriaMassa_15minutosIntervalo', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element.all(by.buttonText('CONFIRMAR'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element(by.css('.mat-select-arrow-wrapper')).click();
        element(by.cssContainingText('.mat-option-text', '15 minutos')).click();
        var intervalo = element(by.cssContainingText('.mat-option-text', '15 minutos')).getText();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        expect(element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).isDisplayed());
        var email = element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).getAttribute('ng-reflect-value');
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(true));
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA INICIAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DATA FINAL')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'INTERVALO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', intervalo)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'EMAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', email)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'VALOR DA TAXA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', taxa)).isDisplayed());
    })

    it('tc9622_memoriaMassa_alterarEmailCadastrado_emailInvalido', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element.all(by.buttonText('CONFIRMAR'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element(by.css('.mat-select-arrow-wrapper')).click();
        element(by.cssContainingText('.mat-option-text', '1 minuto')).click();
        var intervalo = element(by.cssContainingText('.mat-option-text', '1 minuto')).getText();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        element(by.cssContainingText('.alterar-entrega.pe-0', 'Alterar')).click();
        //Tela alterar e-mail
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.mt-3.mb-4', 'E-MAIL:'))), 5000);
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var email = 'teste'
        element(by.id('email')).sendKeys(email);
        element(by.id('confirmarEmail')).click();
        element(by.id('confirmarEmail')).sendKeys('teste@teste.com');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'E-mail inválido')).isDisplayed());
    })

    it('tc9623_memoriaMassa_alterarEmailCadastrado_confirmarEmailInvalido', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element.all(by.buttonText('CONFIRMAR'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element(by.css('.mat-select-arrow-wrapper')).click();
        element(by.cssContainingText('.mat-option-text', '1 minuto')).click();
        var intervalo = element(by.cssContainingText('.mat-option-text', '1 minuto')).getText();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        element(by.cssContainingText('.alterar-entrega.pe-0', 'Alterar')).click();
        //Tela alterar e-mail
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.mt-3.mb-4', 'E-MAIL:'))), 5000);
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var email = 'teste'
        element(by.id('email')).sendKeys('teste@teste.com');
        element(by.id('confirmarEmail')).sendKeys(email);
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'Os e-mails não conferem. Tente novamente')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc9647_memoriaMassa_semSelecionarIntervalo', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element.all(by.buttonText('CONFIRMAR'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'VALOR DA TAXA')));
        expect(element(by.css('input[ng-reflect-value="R$68,00"]')).isDisplayed());
        var taxa = element(by.css('input[ng-reflect-value="R$68,00"]')).getAttribute('ng-reflect-value');
        expect(element(by.cssContainingText('.subtitulo.mb-0', 'E-MAIL PARA RECEBIMENTO')).isDisplayed());
        expect(element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).isDisplayed());
        var email = element(by.css('input[ng-reflect-value="joaovicente2@gmail.com"]')).getAttribute('ng-reflect-value');
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
    })

    it('tc9648_memoriaMassa_anoDataInicialMenorDataAtual', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar memória de massa')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element.all(by.buttonText('CONFIRMAR'))), 5000);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '26')).click();
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Data final não pode ser menor que a inicial'))), 5000);
        expect(element(by.buttonText('FECHAR')).isDisplayed());
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ng-star-inserted', 'Solicitar memória de massa'))), 5000);
    })

})
