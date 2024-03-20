const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Histórico de Consumo Grupo B', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtual/');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        var titleCpfCnpj = element(by.css('button.btn.btn-primary-p-green.btn-login'));
        expect(titleCpfCnpj.getText()).toEqual('ENTRAR');
        element(by.id('userId')).sendKeys('55240048320');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());   
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 5000);  
        expect(browser.getCurrentUrl()).not.toEqual("https://neoenergia.deveyroom.com/AgenciaVirtual/#/login");
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.col-10.row')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc8585_historicoConsumoB_fluxoBasico', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Gráfico
        expect(element(by.cssContainingText('.ng-star-inserted', 'Selecionar o ano')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3', 'Selecionar o tipo:')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Média da fatura')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Consumo ano anterior')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Consumo')).isDisplayed());
        //Valores de consumo
        expect(element(by.cssContainingText('.referencia', 'VALORES DE CONSUMO REFERENTES AOS ÚLTIMOS 13 MESES')).isDisplayed());
        //Consumo mês anterior
        expect(element(by.cssContainingText('.bold.titulo.mes-anterior-color', 'CONSUMO MÊS ANTERIOR')).isDisplayed());
        expect(element(by.cssContainingText('.consumo-info', '185.07 kWh')).isDisplayed());
        expect(element(by.cssContainingText('.consumo-info', '05/05/2021')).isDisplayed());
        expect(element(by.cssContainingText('.media', '5.63 kWh - média diária')).isDisplayed());
        //Menor consumo
        expect(element(by.cssContainingText('.bold.titulo.menor-consumo-color', 'MENOR CONSUMO')).isDisplayed());
        expect(element(by.cssContainingText('.consumo-info', 'Dez/2021')).isDisplayed());
        expect(element(by.cssContainingText('.consumo-info', '129 kwh (-3%)')).isDisplayed());
        expect(element(by.cssContainingText('.media', '2.20 kWh - média diária')).isDisplayed());
        //Maior consumo
        expect(element(by.cssContainingText('.bold.titulo.maior-consumo-color', 'MAIOR CONSUMO')).isDisplayed());
        expect(element(by.cssContainingText('.consumo-info', 'Abril/2021')).isDisplayed());
        expect(element(by.cssContainingText('.consumo-info', '190 kwh (+1,7%)')).isDisplayed());
        expect(element(by.cssContainingText('.media', '8.90 kWh - média diária')).isDisplayed());
        //Aviso de economia de energia
        expect(element(by.cssContainingText('.alert', 'Parabéns, Seguiu as nossas dicas e economizou na conta de Energia.')).isDisplayed());
        expect(element(by.cssContainingText('.text-dicas.d-block.text-justify', 'Confira nossas dicas para economizar com a energia elétrica na nossa página no')).isDisplayed());
        //Lista de faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.mat-form-field-label.ng-tns-c22-91.mat-empty.mat-form-field-empty.ng-star-inserted', 'Data de Início')));
        expect(element(by.cssContainingText('.mat-form-field-label.ng-tns-c22-91.mat-empty.mat-form-field-empty.ng-star-inserted', 'Data Final')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Limpar filtros')));
    })

    it('tc8587_historicoConsumoB_filtrarStatus_Avencer', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'A Vencer')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-blue-royal-100', 'A vencer'))), 5000);
    })

    it('tc8588_historicoConsumoB_filtrarStatus_Atrasada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'Atrasada')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-red-200', 'Atrasada'))), 5000);
    })

    it('tc8590_historicoConsumoB_filtrarStatus_Processando', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'Processando')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-light-blue-100', 'Processando'))), 5000);
    })

    it('tc8592_historicoConsumoB_filtrarStatus_Paga', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'HISTÓRICO DE CONSUMO')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'Paga')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-green-sage-100', 'Paga'))), 5000);
    })

    it('tc8593_historicoConsumoB_selecionarTodasFaturas', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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

    it('tc8594_historicoConsumoB_filtraPorPeriodo', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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

    it('tc8595_historicoConsumoB_limparFiltrosSelecionarTodasFaturas', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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

    it('tc8596_historicoConsumoB_limparFiltrosPorPeriodo', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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

    it('tc8597_historicoConsumoB_baixarTodasFaturas', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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

    it('tc8598_historicoConsumoB_baixarFaturaAvencer', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-b', 'baixar 2ª via')).getWebElement());
    })

    it('tc8599_historicoConsumoB_baixarFaturaAtrasada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-b', 'baixar 2ª via')).getWebElement());
    })

    it('tc8600_historicoConsumoB_baixarFaturaProcessando', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-b', 'baixar 2ª via')).getWebElement());
    })

    it('tc8601_historicoConsumoB_baixarFaturaVinculada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.postit.flex.align-items-c.mt-2.ng-star-inserted', 'O valor dessa conta não atingiu a quantia de R$70,00. Este valor será acumulado sem encargos na próxima conta')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-b', 'baixar 2ª via')).getWebElement());
    })

    it('tc8602_historicoConsumoB_baixarFaturaPaga', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-b', 'baixar 2ª via')).getWebElement());
    })

    it('tc8609_historicoConsumoB_visualizarFaturaAtrasada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.hover-group-b.mat-menu-item', 'Visualizar Fatura')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.hover-group-b.mat-menu-item', 'Visualizar Fatura')).getWebElement());
    })

    it('tc8610_historicoConsumoB_enviarEmailFaturaAtrasada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
    })

    it('tc8611_historicoConsumoB_enviarEmailFaturaAtrasada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')).getWebElement());
    })

    it('tc8612_historicoConsumoB_copiarCodigoAtrasada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-b', 'copiar código')).getWebElement());
    })

    it('tc8650_historicoConsumoB_copiarCodigoAvencer', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-b', 'copiar código')).getWebElement());
    })

    it('tc8652_historicoConsumoB_copiarCodigoBarrasPagarComAvencer', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')).getWebElement());
    })

    it('tc8653_historicoConsumoB_cartaoCreditoAvencer', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')).getWebElement());
    })

    it('tc8654_historicoConsumoB_internetBankingAvencer', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')).getWebElement());
    })

    it('tc8656_historicoConsumoB_copiarCodigoBarrasPagarComAtrasada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')).getWebElement());
    })

    it('tc8657_historicoConsumoB_cartaoCreditoAtrasada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')).getWebElement());
    })

    it('tc8658_historicoConsumoB_internetBankingAtrasada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')).getWebElement());
    })

    it('tc8659_historicoConsumoB_visualizarFaturaAvencer', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.hover-group-b.mat-menu-item', 'Visualizar Fatura')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.hover-group-b.mat-menu-item', 'Visualizar Fatura')).getWebElement());
    })

    it('tc8660_historicoConsumoB_enviarEmailFaturaAvencer', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
    })

    it('tc8661_historicoConsumoB_conhecaSuaContaMaisServicosAvencer', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')).getWebElement());
    })

    it('tc8662_historicoConsumoB_visualizarFaturaMaisServicosProcessando', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')).getWebElement());
    })

    it('tc8663_historicoConsumoB_enviarPorEmailMaisServicosProcessando', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
    })

    it('tc8664_historicoConsumoB_conhecaSuaContaMaisServicosProcessando', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')).getWebElement());
    })

    it('tc8665_historicoConsumoB_conhecaSuaContaMaisServicosVinculada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')).getWebElement());
    })

    it('tc8667_historicoConsumoB_enviarPorEmailMaisServicosVinculada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
    })

    it('tc8668_historicoConsumoB_visualizarFaturaAtrasada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.hover-group-b.mat-menu-item', 'Visualizar Fatura')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.hover-group-b.mat-menu-item', 'Visualizar Fatura')).getWebElement());
    })

    it('tc8670_historicoConsumoB_enviarPorEmailMaisServicosAtrasada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
    })

    it('tc8671_historicoConsumoB_visualizarFaturaMaisSevicosPaga', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.hover-group-b.mat-menu-item', 'Visualizar Fatura')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.hover-group-b.mat-menu-item', 'Visualizar Fatura')).getWebElement());
    })

    it('tc8672_historicoConsumoB_conhecaSuaContaMaisServicosPaga', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')).getWebElement());
    })

    it('tc8673_historicoConsumoB_enviarPorEmailMaisServicosPaga', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).getWebElement());
    })

    it('tc8674_historicoConsumoB_filtraPorDataInicialMaiorDataFinal', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo'))), 5000);
    })

    it('tc8676_historicoConsumoB_graficoConsumo', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Gráfico
        expect(element(by.cssContainingText('.ng-star-inserted', 'Selecionar o ano')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3', 'Selecionar o tipo:')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Média da fatura')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Consumo ano anterior')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Consumo')).isDisplayed());
    })

    it('tc8680_historicoConsumoB_graficoConsumoFiltrarAnoAtual', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Gráfico
        expect(element(by.css('.mat-select-value')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('.mat-select-value')).getWebElement());
        expect(element(by.cssContainingText('.mat-option-text', '2021')).isDisplayed());
        element(by.cssContainingText('.mat-option-text', '2021')).click();
    })

    it('tc8681_historicoConsumoB_graficoConsumoFiltrarAnoAnterior', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Gráfico
        expect(element(by.css('.mat-select-value')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('.mat-select-value')).getWebElement());
        expect(element(by.cssContainingText('.mat-option-text', '2020')).isDisplayed());
        element(by.cssContainingText('.mat-option-text', '2020')).click();
    })

    it('tc8682_historicoConsumoB_graficoConsumoFiltrarUltimos13meses', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Gráfico
        expect(element(by.css('.mat-select-value')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('.mat-select-value')).getWebElement());
        expect(element(by.cssContainingText('.mat-option-text', 'Últimos 13 meses')).isDisplayed());
        element(by.cssContainingText('.mat-option-text', 'Últimos 13 meses')).click();
    })

    it('tc8683_historicoConsumoB_graficoConsumoFiltrarEmReais', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Gráfico
        element(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).click();
        expect(element(by.css('.big-client.mat-slide-toggle.mat-accent.ng-valid.ng-touched.ng-dirty.mat-checked')).isPresent());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Valor em real')).isDisplayed());
    })

    it('tc8684_historicoConsumoB_graficoConsumoFiltrarEmKWh', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Gráfico
        element(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).click();
        expect(element(by.css('.big-client.mat-slide-toggle.mat-accent.ng-valid.ng-touched.ng-dirty.mat-checked')).isPresent());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Valor em real')).isDisplayed());
        //Voltando para KWh
        element(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).click();
        expect(element(by.css('.mat-slide-toggle.mat-accent.ng-valid.ng-dirty.ng-touched')).isPresent());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Consumo')).isDisplayed());
    })

    it('tc8708_historicoConsumoB_alertaReducaoConsumo', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Alerta
        expect(element(by.cssContainingText('.alert', 'Parabéns, Seguiu as nossas dicas e economizou na conta de Energia.')).isDisplayed());
    })

    it('tc8892_historicoConsumoB_baixarFaturaProcessando', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.background-group-b', 'baixar 2ª via')).getWebElement());
    })

    it('tc8970_historicoConsumoB_copiarCodigoBarrasPagarComAtrasadas', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
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
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')).getWebElement());
    })

})