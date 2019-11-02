const getInMemoryDatabaseHandler = db => async (request, response) => {
  response.status(200);
  response.json(db.data);
};

export default getInMemoryDatabaseHandler;
