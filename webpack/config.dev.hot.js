/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const baseConfig = require('./config.base');
const host = require('./host')();
const hot = require('./hot');

const entry = hot.entry(host.HOST_URL);
const plugins = hot.plugins;
const loaders = hot.loaders;

const config = Object.assign({}, baseConfig, {
  eslint: { configFile: './.eslintrc' },
  devServerPort: host.PORT,
  devtool: 'eval',
  entry: [
    ...entry,
    ...baseConfig.entry
  ],
  plugins: [
    ...plugins,
    ...baseConfig.plugins
  ],
  module: Object.assign({}, baseConfig.module, {
    loaders: [
      ...baseConfig.module.loaders,
      ...loaders
    ]
  })
});

console.info('Firing up Webpack dev server...');
console.log(host);

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  noInfo: false,
  quiet: false,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false
  }
}).listen(host.PORT, host.HOSTNAME, function errorCallback(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('🚧 Webpack client dev-server listening on ' + host.HOST_URL + ' with publicPath:' + config.output.publicPath);
  }
});
