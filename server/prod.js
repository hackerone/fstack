import app from './app';
import assets from '~/build/assets.json';
import fs from 'fs';
import express from 'express';

const cdn = '/';

const indexView = fs.readFileSync( __dirname + '/views/index.html', 'utf8')
  .replace('[main.js]', cdn + assets['main.js'])
  .replace('[main.css]', cdn + assets['main.css']);

app.use(express.static('build'));
app.get('/', (req, res) => {
  res.send(indexView);
});

app.listen(9000, () => {
  console.log('The server is running at http://localhost:' + 9000);
});
