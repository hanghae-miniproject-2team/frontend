const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://54.180.141.164",
      changeOrigin: true,
    })
  );
};
setupProxy.js;
