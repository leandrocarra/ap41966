const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Fatura por E-mail Grupo B', function() {
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
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Fatura digital')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
    })

    it('tc8236_faturaEmailB_fluxoBasico', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailCadastro = element.all(by.css('.email')).first().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de cadastro')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailCadastro);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailCadastro)).isDisplayed());
    })

    it('tc8237_faturaEmailB_selecionarEmailAcesso', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail de acesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailAcesso = element.all(by.css('.email')).last().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de acesso')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailAcesso);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailAcesso)).isDisplayed());
    })

    it('tc8238_faturaEmailB_cadastroEmailAlternativo', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail de acesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        expect(element(by.id('outro-email')).getText()).toEqual('Quero receber minha conta em outro e-mail.');
        element(by.id('outro-email')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela cadastrar e-mail alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4.subtitulo-h6', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailAlternativo = 'teste@teste.com'
        element(by.id('email')).sendKeys(emailAlternativo);
        element(by.id('confirmarEmail')).sendKeys(emailAlternativo);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailAlternativo);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailAlternativo)).isDisplayed());
    })

    it('tc8239_faturaEmailB_atravesSegundaVia', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
        //Personalize sua fatura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.title-card', 'personalize sua fatura'))), 5000);
        expect(element(by.css('span[text="Vencimento fatura"]')));
        expect(element(by.css('span[text="Entrega fatura"]')));
        expect(element(by.css('span[text="Endereço fatura"]')));
        expect(element(by.css('span[text="Pagamento da fatura"]')));
        element(by.cssContainingText('.flex.justify-content-e.t-color-light-blue-100', 'Fatura impressa')).click();
    })

    it('tc8240_faturaEmailB_voltarTelaCadastro', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonTwo')).click();
    })

    it('tc8243_faturaEmailB_voltarTelaSelecaoEmail', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail de acesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        expect(element(by.id('outro-email')).getText()).toEqual('Quero receber minha conta em outro e-mail.');
        element(by.id('outro-email')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonTwo')).click();
        //Tela inicial de cadastro de fatura por e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
    })

    it('tc8244_faturaEmailB_voltarTelaConfimacao', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailCadastro = element.all(by.css('.email')).first().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de cadastro')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailCadastro);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonTwo')).click();
        //Retorna tela de seleção de e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
    })

    it('tc8245_faturaEmailB_alterarEmailAlternativo', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail de acesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        expect(element(by.id('outro-email')).getText()).toEqual('Quero receber minha conta em outro e-mail.');
        element(by.id('outro-email')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela cadastrar e-mail alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4.subtitulo-h6', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailAlternativo = 'teste@teste.com'
        element(by.id('email')).sendKeys(emailAlternativo);
        element(by.id('confirmarEmail')).sendKeys(emailAlternativo);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailAlternativo);
        expect(element(by.id('buttonOne')).isEnabled(true));
        expect(element(by.id('alterar-email')).isDisplayed());
        element(by.id('alterar-email')).click();
        //Tela de preencher e-mail alternativo novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4.subtitulo-h6', 'E-MAIL:'))), 5000);
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailNovo = 'teste1@teste.com';
        element(by.id('email')).sendKeys(emailNovo);
        element(by.id('confirmarEmail')).sendKeys(emailNovo);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailNovo);
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailNovo)).isDisplayed());
    })

    it('tc8246_faturaEmailB_alterarEmailCadastrado', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailCadastro = element.all(by.css('.email')).first().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de cadastro')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailCadastro);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailCadastro)).isDisplayed());
        //Alterar e-mail cadastrado pelo de acesso
        browser.sleep(20000)
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Recebimento de fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente ao recebimento das faturas:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="' + emailCadastro + '"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('ALTERAR');
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.m-0.btn-formatter.group-a-bkg-darkgreen.ng-star-inserted', 'Descadastrar fatura digital')));
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail de acesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailAcesso = element.all(by.css('.email')).last().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de acesso')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailAcesso);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailAcesso)).isDisplayed());
    })

    it('tc8246_faturaEmailB_alterarEmailCadastradoAlternativo', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailCadastro = element.all(by.css('.email')).first().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de cadastro')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailCadastro);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailCadastro)).isDisplayed());
        //Alterar e-mail cadastrado pelo Alternativo
        browser.sleep(20000)
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Recebimento de fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente ao recebimento das faturas:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="' + emailCadastro + '"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('ALTERAR');
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.m-0.btn-formatter.group-a-bkg-darkgreen.ng-star-inserted', 'Descadastrar fatura digital')));
        element(by.id('buttonOne')).click();
        ///Tela de Selecionar e-mail de acesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        expect(element(by.id('outro-email')).getText()).toEqual('Quero receber minha conta em outro e-mail.');
        element(by.id('outro-email')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela cadastrar e-mail alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4.subtitulo-h6', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailAlternativo = 'teste@teste.com'
        element(by.id('email')).sendKeys(emailAlternativo);
        element(by.id('confirmarEmail')).sendKeys(emailAlternativo);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailAlternativo);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailAlternativo)).isDisplayed());
    })

    it('tc8256_faturaEmailB_naoDescadastrarFaturaDigital', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailCadastro = element.all(by.css('.email')).first().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de cadastro')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailCadastro);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailCadastro)).isDisplayed());
        //Alterar e-mail cadastrado pelo de acesso
        browser.sleep(20000)
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Recebimento de fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente ao recebimento das faturas:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="' + emailCadastro + '"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('ALTERAR');
        expect(element(by.cssContainingText('.pe-2.ps-2.mb-0', 'Descadastrar fatura digital')));
        element(by.cssContainingText('.pe-2.ps-2.mb-0', 'Descadastrar fatura digital')).click();
        //Descadastrar Fatura Digital
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Tem certeza que deseja descadastrar a fatura digital?')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('SIM, DESCADASTRAR FATURA DIGITAL');
        expect(element(by.id('buttonOne')).getText()).toEqual('NÃO');
        element(by.id('buttonOne')).click();
        //Voltar a tela inicial de Fatura Digital
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Recebimento de fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente ao recebimento das faturas:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="' + emailCadastro + '"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('ALTERAR');
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.m-0.btn-formatter.group-a-bkg-darkgreen.ng-star-inserted', 'Descadastrar fatura digital')));
    })

    it('tc8246_faturaEmailB_alterarEmailCadastrado', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailCadastro = element.all(by.css('.email')).first().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de cadastro')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailCadastro);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailCadastro)).isDisplayed());
        //Alterar e-mail cadastrado pelo de acesso
        browser.sleep(20000)
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Recebimento de fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente ao recebimento das faturas:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="' + emailCadastro + '"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('ALTERAR');
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.m-0.btn-formatter.group-a-bkg-darkgreen.ng-star-inserted', 'Descadastrar fatura digital')));
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail de acesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailAcesso = element.all(by.css('.email')).last().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de acesso')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailAcesso);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailAcesso)).isDisplayed());
    })

    it('tc8316_faturaEmailB_voltarAlterarEmailCadastrado', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailCadastro = element.all(by.css('.email')).first().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de cadastro')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailCadastro);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailCadastro)).isDisplayed());
        //Alterar e-mail cadastrado pelo Alternativo
        browser.sleep(20000)
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Recebimento de fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente ao recebimento das faturas:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="' + emailCadastro + '"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('ALTERAR');
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.m-0.btn-formatter.group-a-bkg-darkgreen.ng-star-inserted', 'Descadastrar fatura digital')));
        element(by.id('buttonOne')).click();
        ///Tela de Selecionar e-mail de acesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        expect(element(by.id('outro-email')).getText()).toEqual('Quero receber minha conta em outro e-mail.');
        element(by.id('outro-email')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela cadastrar e-mail alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4.subtitulo-h6', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailAlternativo = 'teste@teste.com'
        element(by.id('email')).sendKeys(emailAlternativo);
        element(by.id('confirmarEmail')).sendKeys(emailAlternativo);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailAlternativo);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonTwo')).click();
        //Retorno para a tela de seleção de e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('outro-email')).getText()).toEqual('Quero receber minha conta em outro e-mail.');
        expect(element(by.id('buttonOne')).isEnabled(false));
    })

    it('tc8341_faturaEmailB_naoDescadastrarFaturaDigital', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailCadastro = element.all(by.css('.email')).first().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de cadastro')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailCadastro);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailCadastro)).isDisplayed());
        //Acessar tela de fatura digital cadastrada
        browser.sleep(20000)
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Recebimento de fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente ao recebimento das faturas:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="' + emailCadastro + '"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('ALTERAR');
        expect(element(by.cssContainingText('.pe-2.ps-2.mb-0', 'Descadastrar fatura digital')));
        element(by.cssContainingText('.pe-2.ps-2.mb-0', 'Descadastrar fatura digital')).click();
        //Descadastrar Fatura Digital
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Tem certeza que deseja descadastrar a fatura digital?')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('SIM, DESCADASTRAR FATURA DIGITAL');
        expect(element(by.id('buttonOne')).getText()).toEqual('NÃO');
        element(by.id('buttonOne')).click();
        //Retornar tela inicial de fatura digital
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Recebimento de fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente ao recebimento das faturas:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="' + emailCadastro + '"]')));
    })

    it('tc8259_faturaEmailB_emailAlternativoVazio', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail de acesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        expect(element(by.id('outro-email')).getText()).toEqual('Quero receber minha conta em outro e-mail.');
        element(by.id('outro-email')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela cadastrar e-mail alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4.subtitulo-h6', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        element(by.id('email')).click();
        element(by.id('confirmarEmail')).sendKeys('teste@teste.com');
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'E-mail inválido')).isDisplayed());
        expect(element(by.id('buttonOne')).isEnabled(false));
    })

    it('tc8260_faturaEmailB_emailConfirmacaoAlternativoVazio', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail de acesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        expect(element(by.id('outro-email')).getText()).toEqual('Quero receber minha conta em outro e-mail.');
        element(by.id('outro-email')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela cadastrar e-mail alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4.subtitulo-h6', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        element(by.id('email')).sendKeys('teste@teste.com');
        expect(element(by.cssContainingText('.ng-star-inserted', 'Os e-mails não conferem. Tente novamente')).isDisplayed());
        expect(element(by.id('buttonOne')).isEnabled(false));
    })

    it('tc8258_faturaEmailB_emailAlternativoInvalido', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail de acesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        expect(element(by.id('outro-email')).getText()).toEqual('Quero receber minha conta em outro e-mail.');
        element(by.id('outro-email')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela cadastrar e-mail alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4.subtitulo-h6', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        element(by.id('email')).sendKeys('teste');
        element(by.id('confirmarEmail')).sendKeys('teste@teste.com');
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'E-mail inválido')).isDisplayed());
        expect(element(by.id('buttonOne')).isEnabled(false));
    })

    it('tc8261_faturaEmailB_emailConfirmacaoAlternativoDiferente', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail de acesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        expect(element(by.id('outro-email')).getText()).toEqual('Quero receber minha conta em outro e-mail.');
        element(by.id('outro-email')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela cadastrar e-mail alternativo
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mt-3.mb-4.subtitulo-h6', 'E-MAIL:'))), 5000);
        expect(element(by.id('email')).isDisplayed());
        expect(element(by.id('confirmarEmail')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        element(by.id('email')).sendKeys('teste@teste.com');
        element(by.id('confirmarEmail')).sendKeys('teste1@teste.com');
        expect(element(by.cssContainingText('.ng-star-inserted', 'Os e-mails não conferem. Tente novamente')).isDisplayed());
        expect(element(by.id('buttonOne')).isEnabled(false));
    })

    it('tc8266_faturaEmailB_faturaWhatsAppNumeroIncompleto', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailCadastro = element.all(by.css('.email')).first().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de cadastro')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailCadastro);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailCadastro)).isDisplayed());
        //Alterar e-mail cadastrado pelo de acesso
        browser.sleep(20000)
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Recebimento de fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente ao recebimento das faturas:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="' + emailCadastro + '"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('ALTERAR');
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.m-0.btn-formatter.group-a-bkg-darkgreen.ng-star-inserted', 'Descadastrar fatura digital')));
        element(by.cssContainingText('.pe-2.ps-2.mb-0', 'Descadastrar fatura digital')).click();
        //Descadastrar Fatura Digital
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Tem certeza que deseja descadastrar a fatura digital?')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('SIM, DESCADASTRAR FATURA DIGITAL');
        expect(element(by.id('buttonOne')).getText()).toEqual('NÃO');
        element(by.id('buttonTwo')).click();
        //Cadastrar WhatsApp
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Deseja receber sua fatura via WhatsApp?')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('NÃO');
        expect(element(by.id('buttonOne')).getText()).toEqual('SIM, CADASTRAR WHATSAPP');
        element(by.id('buttonOne')).click();
        //Digitar numerdo do WhatsApp
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.id('tel')).isDisplayed());
        expect(element(by.id('confirmarTel')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        element(by.id('tel')).sendKeys('12345');
        element(by.id('confirmarTel')).sendKeys('12123456789');
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'Número inválido')).isDisplayed());
        expect(element(by.id('buttonOne')).isEnabled(false));
    })

    it('tc8342_faturaEmailB_faturaWhatsAppNumeroVazio', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailCadastro = element.all(by.css('.email')).first().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de cadastro')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailCadastro);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailCadastro)).isDisplayed());
        //Alterar e-mail cadastrado pelo de acesso
        browser.sleep(20000)
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Recebimento de fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente ao recebimento das faturas:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="' + emailCadastro + '"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('ALTERAR');
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.m-0.btn-formatter.group-a-bkg-darkgreen.ng-star-inserted', 'Descadastrar fatura digital')));
        element(by.cssContainingText('.pe-2.ps-2.mb-0', 'Descadastrar fatura digital')).click();
        //Descadastrar Fatura Digital
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Tem certeza que deseja descadastrar a fatura digital?')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('SIM, DESCADASTRAR FATURA DIGITAL');
        expect(element(by.id('buttonOne')).getText()).toEqual('NÃO');
        element(by.id('buttonTwo')).click();
        //Cadastrar WhatsApp
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Deseja receber sua fatura via WhatsApp?')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('NÃO');
        expect(element(by.id('buttonOne')).getText()).toEqual('SIM, CADASTRAR WHATSAPP');
        element(by.id('buttonOne')).click();
        //Digitar numerdo do WhatsApp
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.id('tel')).isDisplayed());
        expect(element(by.id('confirmarTel')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        element(by.id('tel')).click();
        element(by.id('confirmarTel')).sendKeys('12123456789');
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'Número inválido')).isDisplayed());
        expect(element(by.id('buttonOne')).isEnabled(false));
    })

    it('tc8343_faturaEmailB_faturaWhatsAppNumeroConfirmacaoVazio', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailCadastro = element.all(by.css('.email')).first().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de cadastro')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailCadastro);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailCadastro)).isDisplayed());
        //Alterar e-mail cadastrado pelo de acesso
        browser.sleep(20000)
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Recebimento de fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente ao recebimento das faturas:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="' + emailCadastro + '"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('ALTERAR');
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.m-0.btn-formatter.group-a-bkg-darkgreen.ng-star-inserted', 'Descadastrar fatura digital')));
        element(by.cssContainingText('.pe-2.ps-2.mb-0', 'Descadastrar fatura digital')).click();
        //Descadastrar Fatura Digital
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Tem certeza que deseja descadastrar a fatura digital?')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('SIM, DESCADASTRAR FATURA DIGITAL');
        expect(element(by.id('buttonOne')).getText()).toEqual('NÃO');
        element(by.id('buttonTwo')).click();
        //Cadastrar WhatsApp
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Deseja receber sua fatura via WhatsApp?')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('NÃO');
        expect(element(by.id('buttonOne')).getText()).toEqual('SIM, CADASTRAR WHATSAPP');
        element(by.id('buttonOne')).click();
        //Digitar numerdo do WhatsApp
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.id('tel')).isDisplayed());
        expect(element(by.id('confirmarTel')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        element(by.id('tel')).sendKeys('12123456789');
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'Os números não conferem. Tente novamente')).isDisplayed());
        expect(element(by.id('buttonOne')).isEnabled(false));
    })

    it('tc8344_faturaEmailB_faturaWhatsAppNumeroConfirmacaoDiferente', function () {
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="fatura impressa no endereço im"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CADASTRAR FATURA DIGITAL');
        element(by.id('buttonOne')).click();
        //Tela de Selecionar e-mail
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Para receber suas faturas por e-mail, selecione um e-mail de recebimento:'))), 5000);
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONTINUAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        var emailCadastro = element.all(by.css('.email')).first().getText();
        element(by.cssContainingText('.tipo-email', 'E-mail de cadastro')).click();
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de confirmação de cadastro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirmar cadastro de fatura digital'))), 5000);
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.mb-3.mt-4.subtitulo-h6', 'sua forma de recebimento de faturas para esse imóvel é:')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.css('.input-tipo-fatura.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine')).getAttribute('ng-reflect-model')).toEqual(emailCadastro);
        expect(element(by.id('buttonOne')).isEnabled(true));
        element(by.id('buttonOne')).click();
        //Tela de cadastro com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada com sucesso!'))), 5000);
        expect(element(by.cssContainingText('.flex.justify-content-sb.protocoloStyle', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'E-MAIL DE RECEBIMENTO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', emailCadastro)).isDisplayed());
        //Alterar e-mail cadastrado pelo de acesso
        browser.sleep(20000)
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Recebimento de fatura digital')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente ao recebimento das faturas:')).isDisplayed());
        expect(element(by.css('input[ng-reflect-model="' + emailCadastro + '"]')));
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('ALTERAR');
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.m-0.btn-formatter.group-a-bkg-darkgreen.ng-star-inserted', 'Descadastrar fatura digital')));
        element(by.cssContainingText('.pe-2.ps-2.mb-0', 'Descadastrar fatura digital')).click();
        //Descadastrar Fatura Digital
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Tem certeza que deseja descadastrar a fatura digital?')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('SIM, DESCADASTRAR FATURA DIGITAL');
        expect(element(by.id('buttonOne')).getText()).toEqual('NÃO');
        element(by.id('buttonTwo')).click();
        //Cadastrar WhatsApp
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Deseja receber sua fatura via WhatsApp?')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('NÃO');
        expect(element(by.id('buttonOne')).getText()).toEqual('SIM, CADASTRAR WHATSAPP');
        element(by.id('buttonOne')).click();
        //Digitar numerdo do WhatsApp
        browser.wait(ExpectedConditions.presenceOf(element(by.id('title'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')).isDisplayed());
        expect(element(by.id('tel')).isDisplayed());
        expect(element(by.id('confirmarTel')).isDisplayed());
        expect(element(by.id('buttonTwo')).getText()).toEqual('VOLTAR');
        expect(element(by.id('buttonOne')).getText()).toEqual('CONFIRMAR');
        expect(element(by.id('buttonOne')).isEnabled(false));
        element(by.id('tel')).sendKeys('12123456789');
        element(by.id('confirmarTel')).sendKeys('22123456789');
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'Os números não conferem. Tente novamente')).isDisplayed());
        expect(element(by.id('buttonOne')).isEnabled(false));
    })
})
