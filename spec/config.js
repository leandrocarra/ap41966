exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub', 
    specs: [/**'login-spec.js', 'cadastro-spec.js', 'recuperar-senha-spec.js', 'selecao-imovel-a-spec.js',*/ 'selecao-imovel-b-spec.js'/**,
            'debito-automatico-grupo-a-spec.js', 'debito-automatico-grupo-b-spec.js', 'consultar-home-grupo-a-spec.js', 'consultar-home-grupo-b-spec.js', 
            'fatura-facil-cpf-spec.js', 'fatura-facil-cnpj-spec.js', 'segunda-via-fatura-grupo-b-spec.js', 'segunda-via-fatura-grupo-a-spec.jss',
            'minha-conta-spec.js', 'fatura-por-email-grupo-a-spec.js', 'fatura-por-email-grupo-b-spec.js', 'fatura-multipla-spec.js', 'historico-consumo-grupo-b-spec.js',
            'historico-consumo-grupo-a-spec.js', 'lgpd-se-spec.js', 'lgpd-ne-spec.js', 'memoria-massa-spec.js', 'autoleitura-ne-spec.js',
            'autoleitura-se-spec.js', 'falta-energia-grupo-a-spec.js', 'falta-energia-grupo-b-spec.js', 'religacao-grupo-b-spec.js', 'fatura-impressa-grupo-a-spec.js',
            'fatura-impressa-grupo-b-spec.js','entenda-sua-conta-spec.js', 'fatura-braile-grupo-b-spec.js', 'fatura-braile-grupo-a-spec.js', 'simularAutoleituraSE_spec.js',
            'troca-novo-titular-grupo-b-spec.js', 'troca-antigo-titular-grupo-b-spec.js', 'troca-caracteristicas-residencial-spec.js', 'acompanhe-pedido-grupo-a-spec.js',
            'acompanhe-pedido-grupo-b-spec.js', 'troca-caracteristicas-rural-CPF-spec.js', 'troca-caracteristicas-rural-CNPJ-spec.js', 'troca-caracteristicas-comerical-spec.js',
            'troca-caracteristicas-industrial-spec.js'*/],
    capabilities: {
        browserName : 'chrome',
        chromeOptions: {'args': [/**'--headless',*/'--window-size=1600,900', '--use-fake-ui-for-media-stream', 
                        '--use-fake-device-for-media-stream', '--use-file-for-fake-video-capture=C:/backupvaldner/Ferramentas/ffmpeg/selfie.mjpeg']},
        acceptInsecureCerts : true
    },
    framework: 'jasmine'
}