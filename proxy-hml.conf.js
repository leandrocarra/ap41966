const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'https://wso2am-pattern-1-am-service.wso2.svc.cluster.local:8243',
        // target: 'https://mobileapinehml.neoenergia.com',
        // target: 'http://agenciavirtual-service.devops.svc.cluster.local:8080',
        // target: 'https://my-nginx-ingress-controller.wso2.svc/',
        secure: false,
        loglevel: 'debug',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
    }
];

module.exports = PROXY_CONFIG
