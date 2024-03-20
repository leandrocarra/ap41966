const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Consultar Home Grupo A', function() {
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
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.group-a-text-lightgreen'))), 5000);
        expect(element(by.css('.group-a-text-lightgreen')).getText()).toEqual('SERVIÇOS MAIS UTILIZADOS');
    })

    it('tc7610_consultarHomeGrupoA_fluxoBasico', function () {
        //1. Cabeçalho
        //Logo
        ExpectedConditions.presenceOf(element(by.css('.d-flex')));
        //Nome do usuário
        ExpectedConditions.presenceOf(element(by.css('.user-greeting.ng-star-inserted')));
        //Link de Sair
        expect(element(by.cssContainingText('.ps-2.pe-2.pe-md-0.logout', 'Sair')));
        //2. Painel do Menu
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Home')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Serviços')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Minha conta')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Ajuda')));
        //3. Painel Central
        //UC com endereço
        expect(element(by.css('.d-block.number-uc.d-flex.green-light')).getText()).not.toEqual('');
        expect(element(by.css('.d-block.d-flex.endereco')).getText()).not.toEqual('');
        //Carrossel de serviços
        ExpectedConditions.presenceOf(element(by.css('.carousel-container')));
        //Última fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        //Banner
        ExpectedConditions.presenceOf(element(by.css('.marketing')));
        //Botão de saiba mais do banner
        expect(element(by.cssContainingText('.content-button', 'Saiba mais')));
        //Histórico de consumo
        expect(element(by.cssContainingText('.titulo-grupo-b.ng-star-inserted', 'HISTÓRICO DE CONSUMO')));
        //Selecionar tipo de visualização do gráfico
        ExpectedConditions.presenceOf(element(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')));
        //Chart do gráfico
        ExpectedConditions.presenceOf(element(by.css('.chartjs-render-monitor')));
        //Botão de saiba mais do histórico
        expect(element(by.cssContainingText('.mat-button-wrapper', 'SAIBA MAIS')));
        //Últimas solicitações
        expect(element(by.cssContainingText('.solicitacoes-header', 'ÚLTIMAS SOLICITAÇÕES')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'VER HISTÓRICO DE PROTOCOLOS')));
        //4. Chatbot
        ExpectedConditions.presenceOf(element(by.css('.chatbot.mat-menu-trigger')));
        //5. Rodapé
        ExpectedConditions.presenceOf(element(by.css('.padding-footer.col-12.col-md-6')));
        //Endereço da distribuidora
        ExpectedConditions.presenceOf(element(by.css('.grid')));
    })

    it('tc7612_consultarHomeGrupoA_cardFaturaAtrasada', function () {
        //Card de fatura atrasada
        ExpectedConditions.presenceOf(element(by.css('.grid.w.text-content')));
        expect(element(by.cssContainingText('.titulo.text-red', 'Faturas atrasadas com risco de suspensão do fornecimento!')));
        ExpectedConditions.presenceOf(element(by.css('.descricao')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Negociar')));
        expect(element(by.cssContainingText('.btn-fecha-alerta.mat-icon.notranslate.material-icons.mat-icon-no-color', 'close')));
        //Clicar no card
        element(by.cssContainingText('.mat-button-wrapper', 'Negociar')).click();
    })

    it('tc7623_consultarHomeGrupoA_selecionarChave', function () {
        //Histórico de consumo
        expect(element(by.cssContainingText('.titulo-grupo-b.ng-star-inserted', 'HISTÓRICO DE CONSUMO')));
        //Selecionar tipo de visualização do gráfico para real
        element(by.css('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin')).click();
        expect(element(by.cssContainingText('.legend', 'Valor em real')));
    })

    it('tc7624_consultarHomeGrupoA_saibaMais', function () {
        //Histórico de consumo
        expect(element(by.cssContainingText('.titulo-grupo-b.ng-star-inserted', 'HISTÓRICO DE CONSUMO')));
        //Botão de saiba mais do histórico
        element(by.cssContainingText('.mat-button-wrapper', 'SAIBA MAIS')).click();
        //Tela histórico de consumo
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.titulo-grupo-a.mt-7.ng-star-inserted'))), 5000);
        expect(element(by.css('.titulo-grupo-a.mt-7.ng-star-inserted')).getText()).toEqual('Histórico de consumo');
        //Gráfico de consumo da tela de histórico de consumo
        ExpectedConditions.presenceOf(element(by.css('.chartjs-render-monitor')));
    })

    it('tc7627_consultarHomeGrupoA_ultimasSolicitacoes', function () {
        //Últimas solicitações
        expect(element(by.cssContainingText('.solicitacoes-header', 'ÚLTIMAS SOLICITAÇÕES')));
        var solicitacoes = element.all(by.cssContainingText('.titulo-coluna.d-block.green-dark', 'PROTOCOLO'));
        expect(solicitacoes.count()).toBe(4);
    })

    it('tc7628_consultarHomeGrupoA_historicoSolicitacoes', function () {
        //Últimas solicitações
        expect(element(by.cssContainingText('.solicitacoes-header', 'ÚLTIMAS SOLICITAÇÕES')));
        element(by.cssContainingText('.mat-button-wrapper', 'VER HISTÓRICO DE PROTOCOLOS')).click();
    })

    it('tc7635_consultarHomeGrupoA_trocarImovel', function () {
        //UC com endereço
        expect(element(by.css('.d-block.number-uc.d-flex.green-light')).getText()).toEqual('987654321');
        expect(element(by.css('.d-block.d-flex.endereco')).getText()).toEqual('Av. Mal. Deodoro da Fonseca, sn, Centro, Limeira- SP, 12240-000');
        element(by.css('.text-meus-imoveis')).click();
        //Tela de seleção de imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 5000);
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
    })

    it('tc7636_consultarHomeGrupoA_bandeiraTarifaria', function () {
        expect(element(by.css('.material-icons-outlined')).getText()).toEqual('outlined_flag');
        expect(element(by.cssContainingText('.d-inline.text-notification.ng-star-inserted', 'Bandeira tarifária')));
        element(by.css('.material-icons-outlined')).click();
        expect(element(by.cssContainingText('.bandeira-texto', 'trending_down Não há alterações no valor da tarifa de energia.')));
    })

    it('tc7637_consultarHomeGrupoA_notificoes', function () {
        expect(element(by.css('.notifications-icon.hide-text.material-icons-outlined.d-inline.mat-menu-trigger')).getText()).toEqual('notifications_none');
        expect(element(by.cssContainingText('.d-inline.text-notification.ng-star-inserted', 'Notificações')));
        element(by.css('.notifications-icon.hide-text.material-icons-outlined.d-inline.mat-menu-trigger')).click();
        expect(element(by.cssContainingText('.bullet', 'Reajuste Tarifário médio 5,71%, Resolução 2.670/20 ANEEL.')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Exibir todas')));
    })

    it('tc7638_consultarHomeGrupoA_ultimaFatura', function () {
        //Última fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        ExpectedConditions.presenceOf(element(by.css('.vencimento')));
        ExpectedConditions.presenceOf(element(by.css('.forma-de-pagamento')));
        ExpectedConditions.presenceOf(element(by.css('.ps-00.col-6.align-content-end.text-nowrap.valor-fatura')));
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')));
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        //Botão Mais seviços
        expect(element(by.cssContainingText('.content-button', 'Mais Serviços')));
        element(by.cssContainingText('.content-button', 'Mais Serviços')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
    })

    it('tc7639_consultarHomeGrupoA_baixarSegundaVia', function () {
        //Última fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        ExpectedConditions.presenceOf(element(by.css('.vencimento')));
        ExpectedConditions.presenceOf(element(by.css('.forma-de-pagamento')));
        ExpectedConditions.presenceOf(element(by.css('.ps-00.col-6.align-content-end.text-nowrap.valor-fatura')));
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')));
        element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.col-9'))), 5000);
        expect(element(by.cssContainingText('.col-9', 'Por qual motivo você deseja emitir 2ª via da fatura?')));
        expect(element(by.css('label[text="Extravio"]')));
        expect(element(by.css('label[text="Fatura danificada"]')));
        expect(element(by.css('label[text="Fatura não entregue"]')));
        expect(element(by.css('label[text="Comprovar residência"]')));
        expect(element(by.css('label[text="Não estou com a fatura em mãos"]')));
        expect(element(by.css('label[text="Outro"]')));
        expect(element(by.id('baixar')).getText()).toEqual('BAIXAR');
        expect(element(by.id('cancelar')).getText()).toEqual('Cancelar');
    })

    it('tc7640_consultarHomeGrupoA_cancelarSegundaVia', function () {
        //Última fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        ExpectedConditions.presenceOf(element(by.css('.vencimento')));
        ExpectedConditions.presenceOf(element(by.css('.forma-de-pagamento')));
        ExpectedConditions.presenceOf(element(by.css('.ps-00.col-6.align-content-end.text-nowrap.valor-fatura')));
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')));
        element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.col-9'))), 5000);
        expect(element(by.cssContainingText('.col-9', 'Por qual motivo você deseja emitir 2ª via da fatura?')));
        expect(element(by.css('label[text="Extravio"]')));
        expect(element(by.css('label[text="Fatura danificada"]')));
        expect(element(by.css('label[text="Fatura não entregue"]')));
        expect(element(by.css('label[text="Comprovar residência"]')));
        expect(element(by.css('label[text="Não estou com a fatura em mãos"]')));
        expect(element(by.css('label[text="Outro"]')));
        expect(element(by.id('baixar')).getText()).toEqual('BAIXAR');
        expect(element(by.id('cancelar')).getText()).toEqual('Cancelar');
        element(by.id('cancelar')).click();
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
    })

    it('tc7641_consultarHomeGrupoA_pagarCom', function () {
        //Última fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        ExpectedConditions.presenceOf(element(by.css('.vencimento')));
        ExpectedConditions.presenceOf(element(by.css('.forma-de-pagamento')));
        ExpectedConditions.presenceOf(element(by.css('.ps-00.col-6.align-content-end.text-nowrap.valor-fatura')));
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')));
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        expect(element(by.cssContainingText('.content-button', 'Mais Serviços')));
    })

    it('tc7642_consultarHomeGrupoA_pagarComCodigoBarras', function () {
        //Última fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        ExpectedConditions.presenceOf(element(by.css('.vencimento')));
        ExpectedConditions.presenceOf(element(by.css('.forma-de-pagamento')));
        ExpectedConditions.presenceOf(element(by.css('.ps-00.col-6.align-content-end.text-nowrap.valor-fatura')));
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')));
        //Botão Pagar com
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        element(by.cssContainingText('.content-button', 'Pagar com')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Pix')));
        //Copiar código de barras
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.col-8'))), 5000);
        expect(element(by.cssContainingText('.col-8', 'Copiado com sucesso!')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
    })

    it('tc7643_consultarHomeGrupoA_pagarComCartaoCredito', function () {
        //Última fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        ExpectedConditions.presenceOf(element(by.css('.vencimento')));
        ExpectedConditions.presenceOf(element(by.css('.forma-de-pagamento')));
        ExpectedConditions.presenceOf(element(by.css('.ps-00.col-6.align-content-end.text-nowrap.valor-fatura')));
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')));
        //Botão Pagar com
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        element(by.cssContainingText('.content-button', 'Pagar com')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Pix')));
        //Cartão de crédito
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.col-8'))), 5000);
        expect(element(by.cssContainingText('.col-8', 'Você está sendo redirecionado para a página de pagamento do FlexPag.')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')));
        element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')).click();
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
    })

    it('tc7644_consultarHomeGrupoA_pagarComInternetBanking', function () {
        //Última fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        ExpectedConditions.presenceOf(element(by.css('.vencimento')));
        ExpectedConditions.presenceOf(element(by.css('.forma-de-pagamento')));
        ExpectedConditions.presenceOf(element(by.css('.ps-00.col-6.align-content-end.text-nowrap.valor-fatura')));
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')));
        //Botão Pagar com
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        element(by.cssContainingText('.content-button', 'Pagar com')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Código de Barras')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Pix')));
        //Internet banking
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.col-8'))), 5000);
        expect(element(by.cssContainingText('.col-8', 'Pague com internet banking')));
        expect(element(by.css('p[text="Selecione um dos bancos abaixo ou procure um de sua preferência:"]')));
        expect(element(by.css('span[text="Itaú"]')));
        expect(element(by.css('span[text="Bradesco"]')));
        expect(element(by.css('span[text="Caixa"]')));
        expect(element(by.css('span[text="Banco do Brasil"]')));
        expect(element(by.css('span[text="Santander"]')));
        expect(element(by.cssContainingText('.swal2-confirm.swal2-styled', 'FECHAR')));
        element(by.css('.swal2-confirm.swal2-styled')).click();
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
    })

    it('tc7645_consultarHomeGrupoA_maisServicos', function () {
        //Última fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        ExpectedConditions.presenceOf(element(by.css('.vencimento')));
        ExpectedConditions.presenceOf(element(by.css('.forma-de-pagamento')));
        ExpectedConditions.presenceOf(element(by.css('.ps-00.col-6.align-content-end.text-nowrap.valor-fatura')));
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')));
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        //Botão Mais seviços
        expect(element(by.cssContainingText('.content-button', 'Mais Serviços')));
        element(by.cssContainingText('.content-button', 'Mais Serviços')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
    })

    it('tc7647_consultarHomeGrupoA_maisServicosVisualizarFatura', function () {
        //Última fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        ExpectedConditions.presenceOf(element(by.css('.vencimento')));
        ExpectedConditions.presenceOf(element(by.css('.forma-de-pagamento')));
        ExpectedConditions.presenceOf(element(by.css('.ps-00.col-6.align-content-end.text-nowrap.valor-fatura')));
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')));
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        //Botão Mais serviços
        expect(element(by.cssContainingText('.content-button', 'Mais Serviços')));
        element(by.cssContainingText('.content-button', 'Mais Serviços')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')).click();
    })

    it('tc7648_consultarHomeGrupoA_maisServicosEnviarEmail', function () {
        //Última fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        ExpectedConditions.presenceOf(element(by.css('.vencimento')));
        ExpectedConditions.presenceOf(element(by.css('.forma-de-pagamento')));
        ExpectedConditions.presenceOf(element(by.css('.ps-00.col-6.align-content-end.text-nowrap.valor-fatura')));
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')));
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        //Botão Mais serviços
        expect(element(by.cssContainingText('.content-button', 'Mais Serviços')));
        element(by.cssContainingText('.content-button', 'Mais Serviços')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        //Enviar por e-mail
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.col-8'))), 5000);
        expect(element(by.cssContainingText('.col-8', 'Informe o e-mail que deseja receber sua fatura.')));
        expect(element(by.id('email')).isPresent());
        expect(element(by.css('label[text="Extravio"]')));
        expect(element(by.css('label[text="Fatura danificada"]')));
        expect(element(by.css('label[text="Fatura não entregue"]')));
        expect(element(by.css('label[text="Comprovar residência"]')));
        expect(element(by.css('label[text="Não estou com a fatura em mãos"]')));
        expect(element(by.css('label[text="Outro"]')));
        expect(element(by.id('enviar')).getText()).toEqual('ENVIAR');
        expect(element(by.id('cancelar')).getText()).toEqual('Cancelar');
        element(by.id('cancelar')).click();
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
    })

    it('tc7649_consultarHomeGrupoA_maisServicosConhecaSuaConta', function () {
        //Última fatura
        expect(element(by.cssContainingText('.d-inline.text-ultima-fatura.group-a-text-darkgreen', 'Última fatura')));
        ExpectedConditions.presenceOf(element(by.css('.vencimento')));
        ExpectedConditions.presenceOf(element(by.css('.forma-de-pagamento')));
        ExpectedConditions.presenceOf(element(by.css('.ps-00.col-6.align-content-end.text-nowrap.valor-fatura')));
        expect(element(by.cssContainingText('.btn.btn-primary-p-light-green.btn-faturas.m-0.me-md-3.me-0', 'Baixar 2ª Via')));
        expect(element(by.cssContainingText('.content-button', 'Pagar com')));
        //Botão Mais serviços
        expect(element(by.cssContainingText('.content-button', 'Mais Serviços')));
        element(by.cssContainingText('.content-button', 'Mais Serviços')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Visualizar Fatura')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Enviar por E-mail')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')));
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Conheça sua Conta')).click();
    })

    it('tc7650_consultarHomeGrupoA_propaganda', function () {
        //Banner
        ExpectedConditions.presenceOf(element(by.css('.marketing')));
        //Botão de saiba mais do banner
        expect(element(by.cssContainingText('.content-button', 'Saiba mais')));
        element(by.cssContainingText('.content-button', 'Saiba mais')).click();
    })

    it('tc7651_consultarHomeGrupoA_chatbot', function () {
        //Chatbot
        ExpectedConditions.presenceOf(element(by.css('.chatbot.mat-menu-trigger')));
        element(by.css('.chatbot.mat-menu-trigger')).click();
        expect(element(by.css('p[text="Oi! Como podemos te ajudar?"]')));
        expect(element(by.css('p[text="Fale com a assistente virtual da Elektro ;)"]')));
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Abrir ChatBot')));
        element(by.cssContainingText('.mat-button-wrapper', 'Abrir ChatBot')).click();
    })

    it('tc7652_consultarHomeGrupoA_meusServicos', function () {
        //Menu Serviços
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Serviços')));
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Faturas e 2ª via de conta')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Faturas por e-mail')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Débito automático')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Histórico de consumo')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Solicitar religação')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Falta de energia')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Autoleitura')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Acompanhar solicitações')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'LGPD')));
    })

    it('tc7653_consultarHomeGrupoA_ajuda', function () {
        //Menu Ajuda
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Ajuda')));
        element(by.cssContainingText('.mat-button-wrapper', 'Ajuda')).click();
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Fale conosco')));
        expect(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Dicas e orientações')));
        //Fale conosco
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Fale conosco')).click();
        //Dicas e orientações
        element(by.cssContainingText('.mat-button-wrapper', 'Ajuda')).click();
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Dicas e orientações')).click();
    })

    it('tc7654_consultarHomeGrupoA_meuPerfil', function () {
        //Menu Minha conta
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Minha conta')));
        element(by.cssContainingText('.mat-button-wrapper', 'Minha conta')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.id('tituloH2'))), 5000);
        expect(element(by.id('tituloH2')).getText()).toEqual('Minha conta');
        expect(element(by.css('input[formcontrolname="nomeTitular"]')));
        expect(element(by.css('input[mask="000.000.000-00"]')));
        expect(element(by.css('input[formcontrolname="documentoSecundario"]')));
        expect(element(by.css('input[formcontrolname="dtNascimento"]')));
        expect(element(by.css('input[formcontrolname="emailCadastro"]')));
        expect(element(by.css('input[ng-reflect-mask-expression="(00) 0000-0000"]')));
        expect(element(by.css('input[ng-reflect-mask-expression="(00) 0 0000-0000"]')));
        expect(element(by.css('input[formcontrolname="usuarioAcesso"]')));
        expect(element(by.css('input[formcontrolname="emailAcesso"]')));
        expect(element(by.cssContainingText('.pe-2.ps-2', 'EDITAR DADOS')));
        expect(element(by.cssContainingText('.pe-2.ps-2', 'ALTERAR SENHA')));
    })

})
