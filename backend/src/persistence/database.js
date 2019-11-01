import mongoose from 'mongoose';

const createConnection = ({ uri, poolSize, userName, password }) =>
  mongoose.createConnection(uri, {
    poolSize,
    user: userName,
    pass: password,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

export default createConnection;
