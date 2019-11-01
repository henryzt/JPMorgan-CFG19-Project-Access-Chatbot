import debug from './debug';

const debugLogger = (request, response, next) => {
  debug('=============================');
  debug(`[PATH]: ${request.url}`);
  debug('-----------------------------');
  debug('[REQUEST headers]');
  debug(request.headers);
  debug('[REQUEST body]');
  debug(request.body);
  debug('=============================');
  debug('[RESPONSE headers]');
  debug(response.headers);
  debug('[RESPONSE body]');
  debug(response.body);
  debug('=============================');
  next();
};

export default debugLogger;
