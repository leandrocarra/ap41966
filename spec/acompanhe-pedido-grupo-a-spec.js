const { browser, element } = require("protractor");
var originalTimeout;
xdescribe('acompanheSeuPedidoGrupoA', function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;


    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get('http://localhost:4200/#/login');
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.mb-4'))), 5000);
        var titleCpfCnpj = element(by.css('button.btn.btn-primary-p-green.btn-login'));
        expect(titleCpfCnpj.getText()).toEqual('ENTRAR');
        element(by.id('userId')).sendKeys('45774064000188');
        element(by.id('password')).sendKeys('QAZneoenergia@1');
        browser.executeScript('arguments[0].click()', element(by.buttonText('ENTRAR')).getWebElement());
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 5000);
        expect(browser.getCurrentUrl()).not.toEqual("http://localhost:4200/#/login");
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
        element(by.css('.col-10.row')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.text-black'))), 5000);
        expect(element(by.css('.text-black')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc10720_acompanheSeuPedidoGrupoA_fluxoBasico', function() {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Suas Solicitações'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-4', 'Confira todas as solicitações realizadas para a sua unidade consumidora.')).isDisplayed());
        expect(element(by.cssContainingText('.t-faturas-title', 'ACOMPANHAR SOLICITAÇÕES')).isDisplayed());
        expect(element(by.css('input[placeholder="Pesquisar..."]')).isDisplayed());
        expect(element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Início')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Final')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.btn.btn-limpar-filtros', 'Limpar Filtros')).isDisplayed());
        element.all(by.cssContainingText('.mat-content', 'Em andamento')).first().click();
    })

    it('tc10722_acompanheSeuPedidoGrupoA_filtrarProtoco', function() {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Suas Solicitações'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-4', 'Confira todas as solicitações realizadas para a sua unidade consumidora.')).isDisplayed());
        expect(element(by.cssContainingText('.t-faturas-title', 'ACOMPANHAR SOLICITAÇÕES')).isDisplayed());
        expect(element(by.css('input[placeholder="Pesquisar..."]')).isDisplayed());
        expect(element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Início')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Final')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.btn.btn-limpar-filtros', 'Limpar Filtros')).isDisplayed());
        var solicitacoes = element.all(by.css('.mat-content')).count();
        element(by.css('input[placeholder="Pesquisar..."]')).sendKeys('999999999');
        var filtro = element.all(by.css('.mat-content')).count();
        expect(filtro).toBe(1);
        expect(filtro).not.toEqual(solicitacoes);
        expect(element(by.cssContainingText('.mat-content', '999999999')).isDisplayed());
    })


    it('tc10723_acompanheSeuPedidoGrupoA_filtrarStatus', function() {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Suas Solicitações'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-4', 'Confira todas as solicitações realizadas para a sua unidade consumidora.')).isDisplayed());
        expect(element(by.cssContainingText('.t-faturas-title', 'ACOMPANHAR SOLICITAÇÕES')).isDisplayed());
        expect(element(by.css('input[placeholder="Pesquisar..."]')).isDisplayed());
        expect(element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Início')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Final')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.btn.btn-limpar-filtros', 'Limpar Filtros')).isDisplayed());
        var solicitacoes = element.all(by.css('.mat-content')).count();
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', 'Concluída'))), 10000);
        element(by.cssContainingText('.mat-option-text', 'Concluída')).click();
        var filtro = element.all(by.css('.mat-content')).count();
        expect(filtro).not.toEqual(solicitacoes);
        expect(filtro).toBe(3);
    })

    it('tc10724_acompanheSeuPedidoGrupoA_filtrarData', function() {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Suas Solicitações'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-4', 'Confira todas as solicitações realizadas para a sua unidade consumidora.')).isDisplayed());
        expect(element(by.cssContainingText('.t-faturas-title', 'ACOMPANHAR SOLICITAÇÕES')).isDisplayed());
        expect(element(by.css('input[placeholder="Pesquisar..."]')).isDisplayed());
        expect(element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Início')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Final')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.btn.btn-limpar-filtros', 'Limpar Filtros')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Início')).getWebElement());
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-calendar-body-cell-content', '2'))), 10000);
        element(by.cssContainingText('.mat-calendar-body-cell-content', '2')).click();
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Final')).getWebElement());
        element(by.cssContainingText('.mat-calendar-body-cell-content', '20')).click();
    })

    it('tc10725_acompanheSeuPedidoGrupoA_filtrarDataInvalida', function() {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Suas Solicitações'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-4', 'Confira todas as solicitações realizadas para a sua unidade consumidora.')).isDisplayed());
        expect(element(by.cssContainingText('.t-faturas-title', 'ACOMPANHAR SOLICITAÇÕES')).isDisplayed());
        expect(element(by.css('input[placeholder="Pesquisar..."]')).isDisplayed());
        expect(element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Início')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Final')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.btn.btn-limpar-filtros', 'Limpar Filtros')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Início')).getWebElement());
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-calendar-body-cell-content', '2'))), 10000);
        element(by.cssContainingText('.mat-calendar-body-cell-content', '20')).click();
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Final')).getWebElement());
        element(by.cssContainingText('.mat-calendar-body-cell-content', '2')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Data final não pode ser menor que a inicial'))), 10000);
        expect(element(by.buttonText('FECHAR')).isDisplayed());
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Suas Solicitações'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-4', 'Confira todas as solicitações realizadas para a sua unidade consumidora.')).isDisplayed());
    })

    it('tc10727_acompanheSeuPedidoGrupoA_filtrarStatusAndamento', function() {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Suas Solicitações'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-4', 'Confira todas as solicitações realizadas para a sua unidade consumidora.')).isDisplayed());
        expect(element(by.cssContainingText('.t-faturas-title', 'ACOMPANHAR SOLICITAÇÕES')).isDisplayed());
        expect(element(by.css('input[placeholder="Pesquisar..."]')).isDisplayed());
        expect(element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Início')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Final')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.btn.btn-limpar-filtros', 'Limpar Filtros')).isDisplayed());
        var solicitacoes = element.all(by.css('.mat-content')).count();
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', 'Em andamento'))), 10000);
        element(by.cssContainingText('.mat-option-text', 'Em andamento')).click();
        var filtro = element.all(by.css('.mat-content')).count();
        expect(filtro).not.toEqual(solicitacoes);
    })

    it('tc10728_acompanheSeuPedidoGrupoA_filtrarStatusConcluido', function() {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Suas Solicitações'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-4', 'Confira todas as solicitações realizadas para a sua unidade consumidora.')).isDisplayed());
        expect(element(by.cssContainingText('.t-faturas-title', 'ACOMPANHAR SOLICITAÇÕES')).isDisplayed());
        expect(element(by.css('input[placeholder="Pesquisar..."]')).isDisplayed());
        expect(element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Início')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Final')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.btn.btn-limpar-filtros', 'Limpar Filtros')).isDisplayed());
        var solicitacoes = element.all(by.css('.mat-content')).count();
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', 'Concluída'))), 10000);
        element(by.cssContainingText('.mat-option-text', 'Concluída')).click();
        var filtro = element.all(by.css('.mat-content')).count();
        expect(filtro).not.toEqual(solicitacoes);
    })

    it('tc10732_acompanheSeuPedidoGrupoA_filtrarStatusCancelado', function() {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Suas Solicitações'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-4', 'Confira todas as solicitações realizadas para a sua unidade consumidora.')).isDisplayed());
        expect(element(by.cssContainingText('.t-faturas-title', 'ACOMPANHAR SOLICITAÇÕES')).isDisplayed());
        expect(element(by.css('input[placeholder="Pesquisar..."]')).isDisplayed());
        expect(element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Início')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Final')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.btn.btn-limpar-filtros', 'Limpar Filtros')).isDisplayed());
        var solicitacoes = element.all(by.css('.mat-content')).count();
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', 'Cancelada'))), 10000);
        element(by.cssContainingText('.mat-option-text', 'Finalizada')).click();
        var filtro = element.all(by.css('.mat-content')).count();
        expect(filtro).not.toEqual(solicitacoes);
    })

    it('tc10735_acompanheSeuPedidoGrupoA_filtrarStatusRejeitada', function() {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Suas Solicitações'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-4', 'Confira todas as solicitações realizadas para a sua unidade consumidora.')).isDisplayed());
        expect(element(by.cssContainingText('.t-faturas-title', 'ACOMPANHAR SOLICITAÇÕES')).isDisplayed());
        expect(element(by.css('input[placeholder="Pesquisar..."]')).isDisplayed());
        expect(element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Início')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Final')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.btn.btn-limpar-filtros', 'Limpar Filtros')).isDisplayed());
        var solicitacoes = element.all(by.css('.mat-content')).count();
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', 'Rejeitada'))), 10000);
        element(by.cssContainingText('.mat-option-text', 'Finalizada')).click();
        var filtro = element.all(by.css('.mat-content')).count();
        expect(filtro).not.toEqual(solicitacoes);
    })

    it('tc10743_acompanheSeuPedidoGrupoA_limparFiltros', function() {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Acompanhar solicitações')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Suas Solicitações'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-4', 'Confira todas as solicitações realizadas para a sua unidade consumidora.')).isDisplayed());
        expect(element(by.cssContainingText('.t-faturas-title', 'ACOMPANHAR SOLICITAÇÕES')).isDisplayed());
        expect(element(by.css('input[placeholder="Pesquisar..."]')).isDisplayed());
        expect(element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Início')).isDisplayed());
        expect(element(by.cssContainingText('.custom-label.ng-star-inserted', 'Data Final')).isDisplayed());
        expect(element(by.cssContainingText('.mt-2.btn.btn-limpar-filtros', 'Limpar Filtros')).isDisplayed());
        var solicitacoes = element.all(by.css('.mat-content')).count();
        element(by.css('input[placeholder="Pesquisar..."]')).sendKeys('999999999');
        var filtro = element.all(by.css('.mat-content')).count();
        expect(filtro).toBe(1);
        expect(filtro).not.toEqual(solicitacoes);
        element(by.cssContainingText('.mt-2.btn.btn-limpar-filtros', 'Limpar Filtros')).click();
        var solicitacoes2= element.all(by.css('.mat-content')).count();
        expect(solicitacoes2).toEqual(solicitacoes);
    })

})