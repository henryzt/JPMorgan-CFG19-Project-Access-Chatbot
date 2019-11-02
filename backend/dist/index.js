'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

var _express = _interopRequireDefault(require('express'));

var _bodyParser = _interopRequireDefault(require('body-parser'));

var _config = _interopRequireDefault(require('./config/config'));

var _logger = _interopRequireDefault(require('./logger/logger'));

var _debugLogger = _interopRequireDefault(require('./debug/debug-logger'));

var _database = _interopRequireDefault(require('./persistence/database'));

var _badRequestHandler = _interopRequireDefault(require('./error-handling/bad-request-handler'));

var _registration = _interopRequireDefault(require('./api/registration/registration.router'));

var app = (0, _express['default'])(); // JSON schema validation.

app.use(_badRequestHandler['default']); // Body parser for parsing request bodies.

app.use(
  _bodyParser['default'].urlencoded({
    extended: true
  })
);
app.use(_bodyParser['default'].json()); // eslint-disable-next-line no-unused-vars

var connection = (0, _database['default'])({
  uri: _config['default'].get('database.host') + _config['default'].get('database.databaseName'),
  poolSize: _config['default'].get('database.poolSize'),
  userName: _config['default'].get('database.userName'),
  password: _config['default'].get('database.password')
}); // Debug logging only when we're not in production environment.

if (_config['default'].get('env') !== 'production') {
  app.use(_debugLogger['default']);
}

var accessLogger = (0, _logger['default'])({
  fileName: _config['default'].get('logging.fileName'),
  basePath: ''.concat(process.cwd(), '/').concat(_config['default'].get('logging.basePath')),
  interval: _config['default'].get('logging.interval'),
  fileSize: _config['default'].get('logging.fileSize'),
  compressionMethod: _config['default'].get('logging.compressionMethod')
});
app.use(accessLogger); // Mount routes

app.use('/register', _registration['default']); // Server

var ip = _config['default'].get('ip');

var port = _config['default'].get('port');

var httpServer = app.listen(port, function() {
  var startUpMessage = 'Server running on '.concat(ip, ':').concat(port, '...');
  console.log(startUpMessage); // eslint-disable-line no-console
});
module.exports = {
  app: app,
  ip: ip,
  port: port,
  httpServer: httpServer
};
//# sourceMappingURL=index.js.map
