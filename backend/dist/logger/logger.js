'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _morgan = _interopRequireDefault(require('morgan'));

var _rotatingFileStream = _interopRequireDefault(require('rotating-file-stream'));

/*
 * Rotating write stream. A log file is rotated on fulfilling either:
 * 1. Log file size exceeds logOptions.fileSize, or
 * 2. Log file exists for longer than logOptions.interval.
 */
var createRfsLogStream = function createRfsLogStream(_ref) {
  var fileName = _ref.fileName,
    basePath = _ref.basePath,
    interval = _ref.interval,
    fileSize = _ref.fileSize,
    compressionMethod = _ref.compressionMethod;
  return (0, _rotatingFileStream['default'])(fileName, {
    path: basePath,
    interval: interval,
    size: fileSize,
    compress: compressionMethod
  });
};

var createLogger = function createLogger(logOptions) {
  return (0, _morgan['default'])('combined', {
    stream: createRfsLogStream(logOptions)
  });
};

var _default = createLogger;
exports['default'] = _default;
//# sourceMappingURL=logger.js.map
