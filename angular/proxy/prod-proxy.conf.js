const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "http://localhost:9001",
    secure: true,
    logLevel: "debug",
    changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;
