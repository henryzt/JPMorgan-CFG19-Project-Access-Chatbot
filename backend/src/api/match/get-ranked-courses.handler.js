const getRankedCourses = persistenceHandler => async (request, response) => {
  // eslint-disable-next-line no-unused-vars
  const [_, data] = await persistenceHandler();

  response.status(200);
  response.json(data);
};

export default getRankedCourses;
