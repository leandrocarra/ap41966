const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Segunda Via de Fatura Grupo A', function() {
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
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.col-10.row')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
    })

    it('tc7912_segundaViaFaturaGrupoA_fluxoBasico', function () {
        //Card de fatura atrasada
        ExpectedConditions.presenceOf(element(by.css('.grid.w.text-content')));
        expect(element(by.cssContainingText('.titulo.text-red', 'Faturas atrasadas com risco de suspensão do fornecimento!')));
        ExpectedConditions.presenceOf(element(by.css('.descricao')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Negociar')));
        expect(element(by.cssContainingText('.btn-fecha-alerta.mat-icon.notranslate.material-icons.mat-icon-no-color', 'close')));
        //Ultima fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        ExpectedConditions.presenceOf(element(by.css('.vencimento')));
        ExpectedConditions.presenceOf(element(by.css('.forma-de-pagamento')));
        ExpectedConditions.presenceOf(element(by.css('.ps-00.col-6.align-content-end.text-nowrap.valor-fatura')));
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')));
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        expect(element(by.cssContainingText('.content-button', 'Mais Serviços')));
        element(by.cssContainingText('.content-button', 'Mais Serviços')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        //Personalize sua fatura
        expect(element(by.cssContainingText('.title-card', 'personalize sua fatura')));
        expect(element(by.css('span[text="Vencimento fatura"]')));
        expect(element(by.css('span[text="Entrega fatura"]')));
        expect(element(by.css('span[text="Endereço fatura"]')));
        expect(element(by.css('span[text="Pagamento da fatura"]')));
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.mat-form-field-label.ng-tns-c22-91.mat-empty.mat-form-field-empty.ng-star-inserted', 'Data de Início')));
        expect(element(by.cssContainingText('.mat-form-field-label.ng-tns-c22-91.mat-empty.mat-form-field-empty.ng-star-inserted', 'Data Final')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Limpar filtros')));
    })

    xit('tc7913_segundaViaFaturaGrupoA_filtrarPeriodo', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
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

    xit('tc7914_segundaViaFaturaGrupoA_filtrarStatus_Atrasada', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')).click()
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'Atrasada')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ms-3.ms-md-0.col-md-2.col-5.p-0', 'Atrasada'))), 5000);
    })

    xit('tc7930_segundaViaFaturaGrupoA_filtrarStatus_Vinculada', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')).click()
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'Vinculada')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ms-3.ms-md-0.col-md-2.col-5.p-0', 'Vinculada'))), 5000);
    })

    xit('tc7915_segundaViaFaturaGrupoA_baixarFatura', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.mat-button-wrapper', 'Baixar faturas')).click();
    })

    xit('tc7929_segundaViaFaturaGrupoA_filtrarStatus_Paga', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')).click()
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'Paga')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ms-3.ms-md-0.col-md-2.col-5.p-0', 'Paga'))), 5000);
    })

    xit('tc7916_segundaViaFaturaGrupoA_filtrarStatus_Processando', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')).click()
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'Processando')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.ms-3.ms-md-0.col-md-2.col-5.p-0', 'Processando'))), 5000);
    })

    xit('tc7920_segundaViaFaturaGrupoA_faturaPorEmail', function () {
        //Ultima fatura
        expect(element(by.cssContainingText('.content-button', 'Mais Serviços')));
        element(by.cssContainingText('.content-button', 'Mais Serviços')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.col-8'))), 5000);
        expect(element(by.cssContainingText('.col-8', 'Informe o e-mail que deseja receber sua fatura.')));
        expect(element(by.id('email')).isPresent());
        expect(element(by.css('label[text="Extravio"]')));
        expect(element(by.css('label[text="Fatura danificada"]')));
        expect(element(by.css('label[text="Fatura não entregue"]')));
        expect(element(by.css('label[text="Comprovar residência"]')));
        expect(element(by.css('label[text="Não estou com a fatura em mãos"]')));
        expect(element(by.css('label[text="Outro"]')));
        expect(element(by.id('enviar')).getText()).toEqual('ENVIAR');
        expect(element(by.id('cancelar')).getText()).toEqual('Cancelar');
        element(by.css('label[for="motivo1"]')).click();
        element(by.id('enviar')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.col-8'))), 5000);
        expect(element(by.cssContainingText('.col-8', 'Fatura enviada com sucesso!')));
        expect(element(by.cssContainingText('.col-8', 'Verifique a caixa de spam caso necessário.')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
    })

    xit('tc7921_segundaViaFaturaGrupoA_visualizarFatura', function () {
        //Última fatura
        expect(element(by.cssContainingText('.content-button', 'Mais Serviços')));
        element(by.cssContainingText('.content-button', 'Mais Serviços')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')));
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')).click();
    })

    it('tc7922_segundaViaFaturaGrupoA_conhecaSuaConta', function () {
        //Última fatura
        expect(element(by.cssContainingText('.content-button', 'Mais Serviços')));
        element(by.cssContainingText('.content-button', 'Mais Serviços')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')).click();
    })

    xit('tc7923_segundaViaFaturaGrupoA_PagarComPix', function () {
        //Última fatura
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        element(by.cssContainingText('.content-button', 'Pagar com')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Pix')).click();
    })

    xit('tc7924_segundaViaFaturaGrupoA_PagarComInternetBanking', function () {
        //Última fatura
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        element(by.cssContainingText('.content-button', 'Pagar com')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.col-8'))), 5000);
        expect(element(by.cssContainingText('.col-8', 'Pague com internet banking')));
        expect(element(by.css('p[text="Selecione um dos bancos abaixo ou procure um de sua preferência:"]')));
        expect(element(by.css('span[text="Itaú"]')));
        expect(element(by.css('span[text="Bradesco"]')));
        expect(element(by.css('span[text="Caixa"]')));
        expect(element(by.css('span[text="Banco do Brasil"]')));
        expect(element(by.css('span[text="Santander"]')));
        browser.sleep(5000);
        expect(element(by.cssContainingText('.swal2-confirm swal2-styled', 'FECHAR')));
        element(by.css('.swal2-confirm swal2-styled')).click();
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
    })

    xit('tc7925_segundaViaFaturaGrupoA_PagarComCartaoCredito', function () {
        //Última fatura
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        element(by.cssContainingText('.content-button', 'Pagar com')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.col-8'))), 5000);
        expect(element(by.cssContainingText('.col-8', 'Você está sendo redirecionado para a página de pagamento do FlexPag.')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
    })

    xit('tc7931_segundaViaFaturaGrupoA_selecionarTodasFaturas', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')).click();
        element(by.cssContainingText('.mat-checkbox-label', 'Selecionar todas as faturas')).click();
        var checado1 = element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).first();
        var checado2 = element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).last();
        expect(checado1.getAttribute('aria-checked')).toEqual('true');
        expect(checado2.getAttribute('aria-checked')).toEqual('true');
    })

    xit('tc7932_segundaViaFaturaGrupoA_limparSelecionarTodasFaturas', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')).click();
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

    xit('tc7938_segundaViaFaturaGrupoA_vencimentoFatura', function () {
        //Personalize sua fatura
        expect(element(by.cssContainingText('.title-card', 'personalize sua fatura')));
        expect(element(by.css('span[text="Vencimento fatura"]')));
        var vencimento = element(by.css('.flex.justify-content-e.t-color-light-blue-100')).getText();
        element(by.cssContainingText('.flex.justify-content-e.t-color-light-blue-100', vencimento)).click();
    })

    xit('tc7939_segundaViaFaturaGrupoA_entregaFatura', function () {
        //Personalize sua fatura
        expect(element(by.cssContainingText('.title-card', 'personalize sua fatura')));
        expect(element(by.css('span[text="Entrega fatura"]')));
        var entrega = element(by.css('.flex.justify-content-e.t-color-light-blue-100')).getText();
        element(by.cssContainingText('.flex.justify-content-e.t-color-light-blue-100', entrega)).click();
    })

    it('tc7940_segundaViaFaturaGrupoA_enderecoFatura', function () {
        //Personalize sua fatura
        expect(element(by.cssContainingText('.title-card', 'personalize sua fatura')));
        expect(element(by.css('span[text="Endereço fatura"]')));
        var endereco = element(by.css('.flex.justify-content-e.t-color-light-blue-100')).getText();
        element(by.cssContainingText('.flex.justify-content-e.t-color-light-blue-100', endereco)).click();
    })

    xit('tc7942_segundaViaFaturaGrupoA_pagamentoFatura', function () {
        //Personalize sua fatura
        expect(element(by.cssContainingText('.title-card', 'personalize sua fatura')));
        expect(element(by.css('span[text="Pagamento fatura"]')));
        var pagamento = element(by.css('.flex.justify-content-e.t-color-light-blue-100')).getText();
        element(by.cssContainingText('.flex.justify-content-e.t-color-light-blue-100', pagamento)).click();
    })

    xit('tc7942_segundaViaFaturaGrupoA_baixarFaturaAtrasada', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block t-color-red-200', 'Atrasada')));
        element(by.cssContainingText('.d-block.t-color-red-200', 'Atrasada')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'baixar 2ª via')).getWebElement());
    })

    xit('tc7943_segundaViaFaturaGrupoA_baixarSegundaVia_Atraso', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')));
        element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'baixar 2ª via')).getWebElement());
    })

    xit('tc7944_segundaViaFaturaGrupoA_pagarComCodigoBarras_Atraso', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block t-color-red-200', 'Atrasada')));
        element(by.cssContainingText('.d-block.t-color-red-200', 'Atrasada')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content', 'Código de Barras')));
        element(by.cssContainingText('.mat-menu-content', 'Código de Barras')).click();
    })

    xit('tc7945_segundaViaFaturaGrupoA_pagarComCartaoCredito_Atraso', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block t-color-red-200', 'Atrasada')));
        element(by.cssContainingText('.d-block.t-color-red-200', 'Atrasada')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content', 'Cartão de Crédito')));
        element(by.cssContainingText('.mat-menu-content', 'Cartão de Crédito')).click();
    })

    xit('tc7946_segundaViaFaturaGrupoA_pagarComInternetBanking_Atraso', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block t-color-red-200', 'Atrasada')));
        element(by.cssContainingText('.d-block.t-color-red-200', 'Atrasada')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content', 'Internet Banking')));
        element(by.cssContainingText('.mat-menu-content', 'Internet Banking')).click();
    })

    xit('tc7949_segundaViaFaturaGrupoA_visualizarFatura_Atraso', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block t-color-red-200', 'Atrasada')));
        element(by.cssContainingText('.d-block.t-color-red-200', 'Atrasada')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content', 'Visualizar Fatura')));
        element(by.cssContainingText('.mat-menu-content', 'Visualizar Fatura')).click();
    })

    xit('tc7950_segundaViaFaturaGrupoA_enviarEmailAtraso', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block t-color-red-200', 'Atrasada')));
        element(by.cssContainingText('.d-block.t-color-red-200', 'Atrasada')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content',  'Enviar por E-mail')));
        element(by.cssContainingText('.mat-menu-content', 'Enviar por E-mail')).click();
    })

    xit('tc7951_segundaViaFaturaGrupoA_conhecaSuaContaAtraso', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block t-color-red-200', 'Atrasada')));
        element(by.cssContainingText('.d-block.t-color-red-200', 'Atrasada')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content',  'Conheça sua Conta')));
        element(by.cssContainingText('.mat-menu-content', 'Conheça sua Conta')).click();
    })

    xit('tc7952_segundaViaFaturaGrupoA_copiarCodigoAtraso', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block t-color-red-200', 'Atrasada')));
        element(by.cssContainingText('.d-block.t-color-red-200', 'Atrasada')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'copiar código')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'copiar código')).getWebElement());
    })

    xit('tc7935_segundaViaFaturaGrupoA_pagarComCodigoBarras_aVencer', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')));
        element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content', 'Código de Barras')));
        element(by.cssContainingText('.mat-menu-content', 'Código de Barras')).click();
    })

    xit('tc7936_segundaViaFaturaGrupoA_pagarComCartaoCredito_aVencer', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')));
        element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content', 'Cartão de Crédito')));
        element(by.cssContainingText('.mat-menu-content', 'Cartão de Crédito')).click();
    })

    xit('tc7955_segundaViaFaturaGrupoA_pagarComInternetBanking_aVencer', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')));
        element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Pagar com')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content', 'Internet Banking')));
        element(by.cssContainingText('.mat-menu-content', 'Internet Banking')).click();
    })

    xit('tc7958_segundaViaFaturaGrupoA_baixarSegundaVia_Processando', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-light-blue-100', 'Processando')));
        element(by.cssContainingText('.d-block.t-color-light-blue-100', 'Processando')).click();
        expect(element(by.cssContainingText('.d-block', 'O pagamento pode demorar até 48h para ser identificado pelo nosso sistema.')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'baixar 2ª via')).getWebElement());
    })

    xit('tc7959_segundaViaFaturaGrupoA_visualizarFatura_aVencer', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')));
        element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content', 'Visualizar Fatura')));
        element(by.cssContainingText('.mat-menu-content', 'Visualizar Fatura')).click();
    })

    xit('tc7960_segundaViaFaturaGrupoA_enviarEmail_aVencer', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')));
        element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content',  'Enviar por E-mail')));
        element(by.cssContainingText('.mat-menu-content', 'Enviar por E-mail')).click();
    })

    xit('tc7961_segundaViaFaturaGrupoA_conhecaSuaConta_aVencer', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')));
        element(by.cssContainingText('.d-block.t-color-blue-royal-100', 'A vencer')).click();
        expect(element(by.cssContainingText('.d-block', 'Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content',  'Conheça sua Conta')));
        element(by.cssContainingText('.mat-menu-content', 'Conheça sua Conta')).click();
    })

    xit('tc7962_segundaViaFaturaGrupoA_visualizarFatura_Processando', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-light-blue-100', 'Processando')));
        element(by.cssContainingText('.d-block.t-color-light-blue-100', 'Processando')).click();
        expect(element(by.cssContainingText('.d-block', 'O pagamento pode demorar até 48h para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content', 'Visualizar Fatura')));
        element(by.cssContainingText('.mat-menu-content', 'Visualizar Fatura')).click();
    })

    xit('tc7963_segundaViaFaturaGrupoA_enviarEmail_Processando', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-light-blue-100', 'Processando')));
        element(by.cssContainingText('.d-block.t-color-light-blue-100', 'Processando')).click();
        expect(element(by.cssContainingText('.d-block', 'O pagamento pode demorar até 48h para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content',  'Enviar por E-mail')));
        element(by.cssContainingText('.mat-menu-content', 'Enviar por E-mail')).click();
    })

    xit('tc7964_segundaViaFaturaGrupoA_conhecaSuaConta_Processando', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-light-blue-100', 'Processando')));
        element(by.cssContainingText('.d-block.t-color-light-blue-100', 'Processando')).click();
        expect(element(by.cssContainingText('.d-block', 'O pagamento pode demorar até 48h para ser identificado pelo nosso sistema.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content',  'Conheça sua Conta')));
        element(by.cssContainingText('.mat-menu-content', 'Conheça sua Conta')).click();
    })

    xit('tc7965_segundaViaFaturaGrupoA_baixarSegundaVia_Vinculada', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-black-100', 'Vinculada')));
        element(by.cssContainingText('.d-block.t-color-black-100', 'Vinculada')).click();
        expect(element(by.cssContainingText('.d-block', 'O valor dessa conta não atingiu a quantia de R$70,00. Este valor será acumulado sem encargos na próxima conta')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'baixar 2ª via')).getWebElement());
    })

    xit('tc7966_segundaViaFaturaGrupoA_visualizarFatura_Vinculada', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-black-100', 'Vinculada')));
        element(by.cssContainingText('.d-block.t-color-black-100', 'Vinculada')).click();
        expect(element(by.cssContainingText('.d-block', 'O valor dessa conta não atingiu a quantia de R$70,00. Este valor será acumulado sem encargos na próxima conta')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content', 'Visualizar Fatura')));
        element(by.cssContainingText('.mat-menu-content', 'Visualizar Fatura')).click();
    })

    xit('tc7967_segundaViaFaturaGrupoA_enviarEmail_Vinculada', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-black-100', 'Vinculada')));
        element(by.cssContainingText('.d-block.t-color-black-100', 'Vinculada')).click();
        expect(element(by.cssContainingText('.d-block', 'O valor dessa conta não atingiu a quantia de R$70,00. Este valor será acumulado sem encargos na próxima conta')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content',  'Enviar por E-mail')));
        element(by.cssContainingText('.mat-menu-content', 'Enviar por E-mail')).click();
    })

    xit('tc7968_segundaViaFaturaGrupoA_conhecaSuaConta_Vinculada', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-black-100', 'Vinculada')));
        element(by.cssContainingText('.d-block.t-color-black-100', 'Vinculada')).click();
        expect(element(by.cssContainingText('.d-block', 'O valor dessa conta não atingiu a quantia de R$70,00. Este valor será acumulado sem encargos na próxima conta')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content',  'Conheça sua Conta')));
        element(by.cssContainingText('.mat-menu-content', 'Conheça sua Conta')).click();
    })

    xit('tc7969_segundaViaFaturaGrupoA_baixarSegundaVia_Paga', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-green-sage-100', 'Paga')));
        element(by.cssContainingText('.d-block.t-color-green-sage-100', 'Paga')).click();
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'baixar 2ª via')).getWebElement());
    })

    xit('tc7970_segundaViaFaturaGrupoA_visualizarFatura_Paga', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-green-sage-100', 'Paga')));
        element(by.cssContainingText('.d-block.t-color-green-sage-100', 'Paga')).click();
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content', 'Visualizar Fatura')));
        element(by.cssContainingText('.mat-menu-content', 'Visualizar Fatura')).click();
    })

    xit('tc7971_segundaViaFaturaGrupoA_enviarEmail_Paga', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-green-sage-100', 'Paga')));
        element(by.cssContainingText('.d-block.t-color-green-sage-100', 'Paga')).click();
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content',  'Enviar por E-mail')));
        element(by.cssContainingText('.mat-menu-content', 'Enviar por E-mail')).click();
    })

    xit('tc7972_segundaViaFaturaGrupoA_conhecaSuaConta_Paga', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-green-sage-100', 'Paga')));
        element(by.cssContainingText('.d-block.t-color-green-sage-100', 'Paga')).click();
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-menu-content',  'Conheça sua Conta')));
        element(by.cssContainingText('.mat-menu-content', 'Conheça sua Conta')).click();
    })

})
