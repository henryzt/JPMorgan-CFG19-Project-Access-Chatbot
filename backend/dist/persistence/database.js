'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _mongoose = _interopRequireDefault(require('mongoose'));

var createConnection = function createConnection(_ref) {
  var uri = _ref.uri,
    poolSize = _ref.poolSize,
    userName = _ref.userName,
    password = _ref.password;
  return _mongoose['default'].createConnection(uri, {
    poolSize: poolSize,
    user: userName,
    pass: password,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

var _default = createConnection;
exports['default'] = _default;
//# sourceMappingURL=database.js.map
