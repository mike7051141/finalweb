// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "https://openapi.naver.com",
      //target: "https://api.kakaobrain.com",
      changeOrigin: true,
    })
  );
  app.use(
    "/v2",
    createProxyMiddleware({
      target: "https://api.kakaobrain.com",
      changeOrigin: true,
    })
  );
};
