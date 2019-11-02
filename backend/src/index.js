import express from 'express';

import bodyParser from 'body-parser';

import config from './config/config';

import createLogger from './logger/logger';

import debugLogger from './debug/debug-logger';

// import createConnection from './persistence/database';
import InMemoryDatabase from '../mock-data/in-memory-database';

import badRequestHandler from './error-handling/bad-request-handler';

import createRegistrationRouter from './api/registration/registration.router';

const app = express();

// Body parser for parsing request bodies.
app.use(bodyParser.json());

// const connection = createConnection({
//   uri: config.get('database.host') + config.get('database.databaseName'),
//   poolSize: config.get('database.poolSize'),
//   userName: config.get('database.userName'),
//   password: config.get('database.password')
// });

const accessLogger = createLogger({
  fileName: config.get('logging.fileName'),
  basePath: `${process.cwd()}/${config.get('logging.basePath')}`,
  interval: config.get('logging.interval'),
  fileSize: config.get('logging.fileSize'),
  compressionMethod: config.get('logging.compressionMethod')
});

app.use(accessLogger);

// Mount routers
const registrationPersistenceHandler = InMemoryDatabase.registerHandler;
const registrationRouter = createRegistrationRouter(registrationPersistenceHandler);
app.use('/register', registrationRouter);

// Bad request handler for malformed JSON request.
app.use(badRequestHandler);

// Debug logging only when we're not in production environment.
if (config.get('env') !== 'production') {
  app.use(debugLogger);
}

// Server
const ip = config.get('ip');
const port = config.get('port');

const httpServer = app.listen(port, () => {
  const startUpMessage = `Server running on ${ip}:${port}...`;
  console.log(startUpMessage); // eslint-disable-line no-console
});

module.exports = {
  app,
  ip,
  port,
  httpServer
};
