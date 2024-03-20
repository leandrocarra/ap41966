const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Troca de Caracteristicas Residencial Novo Titular Grupo B', function() {
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
        browser.wait(ExpectedConditions.presenceOf(element(by.css('.color-neo-dark-gray'))), 20000);
        expect(browser.getCurrentUrl()).not.toEqual("http://localhost:4200/#/login");
        expect(element(by.css('.color-neo-dark-gray')).getText()).toEqual('Escolha abaixo a unidade consumidora que deseja consultar:');
    })


    it('tc10409_trocaNovoTitularGrB_fluxoBasico', function () {
        expect(element(by.cssContainingText('.mat-button-wrapper', 'Serviços')));
        element(by.cssContainingText('.mat-button-wrapper', 'Serviços')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Troca de Titularidade'))), 5000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item.ng-star-inserted', 'Troca de Titularidade')).click();
        //Tela Inicial de troca de titularidade
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ms-0.ms-md-4.mt-md-5', 'Deseja trocar a titularidade?'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.p-0.text-telas-informativos', 'Para solicitar a troca de titularidade para uma terceira pessoa, vamos precisar que tenha em mãos:')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.p-0.text-telas-informativos', 'Seu Documento com Foto (RG, CNH ou Passaporte)')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.p-0.text-telas-informativos', 'Documento com Foto do Novo Titular Pessoa (RG, CNH, ou Passaporte)')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.p-0.text-telas-informativos', 'Número do CPF do Novo Titular Procuração ou Documento que comprove a posse do imóvel no nome da terceira pessoa e que garanta poderes para efetuar a troca de titularidade pelo solicitante.')));
        expect(element(by.buttonText('VOLTAR')));
        expect(element(by.buttonText('CONTINUAR')));
        element(by.buttonText('CONTINUAR')).click();
        // Tela de troca de titularidade
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Troca da titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo', 'Antes de iniciar o processo, precisamos saber para quem será a troca de titularidade.')));
        expect(element(by.cssContainingText('.subtitulo-h6', 'QUEM SERÁ O NOVO TITULAR DO IMÓVEL?')));
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Eu mesmo')));
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Outro (terceiro)')));
        expect(element(by.buttonText('VOLTAR')));
        expect(element(by.buttonText('SOLICITAR TROCA DE TITULARIDADE')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Eu mesmo')).click();
        expect(element(by.buttonText('SOLICITAR TROCA DE TITULARIDADE')).isEnabled(true));
        element(by.buttonText('SOLICITAR TROCA DE TITULARIDADE')).click();
        //Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que você têm pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar de titularidade.'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3', 'SELECIONE A FORMA DE IDENTIFICAR O IMÓVEL:')));
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Unidade consumidora')));
        expect(element(by.cssContainingText('.mat-radio-label-content', 'Número do medidor')));
        expect(element(by.buttonText('VOLTAR')));
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.cssContainingText('.mat-radio-label-content', 'Unidade consumidora')).click();
        expect(element(by.id('inputValue')));
        var uc = '1111111111';
        element(by.id('inputValue')).sendKeys(uc);
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        element(by.buttonText('continuar')).click();
        //Tela de documento com foto
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Antes da selfie, nos envie um documento com foto!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')));
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Tirar Selfie
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos verificar a sua identidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para seguir com seu pedido de troca de titularidade, nos envie um documento com foto e uma selfie')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4', 'DICAS PARA UMA BOA SELFIE')));
        expect(element(by.cssContainingText('.d-inline.texto.text-left', 'Procure um lugar com boa iluminação.')));
        expect(element(by.cssContainingText('.d-inline.texto.text-left', 'Não utilize óculos ou acessórios.')));
        expect(element(by.cssContainingText('.d-inline.texto.text-left', 'Tire o cabelo do rosto, e deixei o rosto livre.')));
        expect(element(by.buttonText('VOLTAR')));
        expect(element(by.buttonText('CONCLUIR')));
        element(by.buttonText('CONCLUIR')).click();
        //Tela de envio de selfie
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'PARA UMA BOA SELFIE, POSICIONE O SEU ROSTO NO QUADRO'))), 10000);
        expect(element(by.buttonText('CONTINUAR')));
        element(by.buttonText('CONTINUAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora tire uma selfie para verificarmos que é você mesmo!'))), 10000);
        expect(element(by.css('.container-selfie')));
        expect(element(by.buttonText('Voltar')));
        expect(element(by.buttonText('Tirar Selfie')));
        browser.executeScript('arguments[0].click()', element(by.buttonText('Tirar Selfie')).getWebElement());
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'NÃO CONSEGUIMOS CONFIRMAR SUA IDENTIDADE!'))), 10000);
        expect(element(by.buttonText('TENTAR NOVAMENTE')));
        element(by.buttonText('TENTAR NOVAMENTE')).click();
        expect(element(by.buttonText('Confirmar')));
        browser.executeScript('arguments[0].click()', element(by.buttonText('Confirmar')).getWebElement());
        //Tela de troca realizada com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua troca foi realizada com sucesso! Deseja manter as características da ligação?'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.p-0.text-telas-informativos', 'Para solicitar a troca de titularidade você precisa validar as características.')));
        expect(element(by.cssContainingText('.subtitulo-informativo-troca', 'Perfil de ligação:')));
        expect(element(by.cssContainingText('.subtitulo-informativo-troca', 'Tarifa:')));
        expect(element(by.buttonText('DESEJO ALTERAR AS CARACTERÍSTICAS')));
        expect(element(by.buttonText('SEGUIR COM AS CARACTERÍSTICAS')));
        element(by.buttonText('DESEJO ALTERAR AS CARACTERÍSTICAS')).click();
        //Tela de cadastrar fatura digital
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Cadastrar sua fatura digital'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mb-3', 'DESEJA CADASTRAR ESSE E-MAIL?')));
        var email = element(by.id('email')).getText();
        expect(element(by.buttonText('NÃO QUERO')));
        expect(element(by.buttonText('CADASTRAR FATURA NO E-MAIL')));
        element(by.buttonText('NÃO QUERO')).click();
        //Tela de fatura via WhatsApp
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Deseja receber sua fatura via WhatsApp?'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao cadastrar seu número de celular, passará a receber a fatura via WhatsApp.')));
        expect(element(by.cssContainingText('.subtitulo.text-telas-informativos', 'Além da opção de fatura digital por e-mail, agora também temos a opção de fatura digital por WhatsApp.')));
        expect(element(by.buttonText('NÃO QUERO')));
        expect(element(by.buttonText('CADASTRAR WHATSAPP')));
        element(by.buttonText('NÃO QUERO')).click();
        //Tela de forma de pagamento
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Forma de pagamento'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações de pagamento do imóvel:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.mt-4.subtitulo-h6', 'Sua forma de pagamento para esse imóvel é:')));
        expect(element(by.cssContainingText('.mt-4.subtitulo-h6', 'Cadastre suas faturas no débito automático')));
        expect(element(by.buttonText('NÃO QUERO')));
        expect(element(by.buttonText('CADASTRAR DÉBITO AUTOMÁTICO')));
        element(by.buttonText('NÃO QUERO')).click();
        //Tela de alterar data de vencimento
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Deseja alterar a data de vencimento da fatura?'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente a data de vencimento das faturas:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'a data de vencimento da fatura para este imóvel é:')));
        expect(element(by.cssContainingText('.data-certa.vcol-12.col-xl-6.col-lg-7.col-md-10', 'Dia 03')));
        expect(element(by.buttonText('NÃO QUERO')));
        expect(element(by.buttonText('alterar data')));
        element(by.buttonText('NÃO QUERO')).click();
        //Tela de Confirmar solicitação
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 10000);
        expect(element(by.cssContainingText('.subtitulo', 'Para concluir a solicitação, confirme as informações abaixo:')));
        expect(element(by.cssContainingText('.divisor.ng-star-inserted', 'NOME')));
        expect(element(by.cssContainingText('.divisor.ng-star-inserted', 'RG')));
        expect(element(by.cssContainingText('.divisor.ng-star-inserted', 'CPF')));
        expect(element(by.cssContainingText('.divisor.ng-star-inserted', 'DATA DE NASCIMENTO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Unidade Consumidora')));
        expect(element(by.cssContainingText('.ng-star-inserted', uc)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data de entrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Perfil de ligação')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Categoria de ligação')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Tarifa')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Fatura digital')));
        expect(element(by.cssContainingText('.ng-star-inserted', email)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data certa')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Não cadastrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Débito automático')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Não cadastrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO COM FOTO VÁLIDO (FRENTE E VERSO)')));
        expect(element(by.css('input[type="checkbox"]')));
        expect(element(by.cssContainingText('.text-wrap.ms-2.mt-3', 'Declaro que li e estou ciente que os benefícios atuais do imóvel não serão transferidos para mim.')));
        expect(element(by.buttonText('VOLTAR')));
        expect(element(by.buttonText('CONCLUIR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        expect(element(by.buttonText('CONCLUIR')).isEnabled(true));
        element(by.buttonText('CONCLUIR')).click();
        //Tela de envio com sucesso
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Sua solicitação foi enviada para análise!'))), 10000);
        expect(element(by.cssContainingText('.mt-4.titulo-protocolo-solicitacao', 'Fatura final do antigo titular')));
        expect(element(by.cssContainingText('.mt-3.titulo-protocolo-solicitacao', 'Verificamos que a data de fechamento foi no dia (13/04), foi gerada uma fatura proporcional para o antigo titular no valor de R$ 15 referente aos dias de uso de energia do imóvel')));
        expect(element(by.buttonText('BAIXAR')));
        expect(element(by.cssContainingText('.protocolo', 'PROTOCOLO')));
        expect(element(by.cssContainingText('.subtitle', 'Unidade consumidora')));
        expect(element(by.cssContainingText('.data-info', uc)));
        expect(element(by.cssContainingText('.subtitle', 'Data de entrada')));
        expect(element(by.cssContainingText('.subtitle', 'CPF')));
        expect(element(by.cssContainingText('.subtitle', 'Data de nascimento')));
        expect(element(by.cssContainingText('.subtitle', 'RG')));
        expect(element(by.cssContainingText('.subtitle', 'E-mail para contato')));
        expect(element(by.cssContainingText('.subtitle', 'Telefone para contato')));
        expect(element(by.cssContainingText('.data-info', email)));
        expect(element(by.cssContainingText('.subtitle', 'Data certa')));
        expect(element(by.cssContainingText('.data-info', 'Não cadastrada')));
        expect(element(by.cssContainingText('.subtitle', 'Débito automático')));
        expect(element(by.cssContainingText('.data-info', 'Não cadastrada')));
        expect(element(by.buttonText('Imprimir')));
        expect(element(by.buttonText('Baixar PDF')));
    })
})
