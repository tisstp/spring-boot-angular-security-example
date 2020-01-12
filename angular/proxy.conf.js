const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "http://localhost:9000",
    secure: true,
    logLevel: "debug",
    changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;
