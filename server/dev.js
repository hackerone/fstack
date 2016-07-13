import fs from 'fs';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import app from './app';
import config from './../webpack.dev';

const compiler = webpack(config);
const cdn = '/client/';
const indexView = fs.readFileSync(`${__dirname}/views/index.html`, 'utf8')
  .replace('[main.js]', `${cdn}app.js`)
  .replace('[main.css]', `${cdn}app.css`);

app.get('/', (req, res) => {
  res.send(indexView);
});


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
