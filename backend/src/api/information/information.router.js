import express from 'express';

import createGetSupportedUniversities from './get-supported-universities.handler';
import createGetUniversityInfoHandler from './get-university-info.handler';

const createInfoRouter = ({
  getSupportedUniversitiesPersistenceHandler,
  getUniversityInfoPersistenceHandler
}) => {
  const InfoRouter = express.Router();

  const supportedUniversitiesHandler = createGetSupportedUniversities(
    getSupportedUniversitiesPersistenceHandler
  );

  InfoRouter.get('/supportedUniversities', supportedUniversitiesHandler);

  const getUniversityInfoHandler = createGetUniversityInfoHandler(
    getUniversityInfoPersistenceHandler
  );

  InfoRouter.get('/university/:universityName', getUniversityInfoHandler);

  return InfoRouter;
};

export default createInfoRouter;
