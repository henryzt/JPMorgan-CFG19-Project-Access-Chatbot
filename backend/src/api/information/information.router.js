import express from 'express';

import createGetSupportedUniversities from './get-supported-universities.handler';

const createInfoRouter = ({ getSupportedUniversitiesPersistenceHandler }) => {
  const InfoRouter = express.Router();

  const supportedUniversitiesHandler = createGetSupportedUniversities(
    getSupportedUniversitiesPersistenceHandler
  );

  InfoRouter.get('/supportedUniversities', supportedUniversitiesHandler);

  return InfoRouter;
};

export default createInfoRouter;
