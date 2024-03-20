const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Fatura Impressa Grupo A', function() {
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
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.text-black'))), 5000);
        expect(element(by.css('.text-black')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
    })

    it('tc9755_faturaImpressaGrA_fluxoBasico', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal ')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de confirmação de informações
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'CEP')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'LOGRADOURO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'COMPLEMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'CIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'BAIRRO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'ESTADO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex', 'DESEJA RECEBER FATURA EM BRAILE?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Sim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.attention', 'Após cadastro a fatura em braile será entregue no endereço deste imóvel.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Não')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitação enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.tipo-problema.flex.justify-content-sb', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.conteudo-solicitacao', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'CEP')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'LOGRADOURO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'NÚMERO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'COMPLEMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'CIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'BAIRRO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'ESTADO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'FATURA EM BRAILE')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Imprimir')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Baixar PDF')).isDisplayed());
    })

    it('tc9759_faturaImpressaGrA_cadastroFaturaDigital', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        expect(element(by.buttonText('CADASTRAR FATURA DIGITAL')).isDisplayed());
        element(by.buttonText('CADASTRAR FATURA DIGITAL')).click();
        //Tela inicial de fatura digital
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Fatura Digital'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informacões referentes ao recebimento das faturas:')).isDisplayed());
    })

    it('tc9760_faturaImpressaGrA_noImovel', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal ')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de confirmação de informações
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'CEP')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'LOGRADOURO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'COMPLEMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'CIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'BAIRRO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'ESTADO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex', 'DESEJA RECEBER FATURA EM BRAILE?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Sim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.attention', 'Após cadastro a fatura em braile será entregue no endereço deste imóvel.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Não')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitação enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.tipo-problema.flex.justify-content-sb', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.conteudo-solicitacao', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'CEP')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'LOGRADOURO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'NÚMERO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'COMPLEMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'CIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'BAIRRO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'ESTADO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'FATURA EM BRAILE')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Imprimir')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Baixar PDF')).isDisplayed());
    })

    it('tc9761_faturaImpressaGrA_enderecoAlternativo', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal ')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var entrega = 'Em um endereço alternativo';
        element(by.cssContainingText('.mat-radio-label-content', entrega)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de preenchimento de endereço alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3', ' Para prosseguir com a sua solicitação informe os dados do imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'DADOS DO ENDEREÇO')).isDisplayed());
        expect(element(by.id('cep')).isDisplayed());
        var cep = '13500000';
        element(by.id('cep')).sendKeys(cep);
        expect(element(by.cssContainingText('.color-neo-dark-gray.me-1', 'Não sabe o seu CEP?')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.id('endereco.logradouro')).isDisplayed());
        var logradouro = element(by.id('endereco.logradouro')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('termo')).isDisplayed());
        var numero = '1234';
        numeroInput = element(by.css('input[ng-reflect-maxlength="6"]'));
        browser.executeScript('arguments[0].click()', numeroInput.getWebElement());
        numeroInput.sendKeys(numero);
        expect(element(by.id('endereco.complemento')).isDisplayed());
        var complemento = 'teste'
        element(by.id('endereco.complemento')).sendKeys(complemento);
        expect(element(by.id('endereco.bairro')).isDisplayed());
        var bairro = element(by.id('endereco.bairro')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.cidade')).isDisplayed());
        var cidade = element(by.id('endereco.cidade')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.estado')).isDisplayed());
        var estado = element(by.id('endereco.estado')).getAttribute('ng-reflect-model').getText();
        expect(element(by.cssContainingText('.subtitulo-h6.ng-star-inserted', 'TARIFA DE ENTREGA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-ripple.mat-focus-indicator.mat-ripple')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'Declaro que li e estou ciente que após a alteração do endereço de entrega da fatura, será cobrada uma taxa de')).isDisplayed());
        expect(element(by.cssContainingText('.text-periodo-red', 'R$2,59')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'por fatura enviada.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.id('termo')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de confirmação de informações
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', cep)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', logradouro)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', numero)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', complemento)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', cidade)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', bairro)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', estado)).isDisplayed());
        expect(element(by.cssContainingText('.d-flex', 'DESEJA RECEBER FATURA EM BRAILE?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Sim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.attention', 'Após cadastro a fatura em braile será entregue no endereço alternativo.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Não')).getWebElement());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-a'))), 5000);
        expect(element(by.cssContainingText('.tipo-problema.flex.justify-content-sb', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.conteudo-solicitacao', 'PROTOCOLO')).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', cep)).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', logradouro)).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', numero)).isDisplayed());
        //xpect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', complemento)).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', cidade)).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', bairro)).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', estado)).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'FATURA EM BRAILE')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Imprimir')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Baixar PDF')).isDisplayed());
    })

    it('tc9762_faturaImpressaGrA_caixaPostal', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var entrega = 'Na caixa postal';
        element(by.cssContainingText('.mat-radio-label-content', entrega)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de preenchimento de endereço alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3', ' Para prosseguir com a sua solicitação informe os dados do imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'DADOS DO ENDEREÇO')).isDisplayed());
        expect(element(by.id('cep')).isDisplayed());
        var cep = '13500000';
        element(by.id('cep')).sendKeys(cep);
        expect(element(by.cssContainingText('.color-neo-dark-gray.me-1', 'Não sabe o seu CEP?')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.id('endereco.caixaPostal')).isDisplayed());
        var caixaPostal = element(by.id('endereco.caixaPostal')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('termo')).isDisplayed());
        expect(element(by.id('endereco.cidade')).isDisplayed());
        var cidade = element(by.id('endereco.cidade')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.estado')).isDisplayed());
        var estado = element(by.id('endereco.estado')).getAttribute('ng-reflect-model').getText();
        expect(element(by.cssContainingText('.subtitulo-h6', 'TARIFA DE ENTREGA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-ripple.mat-focus-indicator.mat-ripple')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'Declaro que li e estou ciente que após a alteração do endereço de entrega da fatura, será cobrada uma taxa de')).isDisplayed());
        expect(element(by.cssContainingText('.text-periodo-red', 'R$2,59')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'por fatura enviada.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.id('termo')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de confirmação de informações
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', cep)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', caixaPostal)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', cidade)).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'BAIRRO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', estado)).isDisplayed());
        expect(element(by.cssContainingText('.d-flex', 'DESEJA RECEBER FATURA EM BRAILE?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Sim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.attention', 'Após cadastro a fatura em braile será entregue no endereço alternativo.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-radio-label-content', 'Não')).getWebElement());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-a'))), 5000);
        expect(element(by.cssContainingText('.tipo-problema.flex.justify-content-sb', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.conteudo-solicitacao', 'PROTOCOLO')).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', cep)).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', logradouro)).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', numero)).isDisplayed());
        //xpect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', complemento)).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', cidade)).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', bairro)).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', estado)).isDisplayed());
        //expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'FATURA EM BRAILE')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Imprimir')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Baixar PDF')).isDisplayed());
    })

    it('tc9764_faturaImpressaGrA_semCEP', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var entrega = 'Na caixa postal';
        element(by.cssContainingText('.mat-radio-label-content', entrega)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de preenchimento de endereço alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3', ' Para prosseguir com a sua solicitação informe os dados do imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'DADOS DO ENDEREÇO')).isDisplayed());
        expect(element(by.id('cep')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.me-1', 'Não sabe o seu CEP?')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        element(by.cssContainingText('.text-link', 'Clique aqui')).click();
    })

    it('tc9771_faturaImpressaGrA_voltarFluxo', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal ')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de confirmação de informações
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'CEP')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'LOGRADOURO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'COMPLEMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'CIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'BAIRRO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'ESTADO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex', 'DESEJA RECEBER FATURA EM BRAILE?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Sim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.attention', 'Após cadastro a fatura em braile será entregue no endereço deste imóvel.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Não')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela inicial de fatura impressa novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
    })

    it('tc9774_faturaImpressaGrA_faturaEmBraile', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal ')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de confirmação de informações
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'CEP')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'LOGRADOURO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'COMPLEMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'CIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'BAIRRO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'ESTADO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex', 'DESEJA RECEBER FATURA EM BRAILE?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Sim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.attention', 'Após cadastro a fatura em braile será entregue no endereço deste imóvel.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Sim')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitação enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.tipo-problema.flex.justify-content-sb', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.conteudo-solicitacao', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'CEP')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'LOGRADOURO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'NÚMERO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'COMPLEMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'CIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'BAIRRO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'ESTADO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'FATURA EM BRAILE')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'Sim')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Imprimir')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Baixar PDF')).isDisplayed());
    })

    it('tc9775_faturaImpressaGrA_baixarPDF', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal ')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de confirmação de informações
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'CEP')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'LOGRADOURO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'COMPLEMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'CIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'BAIRRO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'ESTADO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex', 'DESEJA RECEBER FATURA EM BRAILE?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Sim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.attention', 'Após cadastro a fatura em braile será entregue no endereço deste imóvel.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Sim')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitação enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.tipo-problema.flex.justify-content-sb', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.conteudo-solicitacao', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'CEP')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'LOGRADOURO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'NÚMERO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'COMPLEMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'CIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'BAIRRO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'ESTADO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'FATURA EM BRAILE')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'Sim')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Imprimir')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Baixar PDF')).isDisplayed());
        element(by.cssContainingText('.btn-options.color-a', 'Baixar PDF')).click();
    })

    it('tc9776_faturaImpressaGrA_imprimirFatura', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal ')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de confirmação de informações
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para concluir a solicitação, confirme as informações abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'CEP')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'LOGRADOURO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'NÚMERO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'COMPLEMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'CIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'BAIRRO')).isDisplayed());
        expect(element(by.cssContainingText('.item-dado-cadastrado.flex', 'ESTADO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex', 'DESEJA RECEBER FATURA EM BRAILE?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Sim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.attention', 'Após cadastro a fatura em braile será entregue no endereço deste imóvel.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Sim')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Solicitação enviada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Solicitação enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.tipo-problema.flex.justify-content-sb', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.conteudo-solicitacao', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'CEP')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'LOGRADOURO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'NÚMERO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'COMPLEMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'CIDADE')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'BAIRRO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'ESTADO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'FATURA EM BRAILE')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.ng-star-inserted', 'Sim')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Imprimir')).isDisplayed());
        expect(element(by.cssContainingText('.btn-options.color-a', 'Baixar PDF')).isDisplayed());
        element(by.cssContainingText('.btn-options.color-a', 'Imprimir')).click();
    })

    it('tc9777_faturaImpressaGrA_enderecoAlternativoCepIncompleto', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal ')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var entrega = 'Em um endereço alternativo';
        element(by.cssContainingText('.mat-radio-label-content', entrega)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de preenchimento de endereço alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3', ' Para prosseguir com a sua solicitação informe os dados do imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'DADOS DO ENDEREÇO')).isDisplayed());
        expect(element(by.id('cep')).isDisplayed());
        var cep = '1350';
        element(by.id('cep')).sendKeys(cep);
        expect(element(by.cssContainingText('.color-neo-dark-gray.me-1', 'Não sabe o seu CEP?')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.id('endereco.logradouro')).isDisplayed());
        var logradouro = element(by.id('endereco.logradouro')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('termo')).isDisplayed());
        var numero = '1234';
        numeroInput = element(by.css('input[ng-reflect-maxlength="6"]'));
        browser.executeScript('arguments[0].click()', numeroInput.getWebElement());
        numeroInput.sendKeys(numero);
        expect(element(by.id('endereco.complemento')).isDisplayed());
        var complemento = 'teste'
        element(by.id('endereco.complemento')).sendKeys(complemento);
        expect(element(by.id('endereco.bairro')).isDisplayed());
        var bairro = element(by.id('endereco.bairro')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.cidade')).isDisplayed());
        var cidade = element(by.id('endereco.cidade')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.estado')).isDisplayed());
        var estado = element(by.id('endereco.estado')).getAttribute('ng-reflect-model').getText();
        expect(element(by.cssContainingText('.subtitulo-h6.ng-star-inserted', 'TARIFA DE ENTREGA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-ripple.mat-focus-indicator.mat-ripple')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'Declaro que li e estou ciente que após a alteração do endereço de entrega da fatura, será cobrada uma taxa de')).isDisplayed());
        expect(element(by.cssContainingText('.text-periodo-red', 'R$2,59')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'por fatura enviada.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        element(by.id('termo')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc9778_faturaImpressaGrA_enderecoAlternativoCepInvalido', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal ')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var entrega = 'Em um endereço alternativo';
        element(by.cssContainingText('.mat-radio-label-content', entrega)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de preenchimento de endereço alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3', ' Para prosseguir com a sua solicitação informe os dados do imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'DADOS DO ENDEREÇO')).isDisplayed());
        expect(element(by.id('cep')).isDisplayed());
        var cep = '1350';
        element(by.id('cep')).sendKeys(cep);
        expect(element(by.cssContainingText('.color-neo-dark-gray.me-1', 'Não sabe o seu CEP?')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.id('endereco.logradouro')).isDisplayed());
        var logradouro = element(by.id('endereco.logradouro')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('termo')).isDisplayed());
        var numero = '1234';
        numeroInput = element(by.css('input[ng-reflect-maxlength="6"]'));
        browser.executeScript('arguments[0].click()', numeroInput.getWebElement());
        numeroInput.sendKeys(numero);
        expect(element(by.id('endereco.complemento')).isDisplayed());
        var complemento = 'teste'
        element(by.id('endereco.complemento')).sendKeys(complemento);
        expect(element(by.id('endereco.bairro')).isDisplayed());
        var bairro = element(by.id('endereco.bairro')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.cidade')).isDisplayed());
        var cidade = element(by.id('endereco.cidade')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.estado')).isDisplayed());
        var estado = element(by.id('endereco.estado')).getAttribute('ng-reflect-model').getText();
        expect(element(by.cssContainingText('.subtitulo-h6.ng-star-inserted', 'TARIFA DE ENTREGA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-ripple.mat-focus-indicator.mat-ripple')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'Declaro que li e estou ciente que após a alteração do endereço de entrega da fatura, será cobrada uma taxa de')).isDisplayed());
        expect(element(by.cssContainingText('.text-periodo-red', 'R$2,59')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'por fatura enviada.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        element(by.id('termo')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc9779_faturaImpressaGrA_enderecoAlternativoCepVazio', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal ')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var entrega = 'Em um endereço alternativo';
        element(by.cssContainingText('.mat-radio-label-content', entrega)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de preenchimento de endereço alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3', ' Para prosseguir com a sua solicitação informe os dados do imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'DADOS DO ENDEREÇO')).isDisplayed());
        expect(element(by.id('cep')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.me-1', 'Não sabe o seu CEP?')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.id('endereco.logradouro')).isDisplayed());
        var logradouro = element(by.id('endereco.logradouro')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('termo')).isDisplayed());
        var numero = '1234';
        numeroInput = element(by.css('input[ng-reflect-maxlength="6"]'));
        browser.executeScript('arguments[0].click()', numeroInput.getWebElement());
        numeroInput.sendKeys(numero);
        expect(element(by.id('endereco.complemento')).isDisplayed());
        var complemento = 'teste'
        element(by.id('endereco.complemento')).sendKeys(complemento);
        expect(element(by.id('endereco.bairro')).isDisplayed());
        var bairro = element(by.id('endereco.bairro')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.cidade')).isDisplayed());
        var cidade = element(by.id('endereco.cidade')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.estado')).isDisplayed());
        var estado = element(by.id('endereco.estado')).getAttribute('ng-reflect-model').getText();
        expect(element(by.cssContainingText('.subtitulo-h6.ng-star-inserted', 'TARIFA DE ENTREGA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-ripple.mat-focus-indicator.mat-ripple')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'Declaro que li e estou ciente que após a alteração do endereço de entrega da fatura, será cobrada uma taxa de')).isDisplayed());
        expect(element(by.cssContainingText('.text-periodo-red', 'R$2,59')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'por fatura enviada.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        element(by.id('termo')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc9780_faturaImpressaGrA_enderecoAlternativo_SemConfirmacaoTarifa', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal ')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var entrega = 'Em um endereço alternativo';
        element(by.cssContainingText('.mat-radio-label-content', entrega)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de preenchimento de endereço alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3', ' Para prosseguir com a sua solicitação informe os dados do imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'DADOS DO ENDEREÇO')).isDisplayed());
        expect(element(by.id('cep')).isDisplayed());
        var cep = '13500000';
        element(by.id('cep')).sendKeys(cep);
        expect(element(by.cssContainingText('.color-neo-dark-gray.me-1', 'Não sabe o seu CEP?')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.id('endereco.logradouro')).isDisplayed());
        var logradouro = element(by.id('endereco.logradouro')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('termo')).isDisplayed());
        var numero = '1234';
        numeroInput = element(by.css('input[ng-reflect-maxlength="6"]'));
        browser.executeScript('arguments[0].click()', numeroInput.getWebElement());
        numeroInput.sendKeys(numero);
        expect(element(by.id('endereco.complemento')).isDisplayed());
        var complemento = 'teste'
        element(by.id('endereco.complemento')).sendKeys(complemento);
        expect(element(by.id('endereco.bairro')).isDisplayed());
        var bairro = element(by.id('endereco.bairro')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.cidade')).isDisplayed());
        var cidade = element(by.id('endereco.cidade')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.estado')).isDisplayed());
        var estado = element(by.id('endereco.estado')).getAttribute('ng-reflect-model').getText();
        expect(element(by.cssContainingText('.subtitulo-h6.ng-star-inserted', 'TARIFA DE ENTREGA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-ripple.mat-focus-indicator.mat-ripple')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'Declaro que li e estou ciente que após a alteração do endereço de entrega da fatura, será cobrada uma taxa de')).isDisplayed());
        expect(element(by.cssContainingText('.text-periodo-red', 'R$2,59')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'por fatura enviada.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc9781_faturaImpressaGrA_caixaPostal_CepIncompleto', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var entrega = 'Na caixa postal';
        element(by.cssContainingText('.mat-radio-label-content', entrega)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de preenchimento de endereço alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3', ' Para prosseguir com a sua solicitação informe os dados do imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'DADOS DO ENDEREÇO')).isDisplayed());
        expect(element(by.id('cep')).isDisplayed());
        var cep = '1350';
        element(by.id('cep')).sendKeys(cep);
        expect(element(by.cssContainingText('.color-neo-dark-gray.me-1', 'Não sabe o seu CEP?')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.id('endereco.caixaPostal')).isDisplayed());
        var caixaPostal = element(by.id('endereco.caixaPostal')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('termo')).isDisplayed());
        expect(element(by.id('endereco.cidade')).isDisplayed());
        var cidade = element(by.id('endereco.cidade')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.estado')).isDisplayed());
        var estado = element(by.id('endereco.estado')).getAttribute('ng-reflect-model').getText();
        expect(element(by.cssContainingText('.subtitulo-h6', 'TARIFA DE ENTREGA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-ripple.mat-focus-indicator.mat-ripple')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'Declaro que li e estou ciente que após a alteração do endereço de entrega da fatura, será cobrada uma taxa de')).isDisplayed());
        expect(element(by.cssContainingText('.text-periodo-red', 'R$2,59')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'por fatura enviada.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.id('termo')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc9782_faturaImpressaGrA_caixaPostal_CepInvalido', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var entrega = 'Na caixa postal';
        element(by.cssContainingText('.mat-radio-label-content', entrega)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de preenchimento de endereço alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3', ' Para prosseguir com a sua solicitação informe os dados do imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'DADOS DO ENDEREÇO')).isDisplayed());
        expect(element(by.id('cep')).isDisplayed());
        var cep = '11111111';
        element(by.id('cep')).sendKeys(cep);
        expect(element(by.cssContainingText('.color-neo-dark-gray.me-1', 'Não sabe o seu CEP?')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.id('endereco.caixaPostal')).isDisplayed());
        var caixaPostal = element(by.id('endereco.caixaPostal')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('termo')).isDisplayed());
        expect(element(by.id('endereco.cidade')).isDisplayed());
        var cidade = element(by.id('endereco.cidade')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.estado')).isDisplayed());
        var estado = element(by.id('endereco.estado')).getAttribute('ng-reflect-model').getText();
        expect(element(by.cssContainingText('.subtitulo-h6', 'TARIFA DE ENTREGA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-ripple.mat-focus-indicator.mat-ripple')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'Declaro que li e estou ciente que após a alteração do endereço de entrega da fatura, será cobrada uma taxa de')).isDisplayed());
        expect(element(by.cssContainingText('.text-periodo-red', 'R$2,59')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'por fatura enviada.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.id('termo')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc9783_faturaImpressaGrA_caixaPostal_CepVazio', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var entrega = 'Na caixa postal';
        element(by.cssContainingText('.mat-radio-label-content', entrega)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de preenchimento de endereço alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3', ' Para prosseguir com a sua solicitação informe os dados do imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'DADOS DO ENDEREÇO')).isDisplayed());
        expect(element(by.id('cep')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.me-1', 'Não sabe o seu CEP?')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.id('endereco.caixaPostal')).isDisplayed());
        var caixaPostal = element(by.id('endereco.caixaPostal')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('termo')).isDisplayed());
        expect(element(by.id('endereco.cidade')).isDisplayed());
        var cidade = element(by.id('endereco.cidade')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.estado')).isDisplayed());
        var estado = element(by.id('endereco.estado')).getAttribute('ng-reflect-model').getText();
        expect(element(by.cssContainingText('.subtitulo-h6', 'TARIFA DE ENTREGA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-ripple.mat-focus-indicator.mat-ripple')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'Declaro que li e estou ciente que após a alteração do endereço de entrega da fatura, será cobrada uma taxa de')).isDisplayed());
        expect(element(by.cssContainingText('.text-periodo-red', 'R$2,59')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'por fatura enviada.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.id('termo')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc9784_faturaImpressaGrA_caixaPostal_semConfirmacaoTarifa', function () {
        expect(element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).isDisplayed());
        element(by.cssContainingText('.t-color-light-blue-100', 'Fatura impressa')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora você pode receber sua fatura digital'))), 5000);
        expect(element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).isDisplayed());
        element(by.buttonText('SEGUIR COM FATURA IMPRESSA')).click();
        //Tela inicial de fatura impressa
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Escolha onde gostaria de receber sua fatura')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Em um endereço alternativo')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na caixa postal')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var entrega = 'Na caixa postal';
        element(by.cssContainingText('.mat-radio-label-content', entrega)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de preenchimento de endereço alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entrega da Fatura'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3', ' Para prosseguir com a sua solicitação informe os dados do imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-h6', 'DADOS DO ENDEREÇO')).isDisplayed());
        expect(element(by.id('cep')).isDisplayed());
        var cep = '13500000';
        element(by.id('cep')).sendKeys(cep);
        expect(element(by.cssContainingText('.color-neo-dark-gray.me-1', 'Não sabe o seu CEP?')).isDisplayed());
        expect(element(by.cssContainingText('.text-link', 'Clique aqui')).isDisplayed());
        expect(element(by.id('endereco.caixaPostal')).isDisplayed());
        var caixaPostal = element(by.id('endereco.caixaPostal')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('termo')).isDisplayed());
        expect(element(by.id('endereco.cidade')).isDisplayed());
        var cidade = element(by.id('endereco.cidade')).getAttribute('ng-reflect-model').getText();
        expect(element(by.id('endereco.estado')).isDisplayed());
        var estado = element(by.id('endereco.estado')).getAttribute('ng-reflect-model').getText();
        expect(element(by.cssContainingText('.subtitulo-h6', 'TARIFA DE ENTREGA')).isDisplayed());
        expect(element(by.css('.mat-checkbox-ripple.mat-focus-indicator.mat-ripple')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'Declaro que li e estou ciente que após a alteração do endereço de entrega da fatura, será cobrada uma taxa de')).isDisplayed());
        expect(element(by.cssContainingText('.text-periodo-red', 'R$2,59')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.ms-1.text-periodo', 'por fatura enviada.')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

})
