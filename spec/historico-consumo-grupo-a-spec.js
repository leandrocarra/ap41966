const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Histórico de Consumo Grupo A SE', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtual/');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        var titleCpfCnpj = element(by.css('button.btn.btn-primary-p-green.btn-login'));
        expect(titleCpfCnpj.getText()).toEqual('ENTRAR');
        element(by.id('userId')).sendKeys('11111111111111');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());   
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 5000);  
        expect(browser.getCurrentUrl()).not.toEqual("https://neoenergia.deveyroom.com/AgenciaVirtual/#/login");
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.col-10.row')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.text-black'))), 5000);
        expect(element(by.css('.text-black')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc8710_historicoConsumoA-SE_fluxoBasico', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.css('.meu-perfil-header')).isDisplayed());
        //Gráfico
        expect(element(by.cssContainingText('.meu-perfil-header', 'MEU PERFIL DE CONSUMO')).isDisplayed());
        expect(element(by.css('.iframe.ng-star-inserted')).getAttribute('src')).toEqual('https://meuperfildeconsumo.elektro.com.br/Home/MeuPerfil/?token=MTg0NDIzMTV8MzEvMy8yMDIxIDk6NDI6MzQ=');
        //Lista de faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.mat-form-field-label.ng-tns-c2-19.mat-empty.mat-form-field-empty.ng-star-inserted', 'Data de Início')));
        expect(element(by.cssContainingText('.mat-form-field-label.ng-tns-c2-20.mat-empty.mat-form-field-empty.ng-star-inserted', 'Data Final')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Limpar filtros')));
    })
    
    it('tc8804_historicoConsumoA-SE_acessoServicosMaisUtilizados', function () {
        element(by.cssContainingText('.box', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.css('.meu-perfil-header')).isDisplayed());
        //Gráfico
        expect(element(by.cssContainingText('.meu-perfil-header', 'MEU PERFIL DE CONSUMO')).isDisplayed());
        expect(element(by.css('.iframe.ng-star-inserted')).getAttribute('src')).toEqual('https://meuperfildeconsumo.elektro.com.br/Home/MeuPerfil/?token=MTg0NDIzMTV8MzEvMy8yMDIxIDk6NDI6MzQ=');
        //Lista de faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.mat-form-field-label.ng-tns-c2-19.mat-empty.mat-form-field-empty.ng-star-inserted', 'Data de Início')));
        expect(element(by.cssContainingText('.mat-form-field-label.ng-tns-c2-20.mat-empty.mat-form-field-empty.ng-star-inserted', 'Data Final')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Limpar filtros')));
    })


    it('tc8712_historicoConsumoA-SE_filtrarStatus_Avencer', function () {
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
        element(by.cssContainingText('.mat-option-text', 'A Vencer')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-blue-royal-100', 'A vencer'))), 5000);
    })

    it('tc8713_historicoConsumoA-SE_filtrarStatus_Atrasada', function () {
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
        element(by.cssContainingText('.mat-option-text', 'Atrasada')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-red-200', 'Atrasada'))), 5000);
    })

    it('tc8714_historicoConsumoA-SE_filtrarStatus_Processando', function () {
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
        element(by.cssContainingText('.mat-option-text', 'Processando')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-light-blue-100', 'Processando'))), 5000);
    })

    it('tc8716_historicoConsumoA-SE_filtrarStatus_Paga', function () {
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
        element(by.cssContainingText('.mat-option-text', 'Paga')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-green-sage-100', 'Paga'))), 5000);
    })

    it('tc8717_historicoConsumoA-SE_selecionarTodasFaturas', function () {
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
        element(by.cssContainingText('.mat-checkbox-label', 'Selecionar todas as faturas')).click();
        var checado1 = element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).first();
        var checado2 = element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).last();
        expect(checado1.getAttribute('aria-checked')).toEqual('true');
        expect(checado2.getAttribute('aria-checked')).toEqual('true');
    })

    it('tc8718_historicoConsumoA-SE_filtraPorPeriodo', function () {
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
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.css('.mat-calendar-arrow')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '2019')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', 'NOV.')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        expect(element(by.css('input[ng-reflect-model="Fri Nov 01 2019 00:00:00 GMT-0"]')));
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.css('.mat-calendar-arrow')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '2019')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', 'DEZ.')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '31')).click();
        expect(element(by.css('input[ng-reflect-model="Tue Dec 31 2019 00:00:00 GMT-0"]')));
    })

    it('tc8719_historicoConsumoA-SE_limparFiltrosSelecionarTodasFaturas', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.meu-perfil-header', 'MEU PERFIL DE CONSUMO')).isDisplayed());
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        element(by.cssContainingText('.mat-checkbox-label', 'Selecionar todas as faturas')).click();
        var checado1 = element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).first();
        var checado2 = element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).last();
        expect(checado1.getAttribute('aria-checked')).toEqual('true');
        expect(checado2.getAttribute('aria-checked')).toEqual('true');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Limpar filtros')).getWebElement());
        var limpo1 = element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).first();
        var limpo2 = element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).last();
        expect(limpo1.getAttribute('aria-checked')).toEqual('false');
        expect(limpo2.getAttribute('aria-checked')).toEqual('false');
    })

    it('tc8720_historicoConsumoA-SE_limparFiltrosPorPeriodo', function () {
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
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.css('.mat-calendar-arrow')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '2019')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', 'NOV.')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        expect(element(by.css('input[ng-reflect-model="Fri Nov 01 2019 00:00:00 GMT-0"]')));
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.css('.mat-calendar-arrow')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '2019')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', 'DEZ.')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '31')).click();
        expect(element(by.css('input[ng-reflect-model="Tue Dec 31 2019 00:00:00 GMT-0"]')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Limpar filtros')).getWebElement());
        var limpo1 = element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).first();
        var limpo2 = element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).last();
        expect(limpo1.getAttribute('aria-checked')).toEqual('false');
        expect(limpo2.getAttribute('aria-checked')).toEqual('false');
    })

    it('tc8721_historicoConsumoA-SE_baixarTodasFaturas', function () {
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
        element(by.cssContainingText('.mat-checkbox-label', 'Selecionar todas as faturas')).click();
        var checado1 = element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).first();
        var checado2 = element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).last();
        expect(checado1.getAttribute('aria-checked')).toEqual('true');
        expect(checado2.getAttribute('aria-checked')).toEqual('true');
        element(by.cssContainingText('.mat-button-wrapper', 'Baixar faturas')).click();
    })

    it('tc8722_historicoConsumoA-SE_baixarFaturaAvencer', function () {
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
        element(by.cssContainingText('.mat-option-text', 'A Vencer')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-blue-royal-100', 'A vencer'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.postit.flex.align-items-c.mt-2.ng-star-inserted', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-a', 'baixar 2ª via')).getWebElement());
    })

    it('tc8723_historicoConsumoA-SE_baixarFaturaAtrasada', function () {
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
        element(by.cssContainingText('.mat-option-text', 'Atrasada')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-red-200', 'Atrasada'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.postit.flex.align-items-c.mt-2.ng-star-inserted', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-a', 'baixar 2ª via')).getWebElement());
    })

    it('tc8724_historicoConsumoA-SE_baixarFaturaProcessando', function () {
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
        element(by.cssContainingText('.mat-option-text', 'Processando')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-light-blue-100', 'Processando'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.postit.flex.align-items-c.mt-2.ng-star-inserted', 'O pagamento pode demorar até 48h para ser identificado pelo nosso sistema.')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-a', 'baixar 2ª via')).getWebElement());
    })

    it('tc8725_historicoConsumoA-SE_baixarFaturaVinculada', function () {
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
        element(by.cssContainingText('.mat-option-text', 'Vinculada')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-black-100', 'Vinculada'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.postit.flex.align-items-c.mt-2.ng-star-inserted', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-a', 'baixar 2ª via')).getWebElement());
    })

    it('tc8726_historicoConsumoA-SE_baixarFaturaPaga', function () {
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
        element(by.cssContainingText('.mat-option-text', 'Paga')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-green-sage-100', 'Paga'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-a', 'baixar 2ª via')).getWebElement());
    })

    it('tc8727_historicoConsumoA-SE_visualizarFaturaAtrasada', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')).getWebElement());
    })

    it('tc8728_historicoConsumoA-SE_enviarEmailFaturaAtrasada', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste@teste.com');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Extravio')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(true));
        element(by.buttonText('ENVIAR')).click();
        //Mensagem enviado com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element.all(by.cssContainingText('.swal2-content', 'Fatura enviada com sucesso!')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

    it('tc8756_historicoConsumoA-SE_memoriaMassaFaturaAtrasada', function () {
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
    })

    it('tc8730_historicoConsumoA-SE_copiarCodigoAtrasada', function () {
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
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-a', 'copiar código')).getWebElement());
    })

    it('tc8731_historicoConsumoA-SE_copiarCodigoAvencer', function () {
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
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-a', 'copiar código')).getWebElement());
    })

    it('tc8732_historicoConsumoA-SE_copiarCodigoBarrasPagarComAvencer', function () {
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')).getWebElement());
    })

    it('tc8733_historicoConsumoA-SE_cartaoCreditoAvencer', function () {
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')).getWebElement());
    })

    it('tc8734_historicoConsumoA-SE_internetBankingAvencer', function () {
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')).getWebElement());
    })

    it('tc8736_historicoConsumoA-SE_copiarCodigoBarrasPagarComAtrasada', function () {
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')).getWebElement());
    })

    it('tc8737_historicoConsumoA-SE_cartaoCreditoAtrasada', function () {
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')).getWebElement());
    })

    it('tc8738_historicoConsumoA-SE_internetBankingAtrasada', function () {
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')).getWebElement());
    })

    it('tc8739_historicoConsumoA-SE_visualizarFaturaAvencer', function () {
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.hover-group-b.mat-menu-item', 'Visualizar Fatura')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.hover-group-a.mat-menu-item', 'Visualizar Fatura')).getWebElement());
    })

    it('tc8740_historicoConsumoA-SE_enviarEmailFaturaAvencer', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste@teste.com');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Extravio')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(true));
        element(by.buttonText('ENVIAR')).click();
        //Mensagem enviado com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element.all(by.cssContainingText('.swal2-content', 'Fatura enviada com sucesso!')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

    it('tc8762_historicoConsumoA-SE_memoriaMassaFaturaAvencer', function () {
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
    })

    it('tc8742_historicoConsumoA-SE_visualizarFaturaMaisServicosProcessando', function () {
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.hover-group-b.mat-menu-item', 'Visualizar Fatura')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.hover-group-a.mat-menu-item', 'Visualizar Fatura')).getWebElement());
    })

    it('tc8743_historicoConsumoA-SE_enviarPorEmailMaisServicosProcessando', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste@teste.com');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Extravio')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(true));
        element(by.buttonText('ENVIAR')).click();
        //Mensagem enviado com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element.all(by.cssContainingText('.swal2-content', 'Fatura enviada com sucesso!')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

    it('tc8763_historicoConsumoA-SE_memoriaMassaFaturaProcessando', function () {
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
    })

    it('tc8746_historicoConsumoA-SE_visualizarFaturaMaisServicosVinculada', function () {
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.hover-group-b.mat-menu-item', 'Visualizar Fatura')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.hover-group-a.mat-menu-item', 'Visualizar Fatura')).getWebElement());
    })

    it('tc8747_historicoConsumoA-SE_enviarPorEmailMaisServicosVinculada', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste@teste.com');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Extravio')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(true));
        element(by.buttonText('ENVIAR')).click();
        //Mensagem enviado com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element.all(by.cssContainingText('.swal2-content', 'Fatura enviada com sucesso!')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

    it('tc8764_historicoConsumoA-SE_memoriaMassaFaturaVinculada', function () {
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
    })

    it('tc8748_historicoConsumoA-SE_visualizarFaturaMaisSevicosPaga', function () {
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-a', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.hover-group-b.mat-menu-item', 'Visualizar Fatura')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.hover-group-a.mat-menu-item', 'Visualizar Fatura')).getWebElement());
    })

    it('tc8750_historicoConsumoA-SE_enviarPorEmailMaisServicosPaga', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste@teste.com');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Extravio')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(true));
        element(by.buttonText('ENVIAR')).click();
        //Mensagem enviado com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element.all(by.cssContainingText('.swal2-content', 'Fatura enviada com sucesso!')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

    it('tc8765_historicoConsumoA-SE_memoriaMassaFaturaPaga', function () {
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
    })

    it('tc8754_historicoConsumoA-SE_filtraPorDataInicialMaiorDataFinal', function () {
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
        element.all(by.css('.mat-datepicker-toggle')).first().click();
        element(by.css('.mat-calendar-arrow')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '2019')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', 'DEZ.')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        expect(element(by.css('input[ng-reflect-model="Fri Nov 01 2019 00:00:00 GMT-0"]')));
        element.all(by.css('.mat-datepicker-toggle')).last().click();
        element(by.css('.mat-calendar-arrow')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '2019')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', 'NOV.')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '1')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Data final não pode ser menor que a inicial')).isDisplayed());
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).isDisplayed());
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO'))), 5000);
    })

    it('tc8821_historicoConsumoA-SE_enviarPorEmailMaisServicosExtravio', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste@teste.com');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Extravio')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(true));
        element(by.buttonText('ENVIAR')).click();
        //Mensagem enviado com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element.all(by.cssContainingText('.swal2-content', 'Fatura enviada com sucesso!')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

   it('tc8822_historicoConsumoA-SE_enviarPorEmailMaisServicosFaturaDanificada', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste@teste.com');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Fatura danificada')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(true));
        element(by.buttonText('ENVIAR')).click();
        //Mensagem enviado com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element.all(by.cssContainingText('.swal2-content', 'Fatura enviada com sucesso!')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

    it('tc8823_historicoConsumoA-SE_enviarPorEmailMaisServicosFaturaNaoEntregue', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste@teste.com');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Fatura não entregue')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(true));
        element(by.buttonText('ENVIAR')).click();
        //Mensagem enviado com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element.all(by.cssContainingText('.swal2-content', 'Fatura enviada com sucesso!')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

    it('tc8824_historicoConsumoA-SE_enviarPorEmailMaisServicosComprovarResidencia', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste@teste.com');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Comprovar residência')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(true));
        element(by.buttonText('ENVIAR')).click();
        //Mensagem enviado com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element.all(by.cssContainingText('.swal2-content', 'Fatura enviada com sucesso!')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

    it('tc8825_historicoConsumoA-SE_enviarPorEmailMaisServicosSemFaturaEmMaos', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste@teste.com');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Não estou com a fatura em mãos')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(true));
        element(by.buttonText('ENVIAR')).click();
        //Mensagem enviado com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element.all(by.cssContainingText('.swal2-content', 'Fatura enviada com sucesso!')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

    it('tc8826_historicoConsumoA-SE_enviarPorEmailMaisServicosOutro', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste@teste.com');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Outro')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(true));
        element(by.buttonText('ENVIAR')).click();
        //Mensagem enviado com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element.all(by.cssContainingText('.swal2-content', 'Fatura enviada com sucesso!')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

    it('tc8827_historicoConsumoA-SE_cancelarEnviarPorEmailMaisServicos', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        expect(element(by.buttonText('ENVIAR')).isEnabled(false));
        expect(element(by.buttonText('Cancelar')).isDisplayed());
        element(by.buttonText('Cancelar')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

    it('tc8830_historicoConsumoA-SE_alterarEmailEnviarPorEmailMaisServicos', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste@teste.com');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Outro')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(true));
        element(by.buttonText('ENVIAR')).click();
        //Mensagem enviado com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element.all(by.cssContainingText('.swal2-content', 'Fatura enviada com sucesso!')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        //Fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
    })

    it('tc8831_historicoConsumoA-SE_emailInvalidoEnviarPorEmailMaisServicos', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        element(by.id('email')).sendKeys('teste');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Outro')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(false));
    })

    it('tc8832_historicoConsumoA-SE_emailVazioEnviarPorEmailMaisServicos', function () {
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
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
        //Pop-up enviar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo-segunda-via', 'Informe o e-mail que deseja receber sua fatura.'))), 5000);
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Outro')).getWebElement());
        expect(element(by.buttonText('ENVIAR')).isEnabled(false));
    })
})