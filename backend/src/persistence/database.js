import mongoose from 'mongoose';

const createConnection = ({ uri, poolSize, userName, password }) =>
  mongoose.createConnection(uri, {
    poolSize,
    user: userName,
    pass: password,
    useMongoClient: true,
    useNewUrlParser: true
  });

export default createConnection;
