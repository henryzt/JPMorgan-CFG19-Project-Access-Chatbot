import express from 'express';

import expressJsonSchema from 'express-jsonschema';

import { registrationHandler, RegistrationInfoSchema } from './registration.handler';

const { validate } = expressJsonSchema;

const registrationRouter = express.Router();

registrationRouter.post('/', validate({ body: RegistrationInfoSchema }), registrationHandler);

export default registrationRouter;
