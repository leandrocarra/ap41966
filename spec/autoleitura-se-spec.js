const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Autoleitura SE', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        var titleCpfCnpj = element(by.css('button.btn.btn-primary-p-green.btn-login'));
        expect(titleCpfCnpj.getText()).toEqual('ENTRAR');
        element(by.id('userId')).sendKeys('22222222222');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 10000);
        expect(browser.getCurrentUrl()).not.toEqual("https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/login");
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.col-10.row')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc10923_autoleituraSE_realizarAutoleitura', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-autoleitura.ng-star-inserted', 'LEITURAS ANTERIORES (kWh)')).isDisplayed());
        expect(element(by.css('.custom-canvas')).isDisplayed());
        expect(element(by.cssContainingText('.legend', 'Meses anteriores')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'FAÇA SUA AUTOLEITURA AGORA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-inner-container')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e aceito os')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'termos de uso')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'de autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(false));
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('INFORMAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Informar autoleitura'))), 5000);
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.id('valorAutoleitura')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(false));
        var leitura = '3000';
        element(by.id('valorAutoleitura')).sendKeys(leitura);
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('ENVIAR AUTOLEITURA')).click();
        //Tela de Leitura Atual
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'LEITURA INFORMADA'))), 5000);
        expect(element(by.cssContainingText('.legend', 'Leitura atual')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', leitura)).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Corrigir')).isDisplayed());
        expect(element(by.cssContainingText('.confirma-leitura', 'CONSUMO DO MÊS')).isDisplayed());
        expect(element(by.cssContainingText('.text-distance.col-7', '580 kWh')).isDisplayed());
        var consumo = element(by.cssContainingText('.text-distance.col-7', '580 kWh')).getText();
        expect(element(by.cssContainingText('.text-link.text-consumo-consicente', 'Confira dicas de consumo consciente')).isDisplayed());
        expect(element(by.cssContainingText('.ps-2', 'Valor fora da Média')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'A leitura informada está fora da sua média de consumo mensal.')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Confira o valor informado e corrija se necessário. Caso o valor informado esteja correto, envie uma foto do medidor mostrando a leitura de forma bem visível.')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('CONFIRMAR AUTOLEITURA')).click();
    })

    it('tc10967_autoleituraSE_voltarAutoleitura', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-autoleitura.ng-star-inserted', 'LEITURAS ANTERIORES (kWh)')).isDisplayed());
        expect(element(by.css('.custom-canvas')).isDisplayed());
        expect(element(by.cssContainingText('.legend', 'Meses anteriores')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'FAÇA SUA AUTOLEITURA AGORA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-inner-container')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e aceito os')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'termos de uso')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'de autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(false));
        element(by.buttonText('VOLTAR')).click();
        //Voltar a Home
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc10967_autoleituraSE_cancelarAutoleitura', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-autoleitura.ng-star-inserted', 'LEITURAS ANTERIORES (kWh)')).isDisplayed());
        expect(element(by.css('.custom-canvas')).isDisplayed());
        expect(element(by.cssContainingText('.legend', 'Meses anteriores')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'FAÇA SUA AUTOLEITURA AGORA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-inner-container')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e aceito os')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'termos de uso')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'de autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(false));
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('INFORMAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Informar autoleitura'))), 5000);
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.id('valorAutoleitura')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(false));
        var leitura = '3000';
        element(by.id('valorAutoleitura')).sendKeys(leitura);
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('ENVIAR AUTOLEITURA')).click();
        //Tela de Leitura Atual
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'LEITURA INFORMADA'))), 5000);
        expect(element(by.cssContainingText('.legend', 'Leitura atual')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', leitura)).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Corrigir')).isDisplayed());
        expect(element(by.cssContainingText('.confirma-leitura', 'CONSUMO DO MÊS')).isDisplayed());
        expect(element(by.cssContainingText('.text-distance.col-7', '580 kWh')).isDisplayed());
        var consumo = element(by.cssContainingText('.text-distance.col-7', '580 kWh')).getText();
        expect(element(by.cssContainingText('.text-link.text-consumo-consicente', 'Confira dicas de consumo consciente')).isDisplayed());
        expect(element(by.cssContainingText('.ps-2', 'Valor fora da Média')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'A leitura informada está fora da sua média de consumo mensal.')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Confira o valor informado e corrija se necessário. Caso o valor informado esteja correto, envie uma foto do medidor mostrando a leitura de forma bem visível.')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isEnabled(false));
        element(by.cssContainingText('.mat-button-wrapper', 'Home')).click();
        //Pop-up questionando se deve continuar
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Tem certeza que deseja cancelar esta solicitação?'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Todas as informações prenchidas serão perdidas.')).isDisplayed());
        expect(element(by.buttonText('SIM')).isDisplayed());
        expect(element(by.buttonText('NÃO')).isDisplayed());
        element(by.buttonText('SIM')).click();
        //Tela da Home
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc10993_autoleituraSE_naoCancelarAutoleitura', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-autoleitura.ng-star-inserted', 'LEITURAS ANTERIORES (kWh)')).isDisplayed());
        expect(element(by.css('.custom-canvas')).isDisplayed());
        expect(element(by.cssContainingText('.legend', 'Meses anteriores')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'FAÇA SUA AUTOLEITURA AGORA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-inner-container')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e aceito os')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'termos de uso')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'de autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(false));
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('INFORMAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Informar autoleitura'))), 5000);
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.id('valorAutoleitura')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(false));
        var leitura = '3000';
        element(by.id('valorAutoleitura')).sendKeys(leitura);
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('ENVIAR AUTOLEITURA')).click();
        //Tela de Leitura Atual
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'LEITURA INFORMADA'))), 5000);
        expect(element(by.cssContainingText('.legend', 'Leitura atual')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', leitura)).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Corrigir')).isDisplayed());
        expect(element(by.cssContainingText('.confirma-leitura', 'CONSUMO DO MÊS')).isDisplayed());
        expect(element(by.cssContainingText('.text-distance.col-7', '580 kWh')).isDisplayed());
        var consumo = element(by.cssContainingText('.text-distance.col-7', '580 kWh')).getText();
        expect(element(by.cssContainingText('.text-link.text-consumo-consicente', 'Confira dicas de consumo consciente')).isDisplayed());
        expect(element(by.cssContainingText('.ps-2', 'Valor fora da Média')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'A leitura informada está fora da sua média de consumo mensal.')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Confira o valor informado e corrija se necessário. Caso o valor informado esteja correto, envie uma foto do medidor mostrando a leitura de forma bem visível.')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isEnabled(false));
        element(by.cssContainingText('.mat-button-wrapper', 'Home')).click();
        //Pop-up questionando se deve continuar
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Tem certeza que deseja cancelar esta solicitação?'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Todas as informações prenchidas serão perdidas.')).isDisplayed());
        expect(element(by.buttonText('SIM')).isDisplayed());
        expect(element(by.buttonText('NÃO')).isDisplayed());
        element(by.buttonText('NÃO')).click();
        //Encerrar o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'LEITURA INFORMADA'))), 5000);
    })

    it('tc10994_autoleituraSE_naoAceitarTermosAutoleitura', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-autoleitura.ng-star-inserted', 'LEITURAS ANTERIORES (kWh)')).isDisplayed());
        expect(element(by.css('.custom-canvas')).isDisplayed());
        expect(element(by.cssContainingText('.legend', 'Meses anteriores')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'FAÇA SUA AUTOLEITURA AGORA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-inner-container')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e aceito os')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'termos de uso')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'de autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(false));
    })

    it('tc10995_autoleituraSE_cliqueAquiAutoleitura', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-autoleitura.ng-star-inserted', 'LEITURAS ANTERIORES (kWh)')).isDisplayed());
        expect(element(by.css('.custom-canvas')).isDisplayed());
        expect(element(by.cssContainingText('.legend', 'Meses anteriores')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'FAÇA SUA AUTOLEITURA AGORA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-inner-container')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e aceito os')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'termos de uso')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'de autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(false));
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('INFORMAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Informar autoleitura'))), 5000);
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.id('valorAutoleitura')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(false));
        var link = 'https://www.youtube.com/watch?v=sQ0pg5asUiE';
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).getAttribute('href')).toEqual(link);
        element(by.cssContainingText('.text-link', 'Clique aqui')).click();
    })

    it('tc10987_autoleituraSE_corrigirAutoleitura', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-autoleitura.ng-star-inserted', 'LEITURAS ANTERIORES (kWh)')).isDisplayed());
        expect(element(by.css('.custom-canvas')).isDisplayed());
        expect(element(by.cssContainingText('.legend', 'Meses anteriores')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'FAÇA SUA AUTOLEITURA AGORA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-inner-container')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e aceito os')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'termos de uso')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'de autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(false));
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('INFORMAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Informar autoleitura'))), 5000);
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.id('valorAutoleitura')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(false));
        var leitura = '3000';
        element(by.id('valorAutoleitura')).sendKeys(leitura);
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('ENVIAR AUTOLEITURA')).click();
        //Tela de Leitura Atual
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'LEITURA INFORMADA'))), 5000);
        expect(element(by.cssContainingText('.legend', 'Leitura atual')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', leitura)).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Corrigir')).isDisplayed());
        expect(element(by.cssContainingText('.confirma-leitura', 'CONSUMO DO MÊS')).isDisplayed());
        expect(element(by.cssContainingText('.text-distance.col-7', '580 kWh')).isDisplayed());
        var consumo = element(by.cssContainingText('.text-distance.col-7', '580 kWh')).getText();
        expect(element(by.cssContainingText('.text-link.text-consumo-consicente', 'Confira dicas de consumo consciente')).isDisplayed());
        expect(element(by.cssContainingText('.ps-2', 'Valor fora da Média')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'A leitura informada está fora da sua média de consumo mensal.')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Confira o valor informado e corrija se necessário. Caso o valor informado esteja correto, envie uma foto do medidor mostrando a leitura de forma bem visível.')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isEnabled(true));
        element(by.cssContainingText('.d-inline.corrigir-autoleitura', 'Corrigir')).click();
        //Tela de informar Autoleitura novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Informar autoleitura'))), 5000);
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.id('valorAutoleitura')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(false));
        var leitura = '3500';
        element(by.id('valorAutoleitura')).sendKeys(leitura);
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('ENVIAR AUTOLEITURA')).click();
        //Tela de Leitura Atual novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'LEITURA INFORMADA'))), 5000);
        expect(element(by.cssContainingText('.legend', 'Leitura atual')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', leitura)).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Corrigir')).isDisplayed());
        expect(element(by.cssContainingText('.confirma-leitura', 'CONSUMO DO MÊS')).isDisplayed());
        expect(element(by.cssContainingText('.text-distance.col-7', '580 kWh')).isDisplayed());
        var consumo = element(by.cssContainingText('.text-distance.col-7', '580 kWh')).getText();
        expect(element(by.cssContainingText('.text-link.text-consumo-consicente', 'Confira dicas de consumo consciente')).isDisplayed());
        expect(element(by.cssContainingText('.ps-2', 'Valor fora da Média')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'A leitura informada está fora da sua média de consumo mensal.')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Confira o valor informado e corrija se necessário. Caso o valor informado esteja correto, envie uma foto do medidor mostrando a leitura de forma bem visível.')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('CONFIRMAR AUTOLEITURA')).click();
    })

    it('tc11006_autoleituraSE_semAnexarArquivo', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-autoleitura.ng-star-inserted', 'LEITURAS ANTERIORES (kWh)')).isDisplayed());
        expect(element(by.css('.custom-canvas')).isDisplayed());
        expect(element(by.cssContainingText('.legend', 'Meses anteriores')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'FAÇA SUA AUTOLEITURA AGORA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-inner-container')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e aceito os')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'termos de uso')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'de autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(false));
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('INFORMAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Informar autoleitura'))), 5000);
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.id('valorAutoleitura')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(false));
        var leitura = '3000';
        element(by.id('valorAutoleitura')).sendKeys(leitura);
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('ENVIAR AUTOLEITURA')).click();
        //Tela de Leitura Atual
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'LEITURA INFORMADA'))), 5000);
        expect(element(by.cssContainingText('.legend', 'Leitura atual')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', leitura)).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Corrigir')).isDisplayed());
        expect(element(by.cssContainingText('.confirma-leitura', 'CONSUMO DO MÊS')).isDisplayed());
        expect(element(by.cssContainingText('.text-distance.col-7', '580 kWh')).isDisplayed());
        var consumo = element(by.cssContainingText('.text-distance.col-7', '580 kWh')).getText();
        expect(element(by.cssContainingText('.text-link.text-consumo-consicente', 'Confira dicas de consumo consciente')).isDisplayed());
        expect(element(by.cssContainingText('.ps-2', 'Valor fora da Média')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'A leitura informada está fora da sua média de consumo mensal.')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Confira o valor informado e corrija se necessário. Caso o valor informado esteja correto, envie uma foto do medidor mostrando a leitura de forma bem visível.')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isEnabled(false));
    })

    it('tc11040_autoleituraSE_campoLeituraVazio', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-autoleitura.ng-star-inserted', 'LEITURAS ANTERIORES (kWh)')).isDisplayed());
        expect(element(by.css('.custom-canvas')).isDisplayed());
        expect(element(by.cssContainingText('.legend', 'Meses anteriores')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'FAÇA SUA AUTOLEITURA AGORA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-inner-container')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e aceito os')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'termos de uso')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'de autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(false));
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('INFORMAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Informar autoleitura'))), 5000);
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.id('valorAutoleitura')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(false));
    })

    it('tc11035_autoleituraSE_energiaCortada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-autoleitura.ng-star-inserted', 'LEITURAS ANTERIORES (kWh)')).isDisplayed());
        expect(element(by.css('.custom-canvas')).isDisplayed());
        expect(element(by.cssContainingText('.legend', 'Meses anteriores')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'FAÇA SUA AUTOLEITURA AGORA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-inner-container')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e aceito os')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'termos de uso')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'de autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(false));
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.buttonText('INFORMAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('INFORMAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Informar autoleitura'))), 5000);
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.id('valorAutoleitura')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(false));
        var leitura = '3000';
        element(by.id('valorAutoleitura')).sendKeys(leitura);
        expect(element(by.buttonText('ENVIAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('ENVIAR AUTOLEITURA')).click();
        //Tela de Leitura Atual
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'LEITURA INFORMADA'))), 5000);
        expect(element(by.cssContainingText('.legend', 'Leitura atual')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', leitura)).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Corrigir')).isDisplayed());
        expect(element(by.cssContainingText('.confirma-leitura', 'CONSUMO DO MÊS')).isDisplayed());
        expect(element(by.cssContainingText('.text-distance.col-7', '580 kWh')).isDisplayed());
        var consumo = element(by.cssContainingText('.text-distance.col-7', '580 kWh')).getText();
        expect(element(by.cssContainingText('.text-link.text-consumo-consicente', 'Confira dicas de consumo consciente')).isDisplayed());
        expect(element(by.cssContainingText('.ps-2', 'Valor fora da Média')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'A leitura informada está fora da sua média de consumo mensal.')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Confira o valor informado e corrija se necessário. Caso o valor informado esteja correto, envie uma foto do medidor mostrando a leitura de forma bem visível.')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONFIRMAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('CONFIRMAR AUTOLEITURA')).click();
        //Tela de Aviso de Energia cortada
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloEnergiaCortada'))), 5000);
        expect(element(by.cssContainingText('.titulo-energia-cortada', 'Imóvel com Energia Cortada')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-energia-cortada.mt-3', 'Não fique sem energia, solicite a sua religação!')).isDisplayed());
        expect(element(by.buttonText('SOLICITAR RELIGAÇÃO')).isDisplayed());
    })

})
