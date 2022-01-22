const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/SimpleLibrarySpring',
    createProxyMiddleware({
      target: 'localhost:8080',
      changeOrigin: true,
    })
  );
};