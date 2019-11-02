import fs from 'fs';

import express from 'express';

import cors from 'cors';

import bodyParser from 'body-parser';

import config from './config/config';

import createLogger from './logger/logger';

import debugLogger from './debug/debug-logger';

// import createConnection from './persistence/database';
import {
  InMemoryDatabase,
  registerHandler,
  getSupportedUniversitiesHandler,
  getUniversityInfoHandler,
  getCourseInfoHandler
} from '../mock-data/in-memory-database';
import getInMemoryDatabaseHandler from '../mock-data/get-in-memory-db';

import badRequestHandler from './error-handling/bad-request-handler';

import createRegistrationRouter from './api/registration/registration.router';

import createInfoRouter from './api/information/information.router';

const app = express();

// CORS
app.use(cors());

// Mock data set - project root 'dataset.json'
const dataSet = JSON.parse(fs.readFileSync(`${__dirname}/../../dataset.json`, 'utf8'));
InMemoryDatabase.data.universityCourseInfo = dataSet;

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
const registrationRouter = createRegistrationRouter(registerHandler(InMemoryDatabase));
app.use('/register', registrationRouter);

const infoRouter = createInfoRouter({
  getSupportedUniversitiesPersistenceHandler: getSupportedUniversitiesHandler(InMemoryDatabase),
  getUniversityInfoPersistenceHandler: getUniversityInfoHandler(InMemoryDatabase),
  getCourseInfoPersistenceHandler: getCourseInfoHandler(InMemoryDatabase)
});
app.use('/', infoRouter);

// In Memory DB debug endpoint
app.get('/in-memory-db', getInMemoryDatabaseHandler(InMemoryDatabase));

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
