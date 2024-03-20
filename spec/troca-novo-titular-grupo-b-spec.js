const { browser, element } = require("protractor");
var originalTimeout;

xdescribe('Troca de Titularidade Novo Titular Grupo B', function() {
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


    it('tc10392_trocaNovoTitularGrB_fluxoBasico', function () {
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

    it('tc10393_trocaNovoTitularGrB_numeroMedidor', function () {
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
        element(by.cssContainingText('.mat-radio-label-content', 'Número do medidor')).click();
        expect(element(by.id('inputValue')));
        var medidor = '1111111111';
        element(by.id('inputValue')).sendKeys(medidor);
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
        element(by.buttonText('SEGUIR COM AS CARACTERÍSTICAS')).click();
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
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número do medidor')));
        expect(element(by.cssContainingText('.ng-star-inserted', medidor)));
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
        expect(element(by.cssContainingText('.subtitle', 'Número do medidor')));
        expect(element(by.cssContainingText('.data-info', medidor)));
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

    it('tc10397_trocaNovoTitularGrB_faturaPorWhatsApp', function () {
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
        element(by.buttonText('CADASTRAR WHATSAPP')).click();
        //Tela de Fatura por WhatsApp
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Fatura por WhatsApp'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para receber suas faturas via WhatsApp, forneça um número de celular para recebimento:')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-2', 'NÚMERO DE WHATSAPP PARA RECEBIMENTO DA FATURA:')));
        var celular = '81932423423'
        expect(element(by.id('celular')));
        element(by.id('celular')).sendKeys(celular);
        expect(element(by.id('confirmarCelular')));
        expect(element(by.buttonText('VOLTAR')));
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(false));
        element(by.id('confirmarCelular')).sendKeys(celular);
        expect(element(by.buttonText('CONFIRMAR')).isEnabled(true));
        element(by.buttonText('CONFIRMAR')).click();
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
        expect(element(by.cssContainingText('.ng-star-inserted', celular)));
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
        expect(element(by.cssContainingText('.subtitle', 'Fatura digital')));
        expect(element(by.cssContainingText('.data-info', celular)));
        expect(element(by.cssContainingText('.subtitle', 'Data certa')));
        expect(element(by.cssContainingText('.data-info', 'Não cadastrada')));
        expect(element(by.cssContainingText('.subtitle', 'Débito automático')));
        expect(element(by.cssContainingText('.data-info', 'Não cadastrada')));
        expect(element(by.buttonText('Imprimir')));
        expect(element(by.buttonText('Baixar PDF')));
    })

    it('tc10399_trocaNovoTitularGrB_debitoAutomatico', function () {
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
        element(by.buttonText('CADASTRAR DÉBITO AUTOMÁTICO')).click();
        //Tela de Débito Automático
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Cadastre-se no débito automático'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Para cadastrar-se no débito automático é necessário informar uma conta corrente:')));
        expect(element(by.cssContainingText('.mt-4.subtitulo-h6', 'Dados Bancários')));
        expect(element(by.id('banco')));
        element(by.id('banco')).click();
        expect(element(by.css('input[placeholder="AGÊNCIA"]')));
        expect(element(by.id('conta')));
        expect(element(by.buttonText('VOLTAR')));
        expect(element(by.buttonText('CONTINUAR')));
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        var agencia = '5639';
        element(by.css('input[placeholder="AGÊNCIA"]')).sendKeys(agencia);
        var conta = '1234565';
        element(by.id('conta')).sendKeys(conta);
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
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
        expect(element(by.cssContainingText('.data-info', 'Não cadastrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data certa')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Não cadastrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Débito automático')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Não cadastrado')));
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
        expect(element(by.cssContainingText('.subtitle', 'Fatura digital')));
        expect(element(by.cssContainingText('.data-info', 'Não cadastrada')));
        expect(element(by.cssContainingText('.subtitle', 'Data certa')));
        expect(element(by.cssContainingText('.data-info', 'Não cadastrada')));
        expect(element(by.cssContainingText('.subtitle', 'Débito automático')));
        expect(element(by.cssContainingText('.data-info', 'Não cadastrado')));
        expect(element(by.buttonText('Imprimir')));
        expect(element(by.buttonText('Baixar PDF')));
    })

    it('tc10400_trocaNovoTitularGrB_dataVencimento', function () {
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
        element(by.buttonText('alterar data')).click();
        //Tela de Data de Vencimento
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Data de Vencimento da Fatura'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Suas informações referente a data de vencimento das faturas:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'selecione sua nova data de vencimento')));
        expect(element(by.css('input[role="listbox"]')));
        expect(element(by.css('input[type="checkbox"]')));
        expect(element(by.cssContainingText('.div', 'Declaro que li e estou ciente que a data de vencimento da fatura somente poderá ser modificada em um intervalo superior a 12 (doze) meses.')));
        expect(element(by.buttonText('NÃO QUERO')));
        expect(element(by.buttonText('salvar alteração')).isEnabled(false));
        element(by.css('.mat-select-arrow-wrapper')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '08'))), 10000);
        element(by.cssContainingText('.mat-option-text', '08')).click();
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        expect(element(by.buttonText('salvar alteração')).isEnabled(true));
        element(by.buttonText('salvar alteração')).click();
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
        expect(element(by.cssContainingText('.ng-star-inserted', '08')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Débito automático')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Não cadastrado')));
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
        expect(element(by.cssContainingText('.data-info', '08')));
        expect(element(by.cssContainingText('.subtitle', 'Débito automático')));
        expect(element(by.cssContainingText('.data-info', 'Não cadastrado')));
        expect(element(by.buttonText('Imprimir')));
        expect(element(by.buttonText('Baixar PDF')));
    })

    it('tc10401_trocaNovoTitularGrB_reconheceDebitos_codigoBarras', function () {
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
        expect(element(by.cssContainingText('.content-button', 'PAGAR TODAS AS FATURAS')).isPresent());
        expect(element(by.cssContainingText('.bold', 'FATURAS ATRASADAS')).isPresent());
        expect(element(by.cssContainingText('.justify-content-between.justify-content-md-around.content-button.d-flex.align-items-center', 'copiar código')).isPresent());
        element(by.cssContainingText('.justify-content-between.justify-content-md-around.content-button.d-flex.align-items-center', 'copiar código')).click();
        //Pop-up de pagamento por código de barras
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Copiado com sucesso!'))), 10000);
        expect(element(by.cssContainingText('.swal2-content', 'Acesse o internet banking e cole o código de barras do boleto no campo indicado no site.')).isPresent());
        expect(element(by.buttonText('FECHAR')).isPresent());
        browser.executeScript('arguments[0].click()', element(by.buttonText('FECHAR')).getWebElement());
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

    it('tc10413_trocaNovoTitularGrB_titularAtualConta', function () {
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
        element(by.cssContainingText('.mat-radio-label-content', 'Outro (terceiro)')).click();
        expect(element(by.buttonText('SOLICITAR TROCA DE TITULARIDADE')).isEnabled(true));
        element(by.buttonText('SOLICITAR TROCA DE TITULARIDADE')).click();
        //Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que você têm pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de identificação de imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')));
        expect(element(by.buttonText('VOLTAR')));
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
    })

    it('tc10459_trocaNovoTitularGrB_reconheceDebitos_cartaoCredito', function () {
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
        expect(element(by.cssContainingText('.content-button', 'PAGAR TODAS AS FATURAS')).isPresent());
        element(by.cssContainingText('.content-button', 'PAGAR TODAS AS FATURAS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')).click();
        //Pop-up de redirecionamento para o FlexPag
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Você está sendo redirecionado para a página de pagamento do FlexPag.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
    })

    it('tc10460_trocaNovoTitularGrB_reconheceDebitos_internetBank', function () {
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
        expect(element(by.cssContainingText('.content-button', 'PAGAR TODAS AS FATURAS')).isPresent());
        element(by.cssContainingText('.content-button', 'PAGAR TODAS AS FATURAS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Internet Banking')).click();
        //Pop-up de pagamento por boleto
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Código de barras copiado para a área de transferência'))), 10000);
        expect(element(by.cssContainingText('.col-12.col-md-8', 'Pague com internet banking')).isPresent());
        expect(element(by.cssContainingText('.col-8.col-md-3', 'Copiar novamente')).isPresent());
        expect(element(by.buttonText('FECHAR')));
        browser.executeScript('arguments[0].click()', element(by.buttonText('FECHAR')).getWebElement());
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

    it('tc10461_trocaNovoTitularGrB_reconheceDebitos_pix', function () {
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
        expect(element(by.cssContainingText('.content-button', 'PAGAR TODAS AS FATURAS')).isPresent());
        element(by.cssContainingText('.content-button', 'PAGAR TODAS AS FATURAS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Pix'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Pix')).click();
    })
})
