const { browser, element } = require("protractor");
const { last } = require("rxjs-compat/operator/last");
var originalTimeout;

xdescribe('Entenda sua Conta', function() {
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

    it('tc10329_entendaSuaConta_fluxoBasico', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
        element(by.cssContainingText('.content-button', ' Mais Serviços ')).click();
        element(by.buttonText('Entenda sua Conta')).click();
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
        expect(element(by.cssContainingText('.titulo.mt-7', 'Composição da sua conta')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3', 'Selecionar o tipo:')).isDisplayed());
        expect(element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).first().isDisplayed());
        expect(element.all(by.css('.chartjs-size-monitor')).first().isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'perdas')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'tributos')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'transmissão')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'serviços de distribuição')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'energia')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'encargos')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'demais itens')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-dado-fatura.mb-3', 'Bandeira Tarifária')).isDisplayed());
        expect(element(by.css('.material-icons-outlined.BandeiraVermelha1')).isDisplayed());
        expect(element(by.cssContainingText('.m-0.subtitulo-dado-fatura', 'Entre 05/12/21 e 15/12/2021')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-dado-fatura', 'Bandeira vermelha patamar 1. Condições mais custosa')).isDisplayed());
        expect(element(by.css('.material-icons-outlined.BandeiraVerde')).isDisplayed());
        expect(element(by.cssContainingText('.m-0.subtitulo-dado-fatura', 'Entre 16/12/21 e 31/12/2021')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-dado-fatura', 'Bandeira verde. Condições favoráveis de geração de energia. A tarifa não sofre nenhum acréscimo.')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-dado-fatura.mb-3', 'Consumo')).isDisplayed());
        expect(element(by.css('.material-icons-outlined.Consumo')).isDisplayed());
        expect(element(by.cssContainingText('.m-0.subtitulo-fatura', '350 kWh')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-dado-fatura', 'Percebemos que o valor da sua conta diminuiu 43% em relação ao mês anterior.')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-dado-fatura.mb-3', 'Valor da Conta')).isDisplayed());
        expect(element(by.css('.material-icons-outlined.valorConta')).isDisplayed());
        expect(element(by.cssContainingText('.m-0.subtitulo-fatura', 'R$ 106,90')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-dado-fatura', 'Vencimento: 08/03/2021. Forma de pagamento: Boleto')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-dado-fatura.mb-3', 'Leitura')).isDisplayed());
        expect(element(by.css('.material-icons-outlined.Leitura')).isDisplayed());
        expect(element(by.cssContainingText('.m-0.subtitulo-fatura', '5249')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-dado-fatura', 'Você está dentro de sua média de consumo. Data da próxima leitura: 08/04/2021.')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-indicadores.mb-3', 'Indicadores de Continuidade de Serviço')).isDisplayed());
        expect(element(by.cssContainingText('.subtitulo-indicadores.mb-3', 'Duração e frequência das apurações')).isDisplayed());
        expect(element(by.cssContainingText('.col-2.headers', 'Limite Mensal')).isDisplayed());
        expect(element(by.cssContainingText('.col-2.headers', 'Valor Apurado')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.headers', 'Crédito Apurado')).isDisplayed());
        expect(element(by.cssContainingText('.col-3.headers', 'Compensado')).isDisplayed());
        expect(element(by.cssContainingText('.col-2.headers', 'Crédito Restante ')).isDisplayed());
        expect(element(by.cssContainingText('.title', 'DIC')).isDisplayed());
        expect(element(by.cssContainingText('.description', 'Duração de Interrupção Individual.')).isDisplayed());
        expect(element(by.cssContainingText('.title', 'FIC')).isDisplayed());
        expect(element(by.cssContainingText('.description', 'Frequência de interrupção Individual.')).isDisplayed());
        expect(element(by.cssContainingText('.title', 'DMIC')).isDisplayed());
        expect(element(by.cssContainingText('.description', 'Duração máxima de interrupção contínua.')).isDisplayed());
        expect(element(by.cssContainingText('.title', 'FEC')).isDisplayed());
        expect(element(by.cssContainingText('.description', 'Frequência Equivalente de interrupção por Unidade Consumidora.')).isDisplayed());
        expect(element(by.cssContainingText('.title', 'DEC')).isDisplayed());
        expect(element(by.cssContainingText('.description', 'Duração Equivalente de interrupção por unidade consumidora.')).isDisplayed());
        expect(element(by.cssContainingText('.title', 'DICRI')).isDisplayed());
        expect(element(by.cssContainingText('.description', 'Duração de Interrupção Individual Dia Crítico (Horas).')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        expect(element(by.cssContainingText('.align-left.text-graph-grupo-b.mt-3', 'Clique nas barras para mais detalhes.')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3.toggle-history', 'Selecionar o tipo:')).isDisplayed());
        expect(element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).last().isDisplayed());
        expect(element.all(by.css('.chartjs-size-monitor')).last().isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Consumo')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Média da fatura')).isDisplayed());
        expect(element(by.cssContainingText('.menor-consumo-color.tamanho-fonte', 'Menor consumo')).isDisplayed());
        expect(element(by.css('.material-icons-outlined.clock.menor-consumo-color')).isDisplayed());
        expect(element.all(by.cssContainingText('.date-title', 'Dezembro/2020')).first().isDisplayed());
        expect(element(by.cssContainingText('.subtitle', '129 kWh (-3%)')).isDisplayed());
        expect(element(by.cssContainingText('.media-font-size', '2.20 kWh - média diária')).isDisplayed());
        expect(element(by.cssContainingText('.maior-consumo-color.tamanho-fonte', 'Maior consumo')).isDisplayed());
        expect(element(by.css('.material-icons-outlined.clock.maior-consumo-color')).isDisplayed());
        expect(element.all(by.cssContainingText('.date-title', 'Dezembro/2020')).first().isDisplayed());
        expect(element(by.cssContainingText('.subtitle',  '190 kWh (+1,7%)')).isDisplayed());
        expect(element(by.cssContainingText('.media-font-size', '8.90 kWh - média diária')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-card', 'DICAS DE CONSUMO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted', 'Canal do Youtube')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted', 'Consumo consicente')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted', 'Central de ajuda')).isDisplayed());
        expect(element(by.cssContainingText('.title-protocolo', 'Protocolo Informativo: 123456')).isDisplayed());
    })
    
    it('tc10330_entendaSuaConta_historicoConsumoFaturaPaga', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Lista de Faturas
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'Paga')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-green-sage-100', 'Paga'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Entenda sua Conta')).getWebElement());
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
    })

    it('tc10331_entendaSuaConta_historicoConsumoFaturaAtrasada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Lista de Faturas
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'Atrasada')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-red-200', 'Atrasada'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Entenda sua Conta')).getWebElement());
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
    })

    it('tc10332_entendaSuaConta_historicoConsumoFaturaVencida', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Lista de Faturas
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'A Vencer')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-blue-royal-100', 'A vencer'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Entenda sua Conta')).getWebElement());
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
    })

    it('tc10333_entendaSuaConta_historicoConsumoFaturaProcessando', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Lista de Faturas
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'Processando')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-light-blue-100', 'Processando'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Entenda sua Conta')).getWebElement());
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
    })

    it('tc10334_entendaSuaConta_historicoConsumoFaturaVinculada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Aqui você pode acompanhar o consumo de energia'))), 5000);
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        //Lista de Faturas
        element(by.cssContainingText('.mat-select-value', 'Selecionar Status')).click();
        element(by.cssContainingText('.mat-option-text', 'Vinculada')).click();
        browser.wait(ExpectedConditions.presenceOf(element.all(by.cssContainingText('.d-sm-block.t-color-black-100', 'Vinculada'))), 5000);
        expect(element(by.css('span[style="transform: rotate(0deg);"]')).isDisplayed());
        browser.executeScript('arguments[0].click()', element(by.css('span[style="transform: rotate(0deg);"]')).getWebElement());
        expect(element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.btn-accordion.col-12.mat-menu-trigger.background-group-b', 'Mais Serviços')).getWebElement());
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        browser.executeScript('arguments[0].click()', element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Entenda sua Conta')).getWebElement());
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
    })

    it('tc10335_entendaSuaConta_breadcumb', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
        element(by.cssContainingText('.content-button', ' Mais Serviços ')).click();
        element(by.buttonText('Entenda sua Conta')).click();
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
        expect(element(by.cssContainingText('.titulo.mt-7', 'Composição da sua conta')).isDisplayed());
        expect(element.all(by.css('.chartjs-size-monitor')).first().isDisplayed());
        expect(element(by.cssContainingText('.titulo-indicadores.mb-3', 'Indicadores de Continuidade de Serviço')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        expect(element.all(by.css('.chartjs-size-monitor')).last().isDisplayed());
        expect(element(by.cssContainingText('.titulo-card', 'DICAS DE CONSUMO')).isDisplayed());
        expect(element(by.cssContainingText('.xng-breadcrumb-trail.ng-star-inserted', 'Sua Conta')).isDisplayed());
    })

    it('tc10336_entendaSuaConta_graficoHistoricoConsumoKWh', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
        element(by.cssContainingText('.content-button', ' Mais Serviços ')).click();
        element(by.buttonText('Entenda sua Conta')).click();
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
        expect(element(by.cssContainingText('.titulo.mt-7', 'Composição da sua conta')).isDisplayed());
        expect(element.all(by.css('.chartjs-size-monitor')).first().isDisplayed());
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3.toggle-history', 'Selecionar o tipo:')).isDisplayed());
        expect(element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).last().isDisplayed());
        browser.executeScript('arguments[0].click()', element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).last().getWebElement());
        expect(element.all(by.css('.chartjs-size-monitor')).last().isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Valor em real')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Média da fatura')).isDisplayed());
        browser.executeScript('arguments[0].click()', element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).last().getWebElement());
        expect(element.all(by.css('.chartjs-size-monitor')).last().isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Consumo')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Média da fatura')).isDisplayed());
    })

    it('tc10337_entendaSuaConta_graficoHistoricoConsumoR$', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
        element(by.cssContainingText('.content-button', ' Mais Serviços ')).click();
        element(by.buttonText('Entenda sua Conta')).click();
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
        expect(element(by.cssContainingText('.titulo.mt-7', 'Composição da sua conta')).isDisplayed());
        expect(element.all(by.css('.chartjs-size-monitor')).first().isDisplayed());
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3.toggle-history', 'Selecionar o tipo:')).isDisplayed());
        expect(element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).last().isDisplayed());
        browser.executeScript('arguments[0].click()', element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).last().getWebElement());
        expect(element.all(by.css('.chartjs-size-monitor')).last().isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Valor em real')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Média da fatura')).isDisplayed());
    })

    it('tc10338_entendaSuaConta_graficoSuaContaPorcentagem', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
        element(by.cssContainingText('.content-button', ' Mais Serviços ')).click();
        element(by.buttonText('Entenda sua Conta')).click();
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
        expect(element(by.cssContainingText('.titulo.mt-7', 'Composição da sua conta')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3', 'Selecionar o tipo:')).isDisplayed());
        expect(element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).first().isDisplayed());
        browser.executeScript('arguments[0].click()', element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).first().getWebElement());
        expect(element.all(by.css('.chartjs-size-monitor')).first().isDisplayed());
        browser.executeScript('arguments[0].click()', element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).first().getWebElement());
        expect(element(by.cssContainingText('.descricao-titulo', 'perdas')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'tributos')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'transmissão')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'serviços de distribuição')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'energia')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'encargos')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'demais itens')).isDisplayed());
    })

    it('tc10339_entendaSuaConta_graficoSuaContaR$', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
        element(by.cssContainingText('.content-button', ' Mais Serviços ')).click();
        element(by.buttonText('Entenda sua Conta')).click();
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
        expect(element(by.cssContainingText('.titulo.mt-7', 'Composição da sua conta')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3', 'Selecionar o tipo:')).isDisplayed());
        expect(element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).first().isDisplayed());
        browser.executeScript('arguments[0].click()', element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).first().getWebElement());
        expect(element.all(by.css('.chartjs-size-monitor')).first().isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'perdas')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'tributos')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'transmissão')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'serviços de distribuição')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'energia')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'encargos')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'demais itens')).isDisplayed());
    })

    it('tc10340_entendaSuaConta_canalYoutube', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
        element(by.cssContainingText('.content-button', ' Mais Serviços ')).click();
        element(by.buttonText('Entenda sua Conta')).click();
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
        expect(element(by.cssContainingText('.titulo.mt-7', 'Composição da sua conta')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3', 'Selecionar o tipo:')).isDisplayed());
        expect(element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).first().isDisplayed());
        expect(element.all(by.css('.chartjs-size-monitor')).first().isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'perdas')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'tributos')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'transmissão')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'serviços de distribuição')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'energia')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'encargos')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'demais itens')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-indicadores.mb-3', 'Indicadores de Continuidade de Serviço')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3.toggle-history', 'Selecionar o tipo:')).isDisplayed());
        expect(element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).last().isDisplayed());
        expect(element.all(by.css('.chartjs-size-monitor')).last().isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Consumo')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Média da fatura')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-card', 'DICAS DE CONSUMO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted', 'Canal do Youtube')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted', 'Consumo consicente')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted', 'Central de ajuda')).isDisplayed());
        var link = element.all(by.css('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted')).get(0).all(by.tagName('a'));
        expect(link.getAttribute('href')).toContain('https://www.youtube.com/c/NeoenergiaElektro');
        link.click();
    })

    it('tc10341_entendaSuaConta_consumoConsciente', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
        element(by.cssContainingText('.content-button', ' Mais Serviços ')).click();
        element(by.buttonText('Entenda sua Conta')).click();
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
        expect(element(by.cssContainingText('.titulo.mt-7', 'Composição da sua conta')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3', 'Selecionar o tipo:')).isDisplayed());
        expect(element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).first().isDisplayed());
        expect(element.all(by.css('.chartjs-size-monitor')).first().isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'perdas')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'tributos')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'transmissão')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'serviços de distribuição')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'energia')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'encargos')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'demais itens')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-indicadores.mb-3', 'Indicadores de Continuidade de Serviço')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3.toggle-history', 'Selecionar o tipo:')).isDisplayed());
        expect(element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).last().isDisplayed());
        expect(element.all(by.css('.chartjs-size-monitor')).last().isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Consumo')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Média da fatura')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-card', 'DICAS DE CONSUMO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted', 'Canal do Youtube')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted', 'Consumo consicente')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted', 'Central de ajuda')).isDisplayed());
        var link = element.all(by.css('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted')).get(1).all(by.tagName('a'));
        expect(link.getAttribute('href')).toContain('https://www.elektro.com.br/sua-casa/dicas-de-economia-e-seguranca-com-energia-eletrica');
        link.click();
    })

    it('tc10342_entendaSuaConta_centralAjuda', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Faturas e 2ª via de conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Consultar débitos e emitir 2ª via de faturas'))), 5000);
        element(by.cssContainingText('.content-button', ' Mais Serviços ')).click();
        element(by.buttonText('Entenda sua Conta')).click();
        //Tela do Entenda sua conta
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entenda sua conta'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Por meio deste serviço, você pode entender a sua fatura e consumo')).isDisplayed());
        expect(element(by.cssContainingText('.titulo.mt-7', 'Composição da sua conta')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3', 'Selecionar o tipo:')).isDisplayed());
        expect(element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).first().isDisplayed());
        expect(element.all(by.css('.chartjs-size-monitor')).first().isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'perdas')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'tributos')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'transmissão')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'serviços de distribuição')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'energia')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'encargos')).isDisplayed());
        expect(element(by.cssContainingText('.descricao-titulo', 'demais itens')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-indicadores.mb-3', 'Indicadores de Continuidade de Serviço')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-grupo-a.mt-7.ng-star-inserted', 'Histórico de consumo')).isDisplayed());
        expect(element(by.cssContainingText('.align-right.text-graph.mt-3.toggle-history', 'Selecionar o tipo:')).isDisplayed());
        expect(element.all(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).last().isDisplayed());
        expect(element.all(by.css('.chartjs-size-monitor')).last().isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Consumo')).isDisplayed());
        expect(element(by.cssContainingText('.legend.mt-mb-16', 'Média da fatura')).isDisplayed());
        expect(element(by.cssContainingText('.titulo-card', 'DICAS DE CONSUMO')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted', 'Canal do Youtube')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted', 'Consumo consicente')).isDisplayed());
        expect(element(by.cssContainingText('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted', 'Central de ajuda')).isDisplayed());
        var link = element.all(by.css('.d-flex.justify-content-between.text-link.mt-3.ng-star-inserted')).get(2).all(by.tagName('a'));
        expect(link.getAttribute('href')).toContain('https://www.neoenergiaelektro.com.br/fale-com-a-gente/canais-de-atendimento');
        link.click();
    })

})