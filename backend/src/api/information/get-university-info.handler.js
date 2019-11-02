const createGetUniversityInfoHandler = persistenceHandler => async (request, response) => {
  // eslint-disable-next-line no-unused-vars
  const [_, universityInfo] = await persistenceHandler(request.params.universityName);

  response.status(200);
  response.json({
    data: universityInfo
  });
};

export default createGetUniversityInfoHandler;
