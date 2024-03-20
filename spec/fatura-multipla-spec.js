const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Fatura Múltipla Grupo A', function() {
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
        element(by.cssContainingText('.mat-button-wrapper', 'Acessar faturas múltiplas')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Fatura múltipla'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Escolha abaixo a unidade consumidora que deseja consultar:')));
    })

    it('tc8504_faturaMultipla_fluxoBasico', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        //Tela de Criar Grupo
        expect(element(by.cssContainingText('.col-3.col-md-3.t-color-dark-silver-200', 'CNPJ')).isDisplayed());
        expect(element(by.cssContainingText('.mt-3', 'Escolha o nome do seu grupo')).isDisplayed());
        expect(element(by.id('nomeGrupo')).isDisplayed());
        element(by.id('nomeGrupo')).sendKeys('Grupo Teste');
        expect(element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).isEnabled(false));
        expect(element(by.cssContainingText('.mt-3', 'Unidade de consumo (UC)')).isDisplayed());
        element(by.css('.mat-datepicker-toggle-default-icon.ng-star-inserted')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '15')).click();
        expect(element(by.css('.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).not.toEqual('');
        expect(element(by.cssContainingText('.mt-3', 'E-mail para recebimento')).isDisplayed());
        element(by.id('buscar-uc')).click();
        //Pop-up Busca UC
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.col-12', 'grupo'))), 5000);
        element.all(by.css('.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin')).first().click();
        element.all(by.css('.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin')).last().click();
        element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-cadastrar-grupo', 'Cadastrar no grupo')).click();
        expect(element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).isEnabled(true));
        element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UNIDADES CONSUMIDORAS')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC1')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC2')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'E-MAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'DATA DE VENCIMENTO')).isDisplayed());
    })

    it('tc8505_faturaMultipla_editarGrupo', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/faturas-multiplas/editar-grupo');
        //Tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.css('.group-color.col-12.col-md-2.col-lg-2.p-0.m-md-0.mb-2')).isDisplayed());
        expect(element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion.d-block', 'E-mail')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', 'kelly@gmail.com')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion', 'DATA VENCIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', '09')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-5.bold', 'Unidade Consumidora: 408456')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-7', 'Rua João José, 1110 - Centro, Limeira 13480-002')).isDisplayed());
        expect(element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'delete_forever')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.disabled.ng-star-inserted', 'Primeiro')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.disabled.ng-star-inserted', 'Anterior')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.ng-star-inserted', 'Próximo')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.ng-star-inserted', 'Último')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neo-outline-secondary', 'VOLTAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'EXCLUIR GRUPO')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isEnabled(false));
    })

    it('tc8512_faturaMultipla_adicionarUC', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/faturas-multiplas/editar-grupo');
        //Tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.css('.group-color.col-12.col-md-2.col-lg-2.p-0.m-md-0.mb-2')).isDisplayed());
        expect(element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).isDisplayed());
        element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).click();
        //Pop-up de adicionar UC
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'GRUPO 1'))), 5000);
        element.all(by.css('.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin')).last().click();
        browser.executeScript('arguments[0].click()', element(by.buttonText('Cadastrar no grupo')).getWebElement());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isEnabled(true));
        element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UNIDADES CONSUMIDORAS')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC1')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC2')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'E-MAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'DATA DE VENCIMENTO')).isDisplayed());
    })

    it('tc8506_faturaMultipla_excluirUC', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/faturas-multiplas/editar-grupo');
        //Tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.css('.group-color.col-12.col-md-2.col-lg-2.p-0.m-md-0.mb-2')).isDisplayed());
        expect(element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion.d-block', 'E-mail')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', 'kelly@gmail.com')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion', 'DATA VENCIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', '09')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-5.bold', 'Unidade Consumidora: 408456')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-7', 'Rua João José, 1110 - Centro, Limeira 13480-002')).isDisplayed());
        expect(element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'delete_forever')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'delete_forever')).click();
        //Pop-up confirmação da exclusão de UC
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Tem certeza que deseja remover a unidade consumidora 408456 da fatura múltipla?')).isDisplayed());
        expect(element(by.buttonText('SIM')).isDisplayed());
        element(by.buttonText('SIM')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Unidade Removida')).isDisplayed());
        expect(element(by.buttonText('FECHAR')).isDisplayed());
        element(by.buttonText('FECHAR')).click();
        expect(element(by.cssContainingText('.ng-star-inserted', 'Removidas')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-5.bold', 'Unidade Consumidora: 408456')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-10.col-md-5', 'Rua João José, 1110 - Centro, Limeira 13480-002')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isEnabled(true));
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UNIDADES CONSUMIDORAS')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC1')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC2')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'E-MAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'DATA DE VENCIMENTO')).isDisplayed());
    })

    it('tc8507_faturaMultipla_excluirGrupo', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/faturas-multiplas/editar-grupo');
        //Tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.css('.group-color.col-12.col-md-2.col-lg-2.p-0.m-md-0.mb-2')).isDisplayed());
        expect(element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion.d-block', 'E-mail')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', 'kelly@gmail.com')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion', 'DATA VENCIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', '09')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-5.bold', 'Unidade Consumidora: 408456')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-7', 'Rua João José, 1110 - Centro, Limeira 13480-002')).isDisplayed());
        expect(element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'delete_forever')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.disabled.ng-star-inserted', 'Primeiro')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.disabled.ng-star-inserted', 'Anterior')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.ng-star-inserted', 'Próximo')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.ng-star-inserted', 'Último')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neo-outline-secondary', 'VOLTAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'EXCLUIR GRUPO')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isEnabled(false));
        element(by.buttonText('EXCLUIR GRUPO')).click();
        //Pop-up confirmação da exclusão de Grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Tem certeza que deseja excluir o grupo da fatura múltipla?')).isDisplayed());
        expect(element(by.buttonText('SIM')).isDisplayed());
        element(by.buttonText('SIM')).click();
        expect(element(by.cssContainingText('.swal2-content', 'Fatura múltipla excluída')).isDisplayed());
        expect(element(by.buttonText('FECHAR')).isDisplayed());
        element(by.buttonText('FECHAR')).click();
        //Voltar para a tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
    })

    it('tc8508_faturaMultipla_alterarEmail', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        expect(element(by.id('alterar-email')).isDisplayed());
        element(by.id('alterar-email')).click();
        //Tela de Alterar E-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var emailTeste = 'testes@teste.com';
        element(by.id('email')).sendKeys(emailTeste);
        element(by.id('confirmarEmail')).sendKeys(emailTeste);
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click(); 
        //Voltar para a tela de Criar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        //expect(element(by.css('.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailTeste);
        expect(element(by.cssContainingText('.col-3.col-md-3.t-color-dark-silver-200', 'CNPJ')).isDisplayed());
        expect(element(by.cssContainingText('.mt-3', 'Escolha o nome do seu grupo')).isDisplayed());
        expect(element(by.id('nomeGrupo')).isDisplayed());
        element(by.id('nomeGrupo')).sendKeys('Grupo Teste');
        expect(element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).isEnabled(false));
        expect(element(by.cssContainingText('.mt-3', 'Unidade de consumo (UC)')).isDisplayed());
        element(by.css('.mat-datepicker-toggle-default-icon.ng-star-inserted')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '15')).click();
        expect(element(by.css('.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).not.toEqual('');
        expect(element(by.cssContainingText('.mt-3', 'E-mail para recebimento')).isDisplayed());
        element(by.id('buscar-uc')).click();
        //Pop-up Busca UC
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.col-12', 'grupo'))), 5000);
        element.all(by.css('.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin')).first().click();
        element.all(by.css('.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin')).last().click();
        element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-cadastrar-grupo', 'Cadastrar no grupo')).click();
        expect(element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).isEnabled(true));
        element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UNIDADES CONSUMIDORAS')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC1')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC2')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'E-MAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'DATA DE VENCIMENTO')).isDisplayed());
    })

    it('tc8509_faturaMultipla_exibirUCs', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        expect(element(by.css('.mat-content')).isDisplayed());
        element(by.css('.mat-content')).click();
        expect(element(by.cssContainingText('.col-12.col-md-2.p-0', 'EDITAR')).isDisplayed());
        expect(element(by.cssContainingText('.col-12.col-md-4', 'CNPJ: 86.973.170/0001-78')).isDisplayed());
        expect(element(by.cssContainingText('.col-12.col-md-4', 'UC: 008456')).isDisplayed());
        expect(element(by.cssContainingText('.col-12.col-md-4', 'Rua João José, 1110 - Centro, Limeira 13480-002')).isDisplayed());
        expect(element(by.cssContainingText('.col-12.col-md-4', 'UC: 009544')).isDisplayed());
        expect(element(by.cssContainingText('.col-12.col-md-4', 'Rua Almirante 08, 90 - Urbano, Limeira 13855-040')).isDisplayed());
        expect(element(by.cssContainingText('.col-12.col-md-4', 'UC: 008456')).isDisplayed());
        expect(element(by.cssContainingText('.col-12.col-md-4', 'Rua João José, 1110 - Centro, Limeira 13480-002')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.disabled.ng-star-inserted', 'Primeiro')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.disabled.ng-star-inserted', 'Anterior')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.ng-star-inserted', 'Próximo')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.ng-star-inserted', 'Último')).isDisplayed());
    })

    it('tc8510_faturaMultipla_voltarCriarGrupo', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        //Tela de Criar Grupo
        expect(element(by.cssContainingText('.col-3.col-md-3.t-color-dark-silver-200', 'CNPJ')).isDisplayed());
        expect(element(by.cssContainingText('.mt-3', 'Escolha o nome do seu grupo')).isDisplayed());
        expect(element(by.id('nomeGrupo')).isDisplayed());
        element(by.id('nomeGrupo')).sendKeys('Grupo Teste');
        expect(element(by.cssContainingText('.mt-3', 'Unidade de consumo (UC)')).isDisplayed());
        element(by.css('.mat-datepicker-toggle-default-icon.ng-star-inserted')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '15')).click();
        expect(element(by.css('.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).not.toEqual('');
        expect(element(by.cssContainingText('.mt-3', 'E-mail para recebimento')).isDisplayed());
        expect(element(by.id('buscar-uc')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).isEnabled(false));
        expect(element(by.cssContainingText('.btn-neo-outline-secondary', 'VOLTAR')).isDisplayed());
        element(by.buttonText('VOLTAR')).click();
        //Voltar para a tela de Seleção de Imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 5000);  
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Acessar faturas múltiplas')).isDisplayed());
    })

    it('tc8511_faturaMultipla_voltarAlterarEmail', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        expect(element(by.id('alterar-email')).isDisplayed());
        element(by.id('alterar-email')).click();
        //Tela de Alterar E-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var emailTeste = 'testes@teste.com';
        element(by.id('email')).sendKeys(emailTeste);
        element(by.id('confirmarEmail')).sendKeys(emailTeste);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        element(by.buttonText('VOLTAR')).click();
        //Voltar para a tela de Criar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        expect(element(by.id('alterar-email')).isDisplayed());
    })

    it('tc8513_faturaMultipla_adicionarPesquisarUC', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/faturas-multiplas/editar-grupo');
        //Tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.css('.group-color.col-12.col-md-2.col-lg-2.p-0.m-md-0.mb-2')).isDisplayed());
        expect(element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).isDisplayed());
        element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).click();
        //Pop-up de adicionar UC
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'GRUPO 1'))), 5000);
        element(by.css('input[placeholder="Pesquisar..."]')).sendKeys('0067171981');
        expect(element.all(by.cssContainingText('.unidade-consumidora-title.pb-2', 'UNIDADE CONSUMIDORA:')).count()).toEqual(1);
        element(by.css('.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin')).click();
        browser.executeScript('arguments[0].click()', element(by.buttonText('Cadastrar no grupo')).getWebElement());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isEnabled(true));
        element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UNIDADES CONSUMIDORAS')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC1')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC2')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'E-MAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'DATA DE VENCIMENTO')).isDisplayed());
    })

    it('tc8514_faturaMultipla_adicionarPesquisarEndereco', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/faturas-multiplas/editar-grupo');
        //Tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.css('.group-color.col-12.col-md-2.col-lg-2.p-0.m-md-0.mb-2')).isDisplayed());
        expect(element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).isDisplayed());
        element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).click();
        //Pop-up de adicionar UC
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'GRUPO 1'))), 5000);
        element(by.css('input[placeholder="Pesquisar..."]')).sendKeys('R. Sen. Vergueiro, 1110 - Centro, Limeira - SP, 13480-002');
        expect(element.all(by.cssContainingText('.unidade-consumidora-title.pb-2', 'UNIDADE CONSUMIDORA:')).count()).toEqual(2);
        element.all(by.css('.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin')).first().click();
        element.all(by.css('.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin')).last().click();
        browser.executeScript('arguments[0].click()', element(by.buttonText('Cadastrar no grupo')).getWebElement());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isEnabled(true));
        element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UNIDADES CONSUMIDORAS')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC1')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC2')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'E-MAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'DATA DE VENCIMENTO')).isDisplayed());
    })

    it('tc8515_faturaMultipla_adicionarSelecionarTodasUCs', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/faturas-multiplas/editar-grupo');
        //Tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.css('.group-color.col-12.col-md-2.col-lg-2.p-0.m-md-0.mb-2')).isDisplayed());
        expect(element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).isDisplayed());
        element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).click();
        //Pop-up de adicionar UC
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'GRUPO 1'))), 5000);
        element(by.css('.mat-checkbox-layout')).click();
        expect(element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).first().getAttribute('aria-checked')).toEqual('true');
        expect(element.all(by.css('.mat-checkbox-input.cdk-visually-hidden')).last().getAttribute('aria-checked')).toEqual('true');
        browser.executeScript('arguments[0].click()', element(by.buttonText('Cadastrar no grupo')).getWebElement());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isEnabled(true));
        element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UNIDADES CONSUMIDORAS')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC1')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'UC2')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'E-MAIL CADASTRADO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'DATA DE VENCIMENTO')).isDisplayed());
    })

    it('tc8516_faturaMultipla_fecharAdicionarUC', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/faturas-multiplas/editar-grupo');
        //Tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.css('.group-color.col-12.col-md-2.col-lg-2.p-0.m-md-0.mb-2')).isDisplayed());
        expect(element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).isDisplayed());
        element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).click();
        //Pop-up de adicionar UC
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'GRUPO 1'))), 5000);
        expect(element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'close')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'close')).click();
        //Depois de fechar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
    })

    it('tc8517_faturaMultipla_voltarEditarGrupo', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/faturas-multiplas/editar-grupo');
        //Tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.css('.group-color.col-12.col-md-2.col-lg-2.p-0.m-md-0.mb-2')).isDisplayed());
        expect(element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion.d-block', 'E-mail')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', 'kelly@gmail.com')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion', 'DATA VENCIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', '09')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-5.bold', 'Unidade Consumidora: 408456')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-7', 'Rua João José, 1110 - Centro, Limeira 13480-002')).isDisplayed());
        expect(element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'delete_forever')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.disabled.ng-star-inserted', 'Primeiro')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.disabled.ng-star-inserted', 'Anterior')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.ng-star-inserted', 'Próximo')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.ng-star-inserted', 'Último')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neo-outline-secondary', 'VOLTAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'EXCLUIR GRUPO')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isEnabled(false));
        element(by.buttonText('VOLTAR')).click();
        //Voltar para a tela de Fatura Múltipla
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion'))), 5000);
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
    })

    it('tc8651_faturaMultipla_cancelarExcluirUC', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/faturas-multiplas/editar-grupo');
        //Tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.css('.group-color.col-12.col-md-2.col-lg-2.p-0.m-md-0.mb-2')).isDisplayed());
        expect(element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion.d-block', 'E-mail')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', 'kelly@gmail.com')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion', 'DATA VENCIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', '09')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-5.bold', 'Unidade Consumidora: 408456')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-7', 'Rua João José, 1110 - Centro, Limeira 13480-002')).isDisplayed());
        expect(element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'delete_forever')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'delete_forever')).click();
        //Pop-up confirmação da exclusão de UC
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Tem certeza que deseja remover a unidade consumidora 408456 da fatura múltipla?')).isDisplayed());
        expect(element(by.buttonText('SIM')).isDisplayed());
        element(by.buttonText('SIM')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Unidade Removida')).isDisplayed());
        expect(element(by.buttonText('FECHAR')).isDisplayed());
        element(by.buttonText('FECHAR')).click();
        //Voltar para a tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.cssContainingText('.cancel-hover', 'Cancelar')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.cancel-hover', 'Cancelar')).getWebElement());
        expect(element.all(by.cssContainingText('.swal2-content', 'Unidade Removida')).count()).toEqual(0);
    })

    it('tc8518_faturaMultipla_nãoExcluirUC', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/faturas-multiplas/editar-grupo');
        //Tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.css('.group-color.col-12.col-md-2.col-lg-2.p-0.m-md-0.mb-2')).isDisplayed());
        expect(element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion.d-block', 'E-mail')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', 'kelly@gmail.com')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion', 'DATA VENCIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', '09')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-5.bold', 'Unidade Consumidora: 408456')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-7', 'Rua João José, 1110 - Centro, Limeira 13480-002')).isDisplayed());
        expect(element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'delete_forever')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'delete_forever')).click();
        //Pop-up confirmação da exclusão de UC
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Tem certeza que deseja remover a unidade consumidora 408456 da fatura múltipla?')).isDisplayed());
        expect(element(by.buttonText('NÃO')).isDisplayed());
        element(by.buttonText('NÃO')).click();
        //Voltar para a tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element.all(by.cssContainingText('.swal2-content', 'Unidade Removida')).count()).toEqual(0);
    })

    it('tc8519_faturaMultipla_nãoExcluirGrupo', function () {
        expect(element(by.cssContainingText('.header-accordion', 'MEUS GRUPOS')).isDisplayed());
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/faturas-multiplas/editar-grupo');
        //Tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
        expect(element(by.css('.group-color.col-12.col-md-2.col-lg-2.p-0.m-md-0.mb-2')).isDisplayed());
        expect(element(by.cssContainingText('.header-function.p-0', 'ADICIONAR UNIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion.d-block', 'E-mail')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', 'kelly@gmail.com')).isDisplayed());
        expect(element(by.cssContainingText('.title-accordion', 'DATA VENCIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.d-block.t-color-dark-silver-200', '09')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-5.bold', 'Unidade Consumidora: 408456')).isDisplayed());
        expect(element(by.cssContainingText('.p-0.col-12.col-md-7', 'Rua João José, 1110 - Centro, Limeira 13480-002')).isDisplayed());
        expect(element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'delete_forever')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.disabled.ng-star-inserted', 'Primeiro')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.disabled.ng-star-inserted', 'Anterior')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.ng-star-inserted', 'Próximo')).isDisplayed());
        expect(element(by.cssContainingText('.page-item.ng-star-inserted', 'Último')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neo-outline-secondary', 'VOLTAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'EXCLUIR GRUPO')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neodarkgreen', 'CONFIRMAR')).isEnabled(false));
        element(by.buttonText('EXCLUIR GRUPO')).click();
        //Pop-up confirmação da exclusão de Grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Tem certeza que deseja excluir o grupo da fatura múltipla?')).isDisplayed());
        expect(element(by.buttonText('NÃO')).isDisplayed());
        element(by.buttonText('NÃO')).click();
        //Voltar para a tela de configurar grupo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.header-accordion.flex-wrap'))), 5000);
        expect(element(by.id('header-title')).getText()).toEqual('CONFIGURAR GRUPO');
    })

    it('tc8571_faturaMultipla_criarGrupo_nomeVazio', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        //Tela de Criar Grupo
        expect(element(by.cssContainingText('.col-3.col-md-3.t-color-dark-silver-200', 'CNPJ')).isDisplayed());
        expect(element(by.cssContainingText('.mt-3', 'Escolha o nome do seu grupo')).isDisplayed());
        expect(element(by.id('nomeGrupo')).isDisplayed());
        element(by.css('.mat-datepicker-toggle-default-icon.ng-star-inserted')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '15')).click();
        expect(element(by.css('.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).not.toEqual('');
        expect(element(by.cssContainingText('.mt-3', 'E-mail para recebimento')).isDisplayed());
        expect(element.all(by.cssContainingText('.mt-3', 'Unidade de consumo (UC)')).count()).toEqual(0);
        expect(element.all(by.id('buscar-uc')).count()).toEqual(0);
        expect(element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).isEnabled(false));
    })

    it('tc8572_faturaMultipla_criarGrupo_dataVazia', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        //Tela de Criar Grupo
        expect(element(by.cssContainingText('.col-3.col-md-3.t-color-dark-silver-200', 'CNPJ')).isDisplayed());
        expect(element(by.cssContainingText('.mt-3', 'Escolha o nome do seu grupo')).isDisplayed());
        expect(element(by.id('nomeGrupo')).isDisplayed());
        element(by.id('nomeGrupo')).sendKeys('Grupo Teste');
        expect(element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).isEnabled(false));
        expect(element(by.cssContainingText('.mt-3', 'Unidade de consumo (UC)')).isDisplayed());
        expect(element(by.css('.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).not.toEqual('');
        expect(element(by.cssContainingText('.mt-3', 'E-mail para recebimento')).isDisplayed());
        element(by.id('buscar-uc')).click();
        //Pop-up Busca UC
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.col-12', 'grupo'))), 5000);
        element.all(by.css('.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin')).first().click();
        element.all(by.css('.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin')).last().click();
        element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-cadastrar-grupo', 'Cadastrar no grupo')).click();
        expect(element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).isEnabled(false));
    })

    it('tc8573_faturaMultipla_criarGrupo_semAdicionarUC', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        //Tela de Criar Grupo
        expect(element(by.cssContainingText('.col-3.col-md-3.t-color-dark-silver-200', 'CNPJ')).isDisplayed());
        expect(element(by.cssContainingText('.mt-3', 'Escolha o nome do seu grupo')).isDisplayed());
        expect(element(by.id('nomeGrupo')).isDisplayed());
        element(by.id('nomeGrupo')).sendKeys('Grupo Teste');
        expect(element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).isEnabled(false));
        expect(element(by.cssContainingText('.mt-3', 'Unidade de consumo (UC)')).isDisplayed());
        element(by.css('.mat-datepicker-toggle-default-icon.ng-star-inserted')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '15')).click();
        expect(element(by.css('.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).not.toEqual('');
        expect(element(by.cssContainingText('.mt-3', 'E-mail para recebimento')).isDisplayed());
        element(by.id('buscar-uc')).click();
        //Pop-up Busca UC
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.col-12', 'grupo'))), 5000);
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'close')).click();
        //Fechado o pop-up de busca UC
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        expect(element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).isEnabled(false));
    })

    it('tc8574_faturaMultipla_criarGrupo_semSelecionarUCs', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        //Tela de Criar Grupo
        expect(element(by.cssContainingText('.col-3.col-md-3.t-color-dark-silver-200', 'CNPJ')).isDisplayed());
        expect(element(by.cssContainingText('.mt-3', 'Escolha o nome do seu grupo')).isDisplayed());
        expect(element(by.id('nomeGrupo')).isDisplayed());
        element(by.id('nomeGrupo')).sendKeys('Grupo Teste');
        expect(element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).isEnabled(false));
        expect(element(by.cssContainingText('.mt-3', 'Unidade de consumo (UC)')).isDisplayed());
        element(by.css('.mat-datepicker-toggle-default-icon.ng-star-inserted')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '15')).click();
        expect(element(by.css('.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).not.toEqual('');
        expect(element(by.cssContainingText('.mt-3', 'E-mail para recebimento')).isDisplayed());
        element(by.id('buscar-uc')).click();
        //Pop-up Busca UC
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.col-12', 'grupo'))), 5000);
        element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-cadastrar-grupo', 'Cadastrar no grupo')).isEnabled(false);
    })

    it('tc8575_faturaMultipla_alterarEmail_emailVazio', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        expect(element(by.id('alterar-email')).isDisplayed());
        element(by.id('alterar-email')).click();
        //Tela de Alterar E-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        element(by.id('email')).click();
        expect(element(by.id('confirmarEmail')).isDisplayed());
        element(by.id('confirmarEmail')).sendKeys('testes@teste.com');
        expect(element(by.cssContainingText('.mat-error', 'E-mail inválido')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));      
    })

    it('tc8576_faturaMultipla_alterarEmail_confirmacaoEmailVazio', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        expect(element(by.id('alterar-email')).isDisplayed());
        element(by.id('alterar-email')).click();
        //Tela de Alterar E-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        element(by.id('email')).sendKeys('testes@teste.com');
        expect(element(by.cssContainingText('.mat-error', 'Os e-mails não conferem. Tente novamente')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));      
    })

    it('tc8577_faturaMultipla_alterarEmail_emailInvalido', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        expect(element(by.id('alterar-email')).isDisplayed());
        element(by.id('alterar-email')).click();
        //Tela de Alterar E-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        element(by.id('email')).sendKeys('teste');
        element(by.id('confirmarEmail')).sendKeys('testes@teste.com');
        expect(element(by.cssContainingText('.mat-error', 'E-mail inválido')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));      
    })

    it('tc8578_faturaMultipla_alterarEmail_confirmacaoEmailVazio', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        expect(element(by.id('alterar-email')).isDisplayed());
        element(by.id('alterar-email')).click();
        //Tela de Alterar E-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        element(by.id('email')).sendKeys('testes@teste.com');
        element(by.id('confirmarEmail')).sendKeys('testes');
        expect(element(by.cssContainingText('.mat-error', 'Os e-mails não conferem. Tente novamente')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc8606_faturaMultipla_criarGrupo_adicionarApenasUmaUC', function () {
        expect(element(by.css('.mat-icon.notranslate.material-icons.mat-icon-no-color')).isDisplayed());
        element(by.cssContainingText('.mat-icon.notranslate.material-icons.mat-icon-no-color', 'add_circle')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.color-neo-dark-gray.mt-3', 'Para cadastrar-se para receber faturas múltiplas preencha a requisição abaixo:'))), 5000);
        //Tela de Criar Grupo
        expect(element(by.cssContainingText('.col-3.col-md-3.t-color-dark-silver-200', 'CNPJ')).isDisplayed());
        expect(element(by.cssContainingText('.mt-3', 'Escolha o nome do seu grupo')).isDisplayed());
        expect(element(by.id('nomeGrupo')).isDisplayed());
        element(by.id('nomeGrupo')).sendKeys('Grupo Teste');
        expect(element(by.cssContainingText('.btn-neoprimary', 'CONTINUAR')).isEnabled(false));
        expect(element(by.cssContainingText('.mt-3', 'Unidade de consumo (UC)')).isDisplayed());
        element(by.css('.mat-datepicker-toggle-default-icon.ng-star-inserted')).click();
        element(by.cssContainingText('.mat-calendar-body-cell-content', '15')).click();
        expect(element(by.css('.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).not.toEqual('');
        expect(element(by.cssContainingText('.mt-3', 'E-mail para recebimento')).isDisplayed());
        element(by.id('buscar-uc')).click();
        //Pop-up Busca UC
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.col-12', 'grupo'))), 5000);
        element.all(by.css('.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin')).first().click();
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-cadastrar-grupo', 'Cadastrar no grupo')).isEnabled(false));
    })
})