const { browser, element } = require("protractor");
const { last } = require("rxjs-compat/operator/last");
var originalTimeout;

xdescribe('Falta de Energia Grupo B', function() {
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

    it('tcq10043_faltaEnergiaGrB_fluxoBasico_apenasImovel', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela dos Passos de verificação do disjuntor
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.passos', 'Passo 1'))), 5000);
        expect(element(by.cssContainingText('.passos', 'Coloque a chave do disjuntor na posição desligada')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 2')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Coloque a chave do disjuntor na posição ligada')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 3')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Verifique se as luzes voltaram a funcionar')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 4')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Verifique se a chave desligou sozinha. Isso quer dizer que o disjuntor está danificado')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isDisplayed());
        element(by.buttonText('CONTINUAR')).click();
        //Tela após verificar o disjuntor
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-radio-label-content', 'Sim, a energia voltou'))), 5000);
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não, meu disjuntor está danificado')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não, meu disjuntor está normal e permaneço sem energia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Sim, a energia voltou')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ótima notícia!'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Parece que resolvemos o problema :)')).isDisplayed());
        expect(element(by.cssContainingText('.descricao.ng-star-inserted', 'Protocolo: ')).isDisplayed());
    })

    it('tc10044_faltaEnergiaGrB_noImovelVizinhanca_fioPostePartido', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de falta de energia foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10045_faltaEnergiaGrB_noImovelVizinhanca_posteCaido', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Poste caído na rua';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de falta de energia foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10046_faltaEnergiaGrB_noImovelVizinhanca_barulhoAlto', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Barulho alto antes da falta de energia';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de falta de energia foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10047_faltaEnergiaGrB_noImovelVizinhanca_naoSei', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Não sei';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de falta de energia foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10048_faltaEnergiaGrB_iluminacaoPublica_lampadaApagada', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Uma lâmpada apagada';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de iluminação pública está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de iluminação pública foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10049_faltaEnergiaGrB_iluminacaoPublica_variasLampadasApagadas', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Várias lâmpadas apagadas';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de iluminação pública está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de iluminação pública foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10050_faltaEnergiaGrB_iluminacaoPublica_lampadaApagaPracaJardim', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Lâmpada apagada em praça ou jardim';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Aviso de Contato com a Prefeitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entre em contato com a prefeitura'))), 5000);
        expect(element(by.cssContainingText('.descricao', 'A manutenção e expansão da iluminação em praças ou jardins públicos de sua cidade é de responsabilidade da prefeitura municipal.')).isDisplayed());
        expect(element(by.cssContainingText('.descricao.ng-star-inserted', 'Protocolo:')).isDisplayed());
    })

    it('tc10078_faltaEnergiaGrB_iluminacaoPublica_lampadaAcendeApaga', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Lâmpada acende e apaga';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de iluminação pública está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de iluminação pública foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10079_faltaEnergiaGrB_iluminacaoPublica_lampadaDuranteDia', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Lâmpada acesa durante o dia';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de iluminação pública está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de iluminação pública foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10081_faltaEnergiaGrB_iluminacaoPublica_celpe5cidades', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Lâmpada acesa durante o dia';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de iluminação pública está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        //element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
    })

    it('tc10082_faltaEnergiaGrB_iluminacaoPublica_coelba', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Lâmpada apagada em praça ou jardim';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Aviso de Contato com a Prefeitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entre em contato com a prefeitura'))), 5000);
        expect(element(by.cssContainingText('.descricao', 'A manutenção e expansão da iluminação em praças ou jardins públicos de sua cidade é de responsabilidade da prefeitura municipal.')).isDisplayed());
        expect(element(by.cssContainingText('.descricao.ng-star-inserted', 'Protocolo:')).isDisplayed());
    })

    it('tc10083_faltaEnergiaGrB_iluminacaoPublica_cosern', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Lâmpada apagada em praça ou jardim';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Aviso de Contato com a Prefeitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entre em contato com a prefeitura'))), 5000);
        expect(element(by.cssContainingText('.descricao', 'A manutenção e expansão da iluminação em praças ou jardins públicos de sua cidade é de responsabilidade da prefeitura municipal.')).isDisplayed());
        expect(element(by.cssContainingText('.descricao.ng-star-inserted', 'Protocolo:')).isDisplayed());
    })

    it('tc10084_faltaEnergiaGrB_iluminacaoPublica_celpe', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Lâmpada apagada em praça ou jardim';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Aviso de Contato com a Prefeitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entre em contato com a prefeitura'))), 5000);
        expect(element(by.cssContainingText('.descricao', 'A manutenção e expansão da iluminação em praças ou jardins públicos de sua cidade é de responsabilidade da prefeitura municipal.')).isDisplayed());
        expect(element(by.cssContainingText('.descricao.ng-star-inserted', 'Protocolo:')).isDisplayed());
    })

    it('tc10085_faltaEnergiaGrB_apenasImovel_disjuntorDanificado', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela dos Passos de verificação do disjuntor
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.passos', 'Passo 1'))), 5000);
        expect(element(by.cssContainingText('.passos', 'Coloque a chave do disjuntor na posição desligada')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 2')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Coloque a chave do disjuntor na posição ligada')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 3')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Verifique se as luzes voltaram a funcionar')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 4')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Verifique se a chave desligou sozinha. Isso quer dizer que o disjuntor está danificado')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isDisplayed());
        element(by.buttonText('CONTINUAR')).click();
        //Tela após verificar o disjuntor
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-radio-label-content', 'Sim, a energia voltou'))), 5000);
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não, meu disjuntor está danificado')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não, meu disjuntor está normal e permaneço sem energia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Não, meu disjuntor está danificado')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.titulo.laranja', 'Consulte um eletricista particular para consertar seu disjuntor'))), 5000);
        expect(element(by.cssContainingText('.descricao', 'O jeito mais rápido de resolver o problema com o seu disjuntor é chamando um profissional eletricista de sua confiança.')).isDisplayed());
        expect(element(by.cssContainingText('.descricao', 'Defeitos na instalação elétrica do imóvel são de responsabilidade do cliente.')).isDisplayed());
        expect(element(by.cssContainingText('.descricao.ng-star-inserted', 'Protocolo: ')).isDisplayed());
    })

    it('tc10086_faltaEnergiaGrB_apenasImovel_disjuntorNormal', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela dos Passos de verificação do disjuntor
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.passos', 'Passo 1'))), 5000);
        expect(element(by.cssContainingText('.passos', 'Coloque a chave do disjuntor na posição desligada')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 2')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Coloque a chave do disjuntor na posição ligada')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 3')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Verifique se as luzes voltaram a funcionar')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 4')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Verifique se a chave desligou sozinha. Isso quer dizer que o disjuntor está danificado')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isDisplayed());
        element(by.buttonText('CONTINUAR')).click();
        //Tela após verificar o disjuntor
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-radio-label-content', 'Sim, a energia voltou'))), 5000);
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não, meu disjuntor está danificado')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não, meu disjuntor está normal e permaneço sem energia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Não, meu disjuntor está normal e permaneço sem energia')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de falta de energia foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10087_faltaEnergiaGrB_naoSei', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de falta de energia foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10088_faltaEnergiaGrB_alterarTelefoneContato', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(3);
        var alterar = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar')).get(0).all(by.tagName('a'));
        alterar.click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        element(by.id('telefoneContato')).clear();
        element(by.id('telefoneContato')).sendKeys('22911112222');
        var telefone2 = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone2)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterarNum2 = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterarNum2.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de falta de energia foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone2)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10089_faltaEnergiaGrB_alterarPontoReferencia', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(3);
        var alterar = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar')).get(1).all(by.tagName('a'));
        alterar.click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        element(by.id('pontoDeReferencia')).clear();
        element(by.id('pontoDeReferencia')).sendKeys('Novo ponto');
        var ponto2 = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto2)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterarNum2 = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterarNum2.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de falta de energia foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto2)).isDisplayed());
    })

    it('tc10090_faltaEnergiaGrB_alterarDescricaoProblema', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(3);
        var alterar = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar')).get(2).all(by.tagName('a'));
        alterar.click();
        //Tela de verificar problema novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao2 = 'Poste caído na rua';
        element(by.cssContainingText('.mat-radio-label-content', descricao2)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao2)).isDisplayed());
        var alterarNum2 = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterarNum2.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de falta de energia foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao2)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10091_faltaEnergiaGrB_iluminacaoPublica_alterarDescricaoProblema', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Uma lâmpada apagada';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de iluminação pública está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(3);
        var alterar = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar')).get(2).all(by.tagName('a'));
        alterar.click();
        //Tela de iluminacao pública novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao2 = 'Várias lâmpadas apagadas';
        element(by.cssContainingText('.mat-radio-label-content', descricao2)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de iluminação pública está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao2)).isDisplayed());
        var alterarNum2 = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterarNum2.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de solicitação com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Seu problema de iluminação pública foi registrado.'))), 5000);
        expect(element(by.cssContainingText('.dados-problema', 'DADOS')).isDisplayed());
        expect(element(by.cssContainingText('.dados-problema', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.detalhamento-problema', 'PROTOCOLO')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', uc)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', endereco)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TIPO DE SOLICITAÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'DESCRIÇÃO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', descricao2)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'TELEFONE DE CONTATO')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.subtitle', 'PONTO DE REFERÊNCIA')).isDisplayed());
        expect(element(by.cssContainingText('.flex.justify-content-sb.ng-star-inserted', ponto)).isDisplayed());
    })

    it('tc10092_faltaEnergiaGrB_iluminacaoPublica_alterarLampadaApagaPracaJardim', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Uma lâmpada apagada';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de iluminação pública está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(3);
        var alterar = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar')).get(2).all(by.tagName('a'));
        alterar.click();
        //Tela de iluminacao pública novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao2 = 'Lâmpada apagada em praça ou jardim';
        element(by.cssContainingText('.mat-radio-label-content', descricao2)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Aviso de Contato com a Prefeitura
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Entre em contato com a prefeitura'))), 5000);
        expect(element(by.cssContainingText('.descricao', 'A manutenção e expansão da iluminação em praças ou jardins públicos de sua cidade é de responsabilidade da prefeitura municipal.')).isDisplayed());
        expect(element(by.cssContainingText('.descricao.ng-star-inserted', 'Protocolo:')).isDisplayed());
    })

    it('tc10097_faltaEnergiaGrB_telefoneContatoVazio', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        element(by.id('telefoneContato')).clear();
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc10098_faltaEnergiaGrB_telefoneContatoIncompleto', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        element(by.id('telefoneContato')).clear();
        element(by.id('telefoneContato')).sendKeys('1234');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc10099_faltaEnergiaGrB_iluminacaoPublica_telefoneContatoVazio', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Uma lâmpada apagada';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        element(by.id('telefoneContato')).clear();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc10100_faltaEnergiaGrB_iluminacaoPublica_telefoneContatoIncompleto', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Uma lâmpada apagada';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        element(by.id('telefoneContato')).clear();
        element(by.id('telefoneContato')).sendKeys('1234');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc10102_faltaEnergiaGrB_cancelar', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CANCELAR')).click();
        //Pop-up do cancelar
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Tem certeza que deseja cancelar esta solicitação?'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Todas as informações prenchidas serão perdidas.')).isDisplayed());
        expect(element(by.buttonText('SIM')).isDisplayed());
        expect(element(by.buttonText('NÃO')).isDisplayed());
        element(by.buttonText('SIM')).click();
        //Tela da Home
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc10108_faltaEnergiaGrB_cancelarClicarNao', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CANCELAR')).click();
        //Pop-up do cancelar
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Tem certeza que deseja cancelar esta solicitação?'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Todas as informações prenchidas serão perdidas.')).isDisplayed());
        expect(element(by.buttonText('SIM')).isDisplayed());
        expect(element(by.buttonText('NÃO')).isDisplayed());
        element(by.buttonText('NÃO')).click();
        //Encerra o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
    })

    it('tc10104_faltaEnergiaGrB_volarPassosApenasImovel', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela dos Passos de verificação do disjuntor
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.passos', 'Passo 1'))), 5000);
        expect(element(by.cssContainingText('.passos', 'Coloque a chave do disjuntor na posição desligada')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 2')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Coloque a chave do disjuntor na posição ligada')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 3')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Verifique se as luzes voltaram a funcionar')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 4')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Verifique se a chave desligou sozinha. Isso quer dizer que o disjuntor está danificado')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isDisplayed());
        element(by.buttonText('VOLTAR')).click();
        //Retorna para a tela inicial do Falta de Energias
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
    })

    it('tc10105_faltaEnergiaGrB_voltarDisjuntorApenasImovel', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela dos Passos de verificação do disjuntor
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.passos', 'Passo 1'))), 5000);
        expect(element(by.cssContainingText('.passos', 'Coloque a chave do disjuntor na posição desligada')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 2')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Coloque a chave do disjuntor na posição ligada')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 3')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Verifique se as luzes voltaram a funcionar')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Passo 4')).isDisplayed());
        expect(element(by.cssContainingText('.passos', 'Verifique se a chave desligou sozinha. Isso quer dizer que o disjuntor está danificado')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isDisplayed());
        element(by.buttonText('CONTINUAR')).click();
        //Tela após verificar o disjuntor
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-radio-label-content', 'Sim, a energia voltou'))), 5000);
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não, meu disjuntor está danificado')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não, meu disjuntor está normal e permaneço sem energia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Sim, a energia voltou')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela dos Passos de verificação do disjuntor novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.passos', 'Passo 1'))), 5000);
        expect(element(by.cssContainingText('.passos', 'Coloque a chave do disjuntor na posição desligada')).isDisplayed());
    })

    it('tc10106_faltaEnergiaGrB_voltarNoImovelVizinhanca', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.buttonText('VOLTAR')).click();
        //Tela inicial de Falta de Energia novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
    })

    it('tc10107_faltaEnergiaGrB_voltarDadosContatoNoImovelVizinhanca', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        element(by.id('telefoneContato')).clear();
        element(by.id('telefoneContato')).sendKeys('81911111111')
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
    })

    it('tc10108_faltaEnergiaGrB_voltarConferenciaDadosNoImovelVizinhanca', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        element(by.id('telefoneContato')).clear();
        element(by.id('telefoneContato')).sendKeys('81911111111')
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
    })

    it('tc10109_faltaEnergiaGrB_voltarIluminacaoPublica', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.buttonText('VOLTAR')).click();
        //Voltar para a tela de inicial de Falta de Energia
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
    })

    it('tc10010_faltaEnergiaGrB_voltarDadosContatoIluminacaoPublica', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Uma lâmpada apagada';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela de iluminacao pública novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
    })

    it('tc10111_faltaEnergiaGrB_voltarConferenciaDados_iluminacaoPublica', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Uma lâmpada apagada';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de iluminação pública está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela de dados de contato novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
    })

    it('tc10112_faltaEnergiaGrB_voltarNaoSei', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Não sei';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela inicial de Falta de Energia
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
    })

    it('tc10113_faltaEnergiaGrB_voltarDadosContatoNaoSei', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Não sei';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela de verificar problema novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
    })

    it('tc10114_faltaEnergiaGrB_voltarAlterarConferenciaDadosIluminacaoPublica', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Uma lâmpada apagada';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de iluminação pública está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterar = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterar.count()).toBe(3);
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela de dados de contato novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
    })

    it('tc10115_faltaEnergiaGrB_volarAlterarTelefoneContato', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(3);
        var alterar = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar')).get(0).all(by.tagName('a'));
        alterar.click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        element(by.id('pontoDeReferencia')).clear();
        element(by.id('pontoDeReferencia')).sendKeys('Novo ponto');
        var ponto2 = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela de verificar problema novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
    })

    it('tc10116_faltaEnergiaGrB_volarAlterarPontoReferencia', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(3);
        var alterar = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar')).get(1).all(by.tagName('a'));
        alterar.click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        element(by.id('pontoDeReferencia')).clear();
        element(by.id('pontoDeReferencia')).sendKeys('Novo ponto');
        var ponto2 = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela de verificar problema novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
    })

    it('tc10117_faltaEnergiaGrB_voltarAlterarDescricaoProblema', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Fio de poste partido';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de falta de energia está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(3);
        var alterar = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar')).get(2).all(by.tagName('a'));
        alterar.click();
        //Tela inicial de Falta de Energia novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
    })

    it('tc10118_faltaEnergiaGrB_voltarAlterarDescricaoProblema_iluminacaoPublica', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de iluminacao pública
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var descricao = 'Uma lâmpada apagada';
        element(by.cssContainingText('.mat-radio-label-content', descricao)).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de dados de contato
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Precisamos que nos informe um telefone de contato e um ponto de referência. Nos ajude a chegar até você!'))), 5000);
        expect(element(by.cssContainingText('.subtitulo-h6', 'Dados de Contato')).isDisplayed());
        expect(element(by.id('telefoneContato'))).not.toEqual('');
        var telefone = element(by.id('telefoneContato')).getAttribute('ng-reflect-model');
        expect(element(by.id('pontoDeReferencia'))).not.toEqual('');
        var ponto = element(by.id('pontoDeReferencia')).getAttribute('ng-reflect-model');
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de conferência de dados
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confira os dados cadastrados'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'A solicitação de iluminação pública está cadastrada conforme os dados abaixo:')).isDisplayed());
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')).isDisplayed());
        var uc = element(by.css('.col-5.t-uc')).getText();
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')).isDisplayed());
        var endereco = element(by.css('.col-7.t-endereco')).getText();
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DADOS CADASTRADOS')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Tipo solicitação')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Iluminação Pública')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Telefone de contato')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', telefone)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Ponto de referência')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', ponto)).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', 'Descrição')).isDisplayed());
        expect(element(by.cssContainingText('.items.dados-cadastrados', descricao)).isDisplayed());
        var alterarNum = element.all(by.cssContainingText('.info-btn-edit.flex', 'Alterar'));
        expect(alterarNum.count()).toBe(3);
        var alterar = element.all(by.cssContainingText('.item-dado-cadastrado.flex', 'Alterar')).get(2).all(by.tagName('a'));
        alterar.click();
        //Tela de iluminacao pública novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Iluminação Pública'))), 5000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Uma lâmpada apagada')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Várias lâmpadas apagadas')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada apagada em praça ou jardim')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acende e apaga')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Lâmpada acesa durante o dia')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.buttonText('VOLTAR')).click();
        //Tela inicial do Falta de Energia novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
    })

    it('tc10119_faltaEnergiaGrB_clicarHome', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-button-wrapper', 'Home')).click();
        //Pop-up do cancelar
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Tem certeza que deseja cancelar esta solicitação?'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Todas as informações prenchidas serão perdidas.')).isDisplayed());
        expect(element(by.buttonText('SIM')).isDisplayed());
        expect(element(by.buttonText('NÃO')).isDisplayed());
        element(by.buttonText('SIM')).click();
        //Tela da Home
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc10120_faltaEnergiaGrB_clicarHomeSelecionarNão', function () {
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Falta de energia')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia'))), 5000);
        expect(element(by.cssContainingText('.ng-star-inserted', 'Falta de Energia')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'UNIDADE CONSUMIDORA')).isDisplayed());
        expect(element(by.cssContainingText('.ng-star-inserted', 'ENDEREÇO')).isDisplayed());
        expect(element(by.cssContainingText('.color-neo-dark-gray.t-onde-falta-energia', 'Onde é a falta de energia?')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Apenas no meu imóvel')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Na iluminação pública')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('CANCELAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'No meu imóvel e na minha vizinhança')).click();
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de verificar problema
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
        expect(element(by.cssContainingText('.falta-energia-warning.flex', 'Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Fio de poste partido')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Poste caído na rua')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Barulho alto antes da falta de energia')).isDisplayed());
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Não sei')).isDisplayed());
        expect(element(by.buttonText('VOLTAR')).isDisplayed());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-button-wrapper', 'Home')).click();
        //Pop-up do cancelar
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Tem certeza que deseja cancelar esta solicitação?'))), 5000);
        expect(element(by.cssContainingText('.swal2-content', 'Todas as informações prenchidas serão perdidas.')).isDisplayed());
        expect(element(by.buttonText('SIM')).isDisplayed());
        expect(element(by.buttonText('NÃO')).isDisplayed());
        element(by.buttonText('NÃO')).click();
        //Encerra o pop-up
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Pode dizer o que você sabe sobre o problema?'))), 5000);
    })

})