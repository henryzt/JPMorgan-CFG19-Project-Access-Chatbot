import debug from '../debug/debug';

const badRequestHandler = (error, _, response, next) => {
  if (error.name && error.name === 'JsonSchemaValidation') {
    if (error.message) debug(error.message);

    response.status(400);
    response.json({
      errorType: '@error/bad-request'
    });
  } else {
    next(error);
  }
};

export default badRequestHandler;
