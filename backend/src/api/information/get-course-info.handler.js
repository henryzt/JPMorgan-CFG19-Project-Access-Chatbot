const createGetCourseInfo = persistenceHandler => async (request, response) => {
  const { universityName, courseName } = request.params;

  // eslint-disable-next-line no-unused-vars
  const [_status, courseInfo] = await persistenceHandler({
    targetUniversityName: universityName,
    targetCourseName: courseName
  });

  response.status(200);
  response.json(courseInfo);
};

export default createGetCourseInfo;
