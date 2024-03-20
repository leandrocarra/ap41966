const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Minha Conta', function() {
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
        element(by.cssContainingText('.mat-button-wrapper', 'Minha conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloH2'))), 5000);
    })

    it('tc8095_minhaConta_fluxoBásico', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        expect(element(by.cssContainingText('.mat-form-field-label-wrapper', 'NOME DO TITULAR')));
        expect(element(by.cssContainingText('.mat-form-field-label-wrapper', 'CPF')));
        expect(element(by.id('CPF')).getText()).not.toEqual('');
        expect(element(by.cssContainingText('.mat-form-field-infix', 'NÚMERO DO RG')).getText()).not.toEqual('');
        expect(element(by.cssContainingText('.mat-form-field-infix', 'DATA DE NASCIMENTO')).getText()).not.toEqual('');
        expect(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE CADASTRO')).getText()).not.toEqual('');
        expect(element(by.cssContainingText('.mat-form-field-infix', 'TELEFONE')).getText()).not.toEqual('');
        expect(element(by.cssContainingText('.mat-form-field-infix', 'CELULAR')).getText()).not.toEqual('');
        expect(element(by.cssContainingText('.mat-form-field-infix', 'USUÁRIO DE ACESSO')).getText()).not.toEqual('');
        expect(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE ACESSO')).getText()).not.toEqual('');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
    })

    it('tc8100_minhaConta_editarDados', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-label-wrapper', 'NOME DO TITULAR')).isEnabled(false));
        expect(element(by.cssContainingText('.mat-form-field-label-wrapper', 'CPF')).isEnabled(false));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'NÚMERO DO RG')).isEnabled(false));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'DATA DE NASCIMENTO')).isEnabled(false));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE CADASTRO')).isEnabled(true));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'TELEFONE')).isEnabled(true));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'CELULAR')).isEnabled(true));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'USUÁRIO DE ACESSO')).isEnabled(true));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE ACESSO')).isEnabled(true));
        expect(element(by.cssContainingText('.btn-neo-outline-secondary', 'VOLTAR')).isEnabled(true));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8102_minhaConta_editarEmailCadastro', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE CADASTRO')).isEnabled(true));
        element(by.css('input[ng-reflect-name="emailCadastro"]')).clear();
        element(by.css('input[ng-reflect-name="emailCadastro"]')).sendKeys('teste@teste.com');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(true));
        element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        //Pop-up de alteração com sucesso
        expect(element(by.cssContainingText('.swal2-content', 'Dados alterados com sucesso!')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE CADASTRO'))), 5000);
        //Retorno para a tela de Editar Dados
        expect(element(by.css('input[ng-reflect-name="emailCadastro"]')).isEnabled(false));
    })

    it('tc8103_minhaConta_editarTelefone', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'TELEFONE')).isEnabled(true));
        element(by.css('input[ng-reflect-mask-expression="(00) 0000-0000"]')).clear();
        element(by.css('input[ng-reflect-mask-expression="(00) 0000-0000"]')).sendKeys('0012341234');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(true));
        element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        //Pop-up de alteração com sucesso
        expect(element(by.cssContainingText('.swal2-content', 'Dados alterados com sucesso!')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-form-field-infix', 'TELEFONE'))), 5000);
        //Retorno para a tela de Editar Dados
        expect(element(by.css('input[ng-reflect-mask-expression="(00) 0000-0000"]')).isEnabled(false));
    })

    it('tc8104_minhaConta_editarCelular', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'CELULAR')).isEnabled(true));
        element(by.css('input[ng-reflect-mask-expression="(00) 0 0000-0000"]')).clear();
        element(by.css('input[ng-reflect-mask-expression="(00) 0 0000-0000"]')).sendKeys('00123451234');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(true));
        element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        //Pop-up de alteração com sucesso
        expect(element(by.cssContainingText('.swal2-content', 'Dados alterados com sucesso!')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-form-field-infix', 'CELULAR'))), 5000);
        //Retorno para a tela de Editar Dados
        expect(element(by.css('input[ng-reflect-mask-expression="(00) 0 0000-0000"]')).isEnabled(false));
    })

    it('tc8105_minhaConta_editarUsuarioAcesso', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'USUÁRIO DE ACESSO')).isEnabled(true));
        element(by.css('input[ng-reflect-name="usuarioAcesso"]')).clear();
        element(by.css('input[ng-reflect-name="usuarioAcesso"')).sendKeys('Teste Editar');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(true));
        element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        //Pop-up de alteração com sucesso
        expect(element(by.cssContainingText('.swal2-content', 'Dados alterados com sucesso!')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-form-field-infix', 'USUÁRIO DE ACESSO'))), 5000);
        //Retorno para a tela de Editar Dados
        expect(element(by.css('input[ng-reflect-name="usuarioAcesso"')).isEnabled(false));
    })

    it('tc8106_minhaConta_editarEmailAcesso', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE ACESSO')).isEnabled(true));
        element(by.css('input[ng-reflect-name="emailAcesso"]')).clear();
        element(by.css('input[ng-reflect-name="emailAcesso"]')).sendKeys('teste@teste.com');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(true));
        element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        //Pop-up de alteração com sucesso
        expect(element(by.cssContainingText('.swal2-content', 'Dados alterados com sucesso!')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE ACESSO'))), 5000);
        //Retorno para a tela de Editar Dados
        expect(element(by.css('input[ng-reflect-name="emailAcesso"]')).isEnabled(false));
    })

    it('tc8107_minhaConta_alterarSenha', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        expect(element(by.id('password')).isPresent());
        element(by.id('password')).sendKeys('Elektro20');
        expect(element(by.id('password2')).isPresent());
        element(by.id('password2')).sendKeys('Elektro20');
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(true));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).getWebElement());
        //Pop-up de alteração com sucesso
        expect(element(by.cssContainingText('.swal2-content', 'Senha alterada com sucesso!')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloH2'))), 5000);
        //Retorno para a tela de Editar Dados
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
    })

    it('tc8135_minhaConta_visualizarSenha', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        expect(element(by.id('password')).isPresent());
        element(by.id('password')).sendKeys('Elektro20');
        var senha = element(by.id('password'));
        expect(senha.getAttribute('type')).toEqual('password');
        expect(element(by.id('password2')).isPresent());
        element(by.id('password2')).sendKeys('Elektro20');
        var confirmacao = element(by.id('password2')).getAttribute('type');
        expect(confirmacao.getAttribute('type')).toEqual('password');
        browser.executeScript('arguments[0].click()', element(by.css('.visibillity-eye.mat-icon.notranslate.material-icons.mat-icon-no-color')).getWebElement());
        var senha2 = element(by.id('password')).getAttribute('type');
        expect(senha2.getAttribute('type')).toEqual('text');
    })

    it('tc8108_minhaConta_editarDadosVoltar', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-label-wrapper', 'NOME DO TITULAR')).isEnabled(false));
        expect(element(by.cssContainingText('.mat-form-field-label-wrapper', 'CPF')).isEnabled(false));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'NÚMERO DO RG')).isEnabled(false));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'DATA DE NASCIMENTO')).isEnabled(false));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE CADASTRO')).isEnabled(true));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'TELEFONE')).isEnabled(true));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'CELULAR')).isEnabled(true));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'USUÁRIO DE ACESSO')).isEnabled(true));
        expect(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE ACESSO')).isEnabled(true));
        expect(element(by.cssContainingText('.btn-neo-outline-secondary', 'VOLTAR')).isEnabled(true));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        element(by.cssContainingText('.btn-neo-outline-secondary', 'VOLTAR')).click();
        //Retorno para a tela de Editar Dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
    })

    it('tc8137_minhaConta_alterarSenhaVoltar', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.id('password')).isPresent());
        expect(element(by.id('password2')).isPresent());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neo-outline-secondary', 'VOLTAR')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-neo-outline-secondary', 'VOLTAR')).getWebElement());
        //Retorno para a tela de Editar Dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
    })

    it('tc8109_minhaConta_editarEmailCadastroVazio', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE CADASTRO')).isEnabled(true));
        var email = element(by.css('input[ng-reflect-name="emailCadastro"]'));
        var ctrlA = protractor.Key.chord(protractor.Key.CONTROL, "a");
        email.sendKeys(ctrlA);
        email.sendKeys(protractor.Key.BACK_SPACE);
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.ng-star-inserted', 'Este e-mail não é válido. Verifique novamente')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8110_minhaConta_editarTelefoneVazio', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'TELEFONE')).isEnabled(true));
        var telefone = element(by.css('input[ng-reflect-mask-expression="(00) 0000-0000"]'));
        var ctrlA = protractor.Key.chord(protractor.Key.CONTROL, "a");
        telefone.sendKeys(ctrlA);
        telefone.sendKeys(protractor.Key.BACK_SPACE);
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'Número inválido')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8111_minhaConta_editarCelularVazio', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'CELULAR')).isEnabled(true));
        var celular = element(by.css('input[ng-reflect-mask-expression="(00) 0 0000-0000"]'));
        var ctrlA = protractor.Key.chord(protractor.Key.CONTROL, "a");
        celular.sendKeys(ctrlA);
        celular.sendKeys(protractor.Key.BACK_SPACE);
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'Número inválido')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8112_minhaConta_editarUsuarioAcessoVazio', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'USUÁRIO DE ACESSO')).isEnabled(true));
        var email = element(by.css('input[ng-reflect-name="usuarioAcesso"]'));
        var ctrlA = protractor.Key.chord(protractor.Key.CONTROL, "a");
        email.sendKeys(ctrlA);
        email.sendKeys(protractor.Key.BACK_SPACE);
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.ng-star-inserted', 'Verifique o preenchimento. Tente novamente')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8113_minhaConta_editarEmailAcessoVazio', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE ACESSO')).isEnabled(true));
        var email = element(by.css('input[ng-reflect-name="emailAcesso"]'));
        var ctrlA = protractor.Key.chord(protractor.Key.CONTROL, "a");
        email.sendKeys(ctrlA);
        email.sendKeys(protractor.Key.BACK_SPACE);
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.ng-star-inserted', 'Este e-mail não é válido. Verifique novamente')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8114_minhaConta_alterarSenhaVazia', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        expect(element(by.id('password')).isPresent());
        expect(element(by.id('password2')).isPresent());
        element(by.id('password2')).sendKeys('Elektro20');
        expect(element(by.cssContainingText('.not-according-criteria', 'As informações de acesso fornecidas não são válidas. Tente novamente.')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8115_minhaConta_confirmarSenhaVazia', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        expect(element(by.id('password')).isPresent());
        element(by.id('password')).sendKeys('Elektro20');
        expect(element(by.id('password2')).isPresent());
        expect(element(by.css('.margin-btn.ng-star-inserted')).getText()).toEqual('report_problem As informações de acesso fornecidas não são válidas. Tente novamente.');
        expect(element(by.cssContainingText('.row.ng-star-inserted', 'close As senhas coincidem.')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8117_minhaConta_editarEmailCadastroInvalido', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE CADASTRO')).isEnabled(true));
        element(by.css('input[ng-reflect-name="emailCadastro"]')).clear().sendKeys('teste');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.ng-star-inserted', 'Este e-mail não é válido. Verifique novamente')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8118_minhaConta_editarTelefoneIncompleto', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'TELEFONE')).isEnabled(true));
        element(by.css('input[ng-reflect-mask-expression="(00) 0000-0000"]')).clear().sendKeys('12345');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'Número inválido')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8119_minhaConta_editarCelularIncompleto', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'CELULAR')).isEnabled(true));
        element(by.css('input[ng-reflect-mask-expression="(00) 0 0000-0000"]')).clear().sendKeys('12345');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'Número inválido')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8120_minhaConta_editarUsuarioAcessoIncompleto', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'USUÁRIO DE ACESSO')).isEnabled(true));
        element(by.css('input[ng-reflect-name="usuarioAcesso"]')).clear().sendKeys('teste');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8122_minhaConta_editarEmailAcessoInvalido', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'E-MAIL DE ACESSO')).isEnabled(true));
        element(by.css('input[ng-reflect-name="emailAcesso"]')).clear().sendKeys('teste');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.ng-star-inserted', 'Este e-mail não é válido. Verifique novamente')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8126_minhaConta_senhaPoucosCaracteres', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        expect(element(by.id('password')).isPresent());
        element(by.id('password')).sendKeys('Elek');
        expect(element(by.id('password2')).isPresent());
        element(by.id('password2')).sendKeys('Elek');
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.row.ng-star-inserted', 'close'))), 5000);
        expect(element(by.cssContainingText('.row.ng-star-inserted', 'Mínimo de 8 caracteres.')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8127_minhaConta_senhaNumerosSequencia', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        expect(element(by.id('password')).isPresent());
        element(by.id('password')).sendKeys('Elektro678');
        expect(element(by.id('password2')).isPresent());
        element(by.id('password2')).sendKeys('Elektro678');
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.row.ng-star-inserted', 'close'))), 5000);
        expect(element(by.cssContainingText('.row.ng-star-inserted', 'Não sequencial (ex: 1, 2, 3, 4...).')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8128_minhaConta_senhaPartesCPF', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        expect(element(by.id('password')).isPresent());
        element(by.id('password')).sendKeys('Elektro21');
        expect(element(by.id('password2')).isPresent());
        element(by.id('password2')).sendKeys('Elektro21');
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.row.ng-star-inserted', 'close'))), 5000);
        expect(element(by.cssContainingText('.row.ng-star-inserted', 'Não ter partes do seu CPF.')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8130_minhaConta_senhaNumerosRepetidos', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        expect(element(by.id('password')).isPresent());
        element(by.id('password')).sendKeys('Elektro2222');
        expect(element(by.id('password2')).isPresent());
        element(by.id('password2')).sendKeys('Elektro2222');
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.row.ng-star-inserted', 'close'))), 5000);
        expect(element(by.cssContainingText('.row.ng-star-inserted', 'Sem partes repetidas (ex: 1, 2, 1, 2, 1, 2).')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8131_minhaConta_senhaConfirmacaoDiferentes', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        expect(element(by.id('password')).isPresent());
        element(by.id('password')).sendKeys('Elektro20');
        expect(element(by.id('password2')).isPresent());
        element(by.id('password2')).sendKeys('Elektro21');
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.row.ng-star-inserted', 'close'))), 5000);
        expect(element(by.cssContainingText('.row.ng-star-inserted', 'As senhas coincidem.')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8132_minhaConta_digitarLetrasTelefone', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'TELEFONE')).isEnabled(true));
        element(by.css('input[ng-reflect-mask-expression="(00) 0000-0000"]')).clear().sendKeys('abcd');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'Número inválido')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8133_minhaConta_digitarLetrasCelular', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'CELULAR')).isEnabled(true));
        element(by.css('input[ng-reflect-mask-expression="(00) 0 0000-0000"]')).clear().sendKeys('abcd');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.row.ps-3.mt-1.conf-text-input-mat-error', 'Número inválido')).isDisplayed());
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8134_minhaConta_digitarNumerosUsuarioAcesso', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'USUÁRIO DE ACESSO')).isEnabled(true));
        element(by.css('input[ng-reflect-name="usuarioAcesso"]')).clear().sendKeys('1234');
        element(by.css('.mat-checkbox-inner-container')).click();
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    it('tc8188_minhaConta_semSelecionarTermos', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'USUÁRIO DE ACESSO')).isEnabled(true));
        element(by.css('input[ng-reflect-name="usuarioAcesso"]')).clear().sendKeys('1234');
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
    })

    xit('tc8296_minhaConta_editarDadosTrocarMenuServico', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'USUÁRIO DE ACESSO')).isEnabled(true));
        element(by.css('input[ng-reflect-name="usuarioAcesso"]')).clear().sendKeys('Teste Test');
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.h4', 'Tem certeza que deseja cancelar esta solicitação?')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'SIM')).isDisplayed());
        expect(element(by.cssContainingText('.swal2-cancel.swal2-styled', 'NÃO')).isDisplayed());
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'SIM')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
    })

    it('tc8297_minhaConta_editarDadosTrocarMenuAjuda', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'USUÁRIO DE ACESSO')).isEnabled(true));
        element(by.css('input[ng-reflect-name="usuarioAcesso"]')).clear().sendKeys('Teste Test');
        element(by.cssContainingText('.mat-button-wrapper', 'Ajuda')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Fale conosco')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.h4', 'Tem certeza que deseja cancelar esta solicitação?')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'SIM')).isDisplayed());
        expect(element(by.cssContainingText('.swal2-cancel.swal2-styled', 'NÃO')).isDisplayed());
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'SIM')).click();
    })

    it('tc8298_minhaConta_editarDadosTrocarHome', function () {
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES'))), 5000);
        expect(element(by.cssContainingText('.mat-form-field-infix', 'USUÁRIO DE ACESSO')).isEnabled(true));
        element(by.css('input[ng-reflect-name="usuarioAcesso"]')).clear().sendKeys('Teste Test');
        element(by.cssContainingText('.mat-button-wrapper', 'Home')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.h4', 'Tem certeza que deseja cancelar esta solicitação?')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'SIM')).isDisplayed());
        expect(element(by.cssContainingText('.swal2-cancel.swal2-styled', 'NÃO')).isDisplayed());
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'SIM')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc8299_minhaConta_alterarSenhaTrocarMenuServiços', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        expect(element(by.id('password')).isPresent());
        element(by.id('password')).sendKeys('Elektro20');
        expect(element(by.id('password2')).isPresent());
        element(by.id('password2')).sendKeys('Elektro20');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).getWebElement());
        browser.sleep(5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.h4', 'Tem certeza que deseja cancelar esta solicitação?')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'SIM')).isDisplayed());
        expect(element(by.cssContainingText('.swal2-cancel.swal2-styled', 'NÃO')).isDisplayed());
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'SIM')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
    })

    it('tc8300_minhaConta_alterarSenhaTrocarMenuAjuda', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        expect(element(by.id('password')).isPresent());
        element(by.id('password')).sendKeys('Elektro20');
        expect(element(by.id('password2')).isPresent());
        element(by.id('password2')).sendKeys('Elektro20');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Ajuda')).getWebElement());
        browser.sleep(5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Fale conosco')).click();
    })

    it('tc8315_minhaConta_alterarSenhaTrocarHome', function () {
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'EDITAR DADOS')));
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')));
        element(by.cssContainingText('.btn-neoprimary', 'ALTERAR SENHA')).click();
        //Tela de alterar senha
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Alterar Senha'))), 5000);
        ExpectedConditions.presenceOf(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')));
        expect(element(by.cssContainingText('.btn-neoprimary', 'SALVAR ALTERAÇÕES')).isEnabled(false));
        expect(element(by.id('password')).isPresent());
        element(by.id('password')).sendKeys('Elektro20');
        expect(element(by.id('password2')).isPresent());
        element(by.id('password2')).sendKeys('Elektro20');
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-button-wrapper', 'Home')).getWebElement());
    	//browser.sleep(5000);
        browser.wait(ExpectedConditions.presenceOf(element(by.id('swal2-content'))), 5000);
        expect(element(by.cssContainingText('.h4', 'Tem certeza que deseja cancelar esta solicitação?')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'SIM')).isDisplayed());
        expect(element(by.cssContainingText('.swal2-cancel.swal2-styled', 'NÃO')).isDisplayed());
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'SIM')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })
})
