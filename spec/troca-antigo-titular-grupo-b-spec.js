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


    it('tc10160_trocaAntigoTitularGrB_fluxoBasico', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de validação das informações do novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos que valide as informações do novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'OS DADOS DO NOVO TITULAR CONFEREM?')).isPresent());
        expect(element(by.id('nome')));
        expect(element(by.id('cpf')));
        expect(element(by.id('rg')));
        expect(element(by.id('dataNascimento')));
        expect(element(by.buttonText('DADOS NÃO CONFEREM')).isPresent());
        expect(element(by.buttonText('PROSSEGUIR')).isPresent());
        element(by.buttonText('PROSSEGUIR')).click();
        //Pop-up Pendecias abertas do terceiro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que o terceiro tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de contato novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos uma forma de contatar o novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'TELEFONE PARA CONTATO (OBRIGATÓRIO)')).isPresent());
        expect(element(by.id('telefone')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mb-3', 'E-MAIL PARA CONTATO')).isPresent());
        expect(element(by.id('email')).isPresent());
        var telefone = '81981234567';
        element(by.id('telefone')).sendKeys(telefone);
        var email = 'teste@teste.com';
        element(by.id('email')).sendKeys(email);
        expect(element(by.css('input[type="checkbox"]')).isPresent());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e estou ciente que os benefícios atuais não serão transferidas para o novo titular.')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Confirmar solicitação
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 10000);
        expect(element(by.cssContainingText('.subtitulo', 'Para concluir a solicitação, confirme as informações abaixo:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Unidade Consumidora')));
        expect(element(by.cssContainingText('.ng-star-inserted', uc)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data de entrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'CPF')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'RG')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'E-mail para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', email)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Telefone para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', telefone)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO DE PROCURAÇÃO')));
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
        expect(element(by.cssContainingText('.subtitle', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.subtitle', 'CPF')));
        expect(element(by.cssContainingText('.subtitle', 'RG')));
        expect(element(by.cssContainingText('.subtitle', 'E-mail para contato')));
        expect(element(by.cssContainingText('.data-info', email)));
        expect(element(by.cssContainingText('.subtitle', 'Telefone para contato')));
        expect(element(by.cssContainingText('.data-info', telefone)));
        expect(element(by.buttonText('Imprimir')));
        expect(element(by.buttonText('Baixar PDF')));
    })

    it('tc10366_trocaAntigoTitularGrB_volarTelaSolicitacao', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de validação das informações do novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos que valide as informações do novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'OS DADOS DO NOVO TITULAR CONFEREM?')).isPresent());
        expect(element(by.id('nome')));
        expect(element(by.id('cpf')));
        expect(element(by.id('rg')));
        expect(element(by.id('dataNascimento')));
        expect(element(by.buttonText('DADOS NÃO CONFEREM')).isPresent());
        expect(element(by.buttonText('PROSSEGUIR')).isPresent());
        element(by.buttonText('PROSSEGUIR')).click();
        //Pop-up Pendecias abertas do terceiro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que o terceiro tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de contato novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos uma forma de contatar o novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'TELEFONE PARA CONTATO (OBRIGATÓRIO)')).isPresent());
        expect(element(by.id('telefone')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mb-3', 'E-MAIL PARA CONTATO')).isPresent());
        expect(element(by.id('email')).isPresent());
        var telefone = '81981234567';
        element(by.id('telefone')).sendKeys(telefone);
        var email = 'teste@teste.com';
        element(by.id('email')).sendKeys(email);
        expect(element(by.css('input[type="checkbox"]')).isPresent());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e estou ciente que os benefícios atuais não serão transferidas para o novo titular.')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Confirmar solicitação
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 10000);
        expect(element(by.cssContainingText('.subtitulo', 'Para concluir a solicitação, confirme as informações abaixo:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Unidade Consumidora')));
        expect(element(by.cssContainingText('.ng-star-inserted', uc)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data de entrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'CPF')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'RG')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'E-mail para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', email)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Telefone para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', telefone)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO DE PROCURAÇÃO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO COM FOTO VÁLIDO (FRENTE E VERSO)')));
        expect(element(by.css('input[type="checkbox"]')));
        expect(element(by.cssContainingText('.text-wrap.ms-2.mt-3', 'Declaro que li e estou ciente que os benefícios atuais do imóvel não serão transferidos para mim.')));
        expect(element(by.buttonText('VOLTAR')));
        expect(element(by.buttonText('CONCLUIR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        expect(element(by.buttonText('CONCLUIR')).isEnabled(true));
        element(by.buttonText('VOLTAR')).click();
        //Tela de contato novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos uma forma de contatar o novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'TELEFONE PARA CONTATO (OBRIGATÓRIO)')).isPresent());
    })

    it('tc10368_trocaNovoTitularGrB_novoTitularUC', function () {
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
    })

    it('tc10370_trocaAntigoTitularGrB_ucDebitos', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de validação das informações do novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos que valide as informações do novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'OS DADOS DO NOVO TITULAR CONFEREM?')).isPresent());
        expect(element(by.id('nome')));
        expect(element(by.id('cpf')));
        expect(element(by.id('rg')));
        expect(element(by.id('dataNascimento')));
        expect(element(by.buttonText('DADOS NÃO CONFEREM')).isPresent());
        expect(element(by.buttonText('PROSSEGUIR')).isPresent());
        element(by.buttonText('PROSSEGUIR')).click();
        //Pop-up Pendecias abertas do terceiro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que o terceiro tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de contato novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos uma forma de contatar o novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'TELEFONE PARA CONTATO (OBRIGATÓRIO)')).isPresent());
        expect(element(by.id('telefone')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mb-3', 'E-MAIL PARA CONTATO')).isPresent());
        expect(element(by.id('email')).isPresent());
        var telefone = '81981234567';
        element(by.id('telefone')).sendKeys(telefone);
        var email = 'teste@teste.com';
        element(by.id('email')).sendKeys(email);
        expect(element(by.css('input[type="checkbox"]')).isPresent());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e estou ciente que os benefícios atuais não serão transferidas para o novo titular.')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Confirmar solicitação
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 10000);
        expect(element(by.cssContainingText('.subtitulo', 'Para concluir a solicitação, confirme as informações abaixo:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Unidade Consumidora')));
        expect(element(by.cssContainingText('.ng-star-inserted', uc)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data de entrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'CPF')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'RG')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'E-mail para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', email)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Telefone para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', telefone)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO DE PROCURAÇÃO')));
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
        expect(element(by.cssContainingText('.subtitle', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.subtitle', 'CPF')));
        expect(element(by.cssContainingText('.subtitle', 'RG')));
        expect(element(by.cssContainingText('.subtitle', 'E-mail para contato')));
        expect(element(by.cssContainingText('.data-info', email)));
        expect(element(by.cssContainingText('.subtitle', 'Telefone para contato')));
        expect(element(by.cssContainingText('.data-info', telefone)));
        expect(element(by.buttonText('Imprimir')));
        expect(element(by.buttonText('Baixar PDF')));
    })

    it('tc10379_trocaAntigoTitularGrB_uploadRG', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de validação das informações do novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos que valide as informações do novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'OS DADOS DO NOVO TITULAR CONFEREM?')).isPresent());
        expect(element(by.id('nome')));
        expect(element(by.id('cpf')));
        expect(element(by.id('rg')));
        expect(element(by.id('dataNascimento')));
        expect(element(by.buttonText('DADOS NÃO CONFEREM')).isPresent());
        expect(element(by.buttonText('PROSSEGUIR')).isPresent());
        element(by.buttonText('PROSSEGUIR')).click();
        //Pop-up Pendecias abertas do terceiro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que o terceiro tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de contato novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos uma forma de contatar o novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'TELEFONE PARA CONTATO (OBRIGATÓRIO)')).isPresent());
        expect(element(by.id('telefone')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mb-3', 'E-MAIL PARA CONTATO')).isPresent());
        expect(element(by.id('email')).isPresent());
        var telefone = '81981234567';
        element(by.id('telefone')).sendKeys(telefone);
        var email = 'teste@teste.com';
        element(by.id('email')).sendKeys(email);
        expect(element(by.css('input[type="checkbox"]')).isPresent());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e estou ciente que os benefícios atuais não serão transferidas para o novo titular.')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Confirmar solicitação
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 10000);
        expect(element(by.cssContainingText('.subtitulo', 'Para concluir a solicitação, confirme as informações abaixo:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Unidade Consumidora')));
        expect(element(by.cssContainingText('.ng-star-inserted', uc)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data de entrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'CPF')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'RG')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'E-mail para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', email)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Telefone para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', telefone)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO DE PROCURAÇÃO')));
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
        expect(element(by.cssContainingText('.subtitle', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.subtitle', 'CPF')));
        expect(element(by.cssContainingText('.subtitle', 'RG')));
        expect(element(by.cssContainingText('.subtitle', 'E-mail para contato')));
        expect(element(by.cssContainingText('.data-info', email)));
        expect(element(by.cssContainingText('.subtitle', 'Telefone para contato')));
        expect(element(by.cssContainingText('.data-info', telefone)));
        expect(element(by.buttonText('Imprimir')));
        expect(element(by.buttonText('Baixar PDF')));
    })

    it('tc10380_trocaAntigoTitularGrB_uploadCNH', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de validação das informações do novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos que valide as informações do novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'OS DADOS DO NOVO TITULAR CONFEREM?')).isPresent());
        expect(element(by.id('nome')));
        expect(element(by.id('cpf')));
        expect(element(by.id('rg')));
        expect(element(by.id('dataNascimento')));
        expect(element(by.buttonText('DADOS NÃO CONFEREM')).isPresent());
        expect(element(by.buttonText('PROSSEGUIR')).isPresent());
        element(by.buttonText('PROSSEGUIR')).click();
        //Pop-up Pendecias abertas do terceiro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que o terceiro tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de contato novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos uma forma de contatar o novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'TELEFONE PARA CONTATO (OBRIGATÓRIO)')).isPresent());
        expect(element(by.id('telefone')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mb-3', 'E-MAIL PARA CONTATO')).isPresent());
        expect(element(by.id('email')).isPresent());
        var telefone = '81981234567';
        element(by.id('telefone')).sendKeys(telefone);
        var email = 'teste@teste.com';
        element(by.id('email')).sendKeys(email);
        expect(element(by.css('input[type="checkbox"]')).isPresent());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e estou ciente que os benefícios atuais não serão transferidas para o novo titular.')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Confirmar solicitação
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 10000);
        expect(element(by.cssContainingText('.subtitulo', 'Para concluir a solicitação, confirme as informações abaixo:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Unidade Consumidora')));
        expect(element(by.cssContainingText('.ng-star-inserted', uc)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data de entrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'CPF')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'RG')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'E-mail para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', email)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Telefone para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', telefone)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO DE PROCURAÇÃO')));
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
        expect(element(by.cssContainingText('.subtitle', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.subtitle', 'CPF')));
        expect(element(by.cssContainingText('.subtitle', 'RG')));
        expect(element(by.cssContainingText('.subtitle', 'E-mail para contato')));
        expect(element(by.cssContainingText('.data-info', email)));
        expect(element(by.cssContainingText('.subtitle', 'Telefone para contato')));
        expect(element(by.cssContainingText('.data-info', telefone)));
        expect(element(by.buttonText('Imprimir')));
        expect(element(by.buttonText('Baixar PDF')));
    })

    it('tc10381_trocaAntigoTitularGrB_uploadPassaporte', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de validação das informações do novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos que valide as informações do novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'OS DADOS DO NOVO TITULAR CONFEREM?')).isPresent());
        expect(element(by.id('nome')));
        expect(element(by.id('cpf')));
        expect(element(by.id('rg')));
        expect(element(by.id('dataNascimento')));
        expect(element(by.buttonText('DADOS NÃO CONFEREM')).isPresent());
        expect(element(by.buttonText('PROSSEGUIR')).isPresent());
        element(by.buttonText('PROSSEGUIR')).click();
        //Pop-up Pendecias abertas do terceiro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que o terceiro tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de contato novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos uma forma de contatar o novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'TELEFONE PARA CONTATO (OBRIGATÓRIO)')).isPresent());
        expect(element(by.id('telefone')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mb-3', 'E-MAIL PARA CONTATO')).isPresent());
        expect(element(by.id('email')).isPresent());
        var telefone = '81981234567';
        element(by.id('telefone')).sendKeys(telefone);
        var email = 'teste@teste.com';
        element(by.id('email')).sendKeys(email);
        expect(element(by.css('input[type="checkbox"]')).isPresent());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e estou ciente que os benefícios atuais não serão transferidas para o novo titular.')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Confirmar solicitação
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 10000);
        expect(element(by.cssContainingText('.subtitulo', 'Para concluir a solicitação, confirme as informações abaixo:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Unidade Consumidora')));
        expect(element(by.cssContainingText('.ng-star-inserted', uc)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data de entrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'CPF')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'RG')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'E-mail para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', email)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Telefone para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', telefone)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO DE PROCURAÇÃO')));
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
        expect(element(by.cssContainingText('.subtitle', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.subtitle', 'CPF')));
        expect(element(by.cssContainingText('.subtitle', 'RG')));
        expect(element(by.cssContainingText('.subtitle', 'E-mail para contato')));
        expect(element(by.cssContainingText('.data-info', email)));
        expect(element(by.cssContainingText('.subtitle', 'Telefone para contato')));
        expect(element(by.cssContainingText('.data-info', telefone)));
        expect(element(by.buttonText('Imprimir')));
        expect(element(by.buttonText('Baixar PDF')));
    })

    it('tc10387_trocaAntigoTitularGrB_pagarFaturaFlexPag', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de validação das informações do novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos que valide as informações do novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'OS DADOS DO NOVO TITULAR CONFEREM?')).isPresent());
        expect(element(by.id('nome')));
        expect(element(by.id('cpf')));
        expect(element(by.id('rg')));
        expect(element(by.id('dataNascimento')));
        expect(element(by.buttonText('DADOS NÃO CONFEREM')).isPresent());
        expect(element(by.buttonText('PROSSEGUIR')).isPresent());
        element(by.buttonText('PROSSEGUIR')).click();
        //Pop-up Pendecias abertas do terceiro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que o terceiro tem pendências em aberto!'))), 10000);
        element(by.cssContainingText('.btn-primary-p-light-green.btn-formatter.me-4.mat-menu-trigger', 'pagar com')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')).click();
        //Pop-up de redirecionamento para o FlexPag
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Você está sendo redirecionado para a página de pagamento do FlexPag.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
    })

    it('tc10388_trocaAntigoTitularGrB_pagarFaturaPix', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de validação das informações do novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos que valide as informações do novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'OS DADOS DO NOVO TITULAR CONFEREM?')).isPresent());
        expect(element(by.id('nome')));
        expect(element(by.id('cpf')));
        expect(element(by.id('rg')));
        expect(element(by.id('dataNascimento')));
        expect(element(by.buttonText('DADOS NÃO CONFEREM')).isPresent());
        expect(element(by.buttonText('PROSSEGUIR')).isPresent());
        element(by.buttonText('PROSSEGUIR')).click();
        //Pop-up Pendecias abertas do terceiro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que o terceiro tem pendências em aberto!'))), 10000);
        element(by.cssContainingText('.btn-primary-p-light-green.btn-formatter.me-4.mat-menu-trigger', 'pagar com')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Pix'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Pix')).click();
    })

    it('tc10390_trocaAntigoTitularGrB_pagarTodasFaturaFlexPag', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de validação das informações do novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos que valide as informações do novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'OS DADOS DO NOVO TITULAR CONFEREM?')).isPresent());
        expect(element(by.id('nome')));
        expect(element(by.id('cpf')));
        expect(element(by.id('rg')));
        expect(element(by.id('dataNascimento')));
        expect(element(by.buttonText('DADOS NÃO CONFEREM')).isPresent());
        expect(element(by.buttonText('PROSSEGUIR')).isPresent());
        element(by.buttonText('PROSSEGUIR')).click();
        //Pop-up Pendecias abertas do terceiro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que o terceiro tem pendências em aberto!'))), 10000);
        expect(element(by.cssContainingText('.content-button', 'PAGAR TODAS AS FATURAS')).isPresent());
        element(by.cssContainingText('.content-button', 'PAGAR TODAS AS FATURAS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Cartão de Crédito')).click();
        //Pop-up de redirecionamento para o FlexPag
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Você está sendo redirecionado para a página de pagamento do FlexPag.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
    })

    it('tc10391_trocaAntigoTitularGrB_pagarTodasFaturaPix', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de validação das informações do novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos que valide as informações do novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'OS DADOS DO NOVO TITULAR CONFEREM?')).isPresent());
        expect(element(by.id('nome')));
        expect(element(by.id('cpf')));
        expect(element(by.id('rg')));
        expect(element(by.id('dataNascimento')));
        expect(element(by.buttonText('DADOS NÃO CONFEREM')).isPresent());
        expect(element(by.buttonText('PROSSEGUIR')).isPresent());
        element(by.buttonText('PROSSEGUIR')).click();
        //Pop-up Pendecias abertas do terceiro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que o terceiro tem pendências em aberto!'))), 10000);
        expect(element(by.cssContainingText('.content-button', 'PAGAR TODAS AS FATURAS')).isPresent());
        element(by.cssContainingText('.content-button', 'PAGAR TODAS AS FATURAS')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Pix'))), 10000);
        element(by.cssContainingText('.mat-focus-indicator.mat-menu-item', 'Pix')).click();
    })

    it('tc10438_trocaAntigoTitularGrB_uploadCNH_Invalida', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/selfie.mjpeg');
    })

    it('tc10521_trocaAntigoTitularGrB_alterarEmail', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de validação das informações do novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos que valide as informações do novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'OS DADOS DO NOVO TITULAR CONFEREM?')).isPresent());
        expect(element(by.id('nome')));
        expect(element(by.id('cpf')));
        expect(element(by.id('rg')));
        expect(element(by.id('dataNascimento')));
        expect(element(by.buttonText('DADOS NÃO CONFEREM')).isPresent());
        expect(element(by.buttonText('PROSSEGUIR')).isPresent());
        element(by.buttonText('PROSSEGUIR')).click();
        //Pop-up Pendecias abertas do terceiro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que o terceiro tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de contato novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos uma forma de contatar o novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'TELEFONE PARA CONTATO (OBRIGATÓRIO)')).isPresent());
        expect(element(by.id('telefone')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mb-3', 'E-MAIL PARA CONTATO')).isPresent());
        expect(element(by.id('email')).isPresent());
        var telefone = '81981234567';
        element(by.id('telefone')).sendKeys(telefone);
        var email = 'teste@teste.com';
        element(by.id('email')).sendKeys(email);
        expect(element(by.css('input[type="checkbox"]')).isPresent());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e estou ciente que os benefícios atuais não serão transferidas para o novo titular.')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Confirmar solicitação
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 10000);
        expect(element(by.cssContainingText('.subtitulo', 'Para concluir a solicitação, confirme as informações abaixo:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Unidade Consumidora')));
        expect(element(by.cssContainingText('.ng-star-inserted', uc)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data de entrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'CPF')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'RG')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'E-mail para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', email)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Telefone para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', telefone)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO DE PROCURAÇÃO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO COM FOTO VÁLIDO (FRENTE E VERSO)')));
        var alterarNum = element.all(by.cssContainingText('.d-flex.justify-content-end', 'Alterar'));
        expect(alterarNum.count()).toBe(2);
        var alterar = element.all(by.cssContainingText('.d-flex.justify-content-end', 'Alterar')).get(0).all(by.tagName('a'));
        alterar.click();
        //Tela de contato novo titular novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos uma forma de contatar o novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'TELEFONE PARA CONTATO (OBRIGATÓRIO)')).isPresent());
        expect(element(by.id('telefone')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mb-3', 'E-MAIL PARA CONTATO')).isPresent());
        expect(element(by.id('email')).isPresent());
        var email2 = 'teste2@teste.com';
        element(by.id('email')).clear();
        element(by.id('email')).sendKeys(email2);
        expect(element(by.css('input[type="checkbox"]')).isPresent());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e estou ciente que os benefícios atuais não serão transferidas para o novo titular.')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Confirmar solicitação
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 10000);
        expect(element(by.cssContainingText('.subtitulo', 'Para concluir a solicitação, confirme as informações abaixo:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Unidade Consumidora')));
        expect(element(by.cssContainingText('.ng-star-inserted', uc)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data de entrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'CPF')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'RG')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'E-mail para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', email2)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Telefone para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', telefone)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO DE PROCURAÇÃO')));
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
        expect(element(by.cssContainingText('.subtitle', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.subtitle', 'CPF')));
        expect(element(by.cssContainingText('.subtitle', 'RG')));
        expect(element(by.cssContainingText('.subtitle', 'E-mail para contato')));
        expect(element(by.cssContainingText('.data-info', email2)));
        expect(element(by.cssContainingText('.subtitle', 'Telefone para contato')));
        expect(element(by.cssContainingText('.data-info', telefone)));
        expect(element(by.buttonText('Imprimir')));
        expect(element(by.buttonText('Baixar PDF')));
    })

    it('tc10522_trocaAntigoTitularGrB_alterarTelefone', function () {
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
        //Tela de identificação do imóvel
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Precisamos saber qual o imóvel deseja trocar a titularidade'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'SELECIONE A UNIDADE CONSUMIDORA:')));
        expect(element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).isPresent());
        expect(element(by.id('cep')).isPresent());
        expect(element(by.id('endereco.logradouro')).isPresent());
        expect(element(by.cssContainingText('.ng-star-inserted', 'Número')).isPresent());
        expect(element(by.id('endereco.complemento')).isPresent());
        expect(element(by.id('endereco.bairro')).isPresent());
        expect(element(by.id('endereco.cidade')).isPresent());
        expect(element(by.id('endereco.estado')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isPresent());
        element(by.cssContainingText('.mat-select-value', 'Unidade consumidora')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.mat-option-text', '189489'))), 10000);
        var uc = element(by.cssContainingText('.mat-option-text', '189489')).getText();
        element(by.cssContainingText('.mat-option-text', '189489')).click();
        element(by.buttonText('CONTINUAR')).click();
        //Pop-up Pendecias abertas
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'Para prosseguir é necessário realizar o pagamento das faturas em aberto.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que a UC tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de documento de procuração
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento de procuração'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de documento com foto novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Nos envie um documento com foto do novo titular!'))), 10000);
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Ao carregar  o documento deve estar no formato .PDF, .JPG, .JPEG ou .PNG.')));
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'DOCUMENTOS NECESSÁRIOS')));
        expect(element(by.cssContainingText('.subtitulo.mt-3.mb-3', 'Vamos precisar que tenha em mãos: Documento com Foto do Novo Titular (RG, CNH ou Passaporte).')));
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/vdf_cnh.jpg');
        expect(element(by.buttonText('CONTINUAR')).isEnabled(true));
        element(by.buttonText('CONTINUAR')).click();
        //Tela de validação das informações do novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos que valide as informações do novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-4.mb-3', 'OS DADOS DO NOVO TITULAR CONFEREM?')).isPresent());
        expect(element(by.id('nome')));
        expect(element(by.id('cpf')));
        expect(element(by.id('rg')));
        expect(element(by.id('dataNascimento')));
        expect(element(by.buttonText('DADOS NÃO CONFEREM')).isPresent());
        expect(element(by.buttonText('PROSSEGUIR')).isPresent());
        element(by.buttonText('PROSSEGUIR')).click();
        //Pop-up Pendecias abertas do terceiro
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.swal2-content', 'O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora.'))), 10000);
        expect(element(by.buttonText('FECHAR')));
        element(by.buttonText('FECHAR')).click();
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Ops! Verificamos que o terceiro tem pendências em aberto!'))), 10000);
        element(by.css('input[type="file"]')).sendKeys('C:/Certificado/file.pdf');
        element(by.buttonText('continuar')).click();
        //Tela de contato novo titular
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos uma forma de contatar o novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'TELEFONE PARA CONTATO (OBRIGATÓRIO)')).isPresent());
        expect(element(by.id('telefone')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mb-3', 'E-MAIL PARA CONTATO')).isPresent());
        expect(element(by.id('email')).isPresent());
        var telefone = '81981234567';
        element(by.id('telefone')).sendKeys(telefone);
        var email = 'teste@teste.com';
        element(by.id('email')).sendKeys(email);
        expect(element(by.css('input[type="checkbox"]')).isPresent());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e estou ciente que os benefícios atuais não serão transferidas para o novo titular.')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Confirmar solicitação
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 10000);
        expect(element(by.cssContainingText('.subtitulo', 'Para concluir a solicitação, confirme as informações abaixo:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Unidade Consumidora')));
        expect(element(by.cssContainingText('.ng-star-inserted', uc)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data de entrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'CPF')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'RG')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'E-mail para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', email)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Telefone para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', telefone)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO DE PROCURAÇÃO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO COM FOTO VÁLIDO (FRENTE E VERSO)')));
        var alterarNum = element.all(by.cssContainingText('.d-flex.justify-content-end', 'Alterar'));
        expect(alterarNum.count()).toBe(2);
        var alterar = element.all(by.cssContainingText('.d-flex.justify-content-end', 'Alterar')).get(1).all(by.tagName('a'));
        alterar.click();
        //Tela de contato novo titular novamente
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Agora precisamos uma forma de contatar o novo titular'))), 10000);
        expect(element(by.cssContainingText('.subtitulo-h6.mt-3.mb-3', 'TELEFONE PARA CONTATO (OBRIGATÓRIO)')).isPresent());
        expect(element(by.id('telefone')).isPresent());
        expect(element(by.cssContainingText('.subtitulo-h6.mb-3', 'E-MAIL PARA CONTATO')).isPresent());
        expect(element(by.id('email')).isPresent());
        var telefone2 = '81981237698';
        element(by.id('telefone')).clear();
        element(by.id('telefone')).sendKeys(telefone2);
        expect(element(by.css('input[type="checkbox"]')).isPresent());
        expect(element(by.cssContainingText('.mat-checkbox-label', 'Declaro que li e estou ciente que os benefícios atuais não serão transferidas para o novo titular.')).isPresent());
        expect(element(by.buttonText('VOLTAR')).isPresent());
        expect(element(by.buttonText('CONTINUAR')).isEnabled(false));
        browser.executeScript('arguments[0].click()', element(by.css('input[type="checkbox"]')).getWebElement());
        element(by.buttonText('CONTINUAR')).click();
        //Tela de Confirmar solicitação
        browser.wait(ExpectedConditions.presenceOf(element(by.cssContainingText('.ng-star-inserted', 'Confirme as informações da solicitação'))), 10000);
        expect(element(by.cssContainingText('.subtitulo', 'Para concluir a solicitação, confirme as informações abaixo:')));
        expect(element(by.cssContainingText('.col-6.t-color-dark-silver-200', 'UNIDADE CONSUMIDORA')));
        expect(element(by.cssContainingText('.col-3.t-color-dark-silver-200', 'ENDEREÇO')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Unidade Consumidora')));
        expect(element(by.cssContainingText('.ng-star-inserted', uc)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Data de entrada')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'CPF')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'RG')));
        expect(element(by.cssContainingText('.ng-star-inserted', 'E-mail para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', email)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'Telefone para contato')));
        expect(element(by.cssContainingText('.ng-star-inserted', telefone2)));
        expect(element(by.cssContainingText('.ng-star-inserted', 'DOCUMENTO DE PROCURAÇÃO')));
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
        expect(element(by.cssContainingText('.subtitle', 'Nome do novo titular')));
        expect(element(by.cssContainingText('.subtitle', 'CPF')));
        expect(element(by.cssContainingText('.subtitle', 'RG')));
        expect(element(by.cssContainingText('.subtitle', 'E-mail para contato')));
        expect(element(by.cssContainingText('.data-info', email)));
        expect(element(by.cssContainingText('.subtitle', 'Telefone para contato')));
        expect(element(by.cssContainingText('.data-info', telefone2)));
        expect(element(by.buttonText('Imprimir')));
        expect(element(by.buttonText('Baixar PDF')));
    })

})
