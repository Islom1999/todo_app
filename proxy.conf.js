const HttpsProxyAgent = require('https-proxy-agent');

const proxyConfig = [{
  context: '/api',
  target: 'http://laravelapi.aserver.uz',
  secure: false,
  changeOrigin: true,
}];

module.exports = function () {
  const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    const agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer);

    for (const entry of proxyConfig) {
      entry.agent = agent;
    }
  }

  return proxyConfig;
};
