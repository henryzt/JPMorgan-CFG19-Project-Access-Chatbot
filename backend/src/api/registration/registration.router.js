import express from 'express';

import registrationHandler from './registration.handler';

const registrationRouter = express.Router;

registrationRouter.post('/', registrationHandler);

export default registrationRouter;
