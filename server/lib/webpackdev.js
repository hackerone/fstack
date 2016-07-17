import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import config from '~/webpack.dev';

const compiler = webpack(config);

export default (app) => {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'client',
    stats: { colors: true },
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
  }));
};
