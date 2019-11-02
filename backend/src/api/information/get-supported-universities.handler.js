const createGetSupportedUniversities = persistenceHandler => async (_request, response) => {
  // eslint-disable-next-line no-unused-vars
  const [_status, universityNames] = await persistenceHandler();
  response.status(200);
  response.json({ supportedUniversities: universityNames });
};

export default createGetSupportedUniversities;
