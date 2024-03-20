const { browser, element } = require("protractor");
const { last } = require("rxjs-compat/operator/last");
var originalTimeout;

xdescribe('Religação Grupo B', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('https://neoenergia.deveyroom.com/AgenciaVirtualTestes/');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        var titleCpfCnpj = element(by.css('button.btn.btn-primary-p-green.btn-login'));
        expect(titleCpfCnpj.getText()).toEqual('ENTRAR');
        element(by.id('userId')).sendKeys('32669534368');
        element(by.id('password')).sendKeys('Elektro21');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());   
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 5000);  
        expect(browser.getCurrentUrl()).not.toEqual("https://neoenergia.deveyroom.com/AgenciaVirtualTestes/#/login");
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.col-10.row')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc9934_religacaoGrB_voltarTelaConfirmacaoDados', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('JÁ PAGUEI')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Informe os dados abaixo para solicitar sua religação:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="telefone"]')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="referencia"]')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'COMPROVANTE DE PAGAMENTO (OPCIONAL)')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.id('declaracao-input')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que paguei as faturas atrasadas e estou ciente que o eletricista poderá solicitar os comprovantes de pagamento.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isDisplayed());
        var telefone = '(21)98376-0286';
        element(by.css('input[ng-reflect-name="telefone"]')).sendKeys(telefone);
        var ponto = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto);
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de confirmação de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PRAZO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'TAXA DE SERVIÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO DE TELEFONE')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', ponto)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(2);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONCLUIR')).isDisplayed());
        element(by.buttonText('VOLTAR')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
    })
    
    it('tc9964_religacaoGrB_menos3faturasJaPago', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('JÁ PAGUEI')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Informe os dados abaixo para solicitar sua religação:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="telefone"]')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="referencia"]')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'COMPROVANTE DE PAGAMENTO (OPCIONAL)')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.id('declaracao-input')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que paguei as faturas atrasadas e estou ciente que o eletricista poderá solicitar os comprovantes de pagamento.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isDisplayed());
        var telefone = '(21)98376-0286';
        element(by.css('input[ng-reflect-name="telefone"]')).sendKeys(telefone);
        var ponto = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto);
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de confirmação de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PRAZO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'TAXA DE SERVIÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO DE TELEFONE')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', ponto)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(2);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONCLUIR')).isDisplayed());
        element(by.buttonText('CONCLUIR')).click();
        //Tela de conclusão
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.imagem-teste'))), 5000);
        expect(element(by.cssContainingText('.titulo.verde', 'Seu imóvel está ligado')).isDisplayed());
        expect(element(by.cssContainingText('.descricao', 'O imóvel não está com a energia cortada.')).isDisplayed());
    })

    it('tc9982_religacaoGrB_menos3faturasJaPagoAnexo', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('JÁ PAGUEI')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Informe os dados abaixo para solicitar sua religação:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="telefone"]')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="referencia"]')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'COMPROVANTE DE PAGAMENTO (OPCIONAL)')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.id('declaracao-input')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que paguei as faturas atrasadas e estou ciente que o eletricista poderá solicitar os comprovantes de pagamento.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isDisplayed());
        var telefone = '(21)98376-0286';
        element(by.css('input[ng-reflect-name="telefone"]')).sendKeys(telefone);
        var ponto = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de confirmação de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PRAZO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'TAXA DE SERVIÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO DE TELEFONE')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', ponto)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(2);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONCLUIR')).isDisplayed());
        element(by.buttonText('CONCLUIR')).click();
        //Tela de conclusão
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.imagem-teste'))), 5000);
        expect(element(by.cssContainingText('.titulo.verde', 'Seu imóvel está ligado')).isDisplayed());
        expect(element(by.cssContainingText('.descricao', 'O imóvel não está com a energia cortada.')).isDisplayed());
    })

    it('tc10000_religacaoGrB_menos3faturasJaPago_alterarTelefone', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('JÁ PAGUEI')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Informe os dados abaixo para solicitar sua religação:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="telefone"]')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="referencia"]')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'COMPROVANTE DE PAGAMENTO (OPCIONAL)')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.id('declaracao-input')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que paguei as faturas atrasadas e estou ciente que o eletricista poderá solicitar os comprovantes de pagamento.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isDisplayed());
        var telefone = '(21)98376-0286';
        element(by.css('input[ng-reflect-name="telefone"]')).sendKeys(telefone);
        var ponto = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto);
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de confirmação de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PRAZO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'TAXA DE SERVIÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO DE TELEFONE')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', ponto)).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONCLUIR')).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(2);
        var alterar = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar')).get(0).all(by.tagName('a'));
        alterar.click();
        //Tela de Dados para contato novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000); 
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        var telefone2 = '(21)98376-0286';
        element(by.css('input[ng-reflect-name="telefone"]')).clear();
        element(by.css('input[ng-reflect-name="telefone"]')).sendKeys(telefone2);
        var ponto = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto);
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de confirmação de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PRAZO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'TAXA DE SERVIÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO DE TELEFONE')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', telefone2)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', ponto)).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONCLUIR')).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(2);
        element(by.buttonText('CONCLUIR')).click();
        //Tela de conclusão
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.imagem-teste'))), 5000);
        expect(element(by.cssContainingText('.titulo.verde', 'Seu imóvel está ligado')).isDisplayed());
        expect(element(by.cssContainingText('.descricao', 'O imóvel não está com a energia cortada.')).isDisplayed());
    })

    it('tc10004_religacaoGrB_menos3faturasJaPago_alterarPontoReferencia', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('JÁ PAGUEI')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Informe os dados abaixo para solicitar sua religação:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="telefone"]')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="referencia"]')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'COMPROVANTE DE PAGAMENTO (OPCIONAL)')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.id('declaracao-input')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que paguei as faturas atrasadas e estou ciente que o eletricista poderá solicitar os comprovantes de pagamento.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isDisplayed());
        var telefone = '(21)98376-0286';
        element(by.css('input[ng-reflect-name="telefone"]')).sendKeys(telefone);
        var ponto = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto);
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de confirmação de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PRAZO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'TAXA DE SERVIÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO DE TELEFONE')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', ponto)).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONCLUIR')).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(2);
        var alterar = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar')).get(1).all(by.tagName('a'));
        alterar.click();
        //Tela de Dados para contato novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000); 
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        var telefone = '(21)98376-0286';
        element(by.css('input[ng-reflect-name="telefone"]')).sendKeys(telefone);
        var ponto2 = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).clear();
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto2);
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de confirmação de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PRAZO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'TAXA DE SERVIÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO DE TELEFONE')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', ponto2)).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONCLUIR')).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(2);
        element(by.buttonText('CONCLUIR')).click();
        //Tela de conclusão
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.imagem-teste'))), 5000);
        expect(element(by.cssContainingText('.titulo.verde', 'Seu imóvel está ligado')).isDisplayed());
        expect(element(by.cssContainingText('.descricao', 'O imóvel não está com a energia cortada.')).isDisplayed());
    })

    it('tc10008_religacaoGrB_menos3faturasJaPago_telefoneIncompleto', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('JÁ PAGUEI')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Informe os dados abaixo para solicitar sua religação:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="telefone"]')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="referencia"]')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'COMPROVANTE DE PAGAMENTO (OPCIONAL)')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.id('declaracao-input')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que paguei as faturas atrasadas e estou ciente que o eletricista poderá solicitar os comprovantes de pagamento.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isDisplayed());
        var telefone = '(21)98376';
        element(by.css('input[ng-reflect-name="telefone"]')).sendKeys(telefone);
        var ponto = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto);
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
    })

    it('tc10009_religacaoGrB_menos3faturasJaPago_pontoReferenciaVazio', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('JÁ PAGUEI')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Informe os dados abaixo para solicitar sua religação:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="telefone"]')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="referencia"]')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'COMPROVANTE DE PAGAMENTO (OPCIONAL)')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.id('declaracao-input')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que paguei as faturas atrasadas e estou ciente que o eletricista poderá solicitar os comprovantes de pagamento.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isDisplayed());
        var telefone = '(21)98376-1234';
        element(by.css('input[ng-reflect-name="telefone"]')).sendKeys(telefone);
        element(by.css('input[ng-reflect-name="referencia"]')).clear();
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
    })

    it('tc10010_religacaoGrB_menos3faturasJaPago_telefoneVazio', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('JÁ PAGUEI')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Informe os dados abaixo para solicitar sua religação:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="telefone"]')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="referencia"]')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'COMPROVANTE DE PAGAMENTO (OPCIONAL)')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.id('declaracao-input')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que paguei as faturas atrasadas e estou ciente que o eletricista poderá solicitar os comprovantes de pagamento.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isDisplayed());
        element(by.css('input[ng-reflect-name="telefone"]')).clear();
        var ponto = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto);
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
    })

    it('tc10012_religacaoGrB_mais3faturasPagarFaturas_cartaoCredito', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('PAGAR FATURAS')).click();
        //Pop-up Pagamento
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Como prefere fazer o pagamento?')).isDisplayed());
        expect(element(by.cssContainingText('.swal2-content', 'Pagar todas as faturas com cartão de crédito')).isDisplayed());
        expect(element(by.cssContainingText('.swal2-content', 'Pagar faturas individualmente')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isDisplayed());
        expect(element(by.id('cancelar')).isDisplayed());
        element(by.cssContainingText('.swal2-content', 'Pagar todas as faturas com cartão de crédito')).click();
        element(by.buttonText('CONTINUAR')).click();
    })

    it('tc10015_religacaoGrB_mais3faturasJaPago', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('JÁ PAGUEI')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Informe os dados abaixo para solicitar sua religação:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="telefone"]')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="referencia"]')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'COMPROVANTE DE PAGAMENTO (OPCIONAL)')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.id('declaracao-input')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que paguei as faturas atrasadas e estou ciente que o eletricista poderá solicitar os comprovantes de pagamento.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isDisplayed());
        var telefone = '(21)98376-0286';
        element(by.css('input[ng-reflect-name="telefone"]')).sendKeys(telefone);
        var ponto = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto);
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de confirmação de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PRAZO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'TAXA DE SERVIÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO DE TELEFONE')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', ponto)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(2);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONCLUIR')).isDisplayed());
        element(by.buttonText('CONCLUIR')).click();
        //Tela de conclusão
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.imagem-teste'))), 5000);
        expect(element(by.cssContainingText('.titulo.verde', 'Seu imóvel está ligado')).isDisplayed());
        expect(element(by.cssContainingText('.descricao', 'O imóvel não está com a energia cortada.')).isDisplayed());
    })

    it('tc10018_religacaoGrB_mais3faturasJaPagoAnexo', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('JÁ PAGUEI')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Informe os dados abaixo para solicitar sua religação:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="telefone"]')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="referencia"]')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'COMPROVANTE DE PAGAMENTO (OPCIONAL)')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.id('declaracao-input')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que paguei as faturas atrasadas e estou ciente que o eletricista poderá solicitar os comprovantes de pagamento.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isDisplayed());
        var telefone = '(21)98376-0286';
        element(by.css('input[ng-reflect-name="telefone"]')).sendKeys(telefone);
        var ponto = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
        element(by.buttonText('CONFIRMAR')).click();
        //Tela de confirmação de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PRAZO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'TAXA DE SERVIÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO DE TELEFONE')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.info-btn-edit.flex', ponto)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(2);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONCLUIR')).isDisplayed());
        element(by.buttonText('CONCLUIR')).click();
        //Tela de conclusão
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.imagem-teste'))), 5000);
        expect(element(by.cssContainingText('.titulo.verde', 'Seu imóvel está ligado')).isDisplayed());
        expect(element(by.cssContainingText('.descricao', 'O imóvel não está com a energia cortada.')).isDisplayed());
    })

    it('tc10019_religacaoGrB_mais3faturasJaPago_telefoneIncompleto', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('JÁ PAGUEI')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Informe os dados abaixo para solicitar sua religação:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="telefone"]')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="referencia"]')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'COMPROVANTE DE PAGAMENTO (OPCIONAL)')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.id('declaracao-input')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que paguei as faturas atrasadas e estou ciente que o eletricista poderá solicitar os comprovantes de pagamento.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isDisplayed());
        var telefone = '(21)98376';
        element(by.css('input[ng-reflect-name="telefone"]')).sendKeys(telefone);
        var ponto = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto);
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
    })

    it('tc10020_religacaoGrB_mais3faturasJaPago_telefoneVazio', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('JÁ PAGUEI')).click();
        //Tela de Dados para contato
        browser.wait(ExpectedConditions.presenceOf(element(by.id('info-dados'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Informe os dados abaixo para solicitar sua religação:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="telefone"]')).isDisplayed());
        expect(element(by.css('input[ng-reflect-name="referencia"]')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'COMPROVANTE DE PAGAMENTO (OPCIONAL)')).isDisplayed());
        expect(element(by.cssContainingText('.attach-btn.text-nowrap', 'anexar')).isDisplayed());
        expect(element(by.id('declaracao-input')).isDisplayed());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que paguei as faturas atrasadas e estou ciente que o eletricista poderá solicitar os comprovantes de pagamento.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONFIRMAR')).isDisplayed());
        element(by.css('input[ng-reflect-name="telefone"]')).clear();
        var ponto = 'Ao lado da padaria';
        element(by.css('input[ng-reflect-name="referencia"]')).sendKeys(ponto);
        browser.executeScript('arguments[0].click()', element(by.id('declaracao-input')).getWebElement());
    })

    it('tc10022_religacaoGrB_mais3faturasRenegociacaoWhatsApp', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('NEGOCIAR DÍVIDAS')).click();
    })

    it('tc10128_religacaoGrB_cancelarReligacao', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('CANCELAR')).click();
        //Retorna para a Home
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc10129_religacaoGrB_naoCancelarReligacao', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Solicitar religação'))), 5000);
        element(by.buttonText('Solicitar religação')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação'))), 5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.subtitulo.mt-3.mb-3'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Solicitar religação')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Confira os dados da unidade consumidora para solicitar a sua religação:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.alerta-atrasadas.d-flex', 'FATURAS ATRASADAS')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'Encontramos')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', '3')).isDisplayed());
        expect(element(by.cssContainingText('.qtd-valor', 'faturas atrasadas para este imóvel no valor de')).isDisplayed());
        var faturas = element.all(by.css('.fatura.ng-star-inserted'));
        expect(faturas.count()).toBe(3);
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('PAGAR FATURAS')).isDisplayed());
        expect(element(by.buttonText('JÁ PAGUEI')).isDisplayed());
        expect(element(by.buttonText('NEGOCIAR DÍVIDAS')).isDisplayed());
        element(by.buttonText('CANCELAR')).click();
        //Retorna para a Home
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })
})