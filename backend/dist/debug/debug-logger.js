'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _debug = _interopRequireDefault(require('./debug'));

var debugLogger = function debugLogger(request, response, next) {
  (0, _debug['default'])('=============================');
  (0, _debug['default'])('[PATH]: '.concat(request.url));
  (0, _debug['default'])('-----------------------------');
  (0, _debug['default'])('[REQUEST headers]');
  (0, _debug['default'])(request.headers);
  (0, _debug['default'])('[REQUEST body]');
  (0, _debug['default'])(request.body);
  (0, _debug['default'])('=============================');
  (0, _debug['default'])('[RESPONSE headers]');
  (0, _debug['default'])(response.headers);
  (0, _debug['default'])('[RESPONSE body]');
  (0, _debug['default'])(response.body);
  (0, _debug['default'])('=============================');
  next();
};

var _default = debugLogger;
exports['default'] = _default;
//# sourceMappingURL=debug-logger.js.map
