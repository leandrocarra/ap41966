const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Segunda Via de Fatura Grupo B', function() {
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
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
    })

    it('tc7836_segundaViaFaturaGrupoB_fluxoBasico', function () {
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

    it('tc7869_segundaViaFaturaGrupoB_filtrarPeriodo', function () {
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

    it('tc7858_segundaViaFaturaGrupoB_filtrarStatus_Atrasada', function () {
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

    it('tc7866_segundaViaFaturaGrupoB_filtrarStatus_Vinculada', function () {
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

    it('tc7846_segundaViaFaturaGrupoB_baixarFatura', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        element(by.cssContainingText('.mat-button-wrapper', 'Baixar faturas')).click();
    })

    it('tc7865_segundaViaFaturaGrupoB_filtrarStatus_Paga', function () {
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

    it('tc7848_segundaViaFaturaGrupoB_filtrarStatus_Processando', function () {
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

    it('tc7850_segundaViaFaturaGrupoB_faturaPorEmail', function () {
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

    it('tc7851_segundaViaFaturaGrupoB_visualizarFatura', function () {
        //Última fatura
        expect(element(by.cssContainingText('.content-button', 'Mais Serviços')));
        element(by.cssContainingText('.content-button', 'Mais Serviços')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')));
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')).click();
    })

    it('tc7852_segundaViaFaturaGrupoB_conhecaSuaConta', function () {
        //Última fatura
        expect(element(by.cssContainingText('.content-button', 'Mais Serviços')));
        element(by.cssContainingText('.content-button', 'Mais Serviços')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')).click();
    })

    it('tc7853_segundaViaFaturaGrupoB_PagarComPix', function () {
        //Última fatura
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        element(by.cssContainingText('.content-button', 'Pagar com')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Pix')).click();
    })

    it('tc7854_segundaViaFaturaGrupoB_PagarComInternetBanking', function () {
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

    it('tc7855_segundaViaFaturaGrupoB_PagarComCartaoCredito', function () {
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

    it('tc7867_segundaViaFaturaGrupoB_selecionarTodasFaturas', function () {
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

    it('tc7868_segundaViaFaturaGrupoB_limparSelecionarTodasFaturas', function () {
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

    it('tc7871_segundaViaFaturaGrupoB_fecharCard', function () {
        //Card de fatura atrasada
        ExpectedConditions.presenceOf(element(by.css('.grid.w.text-content')));
        expect(element(by.cssContainingText('.titulo.text-red', 'Faturas atrasadas com risco de suspensão do fornecimento!')));
        ExpectedConditions.presenceOf(element(by.css('.descricao')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Negociar')));
        expect(element(by.cssContainingText('.btn-fecha-alerta.mat-icon.notranslate.material-icons.mat-icon-no-color', 'close')));
        element(by.cssContainingText('.btn-fecha-alerta.mat-icon.notranslate.material-icons.mat-icon-no-color', 'close')).click();
    })

    it('tc7872_segundaViaFaturaGrupoB_negociarFatura', function () {
        //Card de fatura atrasada
        ExpectedConditions.presenceOf(element(by.css('.grid.w.text-content')));
        expect(element(by.cssContainingText('.titulo.text-red', 'Faturas atrasadas com risco de suspensão do fornecimento!')));
        ExpectedConditions.presenceOf(element(by.css('.descricao')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Negociar')));
        expect(element(by.cssContainingText('.btn-fecha-alerta.mat-icon.notranslate.material-icons.mat-icon-no-color', 'close')));
        element(by.cssContainingText('.mat-button-wrapper', 'Negociar')).click();
    })

    it('tc7874_segundaViaFaturaGrupoB_vencimentoFatura', function () {
        //Personalize sua fatura
        expect(element(by.cssContainingText('.title-card', 'personalize sua fatura')));
        expect(element(by.css('span[text="Vencimento fatura"]')));
        var vencimento = element(by.css('.flex.justify-content-e.t-color-light-blue-100')).getText();
        element(by.cssContainingText('.flex.justify-content-e.t-color-light-blue-100', vencimento)).click();
    })

    it('tc7875_segundaViaFaturaGrupoB_entregaFatura', function () {
        //Personalize sua fatura
        expect(element(by.cssContainingText('.title-card', 'personalize sua fatura')));
        expect(element(by.css('span[text="Entrega fatura"]')));
        var entrega = element(by.css('.flex.justify-content-e.t-color-light-blue-100')).getText();
        element(by.cssContainingText('.flex.justify-content-e.t-color-light-blue-100', entrega)).click();
    })

    it('tc7876_segundaViaFaturaGrupoB_enderecoFatura', function () {
        //Personalize sua fatura
        expect(element(by.cssContainingText('.title-card', 'personalize sua fatura')));
        expect(element(by.css('span[text="Endereço fatura"]')));
        var endereco = element(by.css('.flex.justify-content-e.t-color-light-blue-100')).getText();
        element(by.cssContainingText('.flex.justify-content-e.t-color-light-blue-100', endereco)).click();
    })

    it('tc7877_segundaViaFaturaGrupoB_pagamentoFatura', function () {
        //Personalize sua fatura
        expect(element(by.cssContainingText('.title-card', 'personalize sua fatura')));
        expect(element(by.css('span[text="Pagamento fatura"]')));
        var pagamento = element(by.css('.flex.justify-content-e.t-color-light-blue-100')).getText();
        element(by.cssContainingText('.flex.justify-content-e.t-color-light-blue-100', pagamento)).click();
    })

    it('tc7879_segundaViaFaturaGrupoB_baixarFaturaAtrasada', function () {
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

    it('tc7880_segundaViaFaturaGrupoB_baixarSegundaVia_Atraso', function () {
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

    it('tc7881_segundaViaFaturaGrupoB_pagarComCodigoBarras_Atraso', function () {
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

    it('tc7882_segundaViaFaturaGrupoB_pagarComCartaoCredito_Atraso', function () {
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

    it('tc7883_segundaViaFaturaGrupoB_pagarComInternetBanking_Atraso', function () {
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

    it('tc7886_segundaViaFaturaGrupoB_visualizarFatura_Atraso', function () {
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

    it('tc7887_segundaViaFaturaGrupoB_enviarEmailAtraso', function () {
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

    it('tc7888_segundaViaFaturaGrupoB_conhecaSuaContaAtraso', function () {
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

    it('tc7889_segundaViaFaturaGrupoB_copiarCodigoAtraso', function () {
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

    it('tc7890_segundaViaFaturaGrupoB_pagarComCodigoBarras_aVencer', function () {
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

    it('tc7891_segundaViaFaturaGrupoB_pagarComCartaoCredito_aVencer', function () {
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

    it('tc7892_segundaViaFaturaGrupoB_pagarComInternetBanking_aVencer', function () {
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

    it('tc7895_segundaViaFaturaGrupoB_baixarSegundaVia_Processando', function () {
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

    it('tc7897_segundaViaFaturaGrupoB_visualizarFatura_aVencer', function () {
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

    it('tc7898_segundaViaFaturaGrupoB_enviarEmail_aVencer', function () {
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

    it('tc7899_segundaViaFaturaGrupoB_conhecaSuaConta_aVencer', function () {
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

    it('tc7900_segundaViaFaturaGrupoB_visualizarFatura_Processando', function () {
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

    it('tc7901_segundaViaFaturaGrupoB_enviarEmail_Processando', function () {
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

    it('tc7902_segundaViaFaturaGrupoB_conhecaSuaConta_Processando', function () {
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

    it('tc7903_segundaViaFaturaGrupoB_baixarSegundaVia_Vinculada', function () {
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

    it('tc7904_segundaViaFaturaGrupoB_visualizarFatura_Vinculada', function () {
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

    it('tc7905_segundaViaFaturaGrupoB_enviarEmail_Vinculada', function () {
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

    it('tc7906_segundaViaFaturaGrupoB_conhecaSuaConta_Vinculada', function () {
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

    it('tc7907_segundaViaFaturaGrupoB_baixarSegundaVia_Paga', function () {
        //Lista de Faturas
        expect(element(by.cssContainingText('.col-12.p-0.t-faturas-title', 'LISTA DE FATURAS')));
        expect(element(by.css('span[text="Selecionar todas as faturas"]')));
        expect(element(by.css('span[text="Baixar faturas"]')));
        expect(element(by.css('span[text="Selecionar Status"]')));
        expect(element(by.cssContainingText('.d-block.t-color-green-sage-100', 'Paga')));
        element(by.cssContainingText('.d-block.t-color-green-sage-100', 'Paga')).click();
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'baixar 2ª via')).getWebElement());
    })

    it('tc7908_segundaViaFaturaGrupoB_visualizarFatura_Paga', function () {
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

    it('tc7909_segundaViaFaturaGrupoB_enviarEmail_Paga', function () {
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

    it('tc7910_segundaViaFaturaGrupoB_conhecaSuaConta_Paga', function () {
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
