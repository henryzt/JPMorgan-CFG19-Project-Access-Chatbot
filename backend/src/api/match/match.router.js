import express from 'express';

import createGetRankedCoursesHandler from './get-ranked-courses.handler';

const createMatchRouter = ({ getRankedCoursesPersistenceHandler }) => {
  const MatchRouter = express.Router();

  const getRankedCoursesHandler = createGetRankedCoursesHandler(getRankedCoursesPersistenceHandler);

  MatchRouter.get('/match/ranked-courses', getRankedCoursesHandler);

  return MatchRouter;
};

export default createMatchRouter;
