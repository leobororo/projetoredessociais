var express = require('express');
var path = require('path');
var http = require('http');
var https = require('https');
var debug = require('debug')('appredessociais:server');
var port = normalizarPorta(process.env.PORT || '3000');
var fs = require('fs');

//obtem certificado ssh
var options = {
  key: fs.readFileSync('newkey.pem'),
  cert: fs.readFileSync('cert.pem')
};

/**
 * Configura a app Express
 */
var app = express();
app.set('port', port);
app.use(express.static(path.join(__dirname, '../public')));

/**
 * Cria o servidor HTTP e o configura.
 */
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

var serverHttps = https.createServer(options, app);
serverHttps.listen(443);

/**
 * Converter o número da porta para number, string, or false.
 */
function normalizarPorta(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Listener para tratamento de erro.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // cria algumas mensagens de erros customizadas para erros conhecidos
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Listener para avisar o usuário que o servidor subiu com sucesso.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
