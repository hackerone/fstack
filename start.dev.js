require('babel-register');
var app = require('./server/app.js');
require('./server/lib/webpackdev.js')(app);
app.start();
