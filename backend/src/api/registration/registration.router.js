import express from 'express';

import expressJsonSchema from 'express-jsonschema';

import { createRegistrationHandler, RegistrationInfoSchema } from './registration.handler';

const { validate } = expressJsonSchema;

const createRegistrationRouter = persistenceHandler => {
  const registrationRouter = express.Router();

  const registrationHandler = createRegistrationHandler(persistenceHandler);

  registrationRouter.post('/', validate({ body: RegistrationInfoSchema }), registrationHandler);

  return registrationRouter;
};

export default createRegistrationRouter;
