'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _debug = _interopRequireDefault(require('../debug/debug'));

var badRequestHandler = function badRequestHandler(error, request, response, next) {
  if (error.name && error.name === 'JsonSchemaValidation') {
    if (error.message) (0, _debug['default'])(error.message);
    response.status(400);
    response.json({
      errorType: '@error/bad-request',
      validationInfo: error.validations
    });
  } else {
    next(error);
  }
};

var _default = badRequestHandler;
exports['default'] = _default;
//# sourceMappingURL=bad-request-handler.js.map
