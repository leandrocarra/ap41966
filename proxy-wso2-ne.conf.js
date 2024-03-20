const PROXY_CONFIG = [
    {
        context: ['/areanaologada'],
        target: 'https://avapinehmlanl.neoenergia.com',
        secure: false,
        loglevel: 'debug',
        changeOrigin: true
    },

    {
        context: ['/api'],
        target: 'https://apinehml.neoenergia.net',
        // target: 'https://mobileapinehml.neoenergia.net/',
        // target: 'https://wso2am-pattern-1-am-service.wso2.svc.cluster.local:8243',
        secure: false,
        loglevel: 'debug',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
    },

    //NOTE: Temporário aguardando endpoints pelo wso2
    {
        context: ["/multilogincoelba"],
        target: 'https://qa-multiloginback-coelba.neoenergia.net',
        secure: false,
        loglevel: 'debug',
        pathRewrite: { '^/multilogincoelba': '' },
        changeOrigin: true,
    },


    {
        context: ["/multilogincelpe"],
        target: 'https://qa-multiloginback-celpe.neoenergia.net',
        secure: false,
        loglevel: 'debug',
        pathRewrite: { '^/multilogincelpe': '' },
        changeOrigin: true,
    },

    {
        context: ["/multilogincosern"],
        target: 'https://qa-multiloginback-cosern.neoenergia.net',
        secure: false,
        loglevel: 'debug',
        pathRewrite: { '^/multilogincosern': '' },
        changeOrigin: true,
    }
];

module.exports = PROXY_CONFIG
