const PROXY_CONFIG = [

    {
        context: ['/areanaologada'],
        target: 'https://avapisehmlanl.neoenergia.com',
        secure: false,
        loglevel: 'debug',
        changeOrigin: true
    },

    {
        context: ['/api'],
        target: 'https://apisehml.neoenergia.net',
        //target: 'https://wso2am-pattern-1-am-service.wso2.svc.cluster.local:8243',
        secure: false,
        loglevel: 'debug',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
    },
];

module.exports = PROXY_CONFIG
