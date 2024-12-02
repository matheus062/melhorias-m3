console.log('OI sim ta funcionando')

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3000', // Endereço do servidor do back-end
            changeOrigin: true,
        })
    );
};

