const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Simular Autoleitura SE', function() {
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
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 10000);
        expect(browser.getCurrentUrl()).not.toEqual("http://localhost:4200/#/login");
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.col-10.row')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc11008_simularAutoleituraSE_fluxoBasico', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'VOCÊ AINDA NÃO ESTÁ NO PERÍODO DE AUTOLEITURA'))), 5000);
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'O período de autoleitura desse imóvel é de e')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'até')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', '.')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'Enquanto isso, você pode simular sua Autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isDisplayed());
        element(by.buttonText('SIMULAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.css('input[type="text"]')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isEnabled(false));
        var leitura = '3000';
        element(by.css('input[type="text"]')).sendKeys(leitura);
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('SIMULAR AUTOLEITURA')).click();
        //Tela de Leitura
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

    it('tc11012_simularAutoleituraSE_voltarSimular', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'VOCÊ AINDA NÃO ESTÁ NO PERÍODO DE AUTOLEITURA')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'O período de autoleitura desse imóvel é de e')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'até')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', '.')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'Enquanto isso, você pode simular sua Autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isDisplayed());
        element(by.buttonText('VOLTAR')).click();
        //Voltar a Home
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc11014_simularAutoleituraSE_cancelarSimular', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'VOCÊ AINDA NÃO ESTÁ NO PERÍODO DE AUTOLEITURA'))), 5000);
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'O período de autoleitura desse imóvel é de e')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'até')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', '.')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'Enquanto isso, você pode simular sua Autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isDisplayed());
        element(by.buttonText('SIMULAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.css('input[type="text"]')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isEnabled(false));
        var leitura = '3000';
        element(by.css('input[type="text"]')).sendKeys(leitura);
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela de inicial de simular autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:')).click();
    })

    it('tc11015_simularAutoleituraSE_naoCancelar', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'VOCÊ AINDA NÃO ESTÁ NO PERÍODO DE AUTOLEITURA'))), 5000);
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'O período de autoleitura desse imóvel é de e')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'até')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', '.')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'Enquanto isso, você pode simular sua Autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isDisplayed());
        element(by.buttonText('SIMULAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.css('input[type="text"]')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isEnabled(false));
        var leitura = '3000';
        element(by.css('input[type="text"]')).sendKeys(leitura);
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela de inicial de simular autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Autoleitura'))), 5000);
        element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:')).click();
    })

    it('tc11017_simularAautoleituraSE_corrigirAutoleitura', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'VOCÊ AINDA NÃO ESTÁ NO PERÍODO DE AUTOLEITURA'))), 5000);
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'O período de autoleitura desse imóvel é de e')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'até')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', '.')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'Enquanto isso, você pode simular sua Autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isDisplayed());
        element(by.buttonText('SIMULAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.css('input[type="text"]')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isEnabled(false));
        var leitura = '3000';
        element(by.css('input[type="text"]')).sendKeys(leitura);
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isEnabled(true));
        element(by.buttonText('SIMULAR AUTOLEITURA')).click();
    })

    it('tc11037_simularAutoleituraSE_energiaCortada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'VOCÊ AINDA NÃO ESTÁ NO PERÍODO DE AUTOLEITURA'))), 5000);
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'O período de autoleitura desse imóvel é de e')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'até')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', '.')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'Enquanto isso, você pode simular sua Autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isDisplayed());
        element(by.buttonText('SIMULAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.css('input[type="text"]')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isEnabled(false));
        element(by.buttonText('SIMULAR AUTOLEITURA')).click();
        //Tela de Aviso de Energia cortada
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloEnergiaCortada'))), 5000);
        expect(element(by.cssContainingText('.titulo-energia-cortada', 'Imóvel com Energia Cortada')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-energia-cortada.mt-3', 'Não fique sem energia, solicite a sua religação!')).isDisplayed());
        expect(element(by.buttonText('SOLICITAR RELIGAÇÃO')).isDisplayed());
    })

    it('tc11042_simularAutoleituraSE_campoLeituraVazio', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Autoleitura')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'CÓDIGO DO MEDIDOR')).isDisplayed());
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'VOCÊ AINDA NÃO ESTÁ NO PERÍODO DE AUTOLEITURA'))), 5000);
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'O período de autoleitura desse imóvel é de e')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'até')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', '.')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.text-periodo', 'Enquanto isso, você pode simular sua Autoleitura.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isDisplayed());
        element(by.buttonText('SIMULAR AUTOLEITURA')).click();
        //Tela informar Autoleitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora e código do medidor para realizar a autoleitura:'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.leitura-medidor', 'LEITURA DO MEDIDOR:')).isDisplayed());
        expect(element(by.css('input[type="text"]')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('SIMULAR AUTOLEITURA')).isEnabled(false));
        element(by.buttonText('SIMULAR AUTOLEITURA')).click();
    })

})
