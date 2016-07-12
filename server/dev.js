import fs from 'fs';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import app from './app';
import config from './../webpack.dev';

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf8', (err, data) => {
    res.send(data);
  });
});


const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'client',
  stats: { colors: true },
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
}));

app.listen(9000, () => {
  console.log('The server is running at http://localhost:' + 9000);
});
