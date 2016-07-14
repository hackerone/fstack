import app from './app';
import fs from 'fs';
import express from 'express';

const cdn = '/';
const assets = JSON.parse(fs.readFileSync(__dirname + '/../build/client/assets.json'));
const indexView = fs.readFileSync( __dirname + '/views/index.html', 'utf8')
  .replace('[main.js]', cdn + assets['main.js'])
  .replace('[main.css]', cdn + assets['main.css']);

app.use(express.static(__dirname + '/../client'));
app.get('/', (req, res) => {
  res.send(indexView);
});


const ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1';
const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9000;

app.listen(port, ip, () => {
  console.log('The server is running at http://localhost:' + port);
});
