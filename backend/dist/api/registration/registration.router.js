'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _express = _interopRequireDefault(require('express'));

var _expressJsonschema = _interopRequireDefault(require('express-jsonschema'));

var _registration = require('./registration.handler');

var validate = _expressJsonschema['default'].validate;
var registrationRouter = _express['default'].Router;
registrationRouter.post(
  '/',
  validate({
    body: _registration.RegistrationInfoSchema
  }),
  _registration.registrationHandler
);
var _default = registrationRouter;
exports['default'] = _default;
//# sourceMappingURL=registration.router.js.map
