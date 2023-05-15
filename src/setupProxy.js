const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1/upload',
    createProxyMiddleware({
      target: 'https://api.pexels.com',
      changeOrigin: true,
    })
  );
};