import express from 'express';

import createGetSupportedUniversities from './get-supported-universities.handler';
import createGetUniversityInfoHandler from './get-university-info.handler';
import createGetCourseInfoHandler from './get-course-info.handler';

const createInfoRouter = ({
  getSupportedUniversitiesPersistenceHandler,
  getUniversityInfoPersistenceHandler,
  getCourseInfoPersistenceHandler
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

  const getCourseInfoHandler = createGetCourseInfoHandler(getCourseInfoPersistenceHandler);

  InfoRouter.get('/university/:universityName/course/:courseName', getCourseInfoHandler);

  return InfoRouter;
};

export default createInfoRouter;
